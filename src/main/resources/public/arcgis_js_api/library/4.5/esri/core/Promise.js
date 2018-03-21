// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.5/esri/copyright.txt for details.
//>>built
define("./declare dojo/promise/all dojo/aspect dojo/Deferred dojo/errors/create ./Scheduler".split(" "),function(l,m,n,g,p,q){var h=function(a){if(!a.isFulfilled()){var b=a._promiseProps,c=b.resolvingPromises,d,f;b.allPromise&&b.allPromise.cancel();var e=new g;for(d=c.length-1;0<=d;d--)f=c[d],f.isCanceled&&f.isCanceled()?c.splice(d,1):f.then(null,null,b.resolver.progress);f=null;(b.allPromise=m(c.concat([e.promise]))).then(function(){b.resolver.resolve(a);a=b=e=b.allPromise=b.resolvingPromises=null},
function(c){b.allPromise=null;if(!c||"cancel"!==c.dojoType){var d=Array.prototype.slice.call(arguments,0);b.resolver.reject(d[0]);a=b=e=b.allPromise=b.resolvingPromises=null}});e&&q.schedule(function(){e&&e.resolve()})}},r=p("CancelError",null,function(a){this.target=a}),t=function(a){return a||new r(this.instance)},k=function(a){this.instance=a;this.canceler=t.bind(this);this.resolver=new g;this.initialized=!1;this.resolvingPromises=[]};k.prototype={canceler:null,cancel:function(a){if(!this.resolver.isFulfilled()){this.allPromise.cancel();
for(var b=this.resolvingPromises.concat(),c=b.length-1;0<=c;c--)b[c].cancel(a);this.resolver.cancel(a)}}};return l(null,{declaredClass:"esri.core.Promise",constructor:function(){Object.defineProperty(this,"_promiseProps",{value:new k(this),enumerable:!1,configurable:!1,writable:!0});var a=n.after(this,"postscript",function(b,c){a.remove();a=null;h(this)},!0)},_promiseProps:null,always:function(a){return this.then(a,a)},then:function(a,b,c){var d=new g(this._promiseProps.canceler);a=d.then(a,b,c);
this._promiseProps.resolver.then(d.resolve,d.reject,d.progress);return a},isResolved:function(){return this._promiseProps.resolver.isResolved()},isRejected:function(){return this._promiseProps.resolver.isRejected()},isFulfilled:function(){return this._promiseProps.resolver.isFulfilled()},otherwise:function(a){return this.then(null,a)},addResolvingPromise:function(a){a&&!this.isFulfilled()&&(this._promiseProps.resolvingPromises.push(a),h(this))}})});