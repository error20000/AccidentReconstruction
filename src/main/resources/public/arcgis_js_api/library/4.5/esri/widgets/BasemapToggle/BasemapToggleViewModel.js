// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.5/esri/copyright.txt for details.
//>>built
define("require exports ../../core/tsSupport/declareExtendsHelper ../../core/tsSupport/decorateHelper ../../core/accessorSupport/decorators ../../support/basemapUtils ../../core/Accessor ../../core/Evented ../../support/basemapDefinitions ../../support/basemapUtils".split(" "),function(n,p,g,d,c,h,k,l,m,e){return function(f){function a(b){b=f.call(this,b)||this;b._basemapCache={};b.nextBasemap=e.ensureType("hybrid",b._basemapCache);b.view=null;b.toggle=b.toggle.bind(b);return b}g(a,f);a.prototype.destroy=
function(){this.view=null};Object.defineProperty(a.prototype,"activeBasemap",{get:function(){return e.ensureType(this.get("view.map.basemap")||"topo",this._basemapCache)},enumerable:!0,configurable:!0});a.prototype.castNextBasemap=function(b){return e.ensureType(b,this._basemapCache)};Object.defineProperty(a.prototype,"state",{get:function(){return this.get("view.ready")?"ready":"disabled"},enumerable:!0,configurable:!0});a.prototype.toggle=function(){if("disabled"!==this.state){var b=this.activeBasemap,
a=this.nextBasemap;this.view.map.basemap=a;this.nextBasemap=b;this.emit("toggle",{previous:b,current:a})}};a.getThumbnailUrl=function(b){if(!b)return null;var a=b.thumbnailUrl;return a?a:(a=h.getWellKnownBasemapId(b))?m[a].thumbnailUrl:(b=b.baseLayers.find(function(a){return!!a.get("portalItem.thumbnailUrl")}))?b.get("portalItem.thumbnailUrl"):null};d([c.property({dependsOn:["view.map.basemap"],readOnly:!0})],a.prototype,"activeBasemap",null);d([c.property()],a.prototype,"nextBasemap",void 0);d([c.cast("nextBasemap")],
a.prototype,"castNextBasemap",null);d([c.property({dependsOn:["view.ready"],readOnly:!0})],a.prototype,"state",null);d([c.property()],a.prototype,"view",void 0);d([c.property()],a.prototype,"toggle",null);return a=d([c.subclass("esri.widgets.BasemapToggle.BasemapToggleViewModel")],a)}(c.declared(k,l))});