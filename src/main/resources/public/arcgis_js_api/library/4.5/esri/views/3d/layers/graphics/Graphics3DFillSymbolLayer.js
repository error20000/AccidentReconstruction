// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.5/esri/copyright.txt for details.
//>>built
define("require exports ../../../../core/tsSupport/extendsHelper ../../../../core/screenUtils ./Graphics3DSymbolLayer ./Graphics3DGraphicLayer ./Graphics3DDrapedGraphicLayer ./ElevationAligners ./Graphics3DSymbolCommonCode ./lineUtils ./graphicUtils ../../../../geometry/Polygon ../../../../Color ../../lib/glMatrix ../../support/aaBoundingBox ../../webgl-engine/Stage ../../webgl-engine/lib/Object3D ../../webgl-engine/lib/Geometry ../../webgl-engine/lib/GeometryData ../../webgl-engine/lib/RenderGeometry ../../webgl-engine/materials/ColorMaterial ../../webgl-engine/lib/Util ./earcut/earcut".split(" "),
function(y,R,F,G,x,H,I,J,l,t,K,L,M,z,r,u,N,A,O,B,P,Q,C){var v=Q.VertexAttrConstants;y=z.vec3d;var q=z.mat4d;x=function(w){function m(){var a=null!==w&&w.apply(this,arguments)||this;a._elevationOptions={supportsOffsetAdjustment:!1,supportsOnTheGround:!0};return a}F(m,w);m.prototype._prepareResources=function(){this._prepareFillResources();this._prepareOutlineResources();this.resolve()};m.prototype._prepareFillResources=function(){var a=this._getStageIdHint(),b=this._getMaterialOpacityAndColor(),b=
{color:b,transparent:1>b[3]||this._isPropertyDriven("opacity"),polygonOffset:!1,vertexColors:!0};this._material=new P(b,a+"_colormat");this._context.stage.add(u.ModelContentType.MATERIAL,this._material)};m.prototype._prepareOutlineResources=function(){var a=this.symbol.outline;if(this._hasOutline=!!(a&&a.size&&0<a.size&&a.color))a={idHint:this._getStageIdHint()+"_outline",color:this._getOutlineColor(),width:G.pt2px(a.size)},2<a.width?(this._outlineMaterial=t.createRibbonMaterial(a),this._isOutlineNativeLineMaterial=
!1):(this._outlineMaterial=t.createNativeMaterial(a),this._isOutlineNativeLineMaterial=!0),this._context.stage.add(u.ModelContentType.MATERIAL,this._outlineMaterial)};m.prototype.destroy=function(){w.prototype.destroy.call(this);this.isFulfilled()||this.reject();this._material&&(this._context.stage.remove(u.ModelContentType.MATERIAL,this._material.getId()),this._material=null);this._outlineMaterial&&(this._context.stage.remove(u.ModelContentType.MATERIAL,this._outlineMaterial.getId()),this._outlineMaterial=
null)};m.prototype.createGraphics3DGraphic=function(a,b){var k=this._validateGeometry(a.geometry);if("polyline"!==k.type&&"polygon"!==k.type&&"extent"!==k.type)return this._logWarning("unsupported geometry type for fill symbol: "+k.type),null;k="graphic"+a.uid;b=this._getVertexOpacityAndColor(b,Uint8Array,255);var h=this.getGraphicElevationInfo(a);return"on-the-ground"===h.mode?this._createAsOverlay(a,b,h,k):this._createAs3DShape(a,b,h,k,a.uid)};m.prototype.layerPropertyChanged=function(a,b,k){if("opacity"===
a)return b=this._material.getColor(),b[3]=this._getMaterialOpacity(),this._material.setColor(b),this._material.setTransparent(1>b[3]),this._outlineMaterial&&(this._isOutlineNativeLineMaterial?(b=this._outlineMaterial.getColor(),b[3]=this._getOutlineOpacity(),this._outlineMaterial.setColor(b)):(b=this._outlineMaterial.getParameterValues(),b.color[3]=this._getOutlineOpacity(),this._outlineMaterial.setParameterValues({color:b.color}))),!0;if("elevationInfo"===a){a=this._elevationInfo.mode;this._updateElevationInfo();
var h=this._elevationInfo.mode;if(null==a||null==h)return!1;if("on-the-ground"===a&&"on-the-ground"===h)return!0;if(a!==h&&("on-the-ground"===a||"on-the-ground"===h))return!1;a=l.needsElevationUpdates2D(h);for(var g in b){var c=b[g];(h=k(c))&&!h.isDraped()&&(c=c.graphic,h.needsElevationUpdates=a,h.elevationInfo.set(this.getGraphicElevationInfo(c)))}return!0}return!1};m.prototype.setDrawOrder=function(a,b,k){this._material&&(this._material.setRenderPriority(a+b/2),k[this._material.getId()]=!0);this._outlineMaterial&&
(this._outlineMaterial.setRenderPriority(a),k[this._outlineMaterial.getId()]=!0)};m.prototype._createAs3DShape=function(a,b,k,h,g){var c=this._getPolyGeometry(a),d=c.hasZ;a=c.rings;var e=this._getOutlineGeometry(c,a),c=l.getGeometryVertexData3D(e,d,c.spatialReference,this._context.renderSpatialReference,this._context.elevationProvider,this._context.renderCoordsHelper,k);f.idHint=h;f.color=b;f.data=c;var D;this._hasOutline&&(D=new c.vertexData.constructor(c.vertexData));f.outNum=0;f.outGeometries=
[];f.outTransforms=[];f.outMaterials=[];this._createAs3DShapeFill(f);f.data.vertexData=D;this._createAs3DShapeOutline(f);this._logGeometryCreationWarnings(f.data,a,"rings","FillSymbol3DLayer");if(0===f.outNum)return null;b=new N({geometries:f.outGeometries,materials:f.outMaterials,transformations:f.outTransforms,castShadow:!1,metadata:{layerUid:this._context.layer.uid,graphicId:g},idHint:h});b=new H(this,b,f.outGeometries,null,null,J.perVertexElevationAligner,k);b.alignedTerrainElevation=c.terrainElevation;
b.needsElevationUpdates=l.needsElevationUpdates2D(k.mode);return b};m.prototype._createAs3DShapeFill=function(a){for(var b=a.data.geometryData.polygons,k=a.data.eleVertexData,h=a.data.vertexData,g=function(e){var d=b[e];e=d.count;var g=d.index;if(c._context.clippingExtent&&(l.computeBoundingBox(k,g,e,n),l.boundingBoxClipped(n,c._context.clippingExtent)))return"continue";var f=new Float64Array(k.buffer,3*g*k.BYTES_PER_ELEMENT,3*e),m=new Float64Array(h.buffer,3*g*h.BYTES_PER_ELEMENT,3*e),d=d.holeIndices.map(function(a){return a-
g}),d=C(f,d,3);if(0===d.length)return"continue";l.chooseOrigin(h,g,e,p);l.subtractCoordinates(h,g,e,p);e=c._createFillGeometry(d,0,m,f,a.color);e=new A(e,a.idHint);e.singleUse=!0;f=q.identity();q.translate(f,p,f);a.outGeometries.push(e);a.outMaterials.push([c._material]);a.outTransforms.push(f);a.outNum++},c=this,d=0;d<b.length;++d)g(d)};m.prototype._createAs3DShapeOutline=function(a){if(this._hasOutline)for(var b=a.data.geometryData.outlines,f=a.data.eleVertexData,h=a.data.vertexData,g=0;g<b.length;++g){var c=
b[g],d=c.index,e=c.count;if(this._context.clippingExtent&&(l.computeBoundingBox(f,d,e,n),l.boundingBoxClipped(n,this._context.clippingExtent)))continue;l.chooseOrigin(h,d,e,p);l.subtractCoordinates(h,d,e,p);c=new Float64Array(f.buffer,3*d*f.BYTES_PER_ELEMENT,3*e);d=new Float64Array(h.buffer,3*d*h.BYTES_PER_ELEMENT,3*e);d=t.createPolylineGeometry(d,c,a.isRings,E,0);d=new A(d,a.idHint+"outline"+g);d.singleUse=!0;c=q.identity();q.translate(c,p,c);a.outGeometries.push(d);a.outMaterials.push([this._outlineMaterial]);
a.outTransforms.push(c);a.outNum++}};m.prototype._createAsOverlay=function(a,b,k,h){var g=this._getPolyGeometry(a);a=g.rings;var c=this._getOutlineGeometry(g,a);this._material.setRenderPriority(this._symbolLayerOrder+this._symbolLayerOrderDelta/2);this._hasOutline&&this._outlineMaterial.setRenderPriority(this._symbolLayerOrder);g=l.getGeometryVertexDataDraped(c,g.spatialReference,this._context.overlaySR);f.idHint=h;f.color=b;f.data=g;var d;this._hasOutline&&(d=new g.vertexData.constructor(g.vertexData));
f.outNum=0;f.outGeometries=[];f.outBoundingBox=r.create(r.NEGATIVE_INFINITY);this._createAsOverlayFill(f);f.data.vertexData=d;this._createAsOverlayOutline(f);this._logGeometryCreationWarnings(f.data,a,"rings","FillSymbol3DLayer");return 0<f.outNum?new I(this,f.outGeometries,null,null,f.outBoundingBox,k):null};m.prototype._createAsOverlayFill=function(a){for(var b=a.data.vertexData,f=a.data.geometryData.polygons,h=function(d){var e=f[d];d=e.count;var c=e.index,h=new Float64Array(b.buffer,3*c*b.BYTES_PER_ELEMENT,
3*d),e=e.holeIndices.map(function(a){return a-c}),h=C(h,e,3);if(0===h.length)return"continue";l.computeBoundingBox(b,c,d,n);if(l.boundingBoxClipped(n,g._context.clippingExtent))return"continue";r.expand(a.outBoundingBox,n);l.chooseOrigin(b,c,d,p);l.subtractCoordinates(b,c,d,p);l.setZ(b,c,d,g._getDrapedZ());d=q.identity();q.translate(d,p,d);h=g._createFillGeometry(h,c,b,null,a.color);e=new B(h);e.material=g._material;var k=n;e.center=[.5*(k[0]+k[3]),.5*(k[1]+k[4]),0];e.bsRadius=.5*Math.sqrt((k[3]-
k[0])*(k[3]-k[0])+(k[4]-k[1])*(k[4]-k[1]));e.transformation=d;e.name=a.idHint;e.uniqueName=a.idHint+"#"+h.id;a.outGeometries.push(e);a.outNum++},g=this,c=0;c<f.length;++c)h(c)};m.prototype._createAsOverlayOutline=function(a){if(this._hasOutline)for(var b=a.data.vertexData,f=a.data.geometryData.outlines,h=0;h<f.length;++h){var g=f[h],c=g.index,g=g.count;l.computeBoundingBox(b,c,g,n);if(!l.boundingBoxClipped(n,this._context.clippingExtent)){r.expand(a.outBoundingBox,n);l.chooseOrigin(b,c,g,p);l.subtractCoordinates(b,
c,g,p);l.setZ(b,c,g,this._getDrapedZ());g=new Float64Array(b.buffer,3*c*b.BYTES_PER_ELEMENT,3*g);c=q.identity();q.translate(c,p,c);var g=t.createPolylineGeometry(g,null,!0,E,0),d=new B(g);d.material=this._outlineMaterial;var e=n;d.center=[.5*(e[0]+e[3]),.5*(e[1]+e[4]),0];d.bsRadius=.5*Math.sqrt((e[3]-e[0])*(e[3]-e[0])+(e[4]-e[1])*(e[4]-e[1]));d.transformation=c;d.name=a.idHint+"outline";d.uniqueName=a.idHint+"outline#"+g.id;a.outGeometries.push(d);a.outNum++}}};m.prototype._getOutlineGeometry=function(a,
b){return b};m.prototype._getOutlineOpacity=function(){return this._getLayerOpacity()*this.symbol.outline.color.a};m.prototype._getOutlineColor=function(){var a=this.symbol.outline.color,b=this._getOutlineOpacity();return K.mixinColorAndOpacity(M.toUnitRGB(a),b)};m.prototype._getPolyGeometry=function(a){a=a.geometry;return"extent"===a.type?L.fromExtent(a):a};m.prototype._createFillGeometry=function(a,b,f,h,g){for(var c=a.length,d=new Uint32Array(c),e=new Uint32Array(c),k=0;k<c;k++)d[k]=a[k]+b,e[k]=
0;a={};b={};a[v.POSITION]=d;a[v.COLOR]=e;b[v.POSITION]={size:3,data:f};b[v.COLOR]={size:4,data:g};h&&(b.mapPos={size:3,data:h},a.mapPos=d);return new O(b,a)};return m}(x);var n=r.create(),p=y.create(),E=new Float32Array([255,255,255,255]),f={idHint:null,color:null,data:null,outNum:0,outBoundingBox:null,outGeometries:null,outMaterials:null,outTransforms:null};return x});