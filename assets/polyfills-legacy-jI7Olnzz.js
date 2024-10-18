(function () {
  'use strict';

  /* eslint-disable no-prototype-builtins */
  var g =
    (typeof globalThis !== 'undefined' && globalThis) ||
    (typeof self !== 'undefined' && self) ||
    // eslint-disable-next-line no-undef
    (typeof global !== 'undefined' && global) ||
    {};

  var support = {
    searchParams: 'URLSearchParams' in g,
    iterable: 'Symbol' in g && 'iterator' in Symbol,
    blob:
      'FileReader' in g &&
      'Blob' in g &&
      (function() {
        try {
          new Blob();
          return true
        } catch (e) {
          return false
        }
      })(),
    formData: 'FormData' in g,
    arrayBuffer: 'ArrayBuffer' in g
  };

  function isDataView(obj) {
    return obj && DataView.prototype.isPrototypeOf(obj)
  }

  if (support.arrayBuffer) {
    var viewClasses = [
      '[object Int8Array]',
      '[object Uint8Array]',
      '[object Uint8ClampedArray]',
      '[object Int16Array]',
      '[object Uint16Array]',
      '[object Int32Array]',
      '[object Uint32Array]',
      '[object Float32Array]',
      '[object Float64Array]'
    ];

    var isArrayBufferView =
      ArrayBuffer.isView ||
      function(obj) {
        return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
      };
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name);
    }
    if (/[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(name) || name === '') {
      throw new TypeError('Invalid character in header field name: "' + name + '"')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value);
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift();
        return {done: value === undefined, value: value}
      }
    };

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      };
    }

    return iterator
  }

  function Headers$1(headers) {
    this.map = {};

    if (headers instanceof Headers$1) {
      headers.forEach(function(value, name) {
        this.append(name, value);
      }, this);
    } else if (Array.isArray(headers)) {
      headers.forEach(function(header) {
        if (header.length != 2) {
          throw new TypeError('Headers constructor: expected name/value pair to be length 2, found' + header.length)
        }
        this.append(header[0], header[1]);
      }, this);
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name]);
      }, this);
    }
  }

  Headers$1.prototype.append = function(name, value) {
    name = normalizeName(name);
    value = normalizeValue(value);
    var oldValue = this.map[name];
    this.map[name] = oldValue ? oldValue + ', ' + value : value;
  };

  Headers$1.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)];
  };

  Headers$1.prototype.get = function(name) {
    name = normalizeName(name);
    return this.has(name) ? this.map[name] : null
  };

  Headers$1.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  };

  Headers$1.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = normalizeValue(value);
  };

  Headers$1.prototype.forEach = function(callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this);
      }
    }
  };

  Headers$1.prototype.keys = function() {
    var items = [];
    this.forEach(function(value, name) {
      items.push(name);
    });
    return iteratorFor(items)
  };

  Headers$1.prototype.values = function() {
    var items = [];
    this.forEach(function(value) {
      items.push(value);
    });
    return iteratorFor(items)
  };

  Headers$1.prototype.entries = function() {
    var items = [];
    this.forEach(function(value, name) {
      items.push([name, value]);
    });
    return iteratorFor(items)
  };

  if (support.iterable) {
    Headers$1.prototype[Symbol.iterator] = Headers$1.prototype.entries;
  }

  function consumed(body) {
    if (body._noBody) return
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true;
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result);
      };
      reader.onerror = function() {
        reject(reader.error);
      };
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsArrayBuffer(blob);
    return promise
  }

  function readBlobAsText(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    var match = /charset=([A-Za-z0-9_-]+)/.exec(blob.type);
    var encoding = match ? match[1] : 'utf-8';
    reader.readAsText(blob, encoding);
    return promise
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf);
    var chars = new Array(view.length);

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i]);
    }
    return chars.join('')
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0)
    } else {
      var view = new Uint8Array(buf.byteLength);
      view.set(new Uint8Array(buf));
      return view.buffer
    }
  }

  function Body() {
    this.bodyUsed = false;

    this._initBody = function(body) {
      /*
        fetch-mock wraps the Response object in an ES6 Proxy to
        provide useful test harness features such as flush. However, on
        ES5 browsers without fetch or Proxy support pollyfills must be used;
        the proxy-pollyfill is unable to proxy an attribute unless it exists
        on the object before the Proxy is created. This change ensures
        Response.bodyUsed exists on the instance, while maintaining the
        semantic of setting Request.bodyUsed in the constructor before
        _initBody is called.
      */
      // eslint-disable-next-line no-self-assign
      this.bodyUsed = this.bodyUsed;
      this._bodyInit = body;
      if (!body) {
        this._noBody = true;
        this._bodyText = '';
      } else if (typeof body === 'string') {
        this._bodyText = body;
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body;
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body;
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString();
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer);
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer]);
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body);
      } else {
        this._bodyText = body = Object.prototype.toString.call(body);
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8');
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type);
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
        }
      }
    };

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this);
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      };
    }

    this.arrayBuffer = function() {
      if (this._bodyArrayBuffer) {
        var isConsumed = consumed(this);
        if (isConsumed) {
          return isConsumed
        } else if (ArrayBuffer.isView(this._bodyArrayBuffer)) {
          return Promise.resolve(
            this._bodyArrayBuffer.buffer.slice(
              this._bodyArrayBuffer.byteOffset,
              this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength
            )
          )
        } else {
          return Promise.resolve(this._bodyArrayBuffer)
        }
      } else if (support.blob) {
        return this.blob().then(readBlobAsArrayBuffer)
      } else {
        throw new Error('could not read as ArrayBuffer')
      }
    };

    this.text = function() {
      var rejected = consumed(this);
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text')
      } else {
        return Promise.resolve(this._bodyText)
      }
    };

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode$1)
      };
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    };

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['CONNECT', 'DELETE', 'GET', 'HEAD', 'OPTIONS', 'PATCH', 'POST', 'PUT', 'TRACE'];

  function normalizeMethod(method) {
    var upcased = method.toUpperCase();
    return methods.indexOf(upcased) > -1 ? upcased : method
  }

  function Request(input, options) {
    if (!(this instanceof Request)) {
      throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.')
    }

    options = options || {};
    var body = options.body;

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url;
      this.credentials = input.credentials;
      if (!options.headers) {
        this.headers = new Headers$1(input.headers);
      }
      this.method = input.method;
      this.mode = input.mode;
      this.signal = input.signal;
      if (!body && input._bodyInit != null) {
        body = input._bodyInit;
        input.bodyUsed = true;
      }
    } else {
      this.url = String(input);
    }

    this.credentials = options.credentials || this.credentials || 'same-origin';
    if (options.headers || !this.headers) {
      this.headers = new Headers$1(options.headers);
    }
    this.method = normalizeMethod(options.method || this.method || 'GET');
    this.mode = options.mode || this.mode || null;
    this.signal = options.signal || this.signal || (function () {
      if ('AbortController' in g) {
        var ctrl = new AbortController();
        return ctrl.signal;
      }
    }());
    this.referrer = null;

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body);

    if (this.method === 'GET' || this.method === 'HEAD') {
      if (options.cache === 'no-store' || options.cache === 'no-cache') {
        // Search for a '_' parameter in the query string
        var reParamSearch = /([?&])_=[^&]*/;
        if (reParamSearch.test(this.url)) {
          // If it already exists then set the value with the current time
          this.url = this.url.replace(reParamSearch, '$1_=' + new Date().getTime());
        } else {
          // Otherwise add a new '_' parameter to the end with the current time
          var reQueryString = /\?/;
          this.url += (reQueryString.test(this.url) ? '&' : '?') + '_=' + new Date().getTime();
        }
      }
    }
  }

  Request.prototype.clone = function() {
    return new Request(this, {body: this._bodyInit})
  };

  function decode$1(body) {
    var form = new FormData();
    body
      .trim()
      .split('&')
      .forEach(function(bytes) {
        if (bytes) {
          var split = bytes.split('=');
          var name = split.shift().replace(/\+/g, ' ');
          var value = split.join('=').replace(/\+/g, ' ');
          form.append(decodeURIComponent(name), decodeURIComponent(value));
        }
      });
    return form
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers$1();
    // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
    // https://tools.ietf.org/html/rfc7230#section-3.2
    var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ');
    // Avoiding split via regex to work around a common IE11 bug with the core-js 3.6.0 regex polyfill
    // https://github.com/github/fetch/issues/748
    // https://github.com/zloirock/core-js/issues/751
    preProcessedHeaders
      .split('\r')
      .map(function(header) {
        return header.indexOf('\n') === 0 ? header.substr(1, header.length) : header
      })
      .forEach(function(line) {
        var parts = line.split(':');
        var key = parts.shift().trim();
        if (key) {
          var value = parts.join(':').trim();
          try {
            headers.append(key, value);
          } catch (error) {
            console.warn('Response ' + error.message);
          }
        }
      });
    return headers
  }

  Body.call(Request.prototype);

  function Response(bodyInit, options) {
    if (!(this instanceof Response)) {
      throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.')
    }
    if (!options) {
      options = {};
    }

    this.type = 'default';
    this.status = options.status === undefined ? 200 : options.status;
    if (this.status < 200 || this.status > 599) {
      throw new RangeError("Failed to construct 'Response': The status provided (0) is outside the range [200, 599].")
    }
    this.ok = this.status >= 200 && this.status < 300;
    this.statusText = options.statusText === undefined ? '' : '' + options.statusText;
    this.headers = new Headers$1(options.headers);
    this.url = options.url || '';
    this._initBody(bodyInit);
  }

  Body.call(Response.prototype);

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers$1(this.headers),
      url: this.url
    })
  };

  Response.error = function() {
    var response = new Response(null, {status: 200, statusText: ''});
    response.ok = false;
    response.status = 0;
    response.type = 'error';
    return response
  };

  var redirectStatuses = [301, 302, 303, 307, 308];

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  };

  var DOMException = g.DOMException;
  try {
    new DOMException();
  } catch (err) {
    DOMException = function(message, name) {
      this.message = message;
      this.name = name;
      var error = Error(message);
      this.stack = error.stack;
    };
    DOMException.prototype = Object.create(Error.prototype);
    DOMException.prototype.constructor = DOMException;
  }

  function fetch$1(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init);

      if (request.signal && request.signal.aborted) {
        return reject(new DOMException('Aborted', 'AbortError'))
      }

      var xhr = new XMLHttpRequest();

      function abortXhr() {
        xhr.abort();
      }

      xhr.onload = function() {
        var options = {
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        };
        // This check if specifically for when a user fetches a file locally from the file system
        // Only if the status is out of a normal range
        if (request.url.indexOf('file://') === 0 && (xhr.status < 200 || xhr.status > 599)) {
          options.status = 200;
        } else {
          options.status = xhr.status;
        }
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
        var body = 'response' in xhr ? xhr.response : xhr.responseText;
        setTimeout(function() {
          resolve(new Response(body, options));
        }, 0);
      };

      xhr.onerror = function() {
        setTimeout(function() {
          reject(new TypeError('Network request failed'));
        }, 0);
      };

      xhr.ontimeout = function() {
        setTimeout(function() {
          reject(new TypeError('Network request timed out'));
        }, 0);
      };

      xhr.onabort = function() {
        setTimeout(function() {
          reject(new DOMException('Aborted', 'AbortError'));
        }, 0);
      };

      function fixUrl(url) {
        try {
          return url === '' && g.location.href ? g.location.href : url
        } catch (e) {
          return url
        }
      }

      xhr.open(request.method, fixUrl(request.url), true);

      if (request.credentials === 'include') {
        xhr.withCredentials = true;
      } else if (request.credentials === 'omit') {
        xhr.withCredentials = false;
      }

      if ('responseType' in xhr) {
        if (support.blob) {
          xhr.responseType = 'blob';
        } else if (
          support.arrayBuffer
        ) {
          xhr.responseType = 'arraybuffer';
        }
      }

      if (init && typeof init.headers === 'object' && !(init.headers instanceof Headers$1 || (g.Headers && init.headers instanceof g.Headers))) {
        var names = [];
        Object.getOwnPropertyNames(init.headers).forEach(function(name) {
          names.push(normalizeName(name));
          xhr.setRequestHeader(name, normalizeValue(init.headers[name]));
        });
        request.headers.forEach(function(value, name) {
          if (names.indexOf(name) === -1) {
            xhr.setRequestHeader(name, value);
          }
        });
      } else {
        request.headers.forEach(function(value, name) {
          xhr.setRequestHeader(name, value);
        });
      }

      if (request.signal) {
        request.signal.addEventListener('abort', abortXhr);

        xhr.onreadystatechange = function() {
          // DONE (success or failure)
          if (xhr.readyState === 4) {
            request.signal.removeEventListener('abort', abortXhr);
          }
        };
      }

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
    })
  }

  fetch$1.polyfill = true;

  if (!g.fetch) {
    g.fetch = fetch$1;
    g.Headers = Headers$1;
    g.Request = Request;
    g.Response = Response;
  }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  var check = function (it) {
    return it && it.Math === Math && it;
  };

  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var globalThis_1 =
    // eslint-disable-next-line es/no-global-this -- safe
    check(typeof globalThis == 'object' && globalThis) ||
    check(typeof window == 'object' && window) ||
    // eslint-disable-next-line no-restricted-globals -- safe
    check(typeof self == 'object' && self) ||
    check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
    check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
    // eslint-disable-next-line no-new-func -- fallback
    (function () { return this; })() || Function('return this')();

  var objectGetOwnPropertyDescriptor = {};

  var fails$Y = function (exec) {
    try {
      return !!exec();
    } catch (error) {
      return true;
    }
  };

  var fails$X = fails$Y;

  // Detect IE8's incomplete defineProperty implementation
  var descriptors = !fails$X(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] !== 7;
  });

  var fails$W = fails$Y;

  var functionBindNative = !fails$W(function () {
    // eslint-disable-next-line es/no-function-prototype-bind -- safe
    var test = (function () { /* empty */ }).bind();
    // eslint-disable-next-line no-prototype-builtins -- safe
    return typeof test != 'function' || test.hasOwnProperty('prototype');
  });

  var NATIVE_BIND$4 = functionBindNative;

  var call$D = Function.prototype.call;

  var functionCall = NATIVE_BIND$4 ? call$D.bind(call$D) : function () {
    return call$D.apply(call$D, arguments);
  };

  var objectPropertyIsEnumerable = {};

  var $propertyIsEnumerable$2 = {}.propertyIsEnumerable;
  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var getOwnPropertyDescriptor$6 = Object.getOwnPropertyDescriptor;

  // Nashorn ~ JDK8 bug
  var NASHORN_BUG = getOwnPropertyDescriptor$6 && !$propertyIsEnumerable$2.call({ 1: 2 }, 1);

  // `Object.prototype.propertyIsEnumerable` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
  objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
    var descriptor = getOwnPropertyDescriptor$6(this, V);
    return !!descriptor && descriptor.enumerable;
  } : $propertyIsEnumerable$2;

  var createPropertyDescriptor$8 = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };

  var NATIVE_BIND$3 = functionBindNative;

  var FunctionPrototype$2 = Function.prototype;
  var call$C = FunctionPrototype$2.call;
  var uncurryThisWithBind = NATIVE_BIND$3 && FunctionPrototype$2.bind.bind(call$C, call$C);

  var functionUncurryThis = NATIVE_BIND$3 ? uncurryThisWithBind : function (fn) {
    return function () {
      return call$C.apply(fn, arguments);
    };
  };

  var uncurryThis$Z = functionUncurryThis;

  var toString$q = uncurryThis$Z({}.toString);
  var stringSlice$c = uncurryThis$Z(''.slice);

  var classofRaw$2 = function (it) {
    return stringSlice$c(toString$q(it), 8, -1);
  };

  var uncurryThis$Y = functionUncurryThis;
  var fails$V = fails$Y;
  var classof$k = classofRaw$2;

  var $Object$5 = Object;
  var split$3 = uncurryThis$Y(''.split);

  // fallback for non-array-like ES3 and non-enumerable old V8 strings
  var indexedObject = fails$V(function () {
    // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    // eslint-disable-next-line no-prototype-builtins -- safe
    return !$Object$5('z').propertyIsEnumerable(0);
  }) ? function (it) {
    return classof$k(it) === 'String' ? split$3(it, '') : $Object$5(it);
  } : $Object$5;

  // we can't use just `it == null` since of `document.all` special case
  // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
  var isNullOrUndefined$b = function (it) {
    return it === null || it === undefined;
  };

  var isNullOrUndefined$a = isNullOrUndefined$b;

  var $TypeError$r = TypeError;

  // `RequireObjectCoercible` abstract operation
  // https://tc39.es/ecma262/#sec-requireobjectcoercible
  var requireObjectCoercible$d = function (it) {
    if (isNullOrUndefined$a(it)) throw new $TypeError$r("Can't call method on " + it);
    return it;
  };

  // toObject with fallback for non-array-like ES3 strings
  var IndexedObject$4 = indexedObject;
  var requireObjectCoercible$c = requireObjectCoercible$d;

  var toIndexedObject$d = function (it) {
    return IndexedObject$4(requireObjectCoercible$c(it));
  };

  // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
  var documentAll = typeof document == 'object' && document.all;

  // `IsCallable` abstract operation
  // https://tc39.es/ecma262/#sec-iscallable
  // eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
  var isCallable$v = typeof documentAll == 'undefined' && documentAll !== undefined ? function (argument) {
    return typeof argument == 'function' || argument === documentAll;
  } : function (argument) {
    return typeof argument == 'function';
  };

  var isCallable$u = isCallable$v;

  var isObject$s = function (it) {
    return typeof it == 'object' ? it !== null : isCallable$u(it);
  };

  var globalThis$U = globalThis_1;
  var isCallable$t = isCallable$v;

  var aFunction = function (argument) {
    return isCallable$t(argument) ? argument : undefined;
  };

  var getBuiltIn$g = function (namespace, method) {
    return arguments.length < 2 ? aFunction(globalThis$U[namespace]) : globalThis$U[namespace] && globalThis$U[namespace][method];
  };

  var uncurryThis$X = functionUncurryThis;

  var objectIsPrototypeOf = uncurryThis$X({}.isPrototypeOf);

  var globalThis$T = globalThis_1;

  var navigator = globalThis$T.navigator;
  var userAgent$7 = navigator && navigator.userAgent;

  var environmentUserAgent = userAgent$7 ? String(userAgent$7) : '';

  var globalThis$S = globalThis_1;
  var userAgent$6 = environmentUserAgent;

  var process$3 = globalThis$S.process;
  var Deno$1 = globalThis$S.Deno;
  var versions = process$3 && process$3.versions || Deno$1 && Deno$1.version;
  var v8 = versions && versions.v8;
  var match, version;

  if (v8) {
    match = v8.split('.');
    // in old Chrome, versions of V8 isn't V8 = Chrome / 10
    // but their correct versions are not interesting for us
    version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
  }

  // BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
  // so check `userAgent` even if `.v8` exists, but 0
  if (!version && userAgent$6) {
    match = userAgent$6.match(/Edge\/(\d+)/);
    if (!match || match[1] >= 74) {
      match = userAgent$6.match(/Chrome\/(\d+)/);
      if (match) version = +match[1];
    }
  }

  var environmentV8Version = version;

  /* eslint-disable es/no-symbol -- required for testing */
  var V8_VERSION$3 = environmentV8Version;
  var fails$U = fails$Y;
  var globalThis$R = globalThis_1;

  var $String$6 = globalThis$R.String;

  // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
  var symbolConstructorDetection = !!Object.getOwnPropertySymbols && !fails$U(function () {
    var symbol = Symbol('symbol detection');
    // Chrome 38 Symbol has incorrect toString conversion
    // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
    // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
    // of course, fail.
    return !$String$6(symbol) || !(Object(symbol) instanceof Symbol) ||
      // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
      !Symbol.sham && V8_VERSION$3 && V8_VERSION$3 < 41;
  });

  /* eslint-disable es/no-symbol -- required for testing */
  var NATIVE_SYMBOL$6 = symbolConstructorDetection;

  var useSymbolAsUid = NATIVE_SYMBOL$6
    && !Symbol.sham
    && typeof Symbol.iterator == 'symbol';

  var getBuiltIn$f = getBuiltIn$g;
  var isCallable$s = isCallable$v;
  var isPrototypeOf$a = objectIsPrototypeOf;
  var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

  var $Object$4 = Object;

  var isSymbol$6 = USE_SYMBOL_AS_UID$1 ? function (it) {
    return typeof it == 'symbol';
  } : function (it) {
    var $Symbol = getBuiltIn$f('Symbol');
    return isCallable$s($Symbol) && isPrototypeOf$a($Symbol.prototype, $Object$4(it));
  };

  var $String$5 = String;

  var tryToString$7 = function (argument) {
    try {
      return $String$5(argument);
    } catch (error) {
      return 'Object';
    }
  };

  var isCallable$r = isCallable$v;
  var tryToString$6 = tryToString$7;

  var $TypeError$q = TypeError;

  // `Assert: IsCallable(argument) is true`
  var aCallable$n = function (argument) {
    if (isCallable$r(argument)) return argument;
    throw new $TypeError$q(tryToString$6(argument) + ' is not a function');
  };

  var aCallable$m = aCallable$n;
  var isNullOrUndefined$9 = isNullOrUndefined$b;

  // `GetMethod` abstract operation
  // https://tc39.es/ecma262/#sec-getmethod
  var getMethod$8 = function (V, P) {
    var func = V[P];
    return isNullOrUndefined$9(func) ? undefined : aCallable$m(func);
  };

  var call$B = functionCall;
  var isCallable$q = isCallable$v;
  var isObject$r = isObject$s;

  var $TypeError$p = TypeError;

  // `OrdinaryToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-ordinarytoprimitive
  var ordinaryToPrimitive$2 = function (input, pref) {
    var fn, val;
    if (pref === 'string' && isCallable$q(fn = input.toString) && !isObject$r(val = call$B(fn, input))) return val;
    if (isCallable$q(fn = input.valueOf) && !isObject$r(val = call$B(fn, input))) return val;
    if (pref !== 'string' && isCallable$q(fn = input.toString) && !isObject$r(val = call$B(fn, input))) return val;
    throw new $TypeError$p("Can't convert object to primitive value");
  };

  var sharedStore = {exports: {}};

  var isPure = false;

  var globalThis$Q = globalThis_1;

  // eslint-disable-next-line es/no-object-defineproperty -- safe
  var defineProperty$c = Object.defineProperty;

  var defineGlobalProperty$3 = function (key, value) {
    try {
      defineProperty$c(globalThis$Q, key, { value: value, configurable: true, writable: true });
    } catch (error) {
      globalThis$Q[key] = value;
    } return value;
  };

  var globalThis$P = globalThis_1;
  var defineGlobalProperty$2 = defineGlobalProperty$3;

  var SHARED = '__core-js_shared__';
  var store$3 = sharedStore.exports = globalThis$P[SHARED] || defineGlobalProperty$2(SHARED, {});

  (store$3.versions || (store$3.versions = [])).push({
    version: '3.38.1',
    mode: 'global',
    copyright: '© 2014-2024 Denis Pushkarev (zloirock.ru)',
    license: 'https://github.com/zloirock/core-js/blob/v3.38.1/LICENSE',
    source: 'https://github.com/zloirock/core-js'
  });

  var sharedStoreExports = sharedStore.exports;

  var store$2 = sharedStoreExports;

  var shared$7 = function (key, value) {
    return store$2[key] || (store$2[key] = value || {});
  };

  var requireObjectCoercible$b = requireObjectCoercible$d;

  var $Object$3 = Object;

  // `ToObject` abstract operation
  // https://tc39.es/ecma262/#sec-toobject
  var toObject$k = function (argument) {
    return $Object$3(requireObjectCoercible$b(argument));
  };

  var uncurryThis$W = functionUncurryThis;
  var toObject$j = toObject$k;

  var hasOwnProperty = uncurryThis$W({}.hasOwnProperty);

  // `HasOwnProperty` abstract operation
  // https://tc39.es/ecma262/#sec-hasownproperty
  // eslint-disable-next-line es/no-object-hasown -- safe
  var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
    return hasOwnProperty(toObject$j(it), key);
  };

  var uncurryThis$V = functionUncurryThis;

  var id$2 = 0;
  var postfix = Math.random();
  var toString$p = uncurryThis$V(1.0.toString);

  var uid$5 = function (key) {
    return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString$p(++id$2 + postfix, 36);
  };

  var globalThis$O = globalThis_1;
  var shared$6 = shared$7;
  var hasOwn$s = hasOwnProperty_1;
  var uid$4 = uid$5;
  var NATIVE_SYMBOL$5 = symbolConstructorDetection;
  var USE_SYMBOL_AS_UID = useSymbolAsUid;

  var Symbol$3 = globalThis$O.Symbol;
  var WellKnownSymbolsStore$1 = shared$6('wks');
  var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$3['for'] || Symbol$3 : Symbol$3 && Symbol$3.withoutSetter || uid$4;

  var wellKnownSymbol$x = function (name) {
    if (!hasOwn$s(WellKnownSymbolsStore$1, name)) {
      WellKnownSymbolsStore$1[name] = NATIVE_SYMBOL$5 && hasOwn$s(Symbol$3, name)
        ? Symbol$3[name]
        : createWellKnownSymbol('Symbol.' + name);
    } return WellKnownSymbolsStore$1[name];
  };

  var call$A = functionCall;
  var isObject$q = isObject$s;
  var isSymbol$5 = isSymbol$6;
  var getMethod$7 = getMethod$8;
  var ordinaryToPrimitive$1 = ordinaryToPrimitive$2;
  var wellKnownSymbol$w = wellKnownSymbol$x;

  var $TypeError$o = TypeError;
  var TO_PRIMITIVE$1 = wellKnownSymbol$w('toPrimitive');

  // `ToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-toprimitive
  var toPrimitive$3 = function (input, pref) {
    if (!isObject$q(input) || isSymbol$5(input)) return input;
    var exoticToPrim = getMethod$7(input, TO_PRIMITIVE$1);
    var result;
    if (exoticToPrim) {
      if (pref === undefined) pref = 'default';
      result = call$A(exoticToPrim, input, pref);
      if (!isObject$q(result) || isSymbol$5(result)) return result;
      throw new $TypeError$o("Can't convert object to primitive value");
    }
    if (pref === undefined) pref = 'number';
    return ordinaryToPrimitive$1(input, pref);
  };

  var toPrimitive$2 = toPrimitive$3;
  var isSymbol$4 = isSymbol$6;

  // `ToPropertyKey` abstract operation
  // https://tc39.es/ecma262/#sec-topropertykey
  var toPropertyKey$4 = function (argument) {
    var key = toPrimitive$2(argument, 'string');
    return isSymbol$4(key) ? key : key + '';
  };

  var globalThis$N = globalThis_1;
  var isObject$p = isObject$s;

  var document$3 = globalThis$N.document;
  // typeof document.createElement is 'object' in old IE
  var EXISTS$1 = isObject$p(document$3) && isObject$p(document$3.createElement);

  var documentCreateElement$2 = function (it) {
    return EXISTS$1 ? document$3.createElement(it) : {};
  };

  var DESCRIPTORS$B = descriptors;
  var fails$T = fails$Y;
  var createElement$1 = documentCreateElement$2;

  // Thanks to IE8 for its funny defineProperty
  var ie8DomDefine = !DESCRIPTORS$B && !fails$T(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty(createElement$1('div'), 'a', {
      get: function () { return 7; }
    }).a !== 7;
  });

  var DESCRIPTORS$A = descriptors;
  var call$z = functionCall;
  var propertyIsEnumerableModule$2 = objectPropertyIsEnumerable;
  var createPropertyDescriptor$7 = createPropertyDescriptor$8;
  var toIndexedObject$c = toIndexedObject$d;
  var toPropertyKey$3 = toPropertyKey$4;
  var hasOwn$r = hasOwnProperty_1;
  var IE8_DOM_DEFINE$1 = ie8DomDefine;

  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var $getOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor;

  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
  objectGetOwnPropertyDescriptor.f = DESCRIPTORS$A ? $getOwnPropertyDescriptor$2 : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject$c(O);
    P = toPropertyKey$3(P);
    if (IE8_DOM_DEFINE$1) try {
      return $getOwnPropertyDescriptor$2(O, P);
    } catch (error) { /* empty */ }
    if (hasOwn$r(O, P)) return createPropertyDescriptor$7(!call$z(propertyIsEnumerableModule$2.f, O, P), O[P]);
  };

  var objectDefineProperty = {};

  var DESCRIPTORS$z = descriptors;
  var fails$S = fails$Y;

  // V8 ~ Chrome 36-
  // https://bugs.chromium.org/p/v8/issues/detail?id=3334
  var v8PrototypeDefineBug = DESCRIPTORS$z && fails$S(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty(function () { /* empty */ }, 'prototype', {
      value: 42,
      writable: false
    }).prototype !== 42;
  });

  var isObject$o = isObject$s;

  var $String$4 = String;
  var $TypeError$n = TypeError;

  // `Assert: Type(argument) is Object`
  var anObject$y = function (argument) {
    if (isObject$o(argument)) return argument;
    throw new $TypeError$n($String$4(argument) + ' is not an object');
  };

  var DESCRIPTORS$y = descriptors;
  var IE8_DOM_DEFINE = ie8DomDefine;
  var V8_PROTOTYPE_DEFINE_BUG$1 = v8PrototypeDefineBug;
  var anObject$x = anObject$y;
  var toPropertyKey$2 = toPropertyKey$4;

  var $TypeError$m = TypeError;
  // eslint-disable-next-line es/no-object-defineproperty -- safe
  var $defineProperty$1 = Object.defineProperty;
  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;
  var ENUMERABLE = 'enumerable';
  var CONFIGURABLE$1 = 'configurable';
  var WRITABLE = 'writable';

  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  objectDefineProperty.f = DESCRIPTORS$y ? V8_PROTOTYPE_DEFINE_BUG$1 ? function defineProperty(O, P, Attributes) {
    anObject$x(O);
    P = toPropertyKey$2(P);
    anObject$x(Attributes);
    if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
      var current = $getOwnPropertyDescriptor$1(O, P);
      if (current && current[WRITABLE]) {
        O[P] = Attributes.value;
        Attributes = {
          configurable: CONFIGURABLE$1 in Attributes ? Attributes[CONFIGURABLE$1] : current[CONFIGURABLE$1],
          enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
          writable: false
        };
      }
    } return $defineProperty$1(O, P, Attributes);
  } : $defineProperty$1 : function defineProperty(O, P, Attributes) {
    anObject$x(O);
    P = toPropertyKey$2(P);
    anObject$x(Attributes);
    if (IE8_DOM_DEFINE) try {
      return $defineProperty$1(O, P, Attributes);
    } catch (error) { /* empty */ }
    if ('get' in Attributes || 'set' in Attributes) throw new $TypeError$m('Accessors not supported');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };

  var DESCRIPTORS$x = descriptors;
  var definePropertyModule$6 = objectDefineProperty;
  var createPropertyDescriptor$6 = createPropertyDescriptor$8;

  var createNonEnumerableProperty$e = DESCRIPTORS$x ? function (object, key, value) {
    return definePropertyModule$6.f(object, key, createPropertyDescriptor$6(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var makeBuiltIn$3 = {exports: {}};

  var DESCRIPTORS$w = descriptors;
  var hasOwn$q = hasOwnProperty_1;

  var FunctionPrototype$1 = Function.prototype;
  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var getDescriptor = DESCRIPTORS$w && Object.getOwnPropertyDescriptor;

  var EXISTS = hasOwn$q(FunctionPrototype$1, 'name');
  // additional protection from minified / mangled / dropped function names
  var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
  var CONFIGURABLE = EXISTS && (!DESCRIPTORS$w || (DESCRIPTORS$w && getDescriptor(FunctionPrototype$1, 'name').configurable));

  var functionName = {
    EXISTS: EXISTS,
    PROPER: PROPER,
    CONFIGURABLE: CONFIGURABLE
  };

  var uncurryThis$U = functionUncurryThis;
  var isCallable$p = isCallable$v;
  var store$1 = sharedStoreExports;

  var functionToString = uncurryThis$U(Function.toString);

  // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
  if (!isCallable$p(store$1.inspectSource)) {
    store$1.inspectSource = function (it) {
      return functionToString(it);
    };
  }

  var inspectSource$3 = store$1.inspectSource;

  var globalThis$M = globalThis_1;
  var isCallable$o = isCallable$v;

  var WeakMap$1 = globalThis$M.WeakMap;

  var weakMapBasicDetection = isCallable$o(WeakMap$1) && /native code/.test(String(WeakMap$1));

  var shared$5 = shared$7;
  var uid$3 = uid$5;

  var keys$2 = shared$5('keys');

  var sharedKey$4 = function (key) {
    return keys$2[key] || (keys$2[key] = uid$3(key));
  };

  var hiddenKeys$6 = {};

  var NATIVE_WEAK_MAP$1 = weakMapBasicDetection;
  var globalThis$L = globalThis_1;
  var isObject$n = isObject$s;
  var createNonEnumerableProperty$d = createNonEnumerableProperty$e;
  var hasOwn$p = hasOwnProperty_1;
  var shared$4 = sharedStoreExports;
  var sharedKey$3 = sharedKey$4;
  var hiddenKeys$5 = hiddenKeys$6;

  var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
  var TypeError$8 = globalThis$L.TypeError;
  var WeakMap = globalThis$L.WeakMap;
  var set$2, get$2, has$6;

  var enforce = function (it) {
    return has$6(it) ? get$2(it) : set$2(it, {});
  };

  var getterFor = function (TYPE) {
    return function (it) {
      var state;
      if (!isObject$n(it) || (state = get$2(it)).type !== TYPE) {
        throw new TypeError$8('Incompatible receiver, ' + TYPE + ' required');
      } return state;
    };
  };

  if (NATIVE_WEAK_MAP$1 || shared$4.state) {
    var store = shared$4.state || (shared$4.state = new WeakMap());
    /* eslint-disable no-self-assign -- prototype methods protection */
    store.get = store.get;
    store.has = store.has;
    store.set = store.set;
    /* eslint-enable no-self-assign -- prototype methods protection */
    set$2 = function (it, metadata) {
      if (store.has(it)) throw new TypeError$8(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      store.set(it, metadata);
      return metadata;
    };
    get$2 = function (it) {
      return store.get(it) || {};
    };
    has$6 = function (it) {
      return store.has(it);
    };
  } else {
    var STATE = sharedKey$3('state');
    hiddenKeys$5[STATE] = true;
    set$2 = function (it, metadata) {
      if (hasOwn$p(it, STATE)) throw new TypeError$8(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      createNonEnumerableProperty$d(it, STATE, metadata);
      return metadata;
    };
    get$2 = function (it) {
      return hasOwn$p(it, STATE) ? it[STATE] : {};
    };
    has$6 = function (it) {
      return hasOwn$p(it, STATE);
    };
  }

  var internalState = {
    set: set$2,
    get: get$2,
    has: has$6,
    enforce: enforce,
    getterFor: getterFor
  };

  var uncurryThis$T = functionUncurryThis;
  var fails$R = fails$Y;
  var isCallable$n = isCallable$v;
  var hasOwn$o = hasOwnProperty_1;
  var DESCRIPTORS$v = descriptors;
  var CONFIGURABLE_FUNCTION_NAME$2 = functionName.CONFIGURABLE;
  var inspectSource$2 = inspectSource$3;
  var InternalStateModule$c = internalState;

  var enforceInternalState$4 = InternalStateModule$c.enforce;
  var getInternalState$8 = InternalStateModule$c.get;
  var $String$3 = String;
  // eslint-disable-next-line es/no-object-defineproperty -- safe
  var defineProperty$b = Object.defineProperty;
  var stringSlice$b = uncurryThis$T(''.slice);
  var replace$a = uncurryThis$T(''.replace);
  var join$6 = uncurryThis$T([].join);

  var CONFIGURABLE_LENGTH = DESCRIPTORS$v && !fails$R(function () {
    return defineProperty$b(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
  });

  var TEMPLATE = String(String).split('String');

  var makeBuiltIn$2 = makeBuiltIn$3.exports = function (value, name, options) {
    if (stringSlice$b($String$3(name), 0, 7) === 'Symbol(') {
      name = '[' + replace$a($String$3(name), /^Symbol\(([^)]*)\).*$/, '$1') + ']';
    }
    if (options && options.getter) name = 'get ' + name;
    if (options && options.setter) name = 'set ' + name;
    if (!hasOwn$o(value, 'name') || (CONFIGURABLE_FUNCTION_NAME$2 && value.name !== name)) {
      if (DESCRIPTORS$v) defineProperty$b(value, 'name', { value: name, configurable: true });
      else value.name = name;
    }
    if (CONFIGURABLE_LENGTH && options && hasOwn$o(options, 'arity') && value.length !== options.arity) {
      defineProperty$b(value, 'length', { value: options.arity });
    }
    try {
      if (options && hasOwn$o(options, 'constructor') && options.constructor) {
        if (DESCRIPTORS$v) defineProperty$b(value, 'prototype', { writable: false });
      // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
      } else if (value.prototype) value.prototype = undefined;
    } catch (error) { /* empty */ }
    var state = enforceInternalState$4(value);
    if (!hasOwn$o(state, 'source')) {
      state.source = join$6(TEMPLATE, typeof name == 'string' ? name : '');
    } return value;
  };

  // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
  // eslint-disable-next-line no-extend-native -- required
  Function.prototype.toString = makeBuiltIn$2(function toString() {
    return isCallable$n(this) && getInternalState$8(this).source || inspectSource$2(this);
  }, 'toString');

  var makeBuiltInExports = makeBuiltIn$3.exports;

  var isCallable$m = isCallable$v;
  var definePropertyModule$5 = objectDefineProperty;
  var makeBuiltIn$1 = makeBuiltInExports;
  var defineGlobalProperty$1 = defineGlobalProperty$3;

  var defineBuiltIn$k = function (O, key, value, options) {
    if (!options) options = {};
    var simple = options.enumerable;
    var name = options.name !== undefined ? options.name : key;
    if (isCallable$m(value)) makeBuiltIn$1(value, name, options);
    if (options.global) {
      if (simple) O[key] = value;
      else defineGlobalProperty$1(key, value);
    } else {
      try {
        if (!options.unsafe) delete O[key];
        else if (O[key]) simple = true;
      } catch (error) { /* empty */ }
      if (simple) O[key] = value;
      else definePropertyModule$5.f(O, key, {
        value: value,
        enumerable: false,
        configurable: !options.nonConfigurable,
        writable: !options.nonWritable
      });
    } return O;
  };

  var objectGetOwnPropertyNames = {};

  var ceil = Math.ceil;
  var floor$7 = Math.floor;

  // `Math.trunc` method
  // https://tc39.es/ecma262/#sec-math.trunc
  // eslint-disable-next-line es/no-math-trunc -- safe
  var mathTrunc = Math.trunc || function trunc(x) {
    var n = +x;
    return (n > 0 ? floor$7 : ceil)(n);
  };

  var trunc$1 = mathTrunc;

  // `ToIntegerOrInfinity` abstract operation
  // https://tc39.es/ecma262/#sec-tointegerorinfinity
  var toIntegerOrInfinity$f = function (argument) {
    var number = +argument;
    // eslint-disable-next-line no-self-compare -- NaN check
    return number !== number || number === 0 ? 0 : trunc$1(number);
  };

  var toIntegerOrInfinity$e = toIntegerOrInfinity$f;

  var max$4 = Math.max;
  var min$9 = Math.min;

  // Helper for a popular repeating case of the spec:
  // Let integer be ? ToInteger(index).
  // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
  var toAbsoluteIndex$6 = function (index, length) {
    var integer = toIntegerOrInfinity$e(index);
    return integer < 0 ? max$4(integer + length, 0) : min$9(integer, length);
  };

  var toIntegerOrInfinity$d = toIntegerOrInfinity$f;

  var min$8 = Math.min;

  // `ToLength` abstract operation
  // https://tc39.es/ecma262/#sec-tolength
  var toLength$9 = function (argument) {
    var len = toIntegerOrInfinity$d(argument);
    return len > 0 ? min$8(len, 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
  };

  var toLength$8 = toLength$9;

  // `LengthOfArrayLike` abstract operation
  // https://tc39.es/ecma262/#sec-lengthofarraylike
  var lengthOfArrayLike$n = function (obj) {
    return toLength$8(obj.length);
  };

  var toIndexedObject$b = toIndexedObject$d;
  var toAbsoluteIndex$5 = toAbsoluteIndex$6;
  var lengthOfArrayLike$m = lengthOfArrayLike$n;

  // `Array.prototype.{ indexOf, includes }` methods implementation
  var createMethod$6 = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = toIndexedObject$b($this);
      var length = lengthOfArrayLike$m(O);
      if (length === 0) return !IS_INCLUDES && -1;
      var index = toAbsoluteIndex$5(fromIndex, length);
      var value;
      // Array#includes uses SameValueZero equality algorithm
      // eslint-disable-next-line no-self-compare -- NaN check
      if (IS_INCLUDES && el !== el) while (length > index) {
        value = O[index++];
        // eslint-disable-next-line no-self-compare -- NaN check
        if (value !== value) return true;
      // Array#indexOf ignores holes, Array#includes - not
      } else for (;length > index; index++) {
        if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
      } return !IS_INCLUDES && -1;
    };
  };

  var arrayIncludes = {
    // `Array.prototype.includes` method
    // https://tc39.es/ecma262/#sec-array.prototype.includes
    includes: createMethod$6(true),
    // `Array.prototype.indexOf` method
    // https://tc39.es/ecma262/#sec-array.prototype.indexof
    indexOf: createMethod$6(false)
  };

  var uncurryThis$S = functionUncurryThis;
  var hasOwn$n = hasOwnProperty_1;
  var toIndexedObject$a = toIndexedObject$d;
  var indexOf$1 = arrayIncludes.indexOf;
  var hiddenKeys$4 = hiddenKeys$6;

  var push$d = uncurryThis$S([].push);

  var objectKeysInternal = function (object, names) {
    var O = toIndexedObject$a(object);
    var i = 0;
    var result = [];
    var key;
    for (key in O) !hasOwn$n(hiddenKeys$4, key) && hasOwn$n(O, key) && push$d(result, key);
    // Don't enum bug & hidden keys
    while (names.length > i) if (hasOwn$n(O, key = names[i++])) {
      ~indexOf$1(result, key) || push$d(result, key);
    }
    return result;
  };

  // IE8- don't enum bug keys
  var enumBugKeys$3 = [
    'constructor',
    'hasOwnProperty',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'toLocaleString',
    'toString',
    'valueOf'
  ];

  var internalObjectKeys$1 = objectKeysInternal;
  var enumBugKeys$2 = enumBugKeys$3;

  var hiddenKeys$3 = enumBugKeys$2.concat('length', 'prototype');

  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  // eslint-disable-next-line es/no-object-getownpropertynames -- safe
  objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return internalObjectKeys$1(O, hiddenKeys$3);
  };

  var objectGetOwnPropertySymbols = {};

  // eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
  objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

  var getBuiltIn$e = getBuiltIn$g;
  var uncurryThis$R = functionUncurryThis;
  var getOwnPropertyNamesModule$2 = objectGetOwnPropertyNames;
  var getOwnPropertySymbolsModule$3 = objectGetOwnPropertySymbols;
  var anObject$w = anObject$y;

  var concat$3 = uncurryThis$R([].concat);

  // all object keys, includes non-enumerable and symbols
  var ownKeys$3 = getBuiltIn$e('Reflect', 'ownKeys') || function ownKeys(it) {
    var keys = getOwnPropertyNamesModule$2.f(anObject$w(it));
    var getOwnPropertySymbols = getOwnPropertySymbolsModule$3.f;
    return getOwnPropertySymbols ? concat$3(keys, getOwnPropertySymbols(it)) : keys;
  };

  var hasOwn$m = hasOwnProperty_1;
  var ownKeys$2 = ownKeys$3;
  var getOwnPropertyDescriptorModule$4 = objectGetOwnPropertyDescriptor;
  var definePropertyModule$4 = objectDefineProperty;

  var copyConstructorProperties$5 = function (target, source, exceptions) {
    var keys = ownKeys$2(source);
    var defineProperty = definePropertyModule$4.f;
    var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule$4.f;
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (!hasOwn$m(target, key) && !(exceptions && hasOwn$m(exceptions, key))) {
        defineProperty(target, key, getOwnPropertyDescriptor(source, key));
      }
    }
  };

  var fails$Q = fails$Y;
  var isCallable$l = isCallable$v;

  var replacement = /#|\.prototype\./;

  var isForced$5 = function (feature, detection) {
    var value = data[normalize(feature)];
    return value === POLYFILL ? true
      : value === NATIVE ? false
      : isCallable$l(detection) ? fails$Q(detection)
      : !!detection;
  };

  var normalize = isForced$5.normalize = function (string) {
    return String(string).replace(replacement, '.').toLowerCase();
  };

  var data = isForced$5.data = {};
  var NATIVE = isForced$5.NATIVE = 'N';
  var POLYFILL = isForced$5.POLYFILL = 'P';

  var isForced_1 = isForced$5;

  var globalThis$K = globalThis_1;
  var getOwnPropertyDescriptor$5 = objectGetOwnPropertyDescriptor.f;
  var createNonEnumerableProperty$c = createNonEnumerableProperty$e;
  var defineBuiltIn$j = defineBuiltIn$k;
  var defineGlobalProperty = defineGlobalProperty$3;
  var copyConstructorProperties$4 = copyConstructorProperties$5;
  var isForced$4 = isForced_1;

  /*
    options.target         - name of the target object
    options.global         - target is the global object
    options.stat           - export as static methods of target
    options.proto          - export as prototype methods of target
    options.real           - real prototype method for the `pure` version
    options.forced         - export even if the native feature is available
    options.bind           - bind methods to the target, required for the `pure` version
    options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
    options.unsafe         - use the simple assignment of property instead of delete + defineProperty
    options.sham           - add a flag to not completely full polyfills
    options.enumerable     - export as enumerable property
    options.dontCallGetSet - prevent calling a getter on target
    options.name           - the .name of the function if it does not match the key
  */
  var _export = function (options, source) {
    var TARGET = options.target;
    var GLOBAL = options.global;
    var STATIC = options.stat;
    var FORCED, target, key, targetProperty, sourceProperty, descriptor;
    if (GLOBAL) {
      target = globalThis$K;
    } else if (STATIC) {
      target = globalThis$K[TARGET] || defineGlobalProperty(TARGET, {});
    } else {
      target = globalThis$K[TARGET] && globalThis$K[TARGET].prototype;
    }
    if (target) for (key in source) {
      sourceProperty = source[key];
      if (options.dontCallGetSet) {
        descriptor = getOwnPropertyDescriptor$5(target, key);
        targetProperty = descriptor && descriptor.value;
      } else targetProperty = target[key];
      FORCED = isForced$4(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
      // contained in target
      if (!FORCED && targetProperty !== undefined) {
        if (typeof sourceProperty == typeof targetProperty) continue;
        copyConstructorProperties$4(sourceProperty, targetProperty);
      }
      // add a flag to not completely full polyfills
      if (options.sham || (targetProperty && targetProperty.sham)) {
        createNonEnumerableProperty$c(sourceProperty, 'sham', true);
      }
      defineBuiltIn$j(target, key, sourceProperty, options);
    }
  };

  var wellKnownSymbol$v = wellKnownSymbol$x;

  var TO_STRING_TAG$5 = wellKnownSymbol$v('toStringTag');
  var test$1 = {};

  test$1[TO_STRING_TAG$5] = 'z';

  var toStringTagSupport = String(test$1) === '[object z]';

  var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport;
  var isCallable$k = isCallable$v;
  var classofRaw$1 = classofRaw$2;
  var wellKnownSymbol$u = wellKnownSymbol$x;

  var TO_STRING_TAG$4 = wellKnownSymbol$u('toStringTag');
  var $Object$2 = Object;

  // ES3 wrong here
  var CORRECT_ARGUMENTS = classofRaw$1(function () { return arguments; }()) === 'Arguments';

  // fallback for IE11 Script Access Denied error
  var tryGet = function (it, key) {
    try {
      return it[key];
    } catch (error) { /* empty */ }
  };

  // getting tag from ES6+ `Object.prototype.toString`
  var classof$j = TO_STRING_TAG_SUPPORT$2 ? classofRaw$1 : function (it) {
    var O, tag, result;
    return it === undefined ? 'Undefined' : it === null ? 'Null'
      // @@toStringTag case
      : typeof (tag = tryGet(O = $Object$2(it), TO_STRING_TAG$4)) == 'string' ? tag
      // builtinTag case
      : CORRECT_ARGUMENTS ? classofRaw$1(O)
      // ES3 arguments fallback
      : (result = classofRaw$1(O)) === 'Object' && isCallable$k(O.callee) ? 'Arguments' : result;
  };

  var classof$i = classof$j;

  var $String$2 = String;

  var toString$o = function (argument) {
    if (classof$i(argument) === 'Symbol') throw new TypeError('Cannot convert a Symbol value to a string');
    return $String$2(argument);
  };

  var objectDefineProperties = {};

  var internalObjectKeys = objectKeysInternal;
  var enumBugKeys$1 = enumBugKeys$3;

  // `Object.keys` method
  // https://tc39.es/ecma262/#sec-object.keys
  // eslint-disable-next-line es/no-object-keys -- safe
  var objectKeys$4 = Object.keys || function keys(O) {
    return internalObjectKeys(O, enumBugKeys$1);
  };

  var DESCRIPTORS$u = descriptors;
  var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
  var definePropertyModule$3 = objectDefineProperty;
  var anObject$v = anObject$y;
  var toIndexedObject$9 = toIndexedObject$d;
  var objectKeys$3 = objectKeys$4;

  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  // eslint-disable-next-line es/no-object-defineproperties -- safe
  objectDefineProperties.f = DESCRIPTORS$u && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
    anObject$v(O);
    var props = toIndexedObject$9(Properties);
    var keys = objectKeys$3(Properties);
    var length = keys.length;
    var index = 0;
    var key;
    while (length > index) definePropertyModule$3.f(O, key = keys[index++], props[key]);
    return O;
  };

  var getBuiltIn$d = getBuiltIn$g;

  var html$2 = getBuiltIn$d('document', 'documentElement');

  /* global ActiveXObject -- old IE, WSH */
  var anObject$u = anObject$y;
  var definePropertiesModule$1 = objectDefineProperties;
  var enumBugKeys = enumBugKeys$3;
  var hiddenKeys$2 = hiddenKeys$6;
  var html$1 = html$2;
  var documentCreateElement$1 = documentCreateElement$2;
  var sharedKey$2 = sharedKey$4;

  var GT = '>';
  var LT = '<';
  var PROTOTYPE$2 = 'prototype';
  var SCRIPT = 'script';
  var IE_PROTO$1 = sharedKey$2('IE_PROTO');

  var EmptyConstructor = function () { /* empty */ };

  var scriptTag = function (content) {
    return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
  };

  // Create object with fake `null` prototype: use ActiveX Object with cleared prototype
  var NullProtoObjectViaActiveX = function (activeXDocument) {
    activeXDocument.write(scriptTag(''));
    activeXDocument.close();
    var temp = activeXDocument.parentWindow.Object;
    // eslint-disable-next-line no-useless-assignment -- avoid memory leak
    activeXDocument = null;
    return temp;
  };

  // Create object with fake `null` prototype: use iframe Object with cleared prototype
  var NullProtoObjectViaIFrame = function () {
    // Thrash, waste and sodomy: IE GC bug
    var iframe = documentCreateElement$1('iframe');
    var JS = 'java' + SCRIPT + ':';
    var iframeDocument;
    iframe.style.display = 'none';
    html$1.appendChild(iframe);
    // https://github.com/zloirock/core-js/issues/475
    iframe.src = String(JS);
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(scriptTag('document.F=Object'));
    iframeDocument.close();
    return iframeDocument.F;
  };

  // Check for document.domain and active x support
  // No need to use active x approach when document.domain is not set
  // see https://github.com/es-shims/es5-shim/issues/150
  // variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
  // avoid IE GC bug
  var activeXDocument;
  var NullProtoObject = function () {
    try {
      activeXDocument = new ActiveXObject('htmlfile');
    } catch (error) { /* ignore */ }
    NullProtoObject = typeof document != 'undefined'
      ? document.domain && activeXDocument
        ? NullProtoObjectViaActiveX(activeXDocument) // old IE
        : NullProtoObjectViaIFrame()
      : NullProtoObjectViaActiveX(activeXDocument); // WSH
    var length = enumBugKeys.length;
    while (length--) delete NullProtoObject[PROTOTYPE$2][enumBugKeys[length]];
    return NullProtoObject();
  };

  hiddenKeys$2[IE_PROTO$1] = true;

  // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create
  // eslint-disable-next-line es/no-object-create -- safe
  var objectCreate = Object.create || function create(O, Properties) {
    var result;
    if (O !== null) {
      EmptyConstructor[PROTOTYPE$2] = anObject$u(O);
      result = new EmptyConstructor();
      EmptyConstructor[PROTOTYPE$2] = null;
      // add "__proto__" for Object.getPrototypeOf polyfill
      result[IE_PROTO$1] = O;
    } else result = NullProtoObject();
    return Properties === undefined ? result : definePropertiesModule$1.f(result, Properties);
  };

  var objectGetOwnPropertyNamesExternal = {};

  var uncurryThis$Q = functionUncurryThis;

  var arraySlice$9 = uncurryThis$Q([].slice);

  /* eslint-disable es/no-object-getownpropertynames -- safe */
  var classof$h = classofRaw$2;
  var toIndexedObject$8 = toIndexedObject$d;
  var $getOwnPropertyNames$1 = objectGetOwnPropertyNames.f;
  var arraySlice$8 = arraySlice$9;

  var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
    ? Object.getOwnPropertyNames(window) : [];

  var getWindowNames = function (it) {
    try {
      return $getOwnPropertyNames$1(it);
    } catch (error) {
      return arraySlice$8(windowNames);
    }
  };

  // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
  objectGetOwnPropertyNamesExternal.f = function getOwnPropertyNames(it) {
    return windowNames && classof$h(it) === 'Window'
      ? getWindowNames(it)
      : $getOwnPropertyNames$1(toIndexedObject$8(it));
  };

  var makeBuiltIn = makeBuiltInExports;
  var defineProperty$a = objectDefineProperty;

  var defineBuiltInAccessor$f = function (target, name, descriptor) {
    if (descriptor.get) makeBuiltIn(descriptor.get, name, { getter: true });
    if (descriptor.set) makeBuiltIn(descriptor.set, name, { setter: true });
    return defineProperty$a.f(target, name, descriptor);
  };

  var wellKnownSymbolWrapped = {};

  var wellKnownSymbol$t = wellKnownSymbol$x;

  wellKnownSymbolWrapped.f = wellKnownSymbol$t;

  var globalThis$J = globalThis_1;

  var path$2 = globalThis$J;

  var path$1 = path$2;
  var hasOwn$l = hasOwnProperty_1;
  var wrappedWellKnownSymbolModule$1 = wellKnownSymbolWrapped;
  var defineProperty$9 = objectDefineProperty.f;

  var wellKnownSymbolDefine = function (NAME) {
    var Symbol = path$1.Symbol || (path$1.Symbol = {});
    if (!hasOwn$l(Symbol, NAME)) defineProperty$9(Symbol, NAME, {
      value: wrappedWellKnownSymbolModule$1.f(NAME)
    });
  };

  var call$y = functionCall;
  var getBuiltIn$c = getBuiltIn$g;
  var wellKnownSymbol$s = wellKnownSymbol$x;
  var defineBuiltIn$i = defineBuiltIn$k;

  var symbolDefineToPrimitive = function () {
    var Symbol = getBuiltIn$c('Symbol');
    var SymbolPrototype = Symbol && Symbol.prototype;
    var valueOf = SymbolPrototype && SymbolPrototype.valueOf;
    var TO_PRIMITIVE = wellKnownSymbol$s('toPrimitive');

    if (SymbolPrototype && !SymbolPrototype[TO_PRIMITIVE]) {
      // `Symbol.prototype[@@toPrimitive]` method
      // https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
      // eslint-disable-next-line no-unused-vars -- required for .length
      defineBuiltIn$i(SymbolPrototype, TO_PRIMITIVE, function (hint) {
        return call$y(valueOf, this);
      }, { arity: 1 });
    }
  };

  var defineProperty$8 = objectDefineProperty.f;
  var hasOwn$k = hasOwnProperty_1;
  var wellKnownSymbol$r = wellKnownSymbol$x;

  var TO_STRING_TAG$3 = wellKnownSymbol$r('toStringTag');

  var setToStringTag$d = function (target, TAG, STATIC) {
    if (target && !STATIC) target = target.prototype;
    if (target && !hasOwn$k(target, TO_STRING_TAG$3)) {
      defineProperty$8(target, TO_STRING_TAG$3, { configurable: true, value: TAG });
    }
  };

  var classofRaw = classofRaw$2;
  var uncurryThis$P = functionUncurryThis;

  var functionUncurryThisClause = function (fn) {
    // Nashorn bug:
    //   https://github.com/zloirock/core-js/issues/1128
    //   https://github.com/zloirock/core-js/issues/1130
    if (classofRaw(fn) === 'Function') return uncurryThis$P(fn);
  };

  var uncurryThis$O = functionUncurryThisClause;
  var aCallable$l = aCallable$n;
  var NATIVE_BIND$2 = functionBindNative;

  var bind$d = uncurryThis$O(uncurryThis$O.bind);

  // optional / simple context binding
  var functionBindContext = function (fn, that) {
    aCallable$l(fn);
    return that === undefined ? fn : NATIVE_BIND$2 ? bind$d(fn, that) : function (/* ...args */) {
      return fn.apply(that, arguments);
    };
  };

  var classof$g = classofRaw$2;

  // `IsArray` abstract operation
  // https://tc39.es/ecma262/#sec-isarray
  // eslint-disable-next-line es/no-array-isarray -- safe
  var isArray$7 = Array.isArray || function isArray(argument) {
    return classof$g(argument) === 'Array';
  };

  var uncurryThis$N = functionUncurryThis;
  var fails$P = fails$Y;
  var isCallable$j = isCallable$v;
  var classof$f = classof$j;
  var getBuiltIn$b = getBuiltIn$g;
  var inspectSource$1 = inspectSource$3;

  var noop = function () { /* empty */ };
  var construct$1 = getBuiltIn$b('Reflect', 'construct');
  var constructorRegExp = /^\s*(?:class|function)\b/;
  var exec$7 = uncurryThis$N(constructorRegExp.exec);
  var INCORRECT_TO_STRING = !constructorRegExp.test(noop);

  var isConstructorModern = function isConstructor(argument) {
    if (!isCallable$j(argument)) return false;
    try {
      construct$1(noop, [], argument);
      return true;
    } catch (error) {
      return false;
    }
  };

  var isConstructorLegacy = function isConstructor(argument) {
    if (!isCallable$j(argument)) return false;
    switch (classof$f(argument)) {
      case 'AsyncFunction':
      case 'GeneratorFunction':
      case 'AsyncGeneratorFunction': return false;
    }
    try {
      // we can't check .prototype since constructors produced by .bind haven't it
      // `Function#toString` throws on some built-it function in some legacy engines
      // (for example, `DOMQuad` and similar in FF41-)
      return INCORRECT_TO_STRING || !!exec$7(constructorRegExp, inspectSource$1(argument));
    } catch (error) {
      return true;
    }
  };

  isConstructorLegacy.sham = true;

  // `IsConstructor` abstract operation
  // https://tc39.es/ecma262/#sec-isconstructor
  var isConstructor$4 = !construct$1 || fails$P(function () {
    var called;
    return isConstructorModern(isConstructorModern.call)
      || !isConstructorModern(Object)
      || !isConstructorModern(function () { called = true; })
      || called;
  }) ? isConstructorLegacy : isConstructorModern;

  var isArray$6 = isArray$7;
  var isConstructor$3 = isConstructor$4;
  var isObject$m = isObject$s;
  var wellKnownSymbol$q = wellKnownSymbol$x;

  var SPECIES$6 = wellKnownSymbol$q('species');
  var $Array$3 = Array;

  // a part of `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate
  var arraySpeciesConstructor$1 = function (originalArray) {
    var C;
    if (isArray$6(originalArray)) {
      C = originalArray.constructor;
      // cross-realm fallback
      if (isConstructor$3(C) && (C === $Array$3 || isArray$6(C.prototype))) C = undefined;
      else if (isObject$m(C)) {
        C = C[SPECIES$6];
        if (C === null) C = undefined;
      }
    } return C === undefined ? $Array$3 : C;
  };

  var arraySpeciesConstructor = arraySpeciesConstructor$1;

  // `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate
  var arraySpeciesCreate$4 = function (originalArray, length) {
    return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
  };

  var bind$c = functionBindContext;
  var uncurryThis$M = functionUncurryThis;
  var IndexedObject$3 = indexedObject;
  var toObject$i = toObject$k;
  var lengthOfArrayLike$l = lengthOfArrayLike$n;
  var arraySpeciesCreate$3 = arraySpeciesCreate$4;

  var push$c = uncurryThis$M([].push);

  // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
  var createMethod$5 = function (TYPE) {
    var IS_MAP = TYPE === 1;
    var IS_FILTER = TYPE === 2;
    var IS_SOME = TYPE === 3;
    var IS_EVERY = TYPE === 4;
    var IS_FIND_INDEX = TYPE === 6;
    var IS_FILTER_REJECT = TYPE === 7;
    var NO_HOLES = TYPE === 5 || IS_FIND_INDEX;
    return function ($this, callbackfn, that, specificCreate) {
      var O = toObject$i($this);
      var self = IndexedObject$3(O);
      var length = lengthOfArrayLike$l(self);
      var boundFunction = bind$c(callbackfn, that);
      var index = 0;
      var create = specificCreate || arraySpeciesCreate$3;
      var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
      var value, result;
      for (;length > index; index++) if (NO_HOLES || index in self) {
        value = self[index];
        result = boundFunction(value, index, O);
        if (TYPE) {
          if (IS_MAP) target[index] = result; // map
          else if (result) switch (TYPE) {
            case 3: return true;              // some
            case 5: return value;             // find
            case 6: return index;             // findIndex
            case 2: push$c(target, value);      // filter
          } else switch (TYPE) {
            case 4: return false;             // every
            case 7: push$c(target, value);      // filterReject
          }
        }
      }
      return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
    };
  };

  var arrayIteration = {
    // `Array.prototype.forEach` method
    // https://tc39.es/ecma262/#sec-array.prototype.foreach
    forEach: createMethod$5(0),
    // `Array.prototype.map` method
    // https://tc39.es/ecma262/#sec-array.prototype.map
    map: createMethod$5(1),
    // `Array.prototype.filter` method
    // https://tc39.es/ecma262/#sec-array.prototype.filter
    filter: createMethod$5(2),
    // `Array.prototype.some` method
    // https://tc39.es/ecma262/#sec-array.prototype.some
    some: createMethod$5(3),
    // `Array.prototype.every` method
    // https://tc39.es/ecma262/#sec-array.prototype.every
    every: createMethod$5(4),
    // `Array.prototype.find` method
    // https://tc39.es/ecma262/#sec-array.prototype.find
    find: createMethod$5(5),
    // `Array.prototype.findIndex` method
    // https://tc39.es/ecma262/#sec-array.prototype.findIndex
    findIndex: createMethod$5(6),
    // `Array.prototype.filterReject` method
    // https://github.com/tc39/proposal-array-filtering
    filterReject: createMethod$5(7)
  };

  var $$1k = _export;
  var globalThis$I = globalThis_1;
  var call$x = functionCall;
  var uncurryThis$L = functionUncurryThis;
  var DESCRIPTORS$t = descriptors;
  var NATIVE_SYMBOL$4 = symbolConstructorDetection;
  var fails$O = fails$Y;
  var hasOwn$j = hasOwnProperty_1;
  var isPrototypeOf$9 = objectIsPrototypeOf;
  var anObject$t = anObject$y;
  var toIndexedObject$7 = toIndexedObject$d;
  var toPropertyKey$1 = toPropertyKey$4;
  var $toString$3 = toString$o;
  var createPropertyDescriptor$5 = createPropertyDescriptor$8;
  var nativeObjectCreate = objectCreate;
  var objectKeys$2 = objectKeys$4;
  var getOwnPropertyNamesModule$1 = objectGetOwnPropertyNames;
  var getOwnPropertyNamesExternal = objectGetOwnPropertyNamesExternal;
  var getOwnPropertySymbolsModule$2 = objectGetOwnPropertySymbols;
  var getOwnPropertyDescriptorModule$3 = objectGetOwnPropertyDescriptor;
  var definePropertyModule$2 = objectDefineProperty;
  var definePropertiesModule = objectDefineProperties;
  var propertyIsEnumerableModule$1 = objectPropertyIsEnumerable;
  var defineBuiltIn$h = defineBuiltIn$k;
  var defineBuiltInAccessor$e = defineBuiltInAccessor$f;
  var shared$3 = shared$7;
  var sharedKey$1 = sharedKey$4;
  var hiddenKeys$1 = hiddenKeys$6;
  var uid$2 = uid$5;
  var wellKnownSymbol$p = wellKnownSymbol$x;
  var wrappedWellKnownSymbolModule = wellKnownSymbolWrapped;
  var defineWellKnownSymbol$4 = wellKnownSymbolDefine;
  var defineSymbolToPrimitive$1 = symbolDefineToPrimitive;
  var setToStringTag$c = setToStringTag$d;
  var InternalStateModule$b = internalState;
  var $forEach$2 = arrayIteration.forEach;

  var HIDDEN = sharedKey$1('hidden');
  var SYMBOL = 'Symbol';
  var PROTOTYPE$1 = 'prototype';

  var setInternalState$a = InternalStateModule$b.set;
  var getInternalState$7 = InternalStateModule$b.getterFor(SYMBOL);

  var ObjectPrototype$4 = Object[PROTOTYPE$1];
  var $Symbol = globalThis$I.Symbol;
  var SymbolPrototype$1 = $Symbol && $Symbol[PROTOTYPE$1];
  var RangeError$4 = globalThis$I.RangeError;
  var TypeError$7 = globalThis$I.TypeError;
  var QObject = globalThis$I.QObject;
  var nativeGetOwnPropertyDescriptor$2 = getOwnPropertyDescriptorModule$3.f;
  var nativeDefineProperty$1 = definePropertyModule$2.f;
  var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
  var nativePropertyIsEnumerable = propertyIsEnumerableModule$1.f;
  var push$b = uncurryThis$L([].push);

  var AllSymbols = shared$3('symbols');
  var ObjectPrototypeSymbols = shared$3('op-symbols');
  var WellKnownSymbolsStore = shared$3('wks');

  // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
  var USE_SETTER = !QObject || !QObject[PROTOTYPE$1] || !QObject[PROTOTYPE$1].findChild;

  // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
  var fallbackDefineProperty = function (O, P, Attributes) {
    var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor$2(ObjectPrototype$4, P);
    if (ObjectPrototypeDescriptor) delete ObjectPrototype$4[P];
    nativeDefineProperty$1(O, P, Attributes);
    if (ObjectPrototypeDescriptor && O !== ObjectPrototype$4) {
      nativeDefineProperty$1(ObjectPrototype$4, P, ObjectPrototypeDescriptor);
    }
  };

  var setSymbolDescriptor = DESCRIPTORS$t && fails$O(function () {
    return nativeObjectCreate(nativeDefineProperty$1({}, 'a', {
      get: function () { return nativeDefineProperty$1(this, 'a', { value: 7 }).a; }
    })).a !== 7;
  }) ? fallbackDefineProperty : nativeDefineProperty$1;

  var wrap = function (tag, description) {
    var symbol = AllSymbols[tag] = nativeObjectCreate(SymbolPrototype$1);
    setInternalState$a(symbol, {
      type: SYMBOL,
      tag: tag,
      description: description
    });
    if (!DESCRIPTORS$t) symbol.description = description;
    return symbol;
  };

  var $defineProperty = function defineProperty(O, P, Attributes) {
    if (O === ObjectPrototype$4) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
    anObject$t(O);
    var key = toPropertyKey$1(P);
    anObject$t(Attributes);
    if (hasOwn$j(AllSymbols, key)) {
      if (!Attributes.enumerable) {
        if (!hasOwn$j(O, HIDDEN)) nativeDefineProperty$1(O, HIDDEN, createPropertyDescriptor$5(1, nativeObjectCreate(null)));
        O[HIDDEN][key] = true;
      } else {
        if (hasOwn$j(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
        Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor$5(0, false) });
      } return setSymbolDescriptor(O, key, Attributes);
    } return nativeDefineProperty$1(O, key, Attributes);
  };

  var $defineProperties = function defineProperties(O, Properties) {
    anObject$t(O);
    var properties = toIndexedObject$7(Properties);
    var keys = objectKeys$2(properties).concat($getOwnPropertySymbols(properties));
    $forEach$2(keys, function (key) {
      if (!DESCRIPTORS$t || call$x($propertyIsEnumerable$1, properties, key)) $defineProperty(O, key, properties[key]);
    });
    return O;
  };

  var $create = function create(O, Properties) {
    return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
  };

  var $propertyIsEnumerable$1 = function propertyIsEnumerable(V) {
    var P = toPropertyKey$1(V);
    var enumerable = call$x(nativePropertyIsEnumerable, this, P);
    if (this === ObjectPrototype$4 && hasOwn$j(AllSymbols, P) && !hasOwn$j(ObjectPrototypeSymbols, P)) return false;
    return enumerable || !hasOwn$j(this, P) || !hasOwn$j(AllSymbols, P) || hasOwn$j(this, HIDDEN) && this[HIDDEN][P]
      ? enumerable : true;
  };

  var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
    var it = toIndexedObject$7(O);
    var key = toPropertyKey$1(P);
    if (it === ObjectPrototype$4 && hasOwn$j(AllSymbols, key) && !hasOwn$j(ObjectPrototypeSymbols, key)) return;
    var descriptor = nativeGetOwnPropertyDescriptor$2(it, key);
    if (descriptor && hasOwn$j(AllSymbols, key) && !(hasOwn$j(it, HIDDEN) && it[HIDDEN][key])) {
      descriptor.enumerable = true;
    }
    return descriptor;
  };

  var $getOwnPropertyNames = function getOwnPropertyNames(O) {
    var names = nativeGetOwnPropertyNames(toIndexedObject$7(O));
    var result = [];
    $forEach$2(names, function (key) {
      if (!hasOwn$j(AllSymbols, key) && !hasOwn$j(hiddenKeys$1, key)) push$b(result, key);
    });
    return result;
  };

  var $getOwnPropertySymbols = function (O) {
    var IS_OBJECT_PROTOTYPE = O === ObjectPrototype$4;
    var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject$7(O));
    var result = [];
    $forEach$2(names, function (key) {
      if (hasOwn$j(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || hasOwn$j(ObjectPrototype$4, key))) {
        push$b(result, AllSymbols[key]);
      }
    });
    return result;
  };

  // `Symbol` constructor
  // https://tc39.es/ecma262/#sec-symbol-constructor
  if (!NATIVE_SYMBOL$4) {
    $Symbol = function Symbol() {
      if (isPrototypeOf$9(SymbolPrototype$1, this)) throw new TypeError$7('Symbol is not a constructor');
      var description = !arguments.length || arguments[0] === undefined ? undefined : $toString$3(arguments[0]);
      var tag = uid$2(description);
      var setter = function (value) {
        var $this = this === undefined ? globalThis$I : this;
        if ($this === ObjectPrototype$4) call$x(setter, ObjectPrototypeSymbols, value);
        if (hasOwn$j($this, HIDDEN) && hasOwn$j($this[HIDDEN], tag)) $this[HIDDEN][tag] = false;
        var descriptor = createPropertyDescriptor$5(1, value);
        try {
          setSymbolDescriptor($this, tag, descriptor);
        } catch (error) {
          if (!(error instanceof RangeError$4)) throw error;
          fallbackDefineProperty($this, tag, descriptor);
        }
      };
      if (DESCRIPTORS$t && USE_SETTER) setSymbolDescriptor(ObjectPrototype$4, tag, { configurable: true, set: setter });
      return wrap(tag, description);
    };

    SymbolPrototype$1 = $Symbol[PROTOTYPE$1];

    defineBuiltIn$h(SymbolPrototype$1, 'toString', function toString() {
      return getInternalState$7(this).tag;
    });

    defineBuiltIn$h($Symbol, 'withoutSetter', function (description) {
      return wrap(uid$2(description), description);
    });

    propertyIsEnumerableModule$1.f = $propertyIsEnumerable$1;
    definePropertyModule$2.f = $defineProperty;
    definePropertiesModule.f = $defineProperties;
    getOwnPropertyDescriptorModule$3.f = $getOwnPropertyDescriptor;
    getOwnPropertyNamesModule$1.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
    getOwnPropertySymbolsModule$2.f = $getOwnPropertySymbols;

    wrappedWellKnownSymbolModule.f = function (name) {
      return wrap(wellKnownSymbol$p(name), name);
    };

    if (DESCRIPTORS$t) {
      // https://github.com/tc39/proposal-Symbol-description
      defineBuiltInAccessor$e(SymbolPrototype$1, 'description', {
        configurable: true,
        get: function description() {
          return getInternalState$7(this).description;
        }
      });
      {
        defineBuiltIn$h(ObjectPrototype$4, 'propertyIsEnumerable', $propertyIsEnumerable$1, { unsafe: true });
      }
    }
  }

  $$1k({ global: true, constructor: true, wrap: true, forced: !NATIVE_SYMBOL$4, sham: !NATIVE_SYMBOL$4 }, {
    Symbol: $Symbol
  });

  $forEach$2(objectKeys$2(WellKnownSymbolsStore), function (name) {
    defineWellKnownSymbol$4(name);
  });

  $$1k({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL$4 }, {
    useSetter: function () { USE_SETTER = true; },
    useSimple: function () { USE_SETTER = false; }
  });

  $$1k({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL$4, sham: !DESCRIPTORS$t }, {
    // `Object.create` method
    // https://tc39.es/ecma262/#sec-object.create
    create: $create,
    // `Object.defineProperty` method
    // https://tc39.es/ecma262/#sec-object.defineproperty
    defineProperty: $defineProperty,
    // `Object.defineProperties` method
    // https://tc39.es/ecma262/#sec-object.defineproperties
    defineProperties: $defineProperties,
    // `Object.getOwnPropertyDescriptor` method
    // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
    getOwnPropertyDescriptor: $getOwnPropertyDescriptor
  });

  $$1k({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL$4 }, {
    // `Object.getOwnPropertyNames` method
    // https://tc39.es/ecma262/#sec-object.getownpropertynames
    getOwnPropertyNames: $getOwnPropertyNames
  });

  // `Symbol.prototype[@@toPrimitive]` method
  // https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
  defineSymbolToPrimitive$1();

  // `Symbol.prototype[@@toStringTag]` property
  // https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag
  setToStringTag$c($Symbol, SYMBOL);

  hiddenKeys$1[HIDDEN] = true;

  var NATIVE_SYMBOL$3 = symbolConstructorDetection;

  /* eslint-disable es/no-symbol -- safe */
  var symbolRegistryDetection = NATIVE_SYMBOL$3 && !!Symbol['for'] && !!Symbol.keyFor;

  var $$1j = _export;
  var getBuiltIn$a = getBuiltIn$g;
  var hasOwn$i = hasOwnProperty_1;
  var toString$n = toString$o;
  var shared$2 = shared$7;
  var NATIVE_SYMBOL_REGISTRY$1 = symbolRegistryDetection;

  var StringToSymbolRegistry = shared$2('string-to-symbol-registry');
  var SymbolToStringRegistry$1 = shared$2('symbol-to-string-registry');

  // `Symbol.for` method
  // https://tc39.es/ecma262/#sec-symbol.for
  $$1j({ target: 'Symbol', stat: true, forced: !NATIVE_SYMBOL_REGISTRY$1 }, {
    'for': function (key) {
      var string = toString$n(key);
      if (hasOwn$i(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
      var symbol = getBuiltIn$a('Symbol')(string);
      StringToSymbolRegistry[string] = symbol;
      SymbolToStringRegistry$1[symbol] = string;
      return symbol;
    }
  });

  var $$1i = _export;
  var hasOwn$h = hasOwnProperty_1;
  var isSymbol$3 = isSymbol$6;
  var tryToString$5 = tryToString$7;
  var shared$1 = shared$7;
  var NATIVE_SYMBOL_REGISTRY = symbolRegistryDetection;

  var SymbolToStringRegistry = shared$1('symbol-to-string-registry');

  // `Symbol.keyFor` method
  // https://tc39.es/ecma262/#sec-symbol.keyfor
  $$1i({ target: 'Symbol', stat: true, forced: !NATIVE_SYMBOL_REGISTRY }, {
    keyFor: function keyFor(sym) {
      if (!isSymbol$3(sym)) throw new TypeError(tryToString$5(sym) + ' is not a symbol');
      if (hasOwn$h(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
    }
  });

  var NATIVE_BIND$1 = functionBindNative;

  var FunctionPrototype = Function.prototype;
  var apply$8 = FunctionPrototype.apply;
  var call$w = FunctionPrototype.call;

  // eslint-disable-next-line es/no-reflect -- safe
  var functionApply = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND$1 ? call$w.bind(apply$8) : function () {
    return call$w.apply(apply$8, arguments);
  });

  var uncurryThis$K = functionUncurryThis;
  var isArray$5 = isArray$7;
  var isCallable$i = isCallable$v;
  var classof$e = classofRaw$2;
  var toString$m = toString$o;

  var push$a = uncurryThis$K([].push);

  var getJsonReplacerFunction = function (replacer) {
    if (isCallable$i(replacer)) return replacer;
    if (!isArray$5(replacer)) return;
    var rawLength = replacer.length;
    var keys = [];
    for (var i = 0; i < rawLength; i++) {
      var element = replacer[i];
      if (typeof element == 'string') push$a(keys, element);
      else if (typeof element == 'number' || classof$e(element) === 'Number' || classof$e(element) === 'String') push$a(keys, toString$m(element));
    }
    var keysLength = keys.length;
    var root = true;
    return function (key, value) {
      if (root) {
        root = false;
        return value;
      }
      if (isArray$5(this)) return value;
      for (var j = 0; j < keysLength; j++) if (keys[j] === key) return value;
    };
  };

  var $$1h = _export;
  var getBuiltIn$9 = getBuiltIn$g;
  var apply$7 = functionApply;
  var call$v = functionCall;
  var uncurryThis$J = functionUncurryThis;
  var fails$N = fails$Y;
  var isCallable$h = isCallable$v;
  var isSymbol$2 = isSymbol$6;
  var arraySlice$7 = arraySlice$9;
  var getReplacerFunction = getJsonReplacerFunction;
  var NATIVE_SYMBOL$2 = symbolConstructorDetection;

  var $String$1 = String;
  var $stringify = getBuiltIn$9('JSON', 'stringify');
  var exec$6 = uncurryThis$J(/./.exec);
  var charAt$9 = uncurryThis$J(''.charAt);
  var charCodeAt$3 = uncurryThis$J(''.charCodeAt);
  var replace$9 = uncurryThis$J(''.replace);
  var numberToString$1 = uncurryThis$J(1.0.toString);

  var tester = /[\uD800-\uDFFF]/g;
  var low = /^[\uD800-\uDBFF]$/;
  var hi = /^[\uDC00-\uDFFF]$/;

  var WRONG_SYMBOLS_CONVERSION = !NATIVE_SYMBOL$2 || fails$N(function () {
    var symbol = getBuiltIn$9('Symbol')('stringify detection');
    // MS Edge converts symbol values to JSON as {}
    return $stringify([symbol]) !== '[null]'
      // WebKit converts symbol values to JSON as null
      || $stringify({ a: symbol }) !== '{}'
      // V8 throws on boxed symbols
      || $stringify(Object(symbol)) !== '{}';
  });

  // https://github.com/tc39/proposal-well-formed-stringify
  var ILL_FORMED_UNICODE = fails$N(function () {
    return $stringify('\uDF06\uD834') !== '"\\udf06\\ud834"'
      || $stringify('\uDEAD') !== '"\\udead"';
  });

  var stringifyWithSymbolsFix = function (it, replacer) {
    var args = arraySlice$7(arguments);
    var $replacer = getReplacerFunction(replacer);
    if (!isCallable$h($replacer) && (it === undefined || isSymbol$2(it))) return; // IE8 returns string on undefined
    args[1] = function (key, value) {
      // some old implementations (like WebKit) could pass numbers as keys
      if (isCallable$h($replacer)) value = call$v($replacer, this, $String$1(key), value);
      if (!isSymbol$2(value)) return value;
    };
    return apply$7($stringify, null, args);
  };

  var fixIllFormed = function (match, offset, string) {
    var prev = charAt$9(string, offset - 1);
    var next = charAt$9(string, offset + 1);
    if ((exec$6(low, match) && !exec$6(hi, next)) || (exec$6(hi, match) && !exec$6(low, prev))) {
      return '\\u' + numberToString$1(charCodeAt$3(match, 0), 16);
    } return match;
  };

  if ($stringify) {
    // `JSON.stringify` method
    // https://tc39.es/ecma262/#sec-json.stringify
    $$1h({ target: 'JSON', stat: true, arity: 3, forced: WRONG_SYMBOLS_CONVERSION || ILL_FORMED_UNICODE }, {
      // eslint-disable-next-line no-unused-vars -- required for `.length`
      stringify: function stringify(it, replacer, space) {
        var args = arraySlice$7(arguments);
        var result = apply$7(WRONG_SYMBOLS_CONVERSION ? stringifyWithSymbolsFix : $stringify, null, args);
        return ILL_FORMED_UNICODE && typeof result == 'string' ? replace$9(result, tester, fixIllFormed) : result;
      }
    });
  }

  var $$1g = _export;
  var NATIVE_SYMBOL$1 = symbolConstructorDetection;
  var fails$M = fails$Y;
  var getOwnPropertySymbolsModule$1 = objectGetOwnPropertySymbols;
  var toObject$h = toObject$k;

  // V8 ~ Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
  // https://bugs.chromium.org/p/v8/issues/detail?id=3443
  var FORCED$g = !NATIVE_SYMBOL$1 || fails$M(function () { getOwnPropertySymbolsModule$1.f(1); });

  // `Object.getOwnPropertySymbols` method
  // https://tc39.es/ecma262/#sec-object.getownpropertysymbols
  $$1g({ target: 'Object', stat: true, forced: FORCED$g }, {
    getOwnPropertySymbols: function getOwnPropertySymbols(it) {
      var $getOwnPropertySymbols = getOwnPropertySymbolsModule$1.f;
      return $getOwnPropertySymbols ? $getOwnPropertySymbols(toObject$h(it)) : [];
    }
  });

  var $$1f = _export;
  var DESCRIPTORS$s = descriptors;
  var globalThis$H = globalThis_1;
  var uncurryThis$I = functionUncurryThis;
  var hasOwn$g = hasOwnProperty_1;
  var isCallable$g = isCallable$v;
  var isPrototypeOf$8 = objectIsPrototypeOf;
  var toString$l = toString$o;
  var defineBuiltInAccessor$d = defineBuiltInAccessor$f;
  var copyConstructorProperties$3 = copyConstructorProperties$5;

  var NativeSymbol = globalThis$H.Symbol;
  var SymbolPrototype = NativeSymbol && NativeSymbol.prototype;

  if (DESCRIPTORS$s && isCallable$g(NativeSymbol) && (!('description' in SymbolPrototype) ||
    // Safari 12 bug
    NativeSymbol().description !== undefined
  )) {
    var EmptyStringDescriptionStore = {};
    // wrap Symbol constructor for correct work with undefined description
    var SymbolWrapper = function Symbol() {
      var description = arguments.length < 1 || arguments[0] === undefined ? undefined : toString$l(arguments[0]);
      var result = isPrototypeOf$8(SymbolPrototype, this)
        // eslint-disable-next-line sonar/inconsistent-function-call -- ok
        ? new NativeSymbol(description)
        // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
        : description === undefined ? NativeSymbol() : NativeSymbol(description);
      if (description === '') EmptyStringDescriptionStore[result] = true;
      return result;
    };

    copyConstructorProperties$3(SymbolWrapper, NativeSymbol);
    SymbolWrapper.prototype = SymbolPrototype;
    SymbolPrototype.constructor = SymbolWrapper;

    var NATIVE_SYMBOL = String(NativeSymbol('description detection')) === 'Symbol(description detection)';
    var thisSymbolValue = uncurryThis$I(SymbolPrototype.valueOf);
    var symbolDescriptiveString = uncurryThis$I(SymbolPrototype.toString);
    var regexp = /^Symbol\((.*)\)[^)]+$/;
    var replace$8 = uncurryThis$I(''.replace);
    var stringSlice$a = uncurryThis$I(''.slice);

    defineBuiltInAccessor$d(SymbolPrototype, 'description', {
      configurable: true,
      get: function description() {
        var symbol = thisSymbolValue(this);
        if (hasOwn$g(EmptyStringDescriptionStore, symbol)) return '';
        var string = symbolDescriptiveString(symbol);
        var desc = NATIVE_SYMBOL ? stringSlice$a(string, 7, -1) : replace$8(string, regexp, '$1');
        return desc === '' ? undefined : desc;
      }
    });

    $$1f({ global: true, constructor: true, forced: true }, {
      Symbol: SymbolWrapper
    });
  }

  var defineWellKnownSymbol$3 = wellKnownSymbolDefine;

  // `Symbol.iterator` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.iterator
  defineWellKnownSymbol$3('iterator');

  var defineWellKnownSymbol$2 = wellKnownSymbolDefine;

  // `Symbol.asyncIterator` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.asynciterator
  defineWellKnownSymbol$2('asyncIterator');

  var defineWellKnownSymbol$1 = wellKnownSymbolDefine;
  var defineSymbolToPrimitive = symbolDefineToPrimitive;

  // `Symbol.toPrimitive` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.toprimitive
  defineWellKnownSymbol$1('toPrimitive');

  // `Symbol.prototype[@@toPrimitive]` method
  // https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
  defineSymbolToPrimitive();

  var getBuiltIn$8 = getBuiltIn$g;
  var defineWellKnownSymbol = wellKnownSymbolDefine;
  var setToStringTag$b = setToStringTag$d;

  // `Symbol.toStringTag` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.tostringtag
  defineWellKnownSymbol('toStringTag');

  // `Symbol.prototype[@@toStringTag]` property
  // https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag
  setToStringTag$b(getBuiltIn$8('Symbol'), 'Symbol');

  var uncurryThis$H = functionUncurryThis;
  var aCallable$k = aCallable$n;

  var functionUncurryThisAccessor = function (object, key, method) {
    try {
      // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
      return uncurryThis$H(aCallable$k(Object.getOwnPropertyDescriptor(object, key)[method]));
    } catch (error) { /* empty */ }
  };

  var isObject$l = isObject$s;

  var isPossiblePrototype$1 = function (argument) {
    return isObject$l(argument) || argument === null;
  };

  var isPossiblePrototype = isPossiblePrototype$1;

  var $String = String;
  var $TypeError$l = TypeError;

  var aPossiblePrototype$1 = function (argument) {
    if (isPossiblePrototype(argument)) return argument;
    throw new $TypeError$l("Can't set " + $String(argument) + ' as a prototype');
  };

  /* eslint-disable no-proto -- safe */
  var uncurryThisAccessor$3 = functionUncurryThisAccessor;
  var isObject$k = isObject$s;
  var requireObjectCoercible$a = requireObjectCoercible$d;
  var aPossiblePrototype = aPossiblePrototype$1;

  // `Object.setPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.setprototypeof
  // Works with __proto__ only. Old v8 can't work with null proto objects.
  // eslint-disable-next-line es/no-object-setprototypeof -- safe
  var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
    var CORRECT_SETTER = false;
    var test = {};
    var setter;
    try {
      setter = uncurryThisAccessor$3(Object.prototype, '__proto__', 'set');
      setter(test, []);
      CORRECT_SETTER = test instanceof Array;
    } catch (error) { /* empty */ }
    return function setPrototypeOf(O, proto) {
      requireObjectCoercible$a(O);
      aPossiblePrototype(proto);
      if (!isObject$k(O)) return O;
      if (CORRECT_SETTER) setter(O, proto);
      else O.__proto__ = proto;
      return O;
    };
  }() : undefined);

  var defineProperty$7 = objectDefineProperty.f;

  var proxyAccessor$2 = function (Target, Source, key) {
    key in Target || defineProperty$7(Target, key, {
      configurable: true,
      get: function () { return Source[key]; },
      set: function (it) { Source[key] = it; }
    });
  };

  var isCallable$f = isCallable$v;
  var isObject$j = isObject$s;
  var setPrototypeOf$6 = objectSetPrototypeOf;

  // makes subclassing work correct for wrapped built-ins
  var inheritIfRequired$6 = function ($this, dummy, Wrapper) {
    var NewTarget, NewTargetPrototype;
    if (
      // it can work only with native `setPrototypeOf`
      setPrototypeOf$6 &&
      // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
      isCallable$f(NewTarget = dummy.constructor) &&
      NewTarget !== Wrapper &&
      isObject$j(NewTargetPrototype = NewTarget.prototype) &&
      NewTargetPrototype !== Wrapper.prototype
    ) setPrototypeOf$6($this, NewTargetPrototype);
    return $this;
  };

  var toString$k = toString$o;

  var normalizeStringArgument$1 = function (argument, $default) {
    return argument === undefined ? arguments.length < 2 ? '' : $default : toString$k(argument);
  };

  var isObject$i = isObject$s;
  var createNonEnumerableProperty$b = createNonEnumerableProperty$e;

  // `InstallErrorCause` abstract operation
  // https://tc39.es/proposal-error-cause/#sec-errorobjects-install-error-cause
  var installErrorCause$1 = function (O, options) {
    if (isObject$i(options) && 'cause' in options) {
      createNonEnumerableProperty$b(O, 'cause', options.cause);
    }
  };

  var uncurryThis$G = functionUncurryThis;

  var $Error = Error;
  var replace$7 = uncurryThis$G(''.replace);

  var TEST = (function (arg) { return String(new $Error(arg).stack); })('zxcasd');
  // eslint-disable-next-line redos/no-vulnerable -- safe
  var V8_OR_CHAKRA_STACK_ENTRY = /\n\s*at [^:]*:[^\n]*/;
  var IS_V8_OR_CHAKRA_STACK = V8_OR_CHAKRA_STACK_ENTRY.test(TEST);

  var errorStackClear = function (stack, dropEntries) {
    if (IS_V8_OR_CHAKRA_STACK && typeof stack == 'string' && !$Error.prepareStackTrace) {
      while (dropEntries--) stack = replace$7(stack, V8_OR_CHAKRA_STACK_ENTRY, '');
    } return stack;
  };

  var fails$L = fails$Y;
  var createPropertyDescriptor$4 = createPropertyDescriptor$8;

  var errorStackInstallable = !fails$L(function () {
    var error = new Error('a');
    if (!('stack' in error)) return true;
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty(error, 'stack', createPropertyDescriptor$4(1, 7));
    return error.stack !== 7;
  });

  var createNonEnumerableProperty$a = createNonEnumerableProperty$e;
  var clearErrorStack = errorStackClear;
  var ERROR_STACK_INSTALLABLE = errorStackInstallable;

  // non-standard V8
  var captureStackTrace = Error.captureStackTrace;

  var errorStackInstall = function (error, C, stack, dropEntries) {
    if (ERROR_STACK_INSTALLABLE) {
      if (captureStackTrace) captureStackTrace(error, C);
      else createNonEnumerableProperty$a(error, 'stack', clearErrorStack(stack, dropEntries));
    }
  };

  var getBuiltIn$7 = getBuiltIn$g;
  var hasOwn$f = hasOwnProperty_1;
  var createNonEnumerableProperty$9 = createNonEnumerableProperty$e;
  var isPrototypeOf$7 = objectIsPrototypeOf;
  var setPrototypeOf$5 = objectSetPrototypeOf;
  var copyConstructorProperties$2 = copyConstructorProperties$5;
  var proxyAccessor$1 = proxyAccessor$2;
  var inheritIfRequired$5 = inheritIfRequired$6;
  var normalizeStringArgument = normalizeStringArgument$1;
  var installErrorCause = installErrorCause$1;
  var installErrorStack = errorStackInstall;
  var DESCRIPTORS$r = descriptors;

  var wrapErrorConstructorWithCause$1 = function (FULL_NAME, wrapper, FORCED, IS_AGGREGATE_ERROR) {
    var STACK_TRACE_LIMIT = 'stackTraceLimit';
    var OPTIONS_POSITION = IS_AGGREGATE_ERROR ? 2 : 1;
    var path = FULL_NAME.split('.');
    var ERROR_NAME = path[path.length - 1];
    var OriginalError = getBuiltIn$7.apply(null, path);

    if (!OriginalError) return;

    var OriginalErrorPrototype = OriginalError.prototype;

    // V8 9.3- bug https://bugs.chromium.org/p/v8/issues/detail?id=12006
    if (hasOwn$f(OriginalErrorPrototype, 'cause')) delete OriginalErrorPrototype.cause;

    if (!FORCED) return OriginalError;

    var BaseError = getBuiltIn$7('Error');

    var WrappedError = wrapper(function (a, b) {
      var message = normalizeStringArgument(IS_AGGREGATE_ERROR ? b : a, undefined);
      var result = IS_AGGREGATE_ERROR ? new OriginalError(a) : new OriginalError();
      if (message !== undefined) createNonEnumerableProperty$9(result, 'message', message);
      installErrorStack(result, WrappedError, result.stack, 2);
      if (this && isPrototypeOf$7(OriginalErrorPrototype, this)) inheritIfRequired$5(result, this, WrappedError);
      if (arguments.length > OPTIONS_POSITION) installErrorCause(result, arguments[OPTIONS_POSITION]);
      return result;
    });

    WrappedError.prototype = OriginalErrorPrototype;

    if (ERROR_NAME !== 'Error') {
      if (setPrototypeOf$5) setPrototypeOf$5(WrappedError, BaseError);
      else copyConstructorProperties$2(WrappedError, BaseError, { name: true });
    } else if (DESCRIPTORS$r && STACK_TRACE_LIMIT in OriginalError) {
      proxyAccessor$1(WrappedError, OriginalError, STACK_TRACE_LIMIT);
      proxyAccessor$1(WrappedError, OriginalError, 'prepareStackTrace');
    }

    copyConstructorProperties$2(WrappedError, OriginalError);

    try {
      // Safari 13- bug: WebAssembly errors does not have a proper `.name`
      if (OriginalErrorPrototype.name !== ERROR_NAME) {
        createNonEnumerableProperty$9(OriginalErrorPrototype, 'name', ERROR_NAME);
      }
      OriginalErrorPrototype.constructor = WrappedError;
    } catch (error) { /* empty */ }

    return WrappedError;
  };

  /* eslint-disable no-unused-vars -- required for functions `.length` */
  var $$1e = _export;
  var globalThis$G = globalThis_1;
  var apply$6 = functionApply;
  var wrapErrorConstructorWithCause = wrapErrorConstructorWithCause$1;

  var WEB_ASSEMBLY = 'WebAssembly';
  var WebAssembly = globalThis$G[WEB_ASSEMBLY];

  // eslint-disable-next-line es/no-error-cause -- feature detection
  var FORCED$f = new Error('e', { cause: 7 }).cause !== 7;

  var exportGlobalErrorCauseWrapper = function (ERROR_NAME, wrapper) {
    var O = {};
    O[ERROR_NAME] = wrapErrorConstructorWithCause(ERROR_NAME, wrapper, FORCED$f);
    $$1e({ global: true, constructor: true, arity: 1, forced: FORCED$f }, O);
  };

  var exportWebAssemblyErrorCauseWrapper = function (ERROR_NAME, wrapper) {
    if (WebAssembly && WebAssembly[ERROR_NAME]) {
      var O = {};
      O[ERROR_NAME] = wrapErrorConstructorWithCause(WEB_ASSEMBLY + '.' + ERROR_NAME, wrapper, FORCED$f);
      $$1e({ target: WEB_ASSEMBLY, stat: true, constructor: true, arity: 1, forced: FORCED$f }, O);
    }
  };

  // https://tc39.es/ecma262/#sec-nativeerror
  exportGlobalErrorCauseWrapper('Error', function (init) {
    return function Error(message) { return apply$6(init, this, arguments); };
  });
  exportGlobalErrorCauseWrapper('EvalError', function (init) {
    return function EvalError(message) { return apply$6(init, this, arguments); };
  });
  exportGlobalErrorCauseWrapper('RangeError', function (init) {
    return function RangeError(message) { return apply$6(init, this, arguments); };
  });
  exportGlobalErrorCauseWrapper('ReferenceError', function (init) {
    return function ReferenceError(message) { return apply$6(init, this, arguments); };
  });
  exportGlobalErrorCauseWrapper('SyntaxError', function (init) {
    return function SyntaxError(message) { return apply$6(init, this, arguments); };
  });
  exportGlobalErrorCauseWrapper('TypeError', function (init) {
    return function TypeError(message) { return apply$6(init, this, arguments); };
  });
  exportGlobalErrorCauseWrapper('URIError', function (init) {
    return function URIError(message) { return apply$6(init, this, arguments); };
  });
  exportWebAssemblyErrorCauseWrapper('CompileError', function (init) {
    return function CompileError(message) { return apply$6(init, this, arguments); };
  });
  exportWebAssemblyErrorCauseWrapper('LinkError', function (init) {
    return function LinkError(message) { return apply$6(init, this, arguments); };
  });
  exportWebAssemblyErrorCauseWrapper('RuntimeError', function (init) {
    return function RuntimeError(message) { return apply$6(init, this, arguments); };
  });

  var $TypeError$k = TypeError;
  var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991

  var doesNotExceedSafeInteger$5 = function (it) {
    if (it > MAX_SAFE_INTEGER) throw $TypeError$k('Maximum allowed index exceeded');
    return it;
  };

  var DESCRIPTORS$q = descriptors;
  var definePropertyModule$1 = objectDefineProperty;
  var createPropertyDescriptor$3 = createPropertyDescriptor$8;

  var createProperty$6 = function (object, key, value) {
    if (DESCRIPTORS$q) definePropertyModule$1.f(object, key, createPropertyDescriptor$3(0, value));
    else object[key] = value;
  };

  var fails$K = fails$Y;
  var wellKnownSymbol$o = wellKnownSymbol$x;
  var V8_VERSION$2 = environmentV8Version;

  var SPECIES$5 = wellKnownSymbol$o('species');

  var arrayMethodHasSpeciesSupport$5 = function (METHOD_NAME) {
    // We can't use this feature detection in V8 since it causes
    // deoptimization and serious performance degradation
    // https://github.com/zloirock/core-js/issues/677
    return V8_VERSION$2 >= 51 || !fails$K(function () {
      var array = [];
      var constructor = array.constructor = {};
      constructor[SPECIES$5] = function () {
        return { foo: 1 };
      };
      return array[METHOD_NAME](Boolean).foo !== 1;
    });
  };

  var $$1d = _export;
  var fails$J = fails$Y;
  var isArray$4 = isArray$7;
  var isObject$h = isObject$s;
  var toObject$g = toObject$k;
  var lengthOfArrayLike$k = lengthOfArrayLike$n;
  var doesNotExceedSafeInteger$4 = doesNotExceedSafeInteger$5;
  var createProperty$5 = createProperty$6;
  var arraySpeciesCreate$2 = arraySpeciesCreate$4;
  var arrayMethodHasSpeciesSupport$4 = arrayMethodHasSpeciesSupport$5;
  var wellKnownSymbol$n = wellKnownSymbol$x;
  var V8_VERSION$1 = environmentV8Version;

  var IS_CONCAT_SPREADABLE = wellKnownSymbol$n('isConcatSpreadable');

  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/679
  var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION$1 >= 51 || !fails$J(function () {
    var array = [];
    array[IS_CONCAT_SPREADABLE] = false;
    return array.concat()[0] !== array;
  });

  var isConcatSpreadable = function (O) {
    if (!isObject$h(O)) return false;
    var spreadable = O[IS_CONCAT_SPREADABLE];
    return spreadable !== undefined ? !!spreadable : isArray$4(O);
  };

  var FORCED$e = !IS_CONCAT_SPREADABLE_SUPPORT || !arrayMethodHasSpeciesSupport$4('concat');

  // `Array.prototype.concat` method
  // https://tc39.es/ecma262/#sec-array.prototype.concat
  // with adding support of @@isConcatSpreadable and @@species
  $$1d({ target: 'Array', proto: true, arity: 1, forced: FORCED$e }, {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    concat: function concat(arg) {
      var O = toObject$g(this);
      var A = arraySpeciesCreate$2(O, 0);
      var n = 0;
      var i, k, length, len, E;
      for (i = -1, length = arguments.length; i < length; i++) {
        E = i === -1 ? O : arguments[i];
        if (isConcatSpreadable(E)) {
          len = lengthOfArrayLike$k(E);
          doesNotExceedSafeInteger$4(n + len);
          for (k = 0; k < len; k++, n++) if (k in E) createProperty$5(A, n, E[k]);
        } else {
          doesNotExceedSafeInteger$4(n + 1);
          createProperty$5(A, n++, E);
        }
      }
      A.length = n;
      return A;
    }
  });

  var toObject$f = toObject$k;
  var toAbsoluteIndex$4 = toAbsoluteIndex$6;
  var lengthOfArrayLike$j = lengthOfArrayLike$n;

  // `Array.prototype.fill` method implementation
  // https://tc39.es/ecma262/#sec-array.prototype.fill
  var arrayFill$1 = function fill(value /* , start = 0, end = @length */) {
    var O = toObject$f(this);
    var length = lengthOfArrayLike$j(O);
    var argumentsLength = arguments.length;
    var index = toAbsoluteIndex$4(argumentsLength > 1 ? arguments[1] : undefined, length);
    var end = argumentsLength > 2 ? arguments[2] : undefined;
    var endPos = end === undefined ? length : toAbsoluteIndex$4(end, length);
    while (endPos > index) O[index++] = value;
    return O;
  };

  var wellKnownSymbol$m = wellKnownSymbol$x;
  var create$8 = objectCreate;
  var defineProperty$6 = objectDefineProperty.f;

  var UNSCOPABLES = wellKnownSymbol$m('unscopables');
  var ArrayPrototype$1 = Array.prototype;

  // Array.prototype[@@unscopables]
  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  if (ArrayPrototype$1[UNSCOPABLES] === undefined) {
    defineProperty$6(ArrayPrototype$1, UNSCOPABLES, {
      configurable: true,
      value: create$8(null)
    });
  }

  // add a key to Array.prototype[@@unscopables]
  var addToUnscopables$6 = function (key) {
    ArrayPrototype$1[UNSCOPABLES][key] = true;
  };

  var $$1c = _export;
  var fill$1 = arrayFill$1;
  var addToUnscopables$5 = addToUnscopables$6;

  // `Array.prototype.fill` method
  // https://tc39.es/ecma262/#sec-array.prototype.fill
  $$1c({ target: 'Array', proto: true }, {
    fill: fill$1
  });

  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  addToUnscopables$5('fill');

  var $$1b = _export;
  var $filter$1 = arrayIteration.filter;
  var arrayMethodHasSpeciesSupport$3 = arrayMethodHasSpeciesSupport$5;

  var HAS_SPECIES_SUPPORT$3 = arrayMethodHasSpeciesSupport$3('filter');

  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  // with adding support of @@species
  $$1b({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$3 }, {
    filter: function filter(callbackfn /* , thisArg */) {
      return $filter$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  var $$1a = _export;
  var $find$1 = arrayIteration.find;
  var addToUnscopables$4 = addToUnscopables$6;

  var FIND = 'find';
  var SKIPS_HOLES$1 = true;

  // Shouldn't skip holes
  // eslint-disable-next-line es/no-array-prototype-find -- testing
  if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES$1 = false; });

  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  $$1a({ target: 'Array', proto: true, forced: SKIPS_HOLES$1 }, {
    find: function find(callbackfn /* , that = undefined */) {
      return $find$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  addToUnscopables$4(FIND);

  var $$19 = _export;
  var $findIndex$1 = arrayIteration.findIndex;
  var addToUnscopables$3 = addToUnscopables$6;

  var FIND_INDEX = 'findIndex';
  var SKIPS_HOLES = true;

  // Shouldn't skip holes
  // eslint-disable-next-line es/no-array-prototype-findindex -- testing
  if (FIND_INDEX in []) Array(1)[FIND_INDEX](function () { SKIPS_HOLES = false; });

  // `Array.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-array.prototype.findindex
  $$19({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
    findIndex: function findIndex(callbackfn /* , that = undefined */) {
      return $findIndex$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  addToUnscopables$3(FIND_INDEX);

  var isArray$3 = isArray$7;
  var lengthOfArrayLike$i = lengthOfArrayLike$n;
  var doesNotExceedSafeInteger$3 = doesNotExceedSafeInteger$5;
  var bind$b = functionBindContext;

  // `FlattenIntoArray` abstract operation
  // https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray
  var flattenIntoArray$1 = function (target, original, source, sourceLen, start, depth, mapper, thisArg) {
    var targetIndex = start;
    var sourceIndex = 0;
    var mapFn = mapper ? bind$b(mapper, thisArg) : false;
    var element, elementLen;

    while (sourceIndex < sourceLen) {
      if (sourceIndex in source) {
        element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

        if (depth > 0 && isArray$3(element)) {
          elementLen = lengthOfArrayLike$i(element);
          targetIndex = flattenIntoArray$1(target, original, element, elementLen, targetIndex, depth - 1) - 1;
        } else {
          doesNotExceedSafeInteger$3(targetIndex + 1);
          target[targetIndex] = element;
        }

        targetIndex++;
      }
      sourceIndex++;
    }
    return targetIndex;
  };

  var flattenIntoArray_1 = flattenIntoArray$1;

  var $$18 = _export;
  var flattenIntoArray = flattenIntoArray_1;
  var toObject$e = toObject$k;
  var lengthOfArrayLike$h = lengthOfArrayLike$n;
  var toIntegerOrInfinity$c = toIntegerOrInfinity$f;
  var arraySpeciesCreate$1 = arraySpeciesCreate$4;

  // `Array.prototype.flat` method
  // https://tc39.es/ecma262/#sec-array.prototype.flat
  $$18({ target: 'Array', proto: true }, {
    flat: function flat(/* depthArg = 1 */) {
      var depthArg = arguments.length ? arguments[0] : undefined;
      var O = toObject$e(this);
      var sourceLen = lengthOfArrayLike$h(O);
      var A = arraySpeciesCreate$1(O, 0);
      A.length = flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toIntegerOrInfinity$c(depthArg));
      return A;
    }
  });

  var call$u = functionCall;
  var anObject$s = anObject$y;
  var getMethod$6 = getMethod$8;

  var iteratorClose$5 = function (iterator, kind, value) {
    var innerResult, innerError;
    anObject$s(iterator);
    try {
      innerResult = getMethod$6(iterator, 'return');
      if (!innerResult) {
        if (kind === 'throw') throw value;
        return value;
      }
      innerResult = call$u(innerResult, iterator);
    } catch (error) {
      innerError = true;
      innerResult = error;
    }
    if (kind === 'throw') throw value;
    if (innerError) throw innerResult;
    anObject$s(innerResult);
    return value;
  };

  var anObject$r = anObject$y;
  var iteratorClose$4 = iteratorClose$5;

  // call something on iterator step with safe closing on error
  var callWithSafeIterationClosing$3 = function (iterator, fn, value, ENTRIES) {
    try {
      return ENTRIES ? fn(anObject$r(value)[0], value[1]) : fn(value);
    } catch (error) {
      iteratorClose$4(iterator, 'throw', error);
    }
  };

  var iterators = {};

  var wellKnownSymbol$l = wellKnownSymbol$x;
  var Iterators$4 = iterators;

  var ITERATOR$b = wellKnownSymbol$l('iterator');
  var ArrayPrototype = Array.prototype;

  // check on default Array iterator
  var isArrayIteratorMethod$3 = function (it) {
    return it !== undefined && (Iterators$4.Array === it || ArrayPrototype[ITERATOR$b] === it);
  };

  var classof$d = classof$j;
  var getMethod$5 = getMethod$8;
  var isNullOrUndefined$8 = isNullOrUndefined$b;
  var Iterators$3 = iterators;
  var wellKnownSymbol$k = wellKnownSymbol$x;

  var ITERATOR$a = wellKnownSymbol$k('iterator');

  var getIteratorMethod$5 = function (it) {
    if (!isNullOrUndefined$8(it)) return getMethod$5(it, ITERATOR$a)
      || getMethod$5(it, '@@iterator')
      || Iterators$3[classof$d(it)];
  };

  var call$t = functionCall;
  var aCallable$j = aCallable$n;
  var anObject$q = anObject$y;
  var tryToString$4 = tryToString$7;
  var getIteratorMethod$4 = getIteratorMethod$5;

  var $TypeError$j = TypeError;

  var getIterator$4 = function (argument, usingIterator) {
    var iteratorMethod = arguments.length < 2 ? getIteratorMethod$4(argument) : usingIterator;
    if (aCallable$j(iteratorMethod)) return anObject$q(call$t(iteratorMethod, argument));
    throw new $TypeError$j(tryToString$4(argument) + ' is not iterable');
  };

  var bind$a = functionBindContext;
  var call$s = functionCall;
  var toObject$d = toObject$k;
  var callWithSafeIterationClosing$2 = callWithSafeIterationClosing$3;
  var isArrayIteratorMethod$2 = isArrayIteratorMethod$3;
  var isConstructor$2 = isConstructor$4;
  var lengthOfArrayLike$g = lengthOfArrayLike$n;
  var createProperty$4 = createProperty$6;
  var getIterator$3 = getIterator$4;
  var getIteratorMethod$3 = getIteratorMethod$5;

  var $Array$2 = Array;

  // `Array.from` method implementation
  // https://tc39.es/ecma262/#sec-array.from
  var arrayFrom$1 = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject$d(arrayLike);
    var IS_CONSTRUCTOR = isConstructor$2(this);
    var argumentsLength = arguments.length;
    var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    if (mapping) mapfn = bind$a(mapfn, argumentsLength > 2 ? arguments[2] : undefined);
    var iteratorMethod = getIteratorMethod$3(O);
    var index = 0;
    var length, result, step, iterator, next, value;
    // if the target is not iterable or it's an array with the default iterator - use a simple case
    if (iteratorMethod && !(this === $Array$2 && isArrayIteratorMethod$2(iteratorMethod))) {
      result = IS_CONSTRUCTOR ? new this() : [];
      iterator = getIterator$3(O, iteratorMethod);
      next = iterator.next;
      for (;!(step = call$s(next, iterator)).done; index++) {
        value = mapping ? callWithSafeIterationClosing$2(iterator, mapfn, [step.value, index], true) : step.value;
        createProperty$4(result, index, value);
      }
    } else {
      length = lengthOfArrayLike$g(O);
      result = IS_CONSTRUCTOR ? new this(length) : $Array$2(length);
      for (;length > index; index++) {
        value = mapping ? mapfn(O[index], index) : O[index];
        createProperty$4(result, index, value);
      }
    }
    result.length = index;
    return result;
  };

  var wellKnownSymbol$j = wellKnownSymbol$x;

  var ITERATOR$9 = wellKnownSymbol$j('iterator');
  var SAFE_CLOSING = false;

  try {
    var called = 0;
    var iteratorWithReturn = {
      next: function () {
        return { done: !!called++ };
      },
      'return': function () {
        SAFE_CLOSING = true;
      }
    };
    iteratorWithReturn[ITERATOR$9] = function () {
      return this;
    };
    // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
    Array.from(iteratorWithReturn, function () { throw 2; });
  } catch (error) { /* empty */ }

  var checkCorrectnessOfIteration$4 = function (exec, SKIP_CLOSING) {
    try {
      if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
    } catch (error) { return false; } // workaround of old WebKit + `eval` bug
    var ITERATION_SUPPORT = false;
    try {
      var object = {};
      object[ITERATOR$9] = function () {
        return {
          next: function () {
            return { done: ITERATION_SUPPORT = true };
          }
        };
      };
      exec(object);
    } catch (error) { /* empty */ }
    return ITERATION_SUPPORT;
  };

  var $$17 = _export;
  var from = arrayFrom$1;
  var checkCorrectnessOfIteration$3 = checkCorrectnessOfIteration$4;

  var INCORRECT_ITERATION = !checkCorrectnessOfIteration$3(function (iterable) {
    // eslint-disable-next-line es/no-array-from -- required for testing
    Array.from(iterable);
  });

  // `Array.from` method
  // https://tc39.es/ecma262/#sec-array.from
  $$17({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
    from: from
  });

  var $$16 = _export;
  var $includes$1 = arrayIncludes.includes;
  var fails$I = fails$Y;
  var addToUnscopables$2 = addToUnscopables$6;

  // FF99+ bug
  var BROKEN_ON_SPARSE = fails$I(function () {
    // eslint-disable-next-line es/no-array-prototype-includes -- detection
    return !Array(1).includes();
  });

  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  $$16({ target: 'Array', proto: true, forced: BROKEN_ON_SPARSE }, {
    includes: function includes(el /* , fromIndex = 0 */) {
      return $includes$1(this, el, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  addToUnscopables$2('includes');

  var fails$H = fails$Y;

  var arrayMethodIsStrict$5 = function (METHOD_NAME, argument) {
    var method = [][METHOD_NAME];
    return !!method && fails$H(function () {
      // eslint-disable-next-line no-useless-call -- required for testing
      method.call(null, argument || function () { return 1; }, 1);
    });
  };

  /* eslint-disable es/no-array-prototype-indexof -- required for testing */
  var $$15 = _export;
  var uncurryThis$F = functionUncurryThisClause;
  var $indexOf$1 = arrayIncludes.indexOf;
  var arrayMethodIsStrict$4 = arrayMethodIsStrict$5;

  var nativeIndexOf = uncurryThis$F([].indexOf);

  var NEGATIVE_ZERO$1 = !!nativeIndexOf && 1 / nativeIndexOf([1], 1, -0) < 0;
  var FORCED$d = NEGATIVE_ZERO$1 || !arrayMethodIsStrict$4('indexOf');

  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  $$15({ target: 'Array', proto: true, forced: FORCED$d }, {
    indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
      var fromIndex = arguments.length > 1 ? arguments[1] : undefined;
      return NEGATIVE_ZERO$1
        // convert -0 to +0
        ? nativeIndexOf(this, searchElement, fromIndex) || 0
        : $indexOf$1(this, searchElement, fromIndex);
    }
  });

  var fails$G = fails$Y;

  var correctPrototypeGetter = !fails$G(function () {
    function F() { /* empty */ }
    F.prototype.constructor = null;
    // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
    return Object.getPrototypeOf(new F()) !== F.prototype;
  });

  var hasOwn$e = hasOwnProperty_1;
  var isCallable$e = isCallable$v;
  var toObject$c = toObject$k;
  var sharedKey = sharedKey$4;
  var CORRECT_PROTOTYPE_GETTER$1 = correctPrototypeGetter;

  var IE_PROTO = sharedKey('IE_PROTO');
  var $Object$1 = Object;
  var ObjectPrototype$3 = $Object$1.prototype;

  // `Object.getPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.getprototypeof
  // eslint-disable-next-line es/no-object-getprototypeof -- safe
  var objectGetPrototypeOf$1 = CORRECT_PROTOTYPE_GETTER$1 ? $Object$1.getPrototypeOf : function (O) {
    var object = toObject$c(O);
    if (hasOwn$e(object, IE_PROTO)) return object[IE_PROTO];
    var constructor = object.constructor;
    if (isCallable$e(constructor) && object instanceof constructor) {
      return constructor.prototype;
    } return object instanceof $Object$1 ? ObjectPrototype$3 : null;
  };

  var fails$F = fails$Y;
  var isCallable$d = isCallable$v;
  var isObject$g = isObject$s;
  var getPrototypeOf$5 = objectGetPrototypeOf$1;
  var defineBuiltIn$g = defineBuiltIn$k;
  var wellKnownSymbol$i = wellKnownSymbol$x;

  var ITERATOR$8 = wellKnownSymbol$i('iterator');
  var BUGGY_SAFARI_ITERATORS$1 = false;

  // `%IteratorPrototype%` object
  // https://tc39.es/ecma262/#sec-%iteratorprototype%-object
  var IteratorPrototype$4, PrototypeOfArrayIteratorPrototype, arrayIterator;

  /* eslint-disable es/no-array-prototype-keys -- safe */
  if ([].keys) {
    arrayIterator = [].keys();
    // Safari 8 has buggy iterators w/o `next`
    if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true;
    else {
      PrototypeOfArrayIteratorPrototype = getPrototypeOf$5(getPrototypeOf$5(arrayIterator));
      if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype$4 = PrototypeOfArrayIteratorPrototype;
    }
  }

  var NEW_ITERATOR_PROTOTYPE = !isObject$g(IteratorPrototype$4) || fails$F(function () {
    var test = {};
    // FF44- legacy iterators case
    return IteratorPrototype$4[ITERATOR$8].call(test) !== test;
  });

  if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$4 = {};

  // `%IteratorPrototype%[@@iterator]()` method
  // https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
  if (!isCallable$d(IteratorPrototype$4[ITERATOR$8])) {
    defineBuiltIn$g(IteratorPrototype$4, ITERATOR$8, function () {
      return this;
    });
  }

  var iteratorsCore = {
    IteratorPrototype: IteratorPrototype$4,
    BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
  };

  var IteratorPrototype$3 = iteratorsCore.IteratorPrototype;
  var create$7 = objectCreate;
  var createPropertyDescriptor$2 = createPropertyDescriptor$8;
  var setToStringTag$a = setToStringTag$d;
  var Iterators$2 = iterators;

  var returnThis$1 = function () { return this; };

  var iteratorCreateConstructor = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
    var TO_STRING_TAG = NAME + ' Iterator';
    IteratorConstructor.prototype = create$7(IteratorPrototype$3, { next: createPropertyDescriptor$2(+!ENUMERABLE_NEXT, next) });
    setToStringTag$a(IteratorConstructor, TO_STRING_TAG, false);
    Iterators$2[TO_STRING_TAG] = returnThis$1;
    return IteratorConstructor;
  };

  var $$14 = _export;
  var call$r = functionCall;
  var FunctionName$1 = functionName;
  var isCallable$c = isCallable$v;
  var createIteratorConstructor$1 = iteratorCreateConstructor;
  var getPrototypeOf$4 = objectGetPrototypeOf$1;
  var setPrototypeOf$4 = objectSetPrototypeOf;
  var setToStringTag$9 = setToStringTag$d;
  var createNonEnumerableProperty$8 = createNonEnumerableProperty$e;
  var defineBuiltIn$f = defineBuiltIn$k;
  var wellKnownSymbol$h = wellKnownSymbol$x;
  var Iterators$1 = iterators;
  var IteratorsCore = iteratorsCore;

  var PROPER_FUNCTION_NAME$2 = FunctionName$1.PROPER;
  var CONFIGURABLE_FUNCTION_NAME$1 = FunctionName$1.CONFIGURABLE;
  var IteratorPrototype$2 = IteratorsCore.IteratorPrototype;
  var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
  var ITERATOR$7 = wellKnownSymbol$h('iterator');
  var KEYS = 'keys';
  var VALUES = 'values';
  var ENTRIES = 'entries';

  var returnThis = function () { return this; };

  var iteratorDefine = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
    createIteratorConstructor$1(IteratorConstructor, NAME, next);

    var getIterationMethod = function (KIND) {
      if (KIND === DEFAULT && defaultIterator) return defaultIterator;
      if (!BUGGY_SAFARI_ITERATORS && KIND && KIND in IterablePrototype) return IterablePrototype[KIND];

      switch (KIND) {
        case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
        case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
        case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
      }

      return function () { return new IteratorConstructor(this); };
    };

    var TO_STRING_TAG = NAME + ' Iterator';
    var INCORRECT_VALUES_NAME = false;
    var IterablePrototype = Iterable.prototype;
    var nativeIterator = IterablePrototype[ITERATOR$7]
      || IterablePrototype['@@iterator']
      || DEFAULT && IterablePrototype[DEFAULT];
    var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
    var anyNativeIterator = NAME === 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
    var CurrentIteratorPrototype, methods, KEY;

    // fix native
    if (anyNativeIterator) {
      CurrentIteratorPrototype = getPrototypeOf$4(anyNativeIterator.call(new Iterable()));
      if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
        if (getPrototypeOf$4(CurrentIteratorPrototype) !== IteratorPrototype$2) {
          if (setPrototypeOf$4) {
            setPrototypeOf$4(CurrentIteratorPrototype, IteratorPrototype$2);
          } else if (!isCallable$c(CurrentIteratorPrototype[ITERATOR$7])) {
            defineBuiltIn$f(CurrentIteratorPrototype, ITERATOR$7, returnThis);
          }
        }
        // Set @@toStringTag to native iterators
        setToStringTag$9(CurrentIteratorPrototype, TO_STRING_TAG, true);
      }
    }

    // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
    if (PROPER_FUNCTION_NAME$2 && DEFAULT === VALUES && nativeIterator && nativeIterator.name !== VALUES) {
      if (CONFIGURABLE_FUNCTION_NAME$1) {
        createNonEnumerableProperty$8(IterablePrototype, 'name', VALUES);
      } else {
        INCORRECT_VALUES_NAME = true;
        defaultIterator = function values() { return call$r(nativeIterator, this); };
      }
    }

    // export additional methods
    if (DEFAULT) {
      methods = {
        values: getIterationMethod(VALUES),
        keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
        entries: getIterationMethod(ENTRIES)
      };
      if (FORCED) for (KEY in methods) {
        if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
          defineBuiltIn$f(IterablePrototype, KEY, methods[KEY]);
        }
      } else $$14({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
    }

    // define iterator
    if (IterablePrototype[ITERATOR$7] !== defaultIterator) {
      defineBuiltIn$f(IterablePrototype, ITERATOR$7, defaultIterator, { name: DEFAULT });
    }
    Iterators$1[NAME] = defaultIterator;

    return methods;
  };

  // `CreateIterResultObject` abstract operation
  // https://tc39.es/ecma262/#sec-createiterresultobject
  var createIterResultObject$5 = function (value, done) {
    return { value: value, done: done };
  };

  var toIndexedObject$6 = toIndexedObject$d;
  var addToUnscopables$1 = addToUnscopables$6;
  var Iterators = iterators;
  var InternalStateModule$a = internalState;
  var defineProperty$5 = objectDefineProperty.f;
  var defineIterator$2 = iteratorDefine;
  var createIterResultObject$4 = createIterResultObject$5;
  var DESCRIPTORS$p = descriptors;

  var ARRAY_ITERATOR = 'Array Iterator';
  var setInternalState$9 = InternalStateModule$a.set;
  var getInternalState$6 = InternalStateModule$a.getterFor(ARRAY_ITERATOR);

  // `Array.prototype.entries` method
  // https://tc39.es/ecma262/#sec-array.prototype.entries
  // `Array.prototype.keys` method
  // https://tc39.es/ecma262/#sec-array.prototype.keys
  // `Array.prototype.values` method
  // https://tc39.es/ecma262/#sec-array.prototype.values
  // `Array.prototype[@@iterator]` method
  // https://tc39.es/ecma262/#sec-array.prototype-@@iterator
  // `CreateArrayIterator` internal method
  // https://tc39.es/ecma262/#sec-createarrayiterator
  var es_array_iterator = defineIterator$2(Array, 'Array', function (iterated, kind) {
    setInternalState$9(this, {
      type: ARRAY_ITERATOR,
      target: toIndexedObject$6(iterated), // target
      index: 0,                          // next index
      kind: kind                         // kind
    });
  // `%ArrayIteratorPrototype%.next` method
  // https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
  }, function () {
    var state = getInternalState$6(this);
    var target = state.target;
    var index = state.index++;
    if (!target || index >= target.length) {
      state.target = null;
      return createIterResultObject$4(undefined, true);
    }
    switch (state.kind) {
      case 'keys': return createIterResultObject$4(index, false);
      case 'values': return createIterResultObject$4(target[index], false);
    } return createIterResultObject$4([index, target[index]], false);
  }, 'values');

  // argumentsList[@@iterator] is %ArrayProto_values%
  // https://tc39.es/ecma262/#sec-createunmappedargumentsobject
  // https://tc39.es/ecma262/#sec-createmappedargumentsobject
  var values = Iterators.Arguments = Iterators.Array;

  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  addToUnscopables$1('keys');
  addToUnscopables$1('values');
  addToUnscopables$1('entries');

  // V8 ~ Chrome 45- bug
  if (DESCRIPTORS$p && values.name !== 'values') try {
    defineProperty$5(values, 'name', { value: 'values' });
  } catch (error) { /* empty */ }

  var $$13 = _export;
  var $map$1 = arrayIteration.map;
  var arrayMethodHasSpeciesSupport$2 = arrayMethodHasSpeciesSupport$5;

  var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport$2('map');

  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  // with adding support of @@species
  $$13({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$2 }, {
    map: function map(callbackfn /* , thisArg */) {
      return $map$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  var DESCRIPTORS$o = descriptors;
  var isArray$2 = isArray$7;

  var $TypeError$i = TypeError;
  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var getOwnPropertyDescriptor$4 = Object.getOwnPropertyDescriptor;

  // Safari < 13 does not throw an error in this case
  var SILENT_ON_NON_WRITABLE_LENGTH_SET = DESCRIPTORS$o && !function () {
    // makes no sense without proper strict mode support
    if (this !== undefined) return true;
    try {
      // eslint-disable-next-line es/no-object-defineproperty -- safe
      Object.defineProperty([], 'length', { writable: false }).length = 1;
    } catch (error) {
      return error instanceof TypeError;
    }
  }();

  var arraySetLength = SILENT_ON_NON_WRITABLE_LENGTH_SET ? function (O, length) {
    if (isArray$2(O) && !getOwnPropertyDescriptor$4(O, 'length').writable) {
      throw new $TypeError$i('Cannot set read only .length');
    } return O.length = length;
  } : function (O, length) {
    return O.length = length;
  };

  var $$12 = _export;
  var toObject$b = toObject$k;
  var lengthOfArrayLike$f = lengthOfArrayLike$n;
  var setArrayLength$2 = arraySetLength;
  var doesNotExceedSafeInteger$2 = doesNotExceedSafeInteger$5;
  var fails$E = fails$Y;

  var INCORRECT_TO_LENGTH = fails$E(function () {
    return [].push.call({ length: 0x100000000 }, 1) !== 4294967297;
  });

  // V8 <= 121 and Safari <= 15.4; FF < 23 throws InternalError
  // https://bugs.chromium.org/p/v8/issues/detail?id=12681
  var properErrorOnNonWritableLength$1 = function () {
    try {
      // eslint-disable-next-line es/no-object-defineproperty -- safe
      Object.defineProperty([], 'length', { writable: false }).push();
    } catch (error) {
      return error instanceof TypeError;
    }
  };

  var FORCED$c = INCORRECT_TO_LENGTH || !properErrorOnNonWritableLength$1();

  // `Array.prototype.push` method
  // https://tc39.es/ecma262/#sec-array.prototype.push
  $$12({ target: 'Array', proto: true, arity: 1, forced: FORCED$c }, {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    push: function push(item) {
      var O = toObject$b(this);
      var len = lengthOfArrayLike$f(O);
      var argCount = arguments.length;
      doesNotExceedSafeInteger$2(len + argCount);
      for (var i = 0; i < argCount; i++) {
        O[len] = arguments[i];
        len++;
      }
      setArrayLength$2(O, len);
      return len;
    }
  });

  var aCallable$i = aCallable$n;
  var toObject$a = toObject$k;
  var IndexedObject$2 = indexedObject;
  var lengthOfArrayLike$e = lengthOfArrayLike$n;

  var $TypeError$h = TypeError;

  var REDUCE_EMPTY = 'Reduce of empty array with no initial value';

  // `Array.prototype.{ reduce, reduceRight }` methods implementation
  var createMethod$4 = function (IS_RIGHT) {
    return function (that, callbackfn, argumentsLength, memo) {
      var O = toObject$a(that);
      var self = IndexedObject$2(O);
      var length = lengthOfArrayLike$e(O);
      aCallable$i(callbackfn);
      if (length === 0 && argumentsLength < 2) throw new $TypeError$h(REDUCE_EMPTY);
      var index = IS_RIGHT ? length - 1 : 0;
      var i = IS_RIGHT ? -1 : 1;
      if (argumentsLength < 2) while (true) {
        if (index in self) {
          memo = self[index];
          index += i;
          break;
        }
        index += i;
        if (IS_RIGHT ? index < 0 : length <= index) {
          throw new $TypeError$h(REDUCE_EMPTY);
        }
      }
      for (;IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
        memo = callbackfn(memo, self[index], index, O);
      }
      return memo;
    };
  };

  var arrayReduce = {
    // `Array.prototype.reduce` method
    // https://tc39.es/ecma262/#sec-array.prototype.reduce
    left: createMethod$4(false),
    // `Array.prototype.reduceRight` method
    // https://tc39.es/ecma262/#sec-array.prototype.reduceright
    right: createMethod$4(true)
  };

  /* global Bun, Deno -- detection */
  var globalThis$F = globalThis_1;
  var userAgent$5 = environmentUserAgent;
  var classof$c = classofRaw$2;

  var userAgentStartsWith = function (string) {
    return userAgent$5.slice(0, string.length) === string;
  };

  var environment = (function () {
    if (userAgentStartsWith('Bun/')) return 'BUN';
    if (userAgentStartsWith('Cloudflare-Workers')) return 'CLOUDFLARE';
    if (userAgentStartsWith('Deno/')) return 'DENO';
    if (userAgentStartsWith('Node.js/')) return 'NODE';
    if (globalThis$F.Bun && typeof Bun.version == 'string') return 'BUN';
    if (globalThis$F.Deno && typeof Deno.version == 'object') return 'DENO';
    if (classof$c(globalThis$F.process) === 'process') return 'NODE';
    if (globalThis$F.window && globalThis$F.document) return 'BROWSER';
    return 'REST';
  })();

  var ENVIRONMENT$2 = environment;

  var environmentIsNode = ENVIRONMENT$2 === 'NODE';

  var $$11 = _export;
  var $reduce$1 = arrayReduce.left;
  var arrayMethodIsStrict$3 = arrayMethodIsStrict$5;
  var CHROME_VERSION = environmentV8Version;
  var IS_NODE$4 = environmentIsNode;

  // Chrome 80-82 has a critical bug
  // https://bugs.chromium.org/p/chromium/issues/detail?id=1049982
  var CHROME_BUG = !IS_NODE$4 && CHROME_VERSION > 79 && CHROME_VERSION < 83;
  var FORCED$b = CHROME_BUG || !arrayMethodIsStrict$3('reduce');

  // `Array.prototype.reduce` method
  // https://tc39.es/ecma262/#sec-array.prototype.reduce
  $$11({ target: 'Array', proto: true, forced: FORCED$b }, {
    reduce: function reduce(callbackfn /* , initialValue */) {
      var length = arguments.length;
      return $reduce$1(this, callbackfn, length, length > 1 ? arguments[1] : undefined);
    }
  });

  var $$10 = _export;
  var isArray$1 = isArray$7;
  var isConstructor$1 = isConstructor$4;
  var isObject$f = isObject$s;
  var toAbsoluteIndex$3 = toAbsoluteIndex$6;
  var lengthOfArrayLike$d = lengthOfArrayLike$n;
  var toIndexedObject$5 = toIndexedObject$d;
  var createProperty$3 = createProperty$6;
  var wellKnownSymbol$g = wellKnownSymbol$x;
  var arrayMethodHasSpeciesSupport$1 = arrayMethodHasSpeciesSupport$5;
  var nativeSlice = arraySlice$9;

  var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport$1('slice');

  var SPECIES$4 = wellKnownSymbol$g('species');
  var $Array$1 = Array;
  var max$3 = Math.max;

  // `Array.prototype.slice` method
  // https://tc39.es/ecma262/#sec-array.prototype.slice
  // fallback for not array-like ES3 strings and DOM objects
  $$10({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$1 }, {
    slice: function slice(start, end) {
      var O = toIndexedObject$5(this);
      var length = lengthOfArrayLike$d(O);
      var k = toAbsoluteIndex$3(start, length);
      var fin = toAbsoluteIndex$3(end === undefined ? length : end, length);
      // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
      var Constructor, result, n;
      if (isArray$1(O)) {
        Constructor = O.constructor;
        // cross-realm fallback
        if (isConstructor$1(Constructor) && (Constructor === $Array$1 || isArray$1(Constructor.prototype))) {
          Constructor = undefined;
        } else if (isObject$f(Constructor)) {
          Constructor = Constructor[SPECIES$4];
          if (Constructor === null) Constructor = undefined;
        }
        if (Constructor === $Array$1 || Constructor === undefined) {
          return nativeSlice(O, k, fin);
        }
      }
      result = new (Constructor === undefined ? $Array$1 : Constructor)(max$3(fin - k, 0));
      for (n = 0; k < fin; k++, n++) if (k in O) createProperty$3(result, n, O[k]);
      result.length = n;
      return result;
    }
  });

  var tryToString$3 = tryToString$7;

  var $TypeError$g = TypeError;

  var deletePropertyOrThrow$4 = function (O, P) {
    if (!delete O[P]) throw new $TypeError$g('Cannot delete property ' + tryToString$3(P) + ' of ' + tryToString$3(O));
  };

  var arraySlice$6 = arraySlice$9;

  var floor$6 = Math.floor;

  var sort$1 = function (array, comparefn) {
    var length = array.length;

    if (length < 8) {
      // insertion sort
      var i = 1;
      var element, j;

      while (i < length) {
        j = i;
        element = array[i];
        while (j && comparefn(array[j - 1], element) > 0) {
          array[j] = array[--j];
        }
        if (j !== i++) array[j] = element;
      }
    } else {
      // merge sort
      var middle = floor$6(length / 2);
      var left = sort$1(arraySlice$6(array, 0, middle), comparefn);
      var right = sort$1(arraySlice$6(array, middle), comparefn);
      var llength = left.length;
      var rlength = right.length;
      var lindex = 0;
      var rindex = 0;

      while (lindex < llength || rindex < rlength) {
        array[lindex + rindex] = (lindex < llength && rindex < rlength)
          ? comparefn(left[lindex], right[rindex]) <= 0 ? left[lindex++] : right[rindex++]
          : lindex < llength ? left[lindex++] : right[rindex++];
      }
    }

    return array;
  };

  var arraySort$1 = sort$1;

  var userAgent$4 = environmentUserAgent;

  var firefox = userAgent$4.match(/firefox\/(\d+)/i);

  var environmentFfVersion = !!firefox && +firefox[1];

  var UA = environmentUserAgent;

  var environmentIsIeOrEdge = /MSIE|Trident/.test(UA);

  var userAgent$3 = environmentUserAgent;

  var webkit = userAgent$3.match(/AppleWebKit\/(\d+)\./);

  var environmentWebkitVersion = !!webkit && +webkit[1];

  var $$$ = _export;
  var uncurryThis$E = functionUncurryThis;
  var aCallable$h = aCallable$n;
  var toObject$9 = toObject$k;
  var lengthOfArrayLike$c = lengthOfArrayLike$n;
  var deletePropertyOrThrow$3 = deletePropertyOrThrow$4;
  var toString$j = toString$o;
  var fails$D = fails$Y;
  var internalSort$1 = arraySort$1;
  var arrayMethodIsStrict$2 = arrayMethodIsStrict$5;
  var FF$1 = environmentFfVersion;
  var IE_OR_EDGE$1 = environmentIsIeOrEdge;
  var V8$2 = environmentV8Version;
  var WEBKIT$1 = environmentWebkitVersion;

  var test = [];
  var nativeSort$1 = uncurryThis$E(test.sort);
  var push$9 = uncurryThis$E(test.push);

  // IE8-
  var FAILS_ON_UNDEFINED = fails$D(function () {
    test.sort(undefined);
  });
  // V8 bug
  var FAILS_ON_NULL = fails$D(function () {
    test.sort(null);
  });
  // Old WebKit
  var STRICT_METHOD$2 = arrayMethodIsStrict$2('sort');

  var STABLE_SORT$1 = !fails$D(function () {
    // feature detection can be too slow, so check engines versions
    if (V8$2) return V8$2 < 70;
    if (FF$1 && FF$1 > 3) return;
    if (IE_OR_EDGE$1) return true;
    if (WEBKIT$1) return WEBKIT$1 < 603;

    var result = '';
    var code, chr, value, index;

    // generate an array with more 512 elements (Chakra and old V8 fails only in this case)
    for (code = 65; code < 76; code++) {
      chr = String.fromCharCode(code);

      switch (code) {
        case 66: case 69: case 70: case 72: value = 3; break;
        case 68: case 71: value = 4; break;
        default: value = 2;
      }

      for (index = 0; index < 47; index++) {
        test.push({ k: chr + index, v: value });
      }
    }

    test.sort(function (a, b) { return b.v - a.v; });

    for (index = 0; index < test.length; index++) {
      chr = test[index].k.charAt(0);
      if (result.charAt(result.length - 1) !== chr) result += chr;
    }

    return result !== 'DGBEFHACIJK';
  });

  var FORCED$a = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || !STRICT_METHOD$2 || !STABLE_SORT$1;

  var getSortCompare$1 = function (comparefn) {
    return function (x, y) {
      if (y === undefined) return -1;
      if (x === undefined) return 1;
      if (comparefn !== undefined) return +comparefn(x, y) || 0;
      return toString$j(x) > toString$j(y) ? 1 : -1;
    };
  };

  // `Array.prototype.sort` method
  // https://tc39.es/ecma262/#sec-array.prototype.sort
  $$$({ target: 'Array', proto: true, forced: FORCED$a }, {
    sort: function sort(comparefn) {
      if (comparefn !== undefined) aCallable$h(comparefn);

      var array = toObject$9(this);

      if (STABLE_SORT$1) return comparefn === undefined ? nativeSort$1(array) : nativeSort$1(array, comparefn);

      var items = [];
      var arrayLength = lengthOfArrayLike$c(array);
      var itemsLength, index;

      for (index = 0; index < arrayLength; index++) {
        if (index in array) push$9(items, array[index]);
      }

      internalSort$1(items, getSortCompare$1(comparefn));

      itemsLength = lengthOfArrayLike$c(items);
      index = 0;

      while (index < itemsLength) array[index] = items[index++];
      while (index < arrayLength) deletePropertyOrThrow$3(array, index++);

      return array;
    }
  });

  var $$_ = _export;
  var toObject$8 = toObject$k;
  var toAbsoluteIndex$2 = toAbsoluteIndex$6;
  var toIntegerOrInfinity$b = toIntegerOrInfinity$f;
  var lengthOfArrayLike$b = lengthOfArrayLike$n;
  var setArrayLength$1 = arraySetLength;
  var doesNotExceedSafeInteger$1 = doesNotExceedSafeInteger$5;
  var arraySpeciesCreate = arraySpeciesCreate$4;
  var createProperty$2 = createProperty$6;
  var deletePropertyOrThrow$2 = deletePropertyOrThrow$4;
  var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$5;

  var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('splice');

  var max$2 = Math.max;
  var min$7 = Math.min;

  // `Array.prototype.splice` method
  // https://tc39.es/ecma262/#sec-array.prototype.splice
  // with adding support of @@species
  $$_({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
    splice: function splice(start, deleteCount /* , ...items */) {
      var O = toObject$8(this);
      var len = lengthOfArrayLike$b(O);
      var actualStart = toAbsoluteIndex$2(start, len);
      var argumentsLength = arguments.length;
      var insertCount, actualDeleteCount, A, k, from, to;
      if (argumentsLength === 0) {
        insertCount = actualDeleteCount = 0;
      } else if (argumentsLength === 1) {
        insertCount = 0;
        actualDeleteCount = len - actualStart;
      } else {
        insertCount = argumentsLength - 2;
        actualDeleteCount = min$7(max$2(toIntegerOrInfinity$b(deleteCount), 0), len - actualStart);
      }
      doesNotExceedSafeInteger$1(len + insertCount - actualDeleteCount);
      A = arraySpeciesCreate(O, actualDeleteCount);
      for (k = 0; k < actualDeleteCount; k++) {
        from = actualStart + k;
        if (from in O) createProperty$2(A, k, O[from]);
      }
      A.length = actualDeleteCount;
      if (insertCount < actualDeleteCount) {
        for (k = actualStart; k < len - actualDeleteCount; k++) {
          from = k + actualDeleteCount;
          to = k + insertCount;
          if (from in O) O[to] = O[from];
          else deletePropertyOrThrow$2(O, to);
        }
        for (k = len; k > len - actualDeleteCount + insertCount; k--) deletePropertyOrThrow$2(O, k - 1);
      } else if (insertCount > actualDeleteCount) {
        for (k = len - actualDeleteCount; k > actualStart; k--) {
          from = k + actualDeleteCount - 1;
          to = k + insertCount - 1;
          if (from in O) O[to] = O[from];
          else deletePropertyOrThrow$2(O, to);
        }
      }
      for (k = 0; k < insertCount; k++) {
        O[k + actualStart] = arguments[k + 2];
      }
      setArrayLength$1(O, len - actualDeleteCount + insertCount);
      return A;
    }
  });

  // this method was added to unscopables after implementation
  // in popular engines, so it's moved to a separate module
  var addToUnscopables = addToUnscopables$6;

  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  addToUnscopables('flat');

  var $$Z = _export;
  var toObject$7 = toObject$k;
  var lengthOfArrayLike$a = lengthOfArrayLike$n;
  var setArrayLength = arraySetLength;
  var deletePropertyOrThrow$1 = deletePropertyOrThrow$4;
  var doesNotExceedSafeInteger = doesNotExceedSafeInteger$5;

  // IE8-
  var INCORRECT_RESULT = [].unshift(0) !== 1;

  // V8 ~ Chrome < 71 and Safari <= 15.4, FF < 23 throws InternalError
  var properErrorOnNonWritableLength = function () {
    try {
      // eslint-disable-next-line es/no-object-defineproperty -- safe
      Object.defineProperty([], 'length', { writable: false }).unshift();
    } catch (error) {
      return error instanceof TypeError;
    }
  };

  var FORCED$9 = INCORRECT_RESULT || !properErrorOnNonWritableLength();

  // `Array.prototype.unshift` method
  // https://tc39.es/ecma262/#sec-array.prototype.unshift
  $$Z({ target: 'Array', proto: true, arity: 1, forced: FORCED$9 }, {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    unshift: function unshift(item) {
      var O = toObject$7(this);
      var len = lengthOfArrayLike$a(O);
      var argCount = arguments.length;
      if (argCount) {
        doesNotExceedSafeInteger(len + argCount);
        var k = len;
        while (k--) {
          var to = k + argCount;
          if (k in O) O[to] = O[k];
          else deletePropertyOrThrow$1(O, to);
        }
        for (var j = 0; j < argCount; j++) {
          O[j] = arguments[j];
        }
      } return setArrayLength(O, len + argCount);
    }
  });

  var globalThis$E = globalThis_1;
  var uncurryThisAccessor$2 = functionUncurryThisAccessor;
  var classof$b = classofRaw$2;

  var ArrayBuffer$5 = globalThis$E.ArrayBuffer;
  var TypeError$6 = globalThis$E.TypeError;

  // Includes
  // - Perform ? RequireInternalSlot(O, [[ArrayBufferData]]).
  // - If IsSharedArrayBuffer(O) is true, throw a TypeError exception.
  var arrayBufferByteLength$2 = ArrayBuffer$5 && uncurryThisAccessor$2(ArrayBuffer$5.prototype, 'byteLength', 'get') || function (O) {
    if (classof$b(O) !== 'ArrayBuffer') throw new TypeError$6('ArrayBuffer expected');
    return O.byteLength;
  };

  var globalThis$D = globalThis_1;
  var uncurryThis$D = functionUncurryThisClause;
  var arrayBufferByteLength$1 = arrayBufferByteLength$2;

  var ArrayBuffer$4 = globalThis$D.ArrayBuffer;
  var ArrayBufferPrototype$4 = ArrayBuffer$4 && ArrayBuffer$4.prototype;
  var slice$3 = ArrayBufferPrototype$4 && uncurryThis$D(ArrayBufferPrototype$4.slice);

  var arrayBufferIsDetached = function (O) {
    if (arrayBufferByteLength$1(O) !== 0) return false;
    if (!slice$3) return false;
    try {
      slice$3(O, 0, 0);
      return false;
    } catch (error) {
      return true;
    }
  };

  var DESCRIPTORS$n = descriptors;
  var defineBuiltInAccessor$c = defineBuiltInAccessor$f;
  var isDetached$1 = arrayBufferIsDetached;

  var ArrayBufferPrototype$3 = ArrayBuffer.prototype;

  if (DESCRIPTORS$n && !('detached' in ArrayBufferPrototype$3)) {
    defineBuiltInAccessor$c(ArrayBufferPrototype$3, 'detached', {
      configurable: true,
      get: function detached() {
        return isDetached$1(this);
      }
    });
  }

  var toIntegerOrInfinity$a = toIntegerOrInfinity$f;
  var toLength$7 = toLength$9;

  var $RangeError$7 = RangeError;

  // `ToIndex` abstract operation
  // https://tc39.es/ecma262/#sec-toindex
  var toIndex$3 = function (it) {
    if (it === undefined) return 0;
    var number = toIntegerOrInfinity$a(it);
    var length = toLength$7(number);
    if (number !== length) throw new $RangeError$7('Wrong length or index');
    return length;
  };

  var isDetached = arrayBufferIsDetached;

  var $TypeError$f = TypeError;

  var arrayBufferNotDetached = function (it) {
    if (isDetached(it)) throw new $TypeError$f('ArrayBuffer is detached');
    return it;
  };

  var globalThis$C = globalThis_1;
  var IS_NODE$3 = environmentIsNode;

  var getBuiltInNodeModule$1 = function (name) {
    if (IS_NODE$3) {
      try {
        return globalThis$C.process.getBuiltinModule(name);
      } catch (error) { /* empty */ }
      try {
        // eslint-disable-next-line no-new-func -- safe
        return Function('return require("' + name + '")')();
      } catch (error) { /* empty */ }
    }
  };

  var globalThis$B = globalThis_1;
  var fails$C = fails$Y;
  var V8$1 = environmentV8Version;
  var ENVIRONMENT$1 = environment;

  var structuredClone$2 = globalThis$B.structuredClone;

  var structuredCloneProperTransfer = !!structuredClone$2 && !fails$C(function () {
    // prevent V8 ArrayBufferDetaching protector cell invalidation and performance degradation
    // https://github.com/zloirock/core-js/issues/679
    if ((ENVIRONMENT$1 === 'DENO' && V8$1 > 92) || (ENVIRONMENT$1 === 'NODE' && V8$1 > 94) || (ENVIRONMENT$1 === 'BROWSER' && V8$1 > 97)) return false;
    var buffer = new ArrayBuffer(8);
    var clone = structuredClone$2(buffer, { transfer: [buffer] });
    return buffer.byteLength !== 0 || clone.byteLength !== 8;
  });

  var globalThis$A = globalThis_1;
  var getBuiltInNodeModule = getBuiltInNodeModule$1;
  var PROPER_STRUCTURED_CLONE_TRANSFER$1 = structuredCloneProperTransfer;

  var structuredClone$1 = globalThis$A.structuredClone;
  var $ArrayBuffer$1 = globalThis$A.ArrayBuffer;
  var $MessageChannel = globalThis$A.MessageChannel;
  var detach = false;
  var WorkerThreads, channel$1, buffer, $detach;

  if (PROPER_STRUCTURED_CLONE_TRANSFER$1) {
    detach = function (transferable) {
      structuredClone$1(transferable, { transfer: [transferable] });
    };
  } else if ($ArrayBuffer$1) try {
    if (!$MessageChannel) {
      WorkerThreads = getBuiltInNodeModule('worker_threads');
      if (WorkerThreads) $MessageChannel = WorkerThreads.MessageChannel;
    }

    if ($MessageChannel) {
      channel$1 = new $MessageChannel();
      buffer = new $ArrayBuffer$1(2);

      $detach = function (transferable) {
        channel$1.port1.postMessage(null, [transferable]);
      };

      if (buffer.byteLength === 2) {
        $detach(buffer);
        if (buffer.byteLength === 0) detach = $detach;
      }
    }
  } catch (error) { /* empty */ }

  var detachTransferable$1 = detach;

  var globalThis$z = globalThis_1;
  var uncurryThis$C = functionUncurryThis;
  var uncurryThisAccessor$1 = functionUncurryThisAccessor;
  var toIndex$2 = toIndex$3;
  var notDetached = arrayBufferNotDetached;
  var arrayBufferByteLength = arrayBufferByteLength$2;
  var detachTransferable = detachTransferable$1;
  var PROPER_STRUCTURED_CLONE_TRANSFER = structuredCloneProperTransfer;

  var structuredClone = globalThis$z.structuredClone;
  var ArrayBuffer$3 = globalThis$z.ArrayBuffer;
  var DataView$2 = globalThis$z.DataView;
  var min$6 = Math.min;
  var ArrayBufferPrototype$2 = ArrayBuffer$3.prototype;
  var DataViewPrototype$1 = DataView$2.prototype;
  var slice$2 = uncurryThis$C(ArrayBufferPrototype$2.slice);
  var isResizable = uncurryThisAccessor$1(ArrayBufferPrototype$2, 'resizable', 'get');
  var maxByteLength = uncurryThisAccessor$1(ArrayBufferPrototype$2, 'maxByteLength', 'get');
  var getInt8 = uncurryThis$C(DataViewPrototype$1.getInt8);
  var setInt8 = uncurryThis$C(DataViewPrototype$1.setInt8);

  var arrayBufferTransfer = (PROPER_STRUCTURED_CLONE_TRANSFER || detachTransferable) && function (arrayBuffer, newLength, preserveResizability) {
    var byteLength = arrayBufferByteLength(arrayBuffer);
    var newByteLength = newLength === undefined ? byteLength : toIndex$2(newLength);
    var fixedLength = !isResizable || !isResizable(arrayBuffer);
    var newBuffer;
    notDetached(arrayBuffer);
    if (PROPER_STRUCTURED_CLONE_TRANSFER) {
      arrayBuffer = structuredClone(arrayBuffer, { transfer: [arrayBuffer] });
      if (byteLength === newByteLength && (preserveResizability || fixedLength)) return arrayBuffer;
    }
    if (byteLength >= newByteLength && (!preserveResizability || fixedLength)) {
      newBuffer = slice$2(arrayBuffer, 0, newByteLength);
    } else {
      var options = preserveResizability && !fixedLength && maxByteLength ? { maxByteLength: maxByteLength(arrayBuffer) } : undefined;
      newBuffer = new ArrayBuffer$3(newByteLength, options);
      var a = new DataView$2(arrayBuffer);
      var b = new DataView$2(newBuffer);
      var copyLength = min$6(newByteLength, byteLength);
      for (var i = 0; i < copyLength; i++) setInt8(b, i, getInt8(a, i));
    }
    if (!PROPER_STRUCTURED_CLONE_TRANSFER) detachTransferable(arrayBuffer);
    return newBuffer;
  };

  var $$Y = _export;
  var $transfer$1 = arrayBufferTransfer;

  // `ArrayBuffer.prototype.transfer` method
  // https://tc39.es/proposal-arraybuffer-transfer/#sec-arraybuffer.prototype.transfer
  if ($transfer$1) $$Y({ target: 'ArrayBuffer', proto: true }, {
    transfer: function transfer() {
      return $transfer$1(this, arguments.length ? arguments[0] : undefined, true);
    }
  });

  var $$X = _export;
  var $transfer = arrayBufferTransfer;

  // `ArrayBuffer.prototype.transferToFixedLength` method
  // https://tc39.es/proposal-arraybuffer-transfer/#sec-arraybuffer.prototype.transfertofixedlength
  if ($transfer) $$X({ target: 'ArrayBuffer', proto: true }, {
    transferToFixedLength: function transferToFixedLength() {
      return $transfer(this, arguments.length ? arguments[0] : undefined, false);
    }
  });

  var $$W = _export;
  var globalThis$y = globalThis_1;

  // `globalThis` object
  // https://tc39.es/ecma262/#sec-globalthis
  $$W({ global: true, forced: globalThis$y.globalThis !== globalThis$y }, {
    globalThis: globalThis$y
  });

  var globalThis$x = globalThis_1;
  var setToStringTag$8 = setToStringTag$d;

  // JSON[@@toStringTag] property
  // https://tc39.es/ecma262/#sec-json-@@tostringtag
  setToStringTag$8(globalThis$x.JSON, 'JSON', true);

  var internalMetadata = {exports: {}};

  // FF26- bug: ArrayBuffers are non-extensible, but Object.isExtensible does not report it
  var fails$B = fails$Y;

  var arrayBufferNonExtensible = fails$B(function () {
    if (typeof ArrayBuffer == 'function') {
      var buffer = new ArrayBuffer(8);
      // eslint-disable-next-line es/no-object-isextensible, es/no-object-defineproperty -- safe
      if (Object.isExtensible(buffer)) Object.defineProperty(buffer, 'a', { value: 8 });
    }
  });

  var fails$A = fails$Y;
  var isObject$e = isObject$s;
  var classof$a = classofRaw$2;
  var ARRAY_BUFFER_NON_EXTENSIBLE = arrayBufferNonExtensible;

  // eslint-disable-next-line es/no-object-isextensible -- safe
  var $isExtensible = Object.isExtensible;
  var FAILS_ON_PRIMITIVES$3 = fails$A(function () { $isExtensible(1); });

  // `Object.isExtensible` method
  // https://tc39.es/ecma262/#sec-object.isextensible
  var objectIsExtensible = (FAILS_ON_PRIMITIVES$3 || ARRAY_BUFFER_NON_EXTENSIBLE) ? function isExtensible(it) {
    if (!isObject$e(it)) return false;
    if (ARRAY_BUFFER_NON_EXTENSIBLE && classof$a(it) === 'ArrayBuffer') return false;
    return $isExtensible ? $isExtensible(it) : true;
  } : $isExtensible;

  var fails$z = fails$Y;

  var freezing = !fails$z(function () {
    // eslint-disable-next-line es/no-object-isextensible, es/no-object-preventextensions -- required for testing
    return Object.isExtensible(Object.preventExtensions({}));
  });

  var $$V = _export;
  var uncurryThis$B = functionUncurryThis;
  var hiddenKeys = hiddenKeys$6;
  var isObject$d = isObject$s;
  var hasOwn$d = hasOwnProperty_1;
  var defineProperty$4 = objectDefineProperty.f;
  var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
  var getOwnPropertyNamesExternalModule = objectGetOwnPropertyNamesExternal;
  var isExtensible$1 = objectIsExtensible;
  var uid$1 = uid$5;
  var FREEZING$1 = freezing;

  var REQUIRED = false;
  var METADATA = uid$1('meta');
  var id$1 = 0;

  var setMetadata = function (it) {
    defineProperty$4(it, METADATA, { value: {
      objectID: 'O' + id$1++, // object ID
      weakData: {}          // weak collections IDs
    } });
  };

  var fastKey$1 = function (it, create) {
    // return a primitive with prefix
    if (!isObject$d(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
    if (!hasOwn$d(it, METADATA)) {
      // can't set metadata to uncaught frozen object
      if (!isExtensible$1(it)) return 'F';
      // not necessary to add metadata
      if (!create) return 'E';
      // add missing metadata
      setMetadata(it);
    // return object ID
    } return it[METADATA].objectID;
  };

  var getWeakData$1 = function (it, create) {
    if (!hasOwn$d(it, METADATA)) {
      // can't set metadata to uncaught frozen object
      if (!isExtensible$1(it)) return true;
      // not necessary to add metadata
      if (!create) return false;
      // add missing metadata
      setMetadata(it);
    // return the store of weak collections IDs
    } return it[METADATA].weakData;
  };

  // add metadata on freeze-family methods calling
  var onFreeze = function (it) {
    if (FREEZING$1 && REQUIRED && isExtensible$1(it) && !hasOwn$d(it, METADATA)) setMetadata(it);
    return it;
  };

  var enable = function () {
    meta.enable = function () { /* empty */ };
    REQUIRED = true;
    var getOwnPropertyNames = getOwnPropertyNamesModule.f;
    var splice = uncurryThis$B([].splice);
    var test = {};
    test[METADATA] = 1;

    // prevent exposing of metadata key
    if (getOwnPropertyNames(test).length) {
      getOwnPropertyNamesModule.f = function (it) {
        var result = getOwnPropertyNames(it);
        for (var i = 0, length = result.length; i < length; i++) {
          if (result[i] === METADATA) {
            splice(result, i, 1);
            break;
          }
        } return result;
      };

      $$V({ target: 'Object', stat: true, forced: true }, {
        getOwnPropertyNames: getOwnPropertyNamesExternalModule.f
      });
    }
  };

  var meta = internalMetadata.exports = {
    enable: enable,
    fastKey: fastKey$1,
    getWeakData: getWeakData$1,
    onFreeze: onFreeze
  };

  hiddenKeys[METADATA] = true;

  var internalMetadataExports = internalMetadata.exports;

  var bind$9 = functionBindContext;
  var call$q = functionCall;
  var anObject$p = anObject$y;
  var tryToString$2 = tryToString$7;
  var isArrayIteratorMethod$1 = isArrayIteratorMethod$3;
  var lengthOfArrayLike$9 = lengthOfArrayLike$n;
  var isPrototypeOf$6 = objectIsPrototypeOf;
  var getIterator$2 = getIterator$4;
  var getIteratorMethod$2 = getIteratorMethod$5;
  var iteratorClose$3 = iteratorClose$5;

  var $TypeError$e = TypeError;

  var Result = function (stopped, result) {
    this.stopped = stopped;
    this.result = result;
  };

  var ResultPrototype = Result.prototype;

  var iterate$e = function (iterable, unboundFunction, options) {
    var that = options && options.that;
    var AS_ENTRIES = !!(options && options.AS_ENTRIES);
    var IS_RECORD = !!(options && options.IS_RECORD);
    var IS_ITERATOR = !!(options && options.IS_ITERATOR);
    var INTERRUPTED = !!(options && options.INTERRUPTED);
    var fn = bind$9(unboundFunction, that);
    var iterator, iterFn, index, length, result, next, step;

    var stop = function (condition) {
      if (iterator) iteratorClose$3(iterator, 'normal', condition);
      return new Result(true, condition);
    };

    var callFn = function (value) {
      if (AS_ENTRIES) {
        anObject$p(value);
        return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
      } return INTERRUPTED ? fn(value, stop) : fn(value);
    };

    if (IS_RECORD) {
      iterator = iterable.iterator;
    } else if (IS_ITERATOR) {
      iterator = iterable;
    } else {
      iterFn = getIteratorMethod$2(iterable);
      if (!iterFn) throw new $TypeError$e(tryToString$2(iterable) + ' is not iterable');
      // optimisation for array iterators
      if (isArrayIteratorMethod$1(iterFn)) {
        for (index = 0, length = lengthOfArrayLike$9(iterable); length > index; index++) {
          result = callFn(iterable[index]);
          if (result && isPrototypeOf$6(ResultPrototype, result)) return result;
        } return new Result(false);
      }
      iterator = getIterator$2(iterable, iterFn);
    }

    next = IS_RECORD ? iterable.next : iterator.next;
    while (!(step = call$q(next, iterator)).done) {
      try {
        result = callFn(step.value);
      } catch (error) {
        iteratorClose$3(iterator, 'throw', error);
      }
      if (typeof result == 'object' && result && isPrototypeOf$6(ResultPrototype, result)) return result;
    } return new Result(false);
  };

  var isPrototypeOf$5 = objectIsPrototypeOf;

  var $TypeError$d = TypeError;

  var anInstance$9 = function (it, Prototype) {
    if (isPrototypeOf$5(Prototype, it)) return it;
    throw new $TypeError$d('Incorrect invocation');
  };

  var $$U = _export;
  var globalThis$w = globalThis_1;
  var uncurryThis$A = functionUncurryThis;
  var isForced$3 = isForced_1;
  var defineBuiltIn$e = defineBuiltIn$k;
  var InternalMetadataModule$1 = internalMetadataExports;
  var iterate$d = iterate$e;
  var anInstance$8 = anInstance$9;
  var isCallable$b = isCallable$v;
  var isNullOrUndefined$7 = isNullOrUndefined$b;
  var isObject$c = isObject$s;
  var fails$y = fails$Y;
  var checkCorrectnessOfIteration$2 = checkCorrectnessOfIteration$4;
  var setToStringTag$7 = setToStringTag$d;
  var inheritIfRequired$4 = inheritIfRequired$6;

  var collection$3 = function (CONSTRUCTOR_NAME, wrapper, common) {
    var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
    var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
    var ADDER = IS_MAP ? 'set' : 'add';
    var NativeConstructor = globalThis$w[CONSTRUCTOR_NAME];
    var NativePrototype = NativeConstructor && NativeConstructor.prototype;
    var Constructor = NativeConstructor;
    var exported = {};

    var fixMethod = function (KEY) {
      var uncurriedNativeMethod = uncurryThis$A(NativePrototype[KEY]);
      defineBuiltIn$e(NativePrototype, KEY,
        KEY === 'add' ? function add(value) {
          uncurriedNativeMethod(this, value === 0 ? 0 : value);
          return this;
        } : KEY === 'delete' ? function (key) {
          return IS_WEAK && !isObject$c(key) ? false : uncurriedNativeMethod(this, key === 0 ? 0 : key);
        } : KEY === 'get' ? function get(key) {
          return IS_WEAK && !isObject$c(key) ? undefined : uncurriedNativeMethod(this, key === 0 ? 0 : key);
        } : KEY === 'has' ? function has(key) {
          return IS_WEAK && !isObject$c(key) ? false : uncurriedNativeMethod(this, key === 0 ? 0 : key);
        } : function set(key, value) {
          uncurriedNativeMethod(this, key === 0 ? 0 : key, value);
          return this;
        }
      );
    };

    var REPLACE = isForced$3(
      CONSTRUCTOR_NAME,
      !isCallable$b(NativeConstructor) || !(IS_WEAK || NativePrototype.forEach && !fails$y(function () {
        new NativeConstructor().entries().next();
      }))
    );

    if (REPLACE) {
      // create collection constructor
      Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
      InternalMetadataModule$1.enable();
    } else if (isForced$3(CONSTRUCTOR_NAME, true)) {
      var instance = new Constructor();
      // early implementations not supports chaining
      var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) !== instance;
      // V8 ~ Chromium 40- weak-collections throws on primitives, but should return false
      var THROWS_ON_PRIMITIVES = fails$y(function () { instance.has(1); });
      // most early implementations doesn't supports iterables, most modern - not close it correctly
      // eslint-disable-next-line no-new -- required for testing
      var ACCEPT_ITERABLES = checkCorrectnessOfIteration$2(function (iterable) { new NativeConstructor(iterable); });
      // for early implementations -0 and +0 not the same
      var BUGGY_ZERO = !IS_WEAK && fails$y(function () {
        // V8 ~ Chromium 42- fails only with 5+ elements
        var $instance = new NativeConstructor();
        var index = 5;
        while (index--) $instance[ADDER](index, index);
        return !$instance.has(-0);
      });

      if (!ACCEPT_ITERABLES) {
        Constructor = wrapper(function (dummy, iterable) {
          anInstance$8(dummy, NativePrototype);
          var that = inheritIfRequired$4(new NativeConstructor(), dummy, Constructor);
          if (!isNullOrUndefined$7(iterable)) iterate$d(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
          return that;
        });
        Constructor.prototype = NativePrototype;
        NativePrototype.constructor = Constructor;
      }

      if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
        fixMethod('delete');
        fixMethod('has');
        IS_MAP && fixMethod('get');
      }

      if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);

      // weak collections should not contains .clear method
      if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear;
    }

    exported[CONSTRUCTOR_NAME] = Constructor;
    $$U({ global: true, constructor: true, forced: Constructor !== NativeConstructor }, exported);

    setToStringTag$7(Constructor, CONSTRUCTOR_NAME);

    if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);

    return Constructor;
  };

  var defineBuiltIn$d = defineBuiltIn$k;

  var defineBuiltIns$6 = function (target, src, options) {
    for (var key in src) defineBuiltIn$d(target, key, src[key], options);
    return target;
  };

  var getBuiltIn$6 = getBuiltIn$g;
  var defineBuiltInAccessor$b = defineBuiltInAccessor$f;
  var wellKnownSymbol$f = wellKnownSymbol$x;
  var DESCRIPTORS$m = descriptors;

  var SPECIES$3 = wellKnownSymbol$f('species');

  var setSpecies$4 = function (CONSTRUCTOR_NAME) {
    var Constructor = getBuiltIn$6(CONSTRUCTOR_NAME);

    if (DESCRIPTORS$m && Constructor && !Constructor[SPECIES$3]) {
      defineBuiltInAccessor$b(Constructor, SPECIES$3, {
        configurable: true,
        get: function () { return this; }
      });
    }
  };

  var create$6 = objectCreate;
  var defineBuiltInAccessor$a = defineBuiltInAccessor$f;
  var defineBuiltIns$5 = defineBuiltIns$6;
  var bind$8 = functionBindContext;
  var anInstance$7 = anInstance$9;
  var isNullOrUndefined$6 = isNullOrUndefined$b;
  var iterate$c = iterate$e;
  var defineIterator$1 = iteratorDefine;
  var createIterResultObject$3 = createIterResultObject$5;
  var setSpecies$3 = setSpecies$4;
  var DESCRIPTORS$l = descriptors;
  var fastKey = internalMetadataExports.fastKey;
  var InternalStateModule$9 = internalState;

  var setInternalState$8 = InternalStateModule$9.set;
  var internalStateGetterFor$1 = InternalStateModule$9.getterFor;

  var collectionStrong$2 = {
    getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
      var Constructor = wrapper(function (that, iterable) {
        anInstance$7(that, Prototype);
        setInternalState$8(that, {
          type: CONSTRUCTOR_NAME,
          index: create$6(null),
          first: null,
          last: null,
          size: 0
        });
        if (!DESCRIPTORS$l) that.size = 0;
        if (!isNullOrUndefined$6(iterable)) iterate$c(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
      });

      var Prototype = Constructor.prototype;

      var getInternalState = internalStateGetterFor$1(CONSTRUCTOR_NAME);

      var define = function (that, key, value) {
        var state = getInternalState(that);
        var entry = getEntry(that, key);
        var previous, index;
        // change existing entry
        if (entry) {
          entry.value = value;
        // create new entry
        } else {
          state.last = entry = {
            index: index = fastKey(key, true),
            key: key,
            value: value,
            previous: previous = state.last,
            next: null,
            removed: false
          };
          if (!state.first) state.first = entry;
          if (previous) previous.next = entry;
          if (DESCRIPTORS$l) state.size++;
          else that.size++;
          // add to index
          if (index !== 'F') state.index[index] = entry;
        } return that;
      };

      var getEntry = function (that, key) {
        var state = getInternalState(that);
        // fast case
        var index = fastKey(key);
        var entry;
        if (index !== 'F') return state.index[index];
        // frozen object case
        for (entry = state.first; entry; entry = entry.next) {
          if (entry.key === key) return entry;
        }
      };

      defineBuiltIns$5(Prototype, {
        // `{ Map, Set }.prototype.clear()` methods
        // https://tc39.es/ecma262/#sec-map.prototype.clear
        // https://tc39.es/ecma262/#sec-set.prototype.clear
        clear: function clear() {
          var that = this;
          var state = getInternalState(that);
          var entry = state.first;
          while (entry) {
            entry.removed = true;
            if (entry.previous) entry.previous = entry.previous.next = null;
            entry = entry.next;
          }
          state.first = state.last = null;
          state.index = create$6(null);
          if (DESCRIPTORS$l) state.size = 0;
          else that.size = 0;
        },
        // `{ Map, Set }.prototype.delete(key)` methods
        // https://tc39.es/ecma262/#sec-map.prototype.delete
        // https://tc39.es/ecma262/#sec-set.prototype.delete
        'delete': function (key) {
          var that = this;
          var state = getInternalState(that);
          var entry = getEntry(that, key);
          if (entry) {
            var next = entry.next;
            var prev = entry.previous;
            delete state.index[entry.index];
            entry.removed = true;
            if (prev) prev.next = next;
            if (next) next.previous = prev;
            if (state.first === entry) state.first = next;
            if (state.last === entry) state.last = prev;
            if (DESCRIPTORS$l) state.size--;
            else that.size--;
          } return !!entry;
        },
        // `{ Map, Set }.prototype.forEach(callbackfn, thisArg = undefined)` methods
        // https://tc39.es/ecma262/#sec-map.prototype.foreach
        // https://tc39.es/ecma262/#sec-set.prototype.foreach
        forEach: function forEach(callbackfn /* , that = undefined */) {
          var state = getInternalState(this);
          var boundFunction = bind$8(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
          var entry;
          while (entry = entry ? entry.next : state.first) {
            boundFunction(entry.value, entry.key, this);
            // revert to the last existing entry
            while (entry && entry.removed) entry = entry.previous;
          }
        },
        // `{ Map, Set}.prototype.has(key)` methods
        // https://tc39.es/ecma262/#sec-map.prototype.has
        // https://tc39.es/ecma262/#sec-set.prototype.has
        has: function has(key) {
          return !!getEntry(this, key);
        }
      });

      defineBuiltIns$5(Prototype, IS_MAP ? {
        // `Map.prototype.get(key)` method
        // https://tc39.es/ecma262/#sec-map.prototype.get
        get: function get(key) {
          var entry = getEntry(this, key);
          return entry && entry.value;
        },
        // `Map.prototype.set(key, value)` method
        // https://tc39.es/ecma262/#sec-map.prototype.set
        set: function set(key, value) {
          return define(this, key === 0 ? 0 : key, value);
        }
      } : {
        // `Set.prototype.add(value)` method
        // https://tc39.es/ecma262/#sec-set.prototype.add
        add: function add(value) {
          return define(this, value = value === 0 ? 0 : value, value);
        }
      });
      if (DESCRIPTORS$l) defineBuiltInAccessor$a(Prototype, 'size', {
        configurable: true,
        get: function () {
          return getInternalState(this).size;
        }
      });
      return Constructor;
    },
    setStrong: function (Constructor, CONSTRUCTOR_NAME, IS_MAP) {
      var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
      var getInternalCollectionState = internalStateGetterFor$1(CONSTRUCTOR_NAME);
      var getInternalIteratorState = internalStateGetterFor$1(ITERATOR_NAME);
      // `{ Map, Set }.prototype.{ keys, values, entries, @@iterator }()` methods
      // https://tc39.es/ecma262/#sec-map.prototype.entries
      // https://tc39.es/ecma262/#sec-map.prototype.keys
      // https://tc39.es/ecma262/#sec-map.prototype.values
      // https://tc39.es/ecma262/#sec-map.prototype-@@iterator
      // https://tc39.es/ecma262/#sec-set.prototype.entries
      // https://tc39.es/ecma262/#sec-set.prototype.keys
      // https://tc39.es/ecma262/#sec-set.prototype.values
      // https://tc39.es/ecma262/#sec-set.prototype-@@iterator
      defineIterator$1(Constructor, CONSTRUCTOR_NAME, function (iterated, kind) {
        setInternalState$8(this, {
          type: ITERATOR_NAME,
          target: iterated,
          state: getInternalCollectionState(iterated),
          kind: kind,
          last: null
        });
      }, function () {
        var state = getInternalIteratorState(this);
        var kind = state.kind;
        var entry = state.last;
        // revert to the last existing entry
        while (entry && entry.removed) entry = entry.previous;
        // get next entry
        if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
          // or finish the iteration
          state.target = null;
          return createIterResultObject$3(undefined, true);
        }
        // return step by kind
        if (kind === 'keys') return createIterResultObject$3(entry.key, false);
        if (kind === 'values') return createIterResultObject$3(entry.value, false);
        return createIterResultObject$3([entry.key, entry.value], false);
      }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

      // `{ Map, Set }.prototype[@@species]` accessors
      // https://tc39.es/ecma262/#sec-get-map-@@species
      // https://tc39.es/ecma262/#sec-get-set-@@species
      setSpecies$3(CONSTRUCTOR_NAME);
    }
  };

  var collection$2 = collection$3;
  var collectionStrong$1 = collectionStrong$2;

  // `Map` constructor
  // https://tc39.es/ecma262/#sec-map-objects
  collection$2('Map', function (init) {
    return function Map() { return init(this, arguments.length ? arguments[0] : undefined); };
  }, collectionStrong$1);

  var anObject$o = anObject$y;
  var ordinaryToPrimitive = ordinaryToPrimitive$2;

  var $TypeError$c = TypeError;

  // `Date.prototype[@@toPrimitive](hint)` method implementation
  // https://tc39.es/ecma262/#sec-date.prototype-@@toprimitive
  var dateToPrimitive$1 = function (hint) {
    anObject$o(this);
    if (hint === 'string' || hint === 'default') hint = 'string';
    else if (hint !== 'number') throw new $TypeError$c('Incorrect hint');
    return ordinaryToPrimitive(this, hint);
  };

  var hasOwn$c = hasOwnProperty_1;
  var defineBuiltIn$c = defineBuiltIn$k;
  var dateToPrimitive = dateToPrimitive$1;
  var wellKnownSymbol$e = wellKnownSymbol$x;

  var TO_PRIMITIVE = wellKnownSymbol$e('toPrimitive');
  var DatePrototype = Date.prototype;

  // `Date.prototype[@@toPrimitive]` method
  // https://tc39.es/ecma262/#sec-date.prototype-@@toprimitive
  if (!hasOwn$c(DatePrototype, TO_PRIMITIVE)) {
    defineBuiltIn$c(DatePrototype, TO_PRIMITIVE, dateToPrimitive);
  }

  var setToStringTag$6 = setToStringTag$d;

  // Math[@@toStringTag] property
  // https://tc39.es/ecma262/#sec-math-@@tostringtag
  setToStringTag$6(Math, 'Math', true);

  var $$T = _export;
  var trunc = mathTrunc;

  // `Math.trunc` method
  // https://tc39.es/ecma262/#sec-math.trunc
  $$T({ target: 'Math', stat: true }, {
    trunc: trunc
  });

  var uncurryThis$z = functionUncurryThis;

  // `thisNumberValue` abstract operation
  // https://tc39.es/ecma262/#sec-thisnumbervalue
  var thisNumberValue$1 = uncurryThis$z(1.0.valueOf);

  // a string of all valid unicode whitespaces
  var whitespaces$3 = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
    '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

  var uncurryThis$y = functionUncurryThis;
  var requireObjectCoercible$9 = requireObjectCoercible$d;
  var toString$i = toString$o;
  var whitespaces$2 = whitespaces$3;

  var replace$6 = uncurryThis$y(''.replace);
  var ltrim = RegExp('^[' + whitespaces$2 + ']+');
  var rtrim = RegExp('(^|[^' + whitespaces$2 + '])[' + whitespaces$2 + ']+$');

  // `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
  var createMethod$3 = function (TYPE) {
    return function ($this) {
      var string = toString$i(requireObjectCoercible$9($this));
      if (TYPE & 1) string = replace$6(string, ltrim, '');
      if (TYPE & 2) string = replace$6(string, rtrim, '$1');
      return string;
    };
  };

  var stringTrim = {
    // `String.prototype.{ trimLeft, trimStart }` methods
    // https://tc39.es/ecma262/#sec-string.prototype.trimstart
    start: createMethod$3(1),
    // `String.prototype.{ trimRight, trimEnd }` methods
    // https://tc39.es/ecma262/#sec-string.prototype.trimend
    end: createMethod$3(2),
    // `String.prototype.trim` method
    // https://tc39.es/ecma262/#sec-string.prototype.trim
    trim: createMethod$3(3)
  };

  var $$S = _export;
  var IS_PURE$3 = isPure;
  var DESCRIPTORS$k = descriptors;
  var globalThis$v = globalThis_1;
  var path = path$2;
  var uncurryThis$x = functionUncurryThis;
  var isForced$2 = isForced_1;
  var hasOwn$b = hasOwnProperty_1;
  var inheritIfRequired$3 = inheritIfRequired$6;
  var isPrototypeOf$4 = objectIsPrototypeOf;
  var isSymbol$1 = isSymbol$6;
  var toPrimitive$1 = toPrimitive$3;
  var fails$x = fails$Y;
  var getOwnPropertyNames$3 = objectGetOwnPropertyNames.f;
  var getOwnPropertyDescriptor$3 = objectGetOwnPropertyDescriptor.f;
  var defineProperty$3 = objectDefineProperty.f;
  var thisNumberValue = thisNumberValue$1;
  var trim$2 = stringTrim.trim;

  var NUMBER = 'Number';
  var NativeNumber = globalThis$v[NUMBER];
  path[NUMBER];
  var NumberPrototype = NativeNumber.prototype;
  var TypeError$5 = globalThis$v.TypeError;
  var stringSlice$9 = uncurryThis$x(''.slice);
  var charCodeAt$2 = uncurryThis$x(''.charCodeAt);

  // `ToNumeric` abstract operation
  // https://tc39.es/ecma262/#sec-tonumeric
  var toNumeric = function (value) {
    var primValue = toPrimitive$1(value, 'number');
    return typeof primValue == 'bigint' ? primValue : toNumber(primValue);
  };

  // `ToNumber` abstract operation
  // https://tc39.es/ecma262/#sec-tonumber
  var toNumber = function (argument) {
    var it = toPrimitive$1(argument, 'number');
    var first, third, radix, maxCode, digits, length, index, code;
    if (isSymbol$1(it)) throw new TypeError$5('Cannot convert a Symbol value to a number');
    if (typeof it == 'string' && it.length > 2) {
      it = trim$2(it);
      first = charCodeAt$2(it, 0);
      if (first === 43 || first === 45) {
        third = charCodeAt$2(it, 2);
        if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
      } else if (first === 48) {
        switch (charCodeAt$2(it, 1)) {
          // fast equal of /^0b[01]+$/i
          case 66:
          case 98:
            radix = 2;
            maxCode = 49;
            break;
          // fast equal of /^0o[0-7]+$/i
          case 79:
          case 111:
            radix = 8;
            maxCode = 55;
            break;
          default:
            return +it;
        }
        digits = stringSlice$9(it, 2);
        length = digits.length;
        for (index = 0; index < length; index++) {
          code = charCodeAt$2(digits, index);
          // parseInt parses a string to a first unavailable symbol
          // but ToNumber should return NaN if a string contains unavailable symbols
          if (code < 48 || code > maxCode) return NaN;
        } return parseInt(digits, radix);
      }
    } return +it;
  };

  var FORCED$8 = isForced$2(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'));

  var calledWithNew = function (dummy) {
    // includes check on 1..constructor(foo) case
    return isPrototypeOf$4(NumberPrototype, dummy) && fails$x(function () { thisNumberValue(dummy); });
  };

  // `Number` constructor
  // https://tc39.es/ecma262/#sec-number-constructor
  var NumberWrapper = function Number(value) {
    var n = arguments.length < 1 ? 0 : NativeNumber(toNumeric(value));
    return calledWithNew(this) ? inheritIfRequired$3(Object(n), this, NumberWrapper) : n;
  };

  NumberWrapper.prototype = NumberPrototype;
  if (FORCED$8 && !IS_PURE$3) NumberPrototype.constructor = NumberWrapper;

  $$S({ global: true, constructor: true, wrap: true, forced: FORCED$8 }, {
    Number: NumberWrapper
  });

  // Use `internal/copy-constructor-properties` helper in `core-js@4`
  var copyConstructorProperties$1 = function (target, source) {
    for (var keys = DESCRIPTORS$k ? getOwnPropertyNames$3(source) : (
      // ES3:
      'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
      // ES2015 (in case, if modules with ES2015 Number statics required before):
      'EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,' +
      // ESNext
      'fromString,range'
    ).split(','), j = 0, key; keys.length > j; j++) {
      if (hasOwn$b(source, key = keys[j]) && !hasOwn$b(target, key)) {
        defineProperty$3(target, key, getOwnPropertyDescriptor$3(source, key));
      }
    }
  };
  if (FORCED$8 || IS_PURE$3) copyConstructorProperties$1(path[NUMBER], NativeNumber);

  var DESCRIPTORS$j = descriptors;
  var uncurryThis$w = functionUncurryThis;
  var call$p = functionCall;
  var fails$w = fails$Y;
  var objectKeys$1 = objectKeys$4;
  var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
  var propertyIsEnumerableModule = objectPropertyIsEnumerable;
  var toObject$6 = toObject$k;
  var IndexedObject$1 = indexedObject;

  // eslint-disable-next-line es/no-object-assign -- safe
  var $assign = Object.assign;
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  var defineProperty$2 = Object.defineProperty;
  var concat$2 = uncurryThis$w([].concat);

  // `Object.assign` method
  // https://tc39.es/ecma262/#sec-object.assign
  var objectAssign = !$assign || fails$w(function () {
    // should have correct order of operations (Edge bug)
    if (DESCRIPTORS$j && $assign({ b: 1 }, $assign(defineProperty$2({}, 'a', {
      enumerable: true,
      get: function () {
        defineProperty$2(this, 'b', {
          value: 3,
          enumerable: false
        });
      }
    }), { b: 2 })).b !== 1) return true;
    // should work with symbols and should have deterministic property order (V8 bug)
    var A = {};
    var B = {};
    // eslint-disable-next-line es/no-symbol -- safe
    var symbol = Symbol('assign detection');
    var alphabet = 'abcdefghijklmnopqrst';
    A[symbol] = 7;
    alphabet.split('').forEach(function (chr) { B[chr] = chr; });
    return $assign({}, A)[symbol] !== 7 || objectKeys$1($assign({}, B)).join('') !== alphabet;
  }) ? function assign(target, source) { // eslint-disable-line no-unused-vars -- required for `.length`
    var T = toObject$6(target);
    var argumentsLength = arguments.length;
    var index = 1;
    var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
    var propertyIsEnumerable = propertyIsEnumerableModule.f;
    while (argumentsLength > index) {
      var S = IndexedObject$1(arguments[index++]);
      var keys = getOwnPropertySymbols ? concat$2(objectKeys$1(S), getOwnPropertySymbols(S)) : objectKeys$1(S);
      var length = keys.length;
      var j = 0;
      var key;
      while (length > j) {
        key = keys[j++];
        if (!DESCRIPTORS$j || call$p(propertyIsEnumerable, S, key)) T[key] = S[key];
      }
    } return T;
  } : $assign;

  var $$R = _export;
  var assign$1 = objectAssign;

  // `Object.assign` method
  // https://tc39.es/ecma262/#sec-object.assign
  // eslint-disable-next-line es/no-object-assign -- required for testing
  $$R({ target: 'Object', stat: true, arity: 2, forced: Object.assign !== assign$1 }, {
    assign: assign$1
  });

  var $$Q = _export;
  var DESCRIPTORS$i = descriptors;
  var defineProperties = objectDefineProperties.f;

  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  // eslint-disable-next-line es/no-object-defineproperties -- safe
  $$Q({ target: 'Object', stat: true, forced: Object.defineProperties !== defineProperties, sham: !DESCRIPTORS$i }, {
    defineProperties: defineProperties
  });

  var $$P = _export;
  var DESCRIPTORS$h = descriptors;
  var defineProperty$1 = objectDefineProperty.f;

  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  // eslint-disable-next-line es/no-object-defineproperty -- safe
  $$P({ target: 'Object', stat: true, forced: Object.defineProperty !== defineProperty$1, sham: !DESCRIPTORS$h }, {
    defineProperty: defineProperty$1
  });

  var DESCRIPTORS$g = descriptors;
  var fails$v = fails$Y;
  var uncurryThis$v = functionUncurryThis;
  var objectGetPrototypeOf = objectGetPrototypeOf$1;
  var objectKeys = objectKeys$4;
  var toIndexedObject$4 = toIndexedObject$d;
  var $propertyIsEnumerable = objectPropertyIsEnumerable.f;

  var propertyIsEnumerable = uncurryThis$v($propertyIsEnumerable);
  var push$8 = uncurryThis$v([].push);

  // in some IE versions, `propertyIsEnumerable` returns incorrect result on integer keys
  // of `null` prototype objects
  var IE_BUG = DESCRIPTORS$g && fails$v(function () {
    // eslint-disable-next-line es/no-object-create -- safe
    var O = Object.create(null);
    O[2] = 2;
    return !propertyIsEnumerable(O, 2);
  });

  // `Object.{ entries, values }` methods implementation
  var createMethod$2 = function (TO_ENTRIES) {
    return function (it) {
      var O = toIndexedObject$4(it);
      var keys = objectKeys(O);
      var IE_WORKAROUND = IE_BUG && objectGetPrototypeOf(O) === null;
      var length = keys.length;
      var i = 0;
      var result = [];
      var key;
      while (length > i) {
        key = keys[i++];
        if (!DESCRIPTORS$g || (IE_WORKAROUND ? key in O : propertyIsEnumerable(O, key))) {
          push$8(result, TO_ENTRIES ? [key, O[key]] : O[key]);
        }
      }
      return result;
    };
  };

  var objectToArray = {
    // `Object.entries` method
    // https://tc39.es/ecma262/#sec-object.entries
    entries: createMethod$2(true),
    // `Object.values` method
    // https://tc39.es/ecma262/#sec-object.values
    values: createMethod$2(false)
  };

  var $$O = _export;
  var $entries = objectToArray.entries;

  // `Object.entries` method
  // https://tc39.es/ecma262/#sec-object.entries
  $$O({ target: 'Object', stat: true }, {
    entries: function entries(O) {
      return $entries(O);
    }
  });

  var $$N = _export;
  var fails$u = fails$Y;
  var toIndexedObject$3 = toIndexedObject$d;
  var nativeGetOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
  var DESCRIPTORS$f = descriptors;

  var FORCED$7 = !DESCRIPTORS$f || fails$u(function () { nativeGetOwnPropertyDescriptor$1(1); });

  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
  $$N({ target: 'Object', stat: true, forced: FORCED$7, sham: !DESCRIPTORS$f }, {
    getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
      return nativeGetOwnPropertyDescriptor$1(toIndexedObject$3(it), key);
    }
  });

  var $$M = _export;
  var fails$t = fails$Y;
  var getOwnPropertyNames$2 = objectGetOwnPropertyNamesExternal.f;

  // eslint-disable-next-line es/no-object-getownpropertynames -- required for testing
  var FAILS_ON_PRIMITIVES$2 = fails$t(function () { return !Object.getOwnPropertyNames(1); });

  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  $$M({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$2 }, {
    getOwnPropertyNames: getOwnPropertyNames$2
  });

  var $$L = _export;
  var DESCRIPTORS$e = descriptors;
  var ownKeys$1 = ownKeys$3;
  var toIndexedObject$2 = toIndexedObject$d;
  var getOwnPropertyDescriptorModule$2 = objectGetOwnPropertyDescriptor;
  var createProperty$1 = createProperty$6;

  // `Object.getOwnPropertyDescriptors` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
  $$L({ target: 'Object', stat: true, sham: !DESCRIPTORS$e }, {
    getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
      var O = toIndexedObject$2(object);
      var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule$2.f;
      var keys = ownKeys$1(O);
      var result = {};
      var index = 0;
      var key, descriptor;
      while (keys.length > index) {
        descriptor = getOwnPropertyDescriptor(O, key = keys[index++]);
        if (descriptor !== undefined) createProperty$1(result, key, descriptor);
      }
      return result;
    }
  });

  var $$K = _export;
  var toObject$5 = toObject$k;
  var nativeKeys = objectKeys$4;
  var fails$s = fails$Y;

  var FAILS_ON_PRIMITIVES$1 = fails$s(function () { nativeKeys(1); });

  // `Object.keys` method
  // https://tc39.es/ecma262/#sec-object.keys
  $$K({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$1 }, {
    keys: function keys(it) {
      return nativeKeys(toObject$5(it));
    }
  });

  var $$J = _export;
  var fails$r = fails$Y;
  var toObject$4 = toObject$k;
  var nativeGetPrototypeOf = objectGetPrototypeOf$1;
  var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;

  var FAILS_ON_PRIMITIVES = fails$r(function () { nativeGetPrototypeOf(1); });

  // `Object.getPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.getprototypeof
  $$J({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES, sham: !CORRECT_PROTOTYPE_GETTER }, {
    getPrototypeOf: function getPrototypeOf(it) {
      return nativeGetPrototypeOf(toObject$4(it));
    }
  });

  var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport;
  var classof$9 = classof$j;

  // `Object.prototype.toString` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.tostring
  var objectToString = TO_STRING_TAG_SUPPORT$1 ? {}.toString : function toString() {
    return '[object ' + classof$9(this) + ']';
  };

  var TO_STRING_TAG_SUPPORT = toStringTagSupport;
  var defineBuiltIn$b = defineBuiltIn$k;
  var toString$h = objectToString;

  // `Object.prototype.toString` method
  // https://tc39.es/ecma262/#sec-object.prototype.tostring
  if (!TO_STRING_TAG_SUPPORT) {
    defineBuiltIn$b(Object.prototype, 'toString', toString$h, { unsafe: true });
  }

  var $$I = _export;
  var $values = objectToArray.values;

  // `Object.values` method
  // https://tc39.es/ecma262/#sec-object.values
  $$I({ target: 'Object', stat: true }, {
    values: function values(O) {
      return $values(O);
    }
  });

  var globalThis$u = globalThis_1;
  var fails$q = fails$Y;
  var uncurryThis$u = functionUncurryThis;
  var toString$g = toString$o;
  var trim$1 = stringTrim.trim;
  var whitespaces$1 = whitespaces$3;

  var charAt$8 = uncurryThis$u(''.charAt);
  var $parseFloat$1 = globalThis$u.parseFloat;
  var Symbol$2 = globalThis$u.Symbol;
  var ITERATOR$6 = Symbol$2 && Symbol$2.iterator;
  var FORCED$6 = 1 / $parseFloat$1(whitespaces$1 + '-0') !== -Infinity
    // MS Edge 18- broken with boxed symbols
    || (ITERATOR$6 && !fails$q(function () { $parseFloat$1(Object(ITERATOR$6)); }));

  // `parseFloat` method
  // https://tc39.es/ecma262/#sec-parsefloat-string
  var numberParseFloat = FORCED$6 ? function parseFloat(string) {
    var trimmedString = trim$1(toString$g(string));
    var result = $parseFloat$1(trimmedString);
    return result === 0 && charAt$8(trimmedString, 0) === '-' ? -0 : result;
  } : $parseFloat$1;

  var $$H = _export;
  var $parseFloat = numberParseFloat;

  // `parseFloat` method
  // https://tc39.es/ecma262/#sec-parsefloat-string
  $$H({ global: true, forced: parseFloat !== $parseFloat }, {
    parseFloat: $parseFloat
  });

  var globalThis$t = globalThis_1;
  var fails$p = fails$Y;
  var uncurryThis$t = functionUncurryThis;
  var toString$f = toString$o;
  var trim = stringTrim.trim;
  var whitespaces = whitespaces$3;

  var $parseInt$2 = globalThis$t.parseInt;
  var Symbol$1 = globalThis$t.Symbol;
  var ITERATOR$5 = Symbol$1 && Symbol$1.iterator;
  var hex = /^[+-]?0x/i;
  var exec$5 = uncurryThis$t(hex.exec);
  var FORCED$5 = $parseInt$2(whitespaces + '08') !== 8 || $parseInt$2(whitespaces + '0x16') !== 22
    // MS Edge 18- broken with boxed symbols
    || (ITERATOR$5 && !fails$p(function () { $parseInt$2(Object(ITERATOR$5)); }));

  // `parseInt` method
  // https://tc39.es/ecma262/#sec-parseint-string-radix
  var numberParseInt = FORCED$5 ? function parseInt(string, radix) {
    var S = trim(toString$f(string));
    return $parseInt$2(S, (radix >>> 0) || (exec$5(hex, S) ? 16 : 10));
  } : $parseInt$2;

  var $$G = _export;
  var $parseInt$1 = numberParseInt;

  // `parseInt` method
  // https://tc39.es/ecma262/#sec-parseint-string-radix
  $$G({ global: true, forced: parseInt !== $parseInt$1 }, {
    parseInt: $parseInt$1
  });

  var isConstructor = isConstructor$4;
  var tryToString$1 = tryToString$7;

  var $TypeError$b = TypeError;

  // `Assert: IsConstructor(argument) is true`
  var aConstructor$3 = function (argument) {
    if (isConstructor(argument)) return argument;
    throw new $TypeError$b(tryToString$1(argument) + ' is not a constructor');
  };

  var anObject$n = anObject$y;
  var aConstructor$2 = aConstructor$3;
  var isNullOrUndefined$5 = isNullOrUndefined$b;
  var wellKnownSymbol$d = wellKnownSymbol$x;

  var SPECIES$2 = wellKnownSymbol$d('species');

  // `SpeciesConstructor` abstract operation
  // https://tc39.es/ecma262/#sec-speciesconstructor
  var speciesConstructor$4 = function (O, defaultConstructor) {
    var C = anObject$n(O).constructor;
    var S;
    return C === undefined || isNullOrUndefined$5(S = anObject$n(C)[SPECIES$2]) ? defaultConstructor : aConstructor$2(S);
  };

  var $TypeError$a = TypeError;

  var validateArgumentsLength$6 = function (passed, required) {
    if (passed < required) throw new $TypeError$a('Not enough arguments');
    return passed;
  };

  var userAgent$2 = environmentUserAgent;

  // eslint-disable-next-line redos/no-vulnerable -- safe
  var environmentIsIos = /(?:ipad|iphone|ipod).*applewebkit/i.test(userAgent$2);

  var globalThis$s = globalThis_1;
  var apply$5 = functionApply;
  var bind$7 = functionBindContext;
  var isCallable$a = isCallable$v;
  var hasOwn$a = hasOwnProperty_1;
  var fails$o = fails$Y;
  var html = html$2;
  var arraySlice$5 = arraySlice$9;
  var createElement = documentCreateElement$2;
  var validateArgumentsLength$5 = validateArgumentsLength$6;
  var IS_IOS$1 = environmentIsIos;
  var IS_NODE$2 = environmentIsNode;

  var set$1 = globalThis$s.setImmediate;
  var clear = globalThis$s.clearImmediate;
  var process$2 = globalThis$s.process;
  var Dispatch = globalThis$s.Dispatch;
  var Function$1 = globalThis$s.Function;
  var MessageChannel = globalThis$s.MessageChannel;
  var String$1 = globalThis$s.String;
  var counter = 0;
  var queue$2 = {};
  var ONREADYSTATECHANGE = 'onreadystatechange';
  var $location, defer, channel, port;

  fails$o(function () {
    // Deno throws a ReferenceError on `location` access without `--location` flag
    $location = globalThis$s.location;
  });

  var run = function (id) {
    if (hasOwn$a(queue$2, id)) {
      var fn = queue$2[id];
      delete queue$2[id];
      fn();
    }
  };

  var runner = function (id) {
    return function () {
      run(id);
    };
  };

  var eventListener = function (event) {
    run(event.data);
  };

  var globalPostMessageDefer = function (id) {
    // old engines have not location.origin
    globalThis$s.postMessage(String$1(id), $location.protocol + '//' + $location.host);
  };

  // Node.js 0.9+ & IE10+ has setImmediate, otherwise:
  if (!set$1 || !clear) {
    set$1 = function setImmediate(handler) {
      validateArgumentsLength$5(arguments.length, 1);
      var fn = isCallable$a(handler) ? handler : Function$1(handler);
      var args = arraySlice$5(arguments, 1);
      queue$2[++counter] = function () {
        apply$5(fn, undefined, args);
      };
      defer(counter);
      return counter;
    };
    clear = function clearImmediate(id) {
      delete queue$2[id];
    };
    // Node.js 0.8-
    if (IS_NODE$2) {
      defer = function (id) {
        process$2.nextTick(runner(id));
      };
    // Sphere (JS game engine) Dispatch API
    } else if (Dispatch && Dispatch.now) {
      defer = function (id) {
        Dispatch.now(runner(id));
      };
    // Browsers with MessageChannel, includes WebWorkers
    // except iOS - https://github.com/zloirock/core-js/issues/624
    } else if (MessageChannel && !IS_IOS$1) {
      channel = new MessageChannel();
      port = channel.port2;
      channel.port1.onmessage = eventListener;
      defer = bind$7(port.postMessage, port);
    // Browsers with postMessage, skip WebWorkers
    // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
    } else if (
      globalThis$s.addEventListener &&
      isCallable$a(globalThis$s.postMessage) &&
      !globalThis$s.importScripts &&
      $location && $location.protocol !== 'file:' &&
      !fails$o(globalPostMessageDefer)
    ) {
      defer = globalPostMessageDefer;
      globalThis$s.addEventListener('message', eventListener, false);
    // IE8-
    } else if (ONREADYSTATECHANGE in createElement('script')) {
      defer = function (id) {
        html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
          html.removeChild(this);
          run(id);
        };
      };
    // Rest old browsers
    } else {
      defer = function (id) {
        setTimeout(runner(id), 0);
      };
    }
  }

  var task$1 = {
    set: set$1,
    clear: clear
  };

  var globalThis$r = globalThis_1;
  var DESCRIPTORS$d = descriptors;

  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var getOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor;

  // Avoid NodeJS experimental warning
  var safeGetBuiltIn$2 = function (name) {
    if (!DESCRIPTORS$d) return globalThis$r[name];
    var descriptor = getOwnPropertyDescriptor$2(globalThis$r, name);
    return descriptor && descriptor.value;
  };

  var Queue$2 = function () {
    this.head = null;
    this.tail = null;
  };

  Queue$2.prototype = {
    add: function (item) {
      var entry = { item: item, next: null };
      var tail = this.tail;
      if (tail) tail.next = entry;
      else this.head = entry;
      this.tail = entry;
    },
    get: function () {
      var entry = this.head;
      if (entry) {
        var next = this.head = entry.next;
        if (next === null) this.tail = null;
        return entry.item;
      }
    }
  };

  var queue$1 = Queue$2;

  var userAgent$1 = environmentUserAgent;

  var environmentIsIosPebble = /ipad|iphone|ipod/i.test(userAgent$1) && typeof Pebble != 'undefined';

  var userAgent = environmentUserAgent;

  var environmentIsWebosWebkit = /web0s(?!.*chrome)/i.test(userAgent);

  var globalThis$q = globalThis_1;
  var safeGetBuiltIn$1 = safeGetBuiltIn$2;
  var bind$6 = functionBindContext;
  var macrotask = task$1.set;
  var Queue$1 = queue$1;
  var IS_IOS = environmentIsIos;
  var IS_IOS_PEBBLE = environmentIsIosPebble;
  var IS_WEBOS_WEBKIT = environmentIsWebosWebkit;
  var IS_NODE$1 = environmentIsNode;

  var MutationObserver = globalThis$q.MutationObserver || globalThis$q.WebKitMutationObserver;
  var document$2 = globalThis$q.document;
  var process$1 = globalThis$q.process;
  var Promise$1 = globalThis$q.Promise;
  var microtask$2 = safeGetBuiltIn$1('queueMicrotask');
  var notify$1, toggle, node, promise, then;

  // modern engines have queueMicrotask method
  if (!microtask$2) {
    var queue = new Queue$1();

    var flush = function () {
      var parent, fn;
      if (IS_NODE$1 && (parent = process$1.domain)) parent.exit();
      while (fn = queue.get()) try {
        fn();
      } catch (error) {
        if (queue.head) notify$1();
        throw error;
      }
      if (parent) parent.enter();
    };

    // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
    // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898
    if (!IS_IOS && !IS_NODE$1 && !IS_WEBOS_WEBKIT && MutationObserver && document$2) {
      toggle = true;
      node = document$2.createTextNode('');
      new MutationObserver(flush).observe(node, { characterData: true });
      notify$1 = function () {
        node.data = toggle = !toggle;
      };
    // environments with maybe non-completely correct, but existent Promise
    } else if (!IS_IOS_PEBBLE && Promise$1 && Promise$1.resolve) {
      // Promise.resolve without an argument throws an error in LG WebOS 2
      promise = Promise$1.resolve(undefined);
      // workaround of WebKit ~ iOS Safari 10.1 bug
      promise.constructor = Promise$1;
      then = bind$6(promise.then, promise);
      notify$1 = function () {
        then(flush);
      };
    // Node.js without promises
    } else if (IS_NODE$1) {
      notify$1 = function () {
        process$1.nextTick(flush);
      };
    // for other environments - macrotask based on:
    // - setImmediate
    // - MessageChannel
    // - window.postMessage
    // - onreadystatechange
    // - setTimeout
    } else {
      // `webpack` dev server bug on IE global methods - use bind(fn, global)
      macrotask = bind$6(macrotask, globalThis$q);
      notify$1 = function () {
        macrotask(flush);
      };
    }

    microtask$2 = function (fn) {
      if (!queue.head) notify$1();
      queue.add(fn);
    };
  }

  var microtask_1 = microtask$2;

  var hostReportErrors$1 = function (a, b) {
    try {
      // eslint-disable-next-line no-console -- safe
      arguments.length === 1 ? console.error(a) : console.error(a, b);
    } catch (error) { /* empty */ }
  };

  var perform$4 = function (exec) {
    try {
      return { error: false, value: exec() };
    } catch (error) {
      return { error: true, value: error };
    }
  };

  var globalThis$p = globalThis_1;

  var promiseNativeConstructor = globalThis$p.Promise;

  var globalThis$o = globalThis_1;
  var NativePromiseConstructor$4 = promiseNativeConstructor;
  var isCallable$9 = isCallable$v;
  var isForced$1 = isForced_1;
  var inspectSource = inspectSource$3;
  var wellKnownSymbol$c = wellKnownSymbol$x;
  var ENVIRONMENT = environment;
  var V8_VERSION = environmentV8Version;

  NativePromiseConstructor$4 && NativePromiseConstructor$4.prototype;
  var SPECIES$1 = wellKnownSymbol$c('species');
  var SUBCLASSING = false;
  var NATIVE_PROMISE_REJECTION_EVENT$1 = isCallable$9(globalThis$o.PromiseRejectionEvent);

  var FORCED_PROMISE_CONSTRUCTOR$5 = isForced$1('Promise', function () {
    var PROMISE_CONSTRUCTOR_SOURCE = inspectSource(NativePromiseConstructor$4);
    var GLOBAL_CORE_JS_PROMISE = PROMISE_CONSTRUCTOR_SOURCE !== String(NativePromiseConstructor$4);
    // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
    // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
    // We can't detect it synchronously, so just check versions
    if (!GLOBAL_CORE_JS_PROMISE && V8_VERSION === 66) return true;
    // We can't use @@species feature detection in V8 since it causes
    // deoptimization and performance degradation
    // https://github.com/zloirock/core-js/issues/679
    if (!V8_VERSION || V8_VERSION < 51 || !/native code/.test(PROMISE_CONSTRUCTOR_SOURCE)) {
      // Detect correctness of subclassing with @@species support
      var promise = new NativePromiseConstructor$4(function (resolve) { resolve(1); });
      var FakePromise = function (exec) {
        exec(function () { /* empty */ }, function () { /* empty */ });
      };
      var constructor = promise.constructor = {};
      constructor[SPECIES$1] = FakePromise;
      SUBCLASSING = promise.then(function () { /* empty */ }) instanceof FakePromise;
      if (!SUBCLASSING) return true;
    // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    } return !GLOBAL_CORE_JS_PROMISE && (ENVIRONMENT === 'BROWSER' || ENVIRONMENT === 'DENO') && !NATIVE_PROMISE_REJECTION_EVENT$1;
  });

  var promiseConstructorDetection = {
    CONSTRUCTOR: FORCED_PROMISE_CONSTRUCTOR$5,
    REJECTION_EVENT: NATIVE_PROMISE_REJECTION_EVENT$1,
    SUBCLASSING: SUBCLASSING
  };

  var newPromiseCapability$2 = {};

  var aCallable$g = aCallable$n;

  var $TypeError$9 = TypeError;

  var PromiseCapability = function (C) {
    var resolve, reject;
    this.promise = new C(function ($$resolve, $$reject) {
      if (resolve !== undefined || reject !== undefined) throw new $TypeError$9('Bad Promise constructor');
      resolve = $$resolve;
      reject = $$reject;
    });
    this.resolve = aCallable$g(resolve);
    this.reject = aCallable$g(reject);
  };

  // `NewPromiseCapability` abstract operation
  // https://tc39.es/ecma262/#sec-newpromisecapability
  newPromiseCapability$2.f = function (C) {
    return new PromiseCapability(C);
  };

  var $$F = _export;
  var IS_NODE = environmentIsNode;
  var globalThis$n = globalThis_1;
  var call$o = functionCall;
  var defineBuiltIn$a = defineBuiltIn$k;
  var setPrototypeOf$3 = objectSetPrototypeOf;
  var setToStringTag$5 = setToStringTag$d;
  var setSpecies$2 = setSpecies$4;
  var aCallable$f = aCallable$n;
  var isCallable$8 = isCallable$v;
  var isObject$b = isObject$s;
  var anInstance$6 = anInstance$9;
  var speciesConstructor$3 = speciesConstructor$4;
  var task = task$1.set;
  var microtask$1 = microtask_1;
  var hostReportErrors = hostReportErrors$1;
  var perform$3 = perform$4;
  var Queue = queue$1;
  var InternalStateModule$8 = internalState;
  var NativePromiseConstructor$3 = promiseNativeConstructor;
  var PromiseConstructorDetection = promiseConstructorDetection;
  var newPromiseCapabilityModule$4 = newPromiseCapability$2;

  var PROMISE = 'Promise';
  var FORCED_PROMISE_CONSTRUCTOR$4 = PromiseConstructorDetection.CONSTRUCTOR;
  var NATIVE_PROMISE_REJECTION_EVENT = PromiseConstructorDetection.REJECTION_EVENT;
  var NATIVE_PROMISE_SUBCLASSING = PromiseConstructorDetection.SUBCLASSING;
  var getInternalPromiseState = InternalStateModule$8.getterFor(PROMISE);
  var setInternalState$7 = InternalStateModule$8.set;
  var NativePromisePrototype$2 = NativePromiseConstructor$3 && NativePromiseConstructor$3.prototype;
  var PromiseConstructor = NativePromiseConstructor$3;
  var PromisePrototype = NativePromisePrototype$2;
  var TypeError$4 = globalThis$n.TypeError;
  var document$1 = globalThis$n.document;
  var process = globalThis$n.process;
  var newPromiseCapability$1 = newPromiseCapabilityModule$4.f;
  var newGenericPromiseCapability = newPromiseCapability$1;

  var DISPATCH_EVENT = !!(document$1 && document$1.createEvent && globalThis$n.dispatchEvent);
  var UNHANDLED_REJECTION = 'unhandledrejection';
  var REJECTION_HANDLED = 'rejectionhandled';
  var PENDING = 0;
  var FULFILLED = 1;
  var REJECTED = 2;
  var HANDLED = 1;
  var UNHANDLED = 2;

  var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

  // helpers
  var isThenable = function (it) {
    var then;
    return isObject$b(it) && isCallable$8(then = it.then) ? then : false;
  };

  var callReaction = function (reaction, state) {
    var value = state.value;
    var ok = state.state === FULFILLED;
    var handler = ok ? reaction.ok : reaction.fail;
    var resolve = reaction.resolve;
    var reject = reaction.reject;
    var domain = reaction.domain;
    var result, then, exited;
    try {
      if (handler) {
        if (!ok) {
          if (state.rejection === UNHANDLED) onHandleUnhandled(state);
          state.rejection = HANDLED;
        }
        if (handler === true) result = value;
        else {
          if (domain) domain.enter();
          result = handler(value); // can throw
          if (domain) {
            domain.exit();
            exited = true;
          }
        }
        if (result === reaction.promise) {
          reject(new TypeError$4('Promise-chain cycle'));
        } else if (then = isThenable(result)) {
          call$o(then, result, resolve, reject);
        } else resolve(result);
      } else reject(value);
    } catch (error) {
      if (domain && !exited) domain.exit();
      reject(error);
    }
  };

  var notify = function (state, isReject) {
    if (state.notified) return;
    state.notified = true;
    microtask$1(function () {
      var reactions = state.reactions;
      var reaction;
      while (reaction = reactions.get()) {
        callReaction(reaction, state);
      }
      state.notified = false;
      if (isReject && !state.rejection) onUnhandled(state);
    });
  };

  var dispatchEvent = function (name, promise, reason) {
    var event, handler;
    if (DISPATCH_EVENT) {
      event = document$1.createEvent('Event');
      event.promise = promise;
      event.reason = reason;
      event.initEvent(name, false, true);
      globalThis$n.dispatchEvent(event);
    } else event = { promise: promise, reason: reason };
    if (!NATIVE_PROMISE_REJECTION_EVENT && (handler = globalThis$n['on' + name])) handler(event);
    else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
  };

  var onUnhandled = function (state) {
    call$o(task, globalThis$n, function () {
      var promise = state.facade;
      var value = state.value;
      var IS_UNHANDLED = isUnhandled(state);
      var result;
      if (IS_UNHANDLED) {
        result = perform$3(function () {
          if (IS_NODE) {
            process.emit('unhandledRejection', value, promise);
          } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
        });
        // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
        state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED;
        if (result.error) throw result.value;
      }
    });
  };

  var isUnhandled = function (state) {
    return state.rejection !== HANDLED && !state.parent;
  };

  var onHandleUnhandled = function (state) {
    call$o(task, globalThis$n, function () {
      var promise = state.facade;
      if (IS_NODE) {
        process.emit('rejectionHandled', promise);
      } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
    });
  };

  var bind$5 = function (fn, state, unwrap) {
    return function (value) {
      fn(state, value, unwrap);
    };
  };

  var internalReject = function (state, value, unwrap) {
    if (state.done) return;
    state.done = true;
    if (unwrap) state = unwrap;
    state.value = value;
    state.state = REJECTED;
    notify(state, true);
  };

  var internalResolve = function (state, value, unwrap) {
    if (state.done) return;
    state.done = true;
    if (unwrap) state = unwrap;
    try {
      if (state.facade === value) throw new TypeError$4("Promise can't be resolved itself");
      var then = isThenable(value);
      if (then) {
        microtask$1(function () {
          var wrapper = { done: false };
          try {
            call$o(then, value,
              bind$5(internalResolve, wrapper, state),
              bind$5(internalReject, wrapper, state)
            );
          } catch (error) {
            internalReject(wrapper, error, state);
          }
        });
      } else {
        state.value = value;
        state.state = FULFILLED;
        notify(state, false);
      }
    } catch (error) {
      internalReject({ done: false }, error, state);
    }
  };

  // constructor polyfill
  if (FORCED_PROMISE_CONSTRUCTOR$4) {
    // 25.4.3.1 Promise(executor)
    PromiseConstructor = function Promise(executor) {
      anInstance$6(this, PromisePrototype);
      aCallable$f(executor);
      call$o(Internal, this);
      var state = getInternalPromiseState(this);
      try {
        executor(bind$5(internalResolve, state), bind$5(internalReject, state));
      } catch (error) {
        internalReject(state, error);
      }
    };

    PromisePrototype = PromiseConstructor.prototype;

    // eslint-disable-next-line no-unused-vars -- required for `.length`
    Internal = function Promise(executor) {
      setInternalState$7(this, {
        type: PROMISE,
        done: false,
        notified: false,
        parent: false,
        reactions: new Queue(),
        rejection: false,
        state: PENDING,
        value: null
      });
    };

    // `Promise.prototype.then` method
    // https://tc39.es/ecma262/#sec-promise.prototype.then
    Internal.prototype = defineBuiltIn$a(PromisePrototype, 'then', function then(onFulfilled, onRejected) {
      var state = getInternalPromiseState(this);
      var reaction = newPromiseCapability$1(speciesConstructor$3(this, PromiseConstructor));
      state.parent = true;
      reaction.ok = isCallable$8(onFulfilled) ? onFulfilled : true;
      reaction.fail = isCallable$8(onRejected) && onRejected;
      reaction.domain = IS_NODE ? process.domain : undefined;
      if (state.state === PENDING) state.reactions.add(reaction);
      else microtask$1(function () {
        callReaction(reaction, state);
      });
      return reaction.promise;
    });

    OwnPromiseCapability = function () {
      var promise = new Internal();
      var state = getInternalPromiseState(promise);
      this.promise = promise;
      this.resolve = bind$5(internalResolve, state);
      this.reject = bind$5(internalReject, state);
    };

    newPromiseCapabilityModule$4.f = newPromiseCapability$1 = function (C) {
      return C === PromiseConstructor || C === PromiseWrapper
        ? new OwnPromiseCapability(C)
        : newGenericPromiseCapability(C);
    };

    if (isCallable$8(NativePromiseConstructor$3) && NativePromisePrototype$2 !== Object.prototype) {
      nativeThen = NativePromisePrototype$2.then;

      if (!NATIVE_PROMISE_SUBCLASSING) {
        // make `Promise#then` return a polyfilled `Promise` for native promise-based APIs
        defineBuiltIn$a(NativePromisePrototype$2, 'then', function then(onFulfilled, onRejected) {
          var that = this;
          return new PromiseConstructor(function (resolve, reject) {
            call$o(nativeThen, that, resolve, reject);
          }).then(onFulfilled, onRejected);
        // https://github.com/zloirock/core-js/issues/640
        }, { unsafe: true });
      }

      // make `.constructor === Promise` work for native promise-based APIs
      try {
        delete NativePromisePrototype$2.constructor;
      } catch (error) { /* empty */ }

      // make `instanceof Promise` work for native promise-based APIs
      if (setPrototypeOf$3) {
        setPrototypeOf$3(NativePromisePrototype$2, PromisePrototype);
      }
    }
  }

  $$F({ global: true, constructor: true, wrap: true, forced: FORCED_PROMISE_CONSTRUCTOR$4 }, {
    Promise: PromiseConstructor
  });

  setToStringTag$5(PromiseConstructor, PROMISE, false);
  setSpecies$2(PROMISE);

  var NativePromiseConstructor$2 = promiseNativeConstructor;
  var checkCorrectnessOfIteration$1 = checkCorrectnessOfIteration$4;
  var FORCED_PROMISE_CONSTRUCTOR$3 = promiseConstructorDetection.CONSTRUCTOR;

  var promiseStaticsIncorrectIteration = FORCED_PROMISE_CONSTRUCTOR$3 || !checkCorrectnessOfIteration$1(function (iterable) {
    NativePromiseConstructor$2.all(iterable).then(undefined, function () { /* empty */ });
  });

  var $$E = _export;
  var call$n = functionCall;
  var aCallable$e = aCallable$n;
  var newPromiseCapabilityModule$3 = newPromiseCapability$2;
  var perform$2 = perform$4;
  var iterate$b = iterate$e;
  var PROMISE_STATICS_INCORRECT_ITERATION$2 = promiseStaticsIncorrectIteration;

  // `Promise.all` method
  // https://tc39.es/ecma262/#sec-promise.all
  $$E({ target: 'Promise', stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION$2 }, {
    all: function all(iterable) {
      var C = this;
      var capability = newPromiseCapabilityModule$3.f(C);
      var resolve = capability.resolve;
      var reject = capability.reject;
      var result = perform$2(function () {
        var $promiseResolve = aCallable$e(C.resolve);
        var values = [];
        var counter = 0;
        var remaining = 1;
        iterate$b(iterable, function (promise) {
          var index = counter++;
          var alreadyCalled = false;
          remaining++;
          call$n($promiseResolve, C, promise).then(function (value) {
            if (alreadyCalled) return;
            alreadyCalled = true;
            values[index] = value;
            --remaining || resolve(values);
          }, reject);
        });
        --remaining || resolve(values);
      });
      if (result.error) reject(result.value);
      return capability.promise;
    }
  });

  var $$D = _export;
  var FORCED_PROMISE_CONSTRUCTOR$2 = promiseConstructorDetection.CONSTRUCTOR;
  var NativePromiseConstructor$1 = promiseNativeConstructor;
  var getBuiltIn$5 = getBuiltIn$g;
  var isCallable$7 = isCallable$v;
  var defineBuiltIn$9 = defineBuiltIn$k;

  var NativePromisePrototype$1 = NativePromiseConstructor$1 && NativePromiseConstructor$1.prototype;

  // `Promise.prototype.catch` method
  // https://tc39.es/ecma262/#sec-promise.prototype.catch
  $$D({ target: 'Promise', proto: true, forced: FORCED_PROMISE_CONSTRUCTOR$2, real: true }, {
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });

  // makes sure that native promise-based APIs `Promise#catch` properly works with patched `Promise#then`
  if (isCallable$7(NativePromiseConstructor$1)) {
    var method$1 = getBuiltIn$5('Promise').prototype['catch'];
    if (NativePromisePrototype$1['catch'] !== method$1) {
      defineBuiltIn$9(NativePromisePrototype$1, 'catch', method$1, { unsafe: true });
    }
  }

  var $$C = _export;
  var call$m = functionCall;
  var aCallable$d = aCallable$n;
  var newPromiseCapabilityModule$2 = newPromiseCapability$2;
  var perform$1 = perform$4;
  var iterate$a = iterate$e;
  var PROMISE_STATICS_INCORRECT_ITERATION$1 = promiseStaticsIncorrectIteration;

  // `Promise.race` method
  // https://tc39.es/ecma262/#sec-promise.race
  $$C({ target: 'Promise', stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION$1 }, {
    race: function race(iterable) {
      var C = this;
      var capability = newPromiseCapabilityModule$2.f(C);
      var reject = capability.reject;
      var result = perform$1(function () {
        var $promiseResolve = aCallable$d(C.resolve);
        iterate$a(iterable, function (promise) {
          call$m($promiseResolve, C, promise).then(capability.resolve, reject);
        });
      });
      if (result.error) reject(result.value);
      return capability.promise;
    }
  });

  var $$B = _export;
  var newPromiseCapabilityModule$1 = newPromiseCapability$2;
  var FORCED_PROMISE_CONSTRUCTOR$1 = promiseConstructorDetection.CONSTRUCTOR;

  // `Promise.reject` method
  // https://tc39.es/ecma262/#sec-promise.reject
  $$B({ target: 'Promise', stat: true, forced: FORCED_PROMISE_CONSTRUCTOR$1 }, {
    reject: function reject(r) {
      var capability = newPromiseCapabilityModule$1.f(this);
      var capabilityReject = capability.reject;
      capabilityReject(r);
      return capability.promise;
    }
  });

  var anObject$m = anObject$y;
  var isObject$a = isObject$s;
  var newPromiseCapability = newPromiseCapability$2;

  var promiseResolve$2 = function (C, x) {
    anObject$m(C);
    if (isObject$a(x) && x.constructor === C) return x;
    var promiseCapability = newPromiseCapability.f(C);
    var resolve = promiseCapability.resolve;
    resolve(x);
    return promiseCapability.promise;
  };

  var $$A = _export;
  var getBuiltIn$4 = getBuiltIn$g;
  var FORCED_PROMISE_CONSTRUCTOR = promiseConstructorDetection.CONSTRUCTOR;
  var promiseResolve$1 = promiseResolve$2;

  getBuiltIn$4('Promise');

  // `Promise.resolve` method
  // https://tc39.es/ecma262/#sec-promise.resolve
  $$A({ target: 'Promise', stat: true, forced: FORCED_PROMISE_CONSTRUCTOR }, {
    resolve: function resolve(x) {
      return promiseResolve$1(this, x);
    }
  });

  var $$z = _export;
  var call$l = functionCall;
  var aCallable$c = aCallable$n;
  var newPromiseCapabilityModule = newPromiseCapability$2;
  var perform = perform$4;
  var iterate$9 = iterate$e;
  var PROMISE_STATICS_INCORRECT_ITERATION = promiseStaticsIncorrectIteration;

  // `Promise.allSettled` method
  // https://tc39.es/ecma262/#sec-promise.allsettled
  $$z({ target: 'Promise', stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION }, {
    allSettled: function allSettled(iterable) {
      var C = this;
      var capability = newPromiseCapabilityModule.f(C);
      var resolve = capability.resolve;
      var reject = capability.reject;
      var result = perform(function () {
        var promiseResolve = aCallable$c(C.resolve);
        var values = [];
        var counter = 0;
        var remaining = 1;
        iterate$9(iterable, function (promise) {
          var index = counter++;
          var alreadyCalled = false;
          remaining++;
          call$l(promiseResolve, C, promise).then(function (value) {
            if (alreadyCalled) return;
            alreadyCalled = true;
            values[index] = { status: 'fulfilled', value: value };
            --remaining || resolve(values);
          }, function (error) {
            if (alreadyCalled) return;
            alreadyCalled = true;
            values[index] = { status: 'rejected', reason: error };
            --remaining || resolve(values);
          });
        });
        --remaining || resolve(values);
      });
      if (result.error) reject(result.value);
      return capability.promise;
    }
  });

  var $$y = _export;
  var NativePromiseConstructor = promiseNativeConstructor;
  var fails$n = fails$Y;
  var getBuiltIn$3 = getBuiltIn$g;
  var isCallable$6 = isCallable$v;
  var speciesConstructor$2 = speciesConstructor$4;
  var promiseResolve = promiseResolve$2;
  var defineBuiltIn$8 = defineBuiltIn$k;

  var NativePromisePrototype = NativePromiseConstructor && NativePromiseConstructor.prototype;

  // Safari bug https://bugs.webkit.org/show_bug.cgi?id=200829
  var NON_GENERIC = !!NativePromiseConstructor && fails$n(function () {
    // eslint-disable-next-line unicorn/no-thenable -- required for testing
    NativePromisePrototype['finally'].call({ then: function () { /* empty */ } }, function () { /* empty */ });
  });

  // `Promise.prototype.finally` method
  // https://tc39.es/ecma262/#sec-promise.prototype.finally
  $$y({ target: 'Promise', proto: true, real: true, forced: NON_GENERIC }, {
    'finally': function (onFinally) {
      var C = speciesConstructor$2(this, getBuiltIn$3('Promise'));
      var isFunction = isCallable$6(onFinally);
      return this.then(
        isFunction ? function (x) {
          return promiseResolve(C, onFinally()).then(function () { return x; });
        } : onFinally,
        isFunction ? function (e) {
          return promiseResolve(C, onFinally()).then(function () { throw e; });
        } : onFinally
      );
    }
  });

  // makes sure that native promise-based APIs `Promise#finally` properly works with patched `Promise#then`
  if (isCallable$6(NativePromiseConstructor)) {
    var method = getBuiltIn$3('Promise').prototype['finally'];
    if (NativePromisePrototype['finally'] !== method) {
      defineBuiltIn$8(NativePromisePrototype, 'finally', method, { unsafe: true });
    }
  }

  var $$x = _export;
  var ownKeys = ownKeys$3;

  // `Reflect.ownKeys` method
  // https://tc39.es/ecma262/#sec-reflect.ownkeys
  $$x({ target: 'Reflect', stat: true }, {
    ownKeys: ownKeys
  });

  var hasOwn$9 = hasOwnProperty_1;

  var isDataDescriptor$1 = function (descriptor) {
    return descriptor !== undefined && (hasOwn$9(descriptor, 'value') || hasOwn$9(descriptor, 'writable'));
  };

  var $$w = _export;
  var call$k = functionCall;
  var isObject$9 = isObject$s;
  var anObject$l = anObject$y;
  var isDataDescriptor = isDataDescriptor$1;
  var getOwnPropertyDescriptorModule$1 = objectGetOwnPropertyDescriptor;
  var getPrototypeOf$3 = objectGetPrototypeOf$1;

  // `Reflect.get` method
  // https://tc39.es/ecma262/#sec-reflect.get
  function get$1(target, propertyKey /* , receiver */) {
    var receiver = arguments.length < 3 ? target : arguments[2];
    var descriptor, prototype;
    if (anObject$l(target) === receiver) return target[propertyKey];
    descriptor = getOwnPropertyDescriptorModule$1.f(target, propertyKey);
    if (descriptor) return isDataDescriptor(descriptor)
      ? descriptor.value
      : descriptor.get === undefined ? undefined : call$k(descriptor.get, receiver);
    if (isObject$9(prototype = getPrototypeOf$3(target))) return get$1(prototype, propertyKey, receiver);
  }

  $$w({ target: 'Reflect', stat: true }, {
    get: get$1
  });

  var $$v = _export;
  var globalThis$m = globalThis_1;
  var setToStringTag$4 = setToStringTag$d;

  $$v({ global: true }, { Reflect: {} });

  // Reflect[@@toStringTag] property
  // https://tc39.es/ecma262/#sec-reflect-@@tostringtag
  setToStringTag$4(globalThis$m.Reflect, 'Reflect', true);

  var isObject$8 = isObject$s;
  var classof$8 = classofRaw$2;
  var wellKnownSymbol$b = wellKnownSymbol$x;

  var MATCH$2 = wellKnownSymbol$b('match');

  // `IsRegExp` abstract operation
  // https://tc39.es/ecma262/#sec-isregexp
  var isRegexp = function (it) {
    var isRegExp;
    return isObject$8(it) && ((isRegExp = it[MATCH$2]) !== undefined ? !!isRegExp : classof$8(it) === 'RegExp');
  };

  var anObject$k = anObject$y;

  // `RegExp.prototype.flags` getter implementation
  // https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
  var regexpFlags$1 = function () {
    var that = anObject$k(this);
    var result = '';
    if (that.hasIndices) result += 'd';
    if (that.global) result += 'g';
    if (that.ignoreCase) result += 'i';
    if (that.multiline) result += 'm';
    if (that.dotAll) result += 's';
    if (that.unicode) result += 'u';
    if (that.unicodeSets) result += 'v';
    if (that.sticky) result += 'y';
    return result;
  };

  var call$j = functionCall;
  var hasOwn$8 = hasOwnProperty_1;
  var isPrototypeOf$3 = objectIsPrototypeOf;
  var regExpFlags = regexpFlags$1;

  var RegExpPrototype$5 = RegExp.prototype;

  var regexpGetFlags = function (R) {
    var flags = R.flags;
    return flags === undefined && !('flags' in RegExpPrototype$5) && !hasOwn$8(R, 'flags') && isPrototypeOf$3(RegExpPrototype$5, R)
      ? call$j(regExpFlags, R) : flags;
  };

  var fails$m = fails$Y;
  var globalThis$l = globalThis_1;

  // babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
  var $RegExp$2 = globalThis$l.RegExp;

  var UNSUPPORTED_Y$3 = fails$m(function () {
    var re = $RegExp$2('a', 'y');
    re.lastIndex = 2;
    return re.exec('abcd') !== null;
  });

  // UC Browser bug
  // https://github.com/zloirock/core-js/issues/1008
  var MISSED_STICKY$2 = UNSUPPORTED_Y$3 || fails$m(function () {
    return !$RegExp$2('a', 'y').sticky;
  });

  var BROKEN_CARET = UNSUPPORTED_Y$3 || fails$m(function () {
    // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
    var re = $RegExp$2('^r', 'gy');
    re.lastIndex = 2;
    return re.exec('str') !== null;
  });

  var regexpStickyHelpers = {
    BROKEN_CARET: BROKEN_CARET,
    MISSED_STICKY: MISSED_STICKY$2,
    UNSUPPORTED_Y: UNSUPPORTED_Y$3
  };

  var fails$l = fails$Y;
  var globalThis$k = globalThis_1;

  // babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
  var $RegExp$1 = globalThis$k.RegExp;

  var regexpUnsupportedDotAll = fails$l(function () {
    var re = $RegExp$1('.', 's');
    return !(re.dotAll && re.test('\n') && re.flags === 's');
  });

  var fails$k = fails$Y;
  var globalThis$j = globalThis_1;

  // babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError
  var $RegExp = globalThis$j.RegExp;

  var regexpUnsupportedNcg = fails$k(function () {
    var re = $RegExp('(?<a>b)', 'g');
    return re.exec('b').groups.a !== 'b' ||
      'b'.replace(re, '$<a>c') !== 'bc';
  });

  var DESCRIPTORS$c = descriptors;
  var globalThis$i = globalThis_1;
  var uncurryThis$s = functionUncurryThis;
  var isForced = isForced_1;
  var inheritIfRequired$2 = inheritIfRequired$6;
  var createNonEnumerableProperty$7 = createNonEnumerableProperty$e;
  var create$5 = objectCreate;
  var getOwnPropertyNames$1 = objectGetOwnPropertyNames.f;
  var isPrototypeOf$2 = objectIsPrototypeOf;
  var isRegExp$1 = isRegexp;
  var toString$e = toString$o;
  var getRegExpFlags$1 = regexpGetFlags;
  var stickyHelpers$2 = regexpStickyHelpers;
  var proxyAccessor = proxyAccessor$2;
  var defineBuiltIn$7 = defineBuiltIn$k;
  var fails$j = fails$Y;
  var hasOwn$7 = hasOwnProperty_1;
  var enforceInternalState$3 = internalState.enforce;
  var setSpecies$1 = setSpecies$4;
  var wellKnownSymbol$a = wellKnownSymbol$x;
  var UNSUPPORTED_DOT_ALL$2 = regexpUnsupportedDotAll;
  var UNSUPPORTED_NCG$1 = regexpUnsupportedNcg;

  var MATCH$1 = wellKnownSymbol$a('match');
  var NativeRegExp = globalThis$i.RegExp;
  var RegExpPrototype$4 = NativeRegExp.prototype;
  var SyntaxError = globalThis$i.SyntaxError;
  var exec$4 = uncurryThis$s(RegExpPrototype$4.exec);
  var charAt$7 = uncurryThis$s(''.charAt);
  var replace$5 = uncurryThis$s(''.replace);
  var stringIndexOf$2 = uncurryThis$s(''.indexOf);
  var stringSlice$8 = uncurryThis$s(''.slice);
  // TODO: Use only proper RegExpIdentifierName
  var IS_NCG = /^\?<[^\s\d!#%&*+<=>@^][^\s!#%&*+<=>@^]*>/;
  var re1 = /a/g;
  var re2 = /a/g;

  // "new" should create a new object, old webkit bug
  var CORRECT_NEW = new NativeRegExp(re1) !== re1;

  var MISSED_STICKY$1 = stickyHelpers$2.MISSED_STICKY;
  var UNSUPPORTED_Y$2 = stickyHelpers$2.UNSUPPORTED_Y;

  var BASE_FORCED = DESCRIPTORS$c &&
    (!CORRECT_NEW || MISSED_STICKY$1 || UNSUPPORTED_DOT_ALL$2 || UNSUPPORTED_NCG$1 || fails$j(function () {
      re2[MATCH$1] = false;
      // RegExp constructor can alter flags and IsRegExp works correct with @@match
      // eslint-disable-next-line sonar/inconsistent-function-call -- required for testing
      return NativeRegExp(re1) !== re1 || NativeRegExp(re2) === re2 || String(NativeRegExp(re1, 'i')) !== '/a/i';
    }));

  var handleDotAll = function (string) {
    var length = string.length;
    var index = 0;
    var result = '';
    var brackets = false;
    var chr;
    for (; index <= length; index++) {
      chr = charAt$7(string, index);
      if (chr === '\\') {
        result += chr + charAt$7(string, ++index);
        continue;
      }
      if (!brackets && chr === '.') {
        result += '[\\s\\S]';
      } else {
        if (chr === '[') {
          brackets = true;
        } else if (chr === ']') {
          brackets = false;
        } result += chr;
      }
    } return result;
  };

  var handleNCG = function (string) {
    var length = string.length;
    var index = 0;
    var result = '';
    var named = [];
    var names = create$5(null);
    var brackets = false;
    var ncg = false;
    var groupid = 0;
    var groupname = '';
    var chr;
    for (; index <= length; index++) {
      chr = charAt$7(string, index);
      if (chr === '\\') {
        chr += charAt$7(string, ++index);
      } else if (chr === ']') {
        brackets = false;
      } else if (!brackets) switch (true) {
        case chr === '[':
          brackets = true;
          break;
        case chr === '(':
          result += chr;
          // ignore non-capturing groups
          if (stringSlice$8(string, index + 1, index + 3) === '?:') {
            continue;
          }
          if (exec$4(IS_NCG, stringSlice$8(string, index + 1))) {
            index += 2;
            ncg = true;
          }
          groupid++;
          continue;
        case chr === '>' && ncg:
          if (groupname === '' || hasOwn$7(names, groupname)) {
            throw new SyntaxError('Invalid capture group name');
          }
          names[groupname] = true;
          named[named.length] = [groupname, groupid];
          ncg = false;
          groupname = '';
          continue;
      }
      if (ncg) groupname += chr;
      else result += chr;
    } return [result, named];
  };

  // `RegExp` constructor
  // https://tc39.es/ecma262/#sec-regexp-constructor
  if (isForced('RegExp', BASE_FORCED)) {
    var RegExpWrapper = function RegExp(pattern, flags) {
      var thisIsRegExp = isPrototypeOf$2(RegExpPrototype$4, this);
      var patternIsRegExp = isRegExp$1(pattern);
      var flagsAreUndefined = flags === undefined;
      var groups = [];
      var rawPattern = pattern;
      var rawFlags, dotAll, sticky, handled, result, state;

      if (!thisIsRegExp && patternIsRegExp && flagsAreUndefined && pattern.constructor === RegExpWrapper) {
        return pattern;
      }

      if (patternIsRegExp || isPrototypeOf$2(RegExpPrototype$4, pattern)) {
        pattern = pattern.source;
        if (flagsAreUndefined) flags = getRegExpFlags$1(rawPattern);
      }

      pattern = pattern === undefined ? '' : toString$e(pattern);
      flags = flags === undefined ? '' : toString$e(flags);
      rawPattern = pattern;

      if (UNSUPPORTED_DOT_ALL$2 && 'dotAll' in re1) {
        dotAll = !!flags && stringIndexOf$2(flags, 's') > -1;
        if (dotAll) flags = replace$5(flags, /s/g, '');
      }

      rawFlags = flags;

      if (MISSED_STICKY$1 && 'sticky' in re1) {
        sticky = !!flags && stringIndexOf$2(flags, 'y') > -1;
        if (sticky && UNSUPPORTED_Y$2) flags = replace$5(flags, /y/g, '');
      }

      if (UNSUPPORTED_NCG$1) {
        handled = handleNCG(pattern);
        pattern = handled[0];
        groups = handled[1];
      }

      result = inheritIfRequired$2(NativeRegExp(pattern, flags), thisIsRegExp ? this : RegExpPrototype$4, RegExpWrapper);

      if (dotAll || sticky || groups.length) {
        state = enforceInternalState$3(result);
        if (dotAll) {
          state.dotAll = true;
          state.raw = RegExpWrapper(handleDotAll(pattern), rawFlags);
        }
        if (sticky) state.sticky = true;
        if (groups.length) state.groups = groups;
      }

      if (pattern !== rawPattern) try {
        // fails in old engines, but we have no alternatives for unsupported regex syntax
        createNonEnumerableProperty$7(result, 'source', rawPattern === '' ? '(?:)' : rawPattern);
      } catch (error) { /* empty */ }

      return result;
    };

    for (var keys$1 = getOwnPropertyNames$1(NativeRegExp), index = 0; keys$1.length > index;) {
      proxyAccessor(RegExpWrapper, NativeRegExp, keys$1[index++]);
    }

    RegExpPrototype$4.constructor = RegExpWrapper;
    RegExpWrapper.prototype = RegExpPrototype$4;
    defineBuiltIn$7(globalThis$i, 'RegExp', RegExpWrapper, { constructor: true });
  }

  // https://tc39.es/ecma262/#sec-get-regexp-@@species
  setSpecies$1('RegExp');

  var DESCRIPTORS$b = descriptors;
  var UNSUPPORTED_DOT_ALL$1 = regexpUnsupportedDotAll;
  var classof$7 = classofRaw$2;
  var defineBuiltInAccessor$9 = defineBuiltInAccessor$f;
  var getInternalState$5 = internalState.get;

  var RegExpPrototype$3 = RegExp.prototype;
  var $TypeError$8 = TypeError;

  // `RegExp.prototype.dotAll` getter
  // https://tc39.es/ecma262/#sec-get-regexp.prototype.dotall
  if (DESCRIPTORS$b && UNSUPPORTED_DOT_ALL$1) {
    defineBuiltInAccessor$9(RegExpPrototype$3, 'dotAll', {
      configurable: true,
      get: function dotAll() {
        if (this === RegExpPrototype$3) return;
        // We can't use InternalStateModule.getterFor because
        // we don't add metadata for regexps created by a literal.
        if (classof$7(this) === 'RegExp') {
          return !!getInternalState$5(this).dotAll;
        }
        throw new $TypeError$8('Incompatible receiver, RegExp required');
      }
    });
  }

  var uncurryThis$r = functionUncurryThis;
  var aCallable$b = aCallable$n;
  var isObject$7 = isObject$s;
  var hasOwn$6 = hasOwnProperty_1;
  var arraySlice$4 = arraySlice$9;
  var NATIVE_BIND = functionBindNative;

  var $Function = Function;
  var concat$1 = uncurryThis$r([].concat);
  var join$5 = uncurryThis$r([].join);
  var factories = {};

  var construct = function (C, argsLength, args) {
    if (!hasOwn$6(factories, argsLength)) {
      var list = [];
      var i = 0;
      for (; i < argsLength; i++) list[i] = 'a[' + i + ']';
      factories[argsLength] = $Function('C,a', 'return new C(' + join$5(list, ',') + ')');
    } return factories[argsLength](C, args);
  };

  // `Function.prototype.bind` method implementation
  // https://tc39.es/ecma262/#sec-function.prototype.bind
  // eslint-disable-next-line es/no-function-prototype-bind -- detection
  var functionBind = NATIVE_BIND ? $Function.bind : function bind(that /* , ...args */) {
    var F = aCallable$b(this);
    var Prototype = F.prototype;
    var partArgs = arraySlice$4(arguments, 1);
    var boundFunction = function bound(/* args... */) {
      var args = concat$1(partArgs, arraySlice$4(arguments));
      return this instanceof boundFunction ? construct(F, args.length, args) : F.apply(that, args);
    };
    if (isObject$7(Prototype)) boundFunction.prototype = Prototype;
    return boundFunction;
  };

  var $$u = _export;
  var getBuiltIn$2 = getBuiltIn$g;
  var apply$4 = functionApply;
  var bind$4 = functionBind;
  var aConstructor$1 = aConstructor$3;
  var anObject$j = anObject$y;
  var isObject$6 = isObject$s;
  var create$4 = objectCreate;
  var fails$i = fails$Y;

  var nativeConstruct = getBuiltIn$2('Reflect', 'construct');
  var ObjectPrototype$2 = Object.prototype;
  var push$7 = [].push;

  // `Reflect.construct` method
  // https://tc39.es/ecma262/#sec-reflect.construct
  // MS Edge supports only 2 arguments and argumentsList argument is optional
  // FF Nightly sets third argument as `new.target`, but does not create `this` from it
  var NEW_TARGET_BUG = fails$i(function () {
    function F() { /* empty */ }
    return !(nativeConstruct(function () { /* empty */ }, [], F) instanceof F);
  });

  var ARGS_BUG = !fails$i(function () {
    nativeConstruct(function () { /* empty */ });
  });

  var FORCED$4 = NEW_TARGET_BUG || ARGS_BUG;

  $$u({ target: 'Reflect', stat: true, forced: FORCED$4, sham: FORCED$4 }, {
    construct: function construct(Target, args /* , newTarget */) {
      aConstructor$1(Target);
      anObject$j(args);
      var newTarget = arguments.length < 3 ? Target : aConstructor$1(arguments[2]);
      if (ARGS_BUG && !NEW_TARGET_BUG) return nativeConstruct(Target, args, newTarget);
      if (Target === newTarget) {
        // w/o altered newTarget, optimization for 0-4 arguments
        switch (args.length) {
          case 0: return new Target();
          case 1: return new Target(args[0]);
          case 2: return new Target(args[0], args[1]);
          case 3: return new Target(args[0], args[1], args[2]);
          case 4: return new Target(args[0], args[1], args[2], args[3]);
        }
        // w/o altered newTarget, lot of arguments case
        var $args = [null];
        apply$4(push$7, $args, args);
        return new (apply$4(bind$4, Target, $args))();
      }
      // with altered newTarget, not support built-in constructors
      var proto = newTarget.prototype;
      var instance = create$4(isObject$6(proto) ? proto : ObjectPrototype$2);
      var result = apply$4(Target, instance, args);
      return isObject$6(result) ? result : instance;
    }
  });

  /* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
  /* eslint-disable regexp/no-useless-quantifier -- testing */
  var call$i = functionCall;
  var uncurryThis$q = functionUncurryThis;
  var toString$d = toString$o;
  var regexpFlags = regexpFlags$1;
  var stickyHelpers$1 = regexpStickyHelpers;
  var shared = shared$7;
  var create$3 = objectCreate;
  var getInternalState$4 = internalState.get;
  var UNSUPPORTED_DOT_ALL = regexpUnsupportedDotAll;
  var UNSUPPORTED_NCG = regexpUnsupportedNcg;

  var nativeReplace = shared('native-string-replace', String.prototype.replace);
  var nativeExec = RegExp.prototype.exec;
  var patchedExec = nativeExec;
  var charAt$6 = uncurryThis$q(''.charAt);
  var indexOf = uncurryThis$q(''.indexOf);
  var replace$4 = uncurryThis$q(''.replace);
  var stringSlice$7 = uncurryThis$q(''.slice);

  var UPDATES_LAST_INDEX_WRONG = (function () {
    var re1 = /a/;
    var re2 = /b*/g;
    call$i(nativeExec, re1, 'a');
    call$i(nativeExec, re2, 'a');
    return re1.lastIndex !== 0 || re2.lastIndex !== 0;
  })();

  var UNSUPPORTED_Y$1 = stickyHelpers$1.BROKEN_CARET;

  // nonparticipating capturing group, copied from es5-shim's String#split patch.
  var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

  var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$1 || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;

  if (PATCH) {
    patchedExec = function exec(string) {
      var re = this;
      var state = getInternalState$4(re);
      var str = toString$d(string);
      var raw = state.raw;
      var result, reCopy, lastIndex, match, i, object, group;

      if (raw) {
        raw.lastIndex = re.lastIndex;
        result = call$i(patchedExec, raw, str);
        re.lastIndex = raw.lastIndex;
        return result;
      }

      var groups = state.groups;
      var sticky = UNSUPPORTED_Y$1 && re.sticky;
      var flags = call$i(regexpFlags, re);
      var source = re.source;
      var charsAdded = 0;
      var strCopy = str;

      if (sticky) {
        flags = replace$4(flags, 'y', '');
        if (indexOf(flags, 'g') === -1) {
          flags += 'g';
        }

        strCopy = stringSlice$7(str, re.lastIndex);
        // Support anchored sticky behavior.
        if (re.lastIndex > 0 && (!re.multiline || re.multiline && charAt$6(str, re.lastIndex - 1) !== '\n')) {
          source = '(?: ' + source + ')';
          strCopy = ' ' + strCopy;
          charsAdded++;
        }
        // ^(? + rx + ) is needed, in combination with some str slicing, to
        // simulate the 'y' flag.
        reCopy = new RegExp('^(?:' + source + ')', flags);
      }

      if (NPCG_INCLUDED) {
        reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
      }
      if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

      match = call$i(nativeExec, sticky ? reCopy : re, strCopy);

      if (sticky) {
        if (match) {
          match.input = stringSlice$7(match.input, charsAdded);
          match[0] = stringSlice$7(match[0], charsAdded);
          match.index = re.lastIndex;
          re.lastIndex += match[0].length;
        } else re.lastIndex = 0;
      } else if (UPDATES_LAST_INDEX_WRONG && match) {
        re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
      }
      if (NPCG_INCLUDED && match && match.length > 1) {
        // Fix browsers whose `exec` methods don't consistently return `undefined`
        // for NPCG, like IE8. NOTE: This doesn't work for /(.?)?/
        call$i(nativeReplace, match[0], reCopy, function () {
          for (i = 1; i < arguments.length - 2; i++) {
            if (arguments[i] === undefined) match[i] = undefined;
          }
        });
      }

      if (match && groups) {
        match.groups = object = create$3(null);
        for (i = 0; i < groups.length; i++) {
          group = groups[i];
          object[group[0]] = match[group[1]];
        }
      }

      return match;
    };
  }

  var regexpExec$2 = patchedExec;

  var $$t = _export;
  var exec$3 = regexpExec$2;

  // `RegExp.prototype.exec` method
  // https://tc39.es/ecma262/#sec-regexp.prototype.exec
  $$t({ target: 'RegExp', proto: true, forced: /./.exec !== exec$3 }, {
    exec: exec$3
  });

  var DESCRIPTORS$a = descriptors;
  var MISSED_STICKY = regexpStickyHelpers.MISSED_STICKY;
  var classof$6 = classofRaw$2;
  var defineBuiltInAccessor$8 = defineBuiltInAccessor$f;
  var getInternalState$3 = internalState.get;

  var RegExpPrototype$2 = RegExp.prototype;
  var $TypeError$7 = TypeError;

  // `RegExp.prototype.sticky` getter
  // https://tc39.es/ecma262/#sec-get-regexp.prototype.sticky
  if (DESCRIPTORS$a && MISSED_STICKY) {
    defineBuiltInAccessor$8(RegExpPrototype$2, 'sticky', {
      configurable: true,
      get: function sticky() {
        if (this === RegExpPrototype$2) return;
        // We can't use InternalStateModule.getterFor because
        // we don't add metadata for regexps created by a literal.
        if (classof$6(this) === 'RegExp') {
          return !!getInternalState$3(this).sticky;
        }
        throw new $TypeError$7('Incompatible receiver, RegExp required');
      }
    });
  }

  // TODO: Remove from `core-js@4` since it's moved to entry points

  var $$s = _export;
  var call$h = functionCall;
  var isCallable$5 = isCallable$v;
  var anObject$i = anObject$y;
  var toString$c = toString$o;

  var DELEGATES_TO_EXEC = function () {
    var execCalled = false;
    var re = /[ac]/;
    re.exec = function () {
      execCalled = true;
      return /./.exec.apply(this, arguments);
    };
    return re.test('abc') === true && execCalled;
  }();

  var nativeTest = /./.test;

  // `RegExp.prototype.test` method
  // https://tc39.es/ecma262/#sec-regexp.prototype.test
  $$s({ target: 'RegExp', proto: true, forced: !DELEGATES_TO_EXEC }, {
    test: function (S) {
      var R = anObject$i(this);
      var string = toString$c(S);
      var exec = R.exec;
      if (!isCallable$5(exec)) return call$h(nativeTest, R, string);
      var result = call$h(exec, R, string);
      if (result === null) return false;
      anObject$i(result);
      return true;
    }
  });

  var PROPER_FUNCTION_NAME$1 = functionName.PROPER;
  var defineBuiltIn$6 = defineBuiltIn$k;
  var anObject$h = anObject$y;
  var $toString$2 = toString$o;
  var fails$h = fails$Y;
  var getRegExpFlags = regexpGetFlags;

  var TO_STRING = 'toString';
  var RegExpPrototype$1 = RegExp.prototype;
  var nativeToString = RegExpPrototype$1[TO_STRING];

  var NOT_GENERIC = fails$h(function () { return nativeToString.call({ source: 'a', flags: 'b' }) !== '/a/b'; });
  // FF44- RegExp#toString has a wrong name
  var INCORRECT_NAME = PROPER_FUNCTION_NAME$1 && nativeToString.name !== TO_STRING;

  // `RegExp.prototype.toString` method
  // https://tc39.es/ecma262/#sec-regexp.prototype.tostring
  if (NOT_GENERIC || INCORRECT_NAME) {
    defineBuiltIn$6(RegExpPrototype$1, TO_STRING, function toString() {
      var R = anObject$h(this);
      var pattern = $toString$2(R.source);
      var flags = $toString$2(getRegExpFlags(R));
      return '/' + pattern + '/' + flags;
    }, { unsafe: true });
  }

  var collection$1 = collection$3;
  var collectionStrong = collectionStrong$2;

  // `Set` constructor
  // https://tc39.es/ecma262/#sec-set-objects
  collection$1('Set', function (init) {
    return function Set() { return init(this, arguments.length ? arguments[0] : undefined); };
  }, collectionStrong);

  var uncurryThis$p = functionUncurryThis;

  // eslint-disable-next-line es/no-set -- safe
  var SetPrototype$1 = Set.prototype;

  var setHelpers = {
    // eslint-disable-next-line es/no-set -- safe
    Set: Set,
    add: uncurryThis$p(SetPrototype$1.add),
    has: uncurryThis$p(SetPrototype$1.has),
    remove: uncurryThis$p(SetPrototype$1['delete']),
    proto: SetPrototype$1
  };

  var has$5 = setHelpers.has;

  // Perform ? RequireInternalSlot(M, [[SetData]])
  var aSet$7 = function (it) {
    has$5(it);
    return it;
  };

  var call$g = functionCall;

  var iterateSimple$7 = function (record, fn, ITERATOR_INSTEAD_OF_RECORD) {
    var iterator = ITERATOR_INSTEAD_OF_RECORD ? record : record.iterator;
    var next = record.next;
    var step, result;
    while (!(step = call$g(next, iterator)).done) {
      result = fn(step.value);
      if (result !== undefined) return result;
    }
  };

  var uncurryThis$o = functionUncurryThis;
  var iterateSimple$6 = iterateSimple$7;
  var SetHelpers$5 = setHelpers;

  var Set$3 = SetHelpers$5.Set;
  var SetPrototype = SetHelpers$5.proto;
  var forEach$4 = uncurryThis$o(SetPrototype.forEach);
  var keys = uncurryThis$o(SetPrototype.keys);
  var next = keys(new Set$3()).next;

  var setIterate = function (set, fn, interruptible) {
    return interruptible ? iterateSimple$6({ iterator: keys(set), next: next }, fn) : forEach$4(set, fn);
  };

  var SetHelpers$4 = setHelpers;
  var iterate$8 = setIterate;

  var Set$2 = SetHelpers$4.Set;
  var add$3 = SetHelpers$4.add;

  var setClone = function (set) {
    var result = new Set$2();
    iterate$8(set, function (it) {
      add$3(result, it);
    });
    return result;
  };

  var uncurryThisAccessor = functionUncurryThisAccessor;
  var SetHelpers$3 = setHelpers;

  var setSize = uncurryThisAccessor(SetHelpers$3.proto, 'size', 'get') || function (set) {
    return set.size;
  };

  // `GetIteratorDirect(obj)` abstract operation
  // https://tc39.es/proposal-iterator-helpers/#sec-getiteratordirect
  var getIteratorDirect$9 = function (obj) {
    return {
      iterator: obj,
      next: obj.next,
      done: false
    };
  };

  var aCallable$a = aCallable$n;
  var anObject$g = anObject$y;
  var call$f = functionCall;
  var toIntegerOrInfinity$9 = toIntegerOrInfinity$f;
  var getIteratorDirect$8 = getIteratorDirect$9;

  var INVALID_SIZE = 'Invalid size';
  var $RangeError$6 = RangeError;
  var $TypeError$6 = TypeError;
  var max$1 = Math.max;

  var SetRecord = function (set, intSize) {
    this.set = set;
    this.size = max$1(intSize, 0);
    this.has = aCallable$a(set.has);
    this.keys = aCallable$a(set.keys);
  };

  SetRecord.prototype = {
    getIterator: function () {
      return getIteratorDirect$8(anObject$g(call$f(this.keys, this.set)));
    },
    includes: function (it) {
      return call$f(this.has, this.set, it);
    }
  };

  // `GetSetRecord` abstract operation
  // https://tc39.es/proposal-set-methods/#sec-getsetrecord
  var getSetRecord$7 = function (obj) {
    anObject$g(obj);
    var numSize = +obj.size;
    // NOTE: If size is undefined, then numSize will be NaN
    // eslint-disable-next-line no-self-compare -- NaN check
    if (numSize !== numSize) throw new $TypeError$6(INVALID_SIZE);
    var intSize = toIntegerOrInfinity$9(numSize);
    if (intSize < 0) throw new $RangeError$6(INVALID_SIZE);
    return new SetRecord(obj, intSize);
  };

  var aSet$6 = aSet$7;
  var SetHelpers$2 = setHelpers;
  var clone$2 = setClone;
  var size$4 = setSize;
  var getSetRecord$6 = getSetRecord$7;
  var iterateSet$2 = setIterate;
  var iterateSimple$5 = iterateSimple$7;

  var has$4 = SetHelpers$2.has;
  var remove$1 = SetHelpers$2.remove;

  // `Set.prototype.difference` method
  // https://github.com/tc39/proposal-set-methods
  var setDifference = function difference(other) {
    var O = aSet$6(this);
    var otherRec = getSetRecord$6(other);
    var result = clone$2(O);
    if (size$4(O) <= otherRec.size) iterateSet$2(O, function (e) {
      if (otherRec.includes(e)) remove$1(result, e);
    });
    else iterateSimple$5(otherRec.getIterator(), function (e) {
      if (has$4(O, e)) remove$1(result, e);
    });
    return result;
  };

  var getBuiltIn$1 = getBuiltIn$g;

  var createSetLike = function (size) {
    return {
      size: size,
      has: function () {
        return false;
      },
      keys: function () {
        return {
          next: function () {
            return { done: true };
          }
        };
      }
    };
  };

  var setMethodAcceptSetLike$7 = function (name) {
    var Set = getBuiltIn$1('Set');
    try {
      new Set()[name](createSetLike(0));
      try {
        // late spec change, early WebKit ~ Safari 17.0 beta implementation does not pass it
        // https://github.com/tc39/proposal-set-methods/pull/88
        new Set()[name](createSetLike(-1));
        return false;
      } catch (error2) {
        return true;
      }
    } catch (error) {
      return false;
    }
  };

  var $$r = _export;
  var difference = setDifference;
  var setMethodAcceptSetLike$6 = setMethodAcceptSetLike$7;

  // `Set.prototype.difference` method
  // https://github.com/tc39/proposal-set-methods
  $$r({ target: 'Set', proto: true, real: true, forced: !setMethodAcceptSetLike$6('difference') }, {
    difference: difference
  });

  var aSet$5 = aSet$7;
  var SetHelpers$1 = setHelpers;
  var size$3 = setSize;
  var getSetRecord$5 = getSetRecord$7;
  var iterateSet$1 = setIterate;
  var iterateSimple$4 = iterateSimple$7;

  var Set$1 = SetHelpers$1.Set;
  var add$2 = SetHelpers$1.add;
  var has$3 = SetHelpers$1.has;

  // `Set.prototype.intersection` method
  // https://github.com/tc39/proposal-set-methods
  var setIntersection = function intersection(other) {
    var O = aSet$5(this);
    var otherRec = getSetRecord$5(other);
    var result = new Set$1();

    if (size$3(O) > otherRec.size) {
      iterateSimple$4(otherRec.getIterator(), function (e) {
        if (has$3(O, e)) add$2(result, e);
      });
    } else {
      iterateSet$1(O, function (e) {
        if (otherRec.includes(e)) add$2(result, e);
      });
    }

    return result;
  };

  var $$q = _export;
  var fails$g = fails$Y;
  var intersection = setIntersection;
  var setMethodAcceptSetLike$5 = setMethodAcceptSetLike$7;

  var INCORRECT = !setMethodAcceptSetLike$5('intersection') || fails$g(function () {
    // eslint-disable-next-line es/no-array-from, es/no-set -- testing
    return String(Array.from(new Set([1, 2, 3]).intersection(new Set([3, 2])))) !== '3,2';
  });

  // `Set.prototype.intersection` method
  // https://github.com/tc39/proposal-set-methods
  $$q({ target: 'Set', proto: true, real: true, forced: INCORRECT }, {
    intersection: intersection
  });

  var aSet$4 = aSet$7;
  var has$2 = setHelpers.has;
  var size$2 = setSize;
  var getSetRecord$4 = getSetRecord$7;
  var iterateSet = setIterate;
  var iterateSimple$3 = iterateSimple$7;
  var iteratorClose$2 = iteratorClose$5;

  // `Set.prototype.isDisjointFrom` method
  // https://tc39.github.io/proposal-set-methods/#Set.prototype.isDisjointFrom
  var setIsDisjointFrom = function isDisjointFrom(other) {
    var O = aSet$4(this);
    var otherRec = getSetRecord$4(other);
    if (size$2(O) <= otherRec.size) return iterateSet(O, function (e) {
      if (otherRec.includes(e)) return false;
    }, true) !== false;
    var iterator = otherRec.getIterator();
    return iterateSimple$3(iterator, function (e) {
      if (has$2(O, e)) return iteratorClose$2(iterator, 'normal', false);
    }) !== false;
  };

  var $$p = _export;
  var isDisjointFrom = setIsDisjointFrom;
  var setMethodAcceptSetLike$4 = setMethodAcceptSetLike$7;

  // `Set.prototype.isDisjointFrom` method
  // https://github.com/tc39/proposal-set-methods
  $$p({ target: 'Set', proto: true, real: true, forced: !setMethodAcceptSetLike$4('isDisjointFrom') }, {
    isDisjointFrom: isDisjointFrom
  });

  var aSet$3 = aSet$7;
  var size$1 = setSize;
  var iterate$7 = setIterate;
  var getSetRecord$3 = getSetRecord$7;

  // `Set.prototype.isSubsetOf` method
  // https://tc39.github.io/proposal-set-methods/#Set.prototype.isSubsetOf
  var setIsSubsetOf = function isSubsetOf(other) {
    var O = aSet$3(this);
    var otherRec = getSetRecord$3(other);
    if (size$1(O) > otherRec.size) return false;
    return iterate$7(O, function (e) {
      if (!otherRec.includes(e)) return false;
    }, true) !== false;
  };

  var $$o = _export;
  var isSubsetOf = setIsSubsetOf;
  var setMethodAcceptSetLike$3 = setMethodAcceptSetLike$7;

  // `Set.prototype.isSubsetOf` method
  // https://github.com/tc39/proposal-set-methods
  $$o({ target: 'Set', proto: true, real: true, forced: !setMethodAcceptSetLike$3('isSubsetOf') }, {
    isSubsetOf: isSubsetOf
  });

  var aSet$2 = aSet$7;
  var has$1 = setHelpers.has;
  var size = setSize;
  var getSetRecord$2 = getSetRecord$7;
  var iterateSimple$2 = iterateSimple$7;
  var iteratorClose$1 = iteratorClose$5;

  // `Set.prototype.isSupersetOf` method
  // https://tc39.github.io/proposal-set-methods/#Set.prototype.isSupersetOf
  var setIsSupersetOf = function isSupersetOf(other) {
    var O = aSet$2(this);
    var otherRec = getSetRecord$2(other);
    if (size(O) < otherRec.size) return false;
    var iterator = otherRec.getIterator();
    return iterateSimple$2(iterator, function (e) {
      if (!has$1(O, e)) return iteratorClose$1(iterator, 'normal', false);
    }) !== false;
  };

  var $$n = _export;
  var isSupersetOf = setIsSupersetOf;
  var setMethodAcceptSetLike$2 = setMethodAcceptSetLike$7;

  // `Set.prototype.isSupersetOf` method
  // https://github.com/tc39/proposal-set-methods
  $$n({ target: 'Set', proto: true, real: true, forced: !setMethodAcceptSetLike$2('isSupersetOf') }, {
    isSupersetOf: isSupersetOf
  });

  var aSet$1 = aSet$7;
  var SetHelpers = setHelpers;
  var clone$1 = setClone;
  var getSetRecord$1 = getSetRecord$7;
  var iterateSimple$1 = iterateSimple$7;

  var add$1 = SetHelpers.add;
  var has = SetHelpers.has;
  var remove = SetHelpers.remove;

  // `Set.prototype.symmetricDifference` method
  // https://github.com/tc39/proposal-set-methods
  var setSymmetricDifference = function symmetricDifference(other) {
    var O = aSet$1(this);
    var keysIter = getSetRecord$1(other).getIterator();
    var result = clone$1(O);
    iterateSimple$1(keysIter, function (e) {
      if (has(O, e)) remove(result, e);
      else add$1(result, e);
    });
    return result;
  };

  var $$m = _export;
  var symmetricDifference = setSymmetricDifference;
  var setMethodAcceptSetLike$1 = setMethodAcceptSetLike$7;

  // `Set.prototype.symmetricDifference` method
  // https://github.com/tc39/proposal-set-methods
  $$m({ target: 'Set', proto: true, real: true, forced: !setMethodAcceptSetLike$1('symmetricDifference') }, {
    symmetricDifference: symmetricDifference
  });

  var aSet = aSet$7;
  var add = setHelpers.add;
  var clone = setClone;
  var getSetRecord = getSetRecord$7;
  var iterateSimple = iterateSimple$7;

  // `Set.prototype.union` method
  // https://github.com/tc39/proposal-set-methods
  var setUnion = function union(other) {
    var O = aSet(this);
    var keysIter = getSetRecord(other).getIterator();
    var result = clone(O);
    iterateSimple(keysIter, function (it) {
      add(result, it);
    });
    return result;
  };

  var $$l = _export;
  var union = setUnion;
  var setMethodAcceptSetLike = setMethodAcceptSetLike$7;

  // `Set.prototype.union` method
  // https://github.com/tc39/proposal-set-methods
  $$l({ target: 'Set', proto: true, real: true, forced: !setMethodAcceptSetLike('union') }, {
    union: union
  });

  var uncurryThis$n = functionUncurryThis;
  var toIntegerOrInfinity$8 = toIntegerOrInfinity$f;
  var toString$b = toString$o;
  var requireObjectCoercible$8 = requireObjectCoercible$d;

  var charAt$5 = uncurryThis$n(''.charAt);
  var charCodeAt$1 = uncurryThis$n(''.charCodeAt);
  var stringSlice$6 = uncurryThis$n(''.slice);

  var createMethod$1 = function (CONVERT_TO_STRING) {
    return function ($this, pos) {
      var S = toString$b(requireObjectCoercible$8($this));
      var position = toIntegerOrInfinity$8(pos);
      var size = S.length;
      var first, second;
      if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
      first = charCodeAt$1(S, position);
      return first < 0xD800 || first > 0xDBFF || position + 1 === size
        || (second = charCodeAt$1(S, position + 1)) < 0xDC00 || second > 0xDFFF
          ? CONVERT_TO_STRING
            ? charAt$5(S, position)
            : first
          : CONVERT_TO_STRING
            ? stringSlice$6(S, position, position + 2)
            : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
    };
  };

  var stringMultibyte = {
    // `String.prototype.codePointAt` method
    // https://tc39.es/ecma262/#sec-string.prototype.codepointat
    codeAt: createMethod$1(false),
    // `String.prototype.at` method
    // https://github.com/mathiasbynens/String.prototype.at
    charAt: createMethod$1(true)
  };

  var $$k = _export;
  var codeAt$1 = stringMultibyte.codeAt;

  // `String.prototype.codePointAt` method
  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
  $$k({ target: 'String', proto: true }, {
    codePointAt: function codePointAt(pos) {
      return codeAt$1(this, pos);
    }
  });

  var isRegExp = isRegexp;

  var $TypeError$5 = TypeError;

  var notARegexp = function (it) {
    if (isRegExp(it)) {
      throw new $TypeError$5("The method doesn't accept regular expressions");
    } return it;
  };

  var wellKnownSymbol$9 = wellKnownSymbol$x;

  var MATCH = wellKnownSymbol$9('match');

  var correctIsRegexpLogic = function (METHOD_NAME) {
    var regexp = /./;
    try {
      '/./'[METHOD_NAME](regexp);
    } catch (error1) {
      try {
        regexp[MATCH] = false;
        return '/./'[METHOD_NAME](regexp);
      } catch (error2) { /* empty */ }
    } return false;
  };

  var $$j = _export;
  var uncurryThis$m = functionUncurryThisClause;
  var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
  var toLength$6 = toLength$9;
  var toString$a = toString$o;
  var notARegExp$2 = notARegexp;
  var requireObjectCoercible$7 = requireObjectCoercible$d;
  var correctIsRegExpLogic$2 = correctIsRegexpLogic;

  var slice$1 = uncurryThis$m(''.slice);
  var min$5 = Math.min;

  var CORRECT_IS_REGEXP_LOGIC$1 = correctIsRegExpLogic$2('endsWith');
  // https://github.com/zloirock/core-js/pull/702
  var MDN_POLYFILL_BUG$1 = !CORRECT_IS_REGEXP_LOGIC$1 && !!function () {
    var descriptor = getOwnPropertyDescriptor$1(String.prototype, 'endsWith');
    return descriptor && !descriptor.writable;
  }();

  // `String.prototype.endsWith` method
  // https://tc39.es/ecma262/#sec-string.prototype.endswith
  $$j({ target: 'String', proto: true, forced: !MDN_POLYFILL_BUG$1 && !CORRECT_IS_REGEXP_LOGIC$1 }, {
    endsWith: function endsWith(searchString /* , endPosition = @length */) {
      var that = toString$a(requireObjectCoercible$7(this));
      notARegExp$2(searchString);
      var endPosition = arguments.length > 1 ? arguments[1] : undefined;
      var len = that.length;
      var end = endPosition === undefined ? len : min$5(toLength$6(endPosition), len);
      var search = toString$a(searchString);
      return slice$1(that, end - search.length, end) === search;
    }
  });

  var $$i = _export;
  var uncurryThis$l = functionUncurryThis;
  var notARegExp$1 = notARegexp;
  var requireObjectCoercible$6 = requireObjectCoercible$d;
  var toString$9 = toString$o;
  var correctIsRegExpLogic$1 = correctIsRegexpLogic;

  var stringIndexOf$1 = uncurryThis$l(''.indexOf);

  // `String.prototype.includes` method
  // https://tc39.es/ecma262/#sec-string.prototype.includes
  $$i({ target: 'String', proto: true, forced: !correctIsRegExpLogic$1('includes') }, {
    includes: function includes(searchString /* , position = 0 */) {
      return !!~stringIndexOf$1(
        toString$9(requireObjectCoercible$6(this)),
        toString$9(notARegExp$1(searchString)),
        arguments.length > 1 ? arguments[1] : undefined
      );
    }
  });

  var charAt$4 = stringMultibyte.charAt;
  var toString$8 = toString$o;
  var InternalStateModule$7 = internalState;
  var defineIterator = iteratorDefine;
  var createIterResultObject$2 = createIterResultObject$5;

  var STRING_ITERATOR = 'String Iterator';
  var setInternalState$6 = InternalStateModule$7.set;
  var getInternalState$2 = InternalStateModule$7.getterFor(STRING_ITERATOR);

  // `String.prototype[@@iterator]` method
  // https://tc39.es/ecma262/#sec-string.prototype-@@iterator
  defineIterator(String, 'String', function (iterated) {
    setInternalState$6(this, {
      type: STRING_ITERATOR,
      string: toString$8(iterated),
      index: 0
    });
  // `%StringIteratorPrototype%.next` method
  // https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
  }, function next() {
    var state = getInternalState$2(this);
    var string = state.string;
    var index = state.index;
    var point;
    if (index >= string.length) return createIterResultObject$2(undefined, true);
    point = charAt$4(string, index);
    state.index += point.length;
    return createIterResultObject$2(point, false);
  });

  // TODO: Remove from `core-js@4` since it's moved to entry points

  var call$e = functionCall;
  var defineBuiltIn$5 = defineBuiltIn$k;
  var regexpExec$1 = regexpExec$2;
  var fails$f = fails$Y;
  var wellKnownSymbol$8 = wellKnownSymbol$x;
  var createNonEnumerableProperty$6 = createNonEnumerableProperty$e;

  var SPECIES = wellKnownSymbol$8('species');
  var RegExpPrototype = RegExp.prototype;

  var fixRegexpWellKnownSymbolLogic = function (KEY, exec, FORCED, SHAM) {
    var SYMBOL = wellKnownSymbol$8(KEY);

    var DELEGATES_TO_SYMBOL = !fails$f(function () {
      // String methods call symbol-named RegExp methods
      var O = {};
      O[SYMBOL] = function () { return 7; };
      return ''[KEY](O) !== 7;
    });

    var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails$f(function () {
      // Symbol-named RegExp methods call .exec
      var execCalled = false;
      var re = /a/;

      if (KEY === 'split') {
        // We can't use real regex here since it causes deoptimization
        // and serious performance degradation in V8
        // https://github.com/zloirock/core-js/issues/306
        re = {};
        // RegExp[@@split] doesn't call the regex's exec method, but first creates
        // a new one. We need to return the patched regex when creating the new one.
        re.constructor = {};
        re.constructor[SPECIES] = function () { return re; };
        re.flags = '';
        re[SYMBOL] = /./[SYMBOL];
      }

      re.exec = function () {
        execCalled = true;
        return null;
      };

      re[SYMBOL]('');
      return !execCalled;
    });

    if (
      !DELEGATES_TO_SYMBOL ||
      !DELEGATES_TO_EXEC ||
      FORCED
    ) {
      var nativeRegExpMethod = /./[SYMBOL];
      var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
        var $exec = regexp.exec;
        if ($exec === regexpExec$1 || $exec === RegExpPrototype.exec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return { done: true, value: call$e(nativeRegExpMethod, regexp, str, arg2) };
          }
          return { done: true, value: call$e(nativeMethod, str, regexp, arg2) };
        }
        return { done: false };
      });

      defineBuiltIn$5(String.prototype, KEY, methods[0]);
      defineBuiltIn$5(RegExpPrototype, SYMBOL, methods[1]);
    }

    if (SHAM) createNonEnumerableProperty$6(RegExpPrototype[SYMBOL], 'sham', true);
  };

  var charAt$3 = stringMultibyte.charAt;

  // `AdvanceStringIndex` abstract operation
  // https://tc39.es/ecma262/#sec-advancestringindex
  var advanceStringIndex$3 = function (S, index, unicode) {
    return index + (unicode ? charAt$3(S, index).length : 1);
  };

  var call$d = functionCall;
  var anObject$f = anObject$y;
  var isCallable$4 = isCallable$v;
  var classof$5 = classofRaw$2;
  var regexpExec = regexpExec$2;

  var $TypeError$4 = TypeError;

  // `RegExpExec` abstract operation
  // https://tc39.es/ecma262/#sec-regexpexec
  var regexpExecAbstract = function (R, S) {
    var exec = R.exec;
    if (isCallable$4(exec)) {
      var result = call$d(exec, R, S);
      if (result !== null) anObject$f(result);
      return result;
    }
    if (classof$5(R) === 'RegExp') return call$d(regexpExec, R, S);
    throw new $TypeError$4('RegExp#exec called on incompatible receiver');
  };

  var call$c = functionCall;
  var fixRegExpWellKnownSymbolLogic$3 = fixRegexpWellKnownSymbolLogic;
  var anObject$e = anObject$y;
  var isNullOrUndefined$4 = isNullOrUndefined$b;
  var toLength$5 = toLength$9;
  var toString$7 = toString$o;
  var requireObjectCoercible$5 = requireObjectCoercible$d;
  var getMethod$4 = getMethod$8;
  var advanceStringIndex$2 = advanceStringIndex$3;
  var regExpExec$3 = regexpExecAbstract;

  // @@match logic
  fixRegExpWellKnownSymbolLogic$3('match', function (MATCH, nativeMatch, maybeCallNative) {
    return [
      // `String.prototype.match` method
      // https://tc39.es/ecma262/#sec-string.prototype.match
      function match(regexp) {
        var O = requireObjectCoercible$5(this);
        var matcher = isNullOrUndefined$4(regexp) ? undefined : getMethod$4(regexp, MATCH);
        return matcher ? call$c(matcher, regexp, O) : new RegExp(regexp)[MATCH](toString$7(O));
      },
      // `RegExp.prototype[@@match]` method
      // https://tc39.es/ecma262/#sec-regexp.prototype-@@match
      function (string) {
        var rx = anObject$e(this);
        var S = toString$7(string);
        var res = maybeCallNative(nativeMatch, rx, S);

        if (res.done) return res.value;

        if (!rx.global) return regExpExec$3(rx, S);

        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
        var A = [];
        var n = 0;
        var result;
        while ((result = regExpExec$3(rx, S)) !== null) {
          var matchStr = toString$7(result[0]);
          A[n] = matchStr;
          if (matchStr === '') rx.lastIndex = advanceStringIndex$2(S, toLength$5(rx.lastIndex), fullUnicode);
          n++;
        }
        return n === 0 ? null : A;
      }
    ];
  });

  var toIntegerOrInfinity$7 = toIntegerOrInfinity$f;
  var toString$6 = toString$o;
  var requireObjectCoercible$4 = requireObjectCoercible$d;

  var $RangeError$5 = RangeError;

  // `String.prototype.repeat` method implementation
  // https://tc39.es/ecma262/#sec-string.prototype.repeat
  var stringRepeat = function repeat(count) {
    var str = toString$6(requireObjectCoercible$4(this));
    var result = '';
    var n = toIntegerOrInfinity$7(count);
    if (n < 0 || n === Infinity) throw new $RangeError$5('Wrong number of repetitions');
    for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) result += str;
    return result;
  };

  var $$h = _export;
  var repeat = stringRepeat;

  // `String.prototype.repeat` method
  // https://tc39.es/ecma262/#sec-string.prototype.repeat
  $$h({ target: 'String', proto: true }, {
    repeat: repeat
  });

  var uncurryThis$k = functionUncurryThis;
  var toObject$3 = toObject$k;

  var floor$5 = Math.floor;
  var charAt$2 = uncurryThis$k(''.charAt);
  var replace$3 = uncurryThis$k(''.replace);
  var stringSlice$5 = uncurryThis$k(''.slice);
  // eslint-disable-next-line redos/no-vulnerable -- safe
  var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
  var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

  // `GetSubstitution` abstract operation
  // https://tc39.es/ecma262/#sec-getsubstitution
  var getSubstitution$1 = function (matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject$3(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return replace$3(replacement, symbols, function (match, ch) {
      var capture;
      switch (charAt$2(ch, 0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return stringSlice$5(str, 0, position);
        case "'": return stringSlice$5(str, tailPos);
        case '<':
          capture = namedCaptures[stringSlice$5(ch, 1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor$5(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? charAt$2(ch, 1) : captures[f - 1] + charAt$2(ch, 1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  };

  var apply$3 = functionApply;
  var call$b = functionCall;
  var uncurryThis$j = functionUncurryThis;
  var fixRegExpWellKnownSymbolLogic$2 = fixRegexpWellKnownSymbolLogic;
  var fails$e = fails$Y;
  var anObject$d = anObject$y;
  var isCallable$3 = isCallable$v;
  var isNullOrUndefined$3 = isNullOrUndefined$b;
  var toIntegerOrInfinity$6 = toIntegerOrInfinity$f;
  var toLength$4 = toLength$9;
  var toString$5 = toString$o;
  var requireObjectCoercible$3 = requireObjectCoercible$d;
  var advanceStringIndex$1 = advanceStringIndex$3;
  var getMethod$3 = getMethod$8;
  var getSubstitution = getSubstitution$1;
  var regExpExec$2 = regexpExecAbstract;
  var wellKnownSymbol$7 = wellKnownSymbol$x;

  var REPLACE = wellKnownSymbol$7('replace');
  var max = Math.max;
  var min$4 = Math.min;
  var concat = uncurryThis$j([].concat);
  var push$6 = uncurryThis$j([].push);
  var stringIndexOf = uncurryThis$j(''.indexOf);
  var stringSlice$4 = uncurryThis$j(''.slice);

  var maybeToString = function (it) {
    return it === undefined ? it : String(it);
  };

  // IE <= 11 replaces $0 with the whole match, as if it was $&
  // https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
  var REPLACE_KEEPS_$0 = (function () {
    // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
    return 'a'.replace(/./, '$0') === '$0';
  })();

  // Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
  var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
    if (/./[REPLACE]) {
      return /./[REPLACE]('a', '$0') === '';
    }
    return false;
  })();

  var REPLACE_SUPPORTS_NAMED_GROUPS = !fails$e(function () {
    var re = /./;
    re.exec = function () {
      var result = [];
      result.groups = { a: '7' };
      return result;
    };
    // eslint-disable-next-line regexp/no-useless-dollar-replacements -- false positive
    return ''.replace(re, '$<a>') !== '7';
  });

  // @@replace logic
  fixRegExpWellKnownSymbolLogic$2('replace', function (_, nativeReplace, maybeCallNative) {
    var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

    return [
      // `String.prototype.replace` method
      // https://tc39.es/ecma262/#sec-string.prototype.replace
      function replace(searchValue, replaceValue) {
        var O = requireObjectCoercible$3(this);
        var replacer = isNullOrUndefined$3(searchValue) ? undefined : getMethod$3(searchValue, REPLACE);
        return replacer
          ? call$b(replacer, searchValue, O, replaceValue)
          : call$b(nativeReplace, toString$5(O), searchValue, replaceValue);
      },
      // `RegExp.prototype[@@replace]` method
      // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
      function (string, replaceValue) {
        var rx = anObject$d(this);
        var S = toString$5(string);

        if (
          typeof replaceValue == 'string' &&
          stringIndexOf(replaceValue, UNSAFE_SUBSTITUTE) === -1 &&
          stringIndexOf(replaceValue, '$<') === -1
        ) {
          var res = maybeCallNative(nativeReplace, rx, S, replaceValue);
          if (res.done) return res.value;
        }

        var functionalReplace = isCallable$3(replaceValue);
        if (!functionalReplace) replaceValue = toString$5(replaceValue);

        var global = rx.global;
        var fullUnicode;
        if (global) {
          fullUnicode = rx.unicode;
          rx.lastIndex = 0;
        }

        var results = [];
        var result;
        while (true) {
          result = regExpExec$2(rx, S);
          if (result === null) break;

          push$6(results, result);
          if (!global) break;

          var matchStr = toString$5(result[0]);
          if (matchStr === '') rx.lastIndex = advanceStringIndex$1(S, toLength$4(rx.lastIndex), fullUnicode);
        }

        var accumulatedResult = '';
        var nextSourcePosition = 0;
        for (var i = 0; i < results.length; i++) {
          result = results[i];

          var matched = toString$5(result[0]);
          var position = max(min$4(toIntegerOrInfinity$6(result.index), S.length), 0);
          var captures = [];
          var replacement;
          // NOTE: This is equivalent to
          //   captures = result.slice(1).map(maybeToString)
          // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
          // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
          // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
          for (var j = 1; j < result.length; j++) push$6(captures, maybeToString(result[j]));
          var namedCaptures = result.groups;
          if (functionalReplace) {
            var replacerArgs = concat([matched], captures, position, S);
            if (namedCaptures !== undefined) push$6(replacerArgs, namedCaptures);
            replacement = toString$5(apply$3(replaceValue, undefined, replacerArgs));
          } else {
            replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
          }
          if (position >= nextSourcePosition) {
            accumulatedResult += stringSlice$4(S, nextSourcePosition, position) + replacement;
            nextSourcePosition = position + matched.length;
          }
        }

        return accumulatedResult + stringSlice$4(S, nextSourcePosition);
      }
    ];
  }, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);

  // `SameValue` abstract operation
  // https://tc39.es/ecma262/#sec-samevalue
  // eslint-disable-next-line es/no-object-is -- safe
  var sameValue$1 = Object.is || function is(x, y) {
    // eslint-disable-next-line no-self-compare -- NaN check
    return x === y ? x !== 0 || 1 / x === 1 / y : x !== x && y !== y;
  };

  var call$a = functionCall;
  var fixRegExpWellKnownSymbolLogic$1 = fixRegexpWellKnownSymbolLogic;
  var anObject$c = anObject$y;
  var isNullOrUndefined$2 = isNullOrUndefined$b;
  var requireObjectCoercible$2 = requireObjectCoercible$d;
  var sameValue = sameValue$1;
  var toString$4 = toString$o;
  var getMethod$2 = getMethod$8;
  var regExpExec$1 = regexpExecAbstract;

  // @@search logic
  fixRegExpWellKnownSymbolLogic$1('search', function (SEARCH, nativeSearch, maybeCallNative) {
    return [
      // `String.prototype.search` method
      // https://tc39.es/ecma262/#sec-string.prototype.search
      function search(regexp) {
        var O = requireObjectCoercible$2(this);
        var searcher = isNullOrUndefined$2(regexp) ? undefined : getMethod$2(regexp, SEARCH);
        return searcher ? call$a(searcher, regexp, O) : new RegExp(regexp)[SEARCH](toString$4(O));
      },
      // `RegExp.prototype[@@search]` method
      // https://tc39.es/ecma262/#sec-regexp.prototype-@@search
      function (string) {
        var rx = anObject$c(this);
        var S = toString$4(string);
        var res = maybeCallNative(nativeSearch, rx, S);

        if (res.done) return res.value;

        var previousLastIndex = rx.lastIndex;
        if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
        var result = regExpExec$1(rx, S);
        if (!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
        return result === null ? -1 : result.index;
      }
    ];
  });

  var call$9 = functionCall;
  var uncurryThis$i = functionUncurryThis;
  var fixRegExpWellKnownSymbolLogic = fixRegexpWellKnownSymbolLogic;
  var anObject$b = anObject$y;
  var isNullOrUndefined$1 = isNullOrUndefined$b;
  var requireObjectCoercible$1 = requireObjectCoercible$d;
  var speciesConstructor$1 = speciesConstructor$4;
  var advanceStringIndex = advanceStringIndex$3;
  var toLength$3 = toLength$9;
  var toString$3 = toString$o;
  var getMethod$1 = getMethod$8;
  var regExpExec = regexpExecAbstract;
  var stickyHelpers = regexpStickyHelpers;
  var fails$d = fails$Y;

  var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;
  var MAX_UINT32 = 0xFFFFFFFF;
  var min$3 = Math.min;
  var push$5 = uncurryThis$i([].push);
  var stringSlice$3 = uncurryThis$i(''.slice);

  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  // Weex JS has frozen built-in prototypes, so use try / catch wrapper
  var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails$d(function () {
    // eslint-disable-next-line regexp/no-empty-group -- required for testing
    var re = /(?:)/;
    var originalExec = re.exec;
    re.exec = function () { return originalExec.apply(this, arguments); };
    var result = 'ab'.split(re);
    return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
  });

  var BUGGY = 'abbc'.split(/(b)*/)[1] === 'c' ||
    // eslint-disable-next-line regexp/no-empty-group -- required for testing
    'test'.split(/(?:)/, -1).length !== 4 ||
    'ab'.split(/(?:ab)*/).length !== 2 ||
    '.'.split(/(.?)(.?)/).length !== 4 ||
    // eslint-disable-next-line regexp/no-empty-capturing-group, regexp/no-empty-group -- required for testing
    '.'.split(/()()/).length > 1 ||
    ''.split(/.?/).length;

  // @@split logic
  fixRegExpWellKnownSymbolLogic('split', function (SPLIT, nativeSplit, maybeCallNative) {
    var internalSplit = '0'.split(undefined, 0).length ? function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : call$9(nativeSplit, this, separator, limit);
    } : nativeSplit;

    return [
      // `String.prototype.split` method
      // https://tc39.es/ecma262/#sec-string.prototype.split
      function split(separator, limit) {
        var O = requireObjectCoercible$1(this);
        var splitter = isNullOrUndefined$1(separator) ? undefined : getMethod$1(separator, SPLIT);
        return splitter
          ? call$9(splitter, separator, O, limit)
          : call$9(internalSplit, toString$3(O), separator, limit);
      },
      // `RegExp.prototype[@@split]` method
      // https://tc39.es/ecma262/#sec-regexp.prototype-@@split
      //
      // NOTE: This cannot be properly polyfilled in engines that don't support
      // the 'y' flag.
      function (string, limit) {
        var rx = anObject$b(this);
        var S = toString$3(string);

        if (!BUGGY) {
          var res = maybeCallNative(internalSplit, rx, S, limit, internalSplit !== nativeSplit);
          if (res.done) return res.value;
        }

        var C = speciesConstructor$1(rx, RegExp);
        var unicodeMatching = rx.unicode;
        var flags = (rx.ignoreCase ? 'i' : '') +
                    (rx.multiline ? 'm' : '') +
                    (rx.unicode ? 'u' : '') +
                    (UNSUPPORTED_Y ? 'g' : 'y');
        // ^(? + rx + ) is needed, in combination with some S slicing, to
        // simulate the 'y' flag.
        var splitter = new C(UNSUPPORTED_Y ? '^(?:' + rx.source + ')' : rx, flags);
        var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
        if (lim === 0) return [];
        if (S.length === 0) return regExpExec(splitter, S) === null ? [S] : [];
        var p = 0;
        var q = 0;
        var A = [];
        while (q < S.length) {
          splitter.lastIndex = UNSUPPORTED_Y ? 0 : q;
          var z = regExpExec(splitter, UNSUPPORTED_Y ? stringSlice$3(S, q) : S);
          var e;
          if (
            z === null ||
            (e = min$3(toLength$3(splitter.lastIndex + (UNSUPPORTED_Y ? q : 0)), S.length)) === p
          ) {
            q = advanceStringIndex(S, q, unicodeMatching);
          } else {
            push$5(A, stringSlice$3(S, p, q));
            if (A.length === lim) return A;
            for (var i = 1; i <= z.length - 1; i++) {
              push$5(A, z[i]);
              if (A.length === lim) return A;
            }
            q = p = e;
          }
        }
        push$5(A, stringSlice$3(S, p));
        return A;
      }
    ];
  }, BUGGY || !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC, UNSUPPORTED_Y);

  var $$g = _export;
  var uncurryThis$h = functionUncurryThisClause;
  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
  var toLength$2 = toLength$9;
  var toString$2 = toString$o;
  var notARegExp = notARegexp;
  var requireObjectCoercible = requireObjectCoercible$d;
  var correctIsRegExpLogic = correctIsRegexpLogic;

  var stringSlice$2 = uncurryThis$h(''.slice);
  var min$2 = Math.min;

  var CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic('startsWith');
  // https://github.com/zloirock/core-js/pull/702
  var MDN_POLYFILL_BUG = !CORRECT_IS_REGEXP_LOGIC && !!function () {
    var descriptor = getOwnPropertyDescriptor(String.prototype, 'startsWith');
    return descriptor && !descriptor.writable;
  }();

  // `String.prototype.startsWith` method
  // https://tc39.es/ecma262/#sec-string.prototype.startswith
  $$g({ target: 'String', proto: true, forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC }, {
    startsWith: function startsWith(searchString /* , position = 0 */) {
      var that = toString$2(requireObjectCoercible(this));
      notARegExp(searchString);
      var index = toLength$2(min$2(arguments.length > 1 ? arguments[1] : undefined, that.length));
      var search = toString$2(searchString);
      return stringSlice$2(that, index, index + search.length) === search;
    }
  });

  var typedArrayConstructor = {exports: {}};

  // eslint-disable-next-line es/no-typed-arrays -- safe
  var arrayBufferBasicDetection = typeof ArrayBuffer != 'undefined' && typeof DataView != 'undefined';

  var NATIVE_ARRAY_BUFFER$1 = arrayBufferBasicDetection;
  var DESCRIPTORS$9 = descriptors;
  var globalThis$h = globalThis_1;
  var isCallable$2 = isCallable$v;
  var isObject$5 = isObject$s;
  var hasOwn$5 = hasOwnProperty_1;
  var classof$4 = classof$j;
  var tryToString = tryToString$7;
  var createNonEnumerableProperty$5 = createNonEnumerableProperty$e;
  var defineBuiltIn$4 = defineBuiltIn$k;
  var defineBuiltInAccessor$7 = defineBuiltInAccessor$f;
  var isPrototypeOf$1 = objectIsPrototypeOf;
  var getPrototypeOf$2 = objectGetPrototypeOf$1;
  var setPrototypeOf$2 = objectSetPrototypeOf;
  var wellKnownSymbol$6 = wellKnownSymbol$x;
  var uid = uid$5;
  var InternalStateModule$6 = internalState;

  var enforceInternalState$2 = InternalStateModule$6.enforce;
  var getInternalState$1 = InternalStateModule$6.get;
  var Int8Array$4 = globalThis$h.Int8Array;
  var Int8ArrayPrototype$1 = Int8Array$4 && Int8Array$4.prototype;
  var Uint8ClampedArray$1 = globalThis$h.Uint8ClampedArray;
  var Uint8ClampedArrayPrototype = Uint8ClampedArray$1 && Uint8ClampedArray$1.prototype;
  var TypedArray$1 = Int8Array$4 && getPrototypeOf$2(Int8Array$4);
  var TypedArrayPrototype$2 = Int8ArrayPrototype$1 && getPrototypeOf$2(Int8ArrayPrototype$1);
  var ObjectPrototype$1 = Object.prototype;
  var TypeError$3 = globalThis$h.TypeError;

  var TO_STRING_TAG$2 = wellKnownSymbol$6('toStringTag');
  var TYPED_ARRAY_TAG$1 = uid('TYPED_ARRAY_TAG');
  var TYPED_ARRAY_CONSTRUCTOR = 'TypedArrayConstructor';
  // Fixing native typed arrays in Opera Presto crashes the browser, see #595
  var NATIVE_ARRAY_BUFFER_VIEWS$2 = NATIVE_ARRAY_BUFFER$1 && !!setPrototypeOf$2 && classof$4(globalThis$h.opera) !== 'Opera';
  var TYPED_ARRAY_TAG_REQUIRED = false;
  var NAME, Constructor, Prototype;

  var TypedArrayConstructorsList = {
    Int8Array: 1,
    Uint8Array: 1,
    Uint8ClampedArray: 1,
    Int16Array: 2,
    Uint16Array: 2,
    Int32Array: 4,
    Uint32Array: 4,
    Float32Array: 4,
    Float64Array: 8
  };

  var BigIntArrayConstructorsList = {
    BigInt64Array: 8,
    BigUint64Array: 8
  };

  var isView = function isView(it) {
    if (!isObject$5(it)) return false;
    var klass = classof$4(it);
    return klass === 'DataView'
      || hasOwn$5(TypedArrayConstructorsList, klass)
      || hasOwn$5(BigIntArrayConstructorsList, klass);
  };

  var getTypedArrayConstructor$4 = function (it) {
    var proto = getPrototypeOf$2(it);
    if (!isObject$5(proto)) return;
    var state = getInternalState$1(proto);
    return (state && hasOwn$5(state, TYPED_ARRAY_CONSTRUCTOR)) ? state[TYPED_ARRAY_CONSTRUCTOR] : getTypedArrayConstructor$4(proto);
  };

  var isTypedArray$1 = function (it) {
    if (!isObject$5(it)) return false;
    var klass = classof$4(it);
    return hasOwn$5(TypedArrayConstructorsList, klass)
      || hasOwn$5(BigIntArrayConstructorsList, klass);
  };

  var aTypedArray$r = function (it) {
    if (isTypedArray$1(it)) return it;
    throw new TypeError$3('Target is not a typed array');
  };

  var aTypedArrayConstructor$2 = function (C) {
    if (isCallable$2(C) && (!setPrototypeOf$2 || isPrototypeOf$1(TypedArray$1, C))) return C;
    throw new TypeError$3(tryToString(C) + ' is not a typed array constructor');
  };

  var exportTypedArrayMethod$s = function (KEY, property, forced, options) {
    if (!DESCRIPTORS$9) return;
    if (forced) for (var ARRAY in TypedArrayConstructorsList) {
      var TypedArrayConstructor = globalThis$h[ARRAY];
      if (TypedArrayConstructor && hasOwn$5(TypedArrayConstructor.prototype, KEY)) try {
        delete TypedArrayConstructor.prototype[KEY];
      } catch (error) {
        // old WebKit bug - some methods are non-configurable
        try {
          TypedArrayConstructor.prototype[KEY] = property;
        } catch (error2) { /* empty */ }
      }
    }
    if (!TypedArrayPrototype$2[KEY] || forced) {
      defineBuiltIn$4(TypedArrayPrototype$2, KEY, forced ? property
        : NATIVE_ARRAY_BUFFER_VIEWS$2 && Int8ArrayPrototype$1[KEY] || property, options);
    }
  };

  var exportTypedArrayStaticMethod = function (KEY, property, forced) {
    var ARRAY, TypedArrayConstructor;
    if (!DESCRIPTORS$9) return;
    if (setPrototypeOf$2) {
      if (forced) for (ARRAY in TypedArrayConstructorsList) {
        TypedArrayConstructor = globalThis$h[ARRAY];
        if (TypedArrayConstructor && hasOwn$5(TypedArrayConstructor, KEY)) try {
          delete TypedArrayConstructor[KEY];
        } catch (error) { /* empty */ }
      }
      if (!TypedArray$1[KEY] || forced) {
        // V8 ~ Chrome 49-50 `%TypedArray%` methods are non-writable non-configurable
        try {
          return defineBuiltIn$4(TypedArray$1, KEY, forced ? property : NATIVE_ARRAY_BUFFER_VIEWS$2 && TypedArray$1[KEY] || property);
        } catch (error) { /* empty */ }
      } else return;
    }
    for (ARRAY in TypedArrayConstructorsList) {
      TypedArrayConstructor = globalThis$h[ARRAY];
      if (TypedArrayConstructor && (!TypedArrayConstructor[KEY] || forced)) {
        defineBuiltIn$4(TypedArrayConstructor, KEY, property);
      }
    }
  };

  for (NAME in TypedArrayConstructorsList) {
    Constructor = globalThis$h[NAME];
    Prototype = Constructor && Constructor.prototype;
    if (Prototype) enforceInternalState$2(Prototype)[TYPED_ARRAY_CONSTRUCTOR] = Constructor;
    else NATIVE_ARRAY_BUFFER_VIEWS$2 = false;
  }

  for (NAME in BigIntArrayConstructorsList) {
    Constructor = globalThis$h[NAME];
    Prototype = Constructor && Constructor.prototype;
    if (Prototype) enforceInternalState$2(Prototype)[TYPED_ARRAY_CONSTRUCTOR] = Constructor;
  }

  // WebKit bug - typed arrays constructors prototype is Object.prototype
  if (!NATIVE_ARRAY_BUFFER_VIEWS$2 || !isCallable$2(TypedArray$1) || TypedArray$1 === Function.prototype) {
    // eslint-disable-next-line no-shadow -- safe
    TypedArray$1 = function TypedArray() {
      throw new TypeError$3('Incorrect invocation');
    };
    if (NATIVE_ARRAY_BUFFER_VIEWS$2) for (NAME in TypedArrayConstructorsList) {
      if (globalThis$h[NAME]) setPrototypeOf$2(globalThis$h[NAME], TypedArray$1);
    }
  }

  if (!NATIVE_ARRAY_BUFFER_VIEWS$2 || !TypedArrayPrototype$2 || TypedArrayPrototype$2 === ObjectPrototype$1) {
    TypedArrayPrototype$2 = TypedArray$1.prototype;
    if (NATIVE_ARRAY_BUFFER_VIEWS$2) for (NAME in TypedArrayConstructorsList) {
      if (globalThis$h[NAME]) setPrototypeOf$2(globalThis$h[NAME].prototype, TypedArrayPrototype$2);
    }
  }

  // WebKit bug - one more object in Uint8ClampedArray prototype chain
  if (NATIVE_ARRAY_BUFFER_VIEWS$2 && getPrototypeOf$2(Uint8ClampedArrayPrototype) !== TypedArrayPrototype$2) {
    setPrototypeOf$2(Uint8ClampedArrayPrototype, TypedArrayPrototype$2);
  }

  if (DESCRIPTORS$9 && !hasOwn$5(TypedArrayPrototype$2, TO_STRING_TAG$2)) {
    TYPED_ARRAY_TAG_REQUIRED = true;
    defineBuiltInAccessor$7(TypedArrayPrototype$2, TO_STRING_TAG$2, {
      configurable: true,
      get: function () {
        return isObject$5(this) ? this[TYPED_ARRAY_TAG$1] : undefined;
      }
    });
    for (NAME in TypedArrayConstructorsList) if (globalThis$h[NAME]) {
      createNonEnumerableProperty$5(globalThis$h[NAME], TYPED_ARRAY_TAG$1, NAME);
    }
  }

  var arrayBufferViewCore = {
    NATIVE_ARRAY_BUFFER_VIEWS: NATIVE_ARRAY_BUFFER_VIEWS$2,
    TYPED_ARRAY_TAG: TYPED_ARRAY_TAG_REQUIRED && TYPED_ARRAY_TAG$1,
    aTypedArray: aTypedArray$r,
    aTypedArrayConstructor: aTypedArrayConstructor$2,
    exportTypedArrayMethod: exportTypedArrayMethod$s,
    exportTypedArrayStaticMethod: exportTypedArrayStaticMethod,
    getTypedArrayConstructor: getTypedArrayConstructor$4,
    isView: isView,
    isTypedArray: isTypedArray$1,
    TypedArray: TypedArray$1,
    TypedArrayPrototype: TypedArrayPrototype$2
  };

  /* eslint-disable no-new, sonar/inconsistent-function-call -- required for testing */
  var globalThis$g = globalThis_1;
  var fails$c = fails$Y;
  var checkCorrectnessOfIteration = checkCorrectnessOfIteration$4;
  var NATIVE_ARRAY_BUFFER_VIEWS$1 = arrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS;

  var ArrayBuffer$2 = globalThis$g.ArrayBuffer;
  var Int8Array$3 = globalThis$g.Int8Array;

  var typedArrayConstructorsRequireWrappers = !NATIVE_ARRAY_BUFFER_VIEWS$1 || !fails$c(function () {
    Int8Array$3(1);
  }) || !fails$c(function () {
    new Int8Array$3(-1);
  }) || !checkCorrectnessOfIteration(function (iterable) {
    new Int8Array$3();
    new Int8Array$3(null);
    new Int8Array$3(1.5);
    new Int8Array$3(iterable);
  }, true) || fails$c(function () {
    // Safari (11+) bug - a reason why even Safari 13 should load a typed array polyfill
    return new Int8Array$3(new ArrayBuffer$2(2), 1, undefined).length !== 1;
  });

  // `Math.sign` method implementation
  // https://tc39.es/ecma262/#sec-math.sign
  // eslint-disable-next-line es/no-math-sign -- safe
  var mathSign = Math.sign || function sign(x) {
    var n = +x;
    // eslint-disable-next-line no-self-compare -- NaN check
    return n === 0 || n !== n ? n : n < 0 ? -1 : 1;
  };

  var sign = mathSign;

  var abs$1 = Math.abs;

  var EPSILON = 2.220446049250313e-16; // Number.EPSILON
  var INVERSE_EPSILON = 1 / EPSILON;

  var roundTiesToEven = function (n) {
    return n + INVERSE_EPSILON - INVERSE_EPSILON;
  };

  var mathFloatRound = function (x, FLOAT_EPSILON, FLOAT_MAX_VALUE, FLOAT_MIN_VALUE) {
    var n = +x;
    var absolute = abs$1(n);
    var s = sign(n);
    if (absolute < FLOAT_MIN_VALUE) return s * roundTiesToEven(absolute / FLOAT_MIN_VALUE / FLOAT_EPSILON) * FLOAT_MIN_VALUE * FLOAT_EPSILON;
    var a = (1 + FLOAT_EPSILON / EPSILON) * absolute;
    var result = a - (a - absolute);
    // eslint-disable-next-line no-self-compare -- NaN check
    if (result > FLOAT_MAX_VALUE || result !== result) return s * Infinity;
    return s * result;
  };

  var floatRound = mathFloatRound;

  var FLOAT32_EPSILON = 1.1920928955078125e-7; // 2 ** -23;
  var FLOAT32_MAX_VALUE = 3.4028234663852886e+38; // 2 ** 128 - 2 ** 104
  var FLOAT32_MIN_VALUE = 1.1754943508222875e-38; // 2 ** -126;

  // `Math.fround` method implementation
  // https://tc39.es/ecma262/#sec-math.fround
  // eslint-disable-next-line es/no-math-fround -- safe
  var mathFround = Math.fround || function fround(x) {
    return floatRound(x, FLOAT32_EPSILON, FLOAT32_MAX_VALUE, FLOAT32_MIN_VALUE);
  };

  // IEEE754 conversions based on https://github.com/feross/ieee754
  var $Array = Array;
  var abs = Math.abs;
  var pow$1 = Math.pow;
  var floor$4 = Math.floor;
  var log = Math.log;
  var LN2 = Math.LN2;

  var pack = function (number, mantissaLength, bytes) {
    var buffer = $Array(bytes);
    var exponentLength = bytes * 8 - mantissaLength - 1;
    var eMax = (1 << exponentLength) - 1;
    var eBias = eMax >> 1;
    var rt = mantissaLength === 23 ? pow$1(2, -24) - pow$1(2, -77) : 0;
    var sign = number < 0 || number === 0 && 1 / number < 0 ? 1 : 0;
    var index = 0;
    var exponent, mantissa, c;
    number = abs(number);
    // eslint-disable-next-line no-self-compare -- NaN check
    if (number !== number || number === Infinity) {
      // eslint-disable-next-line no-self-compare -- NaN check
      mantissa = number !== number ? 1 : 0;
      exponent = eMax;
    } else {
      exponent = floor$4(log(number) / LN2);
      c = pow$1(2, -exponent);
      if (number * c < 1) {
        exponent--;
        c *= 2;
      }
      if (exponent + eBias >= 1) {
        number += rt / c;
      } else {
        number += rt * pow$1(2, 1 - eBias);
      }
      if (number * c >= 2) {
        exponent++;
        c /= 2;
      }
      if (exponent + eBias >= eMax) {
        mantissa = 0;
        exponent = eMax;
      } else if (exponent + eBias >= 1) {
        mantissa = (number * c - 1) * pow$1(2, mantissaLength);
        exponent += eBias;
      } else {
        mantissa = number * pow$1(2, eBias - 1) * pow$1(2, mantissaLength);
        exponent = 0;
      }
    }
    while (mantissaLength >= 8) {
      buffer[index++] = mantissa & 255;
      mantissa /= 256;
      mantissaLength -= 8;
    }
    exponent = exponent << mantissaLength | mantissa;
    exponentLength += mantissaLength;
    while (exponentLength > 0) {
      buffer[index++] = exponent & 255;
      exponent /= 256;
      exponentLength -= 8;
    }
    buffer[index - 1] |= sign * 128;
    return buffer;
  };

  var unpack = function (buffer, mantissaLength) {
    var bytes = buffer.length;
    var exponentLength = bytes * 8 - mantissaLength - 1;
    var eMax = (1 << exponentLength) - 1;
    var eBias = eMax >> 1;
    var nBits = exponentLength - 7;
    var index = bytes - 1;
    var sign = buffer[index--];
    var exponent = sign & 127;
    var mantissa;
    sign >>= 7;
    while (nBits > 0) {
      exponent = exponent * 256 + buffer[index--];
      nBits -= 8;
    }
    mantissa = exponent & (1 << -nBits) - 1;
    exponent >>= -nBits;
    nBits += mantissaLength;
    while (nBits > 0) {
      mantissa = mantissa * 256 + buffer[index--];
      nBits -= 8;
    }
    if (exponent === 0) {
      exponent = 1 - eBias;
    } else if (exponent === eMax) {
      return mantissa ? NaN : sign ? -Infinity : Infinity;
    } else {
      mantissa += pow$1(2, mantissaLength);
      exponent -= eBias;
    } return (sign ? -1 : 1) * mantissa * pow$1(2, exponent - mantissaLength);
  };

  var ieee754 = {
    pack: pack,
    unpack: unpack
  };

  var globalThis$f = globalThis_1;
  var uncurryThis$g = functionUncurryThis;
  var DESCRIPTORS$8 = descriptors;
  var NATIVE_ARRAY_BUFFER = arrayBufferBasicDetection;
  var FunctionName = functionName;
  var createNonEnumerableProperty$4 = createNonEnumerableProperty$e;
  var defineBuiltInAccessor$6 = defineBuiltInAccessor$f;
  var defineBuiltIns$4 = defineBuiltIns$6;
  var fails$b = fails$Y;
  var anInstance$5 = anInstance$9;
  var toIntegerOrInfinity$5 = toIntegerOrInfinity$f;
  var toLength$1 = toLength$9;
  var toIndex$1 = toIndex$3;
  var fround = mathFround;
  var IEEE754 = ieee754;
  var getPrototypeOf$1 = objectGetPrototypeOf$1;
  var setPrototypeOf$1 = objectSetPrototypeOf;
  var arrayFill = arrayFill$1;
  var arraySlice$3 = arraySlice$9;
  var inheritIfRequired$1 = inheritIfRequired$6;
  var copyConstructorProperties = copyConstructorProperties$5;
  var setToStringTag$3 = setToStringTag$d;
  var InternalStateModule$5 = internalState;

  var PROPER_FUNCTION_NAME = FunctionName.PROPER;
  var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
  var ARRAY_BUFFER = 'ArrayBuffer';
  var DATA_VIEW = 'DataView';
  var PROTOTYPE = 'prototype';
  var WRONG_LENGTH$1 = 'Wrong length';
  var WRONG_INDEX = 'Wrong index';
  var getInternalArrayBufferState = InternalStateModule$5.getterFor(ARRAY_BUFFER);
  var getInternalDataViewState = InternalStateModule$5.getterFor(DATA_VIEW);
  var setInternalState$5 = InternalStateModule$5.set;
  var NativeArrayBuffer = globalThis$f[ARRAY_BUFFER];
  var $ArrayBuffer = NativeArrayBuffer;
  var ArrayBufferPrototype$1 = $ArrayBuffer && $ArrayBuffer[PROTOTYPE];
  var $DataView = globalThis$f[DATA_VIEW];
  var DataViewPrototype = $DataView && $DataView[PROTOTYPE];
  var ObjectPrototype = Object.prototype;
  var Array$1 = globalThis$f.Array;
  var RangeError$3 = globalThis$f.RangeError;
  var fill = uncurryThis$g(arrayFill);
  var reverse = uncurryThis$g([].reverse);

  var packIEEE754 = IEEE754.pack;
  var unpackIEEE754 = IEEE754.unpack;

  var packInt8 = function (number) {
    return [number & 0xFF];
  };

  var packInt16 = function (number) {
    return [number & 0xFF, number >> 8 & 0xFF];
  };

  var packInt32 = function (number) {
    return [number & 0xFF, number >> 8 & 0xFF, number >> 16 & 0xFF, number >> 24 & 0xFF];
  };

  var unpackInt32 = function (buffer) {
    return buffer[3] << 24 | buffer[2] << 16 | buffer[1] << 8 | buffer[0];
  };

  var packFloat32 = function (number) {
    return packIEEE754(fround(number), 23, 4);
  };

  var packFloat64 = function (number) {
    return packIEEE754(number, 52, 8);
  };

  var addGetter$1 = function (Constructor, key, getInternalState) {
    defineBuiltInAccessor$6(Constructor[PROTOTYPE], key, {
      configurable: true,
      get: function () {
        return getInternalState(this)[key];
      }
    });
  };

  var get = function (view, count, index, isLittleEndian) {
    var store = getInternalDataViewState(view);
    var intIndex = toIndex$1(index);
    var boolIsLittleEndian = !!isLittleEndian;
    if (intIndex + count > store.byteLength) throw new RangeError$3(WRONG_INDEX);
    var bytes = store.bytes;
    var start = intIndex + store.byteOffset;
    var pack = arraySlice$3(bytes, start, start + count);
    return boolIsLittleEndian ? pack : reverse(pack);
  };

  var set = function (view, count, index, conversion, value, isLittleEndian) {
    var store = getInternalDataViewState(view);
    var intIndex = toIndex$1(index);
    var pack = conversion(+value);
    var boolIsLittleEndian = !!isLittleEndian;
    if (intIndex + count > store.byteLength) throw new RangeError$3(WRONG_INDEX);
    var bytes = store.bytes;
    var start = intIndex + store.byteOffset;
    for (var i = 0; i < count; i++) bytes[start + i] = pack[boolIsLittleEndian ? i : count - i - 1];
  };

  if (!NATIVE_ARRAY_BUFFER) {
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance$5(this, ArrayBufferPrototype$1);
      var byteLength = toIndex$1(length);
      setInternalState$5(this, {
        type: ARRAY_BUFFER,
        bytes: fill(Array$1(byteLength), 0),
        byteLength: byteLength
      });
      if (!DESCRIPTORS$8) {
        this.byteLength = byteLength;
        this.detached = false;
      }
    };

    ArrayBufferPrototype$1 = $ArrayBuffer[PROTOTYPE];

    $DataView = function DataView(buffer, byteOffset, byteLength) {
      anInstance$5(this, DataViewPrototype);
      anInstance$5(buffer, ArrayBufferPrototype$1);
      var bufferState = getInternalArrayBufferState(buffer);
      var bufferLength = bufferState.byteLength;
      var offset = toIntegerOrInfinity$5(byteOffset);
      if (offset < 0 || offset > bufferLength) throw new RangeError$3('Wrong offset');
      byteLength = byteLength === undefined ? bufferLength - offset : toLength$1(byteLength);
      if (offset + byteLength > bufferLength) throw new RangeError$3(WRONG_LENGTH$1);
      setInternalState$5(this, {
        type: DATA_VIEW,
        buffer: buffer,
        byteLength: byteLength,
        byteOffset: offset,
        bytes: bufferState.bytes
      });
      if (!DESCRIPTORS$8) {
        this.buffer = buffer;
        this.byteLength = byteLength;
        this.byteOffset = offset;
      }
    };

    DataViewPrototype = $DataView[PROTOTYPE];

    if (DESCRIPTORS$8) {
      addGetter$1($ArrayBuffer, 'byteLength', getInternalArrayBufferState);
      addGetter$1($DataView, 'buffer', getInternalDataViewState);
      addGetter$1($DataView, 'byteLength', getInternalDataViewState);
      addGetter$1($DataView, 'byteOffset', getInternalDataViewState);
    }

    defineBuiltIns$4(DataViewPrototype, {
      getInt8: function getInt8(byteOffset) {
        return get(this, 1, byteOffset)[0] << 24 >> 24;
      },
      getUint8: function getUint8(byteOffset) {
        return get(this, 1, byteOffset)[0];
      },
      getInt16: function getInt16(byteOffset /* , littleEndian */) {
        var bytes = get(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : false);
        return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
      },
      getUint16: function getUint16(byteOffset /* , littleEndian */) {
        var bytes = get(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : false);
        return bytes[1] << 8 | bytes[0];
      },
      getInt32: function getInt32(byteOffset /* , littleEndian */) {
        return unpackInt32(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : false));
      },
      getUint32: function getUint32(byteOffset /* , littleEndian */) {
        return unpackInt32(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : false)) >>> 0;
      },
      getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
        return unpackIEEE754(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : false), 23);
      },
      getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
        return unpackIEEE754(get(this, 8, byteOffset, arguments.length > 1 ? arguments[1] : false), 52);
      },
      setInt8: function setInt8(byteOffset, value) {
        set(this, 1, byteOffset, packInt8, value);
      },
      setUint8: function setUint8(byteOffset, value) {
        set(this, 1, byteOffset, packInt8, value);
      },
      setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
        set(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : false);
      },
      setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
        set(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : false);
      },
      setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
        set(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : false);
      },
      setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
        set(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : false);
      },
      setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
        set(this, 4, byteOffset, packFloat32, value, arguments.length > 2 ? arguments[2] : false);
      },
      setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
        set(this, 8, byteOffset, packFloat64, value, arguments.length > 2 ? arguments[2] : false);
      }
    });
  } else {
    var INCORRECT_ARRAY_BUFFER_NAME = PROPER_FUNCTION_NAME && NativeArrayBuffer.name !== ARRAY_BUFFER;
    /* eslint-disable no-new, sonar/inconsistent-function-call -- required for testing */
    if (!fails$b(function () {
      NativeArrayBuffer(1);
    }) || !fails$b(function () {
      new NativeArrayBuffer(-1);
    }) || fails$b(function () {
      new NativeArrayBuffer();
      new NativeArrayBuffer(1.5);
      new NativeArrayBuffer(NaN);
      return NativeArrayBuffer.length !== 1 || INCORRECT_ARRAY_BUFFER_NAME && !CONFIGURABLE_FUNCTION_NAME;
    })) {
      /* eslint-enable no-new, sonar/inconsistent-function-call -- required for testing */
      $ArrayBuffer = function ArrayBuffer(length) {
        anInstance$5(this, ArrayBufferPrototype$1);
        return inheritIfRequired$1(new NativeArrayBuffer(toIndex$1(length)), this, $ArrayBuffer);
      };

      $ArrayBuffer[PROTOTYPE] = ArrayBufferPrototype$1;

      ArrayBufferPrototype$1.constructor = $ArrayBuffer;

      copyConstructorProperties($ArrayBuffer, NativeArrayBuffer);
    } else if (INCORRECT_ARRAY_BUFFER_NAME && CONFIGURABLE_FUNCTION_NAME) {
      createNonEnumerableProperty$4(NativeArrayBuffer, 'name', ARRAY_BUFFER);
    }

    // WebKit bug - the same parent prototype for typed arrays and data view
    if (setPrototypeOf$1 && getPrototypeOf$1(DataViewPrototype) !== ObjectPrototype) {
      setPrototypeOf$1(DataViewPrototype, ObjectPrototype);
    }

    // iOS Safari 7.x bug
    var testView = new $DataView(new $ArrayBuffer(2));
    var $setInt8 = uncurryThis$g(DataViewPrototype.setInt8);
    testView.setInt8(0, 2147483648);
    testView.setInt8(1, 2147483649);
    if (testView.getInt8(0) || !testView.getInt8(1)) defineBuiltIns$4(DataViewPrototype, {
      setInt8: function setInt8(byteOffset, value) {
        $setInt8(this, byteOffset, value << 24 >> 24);
      },
      setUint8: function setUint8(byteOffset, value) {
        $setInt8(this, byteOffset, value << 24 >> 24);
      }
    }, { unsafe: true });
  }

  setToStringTag$3($ArrayBuffer, ARRAY_BUFFER);
  setToStringTag$3($DataView, DATA_VIEW);

  var arrayBuffer = {
    ArrayBuffer: $ArrayBuffer,
    DataView: $DataView
  };

  var isObject$4 = isObject$s;

  var floor$3 = Math.floor;

  // `IsIntegralNumber` abstract operation
  // https://tc39.es/ecma262/#sec-isintegralnumber
  // eslint-disable-next-line es/no-number-isinteger -- safe
  var isIntegralNumber$1 = Number.isInteger || function isInteger(it) {
    return !isObject$4(it) && isFinite(it) && floor$3(it) === it;
  };

  var toIntegerOrInfinity$4 = toIntegerOrInfinity$f;

  var $RangeError$4 = RangeError;

  var toPositiveInteger$1 = function (it) {
    var result = toIntegerOrInfinity$4(it);
    if (result < 0) throw new $RangeError$4("The argument can't be less than 0");
    return result;
  };

  var toPositiveInteger = toPositiveInteger$1;

  var $RangeError$3 = RangeError;

  var toOffset$2 = function (it, BYTES) {
    var offset = toPositiveInteger(it);
    if (offset % BYTES) throw new $RangeError$3('Wrong offset');
    return offset;
  };

  var round = Math.round;

  var toUint8Clamped$1 = function (it) {
    var value = round(it);
    return value < 0 ? 0 : value > 0xFF ? 0xFF : value & 0xFF;
  };

  var classof$3 = classof$j;

  var isBigIntArray$2 = function (it) {
    var klass = classof$3(it);
    return klass === 'BigInt64Array' || klass === 'BigUint64Array';
  };

  var toPrimitive = toPrimitive$3;

  var $TypeError$3 = TypeError;

  // `ToBigInt` abstract operation
  // https://tc39.es/ecma262/#sec-tobigint
  var toBigInt$3 = function (argument) {
    var prim = toPrimitive(argument, 'number');
    if (typeof prim == 'number') throw new $TypeError$3("Can't convert number to bigint");
    // eslint-disable-next-line es/no-bigint -- safe
    return BigInt(prim);
  };

  var bind$3 = functionBindContext;
  var call$8 = functionCall;
  var aConstructor = aConstructor$3;
  var toObject$2 = toObject$k;
  var lengthOfArrayLike$8 = lengthOfArrayLike$n;
  var getIterator$1 = getIterator$4;
  var getIteratorMethod$1 = getIteratorMethod$5;
  var isArrayIteratorMethod = isArrayIteratorMethod$3;
  var isBigIntArray$1 = isBigIntArray$2;
  var aTypedArrayConstructor$1 = arrayBufferViewCore.aTypedArrayConstructor;
  var toBigInt$2 = toBigInt$3;

  var typedArrayFrom$1 = function from(source /* , mapfn, thisArg */) {
    var C = aConstructor(this);
    var O = toObject$2(source);
    var argumentsLength = arguments.length;
    var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var iteratorMethod = getIteratorMethod$1(O);
    var i, length, result, thisIsBigIntArray, value, step, iterator, next;
    if (iteratorMethod && !isArrayIteratorMethod(iteratorMethod)) {
      iterator = getIterator$1(O, iteratorMethod);
      next = iterator.next;
      O = [];
      while (!(step = call$8(next, iterator)).done) {
        O.push(step.value);
      }
    }
    if (mapping && argumentsLength > 2) {
      mapfn = bind$3(mapfn, arguments[2]);
    }
    length = lengthOfArrayLike$8(O);
    result = new (aTypedArrayConstructor$1(C))(length);
    thisIsBigIntArray = isBigIntArray$1(result);
    for (i = 0; length > i; i++) {
      value = mapping ? mapfn(O[i], i) : O[i];
      // FF30- typed arrays doesn't properly convert objects to typed array values
      result[i] = thisIsBigIntArray ? toBigInt$2(value) : +value;
    }
    return result;
  };

  var lengthOfArrayLike$7 = lengthOfArrayLike$n;

  var arrayFromConstructorAndList$3 = function (Constructor, list, $length) {
    var index = 0;
    var length = arguments.length > 2 ? $length : lengthOfArrayLike$7(list);
    var result = new Constructor(length);
    while (length > index) result[index] = list[index++];
    return result;
  };

  var $$f = _export;
  var globalThis$e = globalThis_1;
  var call$7 = functionCall;
  var DESCRIPTORS$7 = descriptors;
  var TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS = typedArrayConstructorsRequireWrappers;
  var ArrayBufferViewCore$s = arrayBufferViewCore;
  var ArrayBufferModule = arrayBuffer;
  var anInstance$4 = anInstance$9;
  var createPropertyDescriptor$1 = createPropertyDescriptor$8;
  var createNonEnumerableProperty$3 = createNonEnumerableProperty$e;
  var isIntegralNumber = isIntegralNumber$1;
  var toLength = toLength$9;
  var toIndex = toIndex$3;
  var toOffset$1 = toOffset$2;
  var toUint8Clamped = toUint8Clamped$1;
  var toPropertyKey = toPropertyKey$4;
  var hasOwn$4 = hasOwnProperty_1;
  var classof$2 = classof$j;
  var isObject$3 = isObject$s;
  var isSymbol = isSymbol$6;
  var create$2 = objectCreate;
  var isPrototypeOf = objectIsPrototypeOf;
  var setPrototypeOf = objectSetPrototypeOf;
  var getOwnPropertyNames = objectGetOwnPropertyNames.f;
  var typedArrayFrom = typedArrayFrom$1;
  var forEach$3 = arrayIteration.forEach;
  var setSpecies = setSpecies$4;
  var defineBuiltInAccessor$5 = defineBuiltInAccessor$f;
  var definePropertyModule = objectDefineProperty;
  var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
  var arrayFromConstructorAndList$2 = arrayFromConstructorAndList$3;
  var InternalStateModule$4 = internalState;
  var inheritIfRequired = inheritIfRequired$6;

  var getInternalState = InternalStateModule$4.get;
  var setInternalState$4 = InternalStateModule$4.set;
  var enforceInternalState$1 = InternalStateModule$4.enforce;
  var nativeDefineProperty = definePropertyModule.f;
  var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  var RangeError$2 = globalThis$e.RangeError;
  var ArrayBuffer$1 = ArrayBufferModule.ArrayBuffer;
  var ArrayBufferPrototype = ArrayBuffer$1.prototype;
  var DataView$1 = ArrayBufferModule.DataView;
  var NATIVE_ARRAY_BUFFER_VIEWS = ArrayBufferViewCore$s.NATIVE_ARRAY_BUFFER_VIEWS;
  var TYPED_ARRAY_TAG = ArrayBufferViewCore$s.TYPED_ARRAY_TAG;
  var TypedArray = ArrayBufferViewCore$s.TypedArray;
  var TypedArrayPrototype$1 = ArrayBufferViewCore$s.TypedArrayPrototype;
  var isTypedArray = ArrayBufferViewCore$s.isTypedArray;
  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
  var WRONG_LENGTH = 'Wrong length';

  var addGetter = function (it, key) {
    defineBuiltInAccessor$5(it, key, {
      configurable: true,
      get: function () {
        return getInternalState(this)[key];
      }
    });
  };

  var isArrayBuffer = function (it) {
    var klass;
    return isPrototypeOf(ArrayBufferPrototype, it) || (klass = classof$2(it)) === 'ArrayBuffer' || klass === 'SharedArrayBuffer';
  };

  var isTypedArrayIndex = function (target, key) {
    return isTypedArray(target)
      && !isSymbol(key)
      && key in target
      && isIntegralNumber(+key)
      && key >= 0;
  };

  var wrappedGetOwnPropertyDescriptor = function getOwnPropertyDescriptor(target, key) {
    key = toPropertyKey(key);
    return isTypedArrayIndex(target, key)
      ? createPropertyDescriptor$1(2, target[key])
      : nativeGetOwnPropertyDescriptor(target, key);
  };

  var wrappedDefineProperty = function defineProperty(target, key, descriptor) {
    key = toPropertyKey(key);
    if (isTypedArrayIndex(target, key)
      && isObject$3(descriptor)
      && hasOwn$4(descriptor, 'value')
      && !hasOwn$4(descriptor, 'get')
      && !hasOwn$4(descriptor, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !descriptor.configurable
      && (!hasOwn$4(descriptor, 'writable') || descriptor.writable)
      && (!hasOwn$4(descriptor, 'enumerable') || descriptor.enumerable)
    ) {
      target[key] = descriptor.value;
      return target;
    } return nativeDefineProperty(target, key, descriptor);
  };

  if (DESCRIPTORS$7) {
    if (!NATIVE_ARRAY_BUFFER_VIEWS) {
      getOwnPropertyDescriptorModule.f = wrappedGetOwnPropertyDescriptor;
      definePropertyModule.f = wrappedDefineProperty;
      addGetter(TypedArrayPrototype$1, 'buffer');
      addGetter(TypedArrayPrototype$1, 'byteOffset');
      addGetter(TypedArrayPrototype$1, 'byteLength');
      addGetter(TypedArrayPrototype$1, 'length');
    }

    $$f({ target: 'Object', stat: true, forced: !NATIVE_ARRAY_BUFFER_VIEWS }, {
      getOwnPropertyDescriptor: wrappedGetOwnPropertyDescriptor,
      defineProperty: wrappedDefineProperty
    });

    typedArrayConstructor.exports = function (TYPE, wrapper, CLAMPED) {
      var BYTES = TYPE.match(/\d+/)[0] / 8;
      var CONSTRUCTOR_NAME = TYPE + (CLAMPED ? 'Clamped' : '') + 'Array';
      var GETTER = 'get' + TYPE;
      var SETTER = 'set' + TYPE;
      var NativeTypedArrayConstructor = globalThis$e[CONSTRUCTOR_NAME];
      var TypedArrayConstructor = NativeTypedArrayConstructor;
      var TypedArrayConstructorPrototype = TypedArrayConstructor && TypedArrayConstructor.prototype;
      var exported = {};

      var getter = function (that, index) {
        var data = getInternalState(that);
        return data.view[GETTER](index * BYTES + data.byteOffset, true);
      };

      var setter = function (that, index, value) {
        var data = getInternalState(that);
        data.view[SETTER](index * BYTES + data.byteOffset, CLAMPED ? toUint8Clamped(value) : value, true);
      };

      var addElement = function (that, index) {
        nativeDefineProperty(that, index, {
          get: function () {
            return getter(this, index);
          },
          set: function (value) {
            return setter(this, index, value);
          },
          enumerable: true
        });
      };

      if (!NATIVE_ARRAY_BUFFER_VIEWS) {
        TypedArrayConstructor = wrapper(function (that, data, offset, $length) {
          anInstance$4(that, TypedArrayConstructorPrototype);
          var index = 0;
          var byteOffset = 0;
          var buffer, byteLength, length;
          if (!isObject$3(data)) {
            length = toIndex(data);
            byteLength = length * BYTES;
            buffer = new ArrayBuffer$1(byteLength);
          } else if (isArrayBuffer(data)) {
            buffer = data;
            byteOffset = toOffset$1(offset, BYTES);
            var $len = data.byteLength;
            if ($length === undefined) {
              if ($len % BYTES) throw new RangeError$2(WRONG_LENGTH);
              byteLength = $len - byteOffset;
              if (byteLength < 0) throw new RangeError$2(WRONG_LENGTH);
            } else {
              byteLength = toLength($length) * BYTES;
              if (byteLength + byteOffset > $len) throw new RangeError$2(WRONG_LENGTH);
            }
            length = byteLength / BYTES;
          } else if (isTypedArray(data)) {
            return arrayFromConstructorAndList$2(TypedArrayConstructor, data);
          } else {
            return call$7(typedArrayFrom, TypedArrayConstructor, data);
          }
          setInternalState$4(that, {
            buffer: buffer,
            byteOffset: byteOffset,
            byteLength: byteLength,
            length: length,
            view: new DataView$1(buffer)
          });
          while (index < length) addElement(that, index++);
        });

        if (setPrototypeOf) setPrototypeOf(TypedArrayConstructor, TypedArray);
        TypedArrayConstructorPrototype = TypedArrayConstructor.prototype = create$2(TypedArrayPrototype$1);
      } else if (TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS) {
        TypedArrayConstructor = wrapper(function (dummy, data, typedArrayOffset, $length) {
          anInstance$4(dummy, TypedArrayConstructorPrototype);
          return inheritIfRequired(function () {
            if (!isObject$3(data)) return new NativeTypedArrayConstructor(toIndex(data));
            if (isArrayBuffer(data)) return $length !== undefined
              ? new NativeTypedArrayConstructor(data, toOffset$1(typedArrayOffset, BYTES), $length)
              : typedArrayOffset !== undefined
                ? new NativeTypedArrayConstructor(data, toOffset$1(typedArrayOffset, BYTES))
                : new NativeTypedArrayConstructor(data);
            if (isTypedArray(data)) return arrayFromConstructorAndList$2(TypedArrayConstructor, data);
            return call$7(typedArrayFrom, TypedArrayConstructor, data);
          }(), dummy, TypedArrayConstructor);
        });

        if (setPrototypeOf) setPrototypeOf(TypedArrayConstructor, TypedArray);
        forEach$3(getOwnPropertyNames(NativeTypedArrayConstructor), function (key) {
          if (!(key in TypedArrayConstructor)) {
            createNonEnumerableProperty$3(TypedArrayConstructor, key, NativeTypedArrayConstructor[key]);
          }
        });
        TypedArrayConstructor.prototype = TypedArrayConstructorPrototype;
      }

      if (TypedArrayConstructorPrototype.constructor !== TypedArrayConstructor) {
        createNonEnumerableProperty$3(TypedArrayConstructorPrototype, 'constructor', TypedArrayConstructor);
      }

      enforceInternalState$1(TypedArrayConstructorPrototype).TypedArrayConstructor = TypedArrayConstructor;

      if (TYPED_ARRAY_TAG) {
        createNonEnumerableProperty$3(TypedArrayConstructorPrototype, TYPED_ARRAY_TAG, CONSTRUCTOR_NAME);
      }

      var FORCED = TypedArrayConstructor !== NativeTypedArrayConstructor;

      exported[CONSTRUCTOR_NAME] = TypedArrayConstructor;

      $$f({ global: true, constructor: true, forced: FORCED, sham: !NATIVE_ARRAY_BUFFER_VIEWS }, exported);

      if (!(BYTES_PER_ELEMENT in TypedArrayConstructor)) {
        createNonEnumerableProperty$3(TypedArrayConstructor, BYTES_PER_ELEMENT, BYTES);
      }

      if (!(BYTES_PER_ELEMENT in TypedArrayConstructorPrototype)) {
        createNonEnumerableProperty$3(TypedArrayConstructorPrototype, BYTES_PER_ELEMENT, BYTES);
      }

      setSpecies(CONSTRUCTOR_NAME);
    };
  } else typedArrayConstructor.exports = function () { /* empty */ };

  var typedArrayConstructorExports = typedArrayConstructor.exports;

  var createTypedArrayConstructor$5 = typedArrayConstructorExports;

  // `Float32Array` constructor
  // https://tc39.es/ecma262/#sec-typedarray-objects
  createTypedArrayConstructor$5('Float32', function (init) {
    return function Float32Array(data, byteOffset, length) {
      return init(this, data, byteOffset, length);
    };
  });

  var createTypedArrayConstructor$4 = typedArrayConstructorExports;

  // `Int32Array` constructor
  // https://tc39.es/ecma262/#sec-typedarray-objects
  createTypedArrayConstructor$4('Int32', function (init) {
    return function Int32Array(data, byteOffset, length) {
      return init(this, data, byteOffset, length);
    };
  });

  var createTypedArrayConstructor$3 = typedArrayConstructorExports;

  // `Uint8Array` constructor
  // https://tc39.es/ecma262/#sec-typedarray-objects
  createTypedArrayConstructor$3('Uint8', function (init) {
    return function Uint8Array(data, byteOffset, length) {
      return init(this, data, byteOffset, length);
    };
  });

  var createTypedArrayConstructor$2 = typedArrayConstructorExports;

  // `Uint8ClampedArray` constructor
  // https://tc39.es/ecma262/#sec-typedarray-objects
  createTypedArrayConstructor$2('Uint8', function (init) {
    return function Uint8ClampedArray(data, byteOffset, length) {
      return init(this, data, byteOffset, length);
    };
  }, true);

  var createTypedArrayConstructor$1 = typedArrayConstructorExports;

  // `Uint16Array` constructor
  // https://tc39.es/ecma262/#sec-typedarray-objects
  createTypedArrayConstructor$1('Uint16', function (init) {
    return function Uint16Array(data, byteOffset, length) {
      return init(this, data, byteOffset, length);
    };
  });

  var createTypedArrayConstructor = typedArrayConstructorExports;

  // `Uint32Array` constructor
  // https://tc39.es/ecma262/#sec-typedarray-objects
  createTypedArrayConstructor('Uint32', function (init) {
    return function Uint32Array(data, byteOffset, length) {
      return init(this, data, byteOffset, length);
    };
  });

  var ArrayBufferViewCore$r = arrayBufferViewCore;
  var lengthOfArrayLike$6 = lengthOfArrayLike$n;
  var toIntegerOrInfinity$3 = toIntegerOrInfinity$f;

  var aTypedArray$q = ArrayBufferViewCore$r.aTypedArray;
  var exportTypedArrayMethod$r = ArrayBufferViewCore$r.exportTypedArrayMethod;

  // `%TypedArray%.prototype.at` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.at
  exportTypedArrayMethod$r('at', function at(index) {
    var O = aTypedArray$q(this);
    var len = lengthOfArrayLike$6(O);
    var relativeIndex = toIntegerOrInfinity$3(index);
    var k = relativeIndex >= 0 ? relativeIndex : len + relativeIndex;
    return (k < 0 || k >= len) ? undefined : O[k];
  });

  var toObject$1 = toObject$k;
  var toAbsoluteIndex$1 = toAbsoluteIndex$6;
  var lengthOfArrayLike$5 = lengthOfArrayLike$n;
  var deletePropertyOrThrow = deletePropertyOrThrow$4;

  var min$1 = Math.min;

  // `Array.prototype.copyWithin` method implementation
  // https://tc39.es/ecma262/#sec-array.prototype.copywithin
  // eslint-disable-next-line es/no-array-prototype-copywithin -- safe
  var arrayCopyWithin = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
    var O = toObject$1(this);
    var len = lengthOfArrayLike$5(O);
    var to = toAbsoluteIndex$1(target, len);
    var from = toAbsoluteIndex$1(start, len);
    var end = arguments.length > 2 ? arguments[2] : undefined;
    var count = min$1((end === undefined ? len : toAbsoluteIndex$1(end, len)) - from, len - to);
    var inc = 1;
    if (from < to && to < from + count) {
      inc = -1;
      from += count - 1;
      to += count - 1;
    }
    while (count-- > 0) {
      if (from in O) O[to] = O[from];
      else deletePropertyOrThrow(O, to);
      to += inc;
      from += inc;
    } return O;
  };

  var uncurryThis$f = functionUncurryThis;
  var ArrayBufferViewCore$q = arrayBufferViewCore;
  var $ArrayCopyWithin = arrayCopyWithin;

  var u$ArrayCopyWithin = uncurryThis$f($ArrayCopyWithin);
  var aTypedArray$p = ArrayBufferViewCore$q.aTypedArray;
  var exportTypedArrayMethod$q = ArrayBufferViewCore$q.exportTypedArrayMethod;

  // `%TypedArray%.prototype.copyWithin` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.copywithin
  exportTypedArrayMethod$q('copyWithin', function copyWithin(target, start /* , end */) {
    return u$ArrayCopyWithin(aTypedArray$p(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
  });

  var ArrayBufferViewCore$p = arrayBufferViewCore;
  var $every = arrayIteration.every;

  var aTypedArray$o = ArrayBufferViewCore$p.aTypedArray;
  var exportTypedArrayMethod$p = ArrayBufferViewCore$p.exportTypedArrayMethod;

  // `%TypedArray%.prototype.every` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.every
  exportTypedArrayMethod$p('every', function every(callbackfn /* , thisArg */) {
    return $every(aTypedArray$o(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  });

  var ArrayBufferViewCore$o = arrayBufferViewCore;
  var $fill = arrayFill$1;
  var toBigInt$1 = toBigInt$3;
  var classof$1 = classof$j;
  var call$6 = functionCall;
  var uncurryThis$e = functionUncurryThis;
  var fails$a = fails$Y;

  var aTypedArray$n = ArrayBufferViewCore$o.aTypedArray;
  var exportTypedArrayMethod$o = ArrayBufferViewCore$o.exportTypedArrayMethod;
  var slice = uncurryThis$e(''.slice);

  // V8 ~ Chrome < 59, Safari < 14.1, FF < 55, Edge <=18
  var CONVERSION_BUG = fails$a(function () {
    var count = 0;
    // eslint-disable-next-line es/no-typed-arrays -- safe
    new Int8Array(2).fill({ valueOf: function () { return count++; } });
    return count !== 1;
  });

  // `%TypedArray%.prototype.fill` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.fill
  exportTypedArrayMethod$o('fill', function fill(value /* , start, end */) {
    var length = arguments.length;
    aTypedArray$n(this);
    var actualValue = slice(classof$1(this), 0, 3) === 'Big' ? toBigInt$1(value) : +value;
    return call$6($fill, this, actualValue, length > 1 ? arguments[1] : undefined, length > 2 ? arguments[2] : undefined);
  }, CONVERSION_BUG);

  var ArrayBufferViewCore$n = arrayBufferViewCore;
  var speciesConstructor = speciesConstructor$4;

  var aTypedArrayConstructor = ArrayBufferViewCore$n.aTypedArrayConstructor;
  var getTypedArrayConstructor$3 = ArrayBufferViewCore$n.getTypedArrayConstructor;

  // a part of `TypedArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#typedarray-species-create
  var typedArraySpeciesConstructor$3 = function (originalArray) {
    return aTypedArrayConstructor(speciesConstructor(originalArray, getTypedArrayConstructor$3(originalArray)));
  };

  var arrayFromConstructorAndList$1 = arrayFromConstructorAndList$3;
  var typedArraySpeciesConstructor$2 = typedArraySpeciesConstructor$3;

  var typedArrayFromSpeciesAndList = function (instance, list) {
    return arrayFromConstructorAndList$1(typedArraySpeciesConstructor$2(instance), list);
  };

  var ArrayBufferViewCore$m = arrayBufferViewCore;
  var $filter = arrayIteration.filter;
  var fromSpeciesAndList = typedArrayFromSpeciesAndList;

  var aTypedArray$m = ArrayBufferViewCore$m.aTypedArray;
  var exportTypedArrayMethod$n = ArrayBufferViewCore$m.exportTypedArrayMethod;

  // `%TypedArray%.prototype.filter` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.filter
  exportTypedArrayMethod$n('filter', function filter(callbackfn /* , thisArg */) {
    var list = $filter(aTypedArray$m(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    return fromSpeciesAndList(this, list);
  });

  var ArrayBufferViewCore$l = arrayBufferViewCore;
  var $find = arrayIteration.find;

  var aTypedArray$l = ArrayBufferViewCore$l.aTypedArray;
  var exportTypedArrayMethod$m = ArrayBufferViewCore$l.exportTypedArrayMethod;

  // `%TypedArray%.prototype.find` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.find
  exportTypedArrayMethod$m('find', function find(predicate /* , thisArg */) {
    return $find(aTypedArray$l(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
  });

  var ArrayBufferViewCore$k = arrayBufferViewCore;
  var $findIndex = arrayIteration.findIndex;

  var aTypedArray$k = ArrayBufferViewCore$k.aTypedArray;
  var exportTypedArrayMethod$l = ArrayBufferViewCore$k.exportTypedArrayMethod;

  // `%TypedArray%.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.findindex
  exportTypedArrayMethod$l('findIndex', function findIndex(predicate /* , thisArg */) {
    return $findIndex(aTypedArray$k(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
  });

  var bind$2 = functionBindContext;
  var IndexedObject = indexedObject;
  var toObject = toObject$k;
  var lengthOfArrayLike$4 = lengthOfArrayLike$n;

  // `Array.prototype.{ findLast, findLastIndex }` methods implementation
  var createMethod = function (TYPE) {
    var IS_FIND_LAST_INDEX = TYPE === 1;
    return function ($this, callbackfn, that) {
      var O = toObject($this);
      var self = IndexedObject(O);
      var index = lengthOfArrayLike$4(self);
      var boundFunction = bind$2(callbackfn, that);
      var value, result;
      while (index-- > 0) {
        value = self[index];
        result = boundFunction(value, index, O);
        if (result) switch (TYPE) {
          case 0: return value; // findLast
          case 1: return index; // findLastIndex
        }
      }
      return IS_FIND_LAST_INDEX ? -1 : undefined;
    };
  };

  var arrayIterationFromLast = {
    // `Array.prototype.findLast` method
    // https://github.com/tc39/proposal-array-find-from-last
    findLast: createMethod(0),
    // `Array.prototype.findLastIndex` method
    // https://github.com/tc39/proposal-array-find-from-last
    findLastIndex: createMethod(1)
  };

  var ArrayBufferViewCore$j = arrayBufferViewCore;
  var $findLast = arrayIterationFromLast.findLast;

  var aTypedArray$j = ArrayBufferViewCore$j.aTypedArray;
  var exportTypedArrayMethod$k = ArrayBufferViewCore$j.exportTypedArrayMethod;

  // `%TypedArray%.prototype.findLast` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.findlast
  exportTypedArrayMethod$k('findLast', function findLast(predicate /* , thisArg */) {
    return $findLast(aTypedArray$j(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
  });

  var ArrayBufferViewCore$i = arrayBufferViewCore;
  var $findLastIndex = arrayIterationFromLast.findLastIndex;

  var aTypedArray$i = ArrayBufferViewCore$i.aTypedArray;
  var exportTypedArrayMethod$j = ArrayBufferViewCore$i.exportTypedArrayMethod;

  // `%TypedArray%.prototype.findLastIndex` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.findlastindex
  exportTypedArrayMethod$j('findLastIndex', function findLastIndex(predicate /* , thisArg */) {
    return $findLastIndex(aTypedArray$i(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
  });

  var ArrayBufferViewCore$h = arrayBufferViewCore;
  var $forEach$1 = arrayIteration.forEach;

  var aTypedArray$h = ArrayBufferViewCore$h.aTypedArray;
  var exportTypedArrayMethod$i = ArrayBufferViewCore$h.exportTypedArrayMethod;

  // `%TypedArray%.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.foreach
  exportTypedArrayMethod$i('forEach', function forEach(callbackfn /* , thisArg */) {
    $forEach$1(aTypedArray$h(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  });

  var ArrayBufferViewCore$g = arrayBufferViewCore;
  var $includes = arrayIncludes.includes;

  var aTypedArray$g = ArrayBufferViewCore$g.aTypedArray;
  var exportTypedArrayMethod$h = ArrayBufferViewCore$g.exportTypedArrayMethod;

  // `%TypedArray%.prototype.includes` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.includes
  exportTypedArrayMethod$h('includes', function includes(searchElement /* , fromIndex */) {
    return $includes(aTypedArray$g(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
  });

  var ArrayBufferViewCore$f = arrayBufferViewCore;
  var $indexOf = arrayIncludes.indexOf;

  var aTypedArray$f = ArrayBufferViewCore$f.aTypedArray;
  var exportTypedArrayMethod$g = ArrayBufferViewCore$f.exportTypedArrayMethod;

  // `%TypedArray%.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.indexof
  exportTypedArrayMethod$g('indexOf', function indexOf(searchElement /* , fromIndex */) {
    return $indexOf(aTypedArray$f(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
  });

  var globalThis$d = globalThis_1;
  var fails$9 = fails$Y;
  var uncurryThis$d = functionUncurryThis;
  var ArrayBufferViewCore$e = arrayBufferViewCore;
  var ArrayIterators = es_array_iterator;
  var wellKnownSymbol$5 = wellKnownSymbol$x;

  var ITERATOR$4 = wellKnownSymbol$5('iterator');
  var Uint8Array$2 = globalThis$d.Uint8Array;
  var arrayValues = uncurryThis$d(ArrayIterators.values);
  var arrayKeys = uncurryThis$d(ArrayIterators.keys);
  var arrayEntries = uncurryThis$d(ArrayIterators.entries);
  var aTypedArray$e = ArrayBufferViewCore$e.aTypedArray;
  var exportTypedArrayMethod$f = ArrayBufferViewCore$e.exportTypedArrayMethod;
  var TypedArrayPrototype = Uint8Array$2 && Uint8Array$2.prototype;

  var GENERIC = !fails$9(function () {
    TypedArrayPrototype[ITERATOR$4].call([1]);
  });

  var ITERATOR_IS_VALUES = !!TypedArrayPrototype
    && TypedArrayPrototype.values
    && TypedArrayPrototype[ITERATOR$4] === TypedArrayPrototype.values
    && TypedArrayPrototype.values.name === 'values';

  var typedArrayValues = function values() {
    return arrayValues(aTypedArray$e(this));
  };

  // `%TypedArray%.prototype.entries` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.entries
  exportTypedArrayMethod$f('entries', function entries() {
    return arrayEntries(aTypedArray$e(this));
  }, GENERIC);
  // `%TypedArray%.prototype.keys` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.keys
  exportTypedArrayMethod$f('keys', function keys() {
    return arrayKeys(aTypedArray$e(this));
  }, GENERIC);
  // `%TypedArray%.prototype.values` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.values
  exportTypedArrayMethod$f('values', typedArrayValues, GENERIC || !ITERATOR_IS_VALUES, { name: 'values' });
  // `%TypedArray%.prototype[@@iterator]` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype-@@iterator
  exportTypedArrayMethod$f(ITERATOR$4, typedArrayValues, GENERIC || !ITERATOR_IS_VALUES, { name: 'values' });

  var ArrayBufferViewCore$d = arrayBufferViewCore;
  var uncurryThis$c = functionUncurryThis;

  var aTypedArray$d = ArrayBufferViewCore$d.aTypedArray;
  var exportTypedArrayMethod$e = ArrayBufferViewCore$d.exportTypedArrayMethod;
  var $join = uncurryThis$c([].join);

  // `%TypedArray%.prototype.join` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.join
  exportTypedArrayMethod$e('join', function join(separator) {
    return $join(aTypedArray$d(this), separator);
  });

  /* eslint-disable es/no-array-prototype-lastindexof -- safe */
  var apply$2 = functionApply;
  var toIndexedObject$1 = toIndexedObject$d;
  var toIntegerOrInfinity$2 = toIntegerOrInfinity$f;
  var lengthOfArrayLike$3 = lengthOfArrayLike$n;
  var arrayMethodIsStrict$1 = arrayMethodIsStrict$5;

  var min = Math.min;
  var $lastIndexOf$1 = [].lastIndexOf;
  var NEGATIVE_ZERO = !!$lastIndexOf$1 && 1 / [1].lastIndexOf(1, -0) < 0;
  var STRICT_METHOD$1 = arrayMethodIsStrict$1('lastIndexOf');
  var FORCED$3 = NEGATIVE_ZERO || !STRICT_METHOD$1;

  // `Array.prototype.lastIndexOf` method implementation
  // https://tc39.es/ecma262/#sec-array.prototype.lastindexof
  var arrayLastIndexOf = FORCED$3 ? function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
    // convert -0 to +0
    if (NEGATIVE_ZERO) return apply$2($lastIndexOf$1, this, arguments) || 0;
    var O = toIndexedObject$1(this);
    var length = lengthOfArrayLike$3(O);
    if (length === 0) return -1;
    var index = length - 1;
    if (arguments.length > 1) index = min(index, toIntegerOrInfinity$2(arguments[1]));
    if (index < 0) index = length + index;
    for (;index >= 0; index--) if (index in O && O[index] === searchElement) return index || 0;
    return -1;
  } : $lastIndexOf$1;

  var ArrayBufferViewCore$c = arrayBufferViewCore;
  var apply$1 = functionApply;
  var $lastIndexOf = arrayLastIndexOf;

  var aTypedArray$c = ArrayBufferViewCore$c.aTypedArray;
  var exportTypedArrayMethod$d = ArrayBufferViewCore$c.exportTypedArrayMethod;

  // `%TypedArray%.prototype.lastIndexOf` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.lastindexof
  exportTypedArrayMethod$d('lastIndexOf', function lastIndexOf(searchElement /* , fromIndex */) {
    var length = arguments.length;
    return apply$1($lastIndexOf, aTypedArray$c(this), length > 1 ? [searchElement, arguments[1]] : [searchElement]);
  });

  var ArrayBufferViewCore$b = arrayBufferViewCore;
  var $map = arrayIteration.map;
  var typedArraySpeciesConstructor$1 = typedArraySpeciesConstructor$3;

  var aTypedArray$b = ArrayBufferViewCore$b.aTypedArray;
  var exportTypedArrayMethod$c = ArrayBufferViewCore$b.exportTypedArrayMethod;

  // `%TypedArray%.prototype.map` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.map
  exportTypedArrayMethod$c('map', function map(mapfn /* , thisArg */) {
    return $map(aTypedArray$b(this), mapfn, arguments.length > 1 ? arguments[1] : undefined, function (O, length) {
      return new (typedArraySpeciesConstructor$1(O))(length);
    });
  });

  var ArrayBufferViewCore$a = arrayBufferViewCore;
  var $reduce = arrayReduce.left;

  var aTypedArray$a = ArrayBufferViewCore$a.aTypedArray;
  var exportTypedArrayMethod$b = ArrayBufferViewCore$a.exportTypedArrayMethod;

  // `%TypedArray%.prototype.reduce` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.reduce
  exportTypedArrayMethod$b('reduce', function reduce(callbackfn /* , initialValue */) {
    var length = arguments.length;
    return $reduce(aTypedArray$a(this), callbackfn, length, length > 1 ? arguments[1] : undefined);
  });

  var ArrayBufferViewCore$9 = arrayBufferViewCore;
  var $reduceRight = arrayReduce.right;

  var aTypedArray$9 = ArrayBufferViewCore$9.aTypedArray;
  var exportTypedArrayMethod$a = ArrayBufferViewCore$9.exportTypedArrayMethod;

  // `%TypedArray%.prototype.reduceRight` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.reduceright
  exportTypedArrayMethod$a('reduceRight', function reduceRight(callbackfn /* , initialValue */) {
    var length = arguments.length;
    return $reduceRight(aTypedArray$9(this), callbackfn, length, length > 1 ? arguments[1] : undefined);
  });

  var ArrayBufferViewCore$8 = arrayBufferViewCore;

  var aTypedArray$8 = ArrayBufferViewCore$8.aTypedArray;
  var exportTypedArrayMethod$9 = ArrayBufferViewCore$8.exportTypedArrayMethod;
  var floor$2 = Math.floor;

  // `%TypedArray%.prototype.reverse` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.reverse
  exportTypedArrayMethod$9('reverse', function reverse() {
    var that = this;
    var length = aTypedArray$8(that).length;
    var middle = floor$2(length / 2);
    var index = 0;
    var value;
    while (index < middle) {
      value = that[index];
      that[index++] = that[--length];
      that[length] = value;
    } return that;
  });

  var globalThis$c = globalThis_1;
  var call$5 = functionCall;
  var ArrayBufferViewCore$7 = arrayBufferViewCore;
  var lengthOfArrayLike$2 = lengthOfArrayLike$n;
  var toOffset = toOffset$2;
  var toIndexedObject = toObject$k;
  var fails$8 = fails$Y;

  var RangeError$1 = globalThis$c.RangeError;
  var Int8Array$2 = globalThis$c.Int8Array;
  var Int8ArrayPrototype = Int8Array$2 && Int8Array$2.prototype;
  var $set = Int8ArrayPrototype && Int8ArrayPrototype.set;
  var aTypedArray$7 = ArrayBufferViewCore$7.aTypedArray;
  var exportTypedArrayMethod$8 = ArrayBufferViewCore$7.exportTypedArrayMethod;

  var WORKS_WITH_OBJECTS_AND_GENERIC_ON_TYPED_ARRAYS = !fails$8(function () {
    // eslint-disable-next-line es/no-typed-arrays -- required for testing
    var array = new Uint8ClampedArray(2);
    call$5($set, array, { length: 1, 0: 3 }, 1);
    return array[1] !== 3;
  });

  // https://bugs.chromium.org/p/v8/issues/detail?id=11294 and other
  var TO_OBJECT_BUG = WORKS_WITH_OBJECTS_AND_GENERIC_ON_TYPED_ARRAYS && ArrayBufferViewCore$7.NATIVE_ARRAY_BUFFER_VIEWS && fails$8(function () {
    var array = new Int8Array$2(2);
    array.set(1);
    array.set('2', 1);
    return array[0] !== 0 || array[1] !== 2;
  });

  // `%TypedArray%.prototype.set` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.set
  exportTypedArrayMethod$8('set', function set(arrayLike /* , offset */) {
    aTypedArray$7(this);
    var offset = toOffset(arguments.length > 1 ? arguments[1] : undefined, 1);
    var src = toIndexedObject(arrayLike);
    if (WORKS_WITH_OBJECTS_AND_GENERIC_ON_TYPED_ARRAYS) return call$5($set, this, src, offset);
    var length = this.length;
    var len = lengthOfArrayLike$2(src);
    var index = 0;
    if (len + offset > length) throw new RangeError$1('Wrong length');
    while (index < len) this[offset + index] = src[index++];
  }, !WORKS_WITH_OBJECTS_AND_GENERIC_ON_TYPED_ARRAYS || TO_OBJECT_BUG);

  var ArrayBufferViewCore$6 = arrayBufferViewCore;
  var typedArraySpeciesConstructor = typedArraySpeciesConstructor$3;
  var fails$7 = fails$Y;
  var arraySlice$2 = arraySlice$9;

  var aTypedArray$6 = ArrayBufferViewCore$6.aTypedArray;
  var exportTypedArrayMethod$7 = ArrayBufferViewCore$6.exportTypedArrayMethod;

  var FORCED$2 = fails$7(function () {
    // eslint-disable-next-line es/no-typed-arrays -- required for testing
    new Int8Array(1).slice();
  });

  // `%TypedArray%.prototype.slice` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.slice
  exportTypedArrayMethod$7('slice', function slice(start, end) {
    var list = arraySlice$2(aTypedArray$6(this), start, end);
    var C = typedArraySpeciesConstructor(this);
    var index = 0;
    var length = list.length;
    var result = new C(length);
    while (length > index) result[index] = list[index++];
    return result;
  }, FORCED$2);

  var ArrayBufferViewCore$5 = arrayBufferViewCore;
  var $some = arrayIteration.some;

  var aTypedArray$5 = ArrayBufferViewCore$5.aTypedArray;
  var exportTypedArrayMethod$6 = ArrayBufferViewCore$5.exportTypedArrayMethod;

  // `%TypedArray%.prototype.some` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.some
  exportTypedArrayMethod$6('some', function some(callbackfn /* , thisArg */) {
    return $some(aTypedArray$5(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  });

  var globalThis$b = globalThis_1;
  var uncurryThis$b = functionUncurryThisClause;
  var fails$6 = fails$Y;
  var aCallable$9 = aCallable$n;
  var internalSort = arraySort$1;
  var ArrayBufferViewCore$4 = arrayBufferViewCore;
  var FF = environmentFfVersion;
  var IE_OR_EDGE = environmentIsIeOrEdge;
  var V8 = environmentV8Version;
  var WEBKIT = environmentWebkitVersion;

  var aTypedArray$4 = ArrayBufferViewCore$4.aTypedArray;
  var exportTypedArrayMethod$5 = ArrayBufferViewCore$4.exportTypedArrayMethod;
  var Uint16Array = globalThis$b.Uint16Array;
  var nativeSort = Uint16Array && uncurryThis$b(Uint16Array.prototype.sort);

  // WebKit
  var ACCEPT_INCORRECT_ARGUMENTS = !!nativeSort && !(fails$6(function () {
    nativeSort(new Uint16Array(2), null);
  }) && fails$6(function () {
    nativeSort(new Uint16Array(2), {});
  }));

  var STABLE_SORT = !!nativeSort && !fails$6(function () {
    // feature detection can be too slow, so check engines versions
    if (V8) return V8 < 74;
    if (FF) return FF < 67;
    if (IE_OR_EDGE) return true;
    if (WEBKIT) return WEBKIT < 602;

    var array = new Uint16Array(516);
    var expected = Array(516);
    var index, mod;

    for (index = 0; index < 516; index++) {
      mod = index % 4;
      array[index] = 515 - index;
      expected[index] = index - 2 * mod + 3;
    }

    nativeSort(array, function (a, b) {
      return (a / 4 | 0) - (b / 4 | 0);
    });

    for (index = 0; index < 516; index++) {
      if (array[index] !== expected[index]) return true;
    }
  });

  var getSortCompare = function (comparefn) {
    return function (x, y) {
      if (comparefn !== undefined) return +comparefn(x, y) || 0;
      // eslint-disable-next-line no-self-compare -- NaN check
      if (y !== y) return -1;
      // eslint-disable-next-line no-self-compare -- NaN check
      if (x !== x) return 1;
      if (x === 0 && y === 0) return 1 / x > 0 && 1 / y < 0 ? 1 : -1;
      return x > y;
    };
  };

  // `%TypedArray%.prototype.sort` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.sort
  exportTypedArrayMethod$5('sort', function sort(comparefn) {
    if (comparefn !== undefined) aCallable$9(comparefn);
    if (STABLE_SORT) return nativeSort(this, comparefn);

    return internalSort(aTypedArray$4(this), getSortCompare(comparefn));
  }, !STABLE_SORT || ACCEPT_INCORRECT_ARGUMENTS);

  var globalThis$a = globalThis_1;
  var apply = functionApply;
  var ArrayBufferViewCore$3 = arrayBufferViewCore;
  var fails$5 = fails$Y;
  var arraySlice$1 = arraySlice$9;

  var Int8Array$1 = globalThis$a.Int8Array;
  var aTypedArray$3 = ArrayBufferViewCore$3.aTypedArray;
  var exportTypedArrayMethod$4 = ArrayBufferViewCore$3.exportTypedArrayMethod;
  var $toLocaleString = [].toLocaleString;

  // iOS Safari 6.x fails here
  var TO_LOCALE_STRING_BUG = !!Int8Array$1 && fails$5(function () {
    $toLocaleString.call(new Int8Array$1(1));
  });

  var FORCED$1 = fails$5(function () {
    return [1, 2].toLocaleString() !== new Int8Array$1([1, 2]).toLocaleString();
  }) || !fails$5(function () {
    Int8Array$1.prototype.toLocaleString.call([1, 2]);
  });

  // `%TypedArray%.prototype.toLocaleString` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.tolocalestring
  exportTypedArrayMethod$4('toLocaleString', function toLocaleString() {
    return apply(
      $toLocaleString,
      TO_LOCALE_STRING_BUG ? arraySlice$1(aTypedArray$3(this)) : aTypedArray$3(this),
      arraySlice$1(arguments)
    );
  }, FORCED$1);

  var lengthOfArrayLike$1 = lengthOfArrayLike$n;

  // https://tc39.es/proposal-change-array-by-copy/#sec-array.prototype.toReversed
  // https://tc39.es/proposal-change-array-by-copy/#sec-%typedarray%.prototype.toReversed
  var arrayToReversed$1 = function (O, C) {
    var len = lengthOfArrayLike$1(O);
    var A = new C(len);
    var k = 0;
    for (; k < len; k++) A[k] = O[len - k - 1];
    return A;
  };

  var arrayToReversed = arrayToReversed$1;
  var ArrayBufferViewCore$2 = arrayBufferViewCore;

  var aTypedArray$2 = ArrayBufferViewCore$2.aTypedArray;
  var exportTypedArrayMethod$3 = ArrayBufferViewCore$2.exportTypedArrayMethod;
  var getTypedArrayConstructor$2 = ArrayBufferViewCore$2.getTypedArrayConstructor;

  // `%TypedArray%.prototype.toReversed` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.toreversed
  exportTypedArrayMethod$3('toReversed', function toReversed() {
    return arrayToReversed(aTypedArray$2(this), getTypedArrayConstructor$2(this));
  });

  var ArrayBufferViewCore$1 = arrayBufferViewCore;
  var uncurryThis$a = functionUncurryThis;
  var aCallable$8 = aCallable$n;
  var arrayFromConstructorAndList = arrayFromConstructorAndList$3;

  var aTypedArray$1 = ArrayBufferViewCore$1.aTypedArray;
  var getTypedArrayConstructor$1 = ArrayBufferViewCore$1.getTypedArrayConstructor;
  var exportTypedArrayMethod$2 = ArrayBufferViewCore$1.exportTypedArrayMethod;
  var sort = uncurryThis$a(ArrayBufferViewCore$1.TypedArrayPrototype.sort);

  // `%TypedArray%.prototype.toSorted` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.tosorted
  exportTypedArrayMethod$2('toSorted', function toSorted(compareFn) {
    if (compareFn !== undefined) aCallable$8(compareFn);
    var O = aTypedArray$1(this);
    var A = arrayFromConstructorAndList(getTypedArrayConstructor$1(O), O);
    return sort(A, compareFn);
  });

  var exportTypedArrayMethod$1 = arrayBufferViewCore.exportTypedArrayMethod;
  var fails$4 = fails$Y;
  var globalThis$9 = globalThis_1;
  var uncurryThis$9 = functionUncurryThis;

  var Uint8Array$1 = globalThis$9.Uint8Array;
  var Uint8ArrayPrototype = Uint8Array$1 && Uint8Array$1.prototype || {};
  var arrayToString = [].toString;
  var join$4 = uncurryThis$9([].join);

  if (fails$4(function () { arrayToString.call({}); })) {
    arrayToString = function toString() {
      return join$4(this);
    };
  }

  var IS_NOT_ARRAY_METHOD = Uint8ArrayPrototype.toString !== arrayToString;

  // `%TypedArray%.prototype.toString` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.tostring
  exportTypedArrayMethod$1('toString', arrayToString, IS_NOT_ARRAY_METHOD);

  var lengthOfArrayLike = lengthOfArrayLike$n;
  var toIntegerOrInfinity$1 = toIntegerOrInfinity$f;

  var $RangeError$2 = RangeError;

  // https://tc39.es/proposal-change-array-by-copy/#sec-array.prototype.with
  // https://tc39.es/proposal-change-array-by-copy/#sec-%typedarray%.prototype.with
  var arrayWith$1 = function (O, C, index, value) {
    var len = lengthOfArrayLike(O);
    var relativeIndex = toIntegerOrInfinity$1(index);
    var actualIndex = relativeIndex < 0 ? len + relativeIndex : relativeIndex;
    if (actualIndex >= len || actualIndex < 0) throw new $RangeError$2('Incorrect index');
    var A = new C(len);
    var k = 0;
    for (; k < len; k++) A[k] = k === actualIndex ? value : O[k];
    return A;
  };

  var arrayWith = arrayWith$1;
  var ArrayBufferViewCore = arrayBufferViewCore;
  var isBigIntArray = isBigIntArray$2;
  var toIntegerOrInfinity = toIntegerOrInfinity$f;
  var toBigInt = toBigInt$3;

  var aTypedArray = ArrayBufferViewCore.aTypedArray;
  var getTypedArrayConstructor = ArrayBufferViewCore.getTypedArrayConstructor;
  var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

  var PROPER_ORDER = !!function () {
    try {
      // eslint-disable-next-line no-throw-literal, es/no-typed-arrays, es/no-array-prototype-with -- required for testing
      new Int8Array(1)['with'](2, { valueOf: function () { throw 8; } });
    } catch (error) {
      // some early implementations, like WebKit, does not follow the final semantic
      // https://github.com/tc39/proposal-change-array-by-copy/pull/86
      return error === 8;
    }
  }();

  // `%TypedArray%.prototype.with` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.with
  exportTypedArrayMethod('with', { 'with': function (index, value) {
    var O = aTypedArray(this);
    var relativeIndex = toIntegerOrInfinity(index);
    var actualValue = isBigIntArray(O) ? toBigInt(value) : +value;
    return arrayWith(O, getTypedArrayConstructor(O), relativeIndex, actualValue);
  } }['with'], !PROPER_ORDER);

  var uncurryThis$8 = functionUncurryThis;
  var defineBuiltIns$3 = defineBuiltIns$6;
  var getWeakData = internalMetadataExports.getWeakData;
  var anInstance$3 = anInstance$9;
  var anObject$a = anObject$y;
  var isNullOrUndefined = isNullOrUndefined$b;
  var isObject$2 = isObject$s;
  var iterate$6 = iterate$e;
  var ArrayIterationModule = arrayIteration;
  var hasOwn$3 = hasOwnProperty_1;
  var InternalStateModule$3 = internalState;

  var setInternalState$3 = InternalStateModule$3.set;
  var internalStateGetterFor = InternalStateModule$3.getterFor;
  var find$1 = ArrayIterationModule.find;
  var findIndex = ArrayIterationModule.findIndex;
  var splice$1 = uncurryThis$8([].splice);
  var id = 0;

  // fallback for uncaught frozen keys
  var uncaughtFrozenStore = function (state) {
    return state.frozen || (state.frozen = new UncaughtFrozenStore());
  };

  var UncaughtFrozenStore = function () {
    this.entries = [];
  };

  var findUncaughtFrozen = function (store, key) {
    return find$1(store.entries, function (it) {
      return it[0] === key;
    });
  };

  UncaughtFrozenStore.prototype = {
    get: function (key) {
      var entry = findUncaughtFrozen(this, key);
      if (entry) return entry[1];
    },
    has: function (key) {
      return !!findUncaughtFrozen(this, key);
    },
    set: function (key, value) {
      var entry = findUncaughtFrozen(this, key);
      if (entry) entry[1] = value;
      else this.entries.push([key, value]);
    },
    'delete': function (key) {
      var index = findIndex(this.entries, function (it) {
        return it[0] === key;
      });
      if (~index) splice$1(this.entries, index, 1);
      return !!~index;
    }
  };

  var collectionWeak$1 = {
    getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
      var Constructor = wrapper(function (that, iterable) {
        anInstance$3(that, Prototype);
        setInternalState$3(that, {
          type: CONSTRUCTOR_NAME,
          id: id++,
          frozen: null
        });
        if (!isNullOrUndefined(iterable)) iterate$6(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
      });

      var Prototype = Constructor.prototype;

      var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

      var define = function (that, key, value) {
        var state = getInternalState(that);
        var data = getWeakData(anObject$a(key), true);
        if (data === true) uncaughtFrozenStore(state).set(key, value);
        else data[state.id] = value;
        return that;
      };

      defineBuiltIns$3(Prototype, {
        // `{ WeakMap, WeakSet }.prototype.delete(key)` methods
        // https://tc39.es/ecma262/#sec-weakmap.prototype.delete
        // https://tc39.es/ecma262/#sec-weakset.prototype.delete
        'delete': function (key) {
          var state = getInternalState(this);
          if (!isObject$2(key)) return false;
          var data = getWeakData(key);
          if (data === true) return uncaughtFrozenStore(state)['delete'](key);
          return data && hasOwn$3(data, state.id) && delete data[state.id];
        },
        // `{ WeakMap, WeakSet }.prototype.has(key)` methods
        // https://tc39.es/ecma262/#sec-weakmap.prototype.has
        // https://tc39.es/ecma262/#sec-weakset.prototype.has
        has: function has(key) {
          var state = getInternalState(this);
          if (!isObject$2(key)) return false;
          var data = getWeakData(key);
          if (data === true) return uncaughtFrozenStore(state).has(key);
          return data && hasOwn$3(data, state.id);
        }
      });

      defineBuiltIns$3(Prototype, IS_MAP ? {
        // `WeakMap.prototype.get(key)` method
        // https://tc39.es/ecma262/#sec-weakmap.prototype.get
        get: function get(key) {
          var state = getInternalState(this);
          if (isObject$2(key)) {
            var data = getWeakData(key);
            if (data === true) return uncaughtFrozenStore(state).get(key);
            if (data) return data[state.id];
          }
        },
        // `WeakMap.prototype.set(key, value)` method
        // https://tc39.es/ecma262/#sec-weakmap.prototype.set
        set: function set(key, value) {
          return define(this, key, value);
        }
      } : {
        // `WeakSet.prototype.add(value)` method
        // https://tc39.es/ecma262/#sec-weakset.prototype.add
        add: function add(value) {
          return define(this, value, true);
        }
      });

      return Constructor;
    }
  };

  var FREEZING = freezing;
  var globalThis$8 = globalThis_1;
  var uncurryThis$7 = functionUncurryThis;
  var defineBuiltIns$2 = defineBuiltIns$6;
  var InternalMetadataModule = internalMetadataExports;
  var collection = collection$3;
  var collectionWeak = collectionWeak$1;
  var isObject$1 = isObject$s;
  var enforceInternalState = internalState.enforce;
  var fails$3 = fails$Y;
  var NATIVE_WEAK_MAP = weakMapBasicDetection;

  var $Object = Object;
  // eslint-disable-next-line es/no-array-isarray -- safe
  var isArray = Array.isArray;
  // eslint-disable-next-line es/no-object-isextensible -- safe
  var isExtensible = $Object.isExtensible;
  // eslint-disable-next-line es/no-object-isfrozen -- safe
  var isFrozen = $Object.isFrozen;
  // eslint-disable-next-line es/no-object-issealed -- safe
  var isSealed = $Object.isSealed;
  // eslint-disable-next-line es/no-object-freeze -- safe
  var freeze = $Object.freeze;
  // eslint-disable-next-line es/no-object-seal -- safe
  var seal = $Object.seal;

  var IS_IE11 = !globalThis$8.ActiveXObject && 'ActiveXObject' in globalThis$8;
  var InternalWeakMap;

  var wrapper = function (init) {
    return function WeakMap() {
      return init(this, arguments.length ? arguments[0] : undefined);
    };
  };

  // `WeakMap` constructor
  // https://tc39.es/ecma262/#sec-weakmap-constructor
  var $WeakMap = collection('WeakMap', wrapper, collectionWeak);
  var WeakMapPrototype = $WeakMap.prototype;
  var nativeSet = uncurryThis$7(WeakMapPrototype.set);

  // Chakra Edge bug: adding frozen arrays to WeakMap unfreeze them
  var hasMSEdgeFreezingBug = function () {
    return FREEZING && fails$3(function () {
      var frozenArray = freeze([]);
      nativeSet(new $WeakMap(), frozenArray, 1);
      return !isFrozen(frozenArray);
    });
  };

  // IE11 WeakMap frozen keys fix
  // We can't use feature detection because it crash some old IE builds
  // https://github.com/zloirock/core-js/issues/485
  if (NATIVE_WEAK_MAP) if (IS_IE11) {
    InternalWeakMap = collectionWeak.getConstructor(wrapper, 'WeakMap', true);
    InternalMetadataModule.enable();
    var nativeDelete = uncurryThis$7(WeakMapPrototype['delete']);
    var nativeHas = uncurryThis$7(WeakMapPrototype.has);
    var nativeGet = uncurryThis$7(WeakMapPrototype.get);
    defineBuiltIns$2(WeakMapPrototype, {
      'delete': function (key) {
        if (isObject$1(key) && !isExtensible(key)) {
          var state = enforceInternalState(this);
          if (!state.frozen) state.frozen = new InternalWeakMap();
          return nativeDelete(this, key) || state.frozen['delete'](key);
        } return nativeDelete(this, key);
      },
      has: function has(key) {
        if (isObject$1(key) && !isExtensible(key)) {
          var state = enforceInternalState(this);
          if (!state.frozen) state.frozen = new InternalWeakMap();
          return nativeHas(this, key) || state.frozen.has(key);
        } return nativeHas(this, key);
      },
      get: function get(key) {
        if (isObject$1(key) && !isExtensible(key)) {
          var state = enforceInternalState(this);
          if (!state.frozen) state.frozen = new InternalWeakMap();
          return nativeHas(this, key) ? nativeGet(this, key) : state.frozen.get(key);
        } return nativeGet(this, key);
      },
      set: function set(key, value) {
        if (isObject$1(key) && !isExtensible(key)) {
          var state = enforceInternalState(this);
          if (!state.frozen) state.frozen = new InternalWeakMap();
          nativeHas(this, key) ? nativeSet(this, key, value) : state.frozen.set(key, value);
        } else nativeSet(this, key, value);
        return this;
      }
    });
  // Chakra Edge frozen keys fix
  } else if (hasMSEdgeFreezingBug()) {
    defineBuiltIns$2(WeakMapPrototype, {
      set: function set(key, value) {
        var arrayIntegrityLevel;
        if (isArray(key)) {
          if (isFrozen(key)) arrayIntegrityLevel = freeze;
          else if (isSealed(key)) arrayIntegrityLevel = seal;
        }
        nativeSet(this, key, value);
        if (arrayIntegrityLevel) arrayIntegrityLevel(key);
        return this;
      }
    });
  }

  var $$e = _export;
  var globalThis$7 = globalThis_1;
  var anInstance$2 = anInstance$9;
  var anObject$9 = anObject$y;
  var isCallable$1 = isCallable$v;
  var getPrototypeOf = objectGetPrototypeOf$1;
  var defineBuiltInAccessor$4 = defineBuiltInAccessor$f;
  var createProperty = createProperty$6;
  var fails$2 = fails$Y;
  var hasOwn$2 = hasOwnProperty_1;
  var wellKnownSymbol$4 = wellKnownSymbol$x;
  var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;
  var DESCRIPTORS$6 = descriptors;

  var CONSTRUCTOR = 'constructor';
  var ITERATOR$3 = 'Iterator';
  var TO_STRING_TAG$1 = wellKnownSymbol$4('toStringTag');

  var $TypeError$2 = TypeError;
  var NativeIterator = globalThis$7[ITERATOR$3];

  // FF56- have non-standard global helper `Iterator`
  var FORCED = !isCallable$1(NativeIterator)
    || NativeIterator.prototype !== IteratorPrototype$1
    // FF44- non-standard `Iterator` passes previous tests
    || !fails$2(function () { NativeIterator({}); });

  var IteratorConstructor = function Iterator() {
    anInstance$2(this, IteratorPrototype$1);
    if (getPrototypeOf(this) === IteratorPrototype$1) throw new $TypeError$2('Abstract class Iterator not directly constructable');
  };

  var defineIteratorPrototypeAccessor = function (key, value) {
    if (DESCRIPTORS$6) {
      defineBuiltInAccessor$4(IteratorPrototype$1, key, {
        configurable: true,
        get: function () {
          return value;
        },
        set: function (replacement) {
          anObject$9(this);
          if (this === IteratorPrototype$1) throw new $TypeError$2("You can't redefine this property");
          if (hasOwn$2(this, key)) this[key] = replacement;
          else createProperty(this, key, replacement);
        }
      });
    } else IteratorPrototype$1[key] = value;
  };

  if (!hasOwn$2(IteratorPrototype$1, TO_STRING_TAG$1)) defineIteratorPrototypeAccessor(TO_STRING_TAG$1, ITERATOR$3);

  if (FORCED || !hasOwn$2(IteratorPrototype$1, CONSTRUCTOR) || IteratorPrototype$1[CONSTRUCTOR] === Object) {
    defineIteratorPrototypeAccessor(CONSTRUCTOR, IteratorConstructor);
  }

  IteratorConstructor.prototype = IteratorPrototype$1;

  // `Iterator` constructor
  // https://github.com/tc39/proposal-iterator-helpers
  $$e({ global: true, constructor: true, forced: FORCED }, {
    Iterator: IteratorConstructor
  });

  var $$d = _export;
  var iterate$5 = iterate$e;
  var aCallable$7 = aCallable$n;
  var anObject$8 = anObject$y;
  var getIteratorDirect$7 = getIteratorDirect$9;

  // `Iterator.prototype.every` method
  // https://github.com/tc39/proposal-iterator-helpers
  $$d({ target: 'Iterator', proto: true, real: true }, {
    every: function every(predicate) {
      anObject$8(this);
      aCallable$7(predicate);
      var record = getIteratorDirect$7(this);
      var counter = 0;
      return !iterate$5(record, function (value, stop) {
        if (!predicate(value, counter++)) return stop();
      }, { IS_RECORD: true, INTERRUPTED: true }).stopped;
    }
  });

  var call$4 = functionCall;
  var create$1 = objectCreate;
  var createNonEnumerableProperty$2 = createNonEnumerableProperty$e;
  var defineBuiltIns$1 = defineBuiltIns$6;
  var wellKnownSymbol$3 = wellKnownSymbol$x;
  var InternalStateModule$2 = internalState;
  var getMethod = getMethod$8;
  var IteratorPrototype = iteratorsCore.IteratorPrototype;
  var createIterResultObject$1 = createIterResultObject$5;
  var iteratorClose = iteratorClose$5;

  var TO_STRING_TAG = wellKnownSymbol$3('toStringTag');
  var ITERATOR_HELPER = 'IteratorHelper';
  var WRAP_FOR_VALID_ITERATOR = 'WrapForValidIterator';
  var setInternalState$2 = InternalStateModule$2.set;

  var createIteratorProxyPrototype = function (IS_ITERATOR) {
    var getInternalState = InternalStateModule$2.getterFor(IS_ITERATOR ? WRAP_FOR_VALID_ITERATOR : ITERATOR_HELPER);

    return defineBuiltIns$1(create$1(IteratorPrototype), {
      next: function next() {
        var state = getInternalState(this);
        // for simplification:
        //   for `%WrapForValidIteratorPrototype%.next` our `nextHandler` returns `IterResultObject`
        //   for `%IteratorHelperPrototype%.next` - just a value
        if (IS_ITERATOR) return state.nextHandler();
        try {
          var result = state.done ? undefined : state.nextHandler();
          return createIterResultObject$1(result, state.done);
        } catch (error) {
          state.done = true;
          throw error;
        }
      },
      'return': function () {
        var state = getInternalState(this);
        var iterator = state.iterator;
        state.done = true;
        if (IS_ITERATOR) {
          var returnMethod = getMethod(iterator, 'return');
          return returnMethod ? call$4(returnMethod, iterator) : createIterResultObject$1(undefined, true);
        }
        if (state.inner) try {
          iteratorClose(state.inner.iterator, 'normal');
        } catch (error) {
          return iteratorClose(iterator, 'throw', error);
        }
        iteratorClose(iterator, 'normal');
        return createIterResultObject$1(undefined, true);
      }
    });
  };

  var WrapForValidIteratorPrototype = createIteratorProxyPrototype(true);
  var IteratorHelperPrototype = createIteratorProxyPrototype(false);

  createNonEnumerableProperty$2(IteratorHelperPrototype, TO_STRING_TAG, 'Iterator Helper');

  var iteratorCreateProxy = function (nextHandler, IS_ITERATOR) {
    var IteratorProxy = function Iterator(record, state) {
      if (state) {
        state.iterator = record.iterator;
        state.next = record.next;
      } else state = record;
      state.type = IS_ITERATOR ? WRAP_FOR_VALID_ITERATOR : ITERATOR_HELPER;
      state.nextHandler = nextHandler;
      state.counter = 0;
      state.done = false;
      setInternalState$2(this, state);
    };

    IteratorProxy.prototype = IS_ITERATOR ? WrapForValidIteratorPrototype : IteratorHelperPrototype;

    return IteratorProxy;
  };

  var $$c = _export;
  var call$3 = functionCall;
  var aCallable$6 = aCallable$n;
  var anObject$7 = anObject$y;
  var getIteratorDirect$6 = getIteratorDirect$9;
  var createIteratorProxy$1 = iteratorCreateProxy;
  var callWithSafeIterationClosing$1 = callWithSafeIterationClosing$3;
  var IS_PURE$2 = isPure;

  var IteratorProxy$1 = createIteratorProxy$1(function () {
    var iterator = this.iterator;
    var predicate = this.predicate;
    var next = this.next;
    var result, done, value;
    while (true) {
      result = anObject$7(call$3(next, iterator));
      done = this.done = !!result.done;
      if (done) return;
      value = result.value;
      if (callWithSafeIterationClosing$1(iterator, predicate, [value, this.counter++], true)) return value;
    }
  });

  // `Iterator.prototype.filter` method
  // https://github.com/tc39/proposal-iterator-helpers
  $$c({ target: 'Iterator', proto: true, real: true, forced: IS_PURE$2 }, {
    filter: function filter(predicate) {
      anObject$7(this);
      aCallable$6(predicate);
      return new IteratorProxy$1(getIteratorDirect$6(this), {
        predicate: predicate
      });
    }
  });

  var $$b = _export;
  var iterate$4 = iterate$e;
  var aCallable$5 = aCallable$n;
  var anObject$6 = anObject$y;
  var getIteratorDirect$5 = getIteratorDirect$9;

  // `Iterator.prototype.find` method
  // https://github.com/tc39/proposal-iterator-helpers
  $$b({ target: 'Iterator', proto: true, real: true }, {
    find: function find(predicate) {
      anObject$6(this);
      aCallable$5(predicate);
      var record = getIteratorDirect$5(this);
      var counter = 0;
      return iterate$4(record, function (value, stop) {
        if (predicate(value, counter++)) return stop(value);
      }, { IS_RECORD: true, INTERRUPTED: true }).result;
    }
  });

  var $$a = _export;
  var iterate$3 = iterate$e;
  var aCallable$4 = aCallable$n;
  var anObject$5 = anObject$y;
  var getIteratorDirect$4 = getIteratorDirect$9;

  // `Iterator.prototype.forEach` method
  // https://github.com/tc39/proposal-iterator-helpers
  $$a({ target: 'Iterator', proto: true, real: true }, {
    forEach: function forEach(fn) {
      anObject$5(this);
      aCallable$4(fn);
      var record = getIteratorDirect$4(this);
      var counter = 0;
      iterate$3(record, function (value) {
        fn(value, counter++);
      }, { IS_RECORD: true });
    }
  });

  var call$2 = functionCall;
  var aCallable$3 = aCallable$n;
  var anObject$4 = anObject$y;
  var getIteratorDirect$3 = getIteratorDirect$9;
  var createIteratorProxy = iteratorCreateProxy;
  var callWithSafeIterationClosing = callWithSafeIterationClosing$3;

  var IteratorProxy = createIteratorProxy(function () {
    var iterator = this.iterator;
    var result = anObject$4(call$2(this.next, iterator));
    var done = this.done = !!result.done;
    if (!done) return callWithSafeIterationClosing(iterator, this.mapper, [result.value, this.counter++], true);
  });

  // `Iterator.prototype.map` method
  // https://github.com/tc39/proposal-iterator-helpers
  var iteratorMap = function map(mapper) {
    anObject$4(this);
    aCallable$3(mapper);
    return new IteratorProxy(getIteratorDirect$3(this), {
      mapper: mapper
    });
  };

  var $$9 = _export;
  var map = iteratorMap;
  var IS_PURE$1 = isPure;

  // `Iterator.prototype.map` method
  // https://github.com/tc39/proposal-iterator-helpers
  $$9({ target: 'Iterator', proto: true, real: true, forced: IS_PURE$1 }, {
    map: map
  });

  var $$8 = _export;
  var iterate$2 = iterate$e;
  var aCallable$2 = aCallable$n;
  var anObject$3 = anObject$y;
  var getIteratorDirect$2 = getIteratorDirect$9;

  var $TypeError$1 = TypeError;

  // `Iterator.prototype.reduce` method
  // https://github.com/tc39/proposal-iterator-helpers
  $$8({ target: 'Iterator', proto: true, real: true }, {
    reduce: function reduce(reducer /* , initialValue */) {
      anObject$3(this);
      aCallable$2(reducer);
      var record = getIteratorDirect$2(this);
      var noInitial = arguments.length < 2;
      var accumulator = noInitial ? undefined : arguments[1];
      var counter = 0;
      iterate$2(record, function (value) {
        if (noInitial) {
          noInitial = false;
          accumulator = value;
        } else {
          accumulator = reducer(accumulator, value, counter);
        }
        counter++;
      }, { IS_RECORD: true });
      if (noInitial) throw new $TypeError$1('Reduce of empty iterator with no initial value');
      return accumulator;
    }
  });

  var $$7 = _export;
  var iterate$1 = iterate$e;
  var aCallable$1 = aCallable$n;
  var anObject$2 = anObject$y;
  var getIteratorDirect$1 = getIteratorDirect$9;

  // `Iterator.prototype.some` method
  // https://github.com/tc39/proposal-iterator-helpers
  $$7({ target: 'Iterator', proto: true, real: true }, {
    some: function some(predicate) {
      anObject$2(this);
      aCallable$1(predicate);
      var record = getIteratorDirect$1(this);
      var counter = 0;
      return iterate$1(record, function (value, stop) {
        if (predicate(value, counter++)) return stop();
      }, { IS_RECORD: true, INTERRUPTED: true }).stopped;
    }
  });

  var $$6 = _export;
  var anObject$1 = anObject$y;
  var iterate = iterate$e;
  var getIteratorDirect = getIteratorDirect$9;

  var push$4 = [].push;

  // `Iterator.prototype.toArray` method
  // https://github.com/tc39/proposal-iterator-helpers
  $$6({ target: 'Iterator', proto: true, real: true }, {
    toArray: function toArray() {
      var result = [];
      iterate(getIteratorDirect(anObject$1(this)), push$4, { that: result, IS_RECORD: true });
      return result;
    }
  });

  // iterable DOM collections
  // flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
  var domIterables = {
    CSSRuleList: 0,
    CSSStyleDeclaration: 0,
    CSSValueList: 0,
    ClientRectList: 0,
    DOMRectList: 0,
    DOMStringList: 0,
    DOMTokenList: 1,
    DataTransferItemList: 0,
    FileList: 0,
    HTMLAllCollection: 0,
    HTMLCollection: 0,
    HTMLFormElement: 0,
    HTMLSelectElement: 0,
    MediaList: 0,
    MimeTypeArray: 0,
    NamedNodeMap: 0,
    NodeList: 1,
    PaintRequestList: 0,
    Plugin: 0,
    PluginArray: 0,
    SVGLengthList: 0,
    SVGNumberList: 0,
    SVGPathSegList: 0,
    SVGPointList: 0,
    SVGStringList: 0,
    SVGTransformList: 0,
    SourceBufferList: 0,
    StyleSheetList: 0,
    TextTrackCueList: 0,
    TextTrackList: 0,
    TouchList: 0
  };

  // in old WebKit versions, `element.classList` is not an instance of global `DOMTokenList`
  var documentCreateElement = documentCreateElement$2;

  var classList = documentCreateElement('span').classList;
  var DOMTokenListPrototype$2 = classList && classList.constructor && classList.constructor.prototype;

  var domTokenListPrototype = DOMTokenListPrototype$2 === Object.prototype ? undefined : DOMTokenListPrototype$2;

  var $forEach = arrayIteration.forEach;
  var arrayMethodIsStrict = arrayMethodIsStrict$5;

  var STRICT_METHOD = arrayMethodIsStrict('forEach');

  // `Array.prototype.forEach` method implementation
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  var arrayForEach = !STRICT_METHOD ? function forEach(callbackfn /* , thisArg */) {
    return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  // eslint-disable-next-line es/no-array-prototype-foreach -- safe
  } : [].forEach;

  var globalThis$6 = globalThis_1;
  var DOMIterables$1 = domIterables;
  var DOMTokenListPrototype$1 = domTokenListPrototype;
  var forEach$2 = arrayForEach;
  var createNonEnumerableProperty$1 = createNonEnumerableProperty$e;

  var handlePrototype$1 = function (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype && CollectionPrototype.forEach !== forEach$2) try {
      createNonEnumerableProperty$1(CollectionPrototype, 'forEach', forEach$2);
    } catch (error) {
      CollectionPrototype.forEach = forEach$2;
    }
  };

  for (var COLLECTION_NAME$1 in DOMIterables$1) {
    if (DOMIterables$1[COLLECTION_NAME$1]) {
      handlePrototype$1(globalThis$6[COLLECTION_NAME$1] && globalThis$6[COLLECTION_NAME$1].prototype);
    }
  }

  handlePrototype$1(DOMTokenListPrototype$1);

  var globalThis$5 = globalThis_1;
  var DOMIterables = domIterables;
  var DOMTokenListPrototype = domTokenListPrototype;
  var ArrayIteratorMethods = es_array_iterator;
  var createNonEnumerableProperty = createNonEnumerableProperty$e;
  var setToStringTag$2 = setToStringTag$d;
  var wellKnownSymbol$2 = wellKnownSymbol$x;

  var ITERATOR$2 = wellKnownSymbol$2('iterator');
  var ArrayValues = ArrayIteratorMethods.values;

  var handlePrototype = function (CollectionPrototype, COLLECTION_NAME) {
    if (CollectionPrototype) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[ITERATOR$2] !== ArrayValues) try {
        createNonEnumerableProperty(CollectionPrototype, ITERATOR$2, ArrayValues);
      } catch (error) {
        CollectionPrototype[ITERATOR$2] = ArrayValues;
      }
      setToStringTag$2(CollectionPrototype, COLLECTION_NAME, true);
      if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
        // some Chrome versions have non-configurable methods on DOMTokenList
        if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
          createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
        } catch (error) {
          CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
        }
      }
    }
  };

  for (var COLLECTION_NAME in DOMIterables) {
    handlePrototype(globalThis$5[COLLECTION_NAME] && globalThis$5[COLLECTION_NAME].prototype, COLLECTION_NAME);
  }

  handlePrototype(DOMTokenListPrototype, 'DOMTokenList');

  var $$5 = _export;
  var globalThis$4 = globalThis_1;
  var microtask = microtask_1;
  var aCallable = aCallable$n;
  var validateArgumentsLength$4 = validateArgumentsLength$6;
  var fails$1 = fails$Y;
  var DESCRIPTORS$5 = descriptors;

  // Bun ~ 1.0.30 bug
  // https://github.com/oven-sh/bun/issues/9249
  var WRONG_ARITY = fails$1(function () {
    // getOwnPropertyDescriptor for prevent experimental warning in Node 11
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    return DESCRIPTORS$5 && Object.getOwnPropertyDescriptor(globalThis$4, 'queueMicrotask').value.length !== 1;
  });

  // `queueMicrotask` method
  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-queuemicrotask
  $$5({ global: true, enumerable: true, dontCallGetSet: true, forced: WRONG_ARITY }, {
    queueMicrotask: function queueMicrotask(fn) {
      validateArgumentsLength$4(arguments.length, 1);
      microtask(aCallable(fn));
    }
  });

  var $$4 = _export;
  var globalThis$3 = globalThis_1;
  var defineBuiltInAccessor$3 = defineBuiltInAccessor$f;
  var DESCRIPTORS$4 = descriptors;

  var $TypeError = TypeError;
  // eslint-disable-next-line es/no-object-defineproperty -- safe
  var defineProperty = Object.defineProperty;
  var INCORRECT_VALUE = globalThis$3.self !== globalThis$3;

  // `self` getter
  // https://html.spec.whatwg.org/multipage/window-object.html#dom-self
  try {
    if (DESCRIPTORS$4) {
      // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
      var descriptor = Object.getOwnPropertyDescriptor(globalThis$3, 'self');
      // some engines have `self`, but with incorrect descriptor
      // https://github.com/denoland/deno/issues/15765
      if (INCORRECT_VALUE || !descriptor || !descriptor.get || !descriptor.enumerable) {
        defineBuiltInAccessor$3(globalThis$3, 'self', {
          get: function self() {
            return globalThis$3;
          },
          set: function self(value) {
            if (this !== globalThis$3) throw new $TypeError('Illegal invocation');
            defineProperty(globalThis$3, 'self', {
              value: value,
              writable: true,
              configurable: true,
              enumerable: true
            });
          },
          configurable: true,
          enumerable: true
        });
      }
    } else $$4({ global: true, simple: true, forced: INCORRECT_VALUE }, {
      self: globalThis$3
    });
  } catch (error) { /* empty */ }

  var fails = fails$Y;
  var wellKnownSymbol$1 = wellKnownSymbol$x;
  var DESCRIPTORS$3 = descriptors;
  var IS_PURE = isPure;

  var ITERATOR$1 = wellKnownSymbol$1('iterator');

  var urlConstructorDetection = !fails(function () {
    // eslint-disable-next-line unicorn/relative-url-style -- required for testing
    var url = new URL('b?a=1&b=2&c=3', 'https://a');
    var params = url.searchParams;
    var params2 = new URLSearchParams('a=1&a=2&b=3');
    var result = '';
    url.pathname = 'c%20d';
    params.forEach(function (value, key) {
      params['delete']('b');
      result += key + value;
    });
    params2['delete']('a', 2);
    // `undefined` case is a Chromium 117 bug
    // https://bugs.chromium.org/p/v8/issues/detail?id=14222
    params2['delete']('b', undefined);
    return (IS_PURE && (!url.toJSON || !params2.has('a', 1) || params2.has('a', 2) || !params2.has('a', undefined) || params2.has('b')))
      || (!params.size && (IS_PURE || !DESCRIPTORS$3))
      || !params.sort
      || url.href !== 'https://a/c%20d?a=1&c=3'
      || params.get('c') !== '3'
      || String(new URLSearchParams('?a=1')) !== 'a=1'
      || !params[ITERATOR$1]
      // throws in Edge
      || new URL('https://a@b').username !== 'a'
      || new URLSearchParams(new URLSearchParams('a=b')).get('a') !== 'b'
      // not punycoded in Edge
      || new URL('https://тест').host !== 'xn--e1aybc'
      // not escaped in Chrome 62-
      || new URL('https://a#б').hash !== '#%D0%B1'
      // fails in Chrome 66-
      || result !== 'a1c3'
      // throws in Safari
      || new URL('https://x', undefined).host !== 'x';
  });

  // based on https://github.com/bestiejs/punycode.js/blob/master/punycode.js
  var uncurryThis$6 = functionUncurryThis;

  var maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1
  var base = 36;
  var tMin = 1;
  var tMax = 26;
  var skew = 38;
  var damp = 700;
  var initialBias = 72;
  var initialN = 128; // 0x80
  var delimiter = '-'; // '\x2D'
  var regexNonASCII = /[^\0-\u007E]/; // non-ASCII chars
  var regexSeparators = /[.\u3002\uFF0E\uFF61]/g; // RFC 3490 separators
  var OVERFLOW_ERROR = 'Overflow: input needs wider integers to process';
  var baseMinusTMin = base - tMin;

  var $RangeError$1 = RangeError;
  var exec$2 = uncurryThis$6(regexSeparators.exec);
  var floor$1 = Math.floor;
  var fromCharCode$2 = String.fromCharCode;
  var charCodeAt = uncurryThis$6(''.charCodeAt);
  var join$3 = uncurryThis$6([].join);
  var push$3 = uncurryThis$6([].push);
  var replace$2 = uncurryThis$6(''.replace);
  var split$2 = uncurryThis$6(''.split);
  var toLowerCase$1 = uncurryThis$6(''.toLowerCase);

  /**
   * Creates an array containing the numeric code points of each Unicode
   * character in the string. While JavaScript uses UCS-2 internally,
   * this function will convert a pair of surrogate halves (each of which
   * UCS-2 exposes as separate characters) into a single code point,
   * matching UTF-16.
   */
  var ucs2decode = function (string) {
    var output = [];
    var counter = 0;
    var length = string.length;
    while (counter < length) {
      var value = charCodeAt(string, counter++);
      if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
        // It's a high surrogate, and there is a next character.
        var extra = charCodeAt(string, counter++);
        if ((extra & 0xFC00) === 0xDC00) { // Low surrogate.
          push$3(output, ((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
        } else {
          // It's an unmatched surrogate; only append this code unit, in case the
          // next code unit is the high surrogate of a surrogate pair.
          push$3(output, value);
          counter--;
        }
      } else {
        push$3(output, value);
      }
    }
    return output;
  };

  /**
   * Converts a digit/integer into a basic code point.
   */
  var digitToBasic = function (digit) {
    //  0..25 map to ASCII a..z or A..Z
    // 26..35 map to ASCII 0..9
    return digit + 22 + 75 * (digit < 26);
  };

  /**
   * Bias adaptation function as per section 3.4 of RFC 3492.
   * https://tools.ietf.org/html/rfc3492#section-3.4
   */
  var adapt = function (delta, numPoints, firstTime) {
    var k = 0;
    delta = firstTime ? floor$1(delta / damp) : delta >> 1;
    delta += floor$1(delta / numPoints);
    while (delta > baseMinusTMin * tMax >> 1) {
      delta = floor$1(delta / baseMinusTMin);
      k += base;
    }
    return floor$1(k + (baseMinusTMin + 1) * delta / (delta + skew));
  };

  /**
   * Converts a string of Unicode symbols (e.g. a domain name label) to a
   * Punycode string of ASCII-only symbols.
   */
  var encode = function (input) {
    var output = [];

    // Convert the input in UCS-2 to an array of Unicode code points.
    input = ucs2decode(input);

    // Cache the length.
    var inputLength = input.length;

    // Initialize the state.
    var n = initialN;
    var delta = 0;
    var bias = initialBias;
    var i, currentValue;

    // Handle the basic code points.
    for (i = 0; i < input.length; i++) {
      currentValue = input[i];
      if (currentValue < 0x80) {
        push$3(output, fromCharCode$2(currentValue));
      }
    }

    var basicLength = output.length; // number of basic code points.
    var handledCPCount = basicLength; // number of code points that have been handled;

    // Finish the basic string with a delimiter unless it's empty.
    if (basicLength) {
      push$3(output, delimiter);
    }

    // Main encoding loop:
    while (handledCPCount < inputLength) {
      // All non-basic code points < n have been handled already. Find the next larger one:
      var m = maxInt;
      for (i = 0; i < input.length; i++) {
        currentValue = input[i];
        if (currentValue >= n && currentValue < m) {
          m = currentValue;
        }
      }

      // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>, but guard against overflow.
      var handledCPCountPlusOne = handledCPCount + 1;
      if (m - n > floor$1((maxInt - delta) / handledCPCountPlusOne)) {
        throw new $RangeError$1(OVERFLOW_ERROR);
      }

      delta += (m - n) * handledCPCountPlusOne;
      n = m;

      for (i = 0; i < input.length; i++) {
        currentValue = input[i];
        if (currentValue < n && ++delta > maxInt) {
          throw new $RangeError$1(OVERFLOW_ERROR);
        }
        if (currentValue === n) {
          // Represent delta as a generalized variable-length integer.
          var q = delta;
          var k = base;
          while (true) {
            var t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
            if (q < t) break;
            var qMinusT = q - t;
            var baseMinusT = base - t;
            push$3(output, fromCharCode$2(digitToBasic(t + qMinusT % baseMinusT)));
            q = floor$1(qMinusT / baseMinusT);
            k += base;
          }

          push$3(output, fromCharCode$2(digitToBasic(q)));
          bias = adapt(delta, handledCPCountPlusOne, handledCPCount === basicLength);
          delta = 0;
          handledCPCount++;
        }
      }

      delta++;
      n++;
    }
    return join$3(output, '');
  };

  var stringPunycodeToAscii = function (input) {
    var encoded = [];
    var labels = split$2(replace$2(toLowerCase$1(input), regexSeparators, '\u002E'), '.');
    var i, label;
    for (i = 0; i < labels.length; i++) {
      label = labels[i];
      push$3(encoded, exec$2(regexNonASCII, label) ? 'xn--' + encode(label) : label);
    }
    return join$3(encoded, '.');
  };

  var $$3 = _export;
  var uncurryThis$5 = functionUncurryThis;
  var toAbsoluteIndex = toAbsoluteIndex$6;

  var $RangeError = RangeError;
  var fromCharCode$1 = String.fromCharCode;
  // eslint-disable-next-line es/no-string-fromcodepoint -- required for testing
  var $fromCodePoint = String.fromCodePoint;
  var join$2 = uncurryThis$5([].join);

  // length should be 1, old FF problem
  var INCORRECT_LENGTH = !!$fromCodePoint && $fromCodePoint.length !== 1;

  // `String.fromCodePoint` method
  // https://tc39.es/ecma262/#sec-string.fromcodepoint
  $$3({ target: 'String', stat: true, arity: 1, forced: INCORRECT_LENGTH }, {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    fromCodePoint: function fromCodePoint(x) {
      var elements = [];
      var length = arguments.length;
      var i = 0;
      var code;
      while (length > i) {
        code = +arguments[i++];
        if (toAbsoluteIndex(code, 0x10FFFF) !== code) throw new $RangeError(code + ' is not a valid code point');
        elements[i] = code < 0x10000
          ? fromCharCode$1(code)
          : fromCharCode$1(((code -= 0x10000) >> 10) + 0xD800, code % 0x400 + 0xDC00);
      } return join$2(elements, '');
    }
  });

  // TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`


  var $$2 = _export;
  var globalThis$2 = globalThis_1;
  var safeGetBuiltIn = safeGetBuiltIn$2;
  var getBuiltIn = getBuiltIn$g;
  var call$1 = functionCall;
  var uncurryThis$4 = functionUncurryThis;
  var DESCRIPTORS$2 = descriptors;
  var USE_NATIVE_URL$1 = urlConstructorDetection;
  var defineBuiltIn$3 = defineBuiltIn$k;
  var defineBuiltInAccessor$2 = defineBuiltInAccessor$f;
  var defineBuiltIns = defineBuiltIns$6;
  var setToStringTag$1 = setToStringTag$d;
  var createIteratorConstructor = iteratorCreateConstructor;
  var InternalStateModule$1 = internalState;
  var anInstance$1 = anInstance$9;
  var isCallable = isCallable$v;
  var hasOwn$1 = hasOwnProperty_1;
  var bind$1 = functionBindContext;
  var classof = classof$j;
  var anObject = anObject$y;
  var isObject = isObject$s;
  var $toString$1 = toString$o;
  var create = objectCreate;
  var createPropertyDescriptor = createPropertyDescriptor$8;
  var getIterator = getIterator$4;
  var getIteratorMethod = getIteratorMethod$5;
  var createIterResultObject = createIterResultObject$5;
  var validateArgumentsLength$3 = validateArgumentsLength$6;
  var wellKnownSymbol = wellKnownSymbol$x;
  var arraySort = arraySort$1;

  var ITERATOR = wellKnownSymbol('iterator');
  var URL_SEARCH_PARAMS = 'URLSearchParams';
  var URL_SEARCH_PARAMS_ITERATOR = URL_SEARCH_PARAMS + 'Iterator';
  var setInternalState$1 = InternalStateModule$1.set;
  var getInternalParamsState = InternalStateModule$1.getterFor(URL_SEARCH_PARAMS);
  var getInternalIteratorState = InternalStateModule$1.getterFor(URL_SEARCH_PARAMS_ITERATOR);

  var nativeFetch = safeGetBuiltIn('fetch');
  var NativeRequest = safeGetBuiltIn('Request');
  var Headers = safeGetBuiltIn('Headers');
  var RequestPrototype = NativeRequest && NativeRequest.prototype;
  var HeadersPrototype = Headers && Headers.prototype;
  var TypeError$2 = globalThis$2.TypeError;
  var encodeURIComponent$1 = globalThis$2.encodeURIComponent;
  var fromCharCode = String.fromCharCode;
  var fromCodePoint = getBuiltIn('String', 'fromCodePoint');
  var $parseInt = parseInt;
  var charAt$1 = uncurryThis$4(''.charAt);
  var join$1 = uncurryThis$4([].join);
  var push$2 = uncurryThis$4([].push);
  var replace$1 = uncurryThis$4(''.replace);
  var shift$1 = uncurryThis$4([].shift);
  var splice = uncurryThis$4([].splice);
  var split$1 = uncurryThis$4(''.split);
  var stringSlice$1 = uncurryThis$4(''.slice);
  var exec$1 = uncurryThis$4(/./.exec);

  var plus = /\+/g;
  var FALLBACK_REPLACER = '\uFFFD';
  var VALID_HEX = /^[0-9a-f]+$/i;

  var parseHexOctet = function (string, start) {
    var substr = stringSlice$1(string, start, start + 2);
    if (!exec$1(VALID_HEX, substr)) return NaN;

    return $parseInt(substr, 16);
  };

  var getLeadingOnes = function (octet) {
    var count = 0;
    for (var mask = 0x80; mask > 0 && (octet & mask) !== 0; mask >>= 1) {
      count++;
    }
    return count;
  };

  var utf8Decode = function (octets) {
    var codePoint = null;

    switch (octets.length) {
      case 1:
        codePoint = octets[0];
        break;
      case 2:
        codePoint = (octets[0] & 0x1F) << 6 | (octets[1] & 0x3F);
        break;
      case 3:
        codePoint = (octets[0] & 0x0F) << 12 | (octets[1] & 0x3F) << 6 | (octets[2] & 0x3F);
        break;
      case 4:
        codePoint = (octets[0] & 0x07) << 18 | (octets[1] & 0x3F) << 12 | (octets[2] & 0x3F) << 6 | (octets[3] & 0x3F);
        break;
    }

    return codePoint > 0x10FFFF ? null : codePoint;
  };

  var decode = function (input) {
    input = replace$1(input, plus, ' ');
    var length = input.length;
    var result = '';
    var i = 0;

    while (i < length) {
      var decodedChar = charAt$1(input, i);

      if (decodedChar === '%') {
        if (charAt$1(input, i + 1) === '%' || i + 3 > length) {
          result += '%';
          i++;
          continue;
        }

        var octet = parseHexOctet(input, i + 1);

        // eslint-disable-next-line no-self-compare -- NaN check
        if (octet !== octet) {
          result += decodedChar;
          i++;
          continue;
        }

        i += 2;
        var byteSequenceLength = getLeadingOnes(octet);

        if (byteSequenceLength === 0) {
          decodedChar = fromCharCode(octet);
        } else {
          if (byteSequenceLength === 1 || byteSequenceLength > 4) {
            result += FALLBACK_REPLACER;
            i++;
            continue;
          }

          var octets = [octet];
          var sequenceIndex = 1;

          while (sequenceIndex < byteSequenceLength) {
            i++;
            if (i + 3 > length || charAt$1(input, i) !== '%') break;

            var nextByte = parseHexOctet(input, i + 1);

            // eslint-disable-next-line no-self-compare -- NaN check
            if (nextByte !== nextByte) {
              i += 3;
              break;
            }
            if (nextByte > 191 || nextByte < 128) break;

            push$2(octets, nextByte);
            i += 2;
            sequenceIndex++;
          }

          if (octets.length !== byteSequenceLength) {
            result += FALLBACK_REPLACER;
            continue;
          }

          var codePoint = utf8Decode(octets);
          if (codePoint === null) {
            result += FALLBACK_REPLACER;
          } else {
            decodedChar = fromCodePoint(codePoint);
          }
        }
      }

      result += decodedChar;
      i++;
    }

    return result;
  };

  var find = /[!'()~]|%20/g;

  var replacements = {
    '!': '%21',
    "'": '%27',
    '(': '%28',
    ')': '%29',
    '~': '%7E',
    '%20': '+'
  };

  var replacer = function (match) {
    return replacements[match];
  };

  var serialize = function (it) {
    return replace$1(encodeURIComponent$1(it), find, replacer);
  };

  var URLSearchParamsIterator = createIteratorConstructor(function Iterator(params, kind) {
    setInternalState$1(this, {
      type: URL_SEARCH_PARAMS_ITERATOR,
      target: getInternalParamsState(params).entries,
      index: 0,
      kind: kind
    });
  }, URL_SEARCH_PARAMS, function next() {
    var state = getInternalIteratorState(this);
    var target = state.target;
    var index = state.index++;
    if (!target || index >= target.length) {
      state.target = null;
      return createIterResultObject(undefined, true);
    }
    var entry = target[index];
    switch (state.kind) {
      case 'keys': return createIterResultObject(entry.key, false);
      case 'values': return createIterResultObject(entry.value, false);
    } return createIterResultObject([entry.key, entry.value], false);
  }, true);

  var URLSearchParamsState = function (init) {
    this.entries = [];
    this.url = null;

    if (init !== undefined) {
      if (isObject(init)) this.parseObject(init);
      else this.parseQuery(typeof init == 'string' ? charAt$1(init, 0) === '?' ? stringSlice$1(init, 1) : init : $toString$1(init));
    }
  };

  URLSearchParamsState.prototype = {
    type: URL_SEARCH_PARAMS,
    bindURL: function (url) {
      this.url = url;
      this.update();
    },
    parseObject: function (object) {
      var entries = this.entries;
      var iteratorMethod = getIteratorMethod(object);
      var iterator, next, step, entryIterator, entryNext, first, second;

      if (iteratorMethod) {
        iterator = getIterator(object, iteratorMethod);
        next = iterator.next;
        while (!(step = call$1(next, iterator)).done) {
          entryIterator = getIterator(anObject(step.value));
          entryNext = entryIterator.next;
          if (
            (first = call$1(entryNext, entryIterator)).done ||
            (second = call$1(entryNext, entryIterator)).done ||
            !call$1(entryNext, entryIterator).done
          ) throw new TypeError$2('Expected sequence with length 2');
          push$2(entries, { key: $toString$1(first.value), value: $toString$1(second.value) });
        }
      } else for (var key in object) if (hasOwn$1(object, key)) {
        push$2(entries, { key: key, value: $toString$1(object[key]) });
      }
    },
    parseQuery: function (query) {
      if (query) {
        var entries = this.entries;
        var attributes = split$1(query, '&');
        var index = 0;
        var attribute, entry;
        while (index < attributes.length) {
          attribute = attributes[index++];
          if (attribute.length) {
            entry = split$1(attribute, '=');
            push$2(entries, {
              key: decode(shift$1(entry)),
              value: decode(join$1(entry, '='))
            });
          }
        }
      }
    },
    serialize: function () {
      var entries = this.entries;
      var result = [];
      var index = 0;
      var entry;
      while (index < entries.length) {
        entry = entries[index++];
        push$2(result, serialize(entry.key) + '=' + serialize(entry.value));
      } return join$1(result, '&');
    },
    update: function () {
      this.entries.length = 0;
      this.parseQuery(this.url.query);
    },
    updateURL: function () {
      if (this.url) this.url.update();
    }
  };

  // `URLSearchParams` constructor
  // https://url.spec.whatwg.org/#interface-urlsearchparams
  var URLSearchParamsConstructor = function URLSearchParams(/* init */) {
    anInstance$1(this, URLSearchParamsPrototype$3);
    var init = arguments.length > 0 ? arguments[0] : undefined;
    var state = setInternalState$1(this, new URLSearchParamsState(init));
    if (!DESCRIPTORS$2) this.size = state.entries.length;
  };

  var URLSearchParamsPrototype$3 = URLSearchParamsConstructor.prototype;

  defineBuiltIns(URLSearchParamsPrototype$3, {
    // `URLSearchParams.prototype.append` method
    // https://url.spec.whatwg.org/#dom-urlsearchparams-append
    append: function append(name, value) {
      var state = getInternalParamsState(this);
      validateArgumentsLength$3(arguments.length, 2);
      push$2(state.entries, { key: $toString$1(name), value: $toString$1(value) });
      if (!DESCRIPTORS$2) this.length++;
      state.updateURL();
    },
    // `URLSearchParams.prototype.delete` method
    // https://url.spec.whatwg.org/#dom-urlsearchparams-delete
    'delete': function (name /* , value */) {
      var state = getInternalParamsState(this);
      var length = validateArgumentsLength$3(arguments.length, 1);
      var entries = state.entries;
      var key = $toString$1(name);
      var $value = length < 2 ? undefined : arguments[1];
      var value = $value === undefined ? $value : $toString$1($value);
      var index = 0;
      while (index < entries.length) {
        var entry = entries[index];
        if (entry.key === key && (value === undefined || entry.value === value)) {
          splice(entries, index, 1);
          if (value !== undefined) break;
        } else index++;
      }
      if (!DESCRIPTORS$2) this.size = entries.length;
      state.updateURL();
    },
    // `URLSearchParams.prototype.get` method
    // https://url.spec.whatwg.org/#dom-urlsearchparams-get
    get: function get(name) {
      var entries = getInternalParamsState(this).entries;
      validateArgumentsLength$3(arguments.length, 1);
      var key = $toString$1(name);
      var index = 0;
      for (; index < entries.length; index++) {
        if (entries[index].key === key) return entries[index].value;
      }
      return null;
    },
    // `URLSearchParams.prototype.getAll` method
    // https://url.spec.whatwg.org/#dom-urlsearchparams-getall
    getAll: function getAll(name) {
      var entries = getInternalParamsState(this).entries;
      validateArgumentsLength$3(arguments.length, 1);
      var key = $toString$1(name);
      var result = [];
      var index = 0;
      for (; index < entries.length; index++) {
        if (entries[index].key === key) push$2(result, entries[index].value);
      }
      return result;
    },
    // `URLSearchParams.prototype.has` method
    // https://url.spec.whatwg.org/#dom-urlsearchparams-has
    has: function has(name /* , value */) {
      var entries = getInternalParamsState(this).entries;
      var length = validateArgumentsLength$3(arguments.length, 1);
      var key = $toString$1(name);
      var $value = length < 2 ? undefined : arguments[1];
      var value = $value === undefined ? $value : $toString$1($value);
      var index = 0;
      while (index < entries.length) {
        var entry = entries[index++];
        if (entry.key === key && (value === undefined || entry.value === value)) return true;
      }
      return false;
    },
    // `URLSearchParams.prototype.set` method
    // https://url.spec.whatwg.org/#dom-urlsearchparams-set
    set: function set(name, value) {
      var state = getInternalParamsState(this);
      validateArgumentsLength$3(arguments.length, 1);
      var entries = state.entries;
      var found = false;
      var key = $toString$1(name);
      var val = $toString$1(value);
      var index = 0;
      var entry;
      for (; index < entries.length; index++) {
        entry = entries[index];
        if (entry.key === key) {
          if (found) splice(entries, index--, 1);
          else {
            found = true;
            entry.value = val;
          }
        }
      }
      if (!found) push$2(entries, { key: key, value: val });
      if (!DESCRIPTORS$2) this.size = entries.length;
      state.updateURL();
    },
    // `URLSearchParams.prototype.sort` method
    // https://url.spec.whatwg.org/#dom-urlsearchparams-sort
    sort: function sort() {
      var state = getInternalParamsState(this);
      arraySort(state.entries, function (a, b) {
        return a.key > b.key ? 1 : -1;
      });
      state.updateURL();
    },
    // `URLSearchParams.prototype.forEach` method
    forEach: function forEach(callback /* , thisArg */) {
      var entries = getInternalParamsState(this).entries;
      var boundFunction = bind$1(callback, arguments.length > 1 ? arguments[1] : undefined);
      var index = 0;
      var entry;
      while (index < entries.length) {
        entry = entries[index++];
        boundFunction(entry.value, entry.key, this);
      }
    },
    // `URLSearchParams.prototype.keys` method
    keys: function keys() {
      return new URLSearchParamsIterator(this, 'keys');
    },
    // `URLSearchParams.prototype.values` method
    values: function values() {
      return new URLSearchParamsIterator(this, 'values');
    },
    // `URLSearchParams.prototype.entries` method
    entries: function entries() {
      return new URLSearchParamsIterator(this, 'entries');
    }
  }, { enumerable: true });

  // `URLSearchParams.prototype[@@iterator]` method
  defineBuiltIn$3(URLSearchParamsPrototype$3, ITERATOR, URLSearchParamsPrototype$3.entries, { name: 'entries' });

  // `URLSearchParams.prototype.toString` method
  // https://url.spec.whatwg.org/#urlsearchparams-stringification-behavior
  defineBuiltIn$3(URLSearchParamsPrototype$3, 'toString', function toString() {
    return getInternalParamsState(this).serialize();
  }, { enumerable: true });

  // `URLSearchParams.prototype.size` getter
  // https://github.com/whatwg/url/pull/734
  if (DESCRIPTORS$2) defineBuiltInAccessor$2(URLSearchParamsPrototype$3, 'size', {
    get: function size() {
      return getInternalParamsState(this).entries.length;
    },
    configurable: true,
    enumerable: true
  });

  setToStringTag$1(URLSearchParamsConstructor, URL_SEARCH_PARAMS);

  $$2({ global: true, constructor: true, forced: !USE_NATIVE_URL$1 }, {
    URLSearchParams: URLSearchParamsConstructor
  });

  // Wrap `fetch` and `Request` for correct work with polyfilled `URLSearchParams`
  if (!USE_NATIVE_URL$1 && isCallable(Headers)) {
    var headersHas = uncurryThis$4(HeadersPrototype.has);
    var headersSet = uncurryThis$4(HeadersPrototype.set);

    var wrapRequestOptions = function (init) {
      if (isObject(init)) {
        var body = init.body;
        var headers;
        if (classof(body) === URL_SEARCH_PARAMS) {
          headers = init.headers ? new Headers(init.headers) : new Headers();
          if (!headersHas(headers, 'content-type')) {
            headersSet(headers, 'content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
          }
          return create(init, {
            body: createPropertyDescriptor(0, $toString$1(body)),
            headers: createPropertyDescriptor(0, headers)
          });
        }
      } return init;
    };

    if (isCallable(nativeFetch)) {
      $$2({ global: true, enumerable: true, dontCallGetSet: true, forced: true }, {
        fetch: function fetch(input /* , init */) {
          return nativeFetch(input, arguments.length > 1 ? wrapRequestOptions(arguments[1]) : {});
        }
      });
    }

    if (isCallable(NativeRequest)) {
      var RequestConstructor = function Request(input /* , init */) {
        anInstance$1(this, RequestPrototype);
        return new NativeRequest(input, arguments.length > 1 ? wrapRequestOptions(arguments[1]) : {});
      };

      RequestPrototype.constructor = RequestConstructor;
      RequestConstructor.prototype = RequestPrototype;

      $$2({ global: true, constructor: true, dontCallGetSet: true, forced: true }, {
        Request: RequestConstructor
      });
    }
  }

  var web_urlSearchParams_constructor = {
    URLSearchParams: URLSearchParamsConstructor,
    getState: getInternalParamsState
  };

  // TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`

  var $$1 = _export;
  var DESCRIPTORS$1 = descriptors;
  var USE_NATIVE_URL = urlConstructorDetection;
  var globalThis$1 = globalThis_1;
  var bind = functionBindContext;
  var uncurryThis$3 = functionUncurryThis;
  var defineBuiltIn$2 = defineBuiltIn$k;
  var defineBuiltInAccessor$1 = defineBuiltInAccessor$f;
  var anInstance = anInstance$9;
  var hasOwn = hasOwnProperty_1;
  var assign = objectAssign;
  var arrayFrom = arrayFrom$1;
  var arraySlice = arraySlice$9;
  var codeAt = stringMultibyte.codeAt;
  var toASCII = stringPunycodeToAscii;
  var $toString = toString$o;
  var setToStringTag = setToStringTag$d;
  var validateArgumentsLength$2 = validateArgumentsLength$6;
  var URLSearchParamsModule = web_urlSearchParams_constructor;
  var InternalStateModule = internalState;

  var setInternalState = InternalStateModule.set;
  var getInternalURLState = InternalStateModule.getterFor('URL');
  var URLSearchParams$1 = URLSearchParamsModule.URLSearchParams;
  var getInternalSearchParamsState = URLSearchParamsModule.getState;

  var NativeURL = globalThis$1.URL;
  var TypeError$1 = globalThis$1.TypeError;
  var parseInt$1 = globalThis$1.parseInt;
  var floor = Math.floor;
  var pow = Math.pow;
  var charAt = uncurryThis$3(''.charAt);
  var exec = uncurryThis$3(/./.exec);
  var join = uncurryThis$3([].join);
  var numberToString = uncurryThis$3(1.0.toString);
  var pop = uncurryThis$3([].pop);
  var push$1 = uncurryThis$3([].push);
  var replace = uncurryThis$3(''.replace);
  var shift = uncurryThis$3([].shift);
  var split = uncurryThis$3(''.split);
  var stringSlice = uncurryThis$3(''.slice);
  var toLowerCase = uncurryThis$3(''.toLowerCase);
  var unshift = uncurryThis$3([].unshift);

  var INVALID_AUTHORITY = 'Invalid authority';
  var INVALID_SCHEME = 'Invalid scheme';
  var INVALID_HOST = 'Invalid host';
  var INVALID_PORT = 'Invalid port';

  var ALPHA = /[a-z]/i;
  // eslint-disable-next-line regexp/no-obscure-range -- safe
  var ALPHANUMERIC = /[\d+-.a-z]/i;
  var DIGIT = /\d/;
  var HEX_START = /^0x/i;
  var OCT = /^[0-7]+$/;
  var DEC = /^\d+$/;
  var HEX = /^[\da-f]+$/i;
  /* eslint-disable regexp/no-control-character -- safe */
  var FORBIDDEN_HOST_CODE_POINT = /[\0\t\n\r #%/:<>?@[\\\]^|]/;
  var FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT = /[\0\t\n\r #/:<>?@[\\\]^|]/;
  var LEADING_C0_CONTROL_OR_SPACE = /^[\u0000-\u0020]+/;
  var TRAILING_C0_CONTROL_OR_SPACE = /(^|[^\u0000-\u0020])[\u0000-\u0020]+$/;
  var TAB_AND_NEW_LINE = /[\t\n\r]/g;
  /* eslint-enable regexp/no-control-character -- safe */
  var EOF;

  // https://url.spec.whatwg.org/#ipv4-number-parser
  var parseIPv4 = function (input) {
    var parts = split(input, '.');
    var partsLength, numbers, index, part, radix, number, ipv4;
    if (parts.length && parts[parts.length - 1] === '') {
      parts.length--;
    }
    partsLength = parts.length;
    if (partsLength > 4) return input;
    numbers = [];
    for (index = 0; index < partsLength; index++) {
      part = parts[index];
      if (part === '') return input;
      radix = 10;
      if (part.length > 1 && charAt(part, 0) === '0') {
        radix = exec(HEX_START, part) ? 16 : 8;
        part = stringSlice(part, radix === 8 ? 1 : 2);
      }
      if (part === '') {
        number = 0;
      } else {
        if (!exec(radix === 10 ? DEC : radix === 8 ? OCT : HEX, part)) return input;
        number = parseInt$1(part, radix);
      }
      push$1(numbers, number);
    }
    for (index = 0; index < partsLength; index++) {
      number = numbers[index];
      if (index === partsLength - 1) {
        if (number >= pow(256, 5 - partsLength)) return null;
      } else if (number > 255) return null;
    }
    ipv4 = pop(numbers);
    for (index = 0; index < numbers.length; index++) {
      ipv4 += numbers[index] * pow(256, 3 - index);
    }
    return ipv4;
  };

  // https://url.spec.whatwg.org/#concept-ipv6-parser
  // eslint-disable-next-line max-statements -- TODO
  var parseIPv6 = function (input) {
    var address = [0, 0, 0, 0, 0, 0, 0, 0];
    var pieceIndex = 0;
    var compress = null;
    var pointer = 0;
    var value, length, numbersSeen, ipv4Piece, number, swaps, swap;

    var chr = function () {
      return charAt(input, pointer);
    };

    if (chr() === ':') {
      if (charAt(input, 1) !== ':') return;
      pointer += 2;
      pieceIndex++;
      compress = pieceIndex;
    }
    while (chr()) {
      if (pieceIndex === 8) return;
      if (chr() === ':') {
        if (compress !== null) return;
        pointer++;
        pieceIndex++;
        compress = pieceIndex;
        continue;
      }
      value = length = 0;
      while (length < 4 && exec(HEX, chr())) {
        value = value * 16 + parseInt$1(chr(), 16);
        pointer++;
        length++;
      }
      if (chr() === '.') {
        if (length === 0) return;
        pointer -= length;
        if (pieceIndex > 6) return;
        numbersSeen = 0;
        while (chr()) {
          ipv4Piece = null;
          if (numbersSeen > 0) {
            if (chr() === '.' && numbersSeen < 4) pointer++;
            else return;
          }
          if (!exec(DIGIT, chr())) return;
          while (exec(DIGIT, chr())) {
            number = parseInt$1(chr(), 10);
            if (ipv4Piece === null) ipv4Piece = number;
            else if (ipv4Piece === 0) return;
            else ipv4Piece = ipv4Piece * 10 + number;
            if (ipv4Piece > 255) return;
            pointer++;
          }
          address[pieceIndex] = address[pieceIndex] * 256 + ipv4Piece;
          numbersSeen++;
          if (numbersSeen === 2 || numbersSeen === 4) pieceIndex++;
        }
        if (numbersSeen !== 4) return;
        break;
      } else if (chr() === ':') {
        pointer++;
        if (!chr()) return;
      } else if (chr()) return;
      address[pieceIndex++] = value;
    }
    if (compress !== null) {
      swaps = pieceIndex - compress;
      pieceIndex = 7;
      while (pieceIndex !== 0 && swaps > 0) {
        swap = address[pieceIndex];
        address[pieceIndex--] = address[compress + swaps - 1];
        address[compress + --swaps] = swap;
      }
    } else if (pieceIndex !== 8) return;
    return address;
  };

  var findLongestZeroSequence = function (ipv6) {
    var maxIndex = null;
    var maxLength = 1;
    var currStart = null;
    var currLength = 0;
    var index = 0;
    for (; index < 8; index++) {
      if (ipv6[index] !== 0) {
        if (currLength > maxLength) {
          maxIndex = currStart;
          maxLength = currLength;
        }
        currStart = null;
        currLength = 0;
      } else {
        if (currStart === null) currStart = index;
        ++currLength;
      }
    }
    return currLength > maxLength ? currStart : maxIndex;
  };

  // https://url.spec.whatwg.org/#host-serializing
  var serializeHost = function (host) {
    var result, index, compress, ignore0;

    // ipv4
    if (typeof host == 'number') {
      result = [];
      for (index = 0; index < 4; index++) {
        unshift(result, host % 256);
        host = floor(host / 256);
      }
      return join(result, '.');
    }

    // ipv6
    if (typeof host == 'object') {
      result = '';
      compress = findLongestZeroSequence(host);
      for (index = 0; index < 8; index++) {
        if (ignore0 && host[index] === 0) continue;
        if (ignore0) ignore0 = false;
        if (compress === index) {
          result += index ? ':' : '::';
          ignore0 = true;
        } else {
          result += numberToString(host[index], 16);
          if (index < 7) result += ':';
        }
      }
      return '[' + result + ']';
    }

    return host;
  };

  var C0ControlPercentEncodeSet = {};
  var fragmentPercentEncodeSet = assign({}, C0ControlPercentEncodeSet, {
    ' ': 1, '"': 1, '<': 1, '>': 1, '`': 1
  });
  var pathPercentEncodeSet = assign({}, fragmentPercentEncodeSet, {
    '#': 1, '?': 1, '{': 1, '}': 1
  });
  var userinfoPercentEncodeSet = assign({}, pathPercentEncodeSet, {
    '/': 1, ':': 1, ';': 1, '=': 1, '@': 1, '[': 1, '\\': 1, ']': 1, '^': 1, '|': 1
  });

  var percentEncode = function (chr, set) {
    var code = codeAt(chr, 0);
    return code > 0x20 && code < 0x7F && !hasOwn(set, chr) ? chr : encodeURIComponent(chr);
  };

  // https://url.spec.whatwg.org/#special-scheme
  var specialSchemes = {
    ftp: 21,
    file: null,
    http: 80,
    https: 443,
    ws: 80,
    wss: 443
  };

  // https://url.spec.whatwg.org/#windows-drive-letter
  var isWindowsDriveLetter = function (string, normalized) {
    var second;
    return string.length === 2 && exec(ALPHA, charAt(string, 0))
      && ((second = charAt(string, 1)) === ':' || (!normalized && second === '|'));
  };

  // https://url.spec.whatwg.org/#start-with-a-windows-drive-letter
  var startsWithWindowsDriveLetter = function (string) {
    var third;
    return string.length > 1 && isWindowsDriveLetter(stringSlice(string, 0, 2)) && (
      string.length === 2 ||
      ((third = charAt(string, 2)) === '/' || third === '\\' || third === '?' || third === '#')
    );
  };

  // https://url.spec.whatwg.org/#single-dot-path-segment
  var isSingleDot = function (segment) {
    return segment === '.' || toLowerCase(segment) === '%2e';
  };

  // https://url.spec.whatwg.org/#double-dot-path-segment
  var isDoubleDot = function (segment) {
    segment = toLowerCase(segment);
    return segment === '..' || segment === '%2e.' || segment === '.%2e' || segment === '%2e%2e';
  };

  // States:
  var SCHEME_START = {};
  var SCHEME = {};
  var NO_SCHEME = {};
  var SPECIAL_RELATIVE_OR_AUTHORITY = {};
  var PATH_OR_AUTHORITY = {};
  var RELATIVE = {};
  var RELATIVE_SLASH = {};
  var SPECIAL_AUTHORITY_SLASHES = {};
  var SPECIAL_AUTHORITY_IGNORE_SLASHES = {};
  var AUTHORITY = {};
  var HOST = {};
  var HOSTNAME = {};
  var PORT = {};
  var FILE = {};
  var FILE_SLASH = {};
  var FILE_HOST = {};
  var PATH_START = {};
  var PATH = {};
  var CANNOT_BE_A_BASE_URL_PATH = {};
  var QUERY = {};
  var FRAGMENT = {};

  var URLState = function (url, isBase, base) {
    var urlString = $toString(url);
    var baseState, failure, searchParams;
    if (isBase) {
      failure = this.parse(urlString);
      if (failure) throw new TypeError$1(failure);
      this.searchParams = null;
    } else {
      if (base !== undefined) baseState = new URLState(base, true);
      failure = this.parse(urlString, null, baseState);
      if (failure) throw new TypeError$1(failure);
      searchParams = getInternalSearchParamsState(new URLSearchParams$1());
      searchParams.bindURL(this);
      this.searchParams = searchParams;
    }
  };

  URLState.prototype = {
    type: 'URL',
    // https://url.spec.whatwg.org/#url-parsing
    // eslint-disable-next-line max-statements -- TODO
    parse: function (input, stateOverride, base) {
      var url = this;
      var state = stateOverride || SCHEME_START;
      var pointer = 0;
      var buffer = '';
      var seenAt = false;
      var seenBracket = false;
      var seenPasswordToken = false;
      var codePoints, chr, bufferCodePoints, failure;

      input = $toString(input);

      if (!stateOverride) {
        url.scheme = '';
        url.username = '';
        url.password = '';
        url.host = null;
        url.port = null;
        url.path = [];
        url.query = null;
        url.fragment = null;
        url.cannotBeABaseURL = false;
        input = replace(input, LEADING_C0_CONTROL_OR_SPACE, '');
        input = replace(input, TRAILING_C0_CONTROL_OR_SPACE, '$1');
      }

      input = replace(input, TAB_AND_NEW_LINE, '');

      codePoints = arrayFrom(input);

      while (pointer <= codePoints.length) {
        chr = codePoints[pointer];
        switch (state) {
          case SCHEME_START:
            if (chr && exec(ALPHA, chr)) {
              buffer += toLowerCase(chr);
              state = SCHEME;
            } else if (!stateOverride) {
              state = NO_SCHEME;
              continue;
            } else return INVALID_SCHEME;
            break;

          case SCHEME:
            if (chr && (exec(ALPHANUMERIC, chr) || chr === '+' || chr === '-' || chr === '.')) {
              buffer += toLowerCase(chr);
            } else if (chr === ':') {
              if (stateOverride && (
                (url.isSpecial() !== hasOwn(specialSchemes, buffer)) ||
                (buffer === 'file' && (url.includesCredentials() || url.port !== null)) ||
                (url.scheme === 'file' && !url.host)
              )) return;
              url.scheme = buffer;
              if (stateOverride) {
                if (url.isSpecial() && specialSchemes[url.scheme] === url.port) url.port = null;
                return;
              }
              buffer = '';
              if (url.scheme === 'file') {
                state = FILE;
              } else if (url.isSpecial() && base && base.scheme === url.scheme) {
                state = SPECIAL_RELATIVE_OR_AUTHORITY;
              } else if (url.isSpecial()) {
                state = SPECIAL_AUTHORITY_SLASHES;
              } else if (codePoints[pointer + 1] === '/') {
                state = PATH_OR_AUTHORITY;
                pointer++;
              } else {
                url.cannotBeABaseURL = true;
                push$1(url.path, '');
                state = CANNOT_BE_A_BASE_URL_PATH;
              }
            } else if (!stateOverride) {
              buffer = '';
              state = NO_SCHEME;
              pointer = 0;
              continue;
            } else return INVALID_SCHEME;
            break;

          case NO_SCHEME:
            if (!base || (base.cannotBeABaseURL && chr !== '#')) return INVALID_SCHEME;
            if (base.cannotBeABaseURL && chr === '#') {
              url.scheme = base.scheme;
              url.path = arraySlice(base.path);
              url.query = base.query;
              url.fragment = '';
              url.cannotBeABaseURL = true;
              state = FRAGMENT;
              break;
            }
            state = base.scheme === 'file' ? FILE : RELATIVE;
            continue;

          case SPECIAL_RELATIVE_OR_AUTHORITY:
            if (chr === '/' && codePoints[pointer + 1] === '/') {
              state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
              pointer++;
            } else {
              state = RELATIVE;
              continue;
            } break;

          case PATH_OR_AUTHORITY:
            if (chr === '/') {
              state = AUTHORITY;
              break;
            } else {
              state = PATH;
              continue;
            }

          case RELATIVE:
            url.scheme = base.scheme;
            if (chr === EOF) {
              url.username = base.username;
              url.password = base.password;
              url.host = base.host;
              url.port = base.port;
              url.path = arraySlice(base.path);
              url.query = base.query;
            } else if (chr === '/' || (chr === '\\' && url.isSpecial())) {
              state = RELATIVE_SLASH;
            } else if (chr === '?') {
              url.username = base.username;
              url.password = base.password;
              url.host = base.host;
              url.port = base.port;
              url.path = arraySlice(base.path);
              url.query = '';
              state = QUERY;
            } else if (chr === '#') {
              url.username = base.username;
              url.password = base.password;
              url.host = base.host;
              url.port = base.port;
              url.path = arraySlice(base.path);
              url.query = base.query;
              url.fragment = '';
              state = FRAGMENT;
            } else {
              url.username = base.username;
              url.password = base.password;
              url.host = base.host;
              url.port = base.port;
              url.path = arraySlice(base.path);
              url.path.length--;
              state = PATH;
              continue;
            } break;

          case RELATIVE_SLASH:
            if (url.isSpecial() && (chr === '/' || chr === '\\')) {
              state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
            } else if (chr === '/') {
              state = AUTHORITY;
            } else {
              url.username = base.username;
              url.password = base.password;
              url.host = base.host;
              url.port = base.port;
              state = PATH;
              continue;
            } break;

          case SPECIAL_AUTHORITY_SLASHES:
            state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
            if (chr !== '/' || charAt(buffer, pointer + 1) !== '/') continue;
            pointer++;
            break;

          case SPECIAL_AUTHORITY_IGNORE_SLASHES:
            if (chr !== '/' && chr !== '\\') {
              state = AUTHORITY;
              continue;
            } break;

          case AUTHORITY:
            if (chr === '@') {
              if (seenAt) buffer = '%40' + buffer;
              seenAt = true;
              bufferCodePoints = arrayFrom(buffer);
              for (var i = 0; i < bufferCodePoints.length; i++) {
                var codePoint = bufferCodePoints[i];
                if (codePoint === ':' && !seenPasswordToken) {
                  seenPasswordToken = true;
                  continue;
                }
                var encodedCodePoints = percentEncode(codePoint, userinfoPercentEncodeSet);
                if (seenPasswordToken) url.password += encodedCodePoints;
                else url.username += encodedCodePoints;
              }
              buffer = '';
            } else if (
              chr === EOF || chr === '/' || chr === '?' || chr === '#' ||
              (chr === '\\' && url.isSpecial())
            ) {
              if (seenAt && buffer === '') return INVALID_AUTHORITY;
              pointer -= arrayFrom(buffer).length + 1;
              buffer = '';
              state = HOST;
            } else buffer += chr;
            break;

          case HOST:
          case HOSTNAME:
            if (stateOverride && url.scheme === 'file') {
              state = FILE_HOST;
              continue;
            } else if (chr === ':' && !seenBracket) {
              if (buffer === '') return INVALID_HOST;
              failure = url.parseHost(buffer);
              if (failure) return failure;
              buffer = '';
              state = PORT;
              if (stateOverride === HOSTNAME) return;
            } else if (
              chr === EOF || chr === '/' || chr === '?' || chr === '#' ||
              (chr === '\\' && url.isSpecial())
            ) {
              if (url.isSpecial() && buffer === '') return INVALID_HOST;
              if (stateOverride && buffer === '' && (url.includesCredentials() || url.port !== null)) return;
              failure = url.parseHost(buffer);
              if (failure) return failure;
              buffer = '';
              state = PATH_START;
              if (stateOverride) return;
              continue;
            } else {
              if (chr === '[') seenBracket = true;
              else if (chr === ']') seenBracket = false;
              buffer += chr;
            } break;

          case PORT:
            if (exec(DIGIT, chr)) {
              buffer += chr;
            } else if (
              chr === EOF || chr === '/' || chr === '?' || chr === '#' ||
              (chr === '\\' && url.isSpecial()) ||
              stateOverride
            ) {
              if (buffer !== '') {
                var port = parseInt$1(buffer, 10);
                if (port > 0xFFFF) return INVALID_PORT;
                url.port = (url.isSpecial() && port === specialSchemes[url.scheme]) ? null : port;
                buffer = '';
              }
              if (stateOverride) return;
              state = PATH_START;
              continue;
            } else return INVALID_PORT;
            break;

          case FILE:
            url.scheme = 'file';
            if (chr === '/' || chr === '\\') state = FILE_SLASH;
            else if (base && base.scheme === 'file') {
              switch (chr) {
                case EOF:
                  url.host = base.host;
                  url.path = arraySlice(base.path);
                  url.query = base.query;
                  break;
                case '?':
                  url.host = base.host;
                  url.path = arraySlice(base.path);
                  url.query = '';
                  state = QUERY;
                  break;
                case '#':
                  url.host = base.host;
                  url.path = arraySlice(base.path);
                  url.query = base.query;
                  url.fragment = '';
                  state = FRAGMENT;
                  break;
                default:
                  if (!startsWithWindowsDriveLetter(join(arraySlice(codePoints, pointer), ''))) {
                    url.host = base.host;
                    url.path = arraySlice(base.path);
                    url.shortenPath();
                  }
                  state = PATH;
                  continue;
              }
            } else {
              state = PATH;
              continue;
            } break;

          case FILE_SLASH:
            if (chr === '/' || chr === '\\') {
              state = FILE_HOST;
              break;
            }
            if (base && base.scheme === 'file' && !startsWithWindowsDriveLetter(join(arraySlice(codePoints, pointer), ''))) {
              if (isWindowsDriveLetter(base.path[0], true)) push$1(url.path, base.path[0]);
              else url.host = base.host;
            }
            state = PATH;
            continue;

          case FILE_HOST:
            if (chr === EOF || chr === '/' || chr === '\\' || chr === '?' || chr === '#') {
              if (!stateOverride && isWindowsDriveLetter(buffer)) {
                state = PATH;
              } else if (buffer === '') {
                url.host = '';
                if (stateOverride) return;
                state = PATH_START;
              } else {
                failure = url.parseHost(buffer);
                if (failure) return failure;
                if (url.host === 'localhost') url.host = '';
                if (stateOverride) return;
                buffer = '';
                state = PATH_START;
              } continue;
            } else buffer += chr;
            break;

          case PATH_START:
            if (url.isSpecial()) {
              state = PATH;
              if (chr !== '/' && chr !== '\\') continue;
            } else if (!stateOverride && chr === '?') {
              url.query = '';
              state = QUERY;
            } else if (!stateOverride && chr === '#') {
              url.fragment = '';
              state = FRAGMENT;
            } else if (chr !== EOF) {
              state = PATH;
              if (chr !== '/') continue;
            } break;

          case PATH:
            if (
              chr === EOF || chr === '/' ||
              (chr === '\\' && url.isSpecial()) ||
              (!stateOverride && (chr === '?' || chr === '#'))
            ) {
              if (isDoubleDot(buffer)) {
                url.shortenPath();
                if (chr !== '/' && !(chr === '\\' && url.isSpecial())) {
                  push$1(url.path, '');
                }
              } else if (isSingleDot(buffer)) {
                if (chr !== '/' && !(chr === '\\' && url.isSpecial())) {
                  push$1(url.path, '');
                }
              } else {
                if (url.scheme === 'file' && !url.path.length && isWindowsDriveLetter(buffer)) {
                  if (url.host) url.host = '';
                  buffer = charAt(buffer, 0) + ':'; // normalize windows drive letter
                }
                push$1(url.path, buffer);
              }
              buffer = '';
              if (url.scheme === 'file' && (chr === EOF || chr === '?' || chr === '#')) {
                while (url.path.length > 1 && url.path[0] === '') {
                  shift(url.path);
                }
              }
              if (chr === '?') {
                url.query = '';
                state = QUERY;
              } else if (chr === '#') {
                url.fragment = '';
                state = FRAGMENT;
              }
            } else {
              buffer += percentEncode(chr, pathPercentEncodeSet);
            } break;

          case CANNOT_BE_A_BASE_URL_PATH:
            if (chr === '?') {
              url.query = '';
              state = QUERY;
            } else if (chr === '#') {
              url.fragment = '';
              state = FRAGMENT;
            } else if (chr !== EOF) {
              url.path[0] += percentEncode(chr, C0ControlPercentEncodeSet);
            } break;

          case QUERY:
            if (!stateOverride && chr === '#') {
              url.fragment = '';
              state = FRAGMENT;
            } else if (chr !== EOF) {
              if (chr === "'" && url.isSpecial()) url.query += '%27';
              else if (chr === '#') url.query += '%23';
              else url.query += percentEncode(chr, C0ControlPercentEncodeSet);
            } break;

          case FRAGMENT:
            if (chr !== EOF) url.fragment += percentEncode(chr, fragmentPercentEncodeSet);
            break;
        }

        pointer++;
      }
    },
    // https://url.spec.whatwg.org/#host-parsing
    parseHost: function (input) {
      var result, codePoints, index;
      if (charAt(input, 0) === '[') {
        if (charAt(input, input.length - 1) !== ']') return INVALID_HOST;
        result = parseIPv6(stringSlice(input, 1, -1));
        if (!result) return INVALID_HOST;
        this.host = result;
      // opaque host
      } else if (!this.isSpecial()) {
        if (exec(FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT, input)) return INVALID_HOST;
        result = '';
        codePoints = arrayFrom(input);
        for (index = 0; index < codePoints.length; index++) {
          result += percentEncode(codePoints[index], C0ControlPercentEncodeSet);
        }
        this.host = result;
      } else {
        input = toASCII(input);
        if (exec(FORBIDDEN_HOST_CODE_POINT, input)) return INVALID_HOST;
        result = parseIPv4(input);
        if (result === null) return INVALID_HOST;
        this.host = result;
      }
    },
    // https://url.spec.whatwg.org/#cannot-have-a-username-password-port
    cannotHaveUsernamePasswordPort: function () {
      return !this.host || this.cannotBeABaseURL || this.scheme === 'file';
    },
    // https://url.spec.whatwg.org/#include-credentials
    includesCredentials: function () {
      return this.username !== '' || this.password !== '';
    },
    // https://url.spec.whatwg.org/#is-special
    isSpecial: function () {
      return hasOwn(specialSchemes, this.scheme);
    },
    // https://url.spec.whatwg.org/#shorten-a-urls-path
    shortenPath: function () {
      var path = this.path;
      var pathSize = path.length;
      if (pathSize && (this.scheme !== 'file' || pathSize !== 1 || !isWindowsDriveLetter(path[0], true))) {
        path.length--;
      }
    },
    // https://url.spec.whatwg.org/#concept-url-serializer
    serialize: function () {
      var url = this;
      var scheme = url.scheme;
      var username = url.username;
      var password = url.password;
      var host = url.host;
      var port = url.port;
      var path = url.path;
      var query = url.query;
      var fragment = url.fragment;
      var output = scheme + ':';
      if (host !== null) {
        output += '//';
        if (url.includesCredentials()) {
          output += username + (password ? ':' + password : '') + '@';
        }
        output += serializeHost(host);
        if (port !== null) output += ':' + port;
      } else if (scheme === 'file') output += '//';
      output += url.cannotBeABaseURL ? path[0] : path.length ? '/' + join(path, '/') : '';
      if (query !== null) output += '?' + query;
      if (fragment !== null) output += '#' + fragment;
      return output;
    },
    // https://url.spec.whatwg.org/#dom-url-href
    setHref: function (href) {
      var failure = this.parse(href);
      if (failure) throw new TypeError$1(failure);
      this.searchParams.update();
    },
    // https://url.spec.whatwg.org/#dom-url-origin
    getOrigin: function () {
      var scheme = this.scheme;
      var port = this.port;
      if (scheme === 'blob') try {
        return new URLConstructor(scheme.path[0]).origin;
      } catch (error) {
        return 'null';
      }
      if (scheme === 'file' || !this.isSpecial()) return 'null';
      return scheme + '://' + serializeHost(this.host) + (port !== null ? ':' + port : '');
    },
    // https://url.spec.whatwg.org/#dom-url-protocol
    getProtocol: function () {
      return this.scheme + ':';
    },
    setProtocol: function (protocol) {
      this.parse($toString(protocol) + ':', SCHEME_START);
    },
    // https://url.spec.whatwg.org/#dom-url-username
    getUsername: function () {
      return this.username;
    },
    setUsername: function (username) {
      var codePoints = arrayFrom($toString(username));
      if (this.cannotHaveUsernamePasswordPort()) return;
      this.username = '';
      for (var i = 0; i < codePoints.length; i++) {
        this.username += percentEncode(codePoints[i], userinfoPercentEncodeSet);
      }
    },
    // https://url.spec.whatwg.org/#dom-url-password
    getPassword: function () {
      return this.password;
    },
    setPassword: function (password) {
      var codePoints = arrayFrom($toString(password));
      if (this.cannotHaveUsernamePasswordPort()) return;
      this.password = '';
      for (var i = 0; i < codePoints.length; i++) {
        this.password += percentEncode(codePoints[i], userinfoPercentEncodeSet);
      }
    },
    // https://url.spec.whatwg.org/#dom-url-host
    getHost: function () {
      var host = this.host;
      var port = this.port;
      return host === null ? ''
        : port === null ? serializeHost(host)
        : serializeHost(host) + ':' + port;
    },
    setHost: function (host) {
      if (this.cannotBeABaseURL) return;
      this.parse(host, HOST);
    },
    // https://url.spec.whatwg.org/#dom-url-hostname
    getHostname: function () {
      var host = this.host;
      return host === null ? '' : serializeHost(host);
    },
    setHostname: function (hostname) {
      if (this.cannotBeABaseURL) return;
      this.parse(hostname, HOSTNAME);
    },
    // https://url.spec.whatwg.org/#dom-url-port
    getPort: function () {
      var port = this.port;
      return port === null ? '' : $toString(port);
    },
    setPort: function (port) {
      if (this.cannotHaveUsernamePasswordPort()) return;
      port = $toString(port);
      if (port === '') this.port = null;
      else this.parse(port, PORT);
    },
    // https://url.spec.whatwg.org/#dom-url-pathname
    getPathname: function () {
      var path = this.path;
      return this.cannotBeABaseURL ? path[0] : path.length ? '/' + join(path, '/') : '';
    },
    setPathname: function (pathname) {
      if (this.cannotBeABaseURL) return;
      this.path = [];
      this.parse(pathname, PATH_START);
    },
    // https://url.spec.whatwg.org/#dom-url-search
    getSearch: function () {
      var query = this.query;
      return query ? '?' + query : '';
    },
    setSearch: function (search) {
      search = $toString(search);
      if (search === '') {
        this.query = null;
      } else {
        if (charAt(search, 0) === '?') search = stringSlice(search, 1);
        this.query = '';
        this.parse(search, QUERY);
      }
      this.searchParams.update();
    },
    // https://url.spec.whatwg.org/#dom-url-searchparams
    getSearchParams: function () {
      return this.searchParams.facade;
    },
    // https://url.spec.whatwg.org/#dom-url-hash
    getHash: function () {
      var fragment = this.fragment;
      return fragment ? '#' + fragment : '';
    },
    setHash: function (hash) {
      hash = $toString(hash);
      if (hash === '') {
        this.fragment = null;
        return;
      }
      if (charAt(hash, 0) === '#') hash = stringSlice(hash, 1);
      this.fragment = '';
      this.parse(hash, FRAGMENT);
    },
    update: function () {
      this.query = this.searchParams.serialize() || null;
    }
  };

  // `URL` constructor
  // https://url.spec.whatwg.org/#url-class
  var URLConstructor = function URL(url /* , base */) {
    var that = anInstance(this, URLPrototype);
    var base = validateArgumentsLength$2(arguments.length, 1) > 1 ? arguments[1] : undefined;
    var state = setInternalState(that, new URLState(url, false, base));
    if (!DESCRIPTORS$1) {
      that.href = state.serialize();
      that.origin = state.getOrigin();
      that.protocol = state.getProtocol();
      that.username = state.getUsername();
      that.password = state.getPassword();
      that.host = state.getHost();
      that.hostname = state.getHostname();
      that.port = state.getPort();
      that.pathname = state.getPathname();
      that.search = state.getSearch();
      that.searchParams = state.getSearchParams();
      that.hash = state.getHash();
    }
  };

  var URLPrototype = URLConstructor.prototype;

  var accessorDescriptor = function (getter, setter) {
    return {
      get: function () {
        return getInternalURLState(this)[getter]();
      },
      set: setter && function (value) {
        return getInternalURLState(this)[setter](value);
      },
      configurable: true,
      enumerable: true
    };
  };

  if (DESCRIPTORS$1) {
    // `URL.prototype.href` accessors pair
    // https://url.spec.whatwg.org/#dom-url-href
    defineBuiltInAccessor$1(URLPrototype, 'href', accessorDescriptor('serialize', 'setHref'));
    // `URL.prototype.origin` getter
    // https://url.spec.whatwg.org/#dom-url-origin
    defineBuiltInAccessor$1(URLPrototype, 'origin', accessorDescriptor('getOrigin'));
    // `URL.prototype.protocol` accessors pair
    // https://url.spec.whatwg.org/#dom-url-protocol
    defineBuiltInAccessor$1(URLPrototype, 'protocol', accessorDescriptor('getProtocol', 'setProtocol'));
    // `URL.prototype.username` accessors pair
    // https://url.spec.whatwg.org/#dom-url-username
    defineBuiltInAccessor$1(URLPrototype, 'username', accessorDescriptor('getUsername', 'setUsername'));
    // `URL.prototype.password` accessors pair
    // https://url.spec.whatwg.org/#dom-url-password
    defineBuiltInAccessor$1(URLPrototype, 'password', accessorDescriptor('getPassword', 'setPassword'));
    // `URL.prototype.host` accessors pair
    // https://url.spec.whatwg.org/#dom-url-host
    defineBuiltInAccessor$1(URLPrototype, 'host', accessorDescriptor('getHost', 'setHost'));
    // `URL.prototype.hostname` accessors pair
    // https://url.spec.whatwg.org/#dom-url-hostname
    defineBuiltInAccessor$1(URLPrototype, 'hostname', accessorDescriptor('getHostname', 'setHostname'));
    // `URL.prototype.port` accessors pair
    // https://url.spec.whatwg.org/#dom-url-port
    defineBuiltInAccessor$1(URLPrototype, 'port', accessorDescriptor('getPort', 'setPort'));
    // `URL.prototype.pathname` accessors pair
    // https://url.spec.whatwg.org/#dom-url-pathname
    defineBuiltInAccessor$1(URLPrototype, 'pathname', accessorDescriptor('getPathname', 'setPathname'));
    // `URL.prototype.search` accessors pair
    // https://url.spec.whatwg.org/#dom-url-search
    defineBuiltInAccessor$1(URLPrototype, 'search', accessorDescriptor('getSearch', 'setSearch'));
    // `URL.prototype.searchParams` getter
    // https://url.spec.whatwg.org/#dom-url-searchparams
    defineBuiltInAccessor$1(URLPrototype, 'searchParams', accessorDescriptor('getSearchParams'));
    // `URL.prototype.hash` accessors pair
    // https://url.spec.whatwg.org/#dom-url-hash
    defineBuiltInAccessor$1(URLPrototype, 'hash', accessorDescriptor('getHash', 'setHash'));
  }

  // `URL.prototype.toJSON` method
  // https://url.spec.whatwg.org/#dom-url-tojson
  defineBuiltIn$2(URLPrototype, 'toJSON', function toJSON() {
    return getInternalURLState(this).serialize();
  }, { enumerable: true });

  // `URL.prototype.toString` method
  // https://url.spec.whatwg.org/#URL-stringification-behavior
  defineBuiltIn$2(URLPrototype, 'toString', function toString() {
    return getInternalURLState(this).serialize();
  }, { enumerable: true });

  if (NativeURL) {
    var nativeCreateObjectURL = NativeURL.createObjectURL;
    var nativeRevokeObjectURL = NativeURL.revokeObjectURL;
    // `URL.createObjectURL` method
    // https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
    if (nativeCreateObjectURL) defineBuiltIn$2(URLConstructor, 'createObjectURL', bind(nativeCreateObjectURL, NativeURL));
    // `URL.revokeObjectURL` method
    // https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL
    if (nativeRevokeObjectURL) defineBuiltIn$2(URLConstructor, 'revokeObjectURL', bind(nativeRevokeObjectURL, NativeURL));
  }

  setToStringTag(URLConstructor, 'URL');

  $$1({ global: true, constructor: true, forced: !USE_NATIVE_URL, sham: !DESCRIPTORS$1 }, {
    URL: URLConstructor
  });

  var $ = _export;
  var call = functionCall;

  // `URL.prototype.toJSON` method
  // https://url.spec.whatwg.org/#dom-url-tojson
  $({ target: 'URL', proto: true, enumerable: true }, {
    toJSON: function toJSON() {
      return call(URL.prototype.toString, this);
    }
  });

  var defineBuiltIn$1 = defineBuiltIn$k;
  var uncurryThis$2 = functionUncurryThis;
  var toString$1 = toString$o;
  var validateArgumentsLength$1 = validateArgumentsLength$6;

  var $URLSearchParams$1 = URLSearchParams;
  var URLSearchParamsPrototype$2 = $URLSearchParams$1.prototype;
  var append = uncurryThis$2(URLSearchParamsPrototype$2.append);
  var $delete = uncurryThis$2(URLSearchParamsPrototype$2['delete']);
  var forEach$1 = uncurryThis$2(URLSearchParamsPrototype$2.forEach);
  var push = uncurryThis$2([].push);
  var params$1 = new $URLSearchParams$1('a=1&a=2&b=3');

  params$1['delete']('a', 1);
  // `undefined` case is a Chromium 117 bug
  // https://bugs.chromium.org/p/v8/issues/detail?id=14222
  params$1['delete']('b', undefined);

  if (params$1 + '' !== 'a=2') {
    defineBuiltIn$1(URLSearchParamsPrototype$2, 'delete', function (name /* , value */) {
      var length = arguments.length;
      var $value = length < 2 ? undefined : arguments[1];
      if (length && $value === undefined) return $delete(this, name);
      var entries = [];
      forEach$1(this, function (v, k) { // also validates `this`
        push(entries, { key: k, value: v });
      });
      validateArgumentsLength$1(length, 1);
      var key = toString$1(name);
      var value = toString$1($value);
      var index = 0;
      var dindex = 0;
      var found = false;
      var entriesLength = entries.length;
      var entry;
      while (index < entriesLength) {
        entry = entries[index++];
        if (found || entry.key === key) {
          found = true;
          $delete(this, entry.key);
        } else dindex++;
      }
      while (dindex < entriesLength) {
        entry = entries[dindex++];
        if (!(entry.key === key && entry.value === value)) append(this, entry.key, entry.value);
      }
    }, { enumerable: true, unsafe: true });
  }

  var defineBuiltIn = defineBuiltIn$k;
  var uncurryThis$1 = functionUncurryThis;
  var toString = toString$o;
  var validateArgumentsLength = validateArgumentsLength$6;

  var $URLSearchParams = URLSearchParams;
  var URLSearchParamsPrototype$1 = $URLSearchParams.prototype;
  var getAll = uncurryThis$1(URLSearchParamsPrototype$1.getAll);
  var $has = uncurryThis$1(URLSearchParamsPrototype$1.has);
  var params = new $URLSearchParams('a=1');

  // `undefined` case is a Chromium 117 bug
  // https://bugs.chromium.org/p/v8/issues/detail?id=14222
  if (params.has('a', 2) || !params.has('a', undefined)) {
    defineBuiltIn(URLSearchParamsPrototype$1, 'has', function has(name /* , value */) {
      var length = arguments.length;
      var $value = length < 2 ? undefined : arguments[1];
      if (length && $value === undefined) return $has(this, name);
      var values = getAll(this, name); // also validates `this`
      validateArgumentsLength(length, 1);
      var value = toString($value);
      var index = 0;
      while (index < values.length) {
        if (values[index++] === value) return true;
      } return false;
    }, { enumerable: true, unsafe: true });
  }

  var DESCRIPTORS = descriptors;
  var uncurryThis = functionUncurryThis;
  var defineBuiltInAccessor = defineBuiltInAccessor$f;

  var URLSearchParamsPrototype = URLSearchParams.prototype;
  var forEach = uncurryThis(URLSearchParamsPrototype.forEach);

  // `URLSearchParams.prototype.size` getter
  // https://github.com/whatwg/url/pull/734
  if (DESCRIPTORS && !('size' in URLSearchParamsPrototype)) {
    defineBuiltInAccessor(URLSearchParamsPrototype, 'size', {
      get: function size() {
        var count = 0;
        forEach(this, function () { count++; });
        return count;
      },
      configurable: true,
      enumerable: true
    });
  }

  /*!
   * SJS 6.15.1
   */

  !function(){function e(e,t){return (t||"")+" (SystemJS https://github.com/systemjs/systemjs/blob/main/docs/errors.md#"+e+")"}function t(e,t){if(-1!==e.indexOf("\\")&&(e=e.replace(S,"/")),"/"===e[0]&&"/"===e[1])return t.slice(0,t.indexOf(":")+1)+e;if("."===e[0]&&("/"===e[1]||"."===e[1]&&("/"===e[2]||2===e.length&&(e+="/"))||1===e.length&&(e+="/"))||"/"===e[0]){var r,n=t.slice(0,t.indexOf(":")+1);if(r="/"===t[n.length+1]?"file:"!==n?(r=t.slice(n.length+2)).slice(r.indexOf("/")+1):t.slice(8):t.slice(n.length+("/"===t[n.length])),"/"===e[0])return t.slice(0,t.length-r.length-1)+e;for(var i=r.slice(0,r.lastIndexOf("/")+1)+e,o=[],s=-1,c=0;c<i.length;c++)-1!==s?"/"===i[c]&&(o.push(i.slice(s,c+1)),s=-1):"."===i[c]?"."!==i[c+1]||"/"!==i[c+2]&&c+2!==i.length?"/"===i[c+1]||c+1===i.length?c+=1:s=c:(o.pop(),c+=2):s=c;return -1!==s&&o.push(i.slice(s)),t.slice(0,t.length-r.length)+o.join("")}}function r(e,r){return t(e,r)||(-1!==e.indexOf(":")?e:t("./"+e,r))}function n(e,r,n,i,o){for(var s in e){var f=t(s,n)||s,a=e[s];if("string"==typeof a){var l=u(i,t(a,n)||a,o);l?r[f]=l:c("W1",s,a);}}}function i(e,t,i){var o;for(o in e.imports&&n(e.imports,i.imports,t,i,null),e.scopes||{}){var s=r(o,t);n(e.scopes[o],i.scopes[s]||(i.scopes[s]={}),t,i,s);}for(o in e.depcache||{})i.depcache[r(o,t)]=e.depcache[o];for(o in e.integrity||{})i.integrity[r(o,t)]=e.integrity[o];}function o(e,t){if(t[e])return e;var r=e.length;do{var n=e.slice(0,r+1);if(n in t)return n}while(-1!==(r=e.lastIndexOf("/",r-1)))}function s(e,t){var r=o(e,t);if(r){var n=t[r];if(null===n)return;if(!(e.length>r.length&&"/"!==n[n.length-1]))return n+e.slice(r.length);c("W2",r,n);}}function c(t,r,n){console.warn(e(t,[n,r].join(", ")));}function u(e,t,r){for(var n=e.scopes,i=r&&o(r,n);i;){var c=s(t,n[i]);if(c)return c;i=o(i.slice(0,i.lastIndexOf("/")),n);}return s(t,e.imports)||-1!==t.indexOf(":")&&t}function f(){this[b]={};}function a(t,r,n,i){var o=t[b][r];if(o)return o;var s=[],c=Object.create(null);j&&Object.defineProperty(c,j,{value:"Module"});var u=Promise.resolve().then((function(){return t.instantiate(r,n,i)})).then((function(n){if(!n)throw Error(e(2,r));var i=n[1]((function(e,t){o.h=!0;var r=!1;if("string"==typeof e)e in c&&c[e]===t||(c[e]=t,r=!0);else {for(var n in e)t=e[n],n in c&&c[n]===t||(c[n]=t,r=!0);e&&e.__esModule&&(c.__esModule=e.__esModule);}if(r)for(var i=0;i<s.length;i++){var u=s[i];u&&u(c);}return t}),2===n[1].length?{import:function(e,n){return t.import(e,r,n)},meta:t.createContext(r)}:void 0);return o.e=i.execute||function(){},[n[0],i.setters||[],n[2]||[]]}),(function(e){throw o.e=null,o.er=e,e})),f=u.then((function(e){return Promise.all(e[0].map((function(n,i){var o=e[1][i],s=e[2][i];return Promise.resolve(t.resolve(n,r)).then((function(e){var n=a(t,e,r,s);return Promise.resolve(n.I).then((function(){return o&&(n.i.push(o),!n.h&&n.I||o(n.n)),n}))}))}))).then((function(e){o.d=e;}))}));return o=t[b][r]={id:r,i:s,n:c,m:i,I:u,L:f,h:!1,d:void 0,e:void 0,er:void 0,E:void 0,C:void 0,p:void 0}}function l(e,t,r,n){if(!n[t.id])return n[t.id]=!0,Promise.resolve(t.L).then((function(){return t.p&&null!==t.p.e||(t.p=r),Promise.all(t.d.map((function(t){return l(e,t,r,n)})))})).catch((function(e){if(t.er)throw e;throw t.e=null,e}))}function h(e,t){return t.C=l(e,t,t,{}).then((function(){return d(e,t,{})})).then((function(){return t.n}))}function d(e,t,r){function n(){try{var e=o.call(I);if(e)return e=e.then((function(){t.C=t.n,t.E=null;}),(function(e){throw t.er=e,t.E=null,e})),t.E=e;t.C=t.n,t.L=t.I=void 0;}catch(r){throw t.er=r,r}}if(!r[t.id]){if(r[t.id]=!0,!t.e){if(t.er)throw t.er;return t.E?t.E:void 0}var i,o=t.e;return t.e=null,t.d.forEach((function(n){try{var o=d(e,n,r);o&&(i=i||[]).push(o);}catch(s){throw t.er=s,s}})),i?Promise.all(i).then(n):n()}}function v(){[].forEach.call(document.querySelectorAll("script"),(function(t){if(!t.sp)if("systemjs-module"===t.type){if(t.sp=!0,!t.src)return;System.import("import:"===t.src.slice(0,7)?t.src.slice(7):r(t.src,p)).catch((function(e){if(e.message.indexOf("https://github.com/systemjs/systemjs/blob/main/docs/errors.md#3")>-1){var r=document.createEvent("Event");r.initEvent("error",!1,!1),t.dispatchEvent(r);}return Promise.reject(e)}));}else if("systemjs-importmap"===t.type){t.sp=!0;var n=t.src?(System.fetch||fetch)(t.src,{integrity:t.integrity,priority:t.fetchPriority,passThrough:!0}).then((function(e){if(!e.ok)throw Error(e.status);return e.text()})).catch((function(r){return r.message=e("W4",t.src)+"\n"+r.message,console.warn(r),"function"==typeof t.onerror&&t.onerror(),"{}"})):t.innerHTML;M=M.then((function(){return n})).then((function(r){!function(t,r,n){var o={};try{o=JSON.parse(r);}catch(s){console.warn(Error(e("W5")));}i(o,n,t);}(R,r,t.src||p);}));}}));}var p,m="undefined"!=typeof Symbol,g="undefined"!=typeof self,y="undefined"!=typeof document,E=g?self:commonjsGlobal;if(y){var w=document.querySelector("base[href]");w&&(p=w.href);}if(!p&&"undefined"!=typeof location){var O=(p=location.href.split("#")[0].split("?")[0]).lastIndexOf("/");-1!==O&&(p=p.slice(0,O+1));}var x,S=/\\/g,j=m&&Symbol.toStringTag,b=m?Symbol():"@",P=f.prototype;P.import=function(e,t,r){var n=this;return t&&"object"==typeof t&&(r=t,t=void 0),Promise.resolve(n.prepareImport()).then((function(){return n.resolve(e,t,r)})).then((function(e){var t=a(n,e,void 0,r);return t.C||h(n,t)}))},P.createContext=function(e){var t=this;return {url:e,resolve:function(r,n){return Promise.resolve(t.resolve(r,n||e))}}},P.register=function(e,t,r){x=[e,t,r];},P.getRegister=function(){var e=x;return x=void 0,e};var I=Object.freeze(Object.create(null));E.System=new f;var L,C,M=Promise.resolve(),R={imports:{},scopes:{},depcache:{},integrity:{}},T=y;if(P.prepareImport=function(e){return (T||e)&&(v(),T=!1),M},P.getImportMap=function(){return JSON.parse(JSON.stringify(R))},y&&(v(),window.addEventListener("DOMContentLoaded",v)),P.addImportMap=function(e,t){i(e,t||p,R);},y){window.addEventListener("error",(function(e){J=e.filename,W=e.error;}));var _=location.origin;}P.createScript=function(e){var t=document.createElement("script");t.async=!0,e.indexOf(_+"/")&&(t.crossOrigin="anonymous");var r=R.integrity[e];return r&&(t.integrity=r),t.src=e,t};var J,W,q={},N=P.register;P.register=function(e,t){if(y&&"loading"===document.readyState&&"string"!=typeof e){var r=document.querySelectorAll("script[src]"),n=r[r.length-1];if(n){L=e;var i=this;C=setTimeout((function(){q[n.src]=[e,t],i.import(n.src);}));}}else L=void 0;return N.call(this,e,t)},P.instantiate=function(t,r){var n=q[t];if(n)return delete q[t],n;var i=this;return Promise.resolve(P.createScript(t)).then((function(n){return new Promise((function(o,s){n.addEventListener("error",(function(){s(Error(e(3,[t,r].join(", "))));})),n.addEventListener("load",(function(){if(document.head.removeChild(n),J===t)s(W);else {var e=i.getRegister(t);e&&e[0]===L&&clearTimeout(C),o(e);}})),document.head.appendChild(n);}))}))},P.shouldFetch=function(){return !1},"undefined"!=typeof fetch&&(P.fetch=fetch);var k=P.instantiate,A=/^(text|application)\/(x-)?javascript(;|$)/;P.instantiate=function(t,r,n){var i=this;return this.shouldFetch(t,r,n)?this.fetch(t,{credentials:"same-origin",integrity:R.integrity[t],meta:n}).then((function(n){if(!n.ok)throw Error(e(7,[n.status,n.statusText,t,r].join(", ")));var o=n.headers.get("content-type");if(!o||!A.test(o))throw Error(e(4,o));return n.text().then((function(e){return e.indexOf("//# sourceURL=")<0&&(e+="\n//# sourceURL="+t),(0, eval)(e),i.getRegister(t)}))})):k.apply(this,arguments)},P.resolve=function(r,n){return u(R,t(r,n=n||p)||r,n)||function(t,r){throw Error(e(8,[t,r].join(", ")))}(r,n)};var F=P.instantiate;P.instantiate=function(e,t,r){var n=R.depcache[e];if(n)for(var i=0;i<n.length;i++)a(this,this.resolve(n[i],e),e);return F.call(this,e,t,r)},g&&"function"==typeof importScripts&&(P.instantiate=function(e){var t=this;return Promise.resolve().then((function(){return importScripts(e),t.getRegister(e)}))});}();

})();
