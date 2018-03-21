// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.5/esri/copyright.txt for details.
//>>built
define("require exports ../core/tsSupport/declareExtendsHelper ../core/tsSupport/decorateHelper ./Layer ../core/promiseUtils ../core/Error ../core/MultiOriginJSONSupport ./mixins/PortalLayer ../core/accessorSupport/decorators".split(" "),function(n,p,f,d,g,h,k,l,m,b){return function(e){function a(c){c=e.call(this)||this;c.resourceInfo=null;c.type="unknown";return c}f(a,e);a.prototype.initialize=function(){var c=this.resourceInfo&&(this.resourceInfo.layerType||this.resourceInfo.type),a="Unknown layer type";
c&&(a+=" "+c);this.addResolvingPromise(h.reject(new k("layer:unknown-layer-type",a,{layerType:c})))};a.prototype.read=function(a,b){this.inherited(arguments,[{resourceInfo:a},b]);return this};a.prototype.write=function(a,b){return null};d([b.shared("esri.layers.UnknownLayer")],a.prototype,"declaredClass",void 0);d([b.property({readOnly:!0})],a.prototype,"resourceInfo",void 0);d([b.property({json:{read:!1},readOnly:!0,value:"unknown"})],a.prototype,"type",void 0);return a=d([b.subclass()],a)}(b.declared(g,
l,m))});