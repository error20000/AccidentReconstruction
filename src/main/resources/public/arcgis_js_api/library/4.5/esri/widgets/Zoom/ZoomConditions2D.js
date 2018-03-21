// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.5/esri/copyright.txt for details.
//>>built
define("require exports ../../core/tsSupport/declareExtendsHelper ../../core/tsSupport/decorateHelper ../../core/accessorSupport/decorators ../../core/Accessor".split(" "),function(g,h,e,c,b,f){return function(d){function a(){return null!==d&&d.apply(this,arguments)||this}e(a,d);Object.defineProperty(a.prototype,"canZoomIn",{get:function(){var a=this.get("view.scale"),b=this.get("view.constraints.effectiveMaxScale");return 0===b||a>b},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,
"canZoomOut",{get:function(){var a=this.get("view.scale"),b=this.get("view.constraints.effectiveMinScale");return 0===b||a<b},enumerable:!0,configurable:!0});c([b.property({dependsOn:["view.ready","view.scale"],readOnly:!0})],a.prototype,"canZoomIn",null);c([b.property({dependsOn:["view.ready","view.scale"],readOnly:!0})],a.prototype,"canZoomOut",null);c([b.property()],a.prototype,"view",void 0);return a=c([b.subclass("esri.widgets.Zoom.ZoomConditions2D")],a)}(b.declared(f))});