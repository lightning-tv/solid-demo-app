export function __vite_legacy_guard(){import.meta.url;import("_").catch(()=>1);(async function*(){})().next()};var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var es_symbol_description = {};

var globalThis_1;
var hasRequiredGlobalThis;

function requireGlobalThis () {
	if (hasRequiredGlobalThis) return globalThis_1;
	hasRequiredGlobalThis = 1;
	var check = function (it) {
	  return it && it.Math === Math && it;
	};

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	globalThis_1 =
	  // eslint-disable-next-line es/no-global-this -- safe
	  check(typeof globalThis == 'object' && globalThis) ||
	  check(typeof window == 'object' && window) ||
	  // eslint-disable-next-line no-restricted-globals -- safe
	  check(typeof self == 'object' && self) ||
	  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
	  check(typeof globalThis_1 == 'object' && globalThis_1) ||
	  // eslint-disable-next-line no-new-func -- fallback
	  (function () { return this; })() || Function('return this')();
	return globalThis_1;
}

var objectGetOwnPropertyDescriptor = {};

var fails;
var hasRequiredFails;

function requireFails () {
	if (hasRequiredFails) return fails;
	hasRequiredFails = 1;
	fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};
	return fails;
}

var descriptors;
var hasRequiredDescriptors;

function requireDescriptors () {
	if (hasRequiredDescriptors) return descriptors;
	hasRequiredDescriptors = 1;
	var fails = requireFails();

	// Detect IE8's incomplete defineProperty implementation
	descriptors = !fails(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] !== 7;
	});
	return descriptors;
}

var functionBindNative;
var hasRequiredFunctionBindNative;

function requireFunctionBindNative () {
	if (hasRequiredFunctionBindNative) return functionBindNative;
	hasRequiredFunctionBindNative = 1;
	var fails = requireFails();

	functionBindNative = !fails(function () {
	  // eslint-disable-next-line es/no-function-prototype-bind -- safe
	  var test = (function () { /* empty */ }).bind();
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  return typeof test != 'function' || test.hasOwnProperty('prototype');
	});
	return functionBindNative;
}

var functionCall;
var hasRequiredFunctionCall;

function requireFunctionCall () {
	if (hasRequiredFunctionCall) return functionCall;
	hasRequiredFunctionCall = 1;
	var NATIVE_BIND = requireFunctionBindNative();

	var call = Function.prototype.call;

	functionCall = NATIVE_BIND ? call.bind(call) : function () {
	  return call.apply(call, arguments);
	};
	return functionCall;
}

var objectPropertyIsEnumerable = {};

var hasRequiredObjectPropertyIsEnumerable;

function requireObjectPropertyIsEnumerable () {
	if (hasRequiredObjectPropertyIsEnumerable) return objectPropertyIsEnumerable;
	hasRequiredObjectPropertyIsEnumerable = 1;
	var $propertyIsEnumerable = {}.propertyIsEnumerable;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// Nashorn ~ JDK8 bug
	var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

	// `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
	objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : $propertyIsEnumerable;
	return objectPropertyIsEnumerable;
}

var createPropertyDescriptor;
var hasRequiredCreatePropertyDescriptor;

function requireCreatePropertyDescriptor () {
	if (hasRequiredCreatePropertyDescriptor) return createPropertyDescriptor;
	hasRequiredCreatePropertyDescriptor = 1;
	createPropertyDescriptor = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};
	return createPropertyDescriptor;
}

var functionUncurryThis;
var hasRequiredFunctionUncurryThis;

function requireFunctionUncurryThis () {
	if (hasRequiredFunctionUncurryThis) return functionUncurryThis;
	hasRequiredFunctionUncurryThis = 1;
	var NATIVE_BIND = requireFunctionBindNative();

	var FunctionPrototype = Function.prototype;
	var call = FunctionPrototype.call;
	var uncurryThisWithBind = NATIVE_BIND && FunctionPrototype.bind.bind(call, call);

	functionUncurryThis = NATIVE_BIND ? uncurryThisWithBind : function (fn) {
	  return function () {
	    return call.apply(fn, arguments);
	  };
	};
	return functionUncurryThis;
}

var classofRaw;
var hasRequiredClassofRaw;

function requireClassofRaw () {
	if (hasRequiredClassofRaw) return classofRaw;
	hasRequiredClassofRaw = 1;
	var uncurryThis = requireFunctionUncurryThis();

	var toString = uncurryThis({}.toString);
	var stringSlice = uncurryThis(''.slice);

	classofRaw = function (it) {
	  return stringSlice(toString(it), 8, -1);
	};
	return classofRaw;
}

var indexedObject;
var hasRequiredIndexedObject;

function requireIndexedObject () {
	if (hasRequiredIndexedObject) return indexedObject;
	hasRequiredIndexedObject = 1;
	var uncurryThis = requireFunctionUncurryThis();
	var fails = requireFails();
	var classof = requireClassofRaw();

	var $Object = Object;
	var split = uncurryThis(''.split);

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	indexedObject = fails(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  return !$Object('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classof(it) === 'String' ? split(it, '') : $Object(it);
	} : $Object;
	return indexedObject;
}

var isNullOrUndefined;
var hasRequiredIsNullOrUndefined;

function requireIsNullOrUndefined () {
	if (hasRequiredIsNullOrUndefined) return isNullOrUndefined;
	hasRequiredIsNullOrUndefined = 1;
	// we can't use just `it == null` since of `document.all` special case
	// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
	isNullOrUndefined = function (it) {
	  return it === null || it === undefined;
	};
	return isNullOrUndefined;
}

var requireObjectCoercible;
var hasRequiredRequireObjectCoercible;

function requireRequireObjectCoercible () {
	if (hasRequiredRequireObjectCoercible) return requireObjectCoercible;
	hasRequiredRequireObjectCoercible = 1;
	var isNullOrUndefined = requireIsNullOrUndefined();

	var $TypeError = TypeError;

	// `RequireObjectCoercible` abstract operation
	// https://tc39.es/ecma262/#sec-requireobjectcoercible
	requireObjectCoercible = function (it) {
	  if (isNullOrUndefined(it)) throw new $TypeError("Can't call method on " + it);
	  return it;
	};
	return requireObjectCoercible;
}

var toIndexedObject;
var hasRequiredToIndexedObject;

function requireToIndexedObject () {
	if (hasRequiredToIndexedObject) return toIndexedObject;
	hasRequiredToIndexedObject = 1;
	// toObject with fallback for non-array-like ES3 strings
	var IndexedObject = requireIndexedObject();
	var requireObjectCoercible = requireRequireObjectCoercible();

	toIndexedObject = function (it) {
	  return IndexedObject(requireObjectCoercible(it));
	};
	return toIndexedObject;
}

var isCallable;
var hasRequiredIsCallable;

function requireIsCallable () {
	if (hasRequiredIsCallable) return isCallable;
	hasRequiredIsCallable = 1;
	// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
	var documentAll = typeof document == 'object' && document.all;

	// `IsCallable` abstract operation
	// https://tc39.es/ecma262/#sec-iscallable
	// eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
	isCallable = typeof documentAll == 'undefined' && documentAll !== undefined ? function (argument) {
	  return typeof argument == 'function' || argument === documentAll;
	} : function (argument) {
	  return typeof argument == 'function';
	};
	return isCallable;
}

var isObject;
var hasRequiredIsObject;

function requireIsObject () {
	if (hasRequiredIsObject) return isObject;
	hasRequiredIsObject = 1;
	var isCallable = requireIsCallable();

	isObject = function (it) {
	  return typeof it == 'object' ? it !== null : isCallable(it);
	};
	return isObject;
}

var getBuiltIn;
var hasRequiredGetBuiltIn;

function requireGetBuiltIn () {
	if (hasRequiredGetBuiltIn) return getBuiltIn;
	hasRequiredGetBuiltIn = 1;
	var globalThis = requireGlobalThis();
	var isCallable = requireIsCallable();

	var aFunction = function (argument) {
	  return isCallable(argument) ? argument : undefined;
	};

	getBuiltIn = function (namespace, method) {
	  return arguments.length < 2 ? aFunction(globalThis[namespace]) : globalThis[namespace] && globalThis[namespace][method];
	};
	return getBuiltIn;
}

var objectIsPrototypeOf;
var hasRequiredObjectIsPrototypeOf;

function requireObjectIsPrototypeOf () {
	if (hasRequiredObjectIsPrototypeOf) return objectIsPrototypeOf;
	hasRequiredObjectIsPrototypeOf = 1;
	var uncurryThis = requireFunctionUncurryThis();

	objectIsPrototypeOf = uncurryThis({}.isPrototypeOf);
	return objectIsPrototypeOf;
}

var environmentUserAgent;
var hasRequiredEnvironmentUserAgent;

function requireEnvironmentUserAgent () {
	if (hasRequiredEnvironmentUserAgent) return environmentUserAgent;
	hasRequiredEnvironmentUserAgent = 1;
	var globalThis = requireGlobalThis();

	var navigator = globalThis.navigator;
	var userAgent = navigator && navigator.userAgent;

	environmentUserAgent = userAgent ? String(userAgent) : '';
	return environmentUserAgent;
}

var environmentV8Version;
var hasRequiredEnvironmentV8Version;

function requireEnvironmentV8Version () {
	if (hasRequiredEnvironmentV8Version) return environmentV8Version;
	hasRequiredEnvironmentV8Version = 1;
	var globalThis = requireGlobalThis();
	var userAgent = requireEnvironmentUserAgent();

	var process = globalThis.process;
	var Deno = globalThis.Deno;
	var versions = process && process.versions || Deno && Deno.version;
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
	if (!version && userAgent) {
	  match = userAgent.match(/Edge\/(\d+)/);
	  if (!match || match[1] >= 74) {
	    match = userAgent.match(/Chrome\/(\d+)/);
	    if (match) version = +match[1];
	  }
	}

	environmentV8Version = version;
	return environmentV8Version;
}

var symbolConstructorDetection;
var hasRequiredSymbolConstructorDetection;

function requireSymbolConstructorDetection () {
	if (hasRequiredSymbolConstructorDetection) return symbolConstructorDetection;
	hasRequiredSymbolConstructorDetection = 1;
	/* eslint-disable es/no-symbol -- required for testing */
	var V8_VERSION = requireEnvironmentV8Version();
	var fails = requireFails();
	var globalThis = requireGlobalThis();

	var $String = globalThis.String;

	// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
	symbolConstructorDetection = !!Object.getOwnPropertySymbols && !fails(function () {
	  var symbol = Symbol('symbol detection');
	  // Chrome 38 Symbol has incorrect toString conversion
	  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
	  // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
	  // of course, fail.
	  return !$String(symbol) || !(Object(symbol) instanceof Symbol) ||
	    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
	    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
	});
	return symbolConstructorDetection;
}

var useSymbolAsUid;
var hasRequiredUseSymbolAsUid;

function requireUseSymbolAsUid () {
	if (hasRequiredUseSymbolAsUid) return useSymbolAsUid;
	hasRequiredUseSymbolAsUid = 1;
	/* eslint-disable es/no-symbol -- required for testing */
	var NATIVE_SYMBOL = requireSymbolConstructorDetection();

	useSymbolAsUid = NATIVE_SYMBOL &&
	  !Symbol.sham &&
	  typeof Symbol.iterator == 'symbol';
	return useSymbolAsUid;
}

var isSymbol;
var hasRequiredIsSymbol;

function requireIsSymbol () {
	if (hasRequiredIsSymbol) return isSymbol;
	hasRequiredIsSymbol = 1;
	var getBuiltIn = requireGetBuiltIn();
	var isCallable = requireIsCallable();
	var isPrototypeOf = requireObjectIsPrototypeOf();
	var USE_SYMBOL_AS_UID = requireUseSymbolAsUid();

	var $Object = Object;

	isSymbol = USE_SYMBOL_AS_UID ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  var $Symbol = getBuiltIn('Symbol');
	  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));
	};
	return isSymbol;
}

var tryToString;
var hasRequiredTryToString;

function requireTryToString () {
	if (hasRequiredTryToString) return tryToString;
	hasRequiredTryToString = 1;
	var $String = String;

	tryToString = function (argument) {
	  try {
	    return $String(argument);
	  } catch (error) {
	    return 'Object';
	  }
	};
	return tryToString;
}

var aCallable;
var hasRequiredACallable;

function requireACallable () {
	if (hasRequiredACallable) return aCallable;
	hasRequiredACallable = 1;
	var isCallable = requireIsCallable();
	var tryToString = requireTryToString();

	var $TypeError = TypeError;

	// `Assert: IsCallable(argument) is true`
	aCallable = function (argument) {
	  if (isCallable(argument)) return argument;
	  throw new $TypeError(tryToString(argument) + ' is not a function');
	};
	return aCallable;
}

var getMethod;
var hasRequiredGetMethod;

function requireGetMethod () {
	if (hasRequiredGetMethod) return getMethod;
	hasRequiredGetMethod = 1;
	var aCallable = requireACallable();
	var isNullOrUndefined = requireIsNullOrUndefined();

	// `GetMethod` abstract operation
	// https://tc39.es/ecma262/#sec-getmethod
	getMethod = function (V, P) {
	  var func = V[P];
	  return isNullOrUndefined(func) ? undefined : aCallable(func);
	};
	return getMethod;
}

var ordinaryToPrimitive;
var hasRequiredOrdinaryToPrimitive;

function requireOrdinaryToPrimitive () {
	if (hasRequiredOrdinaryToPrimitive) return ordinaryToPrimitive;
	hasRequiredOrdinaryToPrimitive = 1;
	var call = requireFunctionCall();
	var isCallable = requireIsCallable();
	var isObject = requireIsObject();

	var $TypeError = TypeError;

	// `OrdinaryToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-ordinarytoprimitive
	ordinaryToPrimitive = function (input, pref) {
	  var fn, val;
	  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
	  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
	  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
	  throw new $TypeError("Can't convert object to primitive value");
	};
	return ordinaryToPrimitive;
}

var sharedStore = {exports: {}};

var isPure;
var hasRequiredIsPure;

function requireIsPure () {
	if (hasRequiredIsPure) return isPure;
	hasRequiredIsPure = 1;
	isPure = false;
	return isPure;
}

var defineGlobalProperty;
var hasRequiredDefineGlobalProperty;

function requireDefineGlobalProperty () {
	if (hasRequiredDefineGlobalProperty) return defineGlobalProperty;
	hasRequiredDefineGlobalProperty = 1;
	var globalThis = requireGlobalThis();

	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var defineProperty = Object.defineProperty;

	defineGlobalProperty = function (key, value) {
	  try {
	    defineProperty(globalThis, key, { value: value, configurable: true, writable: true });
	  } catch (error) {
	    globalThis[key] = value;
	  } return value;
	};
	return defineGlobalProperty;
}

var hasRequiredSharedStore;

function requireSharedStore () {
	if (hasRequiredSharedStore) return sharedStore.exports;
	hasRequiredSharedStore = 1;
	var IS_PURE = requireIsPure();
	var globalThis = requireGlobalThis();
	var defineGlobalProperty = requireDefineGlobalProperty();

	var SHARED = '__core-js_shared__';
	var store = sharedStore.exports = globalThis[SHARED] || defineGlobalProperty(SHARED, {});

	(store.versions || (store.versions = [])).push({
	  version: '3.39.0',
	  mode: IS_PURE ? 'pure' : 'global',
	  copyright: '© 2014-2024 Denis Pushkarev (zloirock.ru)',
	  license: 'https://github.com/zloirock/core-js/blob/v3.39.0/LICENSE',
	  source: 'https://github.com/zloirock/core-js'
	});
	return sharedStore.exports;
}

var shared;
var hasRequiredShared;

function requireShared () {
	if (hasRequiredShared) return shared;
	hasRequiredShared = 1;
	var store = requireSharedStore();

	shared = function (key, value) {
	  return store[key] || (store[key] = value || {});
	};
	return shared;
}

var toObject;
var hasRequiredToObject;

function requireToObject () {
	if (hasRequiredToObject) return toObject;
	hasRequiredToObject = 1;
	var requireObjectCoercible = requireRequireObjectCoercible();

	var $Object = Object;

	// `ToObject` abstract operation
	// https://tc39.es/ecma262/#sec-toobject
	toObject = function (argument) {
	  return $Object(requireObjectCoercible(argument));
	};
	return toObject;
}

var hasOwnProperty_1;
var hasRequiredHasOwnProperty;

function requireHasOwnProperty () {
	if (hasRequiredHasOwnProperty) return hasOwnProperty_1;
	hasRequiredHasOwnProperty = 1;
	var uncurryThis = requireFunctionUncurryThis();
	var toObject = requireToObject();

	var hasOwnProperty = uncurryThis({}.hasOwnProperty);

	// `HasOwnProperty` abstract operation
	// https://tc39.es/ecma262/#sec-hasownproperty
	// eslint-disable-next-line es/no-object-hasown -- safe
	hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
	  return hasOwnProperty(toObject(it), key);
	};
	return hasOwnProperty_1;
}

var uid;
var hasRequiredUid;

function requireUid () {
	if (hasRequiredUid) return uid;
	hasRequiredUid = 1;
	var uncurryThis = requireFunctionUncurryThis();

	var id = 0;
	var postfix = Math.random();
	var toString = uncurryThis(1.0.toString);

	uid = function (key) {
	  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
	};
	return uid;
}

var wellKnownSymbol;
var hasRequiredWellKnownSymbol;

function requireWellKnownSymbol () {
	if (hasRequiredWellKnownSymbol) return wellKnownSymbol;
	hasRequiredWellKnownSymbol = 1;
	var globalThis = requireGlobalThis();
	var shared = requireShared();
	var hasOwn = requireHasOwnProperty();
	var uid = requireUid();
	var NATIVE_SYMBOL = requireSymbolConstructorDetection();
	var USE_SYMBOL_AS_UID = requireUseSymbolAsUid();

	var Symbol = globalThis.Symbol;
	var WellKnownSymbolsStore = shared('wks');
	var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol['for'] || Symbol : Symbol && Symbol.withoutSetter || uid;

	wellKnownSymbol = function (name) {
	  if (!hasOwn(WellKnownSymbolsStore, name)) {
	    WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn(Symbol, name)
	      ? Symbol[name]
	      : createWellKnownSymbol('Symbol.' + name);
	  } return WellKnownSymbolsStore[name];
	};
	return wellKnownSymbol;
}

var toPrimitive;
var hasRequiredToPrimitive;

function requireToPrimitive () {
	if (hasRequiredToPrimitive) return toPrimitive;
	hasRequiredToPrimitive = 1;
	var call = requireFunctionCall();
	var isObject = requireIsObject();
	var isSymbol = requireIsSymbol();
	var getMethod = requireGetMethod();
	var ordinaryToPrimitive = requireOrdinaryToPrimitive();
	var wellKnownSymbol = requireWellKnownSymbol();

	var $TypeError = TypeError;
	var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

	// `ToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-toprimitive
	toPrimitive = function (input, pref) {
	  if (!isObject(input) || isSymbol(input)) return input;
	  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
	  var result;
	  if (exoticToPrim) {
	    if (pref === undefined) pref = 'default';
	    result = call(exoticToPrim, input, pref);
	    if (!isObject(result) || isSymbol(result)) return result;
	    throw new $TypeError("Can't convert object to primitive value");
	  }
	  if (pref === undefined) pref = 'number';
	  return ordinaryToPrimitive(input, pref);
	};
	return toPrimitive;
}

var toPropertyKey;
var hasRequiredToPropertyKey;

function requireToPropertyKey () {
	if (hasRequiredToPropertyKey) return toPropertyKey;
	hasRequiredToPropertyKey = 1;
	var toPrimitive = requireToPrimitive();
	var isSymbol = requireIsSymbol();

	// `ToPropertyKey` abstract operation
	// https://tc39.es/ecma262/#sec-topropertykey
	toPropertyKey = function (argument) {
	  var key = toPrimitive(argument, 'string');
	  return isSymbol(key) ? key : key + '';
	};
	return toPropertyKey;
}

var documentCreateElement;
var hasRequiredDocumentCreateElement;

function requireDocumentCreateElement () {
	if (hasRequiredDocumentCreateElement) return documentCreateElement;
	hasRequiredDocumentCreateElement = 1;
	var globalThis = requireGlobalThis();
	var isObject = requireIsObject();

	var document = globalThis.document;
	// typeof document.createElement is 'object' in old IE
	var EXISTS = isObject(document) && isObject(document.createElement);

	documentCreateElement = function (it) {
	  return EXISTS ? document.createElement(it) : {};
	};
	return documentCreateElement;
}

var ie8DomDefine;
var hasRequiredIe8DomDefine;

function requireIe8DomDefine () {
	if (hasRequiredIe8DomDefine) return ie8DomDefine;
	hasRequiredIe8DomDefine = 1;
	var DESCRIPTORS = requireDescriptors();
	var fails = requireFails();
	var createElement = requireDocumentCreateElement();

	// Thanks to IE8 for its funny defineProperty
	ie8DomDefine = !DESCRIPTORS && !fails(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty(createElement('div'), 'a', {
	    get: function () { return 7; }
	  }).a !== 7;
	});
	return ie8DomDefine;
}

var hasRequiredObjectGetOwnPropertyDescriptor;

function requireObjectGetOwnPropertyDescriptor () {
	if (hasRequiredObjectGetOwnPropertyDescriptor) return objectGetOwnPropertyDescriptor;
	hasRequiredObjectGetOwnPropertyDescriptor = 1;
	var DESCRIPTORS = requireDescriptors();
	var call = requireFunctionCall();
	var propertyIsEnumerableModule = requireObjectPropertyIsEnumerable();
	var createPropertyDescriptor = requireCreatePropertyDescriptor();
	var toIndexedObject = requireToIndexedObject();
	var toPropertyKey = requireToPropertyKey();
	var hasOwn = requireHasOwnProperty();
	var IE8_DOM_DEFINE = requireIe8DomDefine();

	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
	objectGetOwnPropertyDescriptor.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject(O);
	  P = toPropertyKey(P);
	  if (IE8_DOM_DEFINE) try {
	    return $getOwnPropertyDescriptor(O, P);
	  } catch (error) { /* empty */ }
	  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
	};
	return objectGetOwnPropertyDescriptor;
}

var objectDefineProperty = {};

var v8PrototypeDefineBug;
var hasRequiredV8PrototypeDefineBug;

function requireV8PrototypeDefineBug () {
	if (hasRequiredV8PrototypeDefineBug) return v8PrototypeDefineBug;
	hasRequiredV8PrototypeDefineBug = 1;
	var DESCRIPTORS = requireDescriptors();
	var fails = requireFails();

	// V8 ~ Chrome 36-
	// https://bugs.chromium.org/p/v8/issues/detail?id=3334
	v8PrototypeDefineBug = DESCRIPTORS && fails(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
	    value: 42,
	    writable: false
	  }).prototype !== 42;
	});
	return v8PrototypeDefineBug;
}

var anObject;
var hasRequiredAnObject;

function requireAnObject () {
	if (hasRequiredAnObject) return anObject;
	hasRequiredAnObject = 1;
	var isObject = requireIsObject();

	var $String = String;
	var $TypeError = TypeError;

	// `Assert: Type(argument) is Object`
	anObject = function (argument) {
	  if (isObject(argument)) return argument;
	  throw new $TypeError($String(argument) + ' is not an object');
	};
	return anObject;
}

var hasRequiredObjectDefineProperty;

function requireObjectDefineProperty () {
	if (hasRequiredObjectDefineProperty) return objectDefineProperty;
	hasRequiredObjectDefineProperty = 1;
	var DESCRIPTORS = requireDescriptors();
	var IE8_DOM_DEFINE = requireIe8DomDefine();
	var V8_PROTOTYPE_DEFINE_BUG = requireV8PrototypeDefineBug();
	var anObject = requireAnObject();
	var toPropertyKey = requireToPropertyKey();

	var $TypeError = TypeError;
	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var $defineProperty = Object.defineProperty;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
	var ENUMERABLE = 'enumerable';
	var CONFIGURABLE = 'configurable';
	var WRITABLE = 'writable';

	// `Object.defineProperty` method
	// https://tc39.es/ecma262/#sec-object.defineproperty
	objectDefineProperty.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPropertyKey(P);
	  anObject(Attributes);
	  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
	    var current = $getOwnPropertyDescriptor(O, P);
	    if (current && current[WRITABLE]) {
	      O[P] = Attributes.value;
	      Attributes = {
	        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
	        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
	        writable: false
	      };
	    }
	  } return $defineProperty(O, P, Attributes);
	} : $defineProperty : function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPropertyKey(P);
	  anObject(Attributes);
	  if (IE8_DOM_DEFINE) try {
	    return $defineProperty(O, P, Attributes);
	  } catch (error) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw new $TypeError('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};
	return objectDefineProperty;
}

var createNonEnumerableProperty;
var hasRequiredCreateNonEnumerableProperty;

function requireCreateNonEnumerableProperty () {
	if (hasRequiredCreateNonEnumerableProperty) return createNonEnumerableProperty;
	hasRequiredCreateNonEnumerableProperty = 1;
	var DESCRIPTORS = requireDescriptors();
	var definePropertyModule = requireObjectDefineProperty();
	var createPropertyDescriptor = requireCreatePropertyDescriptor();

	createNonEnumerableProperty = DESCRIPTORS ? function (object, key, value) {
	  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};
	return createNonEnumerableProperty;
}

var makeBuiltIn = {exports: {}};

var functionName;
var hasRequiredFunctionName;

function requireFunctionName () {
	if (hasRequiredFunctionName) return functionName;
	hasRequiredFunctionName = 1;
	var DESCRIPTORS = requireDescriptors();
	var hasOwn = requireHasOwnProperty();

	var FunctionPrototype = Function.prototype;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

	var EXISTS = hasOwn(FunctionPrototype, 'name');
	// additional protection from minified / mangled / dropped function names
	var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
	var CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable));

	functionName = {
	  EXISTS: EXISTS,
	  PROPER: PROPER,
	  CONFIGURABLE: CONFIGURABLE
	};
	return functionName;
}

var inspectSource;
var hasRequiredInspectSource;

function requireInspectSource () {
	if (hasRequiredInspectSource) return inspectSource;
	hasRequiredInspectSource = 1;
	var uncurryThis = requireFunctionUncurryThis();
	var isCallable = requireIsCallable();
	var store = requireSharedStore();

	var functionToString = uncurryThis(Function.toString);

	// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
	if (!isCallable(store.inspectSource)) {
	  store.inspectSource = function (it) {
	    return functionToString(it);
	  };
	}

	inspectSource = store.inspectSource;
	return inspectSource;
}

var weakMapBasicDetection;
var hasRequiredWeakMapBasicDetection;

function requireWeakMapBasicDetection () {
	if (hasRequiredWeakMapBasicDetection) return weakMapBasicDetection;
	hasRequiredWeakMapBasicDetection = 1;
	var globalThis = requireGlobalThis();
	var isCallable = requireIsCallable();

	var WeakMap = globalThis.WeakMap;

	weakMapBasicDetection = isCallable(WeakMap) && /native code/.test(String(WeakMap));
	return weakMapBasicDetection;
}

var sharedKey;
var hasRequiredSharedKey;

function requireSharedKey () {
	if (hasRequiredSharedKey) return sharedKey;
	hasRequiredSharedKey = 1;
	var shared = requireShared();
	var uid = requireUid();

	var keys = shared('keys');

	sharedKey = function (key) {
	  return keys[key] || (keys[key] = uid(key));
	};
	return sharedKey;
}

var hiddenKeys;
var hasRequiredHiddenKeys;

function requireHiddenKeys () {
	if (hasRequiredHiddenKeys) return hiddenKeys;
	hasRequiredHiddenKeys = 1;
	hiddenKeys = {};
	return hiddenKeys;
}

var internalState;
var hasRequiredInternalState;

function requireInternalState () {
	if (hasRequiredInternalState) return internalState;
	hasRequiredInternalState = 1;
	var NATIVE_WEAK_MAP = requireWeakMapBasicDetection();
	var globalThis = requireGlobalThis();
	var isObject = requireIsObject();
	var createNonEnumerableProperty = requireCreateNonEnumerableProperty();
	var hasOwn = requireHasOwnProperty();
	var shared = requireSharedStore();
	var sharedKey = requireSharedKey();
	var hiddenKeys = requireHiddenKeys();

	var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
	var TypeError = globalThis.TypeError;
	var WeakMap = globalThis.WeakMap;
	var set, get, has;

	var enforce = function (it) {
	  return has(it) ? get(it) : set(it, {});
	};

	var getterFor = function (TYPE) {
	  return function (it) {
	    var state;
	    if (!isObject(it) || (state = get(it)).type !== TYPE) {
	      throw new TypeError('Incompatible receiver, ' + TYPE + ' required');
	    } return state;
	  };
	};

	if (NATIVE_WEAK_MAP || shared.state) {
	  var store = shared.state || (shared.state = new WeakMap());
	  /* eslint-disable no-self-assign -- prototype methods protection */
	  store.get = store.get;
	  store.has = store.has;
	  store.set = store.set;
	  /* eslint-enable no-self-assign -- prototype methods protection */
	  set = function (it, metadata) {
	    if (store.has(it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
	    metadata.facade = it;
	    store.set(it, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return store.get(it) || {};
	  };
	  has = function (it) {
	    return store.has(it);
	  };
	} else {
	  var STATE = sharedKey('state');
	  hiddenKeys[STATE] = true;
	  set = function (it, metadata) {
	    if (hasOwn(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
	    metadata.facade = it;
	    createNonEnumerableProperty(it, STATE, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return hasOwn(it, STATE) ? it[STATE] : {};
	  };
	  has = function (it) {
	    return hasOwn(it, STATE);
	  };
	}

	internalState = {
	  set: set,
	  get: get,
	  has: has,
	  enforce: enforce,
	  getterFor: getterFor
	};
	return internalState;
}

var hasRequiredMakeBuiltIn;

function requireMakeBuiltIn () {
	if (hasRequiredMakeBuiltIn) return makeBuiltIn.exports;
	hasRequiredMakeBuiltIn = 1;
	var uncurryThis = requireFunctionUncurryThis();
	var fails = requireFails();
	var isCallable = requireIsCallable();
	var hasOwn = requireHasOwnProperty();
	var DESCRIPTORS = requireDescriptors();
	var CONFIGURABLE_FUNCTION_NAME = requireFunctionName().CONFIGURABLE;
	var inspectSource = requireInspectSource();
	var InternalStateModule = requireInternalState();

	var enforceInternalState = InternalStateModule.enforce;
	var getInternalState = InternalStateModule.get;
	var $String = String;
	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var defineProperty = Object.defineProperty;
	var stringSlice = uncurryThis(''.slice);
	var replace = uncurryThis(''.replace);
	var join = uncurryThis([].join);

	var CONFIGURABLE_LENGTH = DESCRIPTORS && !fails(function () {
	  return defineProperty(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
	});

	var TEMPLATE = String(String).split('String');

	var makeBuiltIn$1 = makeBuiltIn.exports = function (value, name, options) {
	  if (stringSlice($String(name), 0, 7) === 'Symbol(') {
	    name = '[' + replace($String(name), /^Symbol\(([^)]*)\).*$/, '$1') + ']';
	  }
	  if (options && options.getter) name = 'get ' + name;
	  if (options && options.setter) name = 'set ' + name;
	  if (!hasOwn(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
	    if (DESCRIPTORS) defineProperty(value, 'name', { value: name, configurable: true });
	    else value.name = name;
	  }
	  if (CONFIGURABLE_LENGTH && options && hasOwn(options, 'arity') && value.length !== options.arity) {
	    defineProperty(value, 'length', { value: options.arity });
	  }
	  try {
	    if (options && hasOwn(options, 'constructor') && options.constructor) {
	      if (DESCRIPTORS) defineProperty(value, 'prototype', { writable: false });
	    // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
	    } else if (value.prototype) value.prototype = undefined;
	  } catch (error) { /* empty */ }
	  var state = enforceInternalState(value);
	  if (!hasOwn(state, 'source')) {
	    state.source = join(TEMPLATE, typeof name == 'string' ? name : '');
	  } return value;
	};

	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	// eslint-disable-next-line no-extend-native -- required
	Function.prototype.toString = makeBuiltIn$1(function toString() {
	  return isCallable(this) && getInternalState(this).source || inspectSource(this);
	}, 'toString');
	return makeBuiltIn.exports;
}

var defineBuiltIn;
var hasRequiredDefineBuiltIn;

function requireDefineBuiltIn () {
	if (hasRequiredDefineBuiltIn) return defineBuiltIn;
	hasRequiredDefineBuiltIn = 1;
	var isCallable = requireIsCallable();
	var definePropertyModule = requireObjectDefineProperty();
	var makeBuiltIn = requireMakeBuiltIn();
	var defineGlobalProperty = requireDefineGlobalProperty();

	defineBuiltIn = function (O, key, value, options) {
	  if (!options) options = {};
	  var simple = options.enumerable;
	  var name = options.name !== undefined ? options.name : key;
	  if (isCallable(value)) makeBuiltIn(value, name, options);
	  if (options.global) {
	    if (simple) O[key] = value;
	    else defineGlobalProperty(key, value);
	  } else {
	    try {
	      if (!options.unsafe) delete O[key];
	      else if (O[key]) simple = true;
	    } catch (error) { /* empty */ }
	    if (simple) O[key] = value;
	    else definePropertyModule.f(O, key, {
	      value: value,
	      enumerable: false,
	      configurable: !options.nonConfigurable,
	      writable: !options.nonWritable
	    });
	  } return O;
	};
	return defineBuiltIn;
}

var objectGetOwnPropertyNames = {};

var mathTrunc;
var hasRequiredMathTrunc;

function requireMathTrunc () {
	if (hasRequiredMathTrunc) return mathTrunc;
	hasRequiredMathTrunc = 1;
	var ceil = Math.ceil;
	var floor = Math.floor;

	// `Math.trunc` method
	// https://tc39.es/ecma262/#sec-math.trunc
	// eslint-disable-next-line es/no-math-trunc -- safe
	mathTrunc = Math.trunc || function trunc(x) {
	  var n = +x;
	  return (n > 0 ? floor : ceil)(n);
	};
	return mathTrunc;
}

var toIntegerOrInfinity;
var hasRequiredToIntegerOrInfinity;

function requireToIntegerOrInfinity () {
	if (hasRequiredToIntegerOrInfinity) return toIntegerOrInfinity;
	hasRequiredToIntegerOrInfinity = 1;
	var trunc = requireMathTrunc();

	// `ToIntegerOrInfinity` abstract operation
	// https://tc39.es/ecma262/#sec-tointegerorinfinity
	toIntegerOrInfinity = function (argument) {
	  var number = +argument;
	  // eslint-disable-next-line no-self-compare -- NaN check
	  return number !== number || number === 0 ? 0 : trunc(number);
	};
	return toIntegerOrInfinity;
}

var toAbsoluteIndex;
var hasRequiredToAbsoluteIndex;

function requireToAbsoluteIndex () {
	if (hasRequiredToAbsoluteIndex) return toAbsoluteIndex;
	hasRequiredToAbsoluteIndex = 1;
	var toIntegerOrInfinity = requireToIntegerOrInfinity();

	var max = Math.max;
	var min = Math.min;

	// Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
	toAbsoluteIndex = function (index, length) {
	  var integer = toIntegerOrInfinity(index);
	  return integer < 0 ? max(integer + length, 0) : min(integer, length);
	};
	return toAbsoluteIndex;
}

var toLength;
var hasRequiredToLength;

function requireToLength () {
	if (hasRequiredToLength) return toLength;
	hasRequiredToLength = 1;
	var toIntegerOrInfinity = requireToIntegerOrInfinity();

	var min = Math.min;

	// `ToLength` abstract operation
	// https://tc39.es/ecma262/#sec-tolength
	toLength = function (argument) {
	  var len = toIntegerOrInfinity(argument);
	  return len > 0 ? min(len, 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};
	return toLength;
}

var lengthOfArrayLike;
var hasRequiredLengthOfArrayLike;

function requireLengthOfArrayLike () {
	if (hasRequiredLengthOfArrayLike) return lengthOfArrayLike;
	hasRequiredLengthOfArrayLike = 1;
	var toLength = requireToLength();

	// `LengthOfArrayLike` abstract operation
	// https://tc39.es/ecma262/#sec-lengthofarraylike
	lengthOfArrayLike = function (obj) {
	  return toLength(obj.length);
	};
	return lengthOfArrayLike;
}

var arrayIncludes;
var hasRequiredArrayIncludes;

function requireArrayIncludes () {
	if (hasRequiredArrayIncludes) return arrayIncludes;
	hasRequiredArrayIncludes = 1;
	var toIndexedObject = requireToIndexedObject();
	var toAbsoluteIndex = requireToAbsoluteIndex();
	var lengthOfArrayLike = requireLengthOfArrayLike();

	// `Array.prototype.{ indexOf, includes }` methods implementation
	var createMethod = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject($this);
	    var length = lengthOfArrayLike(O);
	    if (length === 0) return !IS_INCLUDES && -1;
	    var index = toAbsoluteIndex(fromIndex, length);
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

	arrayIncludes = {
	  // `Array.prototype.includes` method
	  // https://tc39.es/ecma262/#sec-array.prototype.includes
	  includes: createMethod(true),
	  // `Array.prototype.indexOf` method
	  // https://tc39.es/ecma262/#sec-array.prototype.indexof
	  indexOf: createMethod(false)
	};
	return arrayIncludes;
}

var objectKeysInternal;
var hasRequiredObjectKeysInternal;

function requireObjectKeysInternal () {
	if (hasRequiredObjectKeysInternal) return objectKeysInternal;
	hasRequiredObjectKeysInternal = 1;
	var uncurryThis = requireFunctionUncurryThis();
	var hasOwn = requireHasOwnProperty();
	var toIndexedObject = requireToIndexedObject();
	var indexOf = requireArrayIncludes().indexOf;
	var hiddenKeys = requireHiddenKeys();

	var push = uncurryThis([].push);

	objectKeysInternal = function (object, names) {
	  var O = toIndexedObject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (hasOwn(O, key = names[i++])) {
	    ~indexOf(result, key) || push(result, key);
	  }
	  return result;
	};
	return objectKeysInternal;
}

var enumBugKeys;
var hasRequiredEnumBugKeys;

function requireEnumBugKeys () {
	if (hasRequiredEnumBugKeys) return enumBugKeys;
	hasRequiredEnumBugKeys = 1;
	// IE8- don't enum bug keys
	enumBugKeys = [
	  'constructor',
	  'hasOwnProperty',
	  'isPrototypeOf',
	  'propertyIsEnumerable',
	  'toLocaleString',
	  'toString',
	  'valueOf'
	];
	return enumBugKeys;
}

var hasRequiredObjectGetOwnPropertyNames;

function requireObjectGetOwnPropertyNames () {
	if (hasRequiredObjectGetOwnPropertyNames) return objectGetOwnPropertyNames;
	hasRequiredObjectGetOwnPropertyNames = 1;
	var internalObjectKeys = requireObjectKeysInternal();
	var enumBugKeys = requireEnumBugKeys();

	var hiddenKeys = enumBugKeys.concat('length', 'prototype');

	// `Object.getOwnPropertyNames` method
	// https://tc39.es/ecma262/#sec-object.getownpropertynames
	// eslint-disable-next-line es/no-object-getownpropertynames -- safe
	objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return internalObjectKeys(O, hiddenKeys);
	};
	return objectGetOwnPropertyNames;
}

var objectGetOwnPropertySymbols = {};

var hasRequiredObjectGetOwnPropertySymbols;

function requireObjectGetOwnPropertySymbols () {
	if (hasRequiredObjectGetOwnPropertySymbols) return objectGetOwnPropertySymbols;
	hasRequiredObjectGetOwnPropertySymbols = 1;
	// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
	objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;
	return objectGetOwnPropertySymbols;
}

var ownKeys;
var hasRequiredOwnKeys;

function requireOwnKeys () {
	if (hasRequiredOwnKeys) return ownKeys;
	hasRequiredOwnKeys = 1;
	var getBuiltIn = requireGetBuiltIn();
	var uncurryThis = requireFunctionUncurryThis();
	var getOwnPropertyNamesModule = requireObjectGetOwnPropertyNames();
	var getOwnPropertySymbolsModule = requireObjectGetOwnPropertySymbols();
	var anObject = requireAnObject();

	var concat = uncurryThis([].concat);

	// all object keys, includes non-enumerable and symbols
	ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
	  var keys = getOwnPropertyNamesModule.f(anObject(it));
	  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
	  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
	};
	return ownKeys;
}

var copyConstructorProperties;
var hasRequiredCopyConstructorProperties;

function requireCopyConstructorProperties () {
	if (hasRequiredCopyConstructorProperties) return copyConstructorProperties;
	hasRequiredCopyConstructorProperties = 1;
	var hasOwn = requireHasOwnProperty();
	var ownKeys = requireOwnKeys();
	var getOwnPropertyDescriptorModule = requireObjectGetOwnPropertyDescriptor();
	var definePropertyModule = requireObjectDefineProperty();

	copyConstructorProperties = function (target, source, exceptions) {
	  var keys = ownKeys(source);
	  var defineProperty = definePropertyModule.f;
	  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
	      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
	    }
	  }
	};
	return copyConstructorProperties;
}

var isForced_1;
var hasRequiredIsForced;

function requireIsForced () {
	if (hasRequiredIsForced) return isForced_1;
	hasRequiredIsForced = 1;
	var fails = requireFails();
	var isCallable = requireIsCallable();

	var replacement = /#|\.prototype\./;

	var isForced = function (feature, detection) {
	  var value = data[normalize(feature)];
	  return value === POLYFILL ? true
	    : value === NATIVE ? false
	    : isCallable(detection) ? fails(detection)
	    : !!detection;
	};

	var normalize = isForced.normalize = function (string) {
	  return String(string).replace(replacement, '.').toLowerCase();
	};

	var data = isForced.data = {};
	var NATIVE = isForced.NATIVE = 'N';
	var POLYFILL = isForced.POLYFILL = 'P';

	isForced_1 = isForced;
	return isForced_1;
}

var _export;
var hasRequired_export;

function require_export () {
	if (hasRequired_export) return _export;
	hasRequired_export = 1;
	var globalThis = requireGlobalThis();
	var getOwnPropertyDescriptor = requireObjectGetOwnPropertyDescriptor().f;
	var createNonEnumerableProperty = requireCreateNonEnumerableProperty();
	var defineBuiltIn = requireDefineBuiltIn();
	var defineGlobalProperty = requireDefineGlobalProperty();
	var copyConstructorProperties = requireCopyConstructorProperties();
	var isForced = requireIsForced();

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
	_export = function (options, source) {
	  var TARGET = options.target;
	  var GLOBAL = options.global;
	  var STATIC = options.stat;
	  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
	  if (GLOBAL) {
	    target = globalThis;
	  } else if (STATIC) {
	    target = globalThis[TARGET] || defineGlobalProperty(TARGET, {});
	  } else {
	    target = globalThis[TARGET] && globalThis[TARGET].prototype;
	  }
	  if (target) for (key in source) {
	    sourceProperty = source[key];
	    if (options.dontCallGetSet) {
	      descriptor = getOwnPropertyDescriptor(target, key);
	      targetProperty = descriptor && descriptor.value;
	    } else targetProperty = target[key];
	    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
	    // contained in target
	    if (!FORCED && targetProperty !== undefined) {
	      if (typeof sourceProperty == typeof targetProperty) continue;
	      copyConstructorProperties(sourceProperty, targetProperty);
	    }
	    // add a flag to not completely full polyfills
	    if (options.sham || (targetProperty && targetProperty.sham)) {
	      createNonEnumerableProperty(sourceProperty, 'sham', true);
	    }
	    defineBuiltIn(target, key, sourceProperty, options);
	  }
	};
	return _export;
}

var toStringTagSupport;
var hasRequiredToStringTagSupport;

function requireToStringTagSupport () {
	if (hasRequiredToStringTagSupport) return toStringTagSupport;
	hasRequiredToStringTagSupport = 1;
	var wellKnownSymbol = requireWellKnownSymbol();

	var TO_STRING_TAG = wellKnownSymbol('toStringTag');
	var test = {};

	test[TO_STRING_TAG] = 'z';

	toStringTagSupport = String(test) === '[object z]';
	return toStringTagSupport;
}

var classof;
var hasRequiredClassof;

function requireClassof () {
	if (hasRequiredClassof) return classof;
	hasRequiredClassof = 1;
	var TO_STRING_TAG_SUPPORT = requireToStringTagSupport();
	var isCallable = requireIsCallable();
	var classofRaw = requireClassofRaw();
	var wellKnownSymbol = requireWellKnownSymbol();

	var TO_STRING_TAG = wellKnownSymbol('toStringTag');
	var $Object = Object;

	// ES3 wrong here
	var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) === 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (error) { /* empty */ }
	};

	// getting tag from ES6+ `Object.prototype.toString`
	classof = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
	  var O, tag, result;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == 'string' ? tag
	    // builtinTag case
	    : CORRECT_ARGUMENTS ? classofRaw(O)
	    // ES3 arguments fallback
	    : (result = classofRaw(O)) === 'Object' && isCallable(O.callee) ? 'Arguments' : result;
	};
	return classof;
}

var toString;
var hasRequiredToString;

function requireToString () {
	if (hasRequiredToString) return toString;
	hasRequiredToString = 1;
	var classof = requireClassof();

	var $String = String;

	toString = function (argument) {
	  if (classof(argument) === 'Symbol') throw new TypeError('Cannot convert a Symbol value to a string');
	  return $String(argument);
	};
	return toString;
}

var defineBuiltInAccessor;
var hasRequiredDefineBuiltInAccessor;

function requireDefineBuiltInAccessor () {
	if (hasRequiredDefineBuiltInAccessor) return defineBuiltInAccessor;
	hasRequiredDefineBuiltInAccessor = 1;
	var makeBuiltIn = requireMakeBuiltIn();
	var defineProperty = requireObjectDefineProperty();

	defineBuiltInAccessor = function (target, name, descriptor) {
	  if (descriptor.get) makeBuiltIn(descriptor.get, name, { getter: true });
	  if (descriptor.set) makeBuiltIn(descriptor.set, name, { setter: true });
	  return defineProperty.f(target, name, descriptor);
	};
	return defineBuiltInAccessor;
}

var hasRequiredEs_symbol_description;

function requireEs_symbol_description () {
	if (hasRequiredEs_symbol_description) return es_symbol_description;
	hasRequiredEs_symbol_description = 1;
	var $ = require_export();
	var DESCRIPTORS = requireDescriptors();
	var globalThis = requireGlobalThis();
	var uncurryThis = requireFunctionUncurryThis();
	var hasOwn = requireHasOwnProperty();
	var isCallable = requireIsCallable();
	var isPrototypeOf = requireObjectIsPrototypeOf();
	var toString = requireToString();
	var defineBuiltInAccessor = requireDefineBuiltInAccessor();
	var copyConstructorProperties = requireCopyConstructorProperties();

	var NativeSymbol = globalThis.Symbol;
	var SymbolPrototype = NativeSymbol && NativeSymbol.prototype;

	if (DESCRIPTORS && isCallable(NativeSymbol) && (!('description' in SymbolPrototype) ||
	  // Safari 12 bug
	  NativeSymbol().description !== undefined
	)) {
	  var EmptyStringDescriptionStore = {};
	  // wrap Symbol constructor for correct work with undefined description
	  var SymbolWrapper = function Symbol() {
	    var description = arguments.length < 1 || arguments[0] === undefined ? undefined : toString(arguments[0]);
	    var result = isPrototypeOf(SymbolPrototype, this)
	      // eslint-disable-next-line sonarjs/inconsistent-function-call -- ok
	      ? new NativeSymbol(description)
	      // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
	      : description === undefined ? NativeSymbol() : NativeSymbol(description);
	    if (description === '') EmptyStringDescriptionStore[result] = true;
	    return result;
	  };

	  copyConstructorProperties(SymbolWrapper, NativeSymbol);
	  SymbolWrapper.prototype = SymbolPrototype;
	  SymbolPrototype.constructor = SymbolWrapper;

	  var NATIVE_SYMBOL = String(NativeSymbol('description detection')) === 'Symbol(description detection)';
	  var thisSymbolValue = uncurryThis(SymbolPrototype.valueOf);
	  var symbolDescriptiveString = uncurryThis(SymbolPrototype.toString);
	  var regexp = /^Symbol\((.*)\)[^)]+$/;
	  var replace = uncurryThis(''.replace);
	  var stringSlice = uncurryThis(''.slice);

	  defineBuiltInAccessor(SymbolPrototype, 'description', {
	    configurable: true,
	    get: function description() {
	      var symbol = thisSymbolValue(this);
	      if (hasOwn(EmptyStringDescriptionStore, symbol)) return '';
	      var string = symbolDescriptiveString(symbol);
	      var desc = NATIVE_SYMBOL ? stringSlice(string, 7, -1) : replace(string, regexp, '$1');
	      return desc === '' ? undefined : desc;
	    }
	  });

	  $({ global: true, constructor: true, forced: true }, {
	    Symbol: SymbolWrapper
	  });
	}
	return es_symbol_description;
}

requireEs_symbol_description();

var es_error_cause = {};

var functionApply;
var hasRequiredFunctionApply;

function requireFunctionApply () {
	if (hasRequiredFunctionApply) return functionApply;
	hasRequiredFunctionApply = 1;
	var NATIVE_BIND = requireFunctionBindNative();

	var FunctionPrototype = Function.prototype;
	var apply = FunctionPrototype.apply;
	var call = FunctionPrototype.call;

	// eslint-disable-next-line es/no-reflect -- safe
	functionApply = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND ? call.bind(apply) : function () {
	  return call.apply(apply, arguments);
	});
	return functionApply;
}

var functionUncurryThisAccessor;
var hasRequiredFunctionUncurryThisAccessor;

function requireFunctionUncurryThisAccessor () {
	if (hasRequiredFunctionUncurryThisAccessor) return functionUncurryThisAccessor;
	hasRequiredFunctionUncurryThisAccessor = 1;
	var uncurryThis = requireFunctionUncurryThis();
	var aCallable = requireACallable();

	functionUncurryThisAccessor = function (object, key, method) {
	  try {
	    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	    return uncurryThis(aCallable(Object.getOwnPropertyDescriptor(object, key)[method]));
	  } catch (error) { /* empty */ }
	};
	return functionUncurryThisAccessor;
}

var isPossiblePrototype;
var hasRequiredIsPossiblePrototype;

function requireIsPossiblePrototype () {
	if (hasRequiredIsPossiblePrototype) return isPossiblePrototype;
	hasRequiredIsPossiblePrototype = 1;
	var isObject = requireIsObject();

	isPossiblePrototype = function (argument) {
	  return isObject(argument) || argument === null;
	};
	return isPossiblePrototype;
}

var aPossiblePrototype;
var hasRequiredAPossiblePrototype;

function requireAPossiblePrototype () {
	if (hasRequiredAPossiblePrototype) return aPossiblePrototype;
	hasRequiredAPossiblePrototype = 1;
	var isPossiblePrototype = requireIsPossiblePrototype();

	var $String = String;
	var $TypeError = TypeError;

	aPossiblePrototype = function (argument) {
	  if (isPossiblePrototype(argument)) return argument;
	  throw new $TypeError("Can't set " + $String(argument) + ' as a prototype');
	};
	return aPossiblePrototype;
}

var objectSetPrototypeOf;
var hasRequiredObjectSetPrototypeOf;

function requireObjectSetPrototypeOf () {
	if (hasRequiredObjectSetPrototypeOf) return objectSetPrototypeOf;
	hasRequiredObjectSetPrototypeOf = 1;
	/* eslint-disable no-proto -- safe */
	var uncurryThisAccessor = requireFunctionUncurryThisAccessor();
	var isObject = requireIsObject();
	var requireObjectCoercible = requireRequireObjectCoercible();
	var aPossiblePrototype = requireAPossiblePrototype();

	// `Object.setPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.setprototypeof
	// Works with __proto__ only. Old v8 can't work with null proto objects.
	// eslint-disable-next-line es/no-object-setprototypeof -- safe
	objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
	  var CORRECT_SETTER = false;
	  var test = {};
	  var setter;
	  try {
	    setter = uncurryThisAccessor(Object.prototype, '__proto__', 'set');
	    setter(test, []);
	    CORRECT_SETTER = test instanceof Array;
	  } catch (error) { /* empty */ }
	  return function setPrototypeOf(O, proto) {
	    requireObjectCoercible(O);
	    aPossiblePrototype(proto);
	    if (!isObject(O)) return O;
	    if (CORRECT_SETTER) setter(O, proto);
	    else O.__proto__ = proto;
	    return O;
	  };
	}() : undefined);
	return objectSetPrototypeOf;
}

var proxyAccessor;
var hasRequiredProxyAccessor;

function requireProxyAccessor () {
	if (hasRequiredProxyAccessor) return proxyAccessor;
	hasRequiredProxyAccessor = 1;
	var defineProperty = requireObjectDefineProperty().f;

	proxyAccessor = function (Target, Source, key) {
	  key in Target || defineProperty(Target, key, {
	    configurable: true,
	    get: function () { return Source[key]; },
	    set: function (it) { Source[key] = it; }
	  });
	};
	return proxyAccessor;
}

var inheritIfRequired;
var hasRequiredInheritIfRequired;

function requireInheritIfRequired () {
	if (hasRequiredInheritIfRequired) return inheritIfRequired;
	hasRequiredInheritIfRequired = 1;
	var isCallable = requireIsCallable();
	var isObject = requireIsObject();
	var setPrototypeOf = requireObjectSetPrototypeOf();

	// makes subclassing work correct for wrapped built-ins
	inheritIfRequired = function ($this, dummy, Wrapper) {
	  var NewTarget, NewTargetPrototype;
	  if (
	    // it can work only with native `setPrototypeOf`
	    setPrototypeOf &&
	    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
	    isCallable(NewTarget = dummy.constructor) &&
	    NewTarget !== Wrapper &&
	    isObject(NewTargetPrototype = NewTarget.prototype) &&
	    NewTargetPrototype !== Wrapper.prototype
	  ) setPrototypeOf($this, NewTargetPrototype);
	  return $this;
	};
	return inheritIfRequired;
}

var normalizeStringArgument;
var hasRequiredNormalizeStringArgument;

function requireNormalizeStringArgument () {
	if (hasRequiredNormalizeStringArgument) return normalizeStringArgument;
	hasRequiredNormalizeStringArgument = 1;
	var toString = requireToString();

	normalizeStringArgument = function (argument, $default) {
	  return argument === undefined ? arguments.length < 2 ? '' : $default : toString(argument);
	};
	return normalizeStringArgument;
}

var installErrorCause;
var hasRequiredInstallErrorCause;

function requireInstallErrorCause () {
	if (hasRequiredInstallErrorCause) return installErrorCause;
	hasRequiredInstallErrorCause = 1;
	var isObject = requireIsObject();
	var createNonEnumerableProperty = requireCreateNonEnumerableProperty();

	// `InstallErrorCause` abstract operation
	// https://tc39.es/proposal-error-cause/#sec-errorobjects-install-error-cause
	installErrorCause = function (O, options) {
	  if (isObject(options) && 'cause' in options) {
	    createNonEnumerableProperty(O, 'cause', options.cause);
	  }
	};
	return installErrorCause;
}

var errorStackClear;
var hasRequiredErrorStackClear;

function requireErrorStackClear () {
	if (hasRequiredErrorStackClear) return errorStackClear;
	hasRequiredErrorStackClear = 1;
	var uncurryThis = requireFunctionUncurryThis();

	var $Error = Error;
	var replace = uncurryThis(''.replace);

	var TEST = (function (arg) { return String(new $Error(arg).stack); })('zxcasd');
	// eslint-disable-next-line redos/no-vulnerable, sonarjs/slow-regex -- safe
	var V8_OR_CHAKRA_STACK_ENTRY = /\n\s*at [^:]*:[^\n]*/;
	var IS_V8_OR_CHAKRA_STACK = V8_OR_CHAKRA_STACK_ENTRY.test(TEST);

	errorStackClear = function (stack, dropEntries) {
	  if (IS_V8_OR_CHAKRA_STACK && typeof stack == 'string' && !$Error.prepareStackTrace) {
	    while (dropEntries--) stack = replace(stack, V8_OR_CHAKRA_STACK_ENTRY, '');
	  } return stack;
	};
	return errorStackClear;
}

var errorStackInstallable;
var hasRequiredErrorStackInstallable;

function requireErrorStackInstallable () {
	if (hasRequiredErrorStackInstallable) return errorStackInstallable;
	hasRequiredErrorStackInstallable = 1;
	var fails = requireFails();
	var createPropertyDescriptor = requireCreatePropertyDescriptor();

	errorStackInstallable = !fails(function () {
	  var error = new Error('a');
	  if (!('stack' in error)) return true;
	  // eslint-disable-next-line es/no-object-defineproperty -- safe
	  Object.defineProperty(error, 'stack', createPropertyDescriptor(1, 7));
	  return error.stack !== 7;
	});
	return errorStackInstallable;
}

var errorStackInstall;
var hasRequiredErrorStackInstall;

function requireErrorStackInstall () {
	if (hasRequiredErrorStackInstall) return errorStackInstall;
	hasRequiredErrorStackInstall = 1;
	var createNonEnumerableProperty = requireCreateNonEnumerableProperty();
	var clearErrorStack = requireErrorStackClear();
	var ERROR_STACK_INSTALLABLE = requireErrorStackInstallable();

	// non-standard V8
	var captureStackTrace = Error.captureStackTrace;

	errorStackInstall = function (error, C, stack, dropEntries) {
	  if (ERROR_STACK_INSTALLABLE) {
	    if (captureStackTrace) captureStackTrace(error, C);
	    else createNonEnumerableProperty(error, 'stack', clearErrorStack(stack, dropEntries));
	  }
	};
	return errorStackInstall;
}

var wrapErrorConstructorWithCause;
var hasRequiredWrapErrorConstructorWithCause;

function requireWrapErrorConstructorWithCause () {
	if (hasRequiredWrapErrorConstructorWithCause) return wrapErrorConstructorWithCause;
	hasRequiredWrapErrorConstructorWithCause = 1;
	var getBuiltIn = requireGetBuiltIn();
	var hasOwn = requireHasOwnProperty();
	var createNonEnumerableProperty = requireCreateNonEnumerableProperty();
	var isPrototypeOf = requireObjectIsPrototypeOf();
	var setPrototypeOf = requireObjectSetPrototypeOf();
	var copyConstructorProperties = requireCopyConstructorProperties();
	var proxyAccessor = requireProxyAccessor();
	var inheritIfRequired = requireInheritIfRequired();
	var normalizeStringArgument = requireNormalizeStringArgument();
	var installErrorCause = requireInstallErrorCause();
	var installErrorStack = requireErrorStackInstall();
	var DESCRIPTORS = requireDescriptors();
	var IS_PURE = requireIsPure();

	wrapErrorConstructorWithCause = function (FULL_NAME, wrapper, FORCED, IS_AGGREGATE_ERROR) {
	  var STACK_TRACE_LIMIT = 'stackTraceLimit';
	  var OPTIONS_POSITION = IS_AGGREGATE_ERROR ? 2 : 1;
	  var path = FULL_NAME.split('.');
	  var ERROR_NAME = path[path.length - 1];
	  var OriginalError = getBuiltIn.apply(null, path);

	  if (!OriginalError) return;

	  var OriginalErrorPrototype = OriginalError.prototype;

	  // V8 9.3- bug https://bugs.chromium.org/p/v8/issues/detail?id=12006
	  if (!IS_PURE && hasOwn(OriginalErrorPrototype, 'cause')) delete OriginalErrorPrototype.cause;

	  if (!FORCED) return OriginalError;

	  var BaseError = getBuiltIn('Error');

	  var WrappedError = wrapper(function (a, b) {
	    var message = normalizeStringArgument(IS_AGGREGATE_ERROR ? b : a, undefined);
	    var result = IS_AGGREGATE_ERROR ? new OriginalError(a) : new OriginalError();
	    if (message !== undefined) createNonEnumerableProperty(result, 'message', message);
	    installErrorStack(result, WrappedError, result.stack, 2);
	    if (this && isPrototypeOf(OriginalErrorPrototype, this)) inheritIfRequired(result, this, WrappedError);
	    if (arguments.length > OPTIONS_POSITION) installErrorCause(result, arguments[OPTIONS_POSITION]);
	    return result;
	  });

	  WrappedError.prototype = OriginalErrorPrototype;

	  if (ERROR_NAME !== 'Error') {
	    if (setPrototypeOf) setPrototypeOf(WrappedError, BaseError);
	    else copyConstructorProperties(WrappedError, BaseError, { name: true });
	  } else if (DESCRIPTORS && STACK_TRACE_LIMIT in OriginalError) {
	    proxyAccessor(WrappedError, OriginalError, STACK_TRACE_LIMIT);
	    proxyAccessor(WrappedError, OriginalError, 'prepareStackTrace');
	  }

	  copyConstructorProperties(WrappedError, OriginalError);

	  if (!IS_PURE) try {
	    // Safari 13- bug: WebAssembly errors does not have a proper `.name`
	    if (OriginalErrorPrototype.name !== ERROR_NAME) {
	      createNonEnumerableProperty(OriginalErrorPrototype, 'name', ERROR_NAME);
	    }
	    OriginalErrorPrototype.constructor = WrappedError;
	  } catch (error) { /* empty */ }

	  return WrappedError;
	};
	return wrapErrorConstructorWithCause;
}

var hasRequiredEs_error_cause;

function requireEs_error_cause () {
	if (hasRequiredEs_error_cause) return es_error_cause;
	hasRequiredEs_error_cause = 1;
	/* eslint-disable no-unused-vars -- required for functions `.length` */
	var $ = require_export();
	var globalThis = requireGlobalThis();
	var apply = requireFunctionApply();
	var wrapErrorConstructorWithCause = requireWrapErrorConstructorWithCause();

	var WEB_ASSEMBLY = 'WebAssembly';
	var WebAssembly = globalThis[WEB_ASSEMBLY];

	// eslint-disable-next-line es/no-error-cause -- feature detection
	var FORCED = new Error('e', { cause: 7 }).cause !== 7;

	var exportGlobalErrorCauseWrapper = function (ERROR_NAME, wrapper) {
	  var O = {};
	  O[ERROR_NAME] = wrapErrorConstructorWithCause(ERROR_NAME, wrapper, FORCED);
	  $({ global: true, constructor: true, arity: 1, forced: FORCED }, O);
	};

	var exportWebAssemblyErrorCauseWrapper = function (ERROR_NAME, wrapper) {
	  if (WebAssembly && WebAssembly[ERROR_NAME]) {
	    var O = {};
	    O[ERROR_NAME] = wrapErrorConstructorWithCause(WEB_ASSEMBLY + '.' + ERROR_NAME, wrapper, FORCED);
	    $({ target: WEB_ASSEMBLY, stat: true, constructor: true, arity: 1, forced: FORCED }, O);
	  }
	};

	// https://tc39.es/ecma262/#sec-nativeerror
	exportGlobalErrorCauseWrapper('Error', function (init) {
	  return function Error(message) { return apply(init, this, arguments); };
	});
	exportGlobalErrorCauseWrapper('EvalError', function (init) {
	  return function EvalError(message) { return apply(init, this, arguments); };
	});
	exportGlobalErrorCauseWrapper('RangeError', function (init) {
	  return function RangeError(message) { return apply(init, this, arguments); };
	});
	exportGlobalErrorCauseWrapper('ReferenceError', function (init) {
	  return function ReferenceError(message) { return apply(init, this, arguments); };
	});
	exportGlobalErrorCauseWrapper('SyntaxError', function (init) {
	  return function SyntaxError(message) { return apply(init, this, arguments); };
	});
	exportGlobalErrorCauseWrapper('TypeError', function (init) {
	  return function TypeError(message) { return apply(init, this, arguments); };
	});
	exportGlobalErrorCauseWrapper('URIError', function (init) {
	  return function URIError(message) { return apply(init, this, arguments); };
	});
	exportWebAssemblyErrorCauseWrapper('CompileError', function (init) {
	  return function CompileError(message) { return apply(init, this, arguments); };
	});
	exportWebAssemblyErrorCauseWrapper('LinkError', function (init) {
	  return function LinkError(message) { return apply(init, this, arguments); };
	});
	exportWebAssemblyErrorCauseWrapper('RuntimeError', function (init) {
	  return function RuntimeError(message) { return apply(init, this, arguments); };
	});
	return es_error_cause;
}

requireEs_error_cause();

var es_array_flat = {};

var isArray;
var hasRequiredIsArray;

function requireIsArray () {
	if (hasRequiredIsArray) return isArray;
	hasRequiredIsArray = 1;
	var classof = requireClassofRaw();

	// `IsArray` abstract operation
	// https://tc39.es/ecma262/#sec-isarray
	// eslint-disable-next-line es/no-array-isarray -- safe
	isArray = Array.isArray || function isArray(argument) {
	  return classof(argument) === 'Array';
	};
	return isArray;
}

var doesNotExceedSafeInteger;
var hasRequiredDoesNotExceedSafeInteger;

function requireDoesNotExceedSafeInteger () {
	if (hasRequiredDoesNotExceedSafeInteger) return doesNotExceedSafeInteger;
	hasRequiredDoesNotExceedSafeInteger = 1;
	var $TypeError = TypeError;
	var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991

	doesNotExceedSafeInteger = function (it) {
	  if (it > MAX_SAFE_INTEGER) throw $TypeError('Maximum allowed index exceeded');
	  return it;
	};
	return doesNotExceedSafeInteger;
}

var functionUncurryThisClause;
var hasRequiredFunctionUncurryThisClause;

function requireFunctionUncurryThisClause () {
	if (hasRequiredFunctionUncurryThisClause) return functionUncurryThisClause;
	hasRequiredFunctionUncurryThisClause = 1;
	var classofRaw = requireClassofRaw();
	var uncurryThis = requireFunctionUncurryThis();

	functionUncurryThisClause = function (fn) {
	  // Nashorn bug:
	  //   https://github.com/zloirock/core-js/issues/1128
	  //   https://github.com/zloirock/core-js/issues/1130
	  if (classofRaw(fn) === 'Function') return uncurryThis(fn);
	};
	return functionUncurryThisClause;
}

var functionBindContext;
var hasRequiredFunctionBindContext;

function requireFunctionBindContext () {
	if (hasRequiredFunctionBindContext) return functionBindContext;
	hasRequiredFunctionBindContext = 1;
	var uncurryThis = requireFunctionUncurryThisClause();
	var aCallable = requireACallable();
	var NATIVE_BIND = requireFunctionBindNative();

	var bind = uncurryThis(uncurryThis.bind);

	// optional / simple context binding
	functionBindContext = function (fn, that) {
	  aCallable(fn);
	  return that === undefined ? fn : NATIVE_BIND ? bind(fn, that) : function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};
	return functionBindContext;
}

var flattenIntoArray_1;
var hasRequiredFlattenIntoArray;

function requireFlattenIntoArray () {
	if (hasRequiredFlattenIntoArray) return flattenIntoArray_1;
	hasRequiredFlattenIntoArray = 1;
	var isArray = requireIsArray();
	var lengthOfArrayLike = requireLengthOfArrayLike();
	var doesNotExceedSafeInteger = requireDoesNotExceedSafeInteger();
	var bind = requireFunctionBindContext();

	// `FlattenIntoArray` abstract operation
	// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray
	var flattenIntoArray = function (target, original, source, sourceLen, start, depth, mapper, thisArg) {
	  var targetIndex = start;
	  var sourceIndex = 0;
	  var mapFn = mapper ? bind(mapper, thisArg) : false;
	  var element, elementLen;

	  while (sourceIndex < sourceLen) {
	    if (sourceIndex in source) {
	      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

	      if (depth > 0 && isArray(element)) {
	        elementLen = lengthOfArrayLike(element);
	        targetIndex = flattenIntoArray(target, original, element, elementLen, targetIndex, depth - 1) - 1;
	      } else {
	        doesNotExceedSafeInteger(targetIndex + 1);
	        target[targetIndex] = element;
	      }

	      targetIndex++;
	    }
	    sourceIndex++;
	  }
	  return targetIndex;
	};

	flattenIntoArray_1 = flattenIntoArray;
	return flattenIntoArray_1;
}

var isConstructor;
var hasRequiredIsConstructor;

function requireIsConstructor () {
	if (hasRequiredIsConstructor) return isConstructor;
	hasRequiredIsConstructor = 1;
	var uncurryThis = requireFunctionUncurryThis();
	var fails = requireFails();
	var isCallable = requireIsCallable();
	var classof = requireClassof();
	var getBuiltIn = requireGetBuiltIn();
	var inspectSource = requireInspectSource();

	var noop = function () { /* empty */ };
	var construct = getBuiltIn('Reflect', 'construct');
	var constructorRegExp = /^\s*(?:class|function)\b/;
	var exec = uncurryThis(constructorRegExp.exec);
	var INCORRECT_TO_STRING = !constructorRegExp.test(noop);

	var isConstructorModern = function isConstructor(argument) {
	  if (!isCallable(argument)) return false;
	  try {
	    construct(noop, [], argument);
	    return true;
	  } catch (error) {
	    return false;
	  }
	};

	var isConstructorLegacy = function isConstructor(argument) {
	  if (!isCallable(argument)) return false;
	  switch (classof(argument)) {
	    case 'AsyncFunction':
	    case 'GeneratorFunction':
	    case 'AsyncGeneratorFunction': return false;
	  }
	  try {
	    // we can't check .prototype since constructors produced by .bind haven't it
	    // `Function#toString` throws on some built-it function in some legacy engines
	    // (for example, `DOMQuad` and similar in FF41-)
	    return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource(argument));
	  } catch (error) {
	    return true;
	  }
	};

	isConstructorLegacy.sham = true;

	// `IsConstructor` abstract operation
	// https://tc39.es/ecma262/#sec-isconstructor
	isConstructor = !construct || fails(function () {
	  var called;
	  return isConstructorModern(isConstructorModern.call)
	    || !isConstructorModern(Object)
	    || !isConstructorModern(function () { called = true; })
	    || called;
	}) ? isConstructorLegacy : isConstructorModern;
	return isConstructor;
}

var arraySpeciesConstructor;
var hasRequiredArraySpeciesConstructor;

function requireArraySpeciesConstructor () {
	if (hasRequiredArraySpeciesConstructor) return arraySpeciesConstructor;
	hasRequiredArraySpeciesConstructor = 1;
	var isArray = requireIsArray();
	var isConstructor = requireIsConstructor();
	var isObject = requireIsObject();
	var wellKnownSymbol = requireWellKnownSymbol();

	var SPECIES = wellKnownSymbol('species');
	var $Array = Array;

	// a part of `ArraySpeciesCreate` abstract operation
	// https://tc39.es/ecma262/#sec-arrayspeciescreate
	arraySpeciesConstructor = function (originalArray) {
	  var C;
	  if (isArray(originalArray)) {
	    C = originalArray.constructor;
	    // cross-realm fallback
	    if (isConstructor(C) && (C === $Array || isArray(C.prototype))) C = undefined;
	    else if (isObject(C)) {
	      C = C[SPECIES];
	      if (C === null) C = undefined;
	    }
	  } return C === undefined ? $Array : C;
	};
	return arraySpeciesConstructor;
}

var arraySpeciesCreate;
var hasRequiredArraySpeciesCreate;

function requireArraySpeciesCreate () {
	if (hasRequiredArraySpeciesCreate) return arraySpeciesCreate;
	hasRequiredArraySpeciesCreate = 1;
	var arraySpeciesConstructor = requireArraySpeciesConstructor();

	// `ArraySpeciesCreate` abstract operation
	// https://tc39.es/ecma262/#sec-arrayspeciescreate
	arraySpeciesCreate = function (originalArray, length) {
	  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
	};
	return arraySpeciesCreate;
}

var hasRequiredEs_array_flat;

function requireEs_array_flat () {
	if (hasRequiredEs_array_flat) return es_array_flat;
	hasRequiredEs_array_flat = 1;
	var $ = require_export();
	var flattenIntoArray = requireFlattenIntoArray();
	var toObject = requireToObject();
	var lengthOfArrayLike = requireLengthOfArrayLike();
	var toIntegerOrInfinity = requireToIntegerOrInfinity();
	var arraySpeciesCreate = requireArraySpeciesCreate();

	// `Array.prototype.flat` method
	// https://tc39.es/ecma262/#sec-array.prototype.flat
	$({ target: 'Array', proto: true }, {
	  flat: function flat(/* depthArg = 1 */) {
	    var depthArg = arguments.length ? arguments[0] : undefined;
	    var O = toObject(this);
	    var sourceLen = lengthOfArrayLike(O);
	    var A = arraySpeciesCreate(O, 0);
	    A.length = flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toIntegerOrInfinity(depthArg));
	    return A;
	  }
	});
	return es_array_flat;
}

requireEs_array_flat();

var es_array_includes = {};

var objectDefineProperties = {};

var objectKeys;
var hasRequiredObjectKeys;

function requireObjectKeys () {
	if (hasRequiredObjectKeys) return objectKeys;
	hasRequiredObjectKeys = 1;
	var internalObjectKeys = requireObjectKeysInternal();
	var enumBugKeys = requireEnumBugKeys();

	// `Object.keys` method
	// https://tc39.es/ecma262/#sec-object.keys
	// eslint-disable-next-line es/no-object-keys -- safe
	objectKeys = Object.keys || function keys(O) {
	  return internalObjectKeys(O, enumBugKeys);
	};
	return objectKeys;
}

var hasRequiredObjectDefineProperties;

function requireObjectDefineProperties () {
	if (hasRequiredObjectDefineProperties) return objectDefineProperties;
	hasRequiredObjectDefineProperties = 1;
	var DESCRIPTORS = requireDescriptors();
	var V8_PROTOTYPE_DEFINE_BUG = requireV8PrototypeDefineBug();
	var definePropertyModule = requireObjectDefineProperty();
	var anObject = requireAnObject();
	var toIndexedObject = requireToIndexedObject();
	var objectKeys = requireObjectKeys();

	// `Object.defineProperties` method
	// https://tc39.es/ecma262/#sec-object.defineproperties
	// eslint-disable-next-line es/no-object-defineproperties -- safe
	objectDefineProperties.f = DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject(O);
	  var props = toIndexedObject(Properties);
	  var keys = objectKeys(Properties);
	  var length = keys.length;
	  var index = 0;
	  var key;
	  while (length > index) definePropertyModule.f(O, key = keys[index++], props[key]);
	  return O;
	};
	return objectDefineProperties;
}

var html;
var hasRequiredHtml;

function requireHtml () {
	if (hasRequiredHtml) return html;
	hasRequiredHtml = 1;
	var getBuiltIn = requireGetBuiltIn();

	html = getBuiltIn('document', 'documentElement');
	return html;
}

var objectCreate;
var hasRequiredObjectCreate;

function requireObjectCreate () {
	if (hasRequiredObjectCreate) return objectCreate;
	hasRequiredObjectCreate = 1;
	/* global ActiveXObject -- old IE, WSH */
	var anObject = requireAnObject();
	var definePropertiesModule = requireObjectDefineProperties();
	var enumBugKeys = requireEnumBugKeys();
	var hiddenKeys = requireHiddenKeys();
	var html = requireHtml();
	var documentCreateElement = requireDocumentCreateElement();
	var sharedKey = requireSharedKey();

	var GT = '>';
	var LT = '<';
	var PROTOTYPE = 'prototype';
	var SCRIPT = 'script';
	var IE_PROTO = sharedKey('IE_PROTO');

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
	  var iframe = documentCreateElement('iframe');
	  var JS = 'java' + SCRIPT + ':';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  html.appendChild(iframe);
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
	  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
	  return NullProtoObject();
	};

	hiddenKeys[IE_PROTO] = true;

	// `Object.create` method
	// https://tc39.es/ecma262/#sec-object.create
	// eslint-disable-next-line es/no-object-create -- safe
	objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    EmptyConstructor[PROTOTYPE] = anObject(O);
	    result = new EmptyConstructor();
	    EmptyConstructor[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = NullProtoObject();
	  return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
	};
	return objectCreate;
}

var addToUnscopables;
var hasRequiredAddToUnscopables;

function requireAddToUnscopables () {
	if (hasRequiredAddToUnscopables) return addToUnscopables;
	hasRequiredAddToUnscopables = 1;
	var wellKnownSymbol = requireWellKnownSymbol();
	var create = requireObjectCreate();
	var defineProperty = requireObjectDefineProperty().f;

	var UNSCOPABLES = wellKnownSymbol('unscopables');
	var ArrayPrototype = Array.prototype;

	// Array.prototype[@@unscopables]
	// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
	if (ArrayPrototype[UNSCOPABLES] === undefined) {
	  defineProperty(ArrayPrototype, UNSCOPABLES, {
	    configurable: true,
	    value: create(null)
	  });
	}

	// add a key to Array.prototype[@@unscopables]
	addToUnscopables = function (key) {
	  ArrayPrototype[UNSCOPABLES][key] = true;
	};
	return addToUnscopables;
}

var hasRequiredEs_array_includes;

function requireEs_array_includes () {
	if (hasRequiredEs_array_includes) return es_array_includes;
	hasRequiredEs_array_includes = 1;
	var $ = require_export();
	var $includes = requireArrayIncludes().includes;
	var fails = requireFails();
	var addToUnscopables = requireAddToUnscopables();

	// FF99+ bug
	var BROKEN_ON_SPARSE = fails(function () {
	  // eslint-disable-next-line es/no-array-prototype-includes -- detection
	  return !Array(1).includes();
	});

	// `Array.prototype.includes` method
	// https://tc39.es/ecma262/#sec-array.prototype.includes
	$({ target: 'Array', proto: true, forced: BROKEN_ON_SPARSE }, {
	  includes: function includes(el /* , fromIndex = 0 */) {
	    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables('includes');
	return es_array_includes;
}

requireEs_array_includes();

var iterators;
var hasRequiredIterators;

function requireIterators () {
	if (hasRequiredIterators) return iterators;
	hasRequiredIterators = 1;
	iterators = {};
	return iterators;
}

var correctPrototypeGetter;
var hasRequiredCorrectPrototypeGetter;

function requireCorrectPrototypeGetter () {
	if (hasRequiredCorrectPrototypeGetter) return correctPrototypeGetter;
	hasRequiredCorrectPrototypeGetter = 1;
	var fails = requireFails();

	correctPrototypeGetter = !fails(function () {
	  function F() { /* empty */ }
	  F.prototype.constructor = null;
	  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
	  return Object.getPrototypeOf(new F()) !== F.prototype;
	});
	return correctPrototypeGetter;
}

var objectGetPrototypeOf;
var hasRequiredObjectGetPrototypeOf;

function requireObjectGetPrototypeOf () {
	if (hasRequiredObjectGetPrototypeOf) return objectGetPrototypeOf;
	hasRequiredObjectGetPrototypeOf = 1;
	var hasOwn = requireHasOwnProperty();
	var isCallable = requireIsCallable();
	var toObject = requireToObject();
	var sharedKey = requireSharedKey();
	var CORRECT_PROTOTYPE_GETTER = requireCorrectPrototypeGetter();

	var IE_PROTO = sharedKey('IE_PROTO');
	var $Object = Object;
	var ObjectPrototype = $Object.prototype;

	// `Object.getPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.getprototypeof
	// eslint-disable-next-line es/no-object-getprototypeof -- safe
	objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER ? $Object.getPrototypeOf : function (O) {
	  var object = toObject(O);
	  if (hasOwn(object, IE_PROTO)) return object[IE_PROTO];
	  var constructor = object.constructor;
	  if (isCallable(constructor) && object instanceof constructor) {
	    return constructor.prototype;
	  } return object instanceof $Object ? ObjectPrototype : null;
	};
	return objectGetPrototypeOf;
}

var iteratorsCore;
var hasRequiredIteratorsCore;

function requireIteratorsCore () {
	if (hasRequiredIteratorsCore) return iteratorsCore;
	hasRequiredIteratorsCore = 1;
	var fails = requireFails();
	var isCallable = requireIsCallable();
	var isObject = requireIsObject();
	var create = requireObjectCreate();
	var getPrototypeOf = requireObjectGetPrototypeOf();
	var defineBuiltIn = requireDefineBuiltIn();
	var wellKnownSymbol = requireWellKnownSymbol();
	var IS_PURE = requireIsPure();

	var ITERATOR = wellKnownSymbol('iterator');
	var BUGGY_SAFARI_ITERATORS = false;

	// `%IteratorPrototype%` object
	// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
	var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

	/* eslint-disable es/no-array-prototype-keys -- safe */
	if ([].keys) {
	  arrayIterator = [].keys();
	  // Safari 8 has buggy iterators w/o `next`
	  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
	  else {
	    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
	    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
	  }
	}

	var NEW_ITERATOR_PROTOTYPE = !isObject(IteratorPrototype) || fails(function () {
	  var test = {};
	  // FF44- legacy iterators case
	  return IteratorPrototype[ITERATOR].call(test) !== test;
	});

	if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype = {};
	else if (IS_PURE) IteratorPrototype = create(IteratorPrototype);

	// `%IteratorPrototype%[@@iterator]()` method
	// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
	if (!isCallable(IteratorPrototype[ITERATOR])) {
	  defineBuiltIn(IteratorPrototype, ITERATOR, function () {
	    return this;
	  });
	}

	iteratorsCore = {
	  IteratorPrototype: IteratorPrototype,
	  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
	};
	return iteratorsCore;
}

var setToStringTag;
var hasRequiredSetToStringTag;

function requireSetToStringTag () {
	if (hasRequiredSetToStringTag) return setToStringTag;
	hasRequiredSetToStringTag = 1;
	var defineProperty = requireObjectDefineProperty().f;
	var hasOwn = requireHasOwnProperty();
	var wellKnownSymbol = requireWellKnownSymbol();

	var TO_STRING_TAG = wellKnownSymbol('toStringTag');

	setToStringTag = function (target, TAG, STATIC) {
	  if (target && !STATIC) target = target.prototype;
	  if (target && !hasOwn(target, TO_STRING_TAG)) {
	    defineProperty(target, TO_STRING_TAG, { configurable: true, value: TAG });
	  }
	};
	return setToStringTag;
}

var iteratorCreateConstructor;
var hasRequiredIteratorCreateConstructor;

function requireIteratorCreateConstructor () {
	if (hasRequiredIteratorCreateConstructor) return iteratorCreateConstructor;
	hasRequiredIteratorCreateConstructor = 1;
	var IteratorPrototype = requireIteratorsCore().IteratorPrototype;
	var create = requireObjectCreate();
	var createPropertyDescriptor = requireCreatePropertyDescriptor();
	var setToStringTag = requireSetToStringTag();
	var Iterators = requireIterators();

	var returnThis = function () { return this; };

	iteratorCreateConstructor = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
	  var TO_STRING_TAG = NAME + ' Iterator';
	  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(+!ENUMERABLE_NEXT, next) });
	  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
	  Iterators[TO_STRING_TAG] = returnThis;
	  return IteratorConstructor;
	};
	return iteratorCreateConstructor;
}

var iteratorDefine;
var hasRequiredIteratorDefine;

function requireIteratorDefine () {
	if (hasRequiredIteratorDefine) return iteratorDefine;
	hasRequiredIteratorDefine = 1;
	var $ = require_export();
	var call = requireFunctionCall();
	var IS_PURE = requireIsPure();
	var FunctionName = requireFunctionName();
	var isCallable = requireIsCallable();
	var createIteratorConstructor = requireIteratorCreateConstructor();
	var getPrototypeOf = requireObjectGetPrototypeOf();
	var setPrototypeOf = requireObjectSetPrototypeOf();
	var setToStringTag = requireSetToStringTag();
	var createNonEnumerableProperty = requireCreateNonEnumerableProperty();
	var defineBuiltIn = requireDefineBuiltIn();
	var wellKnownSymbol = requireWellKnownSymbol();
	var Iterators = requireIterators();
	var IteratorsCore = requireIteratorsCore();

	var PROPER_FUNCTION_NAME = FunctionName.PROPER;
	var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
	var IteratorPrototype = IteratorsCore.IteratorPrototype;
	var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
	var ITERATOR = wellKnownSymbol('iterator');
	var KEYS = 'keys';
	var VALUES = 'values';
	var ENTRIES = 'entries';

	var returnThis = function () { return this; };

	iteratorDefine = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
	  createIteratorConstructor(IteratorConstructor, NAME, next);

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
	  var nativeIterator = IterablePrototype[ITERATOR]
	    || IterablePrototype['@@iterator']
	    || DEFAULT && IterablePrototype[DEFAULT];
	  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
	  var anyNativeIterator = NAME === 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
	  var CurrentIteratorPrototype, methods, KEY;

	  // fix native
	  if (anyNativeIterator) {
	    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
	    if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
	      if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
	        if (setPrototypeOf) {
	          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
	        } else if (!isCallable(CurrentIteratorPrototype[ITERATOR])) {
	          defineBuiltIn(CurrentIteratorPrototype, ITERATOR, returnThis);
	        }
	      }
	      // Set @@toStringTag to native iterators
	      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
	      if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
	    }
	  }

	  // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
	  if (PROPER_FUNCTION_NAME && DEFAULT === VALUES && nativeIterator && nativeIterator.name !== VALUES) {
	    if (!IS_PURE && CONFIGURABLE_FUNCTION_NAME) {
	      createNonEnumerableProperty(IterablePrototype, 'name', VALUES);
	    } else {
	      INCORRECT_VALUES_NAME = true;
	      defaultIterator = function values() { return call(nativeIterator, this); };
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
	        defineBuiltIn(IterablePrototype, KEY, methods[KEY]);
	      }
	    } else $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
	  }

	  // define iterator
	  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
	    defineBuiltIn(IterablePrototype, ITERATOR, defaultIterator, { name: DEFAULT });
	  }
	  Iterators[NAME] = defaultIterator;

	  return methods;
	};
	return iteratorDefine;
}

var createIterResultObject;
var hasRequiredCreateIterResultObject;

function requireCreateIterResultObject () {
	if (hasRequiredCreateIterResultObject) return createIterResultObject;
	hasRequiredCreateIterResultObject = 1;
	// `CreateIterResultObject` abstract operation
	// https://tc39.es/ecma262/#sec-createiterresultobject
	createIterResultObject = function (value, done) {
	  return { value: value, done: done };
	};
	return createIterResultObject;
}

var es_array_iterator;
var hasRequiredEs_array_iterator;

function requireEs_array_iterator () {
	if (hasRequiredEs_array_iterator) return es_array_iterator;
	hasRequiredEs_array_iterator = 1;
	var toIndexedObject = requireToIndexedObject();
	var addToUnscopables = requireAddToUnscopables();
	var Iterators = requireIterators();
	var InternalStateModule = requireInternalState();
	var defineProperty = requireObjectDefineProperty().f;
	var defineIterator = requireIteratorDefine();
	var createIterResultObject = requireCreateIterResultObject();
	var IS_PURE = requireIsPure();
	var DESCRIPTORS = requireDescriptors();

	var ARRAY_ITERATOR = 'Array Iterator';
	var setInternalState = InternalStateModule.set;
	var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);

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
	es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
	  setInternalState(this, {
	    type: ARRAY_ITERATOR,
	    target: toIndexedObject(iterated), // target
	    index: 0,                          // next index
	    kind: kind                         // kind
	  });
	// `%ArrayIteratorPrototype%.next` method
	// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
	}, function () {
	  var state = getInternalState(this);
	  var target = state.target;
	  var index = state.index++;
	  if (!target || index >= target.length) {
	    state.target = null;
	    return createIterResultObject(undefined, true);
	  }
	  switch (state.kind) {
	    case 'keys': return createIterResultObject(index, false);
	    case 'values': return createIterResultObject(target[index], false);
	  } return createIterResultObject([index, target[index]], false);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values%
	// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
	// https://tc39.es/ecma262/#sec-createmappedargumentsobject
	var values = Iterators.Arguments = Iterators.Array;

	// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

	// V8 ~ Chrome 45- bug
	if (!IS_PURE && DESCRIPTORS && values.name !== 'values') try {
	  defineProperty(values, 'name', { value: 'values' });
	} catch (error) { /* empty */ }
	return es_array_iterator;
}

requireEs_array_iterator();

var es_array_push = {};

var arraySetLength;
var hasRequiredArraySetLength;

function requireArraySetLength () {
	if (hasRequiredArraySetLength) return arraySetLength;
	hasRequiredArraySetLength = 1;
	var DESCRIPTORS = requireDescriptors();
	var isArray = requireIsArray();

	var $TypeError = TypeError;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// Safari < 13 does not throw an error in this case
	var SILENT_ON_NON_WRITABLE_LENGTH_SET = DESCRIPTORS && !function () {
	  // makes no sense without proper strict mode support
	  if (this !== undefined) return true;
	  try {
	    // eslint-disable-next-line es/no-object-defineproperty -- safe
	    Object.defineProperty([], 'length', { writable: false }).length = 1;
	  } catch (error) {
	    return error instanceof TypeError;
	  }
	}();

	arraySetLength = SILENT_ON_NON_WRITABLE_LENGTH_SET ? function (O, length) {
	  if (isArray(O) && !getOwnPropertyDescriptor(O, 'length').writable) {
	    throw new $TypeError('Cannot set read only .length');
	  } return O.length = length;
	} : function (O, length) {
	  return O.length = length;
	};
	return arraySetLength;
}

var hasRequiredEs_array_push;

function requireEs_array_push () {
	if (hasRequiredEs_array_push) return es_array_push;
	hasRequiredEs_array_push = 1;
	var $ = require_export();
	var toObject = requireToObject();
	var lengthOfArrayLike = requireLengthOfArrayLike();
	var setArrayLength = requireArraySetLength();
	var doesNotExceedSafeInteger = requireDoesNotExceedSafeInteger();
	var fails = requireFails();

	var INCORRECT_TO_LENGTH = fails(function () {
	  return [].push.call({ length: 0x100000000 }, 1) !== 4294967297;
	});

	// V8 <= 121 and Safari <= 15.4; FF < 23 throws InternalError
	// https://bugs.chromium.org/p/v8/issues/detail?id=12681
	var properErrorOnNonWritableLength = function () {
	  try {
	    // eslint-disable-next-line es/no-object-defineproperty -- safe
	    Object.defineProperty([], 'length', { writable: false }).push();
	  } catch (error) {
	    return error instanceof TypeError;
	  }
	};

	var FORCED = INCORRECT_TO_LENGTH || !properErrorOnNonWritableLength();

	// `Array.prototype.push` method
	// https://tc39.es/ecma262/#sec-array.prototype.push
	$({ target: 'Array', proto: true, arity: 1, forced: FORCED }, {
	  // eslint-disable-next-line no-unused-vars -- required for `.length`
	  push: function push(item) {
	    var O = toObject(this);
	    var len = lengthOfArrayLike(O);
	    var argCount = arguments.length;
	    doesNotExceedSafeInteger(len + argCount);
	    for (var i = 0; i < argCount; i++) {
	      O[len] = arguments[i];
	      len++;
	    }
	    setArrayLength(O, len);
	    return len;
	  }
	});
	return es_array_push;
}

requireEs_array_push();

var es_array_reduce = {};

var arrayReduce;
var hasRequiredArrayReduce;

function requireArrayReduce () {
	if (hasRequiredArrayReduce) return arrayReduce;
	hasRequiredArrayReduce = 1;
	var aCallable = requireACallable();
	var toObject = requireToObject();
	var IndexedObject = requireIndexedObject();
	var lengthOfArrayLike = requireLengthOfArrayLike();

	var $TypeError = TypeError;

	var REDUCE_EMPTY = 'Reduce of empty array with no initial value';

	// `Array.prototype.{ reduce, reduceRight }` methods implementation
	var createMethod = function (IS_RIGHT) {
	  return function (that, callbackfn, argumentsLength, memo) {
	    var O = toObject(that);
	    var self = IndexedObject(O);
	    var length = lengthOfArrayLike(O);
	    aCallable(callbackfn);
	    if (length === 0 && argumentsLength < 2) throw new $TypeError(REDUCE_EMPTY);
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
	        throw new $TypeError(REDUCE_EMPTY);
	      }
	    }
	    for (;IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
	      memo = callbackfn(memo, self[index], index, O);
	    }
	    return memo;
	  };
	};

	arrayReduce = {
	  // `Array.prototype.reduce` method
	  // https://tc39.es/ecma262/#sec-array.prototype.reduce
	  left: createMethod(false),
	  // `Array.prototype.reduceRight` method
	  // https://tc39.es/ecma262/#sec-array.prototype.reduceright
	  right: createMethod(true)
	};
	return arrayReduce;
}

var arrayMethodIsStrict;
var hasRequiredArrayMethodIsStrict;

function requireArrayMethodIsStrict () {
	if (hasRequiredArrayMethodIsStrict) return arrayMethodIsStrict;
	hasRequiredArrayMethodIsStrict = 1;
	var fails = requireFails();

	arrayMethodIsStrict = function (METHOD_NAME, argument) {
	  var method = [][METHOD_NAME];
	  return !!method && fails(function () {
	    // eslint-disable-next-line no-useless-call -- required for testing
	    method.call(null, argument || function () { return 1; }, 1);
	  });
	};
	return arrayMethodIsStrict;
}

var environment;
var hasRequiredEnvironment;

function requireEnvironment () {
	if (hasRequiredEnvironment) return environment;
	hasRequiredEnvironment = 1;
	/* global Bun, Deno -- detection */
	var globalThis = requireGlobalThis();
	var userAgent = requireEnvironmentUserAgent();
	var classof = requireClassofRaw();

	var userAgentStartsWith = function (string) {
	  return userAgent.slice(0, string.length) === string;
	};

	environment = (function () {
	  if (userAgentStartsWith('Bun/')) return 'BUN';
	  if (userAgentStartsWith('Cloudflare-Workers')) return 'CLOUDFLARE';
	  if (userAgentStartsWith('Deno/')) return 'DENO';
	  if (userAgentStartsWith('Node.js/')) return 'NODE';
	  if (globalThis.Bun && typeof Bun.version == 'string') return 'BUN';
	  if (globalThis.Deno && typeof Deno.version == 'object') return 'DENO';
	  if (classof(globalThis.process) === 'process') return 'NODE';
	  if (globalThis.window && globalThis.document) return 'BROWSER';
	  return 'REST';
	})();
	return environment;
}

var environmentIsNode;
var hasRequiredEnvironmentIsNode;

function requireEnvironmentIsNode () {
	if (hasRequiredEnvironmentIsNode) return environmentIsNode;
	hasRequiredEnvironmentIsNode = 1;
	var ENVIRONMENT = requireEnvironment();

	environmentIsNode = ENVIRONMENT === 'NODE';
	return environmentIsNode;
}

var hasRequiredEs_array_reduce;

function requireEs_array_reduce () {
	if (hasRequiredEs_array_reduce) return es_array_reduce;
	hasRequiredEs_array_reduce = 1;
	var $ = require_export();
	var $reduce = requireArrayReduce().left;
	var arrayMethodIsStrict = requireArrayMethodIsStrict();
	var CHROME_VERSION = requireEnvironmentV8Version();
	var IS_NODE = requireEnvironmentIsNode();

	// Chrome 80-82 has a critical bug
	// https://bugs.chromium.org/p/chromium/issues/detail?id=1049982
	var CHROME_BUG = !IS_NODE && CHROME_VERSION > 79 && CHROME_VERSION < 83;
	var FORCED = CHROME_BUG || !arrayMethodIsStrict('reduce');

	// `Array.prototype.reduce` method
	// https://tc39.es/ecma262/#sec-array.prototype.reduce
	$({ target: 'Array', proto: true, forced: FORCED }, {
	  reduce: function reduce(callbackfn /* , initialValue */) {
	    var length = arguments.length;
	    return $reduce(this, callbackfn, length, length > 1 ? arguments[1] : undefined);
	  }
	});
	return es_array_reduce;
}

requireEs_array_reduce();

var es_array_reverse = {};

var hasRequiredEs_array_reverse;

function requireEs_array_reverse () {
	if (hasRequiredEs_array_reverse) return es_array_reverse;
	hasRequiredEs_array_reverse = 1;
	var $ = require_export();
	var uncurryThis = requireFunctionUncurryThis();
	var isArray = requireIsArray();

	var nativeReverse = uncurryThis([].reverse);
	var test = [1, 2];

	// `Array.prototype.reverse` method
	// https://tc39.es/ecma262/#sec-array.prototype.reverse
	// fix for Safari 12.0 bug
	// https://bugs.webkit.org/show_bug.cgi?id=188794
	$({ target: 'Array', proto: true, forced: String(test) === String(test.reverse()) }, {
	  reverse: function reverse() {
	    // eslint-disable-next-line no-self-assign -- dirty hack
	    if (isArray(this)) this.length = this.length;
	    return nativeReverse(this);
	  }
	});
	return es_array_reverse;
}

requireEs_array_reverse();

var es_array_sort = {};

var deletePropertyOrThrow;
var hasRequiredDeletePropertyOrThrow;

function requireDeletePropertyOrThrow () {
	if (hasRequiredDeletePropertyOrThrow) return deletePropertyOrThrow;
	hasRequiredDeletePropertyOrThrow = 1;
	var tryToString = requireTryToString();

	var $TypeError = TypeError;

	deletePropertyOrThrow = function (O, P) {
	  if (!delete O[P]) throw new $TypeError('Cannot delete property ' + tryToString(P) + ' of ' + tryToString(O));
	};
	return deletePropertyOrThrow;
}

var arraySlice;
var hasRequiredArraySlice;

function requireArraySlice () {
	if (hasRequiredArraySlice) return arraySlice;
	hasRequiredArraySlice = 1;
	var uncurryThis = requireFunctionUncurryThis();

	arraySlice = uncurryThis([].slice);
	return arraySlice;
}

var arraySort;
var hasRequiredArraySort;

function requireArraySort () {
	if (hasRequiredArraySort) return arraySort;
	hasRequiredArraySort = 1;
	var arraySlice = requireArraySlice();

	var floor = Math.floor;

	var sort = function (array, comparefn) {
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
	    var middle = floor(length / 2);
	    var left = sort(arraySlice(array, 0, middle), comparefn);
	    var right = sort(arraySlice(array, middle), comparefn);
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

	arraySort = sort;
	return arraySort;
}

var environmentFfVersion;
var hasRequiredEnvironmentFfVersion;

function requireEnvironmentFfVersion () {
	if (hasRequiredEnvironmentFfVersion) return environmentFfVersion;
	hasRequiredEnvironmentFfVersion = 1;
	var userAgent = requireEnvironmentUserAgent();

	var firefox = userAgent.match(/firefox\/(\d+)/i);

	environmentFfVersion = !!firefox && +firefox[1];
	return environmentFfVersion;
}

var environmentIsIeOrEdge;
var hasRequiredEnvironmentIsIeOrEdge;

function requireEnvironmentIsIeOrEdge () {
	if (hasRequiredEnvironmentIsIeOrEdge) return environmentIsIeOrEdge;
	hasRequiredEnvironmentIsIeOrEdge = 1;
	var UA = requireEnvironmentUserAgent();

	environmentIsIeOrEdge = /MSIE|Trident/.test(UA);
	return environmentIsIeOrEdge;
}

var environmentWebkitVersion;
var hasRequiredEnvironmentWebkitVersion;

function requireEnvironmentWebkitVersion () {
	if (hasRequiredEnvironmentWebkitVersion) return environmentWebkitVersion;
	hasRequiredEnvironmentWebkitVersion = 1;
	var userAgent = requireEnvironmentUserAgent();

	var webkit = userAgent.match(/AppleWebKit\/(\d+)\./);

	environmentWebkitVersion = !!webkit && +webkit[1];
	return environmentWebkitVersion;
}

var hasRequiredEs_array_sort;

function requireEs_array_sort () {
	if (hasRequiredEs_array_sort) return es_array_sort;
	hasRequiredEs_array_sort = 1;
	var $ = require_export();
	var uncurryThis = requireFunctionUncurryThis();
	var aCallable = requireACallable();
	var toObject = requireToObject();
	var lengthOfArrayLike = requireLengthOfArrayLike();
	var deletePropertyOrThrow = requireDeletePropertyOrThrow();
	var toString = requireToString();
	var fails = requireFails();
	var internalSort = requireArraySort();
	var arrayMethodIsStrict = requireArrayMethodIsStrict();
	var FF = requireEnvironmentFfVersion();
	var IE_OR_EDGE = requireEnvironmentIsIeOrEdge();
	var V8 = requireEnvironmentV8Version();
	var WEBKIT = requireEnvironmentWebkitVersion();

	var test = [];
	var nativeSort = uncurryThis(test.sort);
	var push = uncurryThis(test.push);

	// IE8-
	var FAILS_ON_UNDEFINED = fails(function () {
	  test.sort(undefined);
	});
	// V8 bug
	var FAILS_ON_NULL = fails(function () {
	  test.sort(null);
	});
	// Old WebKit
	var STRICT_METHOD = arrayMethodIsStrict('sort');

	var STABLE_SORT = !fails(function () {
	  // feature detection can be too slow, so check engines versions
	  if (V8) return V8 < 70;
	  if (FF && FF > 3) return;
	  if (IE_OR_EDGE) return true;
	  if (WEBKIT) return WEBKIT < 603;

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

	var FORCED = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || !STRICT_METHOD || !STABLE_SORT;

	var getSortCompare = function (comparefn) {
	  return function (x, y) {
	    if (y === undefined) return -1;
	    if (x === undefined) return 1;
	    if (comparefn !== undefined) return +comparefn(x, y) || 0;
	    return toString(x) > toString(y) ? 1 : -1;
	  };
	};

	// `Array.prototype.sort` method
	// https://tc39.es/ecma262/#sec-array.prototype.sort
	$({ target: 'Array', proto: true, forced: FORCED }, {
	  sort: function sort(comparefn) {
	    if (comparefn !== undefined) aCallable(comparefn);

	    var array = toObject(this);

	    if (STABLE_SORT) return comparefn === undefined ? nativeSort(array) : nativeSort(array, comparefn);

	    var items = [];
	    var arrayLength = lengthOfArrayLike(array);
	    var itemsLength, index;

	    for (index = 0; index < arrayLength; index++) {
	      if (index in array) push(items, array[index]);
	    }

	    internalSort(items, getSortCompare(comparefn));

	    itemsLength = lengthOfArrayLike(items);
	    index = 0;

	    while (index < itemsLength) array[index] = items[index++];
	    while (index < arrayLength) deletePropertyOrThrow(array, index++);

	    return array;
	  }
	});
	return es_array_sort;
}

requireEs_array_sort();

var es_array_unscopables_flat = {};

var hasRequiredEs_array_unscopables_flat;

function requireEs_array_unscopables_flat () {
	if (hasRequiredEs_array_unscopables_flat) return es_array_unscopables_flat;
	hasRequiredEs_array_unscopables_flat = 1;
	// this method was added to unscopables after implementation
	// in popular engines, so it's moved to a separate module
	var addToUnscopables = requireAddToUnscopables();

	// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables('flat');
	return es_array_unscopables_flat;
}

requireEs_array_unscopables_flat();

var es_array_unshift = {};

var hasRequiredEs_array_unshift;

function requireEs_array_unshift () {
	if (hasRequiredEs_array_unshift) return es_array_unshift;
	hasRequiredEs_array_unshift = 1;
	var $ = require_export();
	var toObject = requireToObject();
	var lengthOfArrayLike = requireLengthOfArrayLike();
	var setArrayLength = requireArraySetLength();
	var deletePropertyOrThrow = requireDeletePropertyOrThrow();
	var doesNotExceedSafeInteger = requireDoesNotExceedSafeInteger();

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

	var FORCED = INCORRECT_RESULT || !properErrorOnNonWritableLength();

	// `Array.prototype.unshift` method
	// https://tc39.es/ecma262/#sec-array.prototype.unshift
	$({ target: 'Array', proto: true, arity: 1, forced: FORCED }, {
	  // eslint-disable-next-line no-unused-vars -- required for `.length`
	  unshift: function unshift(item) {
	    var O = toObject(this);
	    var len = lengthOfArrayLike(O);
	    var argCount = arguments.length;
	    if (argCount) {
	      doesNotExceedSafeInteger(len + argCount);
	      var k = len;
	      while (k--) {
	        var to = k + argCount;
	        if (k in O) O[to] = O[k];
	        else deletePropertyOrThrow(O, to);
	      }
	      for (var j = 0; j < argCount; j++) {
	        O[j] = arguments[j];
	      }
	    } return setArrayLength(O, len + argCount);
	  }
	});
	return es_array_unshift;
}

requireEs_array_unshift();

var es_arrayBuffer_slice = {};

var arrayBufferBasicDetection;
var hasRequiredArrayBufferBasicDetection;

function requireArrayBufferBasicDetection () {
	if (hasRequiredArrayBufferBasicDetection) return arrayBufferBasicDetection;
	hasRequiredArrayBufferBasicDetection = 1;
	// eslint-disable-next-line es/no-typed-arrays -- safe
	arrayBufferBasicDetection = typeof ArrayBuffer != 'undefined' && typeof DataView != 'undefined';
	return arrayBufferBasicDetection;
}

var defineBuiltIns;
var hasRequiredDefineBuiltIns;

function requireDefineBuiltIns () {
	if (hasRequiredDefineBuiltIns) return defineBuiltIns;
	hasRequiredDefineBuiltIns = 1;
	var defineBuiltIn = requireDefineBuiltIn();

	defineBuiltIns = function (target, src, options) {
	  for (var key in src) defineBuiltIn(target, key, src[key], options);
	  return target;
	};
	return defineBuiltIns;
}

var anInstance;
var hasRequiredAnInstance;

function requireAnInstance () {
	if (hasRequiredAnInstance) return anInstance;
	hasRequiredAnInstance = 1;
	var isPrototypeOf = requireObjectIsPrototypeOf();

	var $TypeError = TypeError;

	anInstance = function (it, Prototype) {
	  if (isPrototypeOf(Prototype, it)) return it;
	  throw new $TypeError('Incorrect invocation');
	};
	return anInstance;
}

var toIndex;
var hasRequiredToIndex;

function requireToIndex () {
	if (hasRequiredToIndex) return toIndex;
	hasRequiredToIndex = 1;
	var toIntegerOrInfinity = requireToIntegerOrInfinity();
	var toLength = requireToLength();

	var $RangeError = RangeError;

	// `ToIndex` abstract operation
	// https://tc39.es/ecma262/#sec-toindex
	toIndex = function (it) {
	  if (it === undefined) return 0;
	  var number = toIntegerOrInfinity(it);
	  var length = toLength(number);
	  if (number !== length) throw new $RangeError('Wrong length or index');
	  return length;
	};
	return toIndex;
}

var mathSign;
var hasRequiredMathSign;

function requireMathSign () {
	if (hasRequiredMathSign) return mathSign;
	hasRequiredMathSign = 1;
	// `Math.sign` method implementation
	// https://tc39.es/ecma262/#sec-math.sign
	// eslint-disable-next-line es/no-math-sign -- safe
	mathSign = Math.sign || function sign(x) {
	  var n = +x;
	  // eslint-disable-next-line no-self-compare -- NaN check
	  return n === 0 || n !== n ? n : n < 0 ? -1 : 1;
	};
	return mathSign;
}

var mathFloatRound;
var hasRequiredMathFloatRound;

function requireMathFloatRound () {
	if (hasRequiredMathFloatRound) return mathFloatRound;
	hasRequiredMathFloatRound = 1;
	var sign = requireMathSign();

	var abs = Math.abs;

	var EPSILON = 2.220446049250313e-16; // Number.EPSILON
	var INVERSE_EPSILON = 1 / EPSILON;

	var roundTiesToEven = function (n) {
	  return n + INVERSE_EPSILON - INVERSE_EPSILON;
	};

	mathFloatRound = function (x, FLOAT_EPSILON, FLOAT_MAX_VALUE, FLOAT_MIN_VALUE) {
	  var n = +x;
	  var absolute = abs(n);
	  var s = sign(n);
	  if (absolute < FLOAT_MIN_VALUE) return s * roundTiesToEven(absolute / FLOAT_MIN_VALUE / FLOAT_EPSILON) * FLOAT_MIN_VALUE * FLOAT_EPSILON;
	  var a = (1 + FLOAT_EPSILON / EPSILON) * absolute;
	  var result = a - (a - absolute);
	  // eslint-disable-next-line no-self-compare -- NaN check
	  if (result > FLOAT_MAX_VALUE || result !== result) return s * Infinity;
	  return s * result;
	};
	return mathFloatRound;
}

var mathFround;
var hasRequiredMathFround;

function requireMathFround () {
	if (hasRequiredMathFround) return mathFround;
	hasRequiredMathFround = 1;
	var floatRound = requireMathFloatRound();

	var FLOAT32_EPSILON = 1.1920928955078125e-7; // 2 ** -23;
	var FLOAT32_MAX_VALUE = 3.4028234663852886e+38; // 2 ** 128 - 2 ** 104
	var FLOAT32_MIN_VALUE = 1.1754943508222875e-38; // 2 ** -126;

	// `Math.fround` method implementation
	// https://tc39.es/ecma262/#sec-math.fround
	// eslint-disable-next-line es/no-math-fround -- safe
	mathFround = Math.fround || function fround(x) {
	  return floatRound(x, FLOAT32_EPSILON, FLOAT32_MAX_VALUE, FLOAT32_MIN_VALUE);
	};
	return mathFround;
}

var ieee754;
var hasRequiredIeee754;

function requireIeee754 () {
	if (hasRequiredIeee754) return ieee754;
	hasRequiredIeee754 = 1;
	// IEEE754 conversions based on https://github.com/feross/ieee754
	var $Array = Array;
	var abs = Math.abs;
	var pow = Math.pow;
	var floor = Math.floor;
	var log = Math.log;
	var LN2 = Math.LN2;

	var pack = function (number, mantissaLength, bytes) {
	  var buffer = $Array(bytes);
	  var exponentLength = bytes * 8 - mantissaLength - 1;
	  var eMax = (1 << exponentLength) - 1;
	  var eBias = eMax >> 1;
	  var rt = mantissaLength === 23 ? pow(2, -24) - pow(2, -77) : 0;
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
	    exponent = floor(log(number) / LN2);
	    c = pow(2, -exponent);
	    if (number * c < 1) {
	      exponent--;
	      c *= 2;
	    }
	    if (exponent + eBias >= 1) {
	      number += rt / c;
	    } else {
	      number += rt * pow(2, 1 - eBias);
	    }
	    if (number * c >= 2) {
	      exponent++;
	      c /= 2;
	    }
	    if (exponent + eBias >= eMax) {
	      mantissa = 0;
	      exponent = eMax;
	    } else if (exponent + eBias >= 1) {
	      mantissa = (number * c - 1) * pow(2, mantissaLength);
	      exponent += eBias;
	    } else {
	      mantissa = number * pow(2, eBias - 1) * pow(2, mantissaLength);
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
	    mantissa += pow(2, mantissaLength);
	    exponent -= eBias;
	  } return (sign ? -1 : 1) * mantissa * pow(2, exponent - mantissaLength);
	};

	ieee754 = {
	  pack: pack,
	  unpack: unpack
	};
	return ieee754;
}

var arrayFill;
var hasRequiredArrayFill;

function requireArrayFill () {
	if (hasRequiredArrayFill) return arrayFill;
	hasRequiredArrayFill = 1;
	var toObject = requireToObject();
	var toAbsoluteIndex = requireToAbsoluteIndex();
	var lengthOfArrayLike = requireLengthOfArrayLike();

	// `Array.prototype.fill` method implementation
	// https://tc39.es/ecma262/#sec-array.prototype.fill
	arrayFill = function fill(value /* , start = 0, end = @length */) {
	  var O = toObject(this);
	  var length = lengthOfArrayLike(O);
	  var argumentsLength = arguments.length;
	  var index = toAbsoluteIndex(argumentsLength > 1 ? arguments[1] : undefined, length);
	  var end = argumentsLength > 2 ? arguments[2] : undefined;
	  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
	  while (endPos > index) O[index++] = value;
	  return O;
	};
	return arrayFill;
}

var arrayBuffer;
var hasRequiredArrayBuffer;

function requireArrayBuffer () {
	if (hasRequiredArrayBuffer) return arrayBuffer;
	hasRequiredArrayBuffer = 1;
	var globalThis = requireGlobalThis();
	var uncurryThis = requireFunctionUncurryThis();
	var DESCRIPTORS = requireDescriptors();
	var NATIVE_ARRAY_BUFFER = requireArrayBufferBasicDetection();
	var FunctionName = requireFunctionName();
	var createNonEnumerableProperty = requireCreateNonEnumerableProperty();
	var defineBuiltInAccessor = requireDefineBuiltInAccessor();
	var defineBuiltIns = requireDefineBuiltIns();
	var fails = requireFails();
	var anInstance = requireAnInstance();
	var toIntegerOrInfinity = requireToIntegerOrInfinity();
	var toLength = requireToLength();
	var toIndex = requireToIndex();
	var fround = requireMathFround();
	var IEEE754 = requireIeee754();
	var getPrototypeOf = requireObjectGetPrototypeOf();
	var setPrototypeOf = requireObjectSetPrototypeOf();
	var arrayFill = requireArrayFill();
	var arraySlice = requireArraySlice();
	var inheritIfRequired = requireInheritIfRequired();
	var copyConstructorProperties = requireCopyConstructorProperties();
	var setToStringTag = requireSetToStringTag();
	var InternalStateModule = requireInternalState();

	var PROPER_FUNCTION_NAME = FunctionName.PROPER;
	var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
	var ARRAY_BUFFER = 'ArrayBuffer';
	var DATA_VIEW = 'DataView';
	var PROTOTYPE = 'prototype';
	var WRONG_LENGTH = 'Wrong length';
	var WRONG_INDEX = 'Wrong index';
	var getInternalArrayBufferState = InternalStateModule.getterFor(ARRAY_BUFFER);
	var getInternalDataViewState = InternalStateModule.getterFor(DATA_VIEW);
	var setInternalState = InternalStateModule.set;
	var NativeArrayBuffer = globalThis[ARRAY_BUFFER];
	var $ArrayBuffer = NativeArrayBuffer;
	var ArrayBufferPrototype = $ArrayBuffer && $ArrayBuffer[PROTOTYPE];
	var $DataView = globalThis[DATA_VIEW];
	var DataViewPrototype = $DataView && $DataView[PROTOTYPE];
	var ObjectPrototype = Object.prototype;
	var Array = globalThis.Array;
	var RangeError = globalThis.RangeError;
	var fill = uncurryThis(arrayFill);
	var reverse = uncurryThis([].reverse);

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

	var addGetter = function (Constructor, key, getInternalState) {
	  defineBuiltInAccessor(Constructor[PROTOTYPE], key, {
	    configurable: true,
	    get: function () {
	      return getInternalState(this)[key];
	    }
	  });
	};

	var get = function (view, count, index, isLittleEndian) {
	  var store = getInternalDataViewState(view);
	  var intIndex = toIndex(index);
	  var boolIsLittleEndian = !!isLittleEndian;
	  if (intIndex + count > store.byteLength) throw new RangeError(WRONG_INDEX);
	  var bytes = store.bytes;
	  var start = intIndex + store.byteOffset;
	  var pack = arraySlice(bytes, start, start + count);
	  return boolIsLittleEndian ? pack : reverse(pack);
	};

	var set = function (view, count, index, conversion, value, isLittleEndian) {
	  var store = getInternalDataViewState(view);
	  var intIndex = toIndex(index);
	  var pack = conversion(+value);
	  var boolIsLittleEndian = !!isLittleEndian;
	  if (intIndex + count > store.byteLength) throw new RangeError(WRONG_INDEX);
	  var bytes = store.bytes;
	  var start = intIndex + store.byteOffset;
	  for (var i = 0; i < count; i++) bytes[start + i] = pack[boolIsLittleEndian ? i : count - i - 1];
	};

	if (!NATIVE_ARRAY_BUFFER) {
	  $ArrayBuffer = function ArrayBuffer(length) {
	    anInstance(this, ArrayBufferPrototype);
	    var byteLength = toIndex(length);
	    setInternalState(this, {
	      type: ARRAY_BUFFER,
	      bytes: fill(Array(byteLength), 0),
	      byteLength: byteLength
	    });
	    if (!DESCRIPTORS) {
	      this.byteLength = byteLength;
	      this.detached = false;
	    }
	  };

	  ArrayBufferPrototype = $ArrayBuffer[PROTOTYPE];

	  $DataView = function DataView(buffer, byteOffset, byteLength) {
	    anInstance(this, DataViewPrototype);
	    anInstance(buffer, ArrayBufferPrototype);
	    var bufferState = getInternalArrayBufferState(buffer);
	    var bufferLength = bufferState.byteLength;
	    var offset = toIntegerOrInfinity(byteOffset);
	    if (offset < 0 || offset > bufferLength) throw new RangeError('Wrong offset');
	    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
	    if (offset + byteLength > bufferLength) throw new RangeError(WRONG_LENGTH);
	    setInternalState(this, {
	      type: DATA_VIEW,
	      buffer: buffer,
	      byteLength: byteLength,
	      byteOffset: offset,
	      bytes: bufferState.bytes
	    });
	    if (!DESCRIPTORS) {
	      this.buffer = buffer;
	      this.byteLength = byteLength;
	      this.byteOffset = offset;
	    }
	  };

	  DataViewPrototype = $DataView[PROTOTYPE];

	  if (DESCRIPTORS) {
	    addGetter($ArrayBuffer, 'byteLength', getInternalArrayBufferState);
	    addGetter($DataView, 'buffer', getInternalDataViewState);
	    addGetter($DataView, 'byteLength', getInternalDataViewState);
	    addGetter($DataView, 'byteOffset', getInternalDataViewState);
	  }

	  defineBuiltIns(DataViewPrototype, {
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
	  /* eslint-disable no-new, sonarjs/inconsistent-function-call -- required for testing */
	  if (!fails(function () {
	    NativeArrayBuffer(1);
	  }) || !fails(function () {
	    new NativeArrayBuffer(-1);
	  }) || fails(function () {
	    new NativeArrayBuffer();
	    new NativeArrayBuffer(1.5);
	    new NativeArrayBuffer(NaN);
	    return NativeArrayBuffer.length !== 1 || INCORRECT_ARRAY_BUFFER_NAME && !CONFIGURABLE_FUNCTION_NAME;
	  })) {
	    /* eslint-enable no-new, sonarjs/inconsistent-function-call -- required for testing */
	    $ArrayBuffer = function ArrayBuffer(length) {
	      anInstance(this, ArrayBufferPrototype);
	      return inheritIfRequired(new NativeArrayBuffer(toIndex(length)), this, $ArrayBuffer);
	    };

	    $ArrayBuffer[PROTOTYPE] = ArrayBufferPrototype;

	    ArrayBufferPrototype.constructor = $ArrayBuffer;

	    copyConstructorProperties($ArrayBuffer, NativeArrayBuffer);
	  } else if (INCORRECT_ARRAY_BUFFER_NAME && CONFIGURABLE_FUNCTION_NAME) {
	    createNonEnumerableProperty(NativeArrayBuffer, 'name', ARRAY_BUFFER);
	  }

	  // WebKit bug - the same parent prototype for typed arrays and data view
	  if (setPrototypeOf && getPrototypeOf(DataViewPrototype) !== ObjectPrototype) {
	    setPrototypeOf(DataViewPrototype, ObjectPrototype);
	  }

	  // iOS Safari 7.x bug
	  var testView = new $DataView(new $ArrayBuffer(2));
	  var $setInt8 = uncurryThis(DataViewPrototype.setInt8);
	  testView.setInt8(0, 2147483648);
	  testView.setInt8(1, 2147483649);
	  if (testView.getInt8(0) || !testView.getInt8(1)) defineBuiltIns(DataViewPrototype, {
	    setInt8: function setInt8(byteOffset, value) {
	      $setInt8(this, byteOffset, value << 24 >> 24);
	    },
	    setUint8: function setUint8(byteOffset, value) {
	      $setInt8(this, byteOffset, value << 24 >> 24);
	    }
	  }, { unsafe: true });
	}

	setToStringTag($ArrayBuffer, ARRAY_BUFFER);
	setToStringTag($DataView, DATA_VIEW);

	arrayBuffer = {
	  ArrayBuffer: $ArrayBuffer,
	  DataView: $DataView
	};
	return arrayBuffer;
}

var hasRequiredEs_arrayBuffer_slice;

function requireEs_arrayBuffer_slice () {
	if (hasRequiredEs_arrayBuffer_slice) return es_arrayBuffer_slice;
	hasRequiredEs_arrayBuffer_slice = 1;
	var $ = require_export();
	var uncurryThis = requireFunctionUncurryThisClause();
	var fails = requireFails();
	var ArrayBufferModule = requireArrayBuffer();
	var anObject = requireAnObject();
	var toAbsoluteIndex = requireToAbsoluteIndex();
	var toLength = requireToLength();

	var ArrayBuffer = ArrayBufferModule.ArrayBuffer;
	var DataView = ArrayBufferModule.DataView;
	var DataViewPrototype = DataView.prototype;
	var nativeArrayBufferSlice = uncurryThis(ArrayBuffer.prototype.slice);
	var getUint8 = uncurryThis(DataViewPrototype.getUint8);
	var setUint8 = uncurryThis(DataViewPrototype.setUint8);

	var INCORRECT_SLICE = fails(function () {
	  return !new ArrayBuffer(2).slice(1, undefined).byteLength;
	});

	// `ArrayBuffer.prototype.slice` method
	// https://tc39.es/ecma262/#sec-arraybuffer.prototype.slice
	$({ target: 'ArrayBuffer', proto: true, unsafe: true, forced: INCORRECT_SLICE }, {
	  slice: function slice(start, end) {
	    if (nativeArrayBufferSlice && end === undefined) {
	      return nativeArrayBufferSlice(anObject(this), start); // FF fix
	    }
	    var length = anObject(this).byteLength;
	    var first = toAbsoluteIndex(start, length);
	    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
	    var result = new ArrayBuffer(toLength(fin - first));
	    var viewSource = new DataView(this);
	    var viewTarget = new DataView(result);
	    var index = 0;
	    while (first < fin) {
	      setUint8(viewTarget, index++, getUint8(viewSource, first++));
	    } return result;
	  }
	});
	return es_arrayBuffer_slice;
}

requireEs_arrayBuffer_slice();

var es_arrayBuffer_detached = {};

var arrayBufferByteLength;
var hasRequiredArrayBufferByteLength;

function requireArrayBufferByteLength () {
	if (hasRequiredArrayBufferByteLength) return arrayBufferByteLength;
	hasRequiredArrayBufferByteLength = 1;
	var globalThis = requireGlobalThis();
	var uncurryThisAccessor = requireFunctionUncurryThisAccessor();
	var classof = requireClassofRaw();

	var ArrayBuffer = globalThis.ArrayBuffer;
	var TypeError = globalThis.TypeError;

	// Includes
	// - Perform ? RequireInternalSlot(O, [[ArrayBufferData]]).
	// - If IsSharedArrayBuffer(O) is true, throw a TypeError exception.
	arrayBufferByteLength = ArrayBuffer && uncurryThisAccessor(ArrayBuffer.prototype, 'byteLength', 'get') || function (O) {
	  if (classof(O) !== 'ArrayBuffer') throw new TypeError('ArrayBuffer expected');
	  return O.byteLength;
	};
	return arrayBufferByteLength;
}

var arrayBufferIsDetached;
var hasRequiredArrayBufferIsDetached;

function requireArrayBufferIsDetached () {
	if (hasRequiredArrayBufferIsDetached) return arrayBufferIsDetached;
	hasRequiredArrayBufferIsDetached = 1;
	var globalThis = requireGlobalThis();
	var uncurryThis = requireFunctionUncurryThisClause();
	var arrayBufferByteLength = requireArrayBufferByteLength();

	var ArrayBuffer = globalThis.ArrayBuffer;
	var ArrayBufferPrototype = ArrayBuffer && ArrayBuffer.prototype;
	var slice = ArrayBufferPrototype && uncurryThis(ArrayBufferPrototype.slice);

	arrayBufferIsDetached = function (O) {
	  if (arrayBufferByteLength(O) !== 0) return false;
	  if (!slice) return false;
	  try {
	    slice(O, 0, 0);
	    return false;
	  } catch (error) {
	    return true;
	  }
	};
	return arrayBufferIsDetached;
}

var hasRequiredEs_arrayBuffer_detached;

function requireEs_arrayBuffer_detached () {
	if (hasRequiredEs_arrayBuffer_detached) return es_arrayBuffer_detached;
	hasRequiredEs_arrayBuffer_detached = 1;
	var DESCRIPTORS = requireDescriptors();
	var defineBuiltInAccessor = requireDefineBuiltInAccessor();
	var isDetached = requireArrayBufferIsDetached();

	var ArrayBufferPrototype = ArrayBuffer.prototype;

	// `ArrayBuffer.prototype.detached` getter
	// https://tc39.es/ecma262/#sec-get-arraybuffer.prototype.detached
	if (DESCRIPTORS && !('detached' in ArrayBufferPrototype)) {
	  defineBuiltInAccessor(ArrayBufferPrototype, 'detached', {
	    configurable: true,
	    get: function detached() {
	      return isDetached(this);
	    }
	  });
	}
	return es_arrayBuffer_detached;
}

requireEs_arrayBuffer_detached();

var es_arrayBuffer_transfer = {};

var arrayBufferNotDetached;
var hasRequiredArrayBufferNotDetached;

function requireArrayBufferNotDetached () {
	if (hasRequiredArrayBufferNotDetached) return arrayBufferNotDetached;
	hasRequiredArrayBufferNotDetached = 1;
	var isDetached = requireArrayBufferIsDetached();

	var $TypeError = TypeError;

	arrayBufferNotDetached = function (it) {
	  if (isDetached(it)) throw new $TypeError('ArrayBuffer is detached');
	  return it;
	};
	return arrayBufferNotDetached;
}

var getBuiltInNodeModule;
var hasRequiredGetBuiltInNodeModule;

function requireGetBuiltInNodeModule () {
	if (hasRequiredGetBuiltInNodeModule) return getBuiltInNodeModule;
	hasRequiredGetBuiltInNodeModule = 1;
	var globalThis = requireGlobalThis();
	var IS_NODE = requireEnvironmentIsNode();

	getBuiltInNodeModule = function (name) {
	  if (IS_NODE) {
	    try {
	      return globalThis.process.getBuiltinModule(name);
	    } catch (error) { /* empty */ }
	    try {
	      // eslint-disable-next-line no-new-func -- safe
	      return Function('return require("' + name + '")')();
	    } catch (error) { /* empty */ }
	  }
	};
	return getBuiltInNodeModule;
}

var structuredCloneProperTransfer;
var hasRequiredStructuredCloneProperTransfer;

function requireStructuredCloneProperTransfer () {
	if (hasRequiredStructuredCloneProperTransfer) return structuredCloneProperTransfer;
	hasRequiredStructuredCloneProperTransfer = 1;
	var globalThis = requireGlobalThis();
	var fails = requireFails();
	var V8 = requireEnvironmentV8Version();
	var ENVIRONMENT = requireEnvironment();

	var structuredClone = globalThis.structuredClone;

	structuredCloneProperTransfer = !!structuredClone && !fails(function () {
	  // prevent V8 ArrayBufferDetaching protector cell invalidation and performance degradation
	  // https://github.com/zloirock/core-js/issues/679
	  if ((ENVIRONMENT === 'DENO' && V8 > 92) || (ENVIRONMENT === 'NODE' && V8 > 94) || (ENVIRONMENT === 'BROWSER' && V8 > 97)) return false;
	  var buffer = new ArrayBuffer(8);
	  var clone = structuredClone(buffer, { transfer: [buffer] });
	  return buffer.byteLength !== 0 || clone.byteLength !== 8;
	});
	return structuredCloneProperTransfer;
}

var detachTransferable;
var hasRequiredDetachTransferable;

function requireDetachTransferable () {
	if (hasRequiredDetachTransferable) return detachTransferable;
	hasRequiredDetachTransferable = 1;
	var globalThis = requireGlobalThis();
	var getBuiltInNodeModule = requireGetBuiltInNodeModule();
	var PROPER_STRUCTURED_CLONE_TRANSFER = requireStructuredCloneProperTransfer();

	var structuredClone = globalThis.structuredClone;
	var $ArrayBuffer = globalThis.ArrayBuffer;
	var $MessageChannel = globalThis.MessageChannel;
	var detach = false;
	var WorkerThreads, channel, buffer, $detach;

	if (PROPER_STRUCTURED_CLONE_TRANSFER) {
	  detach = function (transferable) {
	    structuredClone(transferable, { transfer: [transferable] });
	  };
	} else if ($ArrayBuffer) try {
	  if (!$MessageChannel) {
	    WorkerThreads = getBuiltInNodeModule('worker_threads');
	    if (WorkerThreads) $MessageChannel = WorkerThreads.MessageChannel;
	  }

	  if ($MessageChannel) {
	    channel = new $MessageChannel();
	    buffer = new $ArrayBuffer(2);

	    $detach = function (transferable) {
	      channel.port1.postMessage(null, [transferable]);
	    };

	    if (buffer.byteLength === 2) {
	      $detach(buffer);
	      if (buffer.byteLength === 0) detach = $detach;
	    }
	  }
	} catch (error) { /* empty */ }

	detachTransferable = detach;
	return detachTransferable;
}

var arrayBufferTransfer;
var hasRequiredArrayBufferTransfer;

function requireArrayBufferTransfer () {
	if (hasRequiredArrayBufferTransfer) return arrayBufferTransfer;
	hasRequiredArrayBufferTransfer = 1;
	var globalThis = requireGlobalThis();
	var uncurryThis = requireFunctionUncurryThis();
	var uncurryThisAccessor = requireFunctionUncurryThisAccessor();
	var toIndex = requireToIndex();
	var notDetached = requireArrayBufferNotDetached();
	var arrayBufferByteLength = requireArrayBufferByteLength();
	var detachTransferable = requireDetachTransferable();
	var PROPER_STRUCTURED_CLONE_TRANSFER = requireStructuredCloneProperTransfer();

	var structuredClone = globalThis.structuredClone;
	var ArrayBuffer = globalThis.ArrayBuffer;
	var DataView = globalThis.DataView;
	var min = Math.min;
	var ArrayBufferPrototype = ArrayBuffer.prototype;
	var DataViewPrototype = DataView.prototype;
	var slice = uncurryThis(ArrayBufferPrototype.slice);
	var isResizable = uncurryThisAccessor(ArrayBufferPrototype, 'resizable', 'get');
	var maxByteLength = uncurryThisAccessor(ArrayBufferPrototype, 'maxByteLength', 'get');
	var getInt8 = uncurryThis(DataViewPrototype.getInt8);
	var setInt8 = uncurryThis(DataViewPrototype.setInt8);

	arrayBufferTransfer = (PROPER_STRUCTURED_CLONE_TRANSFER || detachTransferable) && function (arrayBuffer, newLength, preserveResizability) {
	  var byteLength = arrayBufferByteLength(arrayBuffer);
	  var newByteLength = newLength === undefined ? byteLength : toIndex(newLength);
	  var fixedLength = !isResizable || !isResizable(arrayBuffer);
	  var newBuffer;
	  notDetached(arrayBuffer);
	  if (PROPER_STRUCTURED_CLONE_TRANSFER) {
	    arrayBuffer = structuredClone(arrayBuffer, { transfer: [arrayBuffer] });
	    if (byteLength === newByteLength && (preserveResizability || fixedLength)) return arrayBuffer;
	  }
	  if (byteLength >= newByteLength && (!preserveResizability || fixedLength)) {
	    newBuffer = slice(arrayBuffer, 0, newByteLength);
	  } else {
	    var options = preserveResizability && !fixedLength && maxByteLength ? { maxByteLength: maxByteLength(arrayBuffer) } : undefined;
	    newBuffer = new ArrayBuffer(newByteLength, options);
	    var a = new DataView(arrayBuffer);
	    var b = new DataView(newBuffer);
	    var copyLength = min(newByteLength, byteLength);
	    for (var i = 0; i < copyLength; i++) setInt8(b, i, getInt8(a, i));
	  }
	  if (!PROPER_STRUCTURED_CLONE_TRANSFER) detachTransferable(arrayBuffer);
	  return newBuffer;
	};
	return arrayBufferTransfer;
}

var hasRequiredEs_arrayBuffer_transfer;

function requireEs_arrayBuffer_transfer () {
	if (hasRequiredEs_arrayBuffer_transfer) return es_arrayBuffer_transfer;
	hasRequiredEs_arrayBuffer_transfer = 1;
	var $ = require_export();
	var $transfer = requireArrayBufferTransfer();

	// `ArrayBuffer.prototype.transfer` method
	// https://tc39.es/proposal-arraybuffer-transfer/#sec-arraybuffer.prototype.transfer
	if ($transfer) $({ target: 'ArrayBuffer', proto: true }, {
	  transfer: function transfer() {
	    return $transfer(this, arguments.length ? arguments[0] : undefined, true);
	  }
	});
	return es_arrayBuffer_transfer;
}

requireEs_arrayBuffer_transfer();

var es_arrayBuffer_transferToFixedLength = {};

var hasRequiredEs_arrayBuffer_transferToFixedLength;

function requireEs_arrayBuffer_transferToFixedLength () {
	if (hasRequiredEs_arrayBuffer_transferToFixedLength) return es_arrayBuffer_transferToFixedLength;
	hasRequiredEs_arrayBuffer_transferToFixedLength = 1;
	var $ = require_export();
	var $transfer = requireArrayBufferTransfer();

	// `ArrayBuffer.prototype.transferToFixedLength` method
	// https://tc39.es/proposal-arraybuffer-transfer/#sec-arraybuffer.prototype.transfertofixedlength
	if ($transfer) $({ target: 'ArrayBuffer', proto: true }, {
	  transferToFixedLength: function transferToFixedLength() {
	    return $transfer(this, arguments.length ? arguments[0] : undefined, false);
	  }
	});
	return es_arrayBuffer_transferToFixedLength;
}

requireEs_arrayBuffer_transferToFixedLength();

var es_globalThis = {};

var hasRequiredEs_globalThis;

function requireEs_globalThis () {
	if (hasRequiredEs_globalThis) return es_globalThis;
	hasRequiredEs_globalThis = 1;
	var $ = require_export();
	var globalThis = requireGlobalThis();

	// `globalThis` object
	// https://tc39.es/ecma262/#sec-globalthis
	$({ global: true, forced: globalThis.globalThis !== globalThis }, {
	  globalThis: globalThis
	});
	return es_globalThis;
}

requireEs_globalThis();

var es_json_stringify = {};

var getJsonReplacerFunction;
var hasRequiredGetJsonReplacerFunction;

function requireGetJsonReplacerFunction () {
	if (hasRequiredGetJsonReplacerFunction) return getJsonReplacerFunction;
	hasRequiredGetJsonReplacerFunction = 1;
	var uncurryThis = requireFunctionUncurryThis();
	var isArray = requireIsArray();
	var isCallable = requireIsCallable();
	var classof = requireClassofRaw();
	var toString = requireToString();

	var push = uncurryThis([].push);

	getJsonReplacerFunction = function (replacer) {
	  if (isCallable(replacer)) return replacer;
	  if (!isArray(replacer)) return;
	  var rawLength = replacer.length;
	  var keys = [];
	  for (var i = 0; i < rawLength; i++) {
	    var element = replacer[i];
	    if (typeof element == 'string') push(keys, element);
	    else if (typeof element == 'number' || classof(element) === 'Number' || classof(element) === 'String') push(keys, toString(element));
	  }
	  var keysLength = keys.length;
	  var root = true;
	  return function (key, value) {
	    if (root) {
	      root = false;
	      return value;
	    }
	    if (isArray(this)) return value;
	    for (var j = 0; j < keysLength; j++) if (keys[j] === key) return value;
	  };
	};
	return getJsonReplacerFunction;
}

var hasRequiredEs_json_stringify;

function requireEs_json_stringify () {
	if (hasRequiredEs_json_stringify) return es_json_stringify;
	hasRequiredEs_json_stringify = 1;
	var $ = require_export();
	var getBuiltIn = requireGetBuiltIn();
	var apply = requireFunctionApply();
	var call = requireFunctionCall();
	var uncurryThis = requireFunctionUncurryThis();
	var fails = requireFails();
	var isCallable = requireIsCallable();
	var isSymbol = requireIsSymbol();
	var arraySlice = requireArraySlice();
	var getReplacerFunction = requireGetJsonReplacerFunction();
	var NATIVE_SYMBOL = requireSymbolConstructorDetection();

	var $String = String;
	var $stringify = getBuiltIn('JSON', 'stringify');
	var exec = uncurryThis(/./.exec);
	var charAt = uncurryThis(''.charAt);
	var charCodeAt = uncurryThis(''.charCodeAt);
	var replace = uncurryThis(''.replace);
	var numberToString = uncurryThis(1.0.toString);

	var tester = /[\uD800-\uDFFF]/g;
	var low = /^[\uD800-\uDBFF]$/;
	var hi = /^[\uDC00-\uDFFF]$/;

	var WRONG_SYMBOLS_CONVERSION = !NATIVE_SYMBOL || fails(function () {
	  var symbol = getBuiltIn('Symbol')('stringify detection');
	  // MS Edge converts symbol values to JSON as {}
	  return $stringify([symbol]) !== '[null]'
	    // WebKit converts symbol values to JSON as null
	    || $stringify({ a: symbol }) !== '{}'
	    // V8 throws on boxed symbols
	    || $stringify(Object(symbol)) !== '{}';
	});

	// https://github.com/tc39/proposal-well-formed-stringify
	var ILL_FORMED_UNICODE = fails(function () {
	  return $stringify('\uDF06\uD834') !== '"\\udf06\\ud834"'
	    || $stringify('\uDEAD') !== '"\\udead"';
	});

	var stringifyWithSymbolsFix = function (it, replacer) {
	  var args = arraySlice(arguments);
	  var $replacer = getReplacerFunction(replacer);
	  if (!isCallable($replacer) && (it === undefined || isSymbol(it))) return; // IE8 returns string on undefined
	  args[1] = function (key, value) {
	    // some old implementations (like WebKit) could pass numbers as keys
	    if (isCallable($replacer)) value = call($replacer, this, $String(key), value);
	    if (!isSymbol(value)) return value;
	  };
	  return apply($stringify, null, args);
	};

	var fixIllFormed = function (match, offset, string) {
	  var prev = charAt(string, offset - 1);
	  var next = charAt(string, offset + 1);
	  if ((exec(low, match) && !exec(hi, next)) || (exec(hi, match) && !exec(low, prev))) {
	    return '\\u' + numberToString(charCodeAt(match, 0), 16);
	  } return match;
	};

	if ($stringify) {
	  // `JSON.stringify` method
	  // https://tc39.es/ecma262/#sec-json.stringify
	  $({ target: 'JSON', stat: true, arity: 3, forced: WRONG_SYMBOLS_CONVERSION || ILL_FORMED_UNICODE }, {
	    // eslint-disable-next-line no-unused-vars -- required for `.length`
	    stringify: function stringify(it, replacer, space) {
	      var args = arraySlice(arguments);
	      var result = apply(WRONG_SYMBOLS_CONVERSION ? stringifyWithSymbolsFix : $stringify, null, args);
	      return ILL_FORMED_UNICODE && typeof result == 'string' ? replace(result, tester, fixIllFormed) : result;
	    }
	  });
	}
	return es_json_stringify;
}

requireEs_json_stringify();

var es_promise = {};

var es_promise_constructor = {};

var setSpecies;
var hasRequiredSetSpecies;

function requireSetSpecies () {
	if (hasRequiredSetSpecies) return setSpecies;
	hasRequiredSetSpecies = 1;
	var getBuiltIn = requireGetBuiltIn();
	var defineBuiltInAccessor = requireDefineBuiltInAccessor();
	var wellKnownSymbol = requireWellKnownSymbol();
	var DESCRIPTORS = requireDescriptors();

	var SPECIES = wellKnownSymbol('species');

	setSpecies = function (CONSTRUCTOR_NAME) {
	  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);

	  if (DESCRIPTORS && Constructor && !Constructor[SPECIES]) {
	    defineBuiltInAccessor(Constructor, SPECIES, {
	      configurable: true,
	      get: function () { return this; }
	    });
	  }
	};
	return setSpecies;
}

var aConstructor;
var hasRequiredAConstructor;

function requireAConstructor () {
	if (hasRequiredAConstructor) return aConstructor;
	hasRequiredAConstructor = 1;
	var isConstructor = requireIsConstructor();
	var tryToString = requireTryToString();

	var $TypeError = TypeError;

	// `Assert: IsConstructor(argument) is true`
	aConstructor = function (argument) {
	  if (isConstructor(argument)) return argument;
	  throw new $TypeError(tryToString(argument) + ' is not a constructor');
	};
	return aConstructor;
}

var speciesConstructor;
var hasRequiredSpeciesConstructor;

function requireSpeciesConstructor () {
	if (hasRequiredSpeciesConstructor) return speciesConstructor;
	hasRequiredSpeciesConstructor = 1;
	var anObject = requireAnObject();
	var aConstructor = requireAConstructor();
	var isNullOrUndefined = requireIsNullOrUndefined();
	var wellKnownSymbol = requireWellKnownSymbol();

	var SPECIES = wellKnownSymbol('species');

	// `SpeciesConstructor` abstract operation
	// https://tc39.es/ecma262/#sec-speciesconstructor
	speciesConstructor = function (O, defaultConstructor) {
	  var C = anObject(O).constructor;
	  var S;
	  return C === undefined || isNullOrUndefined(S = anObject(C)[SPECIES]) ? defaultConstructor : aConstructor(S);
	};
	return speciesConstructor;
}

var validateArgumentsLength;
var hasRequiredValidateArgumentsLength;

function requireValidateArgumentsLength () {
	if (hasRequiredValidateArgumentsLength) return validateArgumentsLength;
	hasRequiredValidateArgumentsLength = 1;
	var $TypeError = TypeError;

	validateArgumentsLength = function (passed, required) {
	  if (passed < required) throw new $TypeError('Not enough arguments');
	  return passed;
	};
	return validateArgumentsLength;
}

var environmentIsIos;
var hasRequiredEnvironmentIsIos;

function requireEnvironmentIsIos () {
	if (hasRequiredEnvironmentIsIos) return environmentIsIos;
	hasRequiredEnvironmentIsIos = 1;
	var userAgent = requireEnvironmentUserAgent();

	// eslint-disable-next-line redos/no-vulnerable -- safe
	environmentIsIos = /(?:ipad|iphone|ipod).*applewebkit/i.test(userAgent);
	return environmentIsIos;
}

var task;
var hasRequiredTask;

function requireTask () {
	if (hasRequiredTask) return task;
	hasRequiredTask = 1;
	var globalThis = requireGlobalThis();
	var apply = requireFunctionApply();
	var bind = requireFunctionBindContext();
	var isCallable = requireIsCallable();
	var hasOwn = requireHasOwnProperty();
	var fails = requireFails();
	var html = requireHtml();
	var arraySlice = requireArraySlice();
	var createElement = requireDocumentCreateElement();
	var validateArgumentsLength = requireValidateArgumentsLength();
	var IS_IOS = requireEnvironmentIsIos();
	var IS_NODE = requireEnvironmentIsNode();

	var set = globalThis.setImmediate;
	var clear = globalThis.clearImmediate;
	var process = globalThis.process;
	var Dispatch = globalThis.Dispatch;
	var Function = globalThis.Function;
	var MessageChannel = globalThis.MessageChannel;
	var String = globalThis.String;
	var counter = 0;
	var queue = {};
	var ONREADYSTATECHANGE = 'onreadystatechange';
	var $location, defer, channel, port;

	fails(function () {
	  // Deno throws a ReferenceError on `location` access without `--location` flag
	  $location = globalThis.location;
	});

	var run = function (id) {
	  if (hasOwn(queue, id)) {
	    var fn = queue[id];
	    delete queue[id];
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
	  globalThis.postMessage(String(id), $location.protocol + '//' + $location.host);
	};

	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if (!set || !clear) {
	  set = function setImmediate(handler) {
	    validateArgumentsLength(arguments.length, 1);
	    var fn = isCallable(handler) ? handler : Function(handler);
	    var args = arraySlice(arguments, 1);
	    queue[++counter] = function () {
	      apply(fn, undefined, args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clear = function clearImmediate(id) {
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if (IS_NODE) {
	    defer = function (id) {
	      process.nextTick(runner(id));
	    };
	  // Sphere (JS game engine) Dispatch API
	  } else if (Dispatch && Dispatch.now) {
	    defer = function (id) {
	      Dispatch.now(runner(id));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  // except iOS - https://github.com/zloirock/core-js/issues/624
	  } else if (MessageChannel && !IS_IOS) {
	    channel = new MessageChannel();
	    port = channel.port2;
	    channel.port1.onmessage = eventListener;
	    defer = bind(port.postMessage, port);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if (
	    globalThis.addEventListener &&
	    isCallable(globalThis.postMessage) &&
	    !globalThis.importScripts &&
	    $location && $location.protocol !== 'file:' &&
	    !fails(globalPostMessageDefer)
	  ) {
	    defer = globalPostMessageDefer;
	    globalThis.addEventListener('message', eventListener, false);
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

	task = {
	  set: set,
	  clear: clear
	};
	return task;
}

var safeGetBuiltIn;
var hasRequiredSafeGetBuiltIn;

function requireSafeGetBuiltIn () {
	if (hasRequiredSafeGetBuiltIn) return safeGetBuiltIn;
	hasRequiredSafeGetBuiltIn = 1;
	var globalThis = requireGlobalThis();
	var DESCRIPTORS = requireDescriptors();

	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// Avoid NodeJS experimental warning
	safeGetBuiltIn = function (name) {
	  if (!DESCRIPTORS) return globalThis[name];
	  var descriptor = getOwnPropertyDescriptor(globalThis, name);
	  return descriptor && descriptor.value;
	};
	return safeGetBuiltIn;
}

var queue;
var hasRequiredQueue;

function requireQueue () {
	if (hasRequiredQueue) return queue;
	hasRequiredQueue = 1;
	var Queue = function () {
	  this.head = null;
	  this.tail = null;
	};

	Queue.prototype = {
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

	queue = Queue;
	return queue;
}

var environmentIsIosPebble;
var hasRequiredEnvironmentIsIosPebble;

function requireEnvironmentIsIosPebble () {
	if (hasRequiredEnvironmentIsIosPebble) return environmentIsIosPebble;
	hasRequiredEnvironmentIsIosPebble = 1;
	var userAgent = requireEnvironmentUserAgent();

	environmentIsIosPebble = /ipad|iphone|ipod/i.test(userAgent) && typeof Pebble != 'undefined';
	return environmentIsIosPebble;
}

var environmentIsWebosWebkit;
var hasRequiredEnvironmentIsWebosWebkit;

function requireEnvironmentIsWebosWebkit () {
	if (hasRequiredEnvironmentIsWebosWebkit) return environmentIsWebosWebkit;
	hasRequiredEnvironmentIsWebosWebkit = 1;
	var userAgent = requireEnvironmentUserAgent();

	environmentIsWebosWebkit = /web0s(?!.*chrome)/i.test(userAgent);
	return environmentIsWebosWebkit;
}

var microtask_1;
var hasRequiredMicrotask;

function requireMicrotask () {
	if (hasRequiredMicrotask) return microtask_1;
	hasRequiredMicrotask = 1;
	var globalThis = requireGlobalThis();
	var safeGetBuiltIn = requireSafeGetBuiltIn();
	var bind = requireFunctionBindContext();
	var macrotask = requireTask().set;
	var Queue = requireQueue();
	var IS_IOS = requireEnvironmentIsIos();
	var IS_IOS_PEBBLE = requireEnvironmentIsIosPebble();
	var IS_WEBOS_WEBKIT = requireEnvironmentIsWebosWebkit();
	var IS_NODE = requireEnvironmentIsNode();

	var MutationObserver = globalThis.MutationObserver || globalThis.WebKitMutationObserver;
	var document = globalThis.document;
	var process = globalThis.process;
	var Promise = globalThis.Promise;
	var microtask = safeGetBuiltIn('queueMicrotask');
	var notify, toggle, node, promise, then;

	// modern engines have queueMicrotask method
	if (!microtask) {
	  var queue = new Queue();

	  var flush = function () {
	    var parent, fn;
	    if (IS_NODE && (parent = process.domain)) parent.exit();
	    while (fn = queue.get()) try {
	      fn();
	    } catch (error) {
	      if (queue.head) notify();
	      throw error;
	    }
	    if (parent) parent.enter();
	  };

	  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
	  // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898
	  if (!IS_IOS && !IS_NODE && !IS_WEBOS_WEBKIT && MutationObserver && document) {
	    toggle = true;
	    node = document.createTextNode('');
	    new MutationObserver(flush).observe(node, { characterData: true });
	    notify = function () {
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if (!IS_IOS_PEBBLE && Promise && Promise.resolve) {
	    // Promise.resolve without an argument throws an error in LG WebOS 2
	    promise = Promise.resolve(undefined);
	    // workaround of WebKit ~ iOS Safari 10.1 bug
	    promise.constructor = Promise;
	    then = bind(promise.then, promise);
	    notify = function () {
	      then(flush);
	    };
	  // Node.js without promises
	  } else if (IS_NODE) {
	    notify = function () {
	      process.nextTick(flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessage
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    // `webpack` dev server bug on IE global methods - use bind(fn, global)
	    macrotask = bind(macrotask, globalThis);
	    notify = function () {
	      macrotask(flush);
	    };
	  }

	  microtask = function (fn) {
	    if (!queue.head) notify();
	    queue.add(fn);
	  };
	}

	microtask_1 = microtask;
	return microtask_1;
}

var hostReportErrors;
var hasRequiredHostReportErrors;

function requireHostReportErrors () {
	if (hasRequiredHostReportErrors) return hostReportErrors;
	hasRequiredHostReportErrors = 1;
	hostReportErrors = function (a, b) {
	  try {
	    // eslint-disable-next-line no-console -- safe
	    arguments.length === 1 ? console.error(a) : console.error(a, b);
	  } catch (error) { /* empty */ }
	};
	return hostReportErrors;
}

var perform;
var hasRequiredPerform;

function requirePerform () {
	if (hasRequiredPerform) return perform;
	hasRequiredPerform = 1;
	perform = function (exec) {
	  try {
	    return { error: false, value: exec() };
	  } catch (error) {
	    return { error: true, value: error };
	  }
	};
	return perform;
}

var promiseNativeConstructor;
var hasRequiredPromiseNativeConstructor;

function requirePromiseNativeConstructor () {
	if (hasRequiredPromiseNativeConstructor) return promiseNativeConstructor;
	hasRequiredPromiseNativeConstructor = 1;
	var globalThis = requireGlobalThis();

	promiseNativeConstructor = globalThis.Promise;
	return promiseNativeConstructor;
}

var promiseConstructorDetection;
var hasRequiredPromiseConstructorDetection;

function requirePromiseConstructorDetection () {
	if (hasRequiredPromiseConstructorDetection) return promiseConstructorDetection;
	hasRequiredPromiseConstructorDetection = 1;
	var globalThis = requireGlobalThis();
	var NativePromiseConstructor = requirePromiseNativeConstructor();
	var isCallable = requireIsCallable();
	var isForced = requireIsForced();
	var inspectSource = requireInspectSource();
	var wellKnownSymbol = requireWellKnownSymbol();
	var ENVIRONMENT = requireEnvironment();
	var IS_PURE = requireIsPure();
	var V8_VERSION = requireEnvironmentV8Version();

	var NativePromisePrototype = NativePromiseConstructor && NativePromiseConstructor.prototype;
	var SPECIES = wellKnownSymbol('species');
	var SUBCLASSING = false;
	var NATIVE_PROMISE_REJECTION_EVENT = isCallable(globalThis.PromiseRejectionEvent);

	var FORCED_PROMISE_CONSTRUCTOR = isForced('Promise', function () {
	  var PROMISE_CONSTRUCTOR_SOURCE = inspectSource(NativePromiseConstructor);
	  var GLOBAL_CORE_JS_PROMISE = PROMISE_CONSTRUCTOR_SOURCE !== String(NativePromiseConstructor);
	  // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
	  // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
	  // We can't detect it synchronously, so just check versions
	  if (!GLOBAL_CORE_JS_PROMISE && V8_VERSION === 66) return true;
	  // We need Promise#{ catch, finally } in the pure version for preventing prototype pollution
	  if (IS_PURE && !(NativePromisePrototype['catch'] && NativePromisePrototype['finally'])) return true;
	  // We can't use @@species feature detection in V8 since it causes
	  // deoptimization and performance degradation
	  // https://github.com/zloirock/core-js/issues/679
	  if (!V8_VERSION || V8_VERSION < 51 || !/native code/.test(PROMISE_CONSTRUCTOR_SOURCE)) {
	    // Detect correctness of subclassing with @@species support
	    var promise = new NativePromiseConstructor(function (resolve) { resolve(1); });
	    var FakePromise = function (exec) {
	      exec(function () { /* empty */ }, function () { /* empty */ });
	    };
	    var constructor = promise.constructor = {};
	    constructor[SPECIES] = FakePromise;
	    SUBCLASSING = promise.then(function () { /* empty */ }) instanceof FakePromise;
	    if (!SUBCLASSING) return true;
	  // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	  } return !GLOBAL_CORE_JS_PROMISE && (ENVIRONMENT === 'BROWSER' || ENVIRONMENT === 'DENO') && !NATIVE_PROMISE_REJECTION_EVENT;
	});

	promiseConstructorDetection = {
	  CONSTRUCTOR: FORCED_PROMISE_CONSTRUCTOR,
	  REJECTION_EVENT: NATIVE_PROMISE_REJECTION_EVENT,
	  SUBCLASSING: SUBCLASSING
	};
	return promiseConstructorDetection;
}

var newPromiseCapability = {};

var hasRequiredNewPromiseCapability;

function requireNewPromiseCapability () {
	if (hasRequiredNewPromiseCapability) return newPromiseCapability;
	hasRequiredNewPromiseCapability = 1;
	var aCallable = requireACallable();

	var $TypeError = TypeError;

	var PromiseCapability = function (C) {
	  var resolve, reject;
	  this.promise = new C(function ($$resolve, $$reject) {
	    if (resolve !== undefined || reject !== undefined) throw new $TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject = $$reject;
	  });
	  this.resolve = aCallable(resolve);
	  this.reject = aCallable(reject);
	};

	// `NewPromiseCapability` abstract operation
	// https://tc39.es/ecma262/#sec-newpromisecapability
	newPromiseCapability.f = function (C) {
	  return new PromiseCapability(C);
	};
	return newPromiseCapability;
}

var hasRequiredEs_promise_constructor;

function requireEs_promise_constructor () {
	if (hasRequiredEs_promise_constructor) return es_promise_constructor;
	hasRequiredEs_promise_constructor = 1;
	var $ = require_export();
	var IS_PURE = requireIsPure();
	var IS_NODE = requireEnvironmentIsNode();
	var globalThis = requireGlobalThis();
	var call = requireFunctionCall();
	var defineBuiltIn = requireDefineBuiltIn();
	var setPrototypeOf = requireObjectSetPrototypeOf();
	var setToStringTag = requireSetToStringTag();
	var setSpecies = requireSetSpecies();
	var aCallable = requireACallable();
	var isCallable = requireIsCallable();
	var isObject = requireIsObject();
	var anInstance = requireAnInstance();
	var speciesConstructor = requireSpeciesConstructor();
	var task = requireTask().set;
	var microtask = requireMicrotask();
	var hostReportErrors = requireHostReportErrors();
	var perform = requirePerform();
	var Queue = requireQueue();
	var InternalStateModule = requireInternalState();
	var NativePromiseConstructor = requirePromiseNativeConstructor();
	var PromiseConstructorDetection = requirePromiseConstructorDetection();
	var newPromiseCapabilityModule = requireNewPromiseCapability();

	var PROMISE = 'Promise';
	var FORCED_PROMISE_CONSTRUCTOR = PromiseConstructorDetection.CONSTRUCTOR;
	var NATIVE_PROMISE_REJECTION_EVENT = PromiseConstructorDetection.REJECTION_EVENT;
	var NATIVE_PROMISE_SUBCLASSING = PromiseConstructorDetection.SUBCLASSING;
	var getInternalPromiseState = InternalStateModule.getterFor(PROMISE);
	var setInternalState = InternalStateModule.set;
	var NativePromisePrototype = NativePromiseConstructor && NativePromiseConstructor.prototype;
	var PromiseConstructor = NativePromiseConstructor;
	var PromisePrototype = NativePromisePrototype;
	var TypeError = globalThis.TypeError;
	var document = globalThis.document;
	var process = globalThis.process;
	var newPromiseCapability = newPromiseCapabilityModule.f;
	var newGenericPromiseCapability = newPromiseCapability;

	var DISPATCH_EVENT = !!(document && document.createEvent && globalThis.dispatchEvent);
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
	  return isObject(it) && isCallable(then = it.then) ? then : false;
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
	        reject(new TypeError('Promise-chain cycle'));
	      } else if (then = isThenable(result)) {
	        call(then, result, resolve, reject);
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
	  microtask(function () {
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
	    event = document.createEvent('Event');
	    event.promise = promise;
	    event.reason = reason;
	    event.initEvent(name, false, true);
	    globalThis.dispatchEvent(event);
	  } else event = { promise: promise, reason: reason };
	  if (!NATIVE_PROMISE_REJECTION_EVENT && (handler = globalThis['on' + name])) handler(event);
	  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
	};

	var onUnhandled = function (state) {
	  call(task, globalThis, function () {
	    var promise = state.facade;
	    var value = state.value;
	    var IS_UNHANDLED = isUnhandled(state);
	    var result;
	    if (IS_UNHANDLED) {
	      result = perform(function () {
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
	  call(task, globalThis, function () {
	    var promise = state.facade;
	    if (IS_NODE) {
	      process.emit('rejectionHandled', promise);
	    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
	  });
	};

	var bind = function (fn, state, unwrap) {
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
	    if (state.facade === value) throw new TypeError("Promise can't be resolved itself");
	    var then = isThenable(value);
	    if (then) {
	      microtask(function () {
	        var wrapper = { done: false };
	        try {
	          call(then, value,
	            bind(internalResolve, wrapper, state),
	            bind(internalReject, wrapper, state)
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
	if (FORCED_PROMISE_CONSTRUCTOR) {
	  // 25.4.3.1 Promise(executor)
	  PromiseConstructor = function Promise(executor) {
	    anInstance(this, PromisePrototype);
	    aCallable(executor);
	    call(Internal, this);
	    var state = getInternalPromiseState(this);
	    try {
	      executor(bind(internalResolve, state), bind(internalReject, state));
	    } catch (error) {
	      internalReject(state, error);
	    }
	  };

	  PromisePrototype = PromiseConstructor.prototype;

	  // eslint-disable-next-line no-unused-vars -- required for `.length`
	  Internal = function Promise(executor) {
	    setInternalState(this, {
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
	  Internal.prototype = defineBuiltIn(PromisePrototype, 'then', function then(onFulfilled, onRejected) {
	    var state = getInternalPromiseState(this);
	    var reaction = newPromiseCapability(speciesConstructor(this, PromiseConstructor));
	    state.parent = true;
	    reaction.ok = isCallable(onFulfilled) ? onFulfilled : true;
	    reaction.fail = isCallable(onRejected) && onRejected;
	    reaction.domain = IS_NODE ? process.domain : undefined;
	    if (state.state === PENDING) state.reactions.add(reaction);
	    else microtask(function () {
	      callReaction(reaction, state);
	    });
	    return reaction.promise;
	  });

	  OwnPromiseCapability = function () {
	    var promise = new Internal();
	    var state = getInternalPromiseState(promise);
	    this.promise = promise;
	    this.resolve = bind(internalResolve, state);
	    this.reject = bind(internalReject, state);
	  };

	  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
	    return C === PromiseConstructor || C === PromiseWrapper
	      ? new OwnPromiseCapability(C)
	      : newGenericPromiseCapability(C);
	  };

	  if (!IS_PURE && isCallable(NativePromiseConstructor) && NativePromisePrototype !== Object.prototype) {
	    nativeThen = NativePromisePrototype.then;

	    if (!NATIVE_PROMISE_SUBCLASSING) {
	      // make `Promise#then` return a polyfilled `Promise` for native promise-based APIs
	      defineBuiltIn(NativePromisePrototype, 'then', function then(onFulfilled, onRejected) {
	        var that = this;
	        return new PromiseConstructor(function (resolve, reject) {
	          call(nativeThen, that, resolve, reject);
	        }).then(onFulfilled, onRejected);
	      // https://github.com/zloirock/core-js/issues/640
	      }, { unsafe: true });
	    }

	    // make `.constructor === Promise` work for native promise-based APIs
	    try {
	      delete NativePromisePrototype.constructor;
	    } catch (error) { /* empty */ }

	    // make `instanceof Promise` work for native promise-based APIs
	    if (setPrototypeOf) {
	      setPrototypeOf(NativePromisePrototype, PromisePrototype);
	    }
	  }
	}

	// `Promise` constructor
	// https://tc39.es/ecma262/#sec-promise-executor
	$({ global: true, constructor: true, wrap: true, forced: FORCED_PROMISE_CONSTRUCTOR }, {
	  Promise: PromiseConstructor
	});

	setToStringTag(PromiseConstructor, PROMISE, false, true);
	setSpecies(PROMISE);
	return es_promise_constructor;
}

var es_promise_all = {};

var isArrayIteratorMethod;
var hasRequiredIsArrayIteratorMethod;

function requireIsArrayIteratorMethod () {
	if (hasRequiredIsArrayIteratorMethod) return isArrayIteratorMethod;
	hasRequiredIsArrayIteratorMethod = 1;
	var wellKnownSymbol = requireWellKnownSymbol();
	var Iterators = requireIterators();

	var ITERATOR = wellKnownSymbol('iterator');
	var ArrayPrototype = Array.prototype;

	// check on default Array iterator
	isArrayIteratorMethod = function (it) {
	  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
	};
	return isArrayIteratorMethod;
}

var getIteratorMethod;
var hasRequiredGetIteratorMethod;

function requireGetIteratorMethod () {
	if (hasRequiredGetIteratorMethod) return getIteratorMethod;
	hasRequiredGetIteratorMethod = 1;
	var classof = requireClassof();
	var getMethod = requireGetMethod();
	var isNullOrUndefined = requireIsNullOrUndefined();
	var Iterators = requireIterators();
	var wellKnownSymbol = requireWellKnownSymbol();

	var ITERATOR = wellKnownSymbol('iterator');

	getIteratorMethod = function (it) {
	  if (!isNullOrUndefined(it)) return getMethod(it, ITERATOR)
	    || getMethod(it, '@@iterator')
	    || Iterators[classof(it)];
	};
	return getIteratorMethod;
}

var getIterator;
var hasRequiredGetIterator;

function requireGetIterator () {
	if (hasRequiredGetIterator) return getIterator;
	hasRequiredGetIterator = 1;
	var call = requireFunctionCall();
	var aCallable = requireACallable();
	var anObject = requireAnObject();
	var tryToString = requireTryToString();
	var getIteratorMethod = requireGetIteratorMethod();

	var $TypeError = TypeError;

	getIterator = function (argument, usingIterator) {
	  var iteratorMethod = arguments.length < 2 ? getIteratorMethod(argument) : usingIterator;
	  if (aCallable(iteratorMethod)) return anObject(call(iteratorMethod, argument));
	  throw new $TypeError(tryToString(argument) + ' is not iterable');
	};
	return getIterator;
}

var iteratorClose;
var hasRequiredIteratorClose;

function requireIteratorClose () {
	if (hasRequiredIteratorClose) return iteratorClose;
	hasRequiredIteratorClose = 1;
	var call = requireFunctionCall();
	var anObject = requireAnObject();
	var getMethod = requireGetMethod();

	iteratorClose = function (iterator, kind, value) {
	  var innerResult, innerError;
	  anObject(iterator);
	  try {
	    innerResult = getMethod(iterator, 'return');
	    if (!innerResult) {
	      if (kind === 'throw') throw value;
	      return value;
	    }
	    innerResult = call(innerResult, iterator);
	  } catch (error) {
	    innerError = true;
	    innerResult = error;
	  }
	  if (kind === 'throw') throw value;
	  if (innerError) throw innerResult;
	  anObject(innerResult);
	  return value;
	};
	return iteratorClose;
}

var iterate;
var hasRequiredIterate;

function requireIterate () {
	if (hasRequiredIterate) return iterate;
	hasRequiredIterate = 1;
	var bind = requireFunctionBindContext();
	var call = requireFunctionCall();
	var anObject = requireAnObject();
	var tryToString = requireTryToString();
	var isArrayIteratorMethod = requireIsArrayIteratorMethod();
	var lengthOfArrayLike = requireLengthOfArrayLike();
	var isPrototypeOf = requireObjectIsPrototypeOf();
	var getIterator = requireGetIterator();
	var getIteratorMethod = requireGetIteratorMethod();
	var iteratorClose = requireIteratorClose();

	var $TypeError = TypeError;

	var Result = function (stopped, result) {
	  this.stopped = stopped;
	  this.result = result;
	};

	var ResultPrototype = Result.prototype;

	iterate = function (iterable, unboundFunction, options) {
	  var that = options && options.that;
	  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
	  var IS_RECORD = !!(options && options.IS_RECORD);
	  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
	  var INTERRUPTED = !!(options && options.INTERRUPTED);
	  var fn = bind(unboundFunction, that);
	  var iterator, iterFn, index, length, result, next, step;

	  var stop = function (condition) {
	    if (iterator) iteratorClose(iterator, 'normal', condition);
	    return new Result(true, condition);
	  };

	  var callFn = function (value) {
	    if (AS_ENTRIES) {
	      anObject(value);
	      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
	    } return INTERRUPTED ? fn(value, stop) : fn(value);
	  };

	  if (IS_RECORD) {
	    iterator = iterable.iterator;
	  } else if (IS_ITERATOR) {
	    iterator = iterable;
	  } else {
	    iterFn = getIteratorMethod(iterable);
	    if (!iterFn) throw new $TypeError(tryToString(iterable) + ' is not iterable');
	    // optimisation for array iterators
	    if (isArrayIteratorMethod(iterFn)) {
	      for (index = 0, length = lengthOfArrayLike(iterable); length > index; index++) {
	        result = callFn(iterable[index]);
	        if (result && isPrototypeOf(ResultPrototype, result)) return result;
	      } return new Result(false);
	    }
	    iterator = getIterator(iterable, iterFn);
	  }

	  next = IS_RECORD ? iterable.next : iterator.next;
	  while (!(step = call(next, iterator)).done) {
	    try {
	      result = callFn(step.value);
	    } catch (error) {
	      iteratorClose(iterator, 'throw', error);
	    }
	    if (typeof result == 'object' && result && isPrototypeOf(ResultPrototype, result)) return result;
	  } return new Result(false);
	};
	return iterate;
}

var checkCorrectnessOfIteration;
var hasRequiredCheckCorrectnessOfIteration;

function requireCheckCorrectnessOfIteration () {
	if (hasRequiredCheckCorrectnessOfIteration) return checkCorrectnessOfIteration;
	hasRequiredCheckCorrectnessOfIteration = 1;
	var wellKnownSymbol = requireWellKnownSymbol();

	var ITERATOR = wellKnownSymbol('iterator');
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
	  iteratorWithReturn[ITERATOR] = function () {
	    return this;
	  };
	  // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
	  Array.from(iteratorWithReturn, function () { throw 2; });
	} catch (error) { /* empty */ }

	checkCorrectnessOfIteration = function (exec, SKIP_CLOSING) {
	  try {
	    if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
	  } catch (error) { return false; } // workaround of old WebKit + `eval` bug
	  var ITERATION_SUPPORT = false;
	  try {
	    var object = {};
	    object[ITERATOR] = function () {
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
	return checkCorrectnessOfIteration;
}

var promiseStaticsIncorrectIteration;
var hasRequiredPromiseStaticsIncorrectIteration;

function requirePromiseStaticsIncorrectIteration () {
	if (hasRequiredPromiseStaticsIncorrectIteration) return promiseStaticsIncorrectIteration;
	hasRequiredPromiseStaticsIncorrectIteration = 1;
	var NativePromiseConstructor = requirePromiseNativeConstructor();
	var checkCorrectnessOfIteration = requireCheckCorrectnessOfIteration();
	var FORCED_PROMISE_CONSTRUCTOR = requirePromiseConstructorDetection().CONSTRUCTOR;

	promiseStaticsIncorrectIteration = FORCED_PROMISE_CONSTRUCTOR || !checkCorrectnessOfIteration(function (iterable) {
	  NativePromiseConstructor.all(iterable).then(undefined, function () { /* empty */ });
	});
	return promiseStaticsIncorrectIteration;
}

var hasRequiredEs_promise_all;

function requireEs_promise_all () {
	if (hasRequiredEs_promise_all) return es_promise_all;
	hasRequiredEs_promise_all = 1;
	var $ = require_export();
	var call = requireFunctionCall();
	var aCallable = requireACallable();
	var newPromiseCapabilityModule = requireNewPromiseCapability();
	var perform = requirePerform();
	var iterate = requireIterate();
	var PROMISE_STATICS_INCORRECT_ITERATION = requirePromiseStaticsIncorrectIteration();

	// `Promise.all` method
	// https://tc39.es/ecma262/#sec-promise.all
	$({ target: 'Promise', stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION }, {
	  all: function all(iterable) {
	    var C = this;
	    var capability = newPromiseCapabilityModule.f(C);
	    var resolve = capability.resolve;
	    var reject = capability.reject;
	    var result = perform(function () {
	      var $promiseResolve = aCallable(C.resolve);
	      var values = [];
	      var counter = 0;
	      var remaining = 1;
	      iterate(iterable, function (promise) {
	        var index = counter++;
	        var alreadyCalled = false;
	        remaining++;
	        call($promiseResolve, C, promise).then(function (value) {
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
	return es_promise_all;
}

var es_promise_catch = {};

var hasRequiredEs_promise_catch;

function requireEs_promise_catch () {
	if (hasRequiredEs_promise_catch) return es_promise_catch;
	hasRequiredEs_promise_catch = 1;
	var $ = require_export();
	var IS_PURE = requireIsPure();
	var FORCED_PROMISE_CONSTRUCTOR = requirePromiseConstructorDetection().CONSTRUCTOR;
	var NativePromiseConstructor = requirePromiseNativeConstructor();
	var getBuiltIn = requireGetBuiltIn();
	var isCallable = requireIsCallable();
	var defineBuiltIn = requireDefineBuiltIn();

	var NativePromisePrototype = NativePromiseConstructor && NativePromiseConstructor.prototype;

	// `Promise.prototype.catch` method
	// https://tc39.es/ecma262/#sec-promise.prototype.catch
	$({ target: 'Promise', proto: true, forced: FORCED_PROMISE_CONSTRUCTOR, real: true }, {
	  'catch': function (onRejected) {
	    return this.then(undefined, onRejected);
	  }
	});

	// makes sure that native promise-based APIs `Promise#catch` properly works with patched `Promise#then`
	if (!IS_PURE && isCallable(NativePromiseConstructor)) {
	  var method = getBuiltIn('Promise').prototype['catch'];
	  if (NativePromisePrototype['catch'] !== method) {
	    defineBuiltIn(NativePromisePrototype, 'catch', method, { unsafe: true });
	  }
	}
	return es_promise_catch;
}

var es_promise_race = {};

var hasRequiredEs_promise_race;

function requireEs_promise_race () {
	if (hasRequiredEs_promise_race) return es_promise_race;
	hasRequiredEs_promise_race = 1;
	var $ = require_export();
	var call = requireFunctionCall();
	var aCallable = requireACallable();
	var newPromiseCapabilityModule = requireNewPromiseCapability();
	var perform = requirePerform();
	var iterate = requireIterate();
	var PROMISE_STATICS_INCORRECT_ITERATION = requirePromiseStaticsIncorrectIteration();

	// `Promise.race` method
	// https://tc39.es/ecma262/#sec-promise.race
	$({ target: 'Promise', stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION }, {
	  race: function race(iterable) {
	    var C = this;
	    var capability = newPromiseCapabilityModule.f(C);
	    var reject = capability.reject;
	    var result = perform(function () {
	      var $promiseResolve = aCallable(C.resolve);
	      iterate(iterable, function (promise) {
	        call($promiseResolve, C, promise).then(capability.resolve, reject);
	      });
	    });
	    if (result.error) reject(result.value);
	    return capability.promise;
	  }
	});
	return es_promise_race;
}

var es_promise_reject = {};

var hasRequiredEs_promise_reject;

function requireEs_promise_reject () {
	if (hasRequiredEs_promise_reject) return es_promise_reject;
	hasRequiredEs_promise_reject = 1;
	var $ = require_export();
	var newPromiseCapabilityModule = requireNewPromiseCapability();
	var FORCED_PROMISE_CONSTRUCTOR = requirePromiseConstructorDetection().CONSTRUCTOR;

	// `Promise.reject` method
	// https://tc39.es/ecma262/#sec-promise.reject
	$({ target: 'Promise', stat: true, forced: FORCED_PROMISE_CONSTRUCTOR }, {
	  reject: function reject(r) {
	    var capability = newPromiseCapabilityModule.f(this);
	    var capabilityReject = capability.reject;
	    capabilityReject(r);
	    return capability.promise;
	  }
	});
	return es_promise_reject;
}

var es_promise_resolve = {};

var promiseResolve;
var hasRequiredPromiseResolve;

function requirePromiseResolve () {
	if (hasRequiredPromiseResolve) return promiseResolve;
	hasRequiredPromiseResolve = 1;
	var anObject = requireAnObject();
	var isObject = requireIsObject();
	var newPromiseCapability = requireNewPromiseCapability();

	promiseResolve = function (C, x) {
	  anObject(C);
	  if (isObject(x) && x.constructor === C) return x;
	  var promiseCapability = newPromiseCapability.f(C);
	  var resolve = promiseCapability.resolve;
	  resolve(x);
	  return promiseCapability.promise;
	};
	return promiseResolve;
}

var hasRequiredEs_promise_resolve;

function requireEs_promise_resolve () {
	if (hasRequiredEs_promise_resolve) return es_promise_resolve;
	hasRequiredEs_promise_resolve = 1;
	var $ = require_export();
	var getBuiltIn = requireGetBuiltIn();
	var IS_PURE = requireIsPure();
	var NativePromiseConstructor = requirePromiseNativeConstructor();
	var FORCED_PROMISE_CONSTRUCTOR = requirePromiseConstructorDetection().CONSTRUCTOR;
	var promiseResolve = requirePromiseResolve();

	var PromiseConstructorWrapper = getBuiltIn('Promise');
	var CHECK_WRAPPER = IS_PURE && !FORCED_PROMISE_CONSTRUCTOR;

	// `Promise.resolve` method
	// https://tc39.es/ecma262/#sec-promise.resolve
	$({ target: 'Promise', stat: true, forced: IS_PURE || FORCED_PROMISE_CONSTRUCTOR }, {
	  resolve: function resolve(x) {
	    return promiseResolve(CHECK_WRAPPER && this === PromiseConstructorWrapper ? NativePromiseConstructor : this, x);
	  }
	});
	return es_promise_resolve;
}

var hasRequiredEs_promise;

function requireEs_promise () {
	if (hasRequiredEs_promise) return es_promise;
	hasRequiredEs_promise = 1;
	// TODO: Remove this module from `core-js@4` since it's split to modules listed below
	requireEs_promise_constructor();
	requireEs_promise_all();
	requireEs_promise_catch();
	requireEs_promise_race();
	requireEs_promise_reject();
	requireEs_promise_resolve();
	return es_promise;
}

requireEs_promise();

var es_promise_allSettled = {};

var hasRequiredEs_promise_allSettled;

function requireEs_promise_allSettled () {
	if (hasRequiredEs_promise_allSettled) return es_promise_allSettled;
	hasRequiredEs_promise_allSettled = 1;
	var $ = require_export();
	var call = requireFunctionCall();
	var aCallable = requireACallable();
	var newPromiseCapabilityModule = requireNewPromiseCapability();
	var perform = requirePerform();
	var iterate = requireIterate();
	var PROMISE_STATICS_INCORRECT_ITERATION = requirePromiseStaticsIncorrectIteration();

	// `Promise.allSettled` method
	// https://tc39.es/ecma262/#sec-promise.allsettled
	$({ target: 'Promise', stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION }, {
	  allSettled: function allSettled(iterable) {
	    var C = this;
	    var capability = newPromiseCapabilityModule.f(C);
	    var resolve = capability.resolve;
	    var reject = capability.reject;
	    var result = perform(function () {
	      var promiseResolve = aCallable(C.resolve);
	      var values = [];
	      var counter = 0;
	      var remaining = 1;
	      iterate(iterable, function (promise) {
	        var index = counter++;
	        var alreadyCalled = false;
	        remaining++;
	        call(promiseResolve, C, promise).then(function (value) {
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
	return es_promise_allSettled;
}

requireEs_promise_allSettled();

var es_promise_finally = {};

var hasRequiredEs_promise_finally;

function requireEs_promise_finally () {
	if (hasRequiredEs_promise_finally) return es_promise_finally;
	hasRequiredEs_promise_finally = 1;
	var $ = require_export();
	var IS_PURE = requireIsPure();
	var NativePromiseConstructor = requirePromiseNativeConstructor();
	var fails = requireFails();
	var getBuiltIn = requireGetBuiltIn();
	var isCallable = requireIsCallable();
	var speciesConstructor = requireSpeciesConstructor();
	var promiseResolve = requirePromiseResolve();
	var defineBuiltIn = requireDefineBuiltIn();

	var NativePromisePrototype = NativePromiseConstructor && NativePromiseConstructor.prototype;

	// Safari bug https://bugs.webkit.org/show_bug.cgi?id=200829
	var NON_GENERIC = !!NativePromiseConstructor && fails(function () {
	  // eslint-disable-next-line unicorn/no-thenable -- required for testing
	  NativePromisePrototype['finally'].call({ then: function () { /* empty */ } }, function () { /* empty */ });
	});

	// `Promise.prototype.finally` method
	// https://tc39.es/ecma262/#sec-promise.prototype.finally
	$({ target: 'Promise', proto: true, real: true, forced: NON_GENERIC }, {
	  'finally': function (onFinally) {
	    var C = speciesConstructor(this, getBuiltIn('Promise'));
	    var isFunction = isCallable(onFinally);
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
	if (!IS_PURE && isCallable(NativePromiseConstructor)) {
	  var method = getBuiltIn('Promise').prototype['finally'];
	  if (NativePromisePrototype['finally'] !== method) {
	    defineBuiltIn(NativePromisePrototype, 'finally', method, { unsafe: true });
	  }
	}
	return es_promise_finally;
}

requireEs_promise_finally();

var es_regexp_constructor = {};

var isRegexp;
var hasRequiredIsRegexp;

function requireIsRegexp () {
	if (hasRequiredIsRegexp) return isRegexp;
	hasRequiredIsRegexp = 1;
	var isObject = requireIsObject();
	var classof = requireClassofRaw();
	var wellKnownSymbol = requireWellKnownSymbol();

	var MATCH = wellKnownSymbol('match');

	// `IsRegExp` abstract operation
	// https://tc39.es/ecma262/#sec-isregexp
	isRegexp = function (it) {
	  var isRegExp;
	  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof(it) === 'RegExp');
	};
	return isRegexp;
}

var regexpFlags;
var hasRequiredRegexpFlags;

function requireRegexpFlags () {
	if (hasRequiredRegexpFlags) return regexpFlags;
	hasRequiredRegexpFlags = 1;
	var anObject = requireAnObject();

	// `RegExp.prototype.flags` getter implementation
	// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
	regexpFlags = function () {
	  var that = anObject(this);
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
	return regexpFlags;
}

var regexpGetFlags;
var hasRequiredRegexpGetFlags;

function requireRegexpGetFlags () {
	if (hasRequiredRegexpGetFlags) return regexpGetFlags;
	hasRequiredRegexpGetFlags = 1;
	var call = requireFunctionCall();
	var hasOwn = requireHasOwnProperty();
	var isPrototypeOf = requireObjectIsPrototypeOf();
	var regExpFlags = requireRegexpFlags();

	var RegExpPrototype = RegExp.prototype;

	regexpGetFlags = function (R) {
	  var flags = R.flags;
	  return flags === undefined && !('flags' in RegExpPrototype) && !hasOwn(R, 'flags') && isPrototypeOf(RegExpPrototype, R)
	    ? call(regExpFlags, R) : flags;
	};
	return regexpGetFlags;
}

var regexpStickyHelpers;
var hasRequiredRegexpStickyHelpers;

function requireRegexpStickyHelpers () {
	if (hasRequiredRegexpStickyHelpers) return regexpStickyHelpers;
	hasRequiredRegexpStickyHelpers = 1;
	var fails = requireFails();
	var globalThis = requireGlobalThis();

	// babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
	var $RegExp = globalThis.RegExp;

	var UNSUPPORTED_Y = fails(function () {
	  var re = $RegExp('a', 'y');
	  re.lastIndex = 2;
	  return re.exec('abcd') !== null;
	});

	// UC Browser bug
	// https://github.com/zloirock/core-js/issues/1008
	var MISSED_STICKY = UNSUPPORTED_Y || fails(function () {
	  return !$RegExp('a', 'y').sticky;
	});

	var BROKEN_CARET = UNSUPPORTED_Y || fails(function () {
	  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
	  var re = $RegExp('^r', 'gy');
	  re.lastIndex = 2;
	  return re.exec('str') !== null;
	});

	regexpStickyHelpers = {
	  BROKEN_CARET: BROKEN_CARET,
	  MISSED_STICKY: MISSED_STICKY,
	  UNSUPPORTED_Y: UNSUPPORTED_Y
	};
	return regexpStickyHelpers;
}

var regexpUnsupportedDotAll;
var hasRequiredRegexpUnsupportedDotAll;

function requireRegexpUnsupportedDotAll () {
	if (hasRequiredRegexpUnsupportedDotAll) return regexpUnsupportedDotAll;
	hasRequiredRegexpUnsupportedDotAll = 1;
	var fails = requireFails();
	var globalThis = requireGlobalThis();

	// babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
	var $RegExp = globalThis.RegExp;

	regexpUnsupportedDotAll = fails(function () {
	  var re = $RegExp('.', 's');
	  return !(re.dotAll && re.test('\n') && re.flags === 's');
	});
	return regexpUnsupportedDotAll;
}

var regexpUnsupportedNcg;
var hasRequiredRegexpUnsupportedNcg;

function requireRegexpUnsupportedNcg () {
	if (hasRequiredRegexpUnsupportedNcg) return regexpUnsupportedNcg;
	hasRequiredRegexpUnsupportedNcg = 1;
	var fails = requireFails();
	var globalThis = requireGlobalThis();

	// babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError
	var $RegExp = globalThis.RegExp;

	regexpUnsupportedNcg = fails(function () {
	  var re = $RegExp('(?<a>b)', 'g');
	  return re.exec('b').groups.a !== 'b' ||
	    'b'.replace(re, '$<a>c') !== 'bc';
	});
	return regexpUnsupportedNcg;
}

var hasRequiredEs_regexp_constructor;

function requireEs_regexp_constructor () {
	if (hasRequiredEs_regexp_constructor) return es_regexp_constructor;
	hasRequiredEs_regexp_constructor = 1;
	var DESCRIPTORS = requireDescriptors();
	var globalThis = requireGlobalThis();
	var uncurryThis = requireFunctionUncurryThis();
	var isForced = requireIsForced();
	var inheritIfRequired = requireInheritIfRequired();
	var createNonEnumerableProperty = requireCreateNonEnumerableProperty();
	var create = requireObjectCreate();
	var getOwnPropertyNames = requireObjectGetOwnPropertyNames().f;
	var isPrototypeOf = requireObjectIsPrototypeOf();
	var isRegExp = requireIsRegexp();
	var toString = requireToString();
	var getRegExpFlags = requireRegexpGetFlags();
	var stickyHelpers = requireRegexpStickyHelpers();
	var proxyAccessor = requireProxyAccessor();
	var defineBuiltIn = requireDefineBuiltIn();
	var fails = requireFails();
	var hasOwn = requireHasOwnProperty();
	var enforceInternalState = requireInternalState().enforce;
	var setSpecies = requireSetSpecies();
	var wellKnownSymbol = requireWellKnownSymbol();
	var UNSUPPORTED_DOT_ALL = requireRegexpUnsupportedDotAll();
	var UNSUPPORTED_NCG = requireRegexpUnsupportedNcg();

	var MATCH = wellKnownSymbol('match');
	var NativeRegExp = globalThis.RegExp;
	var RegExpPrototype = NativeRegExp.prototype;
	var SyntaxError = globalThis.SyntaxError;
	var exec = uncurryThis(RegExpPrototype.exec);
	var charAt = uncurryThis(''.charAt);
	var replace = uncurryThis(''.replace);
	var stringIndexOf = uncurryThis(''.indexOf);
	var stringSlice = uncurryThis(''.slice);
	// TODO: Use only proper RegExpIdentifierName
	var IS_NCG = /^\?<[^\s\d!#%&*+<=>@^][^\s!#%&*+<=>@^]*>/;
	var re1 = /a/g;
	var re2 = /a/g;

	// "new" should create a new object, old webkit bug
	var CORRECT_NEW = new NativeRegExp(re1) !== re1;

	var MISSED_STICKY = stickyHelpers.MISSED_STICKY;
	var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;

	var BASE_FORCED = DESCRIPTORS &&
	  (!CORRECT_NEW || MISSED_STICKY || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG || fails(function () {
	    re2[MATCH] = false;
	    // RegExp constructor can alter flags and IsRegExp works correct with @@match
	    // eslint-disable-next-line sonarjs/inconsistent-function-call -- required for testing
	    return NativeRegExp(re1) !== re1 || NativeRegExp(re2) === re2 || String(NativeRegExp(re1, 'i')) !== '/a/i';
	  }));

	var handleDotAll = function (string) {
	  var length = string.length;
	  var index = 0;
	  var result = '';
	  var brackets = false;
	  var chr;
	  for (; index <= length; index++) {
	    chr = charAt(string, index);
	    if (chr === '\\') {
	      result += chr + charAt(string, ++index);
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
	  var names = create(null);
	  var brackets = false;
	  var ncg = false;
	  var groupid = 0;
	  var groupname = '';
	  var chr;
	  for (; index <= length; index++) {
	    chr = charAt(string, index);
	    if (chr === '\\') {
	      chr += charAt(string, ++index);
	    } else if (chr === ']') {
	      brackets = false;
	    } else if (!brackets) switch (true) {
	      case chr === '[':
	        brackets = true;
	        break;
	      case chr === '(':
	        result += chr;
	        // ignore non-capturing groups
	        if (stringSlice(string, index + 1, index + 3) === '?:') {
	          continue;
	        }
	        if (exec(IS_NCG, stringSlice(string, index + 1))) {
	          index += 2;
	          ncg = true;
	        }
	        groupid++;
	        continue;
	      case chr === '>' && ncg:
	        if (groupname === '' || hasOwn(names, groupname)) {
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
	    var thisIsRegExp = isPrototypeOf(RegExpPrototype, this);
	    var patternIsRegExp = isRegExp(pattern);
	    var flagsAreUndefined = flags === undefined;
	    var groups = [];
	    var rawPattern = pattern;
	    var rawFlags, dotAll, sticky, handled, result, state;

	    if (!thisIsRegExp && patternIsRegExp && flagsAreUndefined && pattern.constructor === RegExpWrapper) {
	      return pattern;
	    }

	    if (patternIsRegExp || isPrototypeOf(RegExpPrototype, pattern)) {
	      pattern = pattern.source;
	      if (flagsAreUndefined) flags = getRegExpFlags(rawPattern);
	    }

	    pattern = pattern === undefined ? '' : toString(pattern);
	    flags = flags === undefined ? '' : toString(flags);
	    rawPattern = pattern;

	    if (UNSUPPORTED_DOT_ALL && 'dotAll' in re1) {
	      dotAll = !!flags && stringIndexOf(flags, 's') > -1;
	      if (dotAll) flags = replace(flags, /s/g, '');
	    }

	    rawFlags = flags;

	    if (MISSED_STICKY && 'sticky' in re1) {
	      sticky = !!flags && stringIndexOf(flags, 'y') > -1;
	      if (sticky && UNSUPPORTED_Y) flags = replace(flags, /y/g, '');
	    }

	    if (UNSUPPORTED_NCG) {
	      handled = handleNCG(pattern);
	      pattern = handled[0];
	      groups = handled[1];
	    }

	    result = inheritIfRequired(NativeRegExp(pattern, flags), thisIsRegExp ? this : RegExpPrototype, RegExpWrapper);

	    if (dotAll || sticky || groups.length) {
	      state = enforceInternalState(result);
	      if (dotAll) {
	        state.dotAll = true;
	        state.raw = RegExpWrapper(handleDotAll(pattern), rawFlags);
	      }
	      if (sticky) state.sticky = true;
	      if (groups.length) state.groups = groups;
	    }

	    if (pattern !== rawPattern) try {
	      // fails in old engines, but we have no alternatives for unsupported regex syntax
	      createNonEnumerableProperty(result, 'source', rawPattern === '' ? '(?:)' : rawPattern);
	    } catch (error) { /* empty */ }

	    return result;
	  };

	  for (var keys = getOwnPropertyNames(NativeRegExp), index = 0; keys.length > index;) {
	    proxyAccessor(RegExpWrapper, NativeRegExp, keys[index++]);
	  }

	  RegExpPrototype.constructor = RegExpWrapper;
	  RegExpWrapper.prototype = RegExpPrototype;
	  defineBuiltIn(globalThis, 'RegExp', RegExpWrapper, { constructor: true });
	}

	// https://tc39.es/ecma262/#sec-get-regexp-@@species
	setSpecies('RegExp');
	return es_regexp_constructor;
}

requireEs_regexp_constructor();

var es_regexp_dotAll = {};

var hasRequiredEs_regexp_dotAll;

function requireEs_regexp_dotAll () {
	if (hasRequiredEs_regexp_dotAll) return es_regexp_dotAll;
	hasRequiredEs_regexp_dotAll = 1;
	var DESCRIPTORS = requireDescriptors();
	var UNSUPPORTED_DOT_ALL = requireRegexpUnsupportedDotAll();
	var classof = requireClassofRaw();
	var defineBuiltInAccessor = requireDefineBuiltInAccessor();
	var getInternalState = requireInternalState().get;

	var RegExpPrototype = RegExp.prototype;
	var $TypeError = TypeError;

	// `RegExp.prototype.dotAll` getter
	// https://tc39.es/ecma262/#sec-get-regexp.prototype.dotall
	if (DESCRIPTORS && UNSUPPORTED_DOT_ALL) {
	  defineBuiltInAccessor(RegExpPrototype, 'dotAll', {
	    configurable: true,
	    get: function dotAll() {
	      if (this === RegExpPrototype) return;
	      // We can't use InternalStateModule.getterFor because
	      // we don't add metadata for regexps created by a literal.
	      if (classof(this) === 'RegExp') {
	        return !!getInternalState(this).dotAll;
	      }
	      throw new $TypeError('Incompatible receiver, RegExp required');
	    }
	  });
	}
	return es_regexp_dotAll;
}

requireEs_regexp_dotAll();

var es_regexp_exec = {};

var regexpExec;
var hasRequiredRegexpExec;

function requireRegexpExec () {
	if (hasRequiredRegexpExec) return regexpExec;
	hasRequiredRegexpExec = 1;
	/* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
	/* eslint-disable regexp/no-useless-quantifier -- testing */
	var call = requireFunctionCall();
	var uncurryThis = requireFunctionUncurryThis();
	var toString = requireToString();
	var regexpFlags = requireRegexpFlags();
	var stickyHelpers = requireRegexpStickyHelpers();
	var shared = requireShared();
	var create = requireObjectCreate();
	var getInternalState = requireInternalState().get;
	var UNSUPPORTED_DOT_ALL = requireRegexpUnsupportedDotAll();
	var UNSUPPORTED_NCG = requireRegexpUnsupportedNcg();

	var nativeReplace = shared('native-string-replace', String.prototype.replace);
	var nativeExec = RegExp.prototype.exec;
	var patchedExec = nativeExec;
	var charAt = uncurryThis(''.charAt);
	var indexOf = uncurryThis(''.indexOf);
	var replace = uncurryThis(''.replace);
	var stringSlice = uncurryThis(''.slice);

	var UPDATES_LAST_INDEX_WRONG = (function () {
	  var re1 = /a/;
	  var re2 = /b*/g;
	  call(nativeExec, re1, 'a');
	  call(nativeExec, re2, 'a');
	  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
	})();

	var UNSUPPORTED_Y = stickyHelpers.BROKEN_CARET;

	// nonparticipating capturing group, copied from es5-shim's String#split patch.
	var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

	var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;

	if (PATCH) {
	  patchedExec = function exec(string) {
	    var re = this;
	    var state = getInternalState(re);
	    var str = toString(string);
	    var raw = state.raw;
	    var result, reCopy, lastIndex, match, i, object, group;

	    if (raw) {
	      raw.lastIndex = re.lastIndex;
	      result = call(patchedExec, raw, str);
	      re.lastIndex = raw.lastIndex;
	      return result;
	    }

	    var groups = state.groups;
	    var sticky = UNSUPPORTED_Y && re.sticky;
	    var flags = call(regexpFlags, re);
	    var source = re.source;
	    var charsAdded = 0;
	    var strCopy = str;

	    if (sticky) {
	      flags = replace(flags, 'y', '');
	      if (indexOf(flags, 'g') === -1) {
	        flags += 'g';
	      }

	      strCopy = stringSlice(str, re.lastIndex);
	      // Support anchored sticky behavior.
	      if (re.lastIndex > 0 && (!re.multiline || re.multiline && charAt(str, re.lastIndex - 1) !== '\n')) {
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

	    match = call(nativeExec, sticky ? reCopy : re, strCopy);

	    if (sticky) {
	      if (match) {
	        match.input = stringSlice(match.input, charsAdded);
	        match[0] = stringSlice(match[0], charsAdded);
	        match.index = re.lastIndex;
	        re.lastIndex += match[0].length;
	      } else re.lastIndex = 0;
	    } else if (UPDATES_LAST_INDEX_WRONG && match) {
	      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
	    }
	    if (NPCG_INCLUDED && match && match.length > 1) {
	      // Fix browsers whose `exec` methods don't consistently return `undefined`
	      // for NPCG, like IE8. NOTE: This doesn't work for /(.?)?/
	      call(nativeReplace, match[0], reCopy, function () {
	        for (i = 1; i < arguments.length - 2; i++) {
	          if (arguments[i] === undefined) match[i] = undefined;
	        }
	      });
	    }

	    if (match && groups) {
	      match.groups = object = create(null);
	      for (i = 0; i < groups.length; i++) {
	        group = groups[i];
	        object[group[0]] = match[group[1]];
	      }
	    }

	    return match;
	  };
	}

	regexpExec = patchedExec;
	return regexpExec;
}

var hasRequiredEs_regexp_exec;

function requireEs_regexp_exec () {
	if (hasRequiredEs_regexp_exec) return es_regexp_exec;
	hasRequiredEs_regexp_exec = 1;
	var $ = require_export();
	var exec = requireRegexpExec();

	// `RegExp.prototype.exec` method
	// https://tc39.es/ecma262/#sec-regexp.prototype.exec
	$({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
	  exec: exec
	});
	return es_regexp_exec;
}

requireEs_regexp_exec();

var es_set_difference_v2 = {};

var setHelpers;
var hasRequiredSetHelpers;

function requireSetHelpers () {
	if (hasRequiredSetHelpers) return setHelpers;
	hasRequiredSetHelpers = 1;
	var uncurryThis = requireFunctionUncurryThis();

	// eslint-disable-next-line es/no-set -- safe
	var SetPrototype = Set.prototype;

	setHelpers = {
	  // eslint-disable-next-line es/no-set -- safe
	  Set: Set,
	  add: uncurryThis(SetPrototype.add),
	  has: uncurryThis(SetPrototype.has),
	  remove: uncurryThis(SetPrototype['delete']),
	  proto: SetPrototype
	};
	return setHelpers;
}

var aSet;
var hasRequiredASet;

function requireASet () {
	if (hasRequiredASet) return aSet;
	hasRequiredASet = 1;
	var has = requireSetHelpers().has;

	// Perform ? RequireInternalSlot(M, [[SetData]])
	aSet = function (it) {
	  has(it);
	  return it;
	};
	return aSet;
}

var iterateSimple;
var hasRequiredIterateSimple;

function requireIterateSimple () {
	if (hasRequiredIterateSimple) return iterateSimple;
	hasRequiredIterateSimple = 1;
	var call = requireFunctionCall();

	iterateSimple = function (record, fn, ITERATOR_INSTEAD_OF_RECORD) {
	  var iterator = ITERATOR_INSTEAD_OF_RECORD ? record : record.iterator;
	  var next = record.next;
	  var step, result;
	  while (!(step = call(next, iterator)).done) {
	    result = fn(step.value);
	    if (result !== undefined) return result;
	  }
	};
	return iterateSimple;
}

var setIterate;
var hasRequiredSetIterate;

function requireSetIterate () {
	if (hasRequiredSetIterate) return setIterate;
	hasRequiredSetIterate = 1;
	var uncurryThis = requireFunctionUncurryThis();
	var iterateSimple = requireIterateSimple();
	var SetHelpers = requireSetHelpers();

	var Set = SetHelpers.Set;
	var SetPrototype = SetHelpers.proto;
	var forEach = uncurryThis(SetPrototype.forEach);
	var keys = uncurryThis(SetPrototype.keys);
	var next = keys(new Set()).next;

	setIterate = function (set, fn, interruptible) {
	  return interruptible ? iterateSimple({ iterator: keys(set), next: next }, fn) : forEach(set, fn);
	};
	return setIterate;
}

var setClone;
var hasRequiredSetClone;

function requireSetClone () {
	if (hasRequiredSetClone) return setClone;
	hasRequiredSetClone = 1;
	var SetHelpers = requireSetHelpers();
	var iterate = requireSetIterate();

	var Set = SetHelpers.Set;
	var add = SetHelpers.add;

	setClone = function (set) {
	  var result = new Set();
	  iterate(set, function (it) {
	    add(result, it);
	  });
	  return result;
	};
	return setClone;
}

var setSize;
var hasRequiredSetSize;

function requireSetSize () {
	if (hasRequiredSetSize) return setSize;
	hasRequiredSetSize = 1;
	var uncurryThisAccessor = requireFunctionUncurryThisAccessor();
	var SetHelpers = requireSetHelpers();

	setSize = uncurryThisAccessor(SetHelpers.proto, 'size', 'get') || function (set) {
	  return set.size;
	};
	return setSize;
}

var getIteratorDirect;
var hasRequiredGetIteratorDirect;

function requireGetIteratorDirect () {
	if (hasRequiredGetIteratorDirect) return getIteratorDirect;
	hasRequiredGetIteratorDirect = 1;
	// `GetIteratorDirect(obj)` abstract operation
	// https://tc39.es/proposal-iterator-helpers/#sec-getiteratordirect
	getIteratorDirect = function (obj) {
	  return {
	    iterator: obj,
	    next: obj.next,
	    done: false
	  };
	};
	return getIteratorDirect;
}

var getSetRecord;
var hasRequiredGetSetRecord;

function requireGetSetRecord () {
	if (hasRequiredGetSetRecord) return getSetRecord;
	hasRequiredGetSetRecord = 1;
	var aCallable = requireACallable();
	var anObject = requireAnObject();
	var call = requireFunctionCall();
	var toIntegerOrInfinity = requireToIntegerOrInfinity();
	var getIteratorDirect = requireGetIteratorDirect();

	var INVALID_SIZE = 'Invalid size';
	var $RangeError = RangeError;
	var $TypeError = TypeError;
	var max = Math.max;

	var SetRecord = function (set, intSize) {
	  this.set = set;
	  this.size = max(intSize, 0);
	  this.has = aCallable(set.has);
	  this.keys = aCallable(set.keys);
	};

	SetRecord.prototype = {
	  getIterator: function () {
	    return getIteratorDirect(anObject(call(this.keys, this.set)));
	  },
	  includes: function (it) {
	    return call(this.has, this.set, it);
	  }
	};

	// `GetSetRecord` abstract operation
	// https://tc39.es/proposal-set-methods/#sec-getsetrecord
	getSetRecord = function (obj) {
	  anObject(obj);
	  var numSize = +obj.size;
	  // NOTE: If size is undefined, then numSize will be NaN
	  // eslint-disable-next-line no-self-compare -- NaN check
	  if (numSize !== numSize) throw new $TypeError(INVALID_SIZE);
	  var intSize = toIntegerOrInfinity(numSize);
	  if (intSize < 0) throw new $RangeError(INVALID_SIZE);
	  return new SetRecord(obj, intSize);
	};
	return getSetRecord;
}

var setDifference;
var hasRequiredSetDifference;

function requireSetDifference () {
	if (hasRequiredSetDifference) return setDifference;
	hasRequiredSetDifference = 1;
	var aSet = requireASet();
	var SetHelpers = requireSetHelpers();
	var clone = requireSetClone();
	var size = requireSetSize();
	var getSetRecord = requireGetSetRecord();
	var iterateSet = requireSetIterate();
	var iterateSimple = requireIterateSimple();

	var has = SetHelpers.has;
	var remove = SetHelpers.remove;

	// `Set.prototype.difference` method
	// https://github.com/tc39/proposal-set-methods
	setDifference = function difference(other) {
	  var O = aSet(this);
	  var otherRec = getSetRecord(other);
	  var result = clone(O);
	  if (size(O) <= otherRec.size) iterateSet(O, function (e) {
	    if (otherRec.includes(e)) remove(result, e);
	  });
	  else iterateSimple(otherRec.getIterator(), function (e) {
	    if (has(O, e)) remove(result, e);
	  });
	  return result;
	};
	return setDifference;
}

var setMethodAcceptSetLike;
var hasRequiredSetMethodAcceptSetLike;

function requireSetMethodAcceptSetLike () {
	if (hasRequiredSetMethodAcceptSetLike) return setMethodAcceptSetLike;
	hasRequiredSetMethodAcceptSetLike = 1;
	var getBuiltIn = requireGetBuiltIn();

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

	setMethodAcceptSetLike = function (name) {
	  var Set = getBuiltIn('Set');
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
	return setMethodAcceptSetLike;
}

var hasRequiredEs_set_difference_v2;

function requireEs_set_difference_v2 () {
	if (hasRequiredEs_set_difference_v2) return es_set_difference_v2;
	hasRequiredEs_set_difference_v2 = 1;
	var $ = require_export();
	var difference = requireSetDifference();
	var setMethodAcceptSetLike = requireSetMethodAcceptSetLike();

	// `Set.prototype.difference` method
	// https://tc39.es/ecma262/#sec-set.prototype.difference
	$({ target: 'Set', proto: true, real: true, forced: !setMethodAcceptSetLike('difference') }, {
	  difference: difference
	});
	return es_set_difference_v2;
}

requireEs_set_difference_v2();

var es_set_intersection_v2 = {};

var setIntersection;
var hasRequiredSetIntersection;

function requireSetIntersection () {
	if (hasRequiredSetIntersection) return setIntersection;
	hasRequiredSetIntersection = 1;
	var aSet = requireASet();
	var SetHelpers = requireSetHelpers();
	var size = requireSetSize();
	var getSetRecord = requireGetSetRecord();
	var iterateSet = requireSetIterate();
	var iterateSimple = requireIterateSimple();

	var Set = SetHelpers.Set;
	var add = SetHelpers.add;
	var has = SetHelpers.has;

	// `Set.prototype.intersection` method
	// https://github.com/tc39/proposal-set-methods
	setIntersection = function intersection(other) {
	  var O = aSet(this);
	  var otherRec = getSetRecord(other);
	  var result = new Set();

	  if (size(O) > otherRec.size) {
	    iterateSimple(otherRec.getIterator(), function (e) {
	      if (has(O, e)) add(result, e);
	    });
	  } else {
	    iterateSet(O, function (e) {
	      if (otherRec.includes(e)) add(result, e);
	    });
	  }

	  return result;
	};
	return setIntersection;
}

var hasRequiredEs_set_intersection_v2;

function requireEs_set_intersection_v2 () {
	if (hasRequiredEs_set_intersection_v2) return es_set_intersection_v2;
	hasRequiredEs_set_intersection_v2 = 1;
	var $ = require_export();
	var fails = requireFails();
	var intersection = requireSetIntersection();
	var setMethodAcceptSetLike = requireSetMethodAcceptSetLike();

	var INCORRECT = !setMethodAcceptSetLike('intersection') || fails(function () {
	  // eslint-disable-next-line es/no-array-from, es/no-set -- testing
	  return String(Array.from(new Set([1, 2, 3]).intersection(new Set([3, 2])))) !== '3,2';
	});

	// `Set.prototype.intersection` method
	// https://tc39.es/ecma262/#sec-set.prototype.intersection
	$({ target: 'Set', proto: true, real: true, forced: INCORRECT }, {
	  intersection: intersection
	});
	return es_set_intersection_v2;
}

requireEs_set_intersection_v2();

var es_set_isDisjointFrom_v2 = {};

var setIsDisjointFrom;
var hasRequiredSetIsDisjointFrom;

function requireSetIsDisjointFrom () {
	if (hasRequiredSetIsDisjointFrom) return setIsDisjointFrom;
	hasRequiredSetIsDisjointFrom = 1;
	var aSet = requireASet();
	var has = requireSetHelpers().has;
	var size = requireSetSize();
	var getSetRecord = requireGetSetRecord();
	var iterateSet = requireSetIterate();
	var iterateSimple = requireIterateSimple();
	var iteratorClose = requireIteratorClose();

	// `Set.prototype.isDisjointFrom` method
	// https://tc39.github.io/proposal-set-methods/#Set.prototype.isDisjointFrom
	setIsDisjointFrom = function isDisjointFrom(other) {
	  var O = aSet(this);
	  var otherRec = getSetRecord(other);
	  if (size(O) <= otherRec.size) return iterateSet(O, function (e) {
	    if (otherRec.includes(e)) return false;
	  }, true) !== false;
	  var iterator = otherRec.getIterator();
	  return iterateSimple(iterator, function (e) {
	    if (has(O, e)) return iteratorClose(iterator, 'normal', false);
	  }) !== false;
	};
	return setIsDisjointFrom;
}

var hasRequiredEs_set_isDisjointFrom_v2;

function requireEs_set_isDisjointFrom_v2 () {
	if (hasRequiredEs_set_isDisjointFrom_v2) return es_set_isDisjointFrom_v2;
	hasRequiredEs_set_isDisjointFrom_v2 = 1;
	var $ = require_export();
	var isDisjointFrom = requireSetIsDisjointFrom();
	var setMethodAcceptSetLike = requireSetMethodAcceptSetLike();

	// `Set.prototype.isDisjointFrom` method
	// https://tc39.es/ecma262/#sec-set.prototype.isdisjointfrom
	$({ target: 'Set', proto: true, real: true, forced: !setMethodAcceptSetLike('isDisjointFrom') }, {
	  isDisjointFrom: isDisjointFrom
	});
	return es_set_isDisjointFrom_v2;
}

requireEs_set_isDisjointFrom_v2();

var es_set_isSubsetOf_v2 = {};

var setIsSubsetOf;
var hasRequiredSetIsSubsetOf;

function requireSetIsSubsetOf () {
	if (hasRequiredSetIsSubsetOf) return setIsSubsetOf;
	hasRequiredSetIsSubsetOf = 1;
	var aSet = requireASet();
	var size = requireSetSize();
	var iterate = requireSetIterate();
	var getSetRecord = requireGetSetRecord();

	// `Set.prototype.isSubsetOf` method
	// https://tc39.github.io/proposal-set-methods/#Set.prototype.isSubsetOf
	setIsSubsetOf = function isSubsetOf(other) {
	  var O = aSet(this);
	  var otherRec = getSetRecord(other);
	  if (size(O) > otherRec.size) return false;
	  return iterate(O, function (e) {
	    if (!otherRec.includes(e)) return false;
	  }, true) !== false;
	};
	return setIsSubsetOf;
}

var hasRequiredEs_set_isSubsetOf_v2;

function requireEs_set_isSubsetOf_v2 () {
	if (hasRequiredEs_set_isSubsetOf_v2) return es_set_isSubsetOf_v2;
	hasRequiredEs_set_isSubsetOf_v2 = 1;
	var $ = require_export();
	var isSubsetOf = requireSetIsSubsetOf();
	var setMethodAcceptSetLike = requireSetMethodAcceptSetLike();

	// `Set.prototype.isSubsetOf` method
	// https://tc39.es/ecma262/#sec-set.prototype.issubsetof
	$({ target: 'Set', proto: true, real: true, forced: !setMethodAcceptSetLike('isSubsetOf') }, {
	  isSubsetOf: isSubsetOf
	});
	return es_set_isSubsetOf_v2;
}

requireEs_set_isSubsetOf_v2();

var es_set_isSupersetOf_v2 = {};

var setIsSupersetOf;
var hasRequiredSetIsSupersetOf;

function requireSetIsSupersetOf () {
	if (hasRequiredSetIsSupersetOf) return setIsSupersetOf;
	hasRequiredSetIsSupersetOf = 1;
	var aSet = requireASet();
	var has = requireSetHelpers().has;
	var size = requireSetSize();
	var getSetRecord = requireGetSetRecord();
	var iterateSimple = requireIterateSimple();
	var iteratorClose = requireIteratorClose();

	// `Set.prototype.isSupersetOf` method
	// https://tc39.github.io/proposal-set-methods/#Set.prototype.isSupersetOf
	setIsSupersetOf = function isSupersetOf(other) {
	  var O = aSet(this);
	  var otherRec = getSetRecord(other);
	  if (size(O) < otherRec.size) return false;
	  var iterator = otherRec.getIterator();
	  return iterateSimple(iterator, function (e) {
	    if (!has(O, e)) return iteratorClose(iterator, 'normal', false);
	  }) !== false;
	};
	return setIsSupersetOf;
}

var hasRequiredEs_set_isSupersetOf_v2;

function requireEs_set_isSupersetOf_v2 () {
	if (hasRequiredEs_set_isSupersetOf_v2) return es_set_isSupersetOf_v2;
	hasRequiredEs_set_isSupersetOf_v2 = 1;
	var $ = require_export();
	var isSupersetOf = requireSetIsSupersetOf();
	var setMethodAcceptSetLike = requireSetMethodAcceptSetLike();

	// `Set.prototype.isSupersetOf` method
	// https://tc39.es/ecma262/#sec-set.prototype.issupersetof
	$({ target: 'Set', proto: true, real: true, forced: !setMethodAcceptSetLike('isSupersetOf') }, {
	  isSupersetOf: isSupersetOf
	});
	return es_set_isSupersetOf_v2;
}

requireEs_set_isSupersetOf_v2();

var es_set_symmetricDifference_v2 = {};

var setSymmetricDifference;
var hasRequiredSetSymmetricDifference;

function requireSetSymmetricDifference () {
	if (hasRequiredSetSymmetricDifference) return setSymmetricDifference;
	hasRequiredSetSymmetricDifference = 1;
	var aSet = requireASet();
	var SetHelpers = requireSetHelpers();
	var clone = requireSetClone();
	var getSetRecord = requireGetSetRecord();
	var iterateSimple = requireIterateSimple();

	var add = SetHelpers.add;
	var has = SetHelpers.has;
	var remove = SetHelpers.remove;

	// `Set.prototype.symmetricDifference` method
	// https://github.com/tc39/proposal-set-methods
	setSymmetricDifference = function symmetricDifference(other) {
	  var O = aSet(this);
	  var keysIter = getSetRecord(other).getIterator();
	  var result = clone(O);
	  iterateSimple(keysIter, function (e) {
	    if (has(O, e)) remove(result, e);
	    else add(result, e);
	  });
	  return result;
	};
	return setSymmetricDifference;
}

var hasRequiredEs_set_symmetricDifference_v2;

function requireEs_set_symmetricDifference_v2 () {
	if (hasRequiredEs_set_symmetricDifference_v2) return es_set_symmetricDifference_v2;
	hasRequiredEs_set_symmetricDifference_v2 = 1;
	var $ = require_export();
	var symmetricDifference = requireSetSymmetricDifference();
	var setMethodAcceptSetLike = requireSetMethodAcceptSetLike();

	// `Set.prototype.symmetricDifference` method
	// https://tc39.es/ecma262/#sec-set.prototype.symmetricdifference
	$({ target: 'Set', proto: true, real: true, forced: !setMethodAcceptSetLike('symmetricDifference') }, {
	  symmetricDifference: symmetricDifference
	});
	return es_set_symmetricDifference_v2;
}

requireEs_set_symmetricDifference_v2();

var es_set_union_v2 = {};

var setUnion;
var hasRequiredSetUnion;

function requireSetUnion () {
	if (hasRequiredSetUnion) return setUnion;
	hasRequiredSetUnion = 1;
	var aSet = requireASet();
	var add = requireSetHelpers().add;
	var clone = requireSetClone();
	var getSetRecord = requireGetSetRecord();
	var iterateSimple = requireIterateSimple();

	// `Set.prototype.union` method
	// https://github.com/tc39/proposal-set-methods
	setUnion = function union(other) {
	  var O = aSet(this);
	  var keysIter = getSetRecord(other).getIterator();
	  var result = clone(O);
	  iterateSimple(keysIter, function (it) {
	    add(result, it);
	  });
	  return result;
	};
	return setUnion;
}

var hasRequiredEs_set_union_v2;

function requireEs_set_union_v2 () {
	if (hasRequiredEs_set_union_v2) return es_set_union_v2;
	hasRequiredEs_set_union_v2 = 1;
	var $ = require_export();
	var union = requireSetUnion();
	var setMethodAcceptSetLike = requireSetMethodAcceptSetLike();

	// `Set.prototype.union` method
	// https://tc39.es/ecma262/#sec-set.prototype.union
	$({ target: 'Set', proto: true, real: true, forced: !setMethodAcceptSetLike('union') }, {
	  union: union
	});
	return es_set_union_v2;
}

requireEs_set_union_v2();

var es_string_replace = {};

var fixRegexpWellKnownSymbolLogic;
var hasRequiredFixRegexpWellKnownSymbolLogic;

function requireFixRegexpWellKnownSymbolLogic () {
	if (hasRequiredFixRegexpWellKnownSymbolLogic) return fixRegexpWellKnownSymbolLogic;
	hasRequiredFixRegexpWellKnownSymbolLogic = 1;
	// TODO: Remove from `core-js@4` since it's moved to entry points
	requireEs_regexp_exec();
	var call = requireFunctionCall();
	var defineBuiltIn = requireDefineBuiltIn();
	var regexpExec = requireRegexpExec();
	var fails = requireFails();
	var wellKnownSymbol = requireWellKnownSymbol();
	var createNonEnumerableProperty = requireCreateNonEnumerableProperty();

	var SPECIES = wellKnownSymbol('species');
	var RegExpPrototype = RegExp.prototype;

	fixRegexpWellKnownSymbolLogic = function (KEY, exec, FORCED, SHAM) {
	  var SYMBOL = wellKnownSymbol(KEY);

	  var DELEGATES_TO_SYMBOL = !fails(function () {
	    // String methods call symbol-named RegExp methods
	    var O = {};
	    O[SYMBOL] = function () { return 7; };
	    return ''[KEY](O) !== 7;
	  });

	  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
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
	      if ($exec === regexpExec || $exec === RegExpPrototype.exec) {
	        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
	          // The native String method already delegates to @@method (this
	          // polyfilled function), leasing to infinite recursion.
	          // We avoid it by directly calling the native @@method method.
	          return { done: true, value: call(nativeRegExpMethod, regexp, str, arg2) };
	        }
	        return { done: true, value: call(nativeMethod, str, regexp, arg2) };
	      }
	      return { done: false };
	    });

	    defineBuiltIn(String.prototype, KEY, methods[0]);
	    defineBuiltIn(RegExpPrototype, SYMBOL, methods[1]);
	  }

	  if (SHAM) createNonEnumerableProperty(RegExpPrototype[SYMBOL], 'sham', true);
	};
	return fixRegexpWellKnownSymbolLogic;
}

var stringMultibyte;
var hasRequiredStringMultibyte;

function requireStringMultibyte () {
	if (hasRequiredStringMultibyte) return stringMultibyte;
	hasRequiredStringMultibyte = 1;
	var uncurryThis = requireFunctionUncurryThis();
	var toIntegerOrInfinity = requireToIntegerOrInfinity();
	var toString = requireToString();
	var requireObjectCoercible = requireRequireObjectCoercible();

	var charAt = uncurryThis(''.charAt);
	var charCodeAt = uncurryThis(''.charCodeAt);
	var stringSlice = uncurryThis(''.slice);

	var createMethod = function (CONVERT_TO_STRING) {
	  return function ($this, pos) {
	    var S = toString(requireObjectCoercible($this));
	    var position = toIntegerOrInfinity(pos);
	    var size = S.length;
	    var first, second;
	    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
	    first = charCodeAt(S, position);
	    return first < 0xD800 || first > 0xDBFF || position + 1 === size
	      || (second = charCodeAt(S, position + 1)) < 0xDC00 || second > 0xDFFF
	        ? CONVERT_TO_STRING
	          ? charAt(S, position)
	          : first
	        : CONVERT_TO_STRING
	          ? stringSlice(S, position, position + 2)
	          : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
	  };
	};

	stringMultibyte = {
	  // `String.prototype.codePointAt` method
	  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
	  codeAt: createMethod(false),
	  // `String.prototype.at` method
	  // https://github.com/mathiasbynens/String.prototype.at
	  charAt: createMethod(true)
	};
	return stringMultibyte;
}

var advanceStringIndex;
var hasRequiredAdvanceStringIndex;

function requireAdvanceStringIndex () {
	if (hasRequiredAdvanceStringIndex) return advanceStringIndex;
	hasRequiredAdvanceStringIndex = 1;
	var charAt = requireStringMultibyte().charAt;

	// `AdvanceStringIndex` abstract operation
	// https://tc39.es/ecma262/#sec-advancestringindex
	advanceStringIndex = function (S, index, unicode) {
	  return index + (unicode ? charAt(S, index).length : 1);
	};
	return advanceStringIndex;
}

var getSubstitution;
var hasRequiredGetSubstitution;

function requireGetSubstitution () {
	if (hasRequiredGetSubstitution) return getSubstitution;
	hasRequiredGetSubstitution = 1;
	var uncurryThis = requireFunctionUncurryThis();
	var toObject = requireToObject();

	var floor = Math.floor;
	var charAt = uncurryThis(''.charAt);
	var replace = uncurryThis(''.replace);
	var stringSlice = uncurryThis(''.slice);
	// eslint-disable-next-line redos/no-vulnerable -- safe
	var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
	var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

	// `GetSubstitution` abstract operation
	// https://tc39.es/ecma262/#sec-getsubstitution
	getSubstitution = function (matched, str, position, captures, namedCaptures, replacement) {
	  var tailPos = position + matched.length;
	  var m = captures.length;
	  var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
	  if (namedCaptures !== undefined) {
	    namedCaptures = toObject(namedCaptures);
	    symbols = SUBSTITUTION_SYMBOLS;
	  }
	  return replace(replacement, symbols, function (match, ch) {
	    var capture;
	    switch (charAt(ch, 0)) {
	      case '$': return '$';
	      case '&': return matched;
	      case '`': return stringSlice(str, 0, position);
	      case "'": return stringSlice(str, tailPos);
	      case '<':
	        capture = namedCaptures[stringSlice(ch, 1, -1)];
	        break;
	      default: // \d\d?
	        var n = +ch;
	        if (n === 0) return match;
	        if (n > m) {
	          var f = floor(n / 10);
	          if (f === 0) return match;
	          if (f <= m) return captures[f - 1] === undefined ? charAt(ch, 1) : captures[f - 1] + charAt(ch, 1);
	          return match;
	        }
	        capture = captures[n - 1];
	    }
	    return capture === undefined ? '' : capture;
	  });
	};
	return getSubstitution;
}

var regexpExecAbstract;
var hasRequiredRegexpExecAbstract;

function requireRegexpExecAbstract () {
	if (hasRequiredRegexpExecAbstract) return regexpExecAbstract;
	hasRequiredRegexpExecAbstract = 1;
	var call = requireFunctionCall();
	var anObject = requireAnObject();
	var isCallable = requireIsCallable();
	var classof = requireClassofRaw();
	var regexpExec = requireRegexpExec();

	var $TypeError = TypeError;

	// `RegExpExec` abstract operation
	// https://tc39.es/ecma262/#sec-regexpexec
	regexpExecAbstract = function (R, S) {
	  var exec = R.exec;
	  if (isCallable(exec)) {
	    var result = call(exec, R, S);
	    if (result !== null) anObject(result);
	    return result;
	  }
	  if (classof(R) === 'RegExp') return call(regexpExec, R, S);
	  throw new $TypeError('RegExp#exec called on incompatible receiver');
	};
	return regexpExecAbstract;
}

var hasRequiredEs_string_replace;

function requireEs_string_replace () {
	if (hasRequiredEs_string_replace) return es_string_replace;
	hasRequiredEs_string_replace = 1;
	var apply = requireFunctionApply();
	var call = requireFunctionCall();
	var uncurryThis = requireFunctionUncurryThis();
	var fixRegExpWellKnownSymbolLogic = requireFixRegexpWellKnownSymbolLogic();
	var fails = requireFails();
	var anObject = requireAnObject();
	var isCallable = requireIsCallable();
	var isNullOrUndefined = requireIsNullOrUndefined();
	var toIntegerOrInfinity = requireToIntegerOrInfinity();
	var toLength = requireToLength();
	var toString = requireToString();
	var requireObjectCoercible = requireRequireObjectCoercible();
	var advanceStringIndex = requireAdvanceStringIndex();
	var getMethod = requireGetMethod();
	var getSubstitution = requireGetSubstitution();
	var regExpExec = requireRegexpExecAbstract();
	var wellKnownSymbol = requireWellKnownSymbol();

	var REPLACE = wellKnownSymbol('replace');
	var max = Math.max;
	var min = Math.min;
	var concat = uncurryThis([].concat);
	var push = uncurryThis([].push);
	var stringIndexOf = uncurryThis(''.indexOf);
	var stringSlice = uncurryThis(''.slice);

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

	var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
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
	fixRegExpWellKnownSymbolLogic('replace', function (_, nativeReplace, maybeCallNative) {
	  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

	  return [
	    // `String.prototype.replace` method
	    // https://tc39.es/ecma262/#sec-string.prototype.replace
	    function replace(searchValue, replaceValue) {
	      var O = requireObjectCoercible(this);
	      var replacer = isNullOrUndefined(searchValue) ? undefined : getMethod(searchValue, REPLACE);
	      return replacer
	        ? call(replacer, searchValue, O, replaceValue)
	        : call(nativeReplace, toString(O), searchValue, replaceValue);
	    },
	    // `RegExp.prototype[@@replace]` method
	    // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
	    function (string, replaceValue) {
	      var rx = anObject(this);
	      var S = toString(string);

	      if (
	        typeof replaceValue == 'string' &&
	        stringIndexOf(replaceValue, UNSAFE_SUBSTITUTE) === -1 &&
	        stringIndexOf(replaceValue, '$<') === -1
	      ) {
	        var res = maybeCallNative(nativeReplace, rx, S, replaceValue);
	        if (res.done) return res.value;
	      }

	      var functionalReplace = isCallable(replaceValue);
	      if (!functionalReplace) replaceValue = toString(replaceValue);

	      var global = rx.global;
	      var fullUnicode;
	      if (global) {
	        fullUnicode = rx.unicode;
	        rx.lastIndex = 0;
	      }

	      var results = [];
	      var result;
	      while (true) {
	        result = regExpExec(rx, S);
	        if (result === null) break;

	        push(results, result);
	        if (!global) break;

	        var matchStr = toString(result[0]);
	        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
	      }

	      var accumulatedResult = '';
	      var nextSourcePosition = 0;
	      for (var i = 0; i < results.length; i++) {
	        result = results[i];

	        var matched = toString(result[0]);
	        var position = max(min(toIntegerOrInfinity(result.index), S.length), 0);
	        var captures = [];
	        var replacement;
	        // NOTE: This is equivalent to
	        //   captures = result.slice(1).map(maybeToString)
	        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
	        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
	        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
	        for (var j = 1; j < result.length; j++) push(captures, maybeToString(result[j]));
	        var namedCaptures = result.groups;
	        if (functionalReplace) {
	          var replacerArgs = concat([matched], captures, position, S);
	          if (namedCaptures !== undefined) push(replacerArgs, namedCaptures);
	          replacement = toString(apply(replaceValue, undefined, replacerArgs));
	        } else {
	          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
	        }
	        if (position >= nextSourcePosition) {
	          accumulatedResult += stringSlice(S, nextSourcePosition, position) + replacement;
	          nextSourcePosition = position + matched.length;
	        }
	      }

	      return accumulatedResult + stringSlice(S, nextSourcePosition);
	    }
	  ];
	}, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);
	return es_string_replace;
}

requireEs_string_replace();

var es_typedArray_float32Array = {};

var typedArrayConstructor = {exports: {}};

var arrayBufferViewCore;
var hasRequiredArrayBufferViewCore;

function requireArrayBufferViewCore () {
	if (hasRequiredArrayBufferViewCore) return arrayBufferViewCore;
	hasRequiredArrayBufferViewCore = 1;
	var NATIVE_ARRAY_BUFFER = requireArrayBufferBasicDetection();
	var DESCRIPTORS = requireDescriptors();
	var globalThis = requireGlobalThis();
	var isCallable = requireIsCallable();
	var isObject = requireIsObject();
	var hasOwn = requireHasOwnProperty();
	var classof = requireClassof();
	var tryToString = requireTryToString();
	var createNonEnumerableProperty = requireCreateNonEnumerableProperty();
	var defineBuiltIn = requireDefineBuiltIn();
	var defineBuiltInAccessor = requireDefineBuiltInAccessor();
	var isPrototypeOf = requireObjectIsPrototypeOf();
	var getPrototypeOf = requireObjectGetPrototypeOf();
	var setPrototypeOf = requireObjectSetPrototypeOf();
	var wellKnownSymbol = requireWellKnownSymbol();
	var uid = requireUid();
	var InternalStateModule = requireInternalState();

	var enforceInternalState = InternalStateModule.enforce;
	var getInternalState = InternalStateModule.get;
	var Int8Array = globalThis.Int8Array;
	var Int8ArrayPrototype = Int8Array && Int8Array.prototype;
	var Uint8ClampedArray = globalThis.Uint8ClampedArray;
	var Uint8ClampedArrayPrototype = Uint8ClampedArray && Uint8ClampedArray.prototype;
	var TypedArray = Int8Array && getPrototypeOf(Int8Array);
	var TypedArrayPrototype = Int8ArrayPrototype && getPrototypeOf(Int8ArrayPrototype);
	var ObjectPrototype = Object.prototype;
	var TypeError = globalThis.TypeError;

	var TO_STRING_TAG = wellKnownSymbol('toStringTag');
	var TYPED_ARRAY_TAG = uid('TYPED_ARRAY_TAG');
	var TYPED_ARRAY_CONSTRUCTOR = 'TypedArrayConstructor';
	// Fixing native typed arrays in Opera Presto crashes the browser, see #595
	var NATIVE_ARRAY_BUFFER_VIEWS = NATIVE_ARRAY_BUFFER && !!setPrototypeOf && classof(globalThis.opera) !== 'Opera';
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
	  if (!isObject(it)) return false;
	  var klass = classof(it);
	  return klass === 'DataView'
	    || hasOwn(TypedArrayConstructorsList, klass)
	    || hasOwn(BigIntArrayConstructorsList, klass);
	};

	var getTypedArrayConstructor = function (it) {
	  var proto = getPrototypeOf(it);
	  if (!isObject(proto)) return;
	  var state = getInternalState(proto);
	  return (state && hasOwn(state, TYPED_ARRAY_CONSTRUCTOR)) ? state[TYPED_ARRAY_CONSTRUCTOR] : getTypedArrayConstructor(proto);
	};

	var isTypedArray = function (it) {
	  if (!isObject(it)) return false;
	  var klass = classof(it);
	  return hasOwn(TypedArrayConstructorsList, klass)
	    || hasOwn(BigIntArrayConstructorsList, klass);
	};

	var aTypedArray = function (it) {
	  if (isTypedArray(it)) return it;
	  throw new TypeError('Target is not a typed array');
	};

	var aTypedArrayConstructor = function (C) {
	  if (isCallable(C) && (!setPrototypeOf || isPrototypeOf(TypedArray, C))) return C;
	  throw new TypeError(tryToString(C) + ' is not a typed array constructor');
	};

	var exportTypedArrayMethod = function (KEY, property, forced, options) {
	  if (!DESCRIPTORS) return;
	  if (forced) for (var ARRAY in TypedArrayConstructorsList) {
	    var TypedArrayConstructor = globalThis[ARRAY];
	    if (TypedArrayConstructor && hasOwn(TypedArrayConstructor.prototype, KEY)) try {
	      delete TypedArrayConstructor.prototype[KEY];
	    } catch (error) {
	      // old WebKit bug - some methods are non-configurable
	      try {
	        TypedArrayConstructor.prototype[KEY] = property;
	      } catch (error2) { /* empty */ }
	    }
	  }
	  if (!TypedArrayPrototype[KEY] || forced) {
	    defineBuiltIn(TypedArrayPrototype, KEY, forced ? property
	      : NATIVE_ARRAY_BUFFER_VIEWS && Int8ArrayPrototype[KEY] || property, options);
	  }
	};

	var exportTypedArrayStaticMethod = function (KEY, property, forced) {
	  var ARRAY, TypedArrayConstructor;
	  if (!DESCRIPTORS) return;
	  if (setPrototypeOf) {
	    if (forced) for (ARRAY in TypedArrayConstructorsList) {
	      TypedArrayConstructor = globalThis[ARRAY];
	      if (TypedArrayConstructor && hasOwn(TypedArrayConstructor, KEY)) try {
	        delete TypedArrayConstructor[KEY];
	      } catch (error) { /* empty */ }
	    }
	    if (!TypedArray[KEY] || forced) {
	      // V8 ~ Chrome 49-50 `%TypedArray%` methods are non-writable non-configurable
	      try {
	        return defineBuiltIn(TypedArray, KEY, forced ? property : NATIVE_ARRAY_BUFFER_VIEWS && TypedArray[KEY] || property);
	      } catch (error) { /* empty */ }
	    } else return;
	  }
	  for (ARRAY in TypedArrayConstructorsList) {
	    TypedArrayConstructor = globalThis[ARRAY];
	    if (TypedArrayConstructor && (!TypedArrayConstructor[KEY] || forced)) {
	      defineBuiltIn(TypedArrayConstructor, KEY, property);
	    }
	  }
	};

	for (NAME in TypedArrayConstructorsList) {
	  Constructor = globalThis[NAME];
	  Prototype = Constructor && Constructor.prototype;
	  if (Prototype) enforceInternalState(Prototype)[TYPED_ARRAY_CONSTRUCTOR] = Constructor;
	  else NATIVE_ARRAY_BUFFER_VIEWS = false;
	}

	for (NAME in BigIntArrayConstructorsList) {
	  Constructor = globalThis[NAME];
	  Prototype = Constructor && Constructor.prototype;
	  if (Prototype) enforceInternalState(Prototype)[TYPED_ARRAY_CONSTRUCTOR] = Constructor;
	}

	// WebKit bug - typed arrays constructors prototype is Object.prototype
	if (!NATIVE_ARRAY_BUFFER_VIEWS || !isCallable(TypedArray) || TypedArray === Function.prototype) {
	  // eslint-disable-next-line no-shadow -- safe
	  TypedArray = function TypedArray() {
	    throw new TypeError('Incorrect invocation');
	  };
	  if (NATIVE_ARRAY_BUFFER_VIEWS) for (NAME in TypedArrayConstructorsList) {
	    if (globalThis[NAME]) setPrototypeOf(globalThis[NAME], TypedArray);
	  }
	}

	if (!NATIVE_ARRAY_BUFFER_VIEWS || !TypedArrayPrototype || TypedArrayPrototype === ObjectPrototype) {
	  TypedArrayPrototype = TypedArray.prototype;
	  if (NATIVE_ARRAY_BUFFER_VIEWS) for (NAME in TypedArrayConstructorsList) {
	    if (globalThis[NAME]) setPrototypeOf(globalThis[NAME].prototype, TypedArrayPrototype);
	  }
	}

	// WebKit bug - one more object in Uint8ClampedArray prototype chain
	if (NATIVE_ARRAY_BUFFER_VIEWS && getPrototypeOf(Uint8ClampedArrayPrototype) !== TypedArrayPrototype) {
	  setPrototypeOf(Uint8ClampedArrayPrototype, TypedArrayPrototype);
	}

	if (DESCRIPTORS && !hasOwn(TypedArrayPrototype, TO_STRING_TAG)) {
	  TYPED_ARRAY_TAG_REQUIRED = true;
	  defineBuiltInAccessor(TypedArrayPrototype, TO_STRING_TAG, {
	    configurable: true,
	    get: function () {
	      return isObject(this) ? this[TYPED_ARRAY_TAG] : undefined;
	    }
	  });
	  for (NAME in TypedArrayConstructorsList) if (globalThis[NAME]) {
	    createNonEnumerableProperty(globalThis[NAME], TYPED_ARRAY_TAG, NAME);
	  }
	}

	arrayBufferViewCore = {
	  NATIVE_ARRAY_BUFFER_VIEWS: NATIVE_ARRAY_BUFFER_VIEWS,
	  TYPED_ARRAY_TAG: TYPED_ARRAY_TAG_REQUIRED && TYPED_ARRAY_TAG,
	  aTypedArray: aTypedArray,
	  aTypedArrayConstructor: aTypedArrayConstructor,
	  exportTypedArrayMethod: exportTypedArrayMethod,
	  exportTypedArrayStaticMethod: exportTypedArrayStaticMethod,
	  getTypedArrayConstructor: getTypedArrayConstructor,
	  isView: isView,
	  isTypedArray: isTypedArray,
	  TypedArray: TypedArray,
	  TypedArrayPrototype: TypedArrayPrototype
	};
	return arrayBufferViewCore;
}

var typedArrayConstructorsRequireWrappers;
var hasRequiredTypedArrayConstructorsRequireWrappers;

function requireTypedArrayConstructorsRequireWrappers () {
	if (hasRequiredTypedArrayConstructorsRequireWrappers) return typedArrayConstructorsRequireWrappers;
	hasRequiredTypedArrayConstructorsRequireWrappers = 1;
	/* eslint-disable no-new, sonarjs/inconsistent-function-call -- required for testing */
	var globalThis = requireGlobalThis();
	var fails = requireFails();
	var checkCorrectnessOfIteration = requireCheckCorrectnessOfIteration();
	var NATIVE_ARRAY_BUFFER_VIEWS = requireArrayBufferViewCore().NATIVE_ARRAY_BUFFER_VIEWS;

	var ArrayBuffer = globalThis.ArrayBuffer;
	var Int8Array = globalThis.Int8Array;

	typedArrayConstructorsRequireWrappers = !NATIVE_ARRAY_BUFFER_VIEWS || !fails(function () {
	  Int8Array(1);
	}) || !fails(function () {
	  new Int8Array(-1);
	}) || !checkCorrectnessOfIteration(function (iterable) {
	  new Int8Array();
	  new Int8Array(null);
	  new Int8Array(1.5);
	  new Int8Array(iterable);
	}, true) || fails(function () {
	  // Safari (11+) bug - a reason why even Safari 13 should load a typed array polyfill
	  return new Int8Array(new ArrayBuffer(2), 1, undefined).length !== 1;
	});
	return typedArrayConstructorsRequireWrappers;
}

var isIntegralNumber;
var hasRequiredIsIntegralNumber;

function requireIsIntegralNumber () {
	if (hasRequiredIsIntegralNumber) return isIntegralNumber;
	hasRequiredIsIntegralNumber = 1;
	var isObject = requireIsObject();

	var floor = Math.floor;

	// `IsIntegralNumber` abstract operation
	// https://tc39.es/ecma262/#sec-isintegralnumber
	// eslint-disable-next-line es/no-number-isinteger -- safe
	isIntegralNumber = Number.isInteger || function isInteger(it) {
	  return !isObject(it) && isFinite(it) && floor(it) === it;
	};
	return isIntegralNumber;
}

var toPositiveInteger;
var hasRequiredToPositiveInteger;

function requireToPositiveInteger () {
	if (hasRequiredToPositiveInteger) return toPositiveInteger;
	hasRequiredToPositiveInteger = 1;
	var toIntegerOrInfinity = requireToIntegerOrInfinity();

	var $RangeError = RangeError;

	toPositiveInteger = function (it) {
	  var result = toIntegerOrInfinity(it);
	  if (result < 0) throw new $RangeError("The argument can't be less than 0");
	  return result;
	};
	return toPositiveInteger;
}

var toOffset;
var hasRequiredToOffset;

function requireToOffset () {
	if (hasRequiredToOffset) return toOffset;
	hasRequiredToOffset = 1;
	var toPositiveInteger = requireToPositiveInteger();

	var $RangeError = RangeError;

	toOffset = function (it, BYTES) {
	  var offset = toPositiveInteger(it);
	  if (offset % BYTES) throw new $RangeError('Wrong offset');
	  return offset;
	};
	return toOffset;
}

var toUint8Clamped;
var hasRequiredToUint8Clamped;

function requireToUint8Clamped () {
	if (hasRequiredToUint8Clamped) return toUint8Clamped;
	hasRequiredToUint8Clamped = 1;
	var round = Math.round;

	toUint8Clamped = function (it) {
	  var value = round(it);
	  return value < 0 ? 0 : value > 0xFF ? 0xFF : value & 0xFF;
	};
	return toUint8Clamped;
}

var isBigIntArray;
var hasRequiredIsBigIntArray;

function requireIsBigIntArray () {
	if (hasRequiredIsBigIntArray) return isBigIntArray;
	hasRequiredIsBigIntArray = 1;
	var classof = requireClassof();

	isBigIntArray = function (it) {
	  var klass = classof(it);
	  return klass === 'BigInt64Array' || klass === 'BigUint64Array';
	};
	return isBigIntArray;
}

var toBigInt;
var hasRequiredToBigInt;

function requireToBigInt () {
	if (hasRequiredToBigInt) return toBigInt;
	hasRequiredToBigInt = 1;
	var toPrimitive = requireToPrimitive();

	var $TypeError = TypeError;

	// `ToBigInt` abstract operation
	// https://tc39.es/ecma262/#sec-tobigint
	toBigInt = function (argument) {
	  var prim = toPrimitive(argument, 'number');
	  if (typeof prim == 'number') throw new $TypeError("Can't convert number to bigint");
	  // eslint-disable-next-line es/no-bigint -- safe
	  return BigInt(prim);
	};
	return toBigInt;
}

var typedArrayFrom;
var hasRequiredTypedArrayFrom;

function requireTypedArrayFrom () {
	if (hasRequiredTypedArrayFrom) return typedArrayFrom;
	hasRequiredTypedArrayFrom = 1;
	var bind = requireFunctionBindContext();
	var call = requireFunctionCall();
	var aConstructor = requireAConstructor();
	var toObject = requireToObject();
	var lengthOfArrayLike = requireLengthOfArrayLike();
	var getIterator = requireGetIterator();
	var getIteratorMethod = requireGetIteratorMethod();
	var isArrayIteratorMethod = requireIsArrayIteratorMethod();
	var isBigIntArray = requireIsBigIntArray();
	var aTypedArrayConstructor = requireArrayBufferViewCore().aTypedArrayConstructor;
	var toBigInt = requireToBigInt();

	typedArrayFrom = function from(source /* , mapfn, thisArg */) {
	  var C = aConstructor(this);
	  var O = toObject(source);
	  var argumentsLength = arguments.length;
	  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
	  var mapping = mapfn !== undefined;
	  var iteratorMethod = getIteratorMethod(O);
	  var i, length, result, thisIsBigIntArray, value, step, iterator, next;
	  if (iteratorMethod && !isArrayIteratorMethod(iteratorMethod)) {
	    iterator = getIterator(O, iteratorMethod);
	    next = iterator.next;
	    O = [];
	    while (!(step = call(next, iterator)).done) {
	      O.push(step.value);
	    }
	  }
	  if (mapping && argumentsLength > 2) {
	    mapfn = bind(mapfn, arguments[2]);
	  }
	  length = lengthOfArrayLike(O);
	  result = new (aTypedArrayConstructor(C))(length);
	  thisIsBigIntArray = isBigIntArray(result);
	  for (i = 0; length > i; i++) {
	    value = mapping ? mapfn(O[i], i) : O[i];
	    // FF30- typed arrays doesn't properly convert objects to typed array values
	    result[i] = thisIsBigIntArray ? toBigInt(value) : +value;
	  }
	  return result;
	};
	return typedArrayFrom;
}

var arrayIteration;
var hasRequiredArrayIteration;

function requireArrayIteration () {
	if (hasRequiredArrayIteration) return arrayIteration;
	hasRequiredArrayIteration = 1;
	var bind = requireFunctionBindContext();
	var uncurryThis = requireFunctionUncurryThis();
	var IndexedObject = requireIndexedObject();
	var toObject = requireToObject();
	var lengthOfArrayLike = requireLengthOfArrayLike();
	var arraySpeciesCreate = requireArraySpeciesCreate();

	var push = uncurryThis([].push);

	// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
	var createMethod = function (TYPE) {
	  var IS_MAP = TYPE === 1;
	  var IS_FILTER = TYPE === 2;
	  var IS_SOME = TYPE === 3;
	  var IS_EVERY = TYPE === 4;
	  var IS_FIND_INDEX = TYPE === 6;
	  var IS_FILTER_REJECT = TYPE === 7;
	  var NO_HOLES = TYPE === 5 || IS_FIND_INDEX;
	  return function ($this, callbackfn, that, specificCreate) {
	    var O = toObject($this);
	    var self = IndexedObject(O);
	    var length = lengthOfArrayLike(self);
	    var boundFunction = bind(callbackfn, that);
	    var index = 0;
	    var create = specificCreate || arraySpeciesCreate;
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
	          case 2: push(target, value);      // filter
	        } else switch (TYPE) {
	          case 4: return false;             // every
	          case 7: push(target, value);      // filterReject
	        }
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
	  };
	};

	arrayIteration = {
	  // `Array.prototype.forEach` method
	  // https://tc39.es/ecma262/#sec-array.prototype.foreach
	  forEach: createMethod(0),
	  // `Array.prototype.map` method
	  // https://tc39.es/ecma262/#sec-array.prototype.map
	  map: createMethod(1),
	  // `Array.prototype.filter` method
	  // https://tc39.es/ecma262/#sec-array.prototype.filter
	  filter: createMethod(2),
	  // `Array.prototype.some` method
	  // https://tc39.es/ecma262/#sec-array.prototype.some
	  some: createMethod(3),
	  // `Array.prototype.every` method
	  // https://tc39.es/ecma262/#sec-array.prototype.every
	  every: createMethod(4),
	  // `Array.prototype.find` method
	  // https://tc39.es/ecma262/#sec-array.prototype.find
	  find: createMethod(5),
	  // `Array.prototype.findIndex` method
	  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
	  findIndex: createMethod(6),
	  // `Array.prototype.filterReject` method
	  // https://github.com/tc39/proposal-array-filtering
	  filterReject: createMethod(7)
	};
	return arrayIteration;
}

var arrayFromConstructorAndList;
var hasRequiredArrayFromConstructorAndList;

function requireArrayFromConstructorAndList () {
	if (hasRequiredArrayFromConstructorAndList) return arrayFromConstructorAndList;
	hasRequiredArrayFromConstructorAndList = 1;
	var lengthOfArrayLike = requireLengthOfArrayLike();

	arrayFromConstructorAndList = function (Constructor, list, $length) {
	  var index = 0;
	  var length = arguments.length > 2 ? $length : lengthOfArrayLike(list);
	  var result = new Constructor(length);
	  while (length > index) result[index] = list[index++];
	  return result;
	};
	return arrayFromConstructorAndList;
}

var hasRequiredTypedArrayConstructor;

function requireTypedArrayConstructor () {
	if (hasRequiredTypedArrayConstructor) return typedArrayConstructor.exports;
	hasRequiredTypedArrayConstructor = 1;
	var $ = require_export();
	var globalThis = requireGlobalThis();
	var call = requireFunctionCall();
	var DESCRIPTORS = requireDescriptors();
	var TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS = requireTypedArrayConstructorsRequireWrappers();
	var ArrayBufferViewCore = requireArrayBufferViewCore();
	var ArrayBufferModule = requireArrayBuffer();
	var anInstance = requireAnInstance();
	var createPropertyDescriptor = requireCreatePropertyDescriptor();
	var createNonEnumerableProperty = requireCreateNonEnumerableProperty();
	var isIntegralNumber = requireIsIntegralNumber();
	var toLength = requireToLength();
	var toIndex = requireToIndex();
	var toOffset = requireToOffset();
	var toUint8Clamped = requireToUint8Clamped();
	var toPropertyKey = requireToPropertyKey();
	var hasOwn = requireHasOwnProperty();
	var classof = requireClassof();
	var isObject = requireIsObject();
	var isSymbol = requireIsSymbol();
	var create = requireObjectCreate();
	var isPrototypeOf = requireObjectIsPrototypeOf();
	var setPrototypeOf = requireObjectSetPrototypeOf();
	var getOwnPropertyNames = requireObjectGetOwnPropertyNames().f;
	var typedArrayFrom = requireTypedArrayFrom();
	var forEach = requireArrayIteration().forEach;
	var setSpecies = requireSetSpecies();
	var defineBuiltInAccessor = requireDefineBuiltInAccessor();
	var definePropertyModule = requireObjectDefineProperty();
	var getOwnPropertyDescriptorModule = requireObjectGetOwnPropertyDescriptor();
	var arrayFromConstructorAndList = requireArrayFromConstructorAndList();
	var InternalStateModule = requireInternalState();
	var inheritIfRequired = requireInheritIfRequired();

	var getInternalState = InternalStateModule.get;
	var setInternalState = InternalStateModule.set;
	var enforceInternalState = InternalStateModule.enforce;
	var nativeDefineProperty = definePropertyModule.f;
	var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
	var RangeError = globalThis.RangeError;
	var ArrayBuffer = ArrayBufferModule.ArrayBuffer;
	var ArrayBufferPrototype = ArrayBuffer.prototype;
	var DataView = ArrayBufferModule.DataView;
	var NATIVE_ARRAY_BUFFER_VIEWS = ArrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS;
	var TYPED_ARRAY_TAG = ArrayBufferViewCore.TYPED_ARRAY_TAG;
	var TypedArray = ArrayBufferViewCore.TypedArray;
	var TypedArrayPrototype = ArrayBufferViewCore.TypedArrayPrototype;
	var isTypedArray = ArrayBufferViewCore.isTypedArray;
	var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
	var WRONG_LENGTH = 'Wrong length';

	var addGetter = function (it, key) {
	  defineBuiltInAccessor(it, key, {
	    configurable: true,
	    get: function () {
	      return getInternalState(this)[key];
	    }
	  });
	};

	var isArrayBuffer = function (it) {
	  var klass;
	  return isPrototypeOf(ArrayBufferPrototype, it) || (klass = classof(it)) === 'ArrayBuffer' || klass === 'SharedArrayBuffer';
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
	    ? createPropertyDescriptor(2, target[key])
	    : nativeGetOwnPropertyDescriptor(target, key);
	};

	var wrappedDefineProperty = function defineProperty(target, key, descriptor) {
	  key = toPropertyKey(key);
	  if (isTypedArrayIndex(target, key)
	    && isObject(descriptor)
	    && hasOwn(descriptor, 'value')
	    && !hasOwn(descriptor, 'get')
	    && !hasOwn(descriptor, 'set')
	    // TODO: add validation descriptor w/o calling accessors
	    && !descriptor.configurable
	    && (!hasOwn(descriptor, 'writable') || descriptor.writable)
	    && (!hasOwn(descriptor, 'enumerable') || descriptor.enumerable)
	  ) {
	    target[key] = descriptor.value;
	    return target;
	  } return nativeDefineProperty(target, key, descriptor);
	};

	if (DESCRIPTORS) {
	  if (!NATIVE_ARRAY_BUFFER_VIEWS) {
	    getOwnPropertyDescriptorModule.f = wrappedGetOwnPropertyDescriptor;
	    definePropertyModule.f = wrappedDefineProperty;
	    addGetter(TypedArrayPrototype, 'buffer');
	    addGetter(TypedArrayPrototype, 'byteOffset');
	    addGetter(TypedArrayPrototype, 'byteLength');
	    addGetter(TypedArrayPrototype, 'length');
	  }

	  $({ target: 'Object', stat: true, forced: !NATIVE_ARRAY_BUFFER_VIEWS }, {
	    getOwnPropertyDescriptor: wrappedGetOwnPropertyDescriptor,
	    defineProperty: wrappedDefineProperty
	  });

	  typedArrayConstructor.exports = function (TYPE, wrapper, CLAMPED) {
	    var BYTES = TYPE.match(/\d+/)[0] / 8;
	    var CONSTRUCTOR_NAME = TYPE + (CLAMPED ? 'Clamped' : '') + 'Array';
	    var GETTER = 'get' + TYPE;
	    var SETTER = 'set' + TYPE;
	    var NativeTypedArrayConstructor = globalThis[CONSTRUCTOR_NAME];
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
	        anInstance(that, TypedArrayConstructorPrototype);
	        var index = 0;
	        var byteOffset = 0;
	        var buffer, byteLength, length;
	        if (!isObject(data)) {
	          length = toIndex(data);
	          byteLength = length * BYTES;
	          buffer = new ArrayBuffer(byteLength);
	        } else if (isArrayBuffer(data)) {
	          buffer = data;
	          byteOffset = toOffset(offset, BYTES);
	          var $len = data.byteLength;
	          if ($length === undefined) {
	            if ($len % BYTES) throw new RangeError(WRONG_LENGTH);
	            byteLength = $len - byteOffset;
	            if (byteLength < 0) throw new RangeError(WRONG_LENGTH);
	          } else {
	            byteLength = toLength($length) * BYTES;
	            if (byteLength + byteOffset > $len) throw new RangeError(WRONG_LENGTH);
	          }
	          length = byteLength / BYTES;
	        } else if (isTypedArray(data)) {
	          return arrayFromConstructorAndList(TypedArrayConstructor, data);
	        } else {
	          return call(typedArrayFrom, TypedArrayConstructor, data);
	        }
	        setInternalState(that, {
	          buffer: buffer,
	          byteOffset: byteOffset,
	          byteLength: byteLength,
	          length: length,
	          view: new DataView(buffer)
	        });
	        while (index < length) addElement(that, index++);
	      });

	      if (setPrototypeOf) setPrototypeOf(TypedArrayConstructor, TypedArray);
	      TypedArrayConstructorPrototype = TypedArrayConstructor.prototype = create(TypedArrayPrototype);
	    } else if (TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS) {
	      TypedArrayConstructor = wrapper(function (dummy, data, typedArrayOffset, $length) {
	        anInstance(dummy, TypedArrayConstructorPrototype);
	        return inheritIfRequired(function () {
	          if (!isObject(data)) return new NativeTypedArrayConstructor(toIndex(data));
	          if (isArrayBuffer(data)) return $length !== undefined
	            ? new NativeTypedArrayConstructor(data, toOffset(typedArrayOffset, BYTES), $length)
	            : typedArrayOffset !== undefined
	              ? new NativeTypedArrayConstructor(data, toOffset(typedArrayOffset, BYTES))
	              : new NativeTypedArrayConstructor(data);
	          if (isTypedArray(data)) return arrayFromConstructorAndList(TypedArrayConstructor, data);
	          return call(typedArrayFrom, TypedArrayConstructor, data);
	        }(), dummy, TypedArrayConstructor);
	      });

	      if (setPrototypeOf) setPrototypeOf(TypedArrayConstructor, TypedArray);
	      forEach(getOwnPropertyNames(NativeTypedArrayConstructor), function (key) {
	        if (!(key in TypedArrayConstructor)) {
	          createNonEnumerableProperty(TypedArrayConstructor, key, NativeTypedArrayConstructor[key]);
	        }
	      });
	      TypedArrayConstructor.prototype = TypedArrayConstructorPrototype;
	    }

	    if (TypedArrayConstructorPrototype.constructor !== TypedArrayConstructor) {
	      createNonEnumerableProperty(TypedArrayConstructorPrototype, 'constructor', TypedArrayConstructor);
	    }

	    enforceInternalState(TypedArrayConstructorPrototype).TypedArrayConstructor = TypedArrayConstructor;

	    if (TYPED_ARRAY_TAG) {
	      createNonEnumerableProperty(TypedArrayConstructorPrototype, TYPED_ARRAY_TAG, CONSTRUCTOR_NAME);
	    }

	    var FORCED = TypedArrayConstructor !== NativeTypedArrayConstructor;

	    exported[CONSTRUCTOR_NAME] = TypedArrayConstructor;

	    $({ global: true, constructor: true, forced: FORCED, sham: !NATIVE_ARRAY_BUFFER_VIEWS }, exported);

	    if (!(BYTES_PER_ELEMENT in TypedArrayConstructor)) {
	      createNonEnumerableProperty(TypedArrayConstructor, BYTES_PER_ELEMENT, BYTES);
	    }

	    if (!(BYTES_PER_ELEMENT in TypedArrayConstructorPrototype)) {
	      createNonEnumerableProperty(TypedArrayConstructorPrototype, BYTES_PER_ELEMENT, BYTES);
	    }

	    setSpecies(CONSTRUCTOR_NAME);
	  };
	} else typedArrayConstructor.exports = function () { /* empty */ };
	return typedArrayConstructor.exports;
}

var hasRequiredEs_typedArray_float32Array;

function requireEs_typedArray_float32Array () {
	if (hasRequiredEs_typedArray_float32Array) return es_typedArray_float32Array;
	hasRequiredEs_typedArray_float32Array = 1;
	var createTypedArrayConstructor = requireTypedArrayConstructor();

	// `Float32Array` constructor
	// https://tc39.es/ecma262/#sec-typedarray-objects
	createTypedArrayConstructor('Float32', function (init) {
	  return function Float32Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});
	return es_typedArray_float32Array;
}

requireEs_typedArray_float32Array();

var es_typedArray_int32Array = {};

var hasRequiredEs_typedArray_int32Array;

function requireEs_typedArray_int32Array () {
	if (hasRequiredEs_typedArray_int32Array) return es_typedArray_int32Array;
	hasRequiredEs_typedArray_int32Array = 1;
	var createTypedArrayConstructor = requireTypedArrayConstructor();

	// `Int32Array` constructor
	// https://tc39.es/ecma262/#sec-typedarray-objects
	createTypedArrayConstructor('Int32', function (init) {
	  return function Int32Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});
	return es_typedArray_int32Array;
}

requireEs_typedArray_int32Array();

var es_typedArray_uint8Array = {};

var hasRequiredEs_typedArray_uint8Array;

function requireEs_typedArray_uint8Array () {
	if (hasRequiredEs_typedArray_uint8Array) return es_typedArray_uint8Array;
	hasRequiredEs_typedArray_uint8Array = 1;
	var createTypedArrayConstructor = requireTypedArrayConstructor();

	// `Uint8Array` constructor
	// https://tc39.es/ecma262/#sec-typedarray-objects
	createTypedArrayConstructor('Uint8', function (init) {
	  return function Uint8Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});
	return es_typedArray_uint8Array;
}

requireEs_typedArray_uint8Array();

var es_typedArray_uint8ClampedArray = {};

var hasRequiredEs_typedArray_uint8ClampedArray;

function requireEs_typedArray_uint8ClampedArray () {
	if (hasRequiredEs_typedArray_uint8ClampedArray) return es_typedArray_uint8ClampedArray;
	hasRequiredEs_typedArray_uint8ClampedArray = 1;
	var createTypedArrayConstructor = requireTypedArrayConstructor();

	// `Uint8ClampedArray` constructor
	// https://tc39.es/ecma262/#sec-typedarray-objects
	createTypedArrayConstructor('Uint8', function (init) {
	  return function Uint8ClampedArray(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	}, true);
	return es_typedArray_uint8ClampedArray;
}

requireEs_typedArray_uint8ClampedArray();

var es_typedArray_uint16Array = {};

var hasRequiredEs_typedArray_uint16Array;

function requireEs_typedArray_uint16Array () {
	if (hasRequiredEs_typedArray_uint16Array) return es_typedArray_uint16Array;
	hasRequiredEs_typedArray_uint16Array = 1;
	var createTypedArrayConstructor = requireTypedArrayConstructor();

	// `Uint16Array` constructor
	// https://tc39.es/ecma262/#sec-typedarray-objects
	createTypedArrayConstructor('Uint16', function (init) {
	  return function Uint16Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});
	return es_typedArray_uint16Array;
}

requireEs_typedArray_uint16Array();

var es_typedArray_uint32Array = {};

var hasRequiredEs_typedArray_uint32Array;

function requireEs_typedArray_uint32Array () {
	if (hasRequiredEs_typedArray_uint32Array) return es_typedArray_uint32Array;
	hasRequiredEs_typedArray_uint32Array = 1;
	var createTypedArrayConstructor = requireTypedArrayConstructor();

	// `Uint32Array` constructor
	// https://tc39.es/ecma262/#sec-typedarray-objects
	createTypedArrayConstructor('Uint32', function (init) {
	  return function Uint32Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});
	return es_typedArray_uint32Array;
}

requireEs_typedArray_uint32Array();

var es_typedArray_at = {};

var hasRequiredEs_typedArray_at;

function requireEs_typedArray_at () {
	if (hasRequiredEs_typedArray_at) return es_typedArray_at;
	hasRequiredEs_typedArray_at = 1;
	var ArrayBufferViewCore = requireArrayBufferViewCore();
	var lengthOfArrayLike = requireLengthOfArrayLike();
	var toIntegerOrInfinity = requireToIntegerOrInfinity();

	var aTypedArray = ArrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

	// `%TypedArray%.prototype.at` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.at
	exportTypedArrayMethod('at', function at(index) {
	  var O = aTypedArray(this);
	  var len = lengthOfArrayLike(O);
	  var relativeIndex = toIntegerOrInfinity(index);
	  var k = relativeIndex >= 0 ? relativeIndex : len + relativeIndex;
	  return (k < 0 || k >= len) ? undefined : O[k];
	});
	return es_typedArray_at;
}

requireEs_typedArray_at();

var es_typedArray_fill = {};

var hasRequiredEs_typedArray_fill;

function requireEs_typedArray_fill () {
	if (hasRequiredEs_typedArray_fill) return es_typedArray_fill;
	hasRequiredEs_typedArray_fill = 1;
	var ArrayBufferViewCore = requireArrayBufferViewCore();
	var $fill = requireArrayFill();
	var toBigInt = requireToBigInt();
	var classof = requireClassof();
	var call = requireFunctionCall();
	var uncurryThis = requireFunctionUncurryThis();
	var fails = requireFails();

	var aTypedArray = ArrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
	var slice = uncurryThis(''.slice);

	// V8 ~ Chrome < 59, Safari < 14.1, FF < 55, Edge <=18
	var CONVERSION_BUG = fails(function () {
	  var count = 0;
	  // eslint-disable-next-line es/no-typed-arrays -- safe
	  new Int8Array(2).fill({ valueOf: function () { return count++; } });
	  return count !== 1;
	});

	// `%TypedArray%.prototype.fill` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.fill
	exportTypedArrayMethod('fill', function fill(value /* , start, end */) {
	  var length = arguments.length;
	  aTypedArray(this);
	  var actualValue = slice(classof(this), 0, 3) === 'Big' ? toBigInt(value) : +value;
	  return call($fill, this, actualValue, length > 1 ? arguments[1] : undefined, length > 2 ? arguments[2] : undefined);
	}, CONVERSION_BUG);
	return es_typedArray_fill;
}

requireEs_typedArray_fill();

var es_typedArray_findLast = {};

var arrayIterationFromLast;
var hasRequiredArrayIterationFromLast;

function requireArrayIterationFromLast () {
	if (hasRequiredArrayIterationFromLast) return arrayIterationFromLast;
	hasRequiredArrayIterationFromLast = 1;
	var bind = requireFunctionBindContext();
	var IndexedObject = requireIndexedObject();
	var toObject = requireToObject();
	var lengthOfArrayLike = requireLengthOfArrayLike();

	// `Array.prototype.{ findLast, findLastIndex }` methods implementation
	var createMethod = function (TYPE) {
	  var IS_FIND_LAST_INDEX = TYPE === 1;
	  return function ($this, callbackfn, that) {
	    var O = toObject($this);
	    var self = IndexedObject(O);
	    var index = lengthOfArrayLike(self);
	    var boundFunction = bind(callbackfn, that);
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

	arrayIterationFromLast = {
	  // `Array.prototype.findLast` method
	  // https://github.com/tc39/proposal-array-find-from-last
	  findLast: createMethod(0),
	  // `Array.prototype.findLastIndex` method
	  // https://github.com/tc39/proposal-array-find-from-last
	  findLastIndex: createMethod(1)
	};
	return arrayIterationFromLast;
}

var hasRequiredEs_typedArray_findLast;

function requireEs_typedArray_findLast () {
	if (hasRequiredEs_typedArray_findLast) return es_typedArray_findLast;
	hasRequiredEs_typedArray_findLast = 1;
	var ArrayBufferViewCore = requireArrayBufferViewCore();
	var $findLast = requireArrayIterationFromLast().findLast;

	var aTypedArray = ArrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

	// `%TypedArray%.prototype.findLast` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.findlast
	exportTypedArrayMethod('findLast', function findLast(predicate /* , thisArg */) {
	  return $findLast(aTypedArray(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	});
	return es_typedArray_findLast;
}

requireEs_typedArray_findLast();

var es_typedArray_findLastIndex = {};

var hasRequiredEs_typedArray_findLastIndex;

function requireEs_typedArray_findLastIndex () {
	if (hasRequiredEs_typedArray_findLastIndex) return es_typedArray_findLastIndex;
	hasRequiredEs_typedArray_findLastIndex = 1;
	var ArrayBufferViewCore = requireArrayBufferViewCore();
	var $findLastIndex = requireArrayIterationFromLast().findLastIndex;

	var aTypedArray = ArrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

	// `%TypedArray%.prototype.findLastIndex` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.findlastindex
	exportTypedArrayMethod('findLastIndex', function findLastIndex(predicate /* , thisArg */) {
	  return $findLastIndex(aTypedArray(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	});
	return es_typedArray_findLastIndex;
}

requireEs_typedArray_findLastIndex();

var es_typedArray_set = {};

var hasRequiredEs_typedArray_set;

function requireEs_typedArray_set () {
	if (hasRequiredEs_typedArray_set) return es_typedArray_set;
	hasRequiredEs_typedArray_set = 1;
	var globalThis = requireGlobalThis();
	var call = requireFunctionCall();
	var ArrayBufferViewCore = requireArrayBufferViewCore();
	var lengthOfArrayLike = requireLengthOfArrayLike();
	var toOffset = requireToOffset();
	var toIndexedObject = requireToObject();
	var fails = requireFails();

	var RangeError = globalThis.RangeError;
	var Int8Array = globalThis.Int8Array;
	var Int8ArrayPrototype = Int8Array && Int8Array.prototype;
	var $set = Int8ArrayPrototype && Int8ArrayPrototype.set;
	var aTypedArray = ArrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

	var WORKS_WITH_OBJECTS_AND_GENERIC_ON_TYPED_ARRAYS = !fails(function () {
	  // eslint-disable-next-line es/no-typed-arrays -- required for testing
	  var array = new Uint8ClampedArray(2);
	  call($set, array, { length: 1, 0: 3 }, 1);
	  return array[1] !== 3;
	});

	// https://bugs.chromium.org/p/v8/issues/detail?id=11294 and other
	var TO_OBJECT_BUG = WORKS_WITH_OBJECTS_AND_GENERIC_ON_TYPED_ARRAYS && ArrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS && fails(function () {
	  var array = new Int8Array(2);
	  array.set(1);
	  array.set('2', 1);
	  return array[0] !== 0 || array[1] !== 2;
	});

	// `%TypedArray%.prototype.set` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.set
	exportTypedArrayMethod('set', function set(arrayLike /* , offset */) {
	  aTypedArray(this);
	  var offset = toOffset(arguments.length > 1 ? arguments[1] : undefined, 1);
	  var src = toIndexedObject(arrayLike);
	  if (WORKS_WITH_OBJECTS_AND_GENERIC_ON_TYPED_ARRAYS) return call($set, this, src, offset);
	  var length = this.length;
	  var len = lengthOfArrayLike(src);
	  var index = 0;
	  if (len + offset > length) throw new RangeError('Wrong length');
	  while (index < len) this[offset + index] = src[index++];
	}, !WORKS_WITH_OBJECTS_AND_GENERIC_ON_TYPED_ARRAYS || TO_OBJECT_BUG);
	return es_typedArray_set;
}

requireEs_typedArray_set();

var es_typedArray_sort = {};

var hasRequiredEs_typedArray_sort;

function requireEs_typedArray_sort () {
	if (hasRequiredEs_typedArray_sort) return es_typedArray_sort;
	hasRequiredEs_typedArray_sort = 1;
	var globalThis = requireGlobalThis();
	var uncurryThis = requireFunctionUncurryThisClause();
	var fails = requireFails();
	var aCallable = requireACallable();
	var internalSort = requireArraySort();
	var ArrayBufferViewCore = requireArrayBufferViewCore();
	var FF = requireEnvironmentFfVersion();
	var IE_OR_EDGE = requireEnvironmentIsIeOrEdge();
	var V8 = requireEnvironmentV8Version();
	var WEBKIT = requireEnvironmentWebkitVersion();

	var aTypedArray = ArrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
	var Uint16Array = globalThis.Uint16Array;
	var nativeSort = Uint16Array && uncurryThis(Uint16Array.prototype.sort);

	// WebKit
	var ACCEPT_INCORRECT_ARGUMENTS = !!nativeSort && !(fails(function () {
	  nativeSort(new Uint16Array(2), null);
	}) && fails(function () {
	  nativeSort(new Uint16Array(2), {});
	}));

	var STABLE_SORT = !!nativeSort && !fails(function () {
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
	exportTypedArrayMethod('sort', function sort(comparefn) {
	  if (comparefn !== undefined) aCallable(comparefn);
	  if (STABLE_SORT) return nativeSort(this, comparefn);

	  return internalSort(aTypedArray(this), getSortCompare(comparefn));
	}, !STABLE_SORT || ACCEPT_INCORRECT_ARGUMENTS);
	return es_typedArray_sort;
}

requireEs_typedArray_sort();

var es_typedArray_toReversed = {};

var arrayToReversed;
var hasRequiredArrayToReversed;

function requireArrayToReversed () {
	if (hasRequiredArrayToReversed) return arrayToReversed;
	hasRequiredArrayToReversed = 1;
	var lengthOfArrayLike = requireLengthOfArrayLike();

	// https://tc39.es/proposal-change-array-by-copy/#sec-array.prototype.toReversed
	// https://tc39.es/proposal-change-array-by-copy/#sec-%typedarray%.prototype.toReversed
	arrayToReversed = function (O, C) {
	  var len = lengthOfArrayLike(O);
	  var A = new C(len);
	  var k = 0;
	  for (; k < len; k++) A[k] = O[len - k - 1];
	  return A;
	};
	return arrayToReversed;
}

var hasRequiredEs_typedArray_toReversed;

function requireEs_typedArray_toReversed () {
	if (hasRequiredEs_typedArray_toReversed) return es_typedArray_toReversed;
	hasRequiredEs_typedArray_toReversed = 1;
	var arrayToReversed = requireArrayToReversed();
	var ArrayBufferViewCore = requireArrayBufferViewCore();

	var aTypedArray = ArrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
	var getTypedArrayConstructor = ArrayBufferViewCore.getTypedArrayConstructor;

	// `%TypedArray%.prototype.toReversed` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.toreversed
	exportTypedArrayMethod('toReversed', function toReversed() {
	  return arrayToReversed(aTypedArray(this), getTypedArrayConstructor(this));
	});
	return es_typedArray_toReversed;
}

requireEs_typedArray_toReversed();

var es_typedArray_toSorted = {};

var hasRequiredEs_typedArray_toSorted;

function requireEs_typedArray_toSorted () {
	if (hasRequiredEs_typedArray_toSorted) return es_typedArray_toSorted;
	hasRequiredEs_typedArray_toSorted = 1;
	var ArrayBufferViewCore = requireArrayBufferViewCore();
	var uncurryThis = requireFunctionUncurryThis();
	var aCallable = requireACallable();
	var arrayFromConstructorAndList = requireArrayFromConstructorAndList();

	var aTypedArray = ArrayBufferViewCore.aTypedArray;
	var getTypedArrayConstructor = ArrayBufferViewCore.getTypedArrayConstructor;
	var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
	var sort = uncurryThis(ArrayBufferViewCore.TypedArrayPrototype.sort);

	// `%TypedArray%.prototype.toSorted` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.tosorted
	exportTypedArrayMethod('toSorted', function toSorted(compareFn) {
	  if (compareFn !== undefined) aCallable(compareFn);
	  var O = aTypedArray(this);
	  var A = arrayFromConstructorAndList(getTypedArrayConstructor(O), O);
	  return sort(A, compareFn);
	});
	return es_typedArray_toSorted;
}

requireEs_typedArray_toSorted();

var es_typedArray_with = {};

var arrayWith;
var hasRequiredArrayWith;

function requireArrayWith () {
	if (hasRequiredArrayWith) return arrayWith;
	hasRequiredArrayWith = 1;
	var lengthOfArrayLike = requireLengthOfArrayLike();
	var toIntegerOrInfinity = requireToIntegerOrInfinity();

	var $RangeError = RangeError;

	// https://tc39.es/proposal-change-array-by-copy/#sec-array.prototype.with
	// https://tc39.es/proposal-change-array-by-copy/#sec-%typedarray%.prototype.with
	arrayWith = function (O, C, index, value) {
	  var len = lengthOfArrayLike(O);
	  var relativeIndex = toIntegerOrInfinity(index);
	  var actualIndex = relativeIndex < 0 ? len + relativeIndex : relativeIndex;
	  if (actualIndex >= len || actualIndex < 0) throw new $RangeError('Incorrect index');
	  var A = new C(len);
	  var k = 0;
	  for (; k < len; k++) A[k] = k === actualIndex ? value : O[k];
	  return A;
	};
	return arrayWith;
}

var hasRequiredEs_typedArray_with;

function requireEs_typedArray_with () {
	if (hasRequiredEs_typedArray_with) return es_typedArray_with;
	hasRequiredEs_typedArray_with = 1;
	var arrayWith = requireArrayWith();
	var ArrayBufferViewCore = requireArrayBufferViewCore();
	var isBigIntArray = requireIsBigIntArray();
	var toIntegerOrInfinity = requireToIntegerOrInfinity();
	var toBigInt = requireToBigInt();

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
	return es_typedArray_with;
}

requireEs_typedArray_with();

var esnext_iterator_constructor = {};

var es_iterator_constructor = {};

var createProperty;
var hasRequiredCreateProperty;

function requireCreateProperty () {
	if (hasRequiredCreateProperty) return createProperty;
	hasRequiredCreateProperty = 1;
	var DESCRIPTORS = requireDescriptors();
	var definePropertyModule = requireObjectDefineProperty();
	var createPropertyDescriptor = requireCreatePropertyDescriptor();

	createProperty = function (object, key, value) {
	  if (DESCRIPTORS) definePropertyModule.f(object, key, createPropertyDescriptor(0, value));
	  else object[key] = value;
	};
	return createProperty;
}

var hasRequiredEs_iterator_constructor;

function requireEs_iterator_constructor () {
	if (hasRequiredEs_iterator_constructor) return es_iterator_constructor;
	hasRequiredEs_iterator_constructor = 1;
	var $ = require_export();
	var globalThis = requireGlobalThis();
	var anInstance = requireAnInstance();
	var anObject = requireAnObject();
	var isCallable = requireIsCallable();
	var getPrototypeOf = requireObjectGetPrototypeOf();
	var defineBuiltInAccessor = requireDefineBuiltInAccessor();
	var createProperty = requireCreateProperty();
	var fails = requireFails();
	var hasOwn = requireHasOwnProperty();
	var wellKnownSymbol = requireWellKnownSymbol();
	var IteratorPrototype = requireIteratorsCore().IteratorPrototype;
	var DESCRIPTORS = requireDescriptors();
	var IS_PURE = requireIsPure();

	var CONSTRUCTOR = 'constructor';
	var ITERATOR = 'Iterator';
	var TO_STRING_TAG = wellKnownSymbol('toStringTag');

	var $TypeError = TypeError;
	var NativeIterator = globalThis[ITERATOR];

	// FF56- have non-standard global helper `Iterator`
	var FORCED = IS_PURE
	  || !isCallable(NativeIterator)
	  || NativeIterator.prototype !== IteratorPrototype
	  // FF44- non-standard `Iterator` passes previous tests
	  || !fails(function () { NativeIterator({}); });

	var IteratorConstructor = function Iterator() {
	  anInstance(this, IteratorPrototype);
	  if (getPrototypeOf(this) === IteratorPrototype) throw new $TypeError('Abstract class Iterator not directly constructable');
	};

	var defineIteratorPrototypeAccessor = function (key, value) {
	  if (DESCRIPTORS) {
	    defineBuiltInAccessor(IteratorPrototype, key, {
	      configurable: true,
	      get: function () {
	        return value;
	      },
	      set: function (replacement) {
	        anObject(this);
	        if (this === IteratorPrototype) throw new $TypeError("You can't redefine this property");
	        if (hasOwn(this, key)) this[key] = replacement;
	        else createProperty(this, key, replacement);
	      }
	    });
	  } else IteratorPrototype[key] = value;
	};

	if (!hasOwn(IteratorPrototype, TO_STRING_TAG)) defineIteratorPrototypeAccessor(TO_STRING_TAG, ITERATOR);

	if (FORCED || !hasOwn(IteratorPrototype, CONSTRUCTOR) || IteratorPrototype[CONSTRUCTOR] === Object) {
	  defineIteratorPrototypeAccessor(CONSTRUCTOR, IteratorConstructor);
	}

	IteratorConstructor.prototype = IteratorPrototype;

	// `Iterator` constructor
	// https://tc39.es/ecma262/#sec-iterator
	$({ global: true, constructor: true, forced: FORCED }, {
	  Iterator: IteratorConstructor
	});
	return es_iterator_constructor;
}

var hasRequiredEsnext_iterator_constructor;

function requireEsnext_iterator_constructor () {
	if (hasRequiredEsnext_iterator_constructor) return esnext_iterator_constructor;
	hasRequiredEsnext_iterator_constructor = 1;
	// TODO: Remove from `core-js@4`
	requireEs_iterator_constructor();
	return esnext_iterator_constructor;
}

requireEsnext_iterator_constructor();

var esnext_iterator_every = {};

var es_iterator_every = {};

var hasRequiredEs_iterator_every;

function requireEs_iterator_every () {
	if (hasRequiredEs_iterator_every) return es_iterator_every;
	hasRequiredEs_iterator_every = 1;
	var $ = require_export();
	var iterate = requireIterate();
	var aCallable = requireACallable();
	var anObject = requireAnObject();
	var getIteratorDirect = requireGetIteratorDirect();

	// `Iterator.prototype.every` method
	// https://tc39.es/ecma262/#sec-iterator.prototype.every
	$({ target: 'Iterator', proto: true, real: true }, {
	  every: function every(predicate) {
	    anObject(this);
	    aCallable(predicate);
	    var record = getIteratorDirect(this);
	    var counter = 0;
	    return !iterate(record, function (value, stop) {
	      if (!predicate(value, counter++)) return stop();
	    }, { IS_RECORD: true, INTERRUPTED: true }).stopped;
	  }
	});
	return es_iterator_every;
}

var hasRequiredEsnext_iterator_every;

function requireEsnext_iterator_every () {
	if (hasRequiredEsnext_iterator_every) return esnext_iterator_every;
	hasRequiredEsnext_iterator_every = 1;
	// TODO: Remove from `core-js@4`
	requireEs_iterator_every();
	return esnext_iterator_every;
}

requireEsnext_iterator_every();

var esnext_iterator_filter = {};

var es_iterator_filter = {};

var iteratorCreateProxy;
var hasRequiredIteratorCreateProxy;

function requireIteratorCreateProxy () {
	if (hasRequiredIteratorCreateProxy) return iteratorCreateProxy;
	hasRequiredIteratorCreateProxy = 1;
	var call = requireFunctionCall();
	var create = requireObjectCreate();
	var createNonEnumerableProperty = requireCreateNonEnumerableProperty();
	var defineBuiltIns = requireDefineBuiltIns();
	var wellKnownSymbol = requireWellKnownSymbol();
	var InternalStateModule = requireInternalState();
	var getMethod = requireGetMethod();
	var IteratorPrototype = requireIteratorsCore().IteratorPrototype;
	var createIterResultObject = requireCreateIterResultObject();
	var iteratorClose = requireIteratorClose();

	var TO_STRING_TAG = wellKnownSymbol('toStringTag');
	var ITERATOR_HELPER = 'IteratorHelper';
	var WRAP_FOR_VALID_ITERATOR = 'WrapForValidIterator';
	var setInternalState = InternalStateModule.set;

	var createIteratorProxyPrototype = function (IS_ITERATOR) {
	  var getInternalState = InternalStateModule.getterFor(IS_ITERATOR ? WRAP_FOR_VALID_ITERATOR : ITERATOR_HELPER);

	  return defineBuiltIns(create(IteratorPrototype), {
	    next: function next() {
	      var state = getInternalState(this);
	      // for simplification:
	      //   for `%WrapForValidIteratorPrototype%.next` our `nextHandler` returns `IterResultObject`
	      //   for `%IteratorHelperPrototype%.next` - just a value
	      if (IS_ITERATOR) return state.nextHandler();
	      try {
	        var result = state.done ? undefined : state.nextHandler();
	        return createIterResultObject(result, state.done);
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
	        return returnMethod ? call(returnMethod, iterator) : createIterResultObject(undefined, true);
	      }
	      if (state.inner) try {
	        iteratorClose(state.inner.iterator, 'normal');
	      } catch (error) {
	        return iteratorClose(iterator, 'throw', error);
	      }
	      if (iterator) iteratorClose(iterator, 'normal');
	      return createIterResultObject(undefined, true);
	    }
	  });
	};

	var WrapForValidIteratorPrototype = createIteratorProxyPrototype(true);
	var IteratorHelperPrototype = createIteratorProxyPrototype(false);

	createNonEnumerableProperty(IteratorHelperPrototype, TO_STRING_TAG, 'Iterator Helper');

	iteratorCreateProxy = function (nextHandler, IS_ITERATOR) {
	  var IteratorProxy = function Iterator(record, state) {
	    if (state) {
	      state.iterator = record.iterator;
	      state.next = record.next;
	    } else state = record;
	    state.type = IS_ITERATOR ? WRAP_FOR_VALID_ITERATOR : ITERATOR_HELPER;
	    state.nextHandler = nextHandler;
	    state.counter = 0;
	    state.done = false;
	    setInternalState(this, state);
	  };

	  IteratorProxy.prototype = IS_ITERATOR ? WrapForValidIteratorPrototype : IteratorHelperPrototype;

	  return IteratorProxy;
	};
	return iteratorCreateProxy;
}

var callWithSafeIterationClosing;
var hasRequiredCallWithSafeIterationClosing;

function requireCallWithSafeIterationClosing () {
	if (hasRequiredCallWithSafeIterationClosing) return callWithSafeIterationClosing;
	hasRequiredCallWithSafeIterationClosing = 1;
	var anObject = requireAnObject();
	var iteratorClose = requireIteratorClose();

	// call something on iterator step with safe closing on error
	callWithSafeIterationClosing = function (iterator, fn, value, ENTRIES) {
	  try {
	    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
	  } catch (error) {
	    iteratorClose(iterator, 'throw', error);
	  }
	};
	return callWithSafeIterationClosing;
}

var hasRequiredEs_iterator_filter;

function requireEs_iterator_filter () {
	if (hasRequiredEs_iterator_filter) return es_iterator_filter;
	hasRequiredEs_iterator_filter = 1;
	var $ = require_export();
	var call = requireFunctionCall();
	var aCallable = requireACallable();
	var anObject = requireAnObject();
	var getIteratorDirect = requireGetIteratorDirect();
	var createIteratorProxy = requireIteratorCreateProxy();
	var callWithSafeIterationClosing = requireCallWithSafeIterationClosing();
	var IS_PURE = requireIsPure();

	var IteratorProxy = createIteratorProxy(function () {
	  var iterator = this.iterator;
	  var predicate = this.predicate;
	  var next = this.next;
	  var result, done, value;
	  while (true) {
	    result = anObject(call(next, iterator));
	    done = this.done = !!result.done;
	    if (done) return;
	    value = result.value;
	    if (callWithSafeIterationClosing(iterator, predicate, [value, this.counter++], true)) return value;
	  }
	});

	// `Iterator.prototype.filter` method
	// https://tc39.es/ecma262/#sec-iterator.prototype.filter
	$({ target: 'Iterator', proto: true, real: true, forced: IS_PURE }, {
	  filter: function filter(predicate) {
	    anObject(this);
	    aCallable(predicate);
	    return new IteratorProxy(getIteratorDirect(this), {
	      predicate: predicate
	    });
	  }
	});
	return es_iterator_filter;
}

var hasRequiredEsnext_iterator_filter;

function requireEsnext_iterator_filter () {
	if (hasRequiredEsnext_iterator_filter) return esnext_iterator_filter;
	hasRequiredEsnext_iterator_filter = 1;
	// TODO: Remove from `core-js@4`
	requireEs_iterator_filter();
	return esnext_iterator_filter;
}

requireEsnext_iterator_filter();

var esnext_iterator_find = {};

var es_iterator_find = {};

var hasRequiredEs_iterator_find;

function requireEs_iterator_find () {
	if (hasRequiredEs_iterator_find) return es_iterator_find;
	hasRequiredEs_iterator_find = 1;
	var $ = require_export();
	var iterate = requireIterate();
	var aCallable = requireACallable();
	var anObject = requireAnObject();
	var getIteratorDirect = requireGetIteratorDirect();

	// `Iterator.prototype.find` method
	// https://tc39.es/ecma262/#sec-iterator.prototype.find
	$({ target: 'Iterator', proto: true, real: true }, {
	  find: function find(predicate) {
	    anObject(this);
	    aCallable(predicate);
	    var record = getIteratorDirect(this);
	    var counter = 0;
	    return iterate(record, function (value, stop) {
	      if (predicate(value, counter++)) return stop(value);
	    }, { IS_RECORD: true, INTERRUPTED: true }).result;
	  }
	});
	return es_iterator_find;
}

var hasRequiredEsnext_iterator_find;

function requireEsnext_iterator_find () {
	if (hasRequiredEsnext_iterator_find) return esnext_iterator_find;
	hasRequiredEsnext_iterator_find = 1;
	// TODO: Remove from `core-js@4`
	requireEs_iterator_find();
	return esnext_iterator_find;
}

requireEsnext_iterator_find();

var esnext_iterator_forEach = {};

var es_iterator_forEach = {};

var hasRequiredEs_iterator_forEach;

function requireEs_iterator_forEach () {
	if (hasRequiredEs_iterator_forEach) return es_iterator_forEach;
	hasRequiredEs_iterator_forEach = 1;
	var $ = require_export();
	var iterate = requireIterate();
	var aCallable = requireACallable();
	var anObject = requireAnObject();
	var getIteratorDirect = requireGetIteratorDirect();

	// `Iterator.prototype.forEach` method
	// https://tc39.es/ecma262/#sec-iterator.prototype.foreach
	$({ target: 'Iterator', proto: true, real: true }, {
	  forEach: function forEach(fn) {
	    anObject(this);
	    aCallable(fn);
	    var record = getIteratorDirect(this);
	    var counter = 0;
	    iterate(record, function (value) {
	      fn(value, counter++);
	    }, { IS_RECORD: true });
	  }
	});
	return es_iterator_forEach;
}

var hasRequiredEsnext_iterator_forEach;

function requireEsnext_iterator_forEach () {
	if (hasRequiredEsnext_iterator_forEach) return esnext_iterator_forEach;
	hasRequiredEsnext_iterator_forEach = 1;
	// TODO: Remove from `core-js@4`
	requireEs_iterator_forEach();
	return esnext_iterator_forEach;
}

requireEsnext_iterator_forEach();

var esnext_iterator_map = {};

var es_iterator_map = {};

var iteratorMap;
var hasRequiredIteratorMap;

function requireIteratorMap () {
	if (hasRequiredIteratorMap) return iteratorMap;
	hasRequiredIteratorMap = 1;
	var call = requireFunctionCall();
	var aCallable = requireACallable();
	var anObject = requireAnObject();
	var getIteratorDirect = requireGetIteratorDirect();
	var createIteratorProxy = requireIteratorCreateProxy();
	var callWithSafeIterationClosing = requireCallWithSafeIterationClosing();

	var IteratorProxy = createIteratorProxy(function () {
	  var iterator = this.iterator;
	  var result = anObject(call(this.next, iterator));
	  var done = this.done = !!result.done;
	  if (!done) return callWithSafeIterationClosing(iterator, this.mapper, [result.value, this.counter++], true);
	});

	// `Iterator.prototype.map` method
	// https://github.com/tc39/proposal-iterator-helpers
	iteratorMap = function map(mapper) {
	  anObject(this);
	  aCallable(mapper);
	  return new IteratorProxy(getIteratorDirect(this), {
	    mapper: mapper
	  });
	};
	return iteratorMap;
}

var hasRequiredEs_iterator_map;

function requireEs_iterator_map () {
	if (hasRequiredEs_iterator_map) return es_iterator_map;
	hasRequiredEs_iterator_map = 1;
	var $ = require_export();
	var map = requireIteratorMap();
	var IS_PURE = requireIsPure();

	// `Iterator.prototype.map` method
	// https://tc39.es/ecma262/#sec-iterator.prototype.map
	$({ target: 'Iterator', proto: true, real: true, forced: IS_PURE }, {
	  map: map
	});
	return es_iterator_map;
}

var hasRequiredEsnext_iterator_map;

function requireEsnext_iterator_map () {
	if (hasRequiredEsnext_iterator_map) return esnext_iterator_map;
	hasRequiredEsnext_iterator_map = 1;
	// TODO: Remove from `core-js@4`
	requireEs_iterator_map();
	return esnext_iterator_map;
}

requireEsnext_iterator_map();

var esnext_iterator_reduce = {};

var es_iterator_reduce = {};

var hasRequiredEs_iterator_reduce;

function requireEs_iterator_reduce () {
	if (hasRequiredEs_iterator_reduce) return es_iterator_reduce;
	hasRequiredEs_iterator_reduce = 1;
	var $ = require_export();
	var iterate = requireIterate();
	var aCallable = requireACallable();
	var anObject = requireAnObject();
	var getIteratorDirect = requireGetIteratorDirect();

	var $TypeError = TypeError;

	// `Iterator.prototype.reduce` method
	// https://tc39.es/ecma262/#sec-iterator.prototype.reduce
	$({ target: 'Iterator', proto: true, real: true }, {
	  reduce: function reduce(reducer /* , initialValue */) {
	    anObject(this);
	    aCallable(reducer);
	    var record = getIteratorDirect(this);
	    var noInitial = arguments.length < 2;
	    var accumulator = noInitial ? undefined : arguments[1];
	    var counter = 0;
	    iterate(record, function (value) {
	      if (noInitial) {
	        noInitial = false;
	        accumulator = value;
	      } else {
	        accumulator = reducer(accumulator, value, counter);
	      }
	      counter++;
	    }, { IS_RECORD: true });
	    if (noInitial) throw new $TypeError('Reduce of empty iterator with no initial value');
	    return accumulator;
	  }
	});
	return es_iterator_reduce;
}

var hasRequiredEsnext_iterator_reduce;

function requireEsnext_iterator_reduce () {
	if (hasRequiredEsnext_iterator_reduce) return esnext_iterator_reduce;
	hasRequiredEsnext_iterator_reduce = 1;
	// TODO: Remove from `core-js@4`
	requireEs_iterator_reduce();
	return esnext_iterator_reduce;
}

requireEsnext_iterator_reduce();

var esnext_iterator_some = {};

var es_iterator_some = {};

var hasRequiredEs_iterator_some;

function requireEs_iterator_some () {
	if (hasRequiredEs_iterator_some) return es_iterator_some;
	hasRequiredEs_iterator_some = 1;
	var $ = require_export();
	var iterate = requireIterate();
	var aCallable = requireACallable();
	var anObject = requireAnObject();
	var getIteratorDirect = requireGetIteratorDirect();

	// `Iterator.prototype.some` method
	// https://tc39.es/ecma262/#sec-iterator.prototype.some
	$({ target: 'Iterator', proto: true, real: true }, {
	  some: function some(predicate) {
	    anObject(this);
	    aCallable(predicate);
	    var record = getIteratorDirect(this);
	    var counter = 0;
	    return iterate(record, function (value, stop) {
	      if (predicate(value, counter++)) return stop();
	    }, { IS_RECORD: true, INTERRUPTED: true }).stopped;
	  }
	});
	return es_iterator_some;
}

var hasRequiredEsnext_iterator_some;

function requireEsnext_iterator_some () {
	if (hasRequiredEsnext_iterator_some) return esnext_iterator_some;
	hasRequiredEsnext_iterator_some = 1;
	// TODO: Remove from `core-js@4`
	requireEs_iterator_some();
	return esnext_iterator_some;
}

requireEsnext_iterator_some();

var esnext_iterator_toArray = {};

var es_iterator_toArray = {};

var hasRequiredEs_iterator_toArray;

function requireEs_iterator_toArray () {
	if (hasRequiredEs_iterator_toArray) return es_iterator_toArray;
	hasRequiredEs_iterator_toArray = 1;
	var $ = require_export();
	var anObject = requireAnObject();
	var iterate = requireIterate();
	var getIteratorDirect = requireGetIteratorDirect();

	var push = [].push;

	// `Iterator.prototype.toArray` method
	// https://tc39.es/ecma262/#sec-iterator.prototype.toarray
	$({ target: 'Iterator', proto: true, real: true }, {
	  toArray: function toArray() {
	    var result = [];
	    iterate(getIteratorDirect(anObject(this)), push, { that: result, IS_RECORD: true });
	    return result;
	  }
	});
	return es_iterator_toArray;
}

var hasRequiredEsnext_iterator_toArray;

function requireEsnext_iterator_toArray () {
	if (hasRequiredEsnext_iterator_toArray) return esnext_iterator_toArray;
	hasRequiredEsnext_iterator_toArray = 1;
	// TODO: Remove from `core-js@4`
	requireEs_iterator_toArray();
	return esnext_iterator_toArray;
}

requireEsnext_iterator_toArray();

var web_domCollections_iterator = {};

var domIterables;
var hasRequiredDomIterables;

function requireDomIterables () {
	if (hasRequiredDomIterables) return domIterables;
	hasRequiredDomIterables = 1;
	// iterable DOM collections
	// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
	domIterables = {
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
	return domIterables;
}

var domTokenListPrototype;
var hasRequiredDomTokenListPrototype;

function requireDomTokenListPrototype () {
	if (hasRequiredDomTokenListPrototype) return domTokenListPrototype;
	hasRequiredDomTokenListPrototype = 1;
	// in old WebKit versions, `element.classList` is not an instance of global `DOMTokenList`
	var documentCreateElement = requireDocumentCreateElement();

	var classList = documentCreateElement('span').classList;
	var DOMTokenListPrototype = classList && classList.constructor && classList.constructor.prototype;

	domTokenListPrototype = DOMTokenListPrototype === Object.prototype ? undefined : DOMTokenListPrototype;
	return domTokenListPrototype;
}

var hasRequiredWeb_domCollections_iterator;

function requireWeb_domCollections_iterator () {
	if (hasRequiredWeb_domCollections_iterator) return web_domCollections_iterator;
	hasRequiredWeb_domCollections_iterator = 1;
	var globalThis = requireGlobalThis();
	var DOMIterables = requireDomIterables();
	var DOMTokenListPrototype = requireDomTokenListPrototype();
	var ArrayIteratorMethods = requireEs_array_iterator();
	var createNonEnumerableProperty = requireCreateNonEnumerableProperty();
	var setToStringTag = requireSetToStringTag();
	var wellKnownSymbol = requireWellKnownSymbol();

	var ITERATOR = wellKnownSymbol('iterator');
	var ArrayValues = ArrayIteratorMethods.values;

	var handlePrototype = function (CollectionPrototype, COLLECTION_NAME) {
	  if (CollectionPrototype) {
	    // some Chrome versions have non-configurable methods on DOMTokenList
	    if (CollectionPrototype[ITERATOR] !== ArrayValues) try {
	      createNonEnumerableProperty(CollectionPrototype, ITERATOR, ArrayValues);
	    } catch (error) {
	      CollectionPrototype[ITERATOR] = ArrayValues;
	    }
	    setToStringTag(CollectionPrototype, COLLECTION_NAME, true);
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
	  handlePrototype(globalThis[COLLECTION_NAME] && globalThis[COLLECTION_NAME].prototype, COLLECTION_NAME);
	}

	handlePrototype(DOMTokenListPrototype, 'DOMTokenList');
	return web_domCollections_iterator;
}

requireWeb_domCollections_iterator();

var web_queueMicrotask = {};

var hasRequiredWeb_queueMicrotask;

function requireWeb_queueMicrotask () {
	if (hasRequiredWeb_queueMicrotask) return web_queueMicrotask;
	hasRequiredWeb_queueMicrotask = 1;
	var $ = require_export();
	var globalThis = requireGlobalThis();
	var microtask = requireMicrotask();
	var aCallable = requireACallable();
	var validateArgumentsLength = requireValidateArgumentsLength();
	var fails = requireFails();
	var DESCRIPTORS = requireDescriptors();

	// Bun ~ 1.0.30 bug
	// https://github.com/oven-sh/bun/issues/9249
	var WRONG_ARITY = fails(function () {
	  // getOwnPropertyDescriptor for prevent experimental warning in Node 11
	  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	  return DESCRIPTORS && Object.getOwnPropertyDescriptor(globalThis, 'queueMicrotask').value.length !== 1;
	});

	// `queueMicrotask` method
	// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-queuemicrotask
	$({ global: true, enumerable: true, dontCallGetSet: true, forced: WRONG_ARITY }, {
	  queueMicrotask: function queueMicrotask(fn) {
	    validateArgumentsLength(arguments.length, 1);
	    microtask(aCallable(fn));
	  }
	});
	return web_queueMicrotask;
}

requireWeb_queueMicrotask();

var web_self = {};

var hasRequiredWeb_self;

function requireWeb_self () {
	if (hasRequiredWeb_self) return web_self;
	hasRequiredWeb_self = 1;
	var $ = require_export();
	var globalThis = requireGlobalThis();
	var defineBuiltInAccessor = requireDefineBuiltInAccessor();
	var DESCRIPTORS = requireDescriptors();

	var $TypeError = TypeError;
	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var defineProperty = Object.defineProperty;
	var INCORRECT_VALUE = globalThis.self !== globalThis;

	// `self` getter
	// https://html.spec.whatwg.org/multipage/window-object.html#dom-self
	try {
	  if (DESCRIPTORS) {
	    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	    var descriptor = Object.getOwnPropertyDescriptor(globalThis, 'self');
	    // some engines have `self`, but with incorrect descriptor
	    // https://github.com/denoland/deno/issues/15765
	    if (INCORRECT_VALUE || !descriptor || !descriptor.get || !descriptor.enumerable) {
	      defineBuiltInAccessor(globalThis, 'self', {
	        get: function self() {
	          return globalThis;
	        },
	        set: function self(value) {
	          if (this !== globalThis) throw new $TypeError('Illegal invocation');
	          defineProperty(globalThis, 'self', {
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
	  } else $({ global: true, simple: true, forced: INCORRECT_VALUE }, {
	    self: globalThis
	  });
	} catch (error) { /* empty */ }
	return web_self;
}

requireWeb_self();

var web_url = {};

var web_url_constructor = {};

var es_string_iterator = {};

var hasRequiredEs_string_iterator;

function requireEs_string_iterator () {
	if (hasRequiredEs_string_iterator) return es_string_iterator;
	hasRequiredEs_string_iterator = 1;
	var charAt = requireStringMultibyte().charAt;
	var toString = requireToString();
	var InternalStateModule = requireInternalState();
	var defineIterator = requireIteratorDefine();
	var createIterResultObject = requireCreateIterResultObject();

	var STRING_ITERATOR = 'String Iterator';
	var setInternalState = InternalStateModule.set;
	var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);

	// `String.prototype[@@iterator]` method
	// https://tc39.es/ecma262/#sec-string.prototype-@@iterator
	defineIterator(String, 'String', function (iterated) {
	  setInternalState(this, {
	    type: STRING_ITERATOR,
	    string: toString(iterated),
	    index: 0
	  });
	// `%StringIteratorPrototype%.next` method
	// https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
	}, function next() {
	  var state = getInternalState(this);
	  var string = state.string;
	  var index = state.index;
	  var point;
	  if (index >= string.length) return createIterResultObject(undefined, true);
	  point = charAt(string, index);
	  state.index += point.length;
	  return createIterResultObject(point, false);
	});
	return es_string_iterator;
}

var urlConstructorDetection;
var hasRequiredUrlConstructorDetection;

function requireUrlConstructorDetection () {
	if (hasRequiredUrlConstructorDetection) return urlConstructorDetection;
	hasRequiredUrlConstructorDetection = 1;
	var fails = requireFails();
	var wellKnownSymbol = requireWellKnownSymbol();
	var DESCRIPTORS = requireDescriptors();
	var IS_PURE = requireIsPure();

	var ITERATOR = wellKnownSymbol('iterator');

	urlConstructorDetection = !fails(function () {
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
	    || (!params.size && (IS_PURE || !DESCRIPTORS))
	    || !params.sort
	    || url.href !== 'https://a/c%20d?a=1&c=3'
	    || params.get('c') !== '3'
	    || String(new URLSearchParams('?a=1')) !== 'a=1'
	    || !params[ITERATOR]
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
	return urlConstructorDetection;
}

var objectAssign;
var hasRequiredObjectAssign;

function requireObjectAssign () {
	if (hasRequiredObjectAssign) return objectAssign;
	hasRequiredObjectAssign = 1;
	var DESCRIPTORS = requireDescriptors();
	var uncurryThis = requireFunctionUncurryThis();
	var call = requireFunctionCall();
	var fails = requireFails();
	var objectKeys = requireObjectKeys();
	var getOwnPropertySymbolsModule = requireObjectGetOwnPropertySymbols();
	var propertyIsEnumerableModule = requireObjectPropertyIsEnumerable();
	var toObject = requireToObject();
	var IndexedObject = requireIndexedObject();

	// eslint-disable-next-line es/no-object-assign -- safe
	var $assign = Object.assign;
	// eslint-disable-next-line es/no-object-defineproperty -- required for testing
	var defineProperty = Object.defineProperty;
	var concat = uncurryThis([].concat);

	// `Object.assign` method
	// https://tc39.es/ecma262/#sec-object.assign
	objectAssign = !$assign || fails(function () {
	  // should have correct order of operations (Edge bug)
	  if (DESCRIPTORS && $assign({ b: 1 }, $assign(defineProperty({}, 'a', {
	    enumerable: true,
	    get: function () {
	      defineProperty(this, 'b', {
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
	  return $assign({}, A)[symbol] !== 7 || objectKeys($assign({}, B)).join('') !== alphabet;
	}) ? function assign(target, source) { // eslint-disable-line no-unused-vars -- required for `.length`
	  var T = toObject(target);
	  var argumentsLength = arguments.length;
	  var index = 1;
	  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
	  var propertyIsEnumerable = propertyIsEnumerableModule.f;
	  while (argumentsLength > index) {
	    var S = IndexedObject(arguments[index++]);
	    var keys = getOwnPropertySymbols ? concat(objectKeys(S), getOwnPropertySymbols(S)) : objectKeys(S);
	    var length = keys.length;
	    var j = 0;
	    var key;
	    while (length > j) {
	      key = keys[j++];
	      if (!DESCRIPTORS || call(propertyIsEnumerable, S, key)) T[key] = S[key];
	    }
	  } return T;
	} : $assign;
	return objectAssign;
}

var arrayFrom;
var hasRequiredArrayFrom;

function requireArrayFrom () {
	if (hasRequiredArrayFrom) return arrayFrom;
	hasRequiredArrayFrom = 1;
	var bind = requireFunctionBindContext();
	var call = requireFunctionCall();
	var toObject = requireToObject();
	var callWithSafeIterationClosing = requireCallWithSafeIterationClosing();
	var isArrayIteratorMethod = requireIsArrayIteratorMethod();
	var isConstructor = requireIsConstructor();
	var lengthOfArrayLike = requireLengthOfArrayLike();
	var createProperty = requireCreateProperty();
	var getIterator = requireGetIterator();
	var getIteratorMethod = requireGetIteratorMethod();

	var $Array = Array;

	// `Array.from` method implementation
	// https://tc39.es/ecma262/#sec-array.from
	arrayFrom = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
	  var O = toObject(arrayLike);
	  var IS_CONSTRUCTOR = isConstructor(this);
	  var argumentsLength = arguments.length;
	  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
	  var mapping = mapfn !== undefined;
	  if (mapping) mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : undefined);
	  var iteratorMethod = getIteratorMethod(O);
	  var index = 0;
	  var length, result, step, iterator, next, value;
	  // if the target is not iterable or it's an array with the default iterator - use a simple case
	  if (iteratorMethod && !(this === $Array && isArrayIteratorMethod(iteratorMethod))) {
	    result = IS_CONSTRUCTOR ? new this() : [];
	    iterator = getIterator(O, iteratorMethod);
	    next = iterator.next;
	    for (;!(step = call(next, iterator)).done; index++) {
	      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
	      createProperty(result, index, value);
	    }
	  } else {
	    length = lengthOfArrayLike(O);
	    result = IS_CONSTRUCTOR ? new this(length) : $Array(length);
	    for (;length > index; index++) {
	      value = mapping ? mapfn(O[index], index) : O[index];
	      createProperty(result, index, value);
	    }
	  }
	  result.length = index;
	  return result;
	};
	return arrayFrom;
}

var stringPunycodeToAscii;
var hasRequiredStringPunycodeToAscii;

function requireStringPunycodeToAscii () {
	if (hasRequiredStringPunycodeToAscii) return stringPunycodeToAscii;
	hasRequiredStringPunycodeToAscii = 1;
	// based on https://github.com/bestiejs/punycode.js/blob/master/punycode.js
	var uncurryThis = requireFunctionUncurryThis();

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

	var $RangeError = RangeError;
	var exec = uncurryThis(regexSeparators.exec);
	var floor = Math.floor;
	var fromCharCode = String.fromCharCode;
	var charCodeAt = uncurryThis(''.charCodeAt);
	var join = uncurryThis([].join);
	var push = uncurryThis([].push);
	var replace = uncurryThis(''.replace);
	var split = uncurryThis(''.split);
	var toLowerCase = uncurryThis(''.toLowerCase);

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
	        push(output, ((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
	      } else {
	        // It's an unmatched surrogate; only append this code unit, in case the
	        // next code unit is the high surrogate of a surrogate pair.
	        push(output, value);
	        counter--;
	      }
	    } else {
	      push(output, value);
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
	  delta = firstTime ? floor(delta / damp) : delta >> 1;
	  delta += floor(delta / numPoints);
	  while (delta > baseMinusTMin * tMax >> 1) {
	    delta = floor(delta / baseMinusTMin);
	    k += base;
	  }
	  return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
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
	      push(output, fromCharCode(currentValue));
	    }
	  }

	  var basicLength = output.length; // number of basic code points.
	  var handledCPCount = basicLength; // number of code points that have been handled;

	  // Finish the basic string with a delimiter unless it's empty.
	  if (basicLength) {
	    push(output, delimiter);
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
	    if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
	      throw new $RangeError(OVERFLOW_ERROR);
	    }

	    delta += (m - n) * handledCPCountPlusOne;
	    n = m;

	    for (i = 0; i < input.length; i++) {
	      currentValue = input[i];
	      if (currentValue < n && ++delta > maxInt) {
	        throw new $RangeError(OVERFLOW_ERROR);
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
	          push(output, fromCharCode(digitToBasic(t + qMinusT % baseMinusT)));
	          q = floor(qMinusT / baseMinusT);
	          k += base;
	        }

	        push(output, fromCharCode(digitToBasic(q)));
	        bias = adapt(delta, handledCPCountPlusOne, handledCPCount === basicLength);
	        delta = 0;
	        handledCPCount++;
	      }
	    }

	    delta++;
	    n++;
	  }
	  return join(output, '');
	};

	stringPunycodeToAscii = function (input) {
	  var encoded = [];
	  var labels = split(replace(toLowerCase(input), regexSeparators, '\u002E'), '.');
	  var i, label;
	  for (i = 0; i < labels.length; i++) {
	    label = labels[i];
	    push(encoded, exec(regexNonASCII, label) ? 'xn--' + encode(label) : label);
	  }
	  return join(encoded, '.');
	};
	return stringPunycodeToAscii;
}

var es_string_fromCodePoint = {};

var hasRequiredEs_string_fromCodePoint;

function requireEs_string_fromCodePoint () {
	if (hasRequiredEs_string_fromCodePoint) return es_string_fromCodePoint;
	hasRequiredEs_string_fromCodePoint = 1;
	var $ = require_export();
	var uncurryThis = requireFunctionUncurryThis();
	var toAbsoluteIndex = requireToAbsoluteIndex();

	var $RangeError = RangeError;
	var fromCharCode = String.fromCharCode;
	// eslint-disable-next-line es/no-string-fromcodepoint -- required for testing
	var $fromCodePoint = String.fromCodePoint;
	var join = uncurryThis([].join);

	// length should be 1, old FF problem
	var INCORRECT_LENGTH = !!$fromCodePoint && $fromCodePoint.length !== 1;

	// `String.fromCodePoint` method
	// https://tc39.es/ecma262/#sec-string.fromcodepoint
	$({ target: 'String', stat: true, arity: 1, forced: INCORRECT_LENGTH }, {
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
	        ? fromCharCode(code)
	        : fromCharCode(((code -= 0x10000) >> 10) + 0xD800, code % 0x400 + 0xDC00);
	    } return join(elements, '');
	  }
	});
	return es_string_fromCodePoint;
}

var web_urlSearchParams_constructor;
var hasRequiredWeb_urlSearchParams_constructor;

function requireWeb_urlSearchParams_constructor () {
	if (hasRequiredWeb_urlSearchParams_constructor) return web_urlSearchParams_constructor;
	hasRequiredWeb_urlSearchParams_constructor = 1;
	// TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`
	requireEs_array_iterator();
	requireEs_string_fromCodePoint();
	var $ = require_export();
	var globalThis = requireGlobalThis();
	var safeGetBuiltIn = requireSafeGetBuiltIn();
	var getBuiltIn = requireGetBuiltIn();
	var call = requireFunctionCall();
	var uncurryThis = requireFunctionUncurryThis();
	var DESCRIPTORS = requireDescriptors();
	var USE_NATIVE_URL = requireUrlConstructorDetection();
	var defineBuiltIn = requireDefineBuiltIn();
	var defineBuiltInAccessor = requireDefineBuiltInAccessor();
	var defineBuiltIns = requireDefineBuiltIns();
	var setToStringTag = requireSetToStringTag();
	var createIteratorConstructor = requireIteratorCreateConstructor();
	var InternalStateModule = requireInternalState();
	var anInstance = requireAnInstance();
	var isCallable = requireIsCallable();
	var hasOwn = requireHasOwnProperty();
	var bind = requireFunctionBindContext();
	var classof = requireClassof();
	var anObject = requireAnObject();
	var isObject = requireIsObject();
	var $toString = requireToString();
	var create = requireObjectCreate();
	var createPropertyDescriptor = requireCreatePropertyDescriptor();
	var getIterator = requireGetIterator();
	var getIteratorMethod = requireGetIteratorMethod();
	var createIterResultObject = requireCreateIterResultObject();
	var validateArgumentsLength = requireValidateArgumentsLength();
	var wellKnownSymbol = requireWellKnownSymbol();
	var arraySort = requireArraySort();

	var ITERATOR = wellKnownSymbol('iterator');
	var URL_SEARCH_PARAMS = 'URLSearchParams';
	var URL_SEARCH_PARAMS_ITERATOR = URL_SEARCH_PARAMS + 'Iterator';
	var setInternalState = InternalStateModule.set;
	var getInternalParamsState = InternalStateModule.getterFor(URL_SEARCH_PARAMS);
	var getInternalIteratorState = InternalStateModule.getterFor(URL_SEARCH_PARAMS_ITERATOR);

	var nativeFetch = safeGetBuiltIn('fetch');
	var NativeRequest = safeGetBuiltIn('Request');
	var Headers = safeGetBuiltIn('Headers');
	var RequestPrototype = NativeRequest && NativeRequest.prototype;
	var HeadersPrototype = Headers && Headers.prototype;
	var TypeError = globalThis.TypeError;
	var encodeURIComponent = globalThis.encodeURIComponent;
	var fromCharCode = String.fromCharCode;
	var fromCodePoint = getBuiltIn('String', 'fromCodePoint');
	var $parseInt = parseInt;
	var charAt = uncurryThis(''.charAt);
	var join = uncurryThis([].join);
	var push = uncurryThis([].push);
	var replace = uncurryThis(''.replace);
	var shift = uncurryThis([].shift);
	var splice = uncurryThis([].splice);
	var split = uncurryThis(''.split);
	var stringSlice = uncurryThis(''.slice);
	var exec = uncurryThis(/./.exec);

	var plus = /\+/g;
	var FALLBACK_REPLACER = '\uFFFD';
	var VALID_HEX = /^[0-9a-f]+$/i;

	var parseHexOctet = function (string, start) {
	  var substr = stringSlice(string, start, start + 2);
	  if (!exec(VALID_HEX, substr)) return NaN;

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
	  input = replace(input, plus, ' ');
	  var length = input.length;
	  var result = '';
	  var i = 0;

	  while (i < length) {
	    var decodedChar = charAt(input, i);

	    if (decodedChar === '%') {
	      if (charAt(input, i + 1) === '%' || i + 3 > length) {
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
	          if (i + 3 > length || charAt(input, i) !== '%') break;

	          var nextByte = parseHexOctet(input, i + 1);

	          // eslint-disable-next-line no-self-compare -- NaN check
	          if (nextByte !== nextByte) {
	            i += 3;
	            break;
	          }
	          if (nextByte > 191 || nextByte < 128) break;

	          push(octets, nextByte);
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
	  return replace(encodeURIComponent(it), find, replacer);
	};

	var URLSearchParamsIterator = createIteratorConstructor(function Iterator(params, kind) {
	  setInternalState(this, {
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
	    else this.parseQuery(typeof init == 'string' ? charAt(init, 0) === '?' ? stringSlice(init, 1) : init : $toString(init));
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
	      while (!(step = call(next, iterator)).done) {
	        entryIterator = getIterator(anObject(step.value));
	        entryNext = entryIterator.next;
	        if (
	          (first = call(entryNext, entryIterator)).done ||
	          (second = call(entryNext, entryIterator)).done ||
	          !call(entryNext, entryIterator).done
	        ) throw new TypeError('Expected sequence with length 2');
	        push(entries, { key: $toString(first.value), value: $toString(second.value) });
	      }
	    } else for (var key in object) if (hasOwn(object, key)) {
	      push(entries, { key: key, value: $toString(object[key]) });
	    }
	  },
	  parseQuery: function (query) {
	    if (query) {
	      var entries = this.entries;
	      var attributes = split(query, '&');
	      var index = 0;
	      var attribute, entry;
	      while (index < attributes.length) {
	        attribute = attributes[index++];
	        if (attribute.length) {
	          entry = split(attribute, '=');
	          push(entries, {
	            key: decode(shift(entry)),
	            value: decode(join(entry, '='))
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
	      push(result, serialize(entry.key) + '=' + serialize(entry.value));
	    } return join(result, '&');
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
	  anInstance(this, URLSearchParamsPrototype);
	  var init = arguments.length > 0 ? arguments[0] : undefined;
	  var state = setInternalState(this, new URLSearchParamsState(init));
	  if (!DESCRIPTORS) this.size = state.entries.length;
	};

	var URLSearchParamsPrototype = URLSearchParamsConstructor.prototype;

	defineBuiltIns(URLSearchParamsPrototype, {
	  // `URLSearchParams.prototype.append` method
	  // https://url.spec.whatwg.org/#dom-urlsearchparams-append
	  append: function append(name, value) {
	    var state = getInternalParamsState(this);
	    validateArgumentsLength(arguments.length, 2);
	    push(state.entries, { key: $toString(name), value: $toString(value) });
	    if (!DESCRIPTORS) this.length++;
	    state.updateURL();
	  },
	  // `URLSearchParams.prototype.delete` method
	  // https://url.spec.whatwg.org/#dom-urlsearchparams-delete
	  'delete': function (name /* , value */) {
	    var state = getInternalParamsState(this);
	    var length = validateArgumentsLength(arguments.length, 1);
	    var entries = state.entries;
	    var key = $toString(name);
	    var $value = length < 2 ? undefined : arguments[1];
	    var value = $value === undefined ? $value : $toString($value);
	    var index = 0;
	    while (index < entries.length) {
	      var entry = entries[index];
	      if (entry.key === key && (value === undefined || entry.value === value)) {
	        splice(entries, index, 1);
	        if (value !== undefined) break;
	      } else index++;
	    }
	    if (!DESCRIPTORS) this.size = entries.length;
	    state.updateURL();
	  },
	  // `URLSearchParams.prototype.get` method
	  // https://url.spec.whatwg.org/#dom-urlsearchparams-get
	  get: function get(name) {
	    var entries = getInternalParamsState(this).entries;
	    validateArgumentsLength(arguments.length, 1);
	    var key = $toString(name);
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
	    validateArgumentsLength(arguments.length, 1);
	    var key = $toString(name);
	    var result = [];
	    var index = 0;
	    for (; index < entries.length; index++) {
	      if (entries[index].key === key) push(result, entries[index].value);
	    }
	    return result;
	  },
	  // `URLSearchParams.prototype.has` method
	  // https://url.spec.whatwg.org/#dom-urlsearchparams-has
	  has: function has(name /* , value */) {
	    var entries = getInternalParamsState(this).entries;
	    var length = validateArgumentsLength(arguments.length, 1);
	    var key = $toString(name);
	    var $value = length < 2 ? undefined : arguments[1];
	    var value = $value === undefined ? $value : $toString($value);
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
	    validateArgumentsLength(arguments.length, 1);
	    var entries = state.entries;
	    var found = false;
	    var key = $toString(name);
	    var val = $toString(value);
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
	    if (!found) push(entries, { key: key, value: val });
	    if (!DESCRIPTORS) this.size = entries.length;
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
	    var boundFunction = bind(callback, arguments.length > 1 ? arguments[1] : undefined);
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
	defineBuiltIn(URLSearchParamsPrototype, ITERATOR, URLSearchParamsPrototype.entries, { name: 'entries' });

	// `URLSearchParams.prototype.toString` method
	// https://url.spec.whatwg.org/#urlsearchparams-stringification-behavior
	defineBuiltIn(URLSearchParamsPrototype, 'toString', function toString() {
	  return getInternalParamsState(this).serialize();
	}, { enumerable: true });

	// `URLSearchParams.prototype.size` getter
	// https://github.com/whatwg/url/pull/734
	if (DESCRIPTORS) defineBuiltInAccessor(URLSearchParamsPrototype, 'size', {
	  get: function size() {
	    return getInternalParamsState(this).entries.length;
	  },
	  configurable: true,
	  enumerable: true
	});

	setToStringTag(URLSearchParamsConstructor, URL_SEARCH_PARAMS);

	$({ global: true, constructor: true, forced: !USE_NATIVE_URL }, {
	  URLSearchParams: URLSearchParamsConstructor
	});

	// Wrap `fetch` and `Request` for correct work with polyfilled `URLSearchParams`
	if (!USE_NATIVE_URL && isCallable(Headers)) {
	  var headersHas = uncurryThis(HeadersPrototype.has);
	  var headersSet = uncurryThis(HeadersPrototype.set);

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
	          body: createPropertyDescriptor(0, $toString(body)),
	          headers: createPropertyDescriptor(0, headers)
	        });
	      }
	    } return init;
	  };

	  if (isCallable(nativeFetch)) {
	    $({ global: true, enumerable: true, dontCallGetSet: true, forced: true }, {
	      fetch: function fetch(input /* , init */) {
	        return nativeFetch(input, arguments.length > 1 ? wrapRequestOptions(arguments[1]) : {});
	      }
	    });
	  }

	  if (isCallable(NativeRequest)) {
	    var RequestConstructor = function Request(input /* , init */) {
	      anInstance(this, RequestPrototype);
	      return new NativeRequest(input, arguments.length > 1 ? wrapRequestOptions(arguments[1]) : {});
	    };

	    RequestPrototype.constructor = RequestConstructor;
	    RequestConstructor.prototype = RequestPrototype;

	    $({ global: true, constructor: true, dontCallGetSet: true, forced: true }, {
	      Request: RequestConstructor
	    });
	  }
	}

	web_urlSearchParams_constructor = {
	  URLSearchParams: URLSearchParamsConstructor,
	  getState: getInternalParamsState
	};
	return web_urlSearchParams_constructor;
}

var hasRequiredWeb_url_constructor;

function requireWeb_url_constructor () {
	if (hasRequiredWeb_url_constructor) return web_url_constructor;
	hasRequiredWeb_url_constructor = 1;
	// TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`
	requireEs_string_iterator();
	var $ = require_export();
	var DESCRIPTORS = requireDescriptors();
	var USE_NATIVE_URL = requireUrlConstructorDetection();
	var globalThis = requireGlobalThis();
	var bind = requireFunctionBindContext();
	var uncurryThis = requireFunctionUncurryThis();
	var defineBuiltIn = requireDefineBuiltIn();
	var defineBuiltInAccessor = requireDefineBuiltInAccessor();
	var anInstance = requireAnInstance();
	var hasOwn = requireHasOwnProperty();
	var assign = requireObjectAssign();
	var arrayFrom = requireArrayFrom();
	var arraySlice = requireArraySlice();
	var codeAt = requireStringMultibyte().codeAt;
	var toASCII = requireStringPunycodeToAscii();
	var $toString = requireToString();
	var setToStringTag = requireSetToStringTag();
	var validateArgumentsLength = requireValidateArgumentsLength();
	var URLSearchParamsModule = requireWeb_urlSearchParams_constructor();
	var InternalStateModule = requireInternalState();

	var setInternalState = InternalStateModule.set;
	var getInternalURLState = InternalStateModule.getterFor('URL');
	var URLSearchParams = URLSearchParamsModule.URLSearchParams;
	var getInternalSearchParamsState = URLSearchParamsModule.getState;

	var NativeURL = globalThis.URL;
	var TypeError = globalThis.TypeError;
	var parseInt = globalThis.parseInt;
	var floor = Math.floor;
	var pow = Math.pow;
	var charAt = uncurryThis(''.charAt);
	var exec = uncurryThis(/./.exec);
	var join = uncurryThis([].join);
	var numberToString = uncurryThis(1.0.toString);
	var pop = uncurryThis([].pop);
	var push = uncurryThis([].push);
	var replace = uncurryThis(''.replace);
	var shift = uncurryThis([].shift);
	var split = uncurryThis(''.split);
	var stringSlice = uncurryThis(''.slice);
	var toLowerCase = uncurryThis(''.toLowerCase);
	var unshift = uncurryThis([].unshift);

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
	      number = parseInt(part, radix);
	    }
	    push(numbers, number);
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
	      value = value * 16 + parseInt(chr(), 16);
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
	          number = parseInt(chr(), 10);
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
	    if (failure) throw new TypeError(failure);
	    this.searchParams = null;
	  } else {
	    if (base !== undefined) baseState = new URLState(base, true);
	    failure = this.parse(urlString, null, baseState);
	    if (failure) throw new TypeError(failure);
	    searchParams = getInternalSearchParamsState(new URLSearchParams());
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
	              push(url.path, '');
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
	              var port = parseInt(buffer, 10);
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
	            if (isWindowsDriveLetter(base.path[0], true)) push(url.path, base.path[0]);
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
	                push(url.path, '');
	              }
	            } else if (isSingleDot(buffer)) {
	              if (chr !== '/' && !(chr === '\\' && url.isSpecial())) {
	                push(url.path, '');
	              }
	            } else {
	              if (url.scheme === 'file' && !url.path.length && isWindowsDriveLetter(buffer)) {
	                if (url.host) url.host = '';
	                buffer = charAt(buffer, 0) + ':'; // normalize windows drive letter
	              }
	              push(url.path, buffer);
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
	    if (failure) throw new TypeError(failure);
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
	  var base = validateArgumentsLength(arguments.length, 1) > 1 ? arguments[1] : undefined;
	  var state = setInternalState(that, new URLState(url, false, base));
	  if (!DESCRIPTORS) {
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

	if (DESCRIPTORS) {
	  // `URL.prototype.href` accessors pair
	  // https://url.spec.whatwg.org/#dom-url-href
	  defineBuiltInAccessor(URLPrototype, 'href', accessorDescriptor('serialize', 'setHref'));
	  // `URL.prototype.origin` getter
	  // https://url.spec.whatwg.org/#dom-url-origin
	  defineBuiltInAccessor(URLPrototype, 'origin', accessorDescriptor('getOrigin'));
	  // `URL.prototype.protocol` accessors pair
	  // https://url.spec.whatwg.org/#dom-url-protocol
	  defineBuiltInAccessor(URLPrototype, 'protocol', accessorDescriptor('getProtocol', 'setProtocol'));
	  // `URL.prototype.username` accessors pair
	  // https://url.spec.whatwg.org/#dom-url-username
	  defineBuiltInAccessor(URLPrototype, 'username', accessorDescriptor('getUsername', 'setUsername'));
	  // `URL.prototype.password` accessors pair
	  // https://url.spec.whatwg.org/#dom-url-password
	  defineBuiltInAccessor(URLPrototype, 'password', accessorDescriptor('getPassword', 'setPassword'));
	  // `URL.prototype.host` accessors pair
	  // https://url.spec.whatwg.org/#dom-url-host
	  defineBuiltInAccessor(URLPrototype, 'host', accessorDescriptor('getHost', 'setHost'));
	  // `URL.prototype.hostname` accessors pair
	  // https://url.spec.whatwg.org/#dom-url-hostname
	  defineBuiltInAccessor(URLPrototype, 'hostname', accessorDescriptor('getHostname', 'setHostname'));
	  // `URL.prototype.port` accessors pair
	  // https://url.spec.whatwg.org/#dom-url-port
	  defineBuiltInAccessor(URLPrototype, 'port', accessorDescriptor('getPort', 'setPort'));
	  // `URL.prototype.pathname` accessors pair
	  // https://url.spec.whatwg.org/#dom-url-pathname
	  defineBuiltInAccessor(URLPrototype, 'pathname', accessorDescriptor('getPathname', 'setPathname'));
	  // `URL.prototype.search` accessors pair
	  // https://url.spec.whatwg.org/#dom-url-search
	  defineBuiltInAccessor(URLPrototype, 'search', accessorDescriptor('getSearch', 'setSearch'));
	  // `URL.prototype.searchParams` getter
	  // https://url.spec.whatwg.org/#dom-url-searchparams
	  defineBuiltInAccessor(URLPrototype, 'searchParams', accessorDescriptor('getSearchParams'));
	  // `URL.prototype.hash` accessors pair
	  // https://url.spec.whatwg.org/#dom-url-hash
	  defineBuiltInAccessor(URLPrototype, 'hash', accessorDescriptor('getHash', 'setHash'));
	}

	// `URL.prototype.toJSON` method
	// https://url.spec.whatwg.org/#dom-url-tojson
	defineBuiltIn(URLPrototype, 'toJSON', function toJSON() {
	  return getInternalURLState(this).serialize();
	}, { enumerable: true });

	// `URL.prototype.toString` method
	// https://url.spec.whatwg.org/#URL-stringification-behavior
	defineBuiltIn(URLPrototype, 'toString', function toString() {
	  return getInternalURLState(this).serialize();
	}, { enumerable: true });

	if (NativeURL) {
	  var nativeCreateObjectURL = NativeURL.createObjectURL;
	  var nativeRevokeObjectURL = NativeURL.revokeObjectURL;
	  // `URL.createObjectURL` method
	  // https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
	  if (nativeCreateObjectURL) defineBuiltIn(URLConstructor, 'createObjectURL', bind(nativeCreateObjectURL, NativeURL));
	  // `URL.revokeObjectURL` method
	  // https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL
	  if (nativeRevokeObjectURL) defineBuiltIn(URLConstructor, 'revokeObjectURL', bind(nativeRevokeObjectURL, NativeURL));
	}

	setToStringTag(URLConstructor, 'URL');

	$({ global: true, constructor: true, forced: !USE_NATIVE_URL, sham: !DESCRIPTORS }, {
	  URL: URLConstructor
	});
	return web_url_constructor;
}

var hasRequiredWeb_url;

function requireWeb_url () {
	if (hasRequiredWeb_url) return web_url;
	hasRequiredWeb_url = 1;
	// TODO: Remove this module from `core-js@4` since it's replaced to module below
	requireWeb_url_constructor();
	return web_url;
}

requireWeb_url();

var web_url_toJson = {};

var hasRequiredWeb_url_toJson;

function requireWeb_url_toJson () {
	if (hasRequiredWeb_url_toJson) return web_url_toJson;
	hasRequiredWeb_url_toJson = 1;
	var $ = require_export();
	var call = requireFunctionCall();

	// `URL.prototype.toJSON` method
	// https://url.spec.whatwg.org/#dom-url-tojson
	$({ target: 'URL', proto: true, enumerable: true }, {
	  toJSON: function toJSON() {
	    return call(URL.prototype.toString, this);
	  }
	});
	return web_url_toJson;
}

requireWeb_url_toJson();

var web_urlSearchParams = {};

var hasRequiredWeb_urlSearchParams;

function requireWeb_urlSearchParams () {
	if (hasRequiredWeb_urlSearchParams) return web_urlSearchParams;
	hasRequiredWeb_urlSearchParams = 1;
	// TODO: Remove this module from `core-js@4` since it's replaced to module below
	requireWeb_urlSearchParams_constructor();
	return web_urlSearchParams;
}

requireWeb_urlSearchParams();

var web_urlSearchParams_delete = {};

var hasRequiredWeb_urlSearchParams_delete;

function requireWeb_urlSearchParams_delete () {
	if (hasRequiredWeb_urlSearchParams_delete) return web_urlSearchParams_delete;
	hasRequiredWeb_urlSearchParams_delete = 1;
	var defineBuiltIn = requireDefineBuiltIn();
	var uncurryThis = requireFunctionUncurryThis();
	var toString = requireToString();
	var validateArgumentsLength = requireValidateArgumentsLength();

	var $URLSearchParams = URLSearchParams;
	var URLSearchParamsPrototype = $URLSearchParams.prototype;
	var append = uncurryThis(URLSearchParamsPrototype.append);
	var $delete = uncurryThis(URLSearchParamsPrototype['delete']);
	var forEach = uncurryThis(URLSearchParamsPrototype.forEach);
	var push = uncurryThis([].push);
	var params = new $URLSearchParams('a=1&a=2&b=3');

	params['delete']('a', 1);
	// `undefined` case is a Chromium 117 bug
	// https://bugs.chromium.org/p/v8/issues/detail?id=14222
	params['delete']('b', undefined);

	if (params + '' !== 'a=2') {
	  defineBuiltIn(URLSearchParamsPrototype, 'delete', function (name /* , value */) {
	    var length = arguments.length;
	    var $value = length < 2 ? undefined : arguments[1];
	    if (length && $value === undefined) return $delete(this, name);
	    var entries = [];
	    forEach(this, function (v, k) { // also validates `this`
	      push(entries, { key: k, value: v });
	    });
	    validateArgumentsLength(length, 1);
	    var key = toString(name);
	    var value = toString($value);
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
	return web_urlSearchParams_delete;
}

requireWeb_urlSearchParams_delete();

var web_urlSearchParams_has = {};

var hasRequiredWeb_urlSearchParams_has;

function requireWeb_urlSearchParams_has () {
	if (hasRequiredWeb_urlSearchParams_has) return web_urlSearchParams_has;
	hasRequiredWeb_urlSearchParams_has = 1;
	var defineBuiltIn = requireDefineBuiltIn();
	var uncurryThis = requireFunctionUncurryThis();
	var toString = requireToString();
	var validateArgumentsLength = requireValidateArgumentsLength();

	var $URLSearchParams = URLSearchParams;
	var URLSearchParamsPrototype = $URLSearchParams.prototype;
	var getAll = uncurryThis(URLSearchParamsPrototype.getAll);
	var $has = uncurryThis(URLSearchParamsPrototype.has);
	var params = new $URLSearchParams('a=1');

	// `undefined` case is a Chromium 117 bug
	// https://bugs.chromium.org/p/v8/issues/detail?id=14222
	if (params.has('a', 2) || !params.has('a', undefined)) {
	  defineBuiltIn(URLSearchParamsPrototype, 'has', function has(name /* , value */) {
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
	return web_urlSearchParams_has;
}

requireWeb_urlSearchParams_has();

var web_urlSearchParams_size = {};

var hasRequiredWeb_urlSearchParams_size;

function requireWeb_urlSearchParams_size () {
	if (hasRequiredWeb_urlSearchParams_size) return web_urlSearchParams_size;
	hasRequiredWeb_urlSearchParams_size = 1;
	var DESCRIPTORS = requireDescriptors();
	var uncurryThis = requireFunctionUncurryThis();
	var defineBuiltInAccessor = requireDefineBuiltInAccessor();

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
	return web_urlSearchParams_size;
}

requireWeb_urlSearchParams_size();
