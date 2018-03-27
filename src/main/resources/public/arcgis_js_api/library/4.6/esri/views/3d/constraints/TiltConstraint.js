// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.6/esri/copyright.txt for details.
//>>built
define("require exports ../../../core/tsSupport/declareExtendsHelper ../../../core/tsSupport/decorateHelper ../../../core/accessorSupport/decorators ../../../core/Accessor ../support/mathUtils ../state/Constraints".split(" "),function(b,e,k,d,c,l,f,g){Object.defineProperty(e,"__esModule",{value:!0});var m=f.rad2deg(g.TiltDefault.min),h=f.rad2deg(g.TiltDefault.max);b=function(b){function a(){var a=null!==b&&b.apply(this,arguments)||this;a.mode="auto";return a}k(a,b);Object.defineProperty(a.prototype,
"max",{get:function(){return this._get("max")},set:function(a){this._set("max",a);this.mode="manual"},enumerable:!0,configurable:!0});a.prototype.castMax=function(a){return f.clamp(a,m,h)};a.prototype.autoUpdate=function(a){"auto"===this.mode&&this._get("max")!==a&&this._set("max",a)};d([c.property({type:String})],a.prototype,"mode",void 0);d([c.property({type:Number,value:h})],a.prototype,"max",null);d([c.cast("max")],a.prototype,"castMax",null);return a=d([c.subclass("esri.views.3d.constraints.TiltConstraint")],
a)}(c.declared(l));e.TiltConstraint=b;e.default=b});