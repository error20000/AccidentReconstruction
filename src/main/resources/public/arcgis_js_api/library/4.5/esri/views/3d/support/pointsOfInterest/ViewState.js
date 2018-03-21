// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.5/esri/copyright.txt for details.
//>>built
define("require exports ../../../../core/tsSupport/declareExtendsHelper ../../../../core/tsSupport/decorateHelper ../../../../core/accessorSupport/decorators ../../../../core/Accessor ./PropertiesPool ./disposeMembers ../../webgl-engine/lib/Camera".split(" "),function(c,e,f,d,b,g,h,k,l){Object.defineProperty(e,"__esModule",{value:!0});c=function(c){function a(a){a=c.call(this,a)||this;a.propertiesPool=new h.default({camera:l},a);return a}f(a,c);a.prototype.normalizeCtorArgs=function(a){var b=this;
this.cameraChangeHandle=a.view.navigation.on("currentViewChanged",function(a){return b.currentViewChangedHandler(a.camera)});this.camera=a.view.navigation.currentCamera.copy();return{mode:a.view.viewingMode,spatialReference:a.view.spatialReference}};a.prototype.initialize=function(){};a.prototype.destroy=function(){k.default(this,"cameraChangeHandle","propertiesPool")};Object.defineProperty(a.prototype,"isGlobal",{get:function(){return!this.isLocal},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,
"isLocal",{get:function(){return"local"===this.mode},enumerable:!0,configurable:!0});a.prototype.currentViewChangedHandler=function(a){this.camera.equals(a)||(this.camera=this.propertiesPool.get("camera").copyFrom(a))};d([b.property()],a.prototype,"camera",void 0);d([b.property({dependsOn:["isLocal"]})],a.prototype,"isGlobal",null);d([b.property({dependsOn:["mode"]})],a.prototype,"isLocal",null);d([b.property({constructOnly:!0})],a.prototype,"mode",void 0);d([b.property({constructOnly:!0})],a.prototype,
"spatialReference",void 0);return a=d([b.subclass()],a)}(b.declared(g));e.ViewState=c;e.default=c});