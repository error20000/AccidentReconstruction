// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.6/esri/copyright.txt for details.
//>>built
define("require exports ../core/tsSupport/declareExtendsHelper ../core/tsSupport/decorateHelper ./Symbol3DLayer ./support/Symbol3DOutline ./support/Symbol3DFillMaterial ../core/accessorSupport/decorators".split(" "),function(l,m,f,c,g,h,k,b){return function(e){function a(a){a=e.call(this)||this;a.type="fill";a.material=null;a.outline=null;return a}f(a,e);d=a;a.prototype.clone=function(){return new d({enabled:this.enabled,elevationInfo:this.elevationInfo&&this.elevationInfo.clone(),material:this.material&&
this.material.clone(),outline:this.outline&&this.outline.clone()})};c([b.property()],a.prototype,"type",void 0);c([b.property({type:k.default})],a.prototype,"material",void 0);c([b.property({type:h.default,json:{write:!0}})],a.prototype,"outline",void 0);return a=d=c([b.subclass("esri.symbols.FillSymbol3DLayer")],a);var d}(b.declared(g))});