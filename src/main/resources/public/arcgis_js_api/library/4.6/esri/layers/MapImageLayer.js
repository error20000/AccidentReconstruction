// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.6/esri/copyright.txt for details.
//>>built
define("require exports ../core/tsSupport/declareExtendsHelper ../core/tsSupport/decorateHelper ../core/tsSupport/paramHelper ../core/accessorSupport/decorators dojo/_base/lang dojo/io-query ../core/Error ../core/promiseUtils ../geometry/Extent ../config ../request ./DynamicLayer ./mixins/ScaleRangeLayer ./mixins/ArcGISDynamicMapService ./mixins/OperationalLayer ./mixins/PortalLayer ./mixins/RefreshableLayer".split(" "),function(z,A,l,d,m,c,f,n,p,g,q,r,h,t,u,v,w,x,y){return function(e){function b(a,
b){a=e.call(this)||this;a.alwaysRefetch=!1;a.legendEnabled=!0;a.operationalLayerType="ArcGISMapServiceLayer";a.type="map-image";return a}l(b,e);b.prototype.normalizeCtorArgs=function(a,b){return"string"===typeof a?f.mixin({url:a},b):a};b.prototype.load=function(){var a=this;this.addResolvingPromise(this.loadFromPortal({supportedTypes:["Map Service"]}).then(function(){return a._fetchService()}));return this.when()};b.prototype.getImageUrl=function(a,b,c,d){var e=this,k=this.parsedUrl.path+"/export";
a=f.mixin({},this.parsedUrl.query,this.createExportImageParameters(a,b,c,d),{f:"image",token:this.token,_ts:this.alwaysRefetch?(new Date).getTime():null});if(null!=a.dynamicLayers&&-1===this.capabilities.indexOf("DynamicLayers"))return g.reject(new p("mapimagelayer:dynamiclayer-not-supported","service "+this.url+" doesn't support dynamic layers, which is required to be able to change the sublayer's order, rendering, labeling or source.",{query:a}));b=k+"?"+n.objectToQuery(a);return b.length>r.request.maxUrlLength?
(a.f="json",h(k,{query:a,responseType:"json",callbackParamName:"callback"}).then(function(a){return a.data.href+(e.token?"?token\x3d"+e.token:"")})):b};b.prototype._fetchService=function(){var a=this;return g.resolve().then(function(){return a.resourceInfo?{ssl:!1,data:a.resourceInfo}:h(a.parsedUrl.path,{query:f.mixin({f:"json"},a.parsedUrl.query),responseType:"json",callbackParamName:"callback"})}).then(function(b){b.ssl&&(a.url=a.url.replace(/^http:/i,"https:"));a.read(b.data,{origin:"service",
url:a.parsedUrl})})};d([c.property()],b.prototype,"alwaysRefetch",void 0);d([c.property({type:Boolean,json:{origins:{service:{read:{enabled:!1}}},read:{source:"showLegend"},write:{target:"showLegend"}}})],b.prototype,"legendEnabled",void 0);d([c.property()],b.prototype,"operationalLayerType",void 0);d([c.property({json:{read:!1},readOnly:!0,value:"map-image"})],b.prototype,"type",void 0);d([m(0,c.cast(q))],b.prototype,"getImageUrl",null);return b=d([c.subclass("esri.layers.MapImageLayer")],b)}(c.declared(t,
v,w,x,y,u))});