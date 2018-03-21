// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.5/esri/copyright.txt for details.
//>>built
define("require exports ../geometry/Geometry ../moment dojo/number ./ImmutableArray ../kernel ./ImmutablePointArray ./ImmutablePathArray dojo/_base/array ../geometry/Point ../geometry/Polyline ../geometry/Polygon ../geometry/Extent ../geometry/Multipoint ./FunctionWrapper".split(" "),function(z,d,v,m,A,n,I,J,K,B,w,L,M,N,O,P){function p(a,b,c){if(""===b||null===b||void 0===b||b===c||b===c)return a;do a=a.replace(b,c);while(-1!==a.indexOf(b));return a}function x(a){return a instanceof C||a instanceof
P||a instanceof D}function h(a){return"string"===typeof a||a instanceof String}function k(a){return"boolean"===typeof a}function l(a){return"number"===typeof a}function q(a){return a instanceof Array}function g(a){return a instanceof Date}function y(a,b){if(!1===isNaN(a)){if(void 0===b||null===b||""===b)return a.toString();b=p(b,"\u2030","");b=p(b,"\u00a4","");return A.format(a,{pattern:b})}return a.toString()}function t(a,b){a=m(a);return void 0===b||null===b||""===b?a.format():a.format(E(b))}function E(a){return a.replace(/(LTS)|L|l/g,
function(a){return"["+a+"]"})}function e(a,b,c){switch(c){case "\x3e":return a>b;case "\x3c":return a<b;case "\x3e\x3d":return a>=b;case "\x3c\x3d":return a<=b}return!1}function F(a,b){if(a===b||null===a&&b===d.voidOperation||null===b&&a===d.voidOperation)return!0;if(g(a)&&g(b))return a.getTime()===b.getTime();if(a instanceof K||a instanceof J)return a.equalityTest(b);if(a instanceof w&&b instanceof w){var c=void 0,e=void 0;d.isVersion4?(c=a.cache._arcadeCacheId,e=b.cache._arcadeCacheId):(c=a.getCacheValue("_arcadeCacheId"),
e=b.getCacheValue("_arcadeCacheId"));if(void 0!==c&&null!==c)return c===e}return void 0!==a&&void 0!==b&&null!==a&&null!==b&&"object"===typeof a&&"object"===typeof b&&(a._arcadeCacheId===b._arcadeCacheId&&void 0!==a._arcadeCacheId&&null!==a._arcadeCacheId||a._underlyingGraphic===b._underlyingGraphic&&void 0!==a._underlyingGraphic&&null!==a._underlyingGraphic)?!0:!1}function r(a,b){if(h(a))return a;if(null===a)return"";if(l(a))return y(a,b);if(k(a))return a.toString();if(g(a))return t(a,b);if(a instanceof
v)return JSON.stringify(a.toJSON());if(q(a)){b=[];for(var c=0;c<a.length;c++)b[c]=u(a[c]);return"["+b.join(",")+"]"}if(a instanceof n){b=[];for(c=0;c<a.length();c++)b[c]=u(a.get(c));return"["+b.join(",")+"]"}return null!==a&&"object"===typeof a&&void 0!==a.castToText?a.castToText():x(a)?"object, Function":""}function G(a,b){if(h(a))return a;if(null===a)return"";if(l(a))return y(a,b);if(k(a))return a.toString();if(g(a))return t(a,b);if(a instanceof v)return JSON.stringify(a.toJSON());if(q(a)){b=[];
for(var c=0;c<a.length;c++)b[c]=u(a[c]);return"["+b.join(",")+"]"}if(a instanceof n){b=[];for(c=0;c<a.length();c++)b[c]=u(a.get(c));return"["+b.join(",")+"]"}return null!==a&&"object"===typeof a&&void 0!==a.castToText?a.castToText():x(a)?"object, Function":""}function u(a){if(null!==a){if(k(a)||l(a)||h(a))return JSON.stringify(a);if(a instanceof v||a instanceof n||a instanceof Array)return G(a);if(a instanceof Date)return JSON.stringify(t(a,""));if(null!==a&&"object"===typeof a&&void 0!==a.castToText)return a.castToText()}return"null"}
function f(a,b){return l(a)?a:null===a||""===a?0:g(a)?NaN:k(a)?a?1:0:q(a)||""===a||void 0===a?NaN:void 0!==b&&h(a)?(b=p(b,"\u2030",""),b=p(b,"\u00a4",""),A.parse(a,{pattern:b})):a===d.voidOperation?0:Number(a)}function H(a,b){var c;B.some(b.fields,function(b){b.name===a&&(c=b.domain);return!!c});return c}Object.defineProperty(d,"__esModule",{value:!0});z=function(){return function(a){this.value=a}}();var Q=function(){return function(a){this.value=a}}(),C=function(){return function(a){this.fn=a}}(),
D=function(){return function(a){this.fn=a}}();d.NativeFunction=C;d.ImplicitResult=Q;d.ReturnResult=z;d.SizzleFunction=D;d.isVersion4=0===I.version.indexOf("4.");d.voidOperation={type:"VOID"};d.breakResult={type:"BREAK"};d.continueResult={type:"CONTINUE"};d.multiReplace=p;d.isFunctionParameter=x;d.isSimpleType=function(a){return h(a)||l(a)||g(a)||k(a)||null===a||a===d.voidOperation||"number"===typeof a?!0:!1};d.defaultUndefined=function(a,b){return void 0===a?b:a};d.isString=h;d.isBoolean=k;d.isNumber=
l;d.isArray=q;d.isFeatureCursor=function(a){return a&&void 0!==a.isFeatureCursor};d.isImmutableArray=function(a){return a instanceof n};d.isDate=g;d.pcCheck=function(a,b,c){if(a.length<b||a.length>c)throw Error("Function called with wrong number of Parameters");};d.generateUUID=function(){var a=(new Date).getTime();return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(b){var c=(a+16*Math.random())%16|0;a=Math.floor(a/16);return("x"===b?c:c&3|8).toString(16)})};d.formatNumber=y;d.formatDate=
t;d.standardiseDateFormat=E;d.greaterThanLessThan=function(a,b,c){if(null===a){if(null===b||b===d.voidOperation)return e(null,null,c);if(l(b))return e(0,b,c);if(h(b)||k(b))return e(0,f(b),c);if(g(b))return e(0,b.getTime(),c)}if(a===d.voidOperation){if(null===b||b===d.voidOperation)return e(null,null,c);if(l(b))return e(0,b,c);if(h(b)||k(b))return e(0,f(b),c);if(g(b))return e(0,b.getTime(),c)}else if(l(a)){if(l(b))return e(a,b,c);if(k(b))return e(a,f(b),c);if(null===b||b===d.voidOperation)return e(a,
0,c);if(h(b))return e(a,f(b),c);if(g(b))return e(a,b.getTime(),c)}else if(h(a)){if(h(b))return e(r(a),r(b),c);if(g(b))return e(f(a),b.getTime(),c);if(l(b))return e(f(a),b,c);if(null===b||b===d.voidOperation)return e(f(a),0,c);if(k(b))return e(f(a),f(b),c)}else if(g(a)){if(g(b))return e(a,b,c);if(null===b||b===d.voidOperation)return e(a.getTime(),0,c);if(l(b))return e(a.getTime(),b,c);if(k(b)||h(b))return e(a.getTime(),f(b),c)}else if(k(a)){if(k(b))return e(a,b,c);if(l(b))return e(f(a),f(b),c);if(g(b))return e(f(a),
b.getTime(),c);if(null===b||b===d.voidOperation)return e(f(a),0,c);if(h(b))return e(f(a),f(b),c)}return!F(a,b)||"\x3c\x3d"!==c&&"\x3e\x3d"!==c?!1:!0};d.equalityTest=F;d.toString=r;d.toNumberArray=function(a){var b=[];if(!1===q(a))return null;if(a instanceof n){for(var c=0;c<a.length();c++)b[c]=f(a.get(c));return b}for(c=0;c<a.length;c++)b[c]=f(a[c]);return b};d.toStringExplicit=G;d.toNumber=f;d.toDate=function(a,b){return g(a)?a:h(a)&&(a=m(a,[void 0===b||null===b||""===b?m.ISO_8601:b]),a.isValid())?
a.toDate():null};d.toDateM=function(a,b){return g(a)?m(a):h(a)&&(a=m(a,[void 0===b||null===b||""===b?m.ISO_8601:b]),a.isValid())?a:null};d.toBoolean=function(a){if(k(a))return a;if(h(a)){if(a=a.toLowerCase(),"true"===a)return!0}else if(l(a))return 0===a||isNaN(a)?!1:!0;return!1};d.fixSpatialReference=function(a,b){if(null===a||void 0===a)return null;if(null===a.spatialReference||void 0===a.spatialReference)a.spatialReference=b;return a};d.fixNullGeometry=function(a){return null===a?null:a instanceof
w?"NaN"===a.x||null===a.x||isNaN(a.x)?null:a:a instanceof M?0===a.rings.length?null:a:a instanceof L?0===a.paths.length?null:a:a instanceof O?0===a.points.length?null:a:a instanceof N?"NaN"===a.xmin||null===a.xmin||isNaN(a.xmin)?null:a:null};d.getDomainValue=function(a,b){if(!a||!a.domain)return null;var c=null;b="string"===a.field.type||"esriFieldTypeString"===a.field.type?r(b):f(b);for(var d=0;d<a.domain.codedValues.length;d++){var e=a.domain.codedValues[d];e.code===b&&(c=e)}return null===c?null:
c.name};d.getDomainCode=function(a,b){if(!a||!a.domain)return null;var c=null;b=r(b);for(var d=0;d<a.domain.codedValues.length;d++){var e=a.domain.codedValues[d];e.name===b&&(c=e)}return null===c?null:c.code};d.getDomain=function(a,b,c,d){void 0===c&&(c=null);if(!b||!b.fields)return null;for(var e=null,f=0;f<b.fields.length;f++){var h=b.fields[f];h.name.toLowerCase()===a.toString().toLowerCase()&&(e=h)}if(null===e)return null;var g,k;d||(d=c&&b.typeIdField&&c._field(b.typeIdField));null!=d&&B.some(b.types,
function(a){return a.id===d?((g=a.domains&&a.domains[e.name])&&"inherited"===g.type&&(g=H(e.name,b),k=!0),!0):!1});k||g||(g=H(a,b));return{field:e,domain:g}}});