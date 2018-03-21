// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.5/esri/copyright.txt for details.
//>>built
define("require exports ../../core/tsSupport/declareExtendsHelper ../../core/tsSupport/decorateHelper ../../core/accessorSupport/decorators ../../core/Accessor ../../views/2d/draw/Draw ../../core/Evented ../../Graphic ../../core/HandleRegistry ../../geometry/Point ../../geometry/Polygon ../../geometry/Polyline ../../symbols/SimpleFillSymbol ../../symbols/SimpleLineSymbol ../../symbols/SimpleMarkerSymbol".split(" "),function(x,y,l,f,e,m,n,p,d,q,h,r,t,u,v,w){var g=function(){return function(d,c){this.geometry=
d;this.graphic=c;this.type="draw-complete"}}();return function(k){function c(a){a=k.call(this,a)||this;a._actionHandles=new q;a.draw=null;a.graphic=null;a.pointSymbol=new w;a.polygonSymbol=new u;a.polylineSymbol=new v;a.view=null;return a}l(c,k);c.prototype.initialize=function(){this.draw=new n({view:this.view})};c.prototype.destroy=function(){this.reset();this._actionHandles.destroy();this._actionHandles=null;this.draw&&(this.draw.destroy(),this.draw=null);this.view=null};Object.defineProperty(c.prototype,
"state",{get:function(){return this.get("view.ready")?"ready":"disabled"},enumerable:!0,configurable:!0});c.prototype.create=function(a){this.reset();"point"===a?this._createPoint():"polygon"===a?this._createPolygon():"polyline"===a&&this._createPolyline()};c.prototype.reset=function(){this._actionHandles.removeAll();this.graphic&&this.get("view.graphics")&&(this.view.graphics.remove(this.graphic),this.graphic=null);this.get("draw.activeAction")&&(this.draw.activeAction.destroy(),this.draw.activeAction=
null)};c.prototype._createPoint=function(){var a=this,c=this.draw.create("point");this._actionHandles.add([c.on("cursor-update",function(b){a.view.graphics.remove(a.graphic);b=b.coordinates;b=new h({x:b[0],y:b[1],spatialReference:a.view.spatialReference});a.graphic=new d(b,a.pointSymbol);a.view.graphics.add(a.graphic)}),c.on("draw-complete",function(b){a.view.graphics.remove(a.graphic);b=b.coordinates;b=new h({x:b[0],y:b[1],spatialReference:a.view.spatialReference});a.graphic=new d(b,a.pointSymbol);
a.emit("draw-complete",new g(b,a.graphic.clone()))})])};c.prototype._createPolygon=function(){var a=this,c=this.draw.create("polygon");this._actionHandles.add([c.on("vertex-add",function(b){a.view.graphics.remove(a.graphic);a.graphic=new d(a._createPolygonFromVertices(b.vertices),a.polygonSymbol);a.view.graphics.add(a.graphic)}),c.on("vertex-remove",function(b){a.view.graphics.remove(a.graphic);a.graphic=new d(a._createPolygonFromVertices(b.vertices),a.polygonSymbol);a.view.graphics.add(a.graphic)}),
c.on("cursor-update",function(b){a.view.graphics.remove(a.graphic);a.graphic=new d(a._createPolygonFromVertices(b.vertices),a.polygonSymbol);a.view.graphics.add(a.graphic)}),c.on("draw-complete",function(b){a.view.graphics.remove(a.graphic);b=a._createPolygonFromVertices(b.vertices);a.graphic=new d(b,a.polygonSymbol);a.emit("draw-complete",new g(b,a.graphic.clone()))})])};c.prototype._createPolyline=function(){var a=this,c=this.draw.create("polyline");this._actionHandles.add([c.on("vertex-add",function(b){a.view.graphics.remove(a.graphic);
a.graphic=new d(a._createPolylineFromVertices(b.vertices),a.polylineSymbol);a.view.graphics.add(a.graphic)}),c.on("vertex-remove",function(b){a.view.graphics.remove(a.graphic);a.graphic=new d(a._createPolylineFromVertices(b.vertices),a.polylineSymbol);a.view.graphics.add(a.graphic)}),c.on("cursor-update",function(b){a.view.graphics.remove(a.graphic);a.graphic=new d(a._createPolylineFromVertices(b.vertices),a.polylineSymbol);a.view.graphics.add(a.graphic)}),c.on("draw-complete",function(b){a.view.graphics.remove(a.graphic);
b=a._createPolylineFromVertices(b.vertices);a.graphic=new d(b,a.polylineSymbol);a.emit("draw-complete",new g(b,a.graphic.clone()))})])};c.prototype._createPolylineFromVertices=function(a){return new t({paths:a,spatialReference:this.view.spatialReference})};c.prototype._createPolygonFromVertices=function(a){return new r({rings:a,spatialReference:this.view.spatialReference})};f([e.property()],c.prototype,"draw",void 0);f([e.property()],c.prototype,"graphic",void 0);f([e.property()],c.prototype,"pointSymbol",
void 0);f([e.property()],c.prototype,"polygonSymbol",void 0);f([e.property()],c.prototype,"polylineSymbol",void 0);f([e.property({dependsOn:["view.ready"],readOnly:!0})],c.prototype,"state",null);f([e.property()],c.prototype,"view",void 0);return c=f([e.subclass("esri.views.2d.SketchViewModel")],c)}(e.declared(m,p))});