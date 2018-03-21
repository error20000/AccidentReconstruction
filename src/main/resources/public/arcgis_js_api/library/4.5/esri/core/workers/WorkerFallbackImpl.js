// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.5/esri/copyright.txt for details.
//>>built
define(["require","exports","../global"],function(l,n,d){var m=function(){return function(){var b=this,a=document.createDocumentFragment();["addEventListener","dispatchEvent","removeEventListener"].forEach(function(g){b[g]=function(){for(var c=[],b=0;b<arguments.length;b++)c[b]=arguments[b];return a[g].apply(a,c)}})}}(),h=d.MutationObserver||d.WebKitMutationObserver,k=function(){var b;if(d.process&&d.process.nextTick)b=function(a){d.process.nextTick(a)};else if(d.Promise)b=function(a){d.Promise.resolve().then(a)};
else if(h){var a=[],g=document.createElement("div");(new h(function(){for(;0<a.length;)a.shift()()})).observe(g,{attributes:!0});b=function(c){a.push(c);g.setAttribute("queueStatus","1")}}return b}();return function(){function b(){this._dispatcher=new m;this._connections={};this._outgoingStaticMessages={};this._isInitialized=!1;this._workerPostMessage({type:"\x3cworker-loaded\x3e"})}b.prototype.terminate=function(){this._connections={}};Object.defineProperty(b.prototype,"onmessage",{get:function(){return this._onmessageHandler},
set:function(a){this._onmessageHandler&&this.removeEventListener("message",this._onmessageHandler);(this._onmessageHandler=a)&&this.addEventListener("message",a)},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"onerror",{get:function(){return this._onerrorHandler},set:function(a){this._onerrorHandler&&this.removeEventListener("error",this._onerrorHandler);(this._onerrorHandler=a)&&this.addEventListener("error",a)},enumerable:!0,configurable:!0});b.prototype.postMessage=function(a,
b){var c=this;k(function(){c._workerMessageHandler(new MessageEvent("message",{data:a}))})};b.prototype.dispatchEvent=function(a){return this._dispatcher.dispatchEvent(a)};b.prototype.addEventListener=function(a,b,c){this._dispatcher.addEventListener(a,b,c)};b.prototype.removeEventListener=function(a,b,c){this._dispatcher.removeEventListener(a,b,c)};b.prototype._workerPostMessage=function(a,b){var c=this;k(function(){c.dispatchEvent(new MessageEvent("message",{data:a}))})};b.prototype._workerMessageHandler=
function(a){var b=this,c=a.data;if(c){var e=c.connection,f=c.type;if("\x3cconfigure\x3e"===f)this._isInitialized||this._workerPostMessage({type:"\x3cworker-configured\x3e"});else if("\x3copen-connection\x3e"===f){a=c.data.path;var d=c.id;this._connections[e]?this._workerPostMessage({type:"\x3cresponse\x3e",id:d,connection:e}):l(["./WorkerConnection",a],function(a,c){b._connections[e]=new a(c,{postMessage:function(a,c){return b._workerPostMessage(a,c)}},e);b._workerPostMessage({type:"\x3cresponse\x3e",
id:d,data:{connection:e},error:void 0})})}else"\x3cclose-connection\x3e"===f?this._connections[e]&&delete this._connections[e]:"\x3cstatic-message\x3e"===f?(a=c.id,this._outgoingStaticMessages[a]&&(f=this._outgoingStaticMessages[a],delete this._outgoingStaticMessages[a],c.error?f.reject(c.error):f.resolve(c.data))):f&&(c=this._connections[e])&&c.proxy.message(a)}};return b}()});