// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.5/esri/copyright.txt for details.
//>>built
define("require exports ../core/tsSupport/declareExtendsHelper ../core/tsSupport/decorateHelper ../core/lang ./Symbol3D ./support/Symbol3DVerticalOffset ./callouts/calloutUtils ../core/accessorSupport/decorators".split(" "),function(m,n,h,c,d,k,l,e,b){return function(g){function a(a){a=g.call(this)||this;a.verticalOffset=null;a.callout=null;a.type="label-3d";return a}h(a,g);f=a;a.prototype.supportsCallout=function(){return!0};a.prototype.hasVisibleCallout=function(){return e.hasVisibleCallout(this)};
a.prototype.hasVisibleVerticalOffset=function(){return e.hasVisibleVerticalOffset(this)};a.prototype.clone=function(){return new f({styleOrigin:d.clone(this.styleOrigin),symbolLayers:d.clone(this.symbolLayers),thumbnail:d.clone(this.thumbnail),callout:d.clone(this.callout),verticalOffset:d.clone(this.verticalOffset)})};c([b.property({type:l.default,json:{write:!0}})],a.prototype,"verticalOffset",void 0);c([b.property(e.calloutProperty)],a.prototype,"callout",void 0);c([b.property()],a.prototype,"type",
void 0);c([b.shared(["text"])],a.prototype,"_allowedLayerTypes",void 0);return a=f=c([b.subclass("esri.symbols.LabelSymbol3D")],a);var f}(b.declared(k))});