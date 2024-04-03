!function(){function t(){"use strict";/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */t=function(){return e};var r,e={},n=Object.prototype,o=n.hasOwnProperty,i=Object.defineProperty||function(t,r,e){t[r]=e.value},a="function"==typeof Symbol?Symbol:{},c=a.iterator||"@@iterator",u=a.asyncIterator||"@@asyncIterator",f=a.toStringTag||"@@toStringTag";function l(t,r,e){return Object.defineProperty(t,r,{value:e,enumerable:!0,configurable:!0,writable:!0}),t[r]}try{l({},"")}catch(r){l=function(t,r,e){return t[r]=e}}function s(t,r,e,n){var o=r&&r.prototype instanceof m?r:m,a=Object.create(o.prototype),c=new T(n||[]);return i(a,"_invoke",{value:P(t,e,c)}),a}function h(t,r,e){try{return{type:"normal",arg:t.call(r,e)}}catch(t){return{type:"throw",arg:t}}}e.wrap=s;var p="suspendedStart",y="suspendedYield",v="executing",d="completed",g={};function m(){}function w(){}function b(){}var x={};l(x,c,(function(){return this}));var E=Object.getPrototypeOf,O=E&&E(E(F([])));O&&O!==n&&o.call(O,c)&&(x=O);var j=b.prototype=m.prototype=Object.create(x);function L(t){["next","throw","return"].forEach((function(r){l(t,r,(function(t){return this._invoke(r,t)}))}))}function _(t,r){function e(n,i,a,c){var u=h(t[n],t,i);if("throw"!==u.type){var f=u.arg,l=f.value;return l&&"object"==typeof l&&o.call(l,"__await")?r.resolve(l.__await).then((function(t){e("next",t,a,c)}),(function(t){e("throw",t,a,c)})):r.resolve(l).then((function(t){f.value=t,a(f)}),(function(t){return e("throw",t,a,c)}))}c(u.arg)}var n;i(this,"_invoke",{value:function(t,o){function i(){return new r((function(r,n){e(t,o,r,n)}))}return n=n?n.then(i,i):i()}})}function P(t,e,n){var o=p;return function(i,a){if(o===v)throw Error("Generator is already running");if(o===d){if("throw"===i)throw a;return{value:r,done:!0}}for(n.method=i,n.arg=a;;){var c=n.delegate;if(c){var u=S(c,n);if(u){if(u===g)continue;return u}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(o===p)throw o=d,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);o=v;var f=h(t,e,n);if("normal"===f.type){if(o=n.done?d:y,f.arg===g)continue;return{value:f.arg,done:n.done}}"throw"===f.type&&(o=d,n.method="throw",n.arg=f.arg)}}}function S(t,e){var n=e.method,o=t.iterator[n];if(o===r)return e.delegate=null,"throw"===n&&t.iterator.return&&(e.method="return",e.arg=r,S(t,e),"throw"===e.method)||"return"!==n&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+n+"' method")),g;var i=h(o,t.iterator,e.arg);if("throw"===i.type)return e.method="throw",e.arg=i.arg,e.delegate=null,g;var a=i.arg;return a?a.done?(e[t.resultName]=a.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=r),e.delegate=null,g):a:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,g)}function k(t){var r={tryLoc:t[0]};1 in t&&(r.catchLoc=t[1]),2 in t&&(r.finallyLoc=t[2],r.afterLoc=t[3]),this.tryEntries.push(r)}function N(t){var r=t.completion||{};r.type="normal",delete r.arg,t.completion=r}function T(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(k,this),this.reset(!0)}function F(t){if(t||""===t){var e=t[c];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,i=function e(){for(;++n<t.length;)if(o.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=r,e.done=!0,e};return i.next=i}}throw new TypeError(typeof t+" is not iterable")}return w.prototype=b,i(j,"constructor",{value:b,configurable:!0}),i(b,"constructor",{value:w,configurable:!0}),w.displayName=l(b,f,"GeneratorFunction"),e.isGeneratorFunction=function(t){var r="function"==typeof t&&t.constructor;return!!r&&(r===w||"GeneratorFunction"===(r.displayName||r.name))},e.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,b):(t.__proto__=b,l(t,f,"GeneratorFunction")),t.prototype=Object.create(j),t},e.awrap=function(t){return{__await:t}},L(_.prototype),l(_.prototype,u,(function(){return this})),e.AsyncIterator=_,e.async=function(t,r,n,o,i){void 0===i&&(i=Promise);var a=new _(s(t,r,n,o),i);return e.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},L(j),l(j,f,"Generator"),l(j,c,(function(){return this})),l(j,"toString",(function(){return"[object Generator]"})),e.keys=function(t){var r=Object(t),e=[];for(var n in r)e.push(n);return e.reverse(),function t(){for(;e.length;){var n=e.pop();if(n in r)return t.value=n,t.done=!1,t}return t.done=!0,t}},e.values=F,T.prototype={constructor:T,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=r,this.done=!1,this.delegate=null,this.method="next",this.arg=r,this.tryEntries.forEach(N),!t)for(var e in this)"t"===e.charAt(0)&&o.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=r)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(n,o){return c.type="throw",c.arg=t,e.next=n,o&&(e.method="next",e.arg=r),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],c=a.completion;if("root"===a.tryLoc)return n("end");if(a.tryLoc<=this.prev){var u=o.call(a,"catchLoc"),f=o.call(a,"finallyLoc");if(u&&f){if(this.prev<a.catchLoc)return n(a.catchLoc,!0);if(this.prev<a.finallyLoc)return n(a.finallyLoc)}else if(u){if(this.prev<a.catchLoc)return n(a.catchLoc,!0)}else{if(!f)throw Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return n(a.finallyLoc)}}}},abrupt:function(t,r){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc<=this.prev&&o.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var i=n;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=r&&r<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=r,i?(this.method="next",this.next=i.finallyLoc,g):this.complete(a)},complete:function(t,r){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&r&&(this.next=r),g},finish:function(t){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.finallyLoc===t)return this.complete(e.completion,e.afterLoc),N(e),g}},catch:function(t){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.tryLoc===t){var n=e.completion;if("throw"===n.type){var o=n.arg;N(e)}return o}}throw Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:F(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=r),g}},e}function r(t,r,e,n,o,i,a){try{var c=t[i](a),u=c.value}catch(f){return void e(f)}c.done?r(u):Promise.resolve(u).then(n,o)}function e(t,r){for(var e=0;e<r.length;e++){var o=r[e];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,n(o.key),o)}}function n(t){var r=function(t,r){if("object"!=typeof t||!t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var n=e.call(t,r||"default");if("object"!=typeof n)return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===r?String:Number)(t)}(t,"string");return"symbol"==typeof r?r:r+""}function o(t,r,e){return r=a(r),function(t,r){if(r&&("object"==typeof r||"function"==typeof r))return r;if(void 0!==r)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(t,i()?Reflect.construct(r,e||[],a(t).constructor):r.apply(t,e))}function i(){try{var t=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(t){}return(i=function(){return!!t})()}function a(t){return a=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},a(t)}function c(t,r){return c=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,r){return t.__proto__=r,t},c(t,r)}System.register(["./CoreExtension-legacy-DR6C_7R9.js"],(function(n,i){"use strict";var a,u,f;return{setters:[function(t){a=t.C,u=t.W,f=t.S}],execute:function(){var i="/solid-demo-app/",l=function(n){function a(){return function(t,r){if(!(t instanceof r))throw new TypeError("Cannot call a class as a function")}(this,a),o(this,a,arguments)}return function(t,r){if("function"!=typeof r&&null!==r)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(r&&r.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),r&&c(t,r)}(a,n),l=a,s=[{key:"run",value:(p=t().mark((function r(e){return t().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e.fontManager.addFontFace(new u("NotoSans",{},i+"fonts/NotoSans-Regular.ttf")),e.fontManager.addFontFace(new f("Ubuntu",{},"msdf",e,i+"fonts/Ubuntu-Bold.msdf.png",i+"fonts/Ubuntu-Bold.msdf.json"));case 2:case"end":return t.stop()}}),r)})),y=function(){var t=this,e=arguments;return new Promise((function(n,o){var i=p.apply(t,e);function a(t){r(i,n,o,a,c,"next",t)}function c(t){r(i,n,o,a,c,"throw",t)}a(void 0)}))},function(t){return y.apply(this,arguments)})}],s&&e(l.prototype,s),h&&e(l,h),Object.defineProperty(l,"prototype",{writable:!1}),l;var l,s,h,p,y}(a);n("default",l)}}}))}();
//# sourceMappingURL=AppCoreExtensions-legacy-ByBl5Y8-.js.map
