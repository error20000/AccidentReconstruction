// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.5/esri/copyright.txt for details.
//>>built
define("require exports ../../../../core/tsSupport/declareExtendsHelper ../../../../core/tsSupport/decorateHelper ../../../../core/accessorSupport/decorators ../../../../core/HandleRegistry ../../../../core/Accessor ./disposeMembers".split(" "),function(b,e,f,d,c,g,h,k){Object.defineProperty(e,"__esModule",{value:!0});b=function(b){function a(a){a=b.call(this)||this;a.handles=new g;return a}f(a,b);a.prototype.destroy=function(){k.default(this,"handles")};d([c.property({constructOnly:!0})],a.prototype,
"renderCoordsHelper",void 0);d([c.property({constructOnly:!0})],a.prototype,"surface",void 0);d([c.property({constructOnly:!0})],a.prototype,"viewState",void 0);return a=d([c.subclass("esri.views.3d.support.PointOfInterest")],a)}(c.declared(h));e.PointOfInterest=b;e.default=b});