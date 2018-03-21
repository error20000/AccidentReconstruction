// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.5/esri/copyright.txt for details.
//>>built
define("require exports ../../../../core/tsSupport/declareExtendsHelper ../../../../core/tsSupport/decorateHelper ../../../../core/accessorSupport/decorators ../../../../core/Accessor ../../../../core/Logger ../../../../geometry/Point ../../webgl-engine/lib/Selector ../../support/Evented ../../support/aaBoundingRect ../../lib/glMatrix".split(" "),function(x,y,q,k,d,r,t,u,v,w,g,h){var e=g.create(g.NEGATIVE_INFINITY),f={spatialReference:null,extent:e},c=h.vec3d.create(),l=h.vec3d.create(),m=h.vec3d.create(),
n=t.getLogger("esri.views.3d.layers.i3s.I3SElevationProvider");return function(p){function b(a){return p.call(this)||this}q(b,p);b.prototype.initialize=function(){this.renderCoordsHelper=this.layerView.view.renderCoordsHelper;this.intersectLayers=[this.stageLayer];this.selector=new v(this.layerView.view.viewingMode);var a=this.layerView.layer.fullExtent;this.zmin=a.zmin;this.zmax=a.zmax};b.prototype.getElevation=function(a){if(a instanceof u){if(!this.renderCoordsHelper.toRenderCoords(a,c))return n.error("could not project point for elevation alignment"),
-Infinity}else if(!this.renderCoordsHelper.toRenderCoords(a,this.spatialReference,c))return n.error("could not project point for elevation alignment"),-Infinity;var b=this.layerView.elevationOffset;a=this.zmin+b;b=this.zmax+b;h.vec3d.set(c,l);h.vec3d.set(c,m);this.renderCoordsHelper.setAltitude(b,l);this.renderCoordsHelper.setAltitude(a,m);this.selector.init(this.intersectLayers,l,m,null,null,1,!1);return this.selector.getMinResult().getIntersectionPoint(c)?this.renderCoordsHelper.getAltitude(c):
-Infinity};b.prototype.objectCreated=function(a){this.objectChanged(a)};b.prototype.objectDeleted=function(a){this.objectChanged(a)};b.prototype.visibilityChanged=function(a){void 0!==a?this.objectChanged(a):this.spatialReference&&(f.extent=this.computeLayerExtent(this.intersectLayers[0]),f.spatialReference=this.spatialReference,this.emit("elevation-change",f))};b.prototype.objectChanged=function(a){this.spatialReference&&(f.extent=this.computeObjectExtent(a),f.spatialReference=this.spatialReference,
this.emit("elevation-change",f))};b.prototype.computeObjectExtent=function(a){g.set(e,g.NEGATIVE_INFINITY);this.expandExtent(a,e);return e};b.prototype.computeLayerExtent=function(a){g.set(e,g.NEGATIVE_INFINITY);var b=0;for(a=a.getObjects();b<a.length;b++)this.expandExtent(a[b],e);return e};b.prototype.expandExtent=function(a,b){for(var e=a.getBBMin(!0),f=a.getBBMax(!0),d=0;8>d;++d)c[0]=d&1?e[0]:f[0],c[1]=d&2?e[1]:f[1],c[2]=d&4?e[2]:f[2],h.mat4d.multiplyVec3(a.objectTransformation,c),this.renderCoordsHelper.fromRenderCoords(c,
c,this.spatialReference),g.expand(b,c);return b};k([d.property({constructOnly:!0})],b.prototype,"layerView",void 0);k([d.property({constructOnly:!0})],b.prototype,"stageLayer",void 0);k([d.property({readOnly:!0,aliasOf:"layerView.view.elevationProvider.spatialReference"})],b.prototype,"spatialReference",void 0);return b=k([d.subclass("esri.views.3d.layers.i3s.I3SElevationProvider")],b)}(d.declared(r,w.Evented))});