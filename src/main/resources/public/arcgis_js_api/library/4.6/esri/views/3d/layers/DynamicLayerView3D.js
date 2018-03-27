// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.6/esri/copyright.txt for details.
//>>built
define("require exports ../../../core/tsSupport/extendsHelper ../../../core/tsSupport/decorateHelper ../../../core/accessorSupport/decorators ../../../core/HandleRegistry ../../../core/promiseUtils ../../../geometry/Extent ./LayerView3D ./support/overlayImageUtils ./support/projectExtentUtils ../support/debugFlags ../support/aaBoundingRect ../lib/glMatrix ../webgl-engine/Stage ../webgl-engine/lib/Texture ../webgl-engine/lib/RenderGeometry ../webgl-engine/materials/Material ../webgl-engine/lib/Util".split(" "),
function(n,E,r,k,f,t,u,p,v,q,w,x,g,y,l,z,A,B,C){n=function(m){function b(){var a=null!==m&&m.apply(this,arguments)||this;a.supportsDraping=!0;a.hasDraped=!0;a.fullExtentInViewSpatialReference=null;a._overlayUpdating=!1;a.maximumDataResolution=null;a._handles=new t;a._images=[];a._extents=[];return a}r(b,m);Object.defineProperty(b.prototype,"drawingOrder",{get:function(){return this._get("drawingOrder")},set:function(a){if(a!==this._get("drawingOrder")){this._set("drawingOrder",a);var c={};this._images.forEach(function(e){e&&
e.material&&(e.material.setRenderPriority(a),c[e.material.getId()]=!0)});C.objectEmpty(c)||(this.view._stage.getTextureGraphicsRenderer().updateRenderOrder(c),this.emit("draped-data-change"))}},enumerable:!0,configurable:!0});b.prototype.initialize=function(){var a=this;this.drawingOrder=this.view.getDrawingOrder(this.layer.uid);this.addResolvingPromise(w.toView(this).then(function(c){return a._set("fullExtentInViewSpatialReference",c)}));this._handles.add(this.watch("suspended",function(){return a._suspendedChangeHandler()}));
var c=this.notifyChange.bind(this,"suspended");this.view.resourceController.registerIdleFrameWorker(this,{idleBegin:function(){a._isScaleRangeActive()&&c()}});this._isScaleRangeLayer()&&this._handles.add([this.layer.watch("minScale",c),this.layer.watch("maxScale",c)],"layer");this._handles.add([this.watch("fullOpacity",this._opacityChangeHandler.bind(this)),this.layer.on("redraw",this._layerRedrawHandler.bind(this))],"layer")};b.prototype.destroy=function(){this.clear();this._handles.destroy();this.view.resourceController.deregisterIdleFrameWorker(this)};
b.prototype.setDrapingExtent=function(a,c,e,h,d){h=this._extentAndSizeAtResolution(c,e,h);c=h.size;h=h.extent;if("imageMaxWidth"in this.layer||"imageMaxHeight"in this.layer){var b=this.layer.imageMaxWidth,f=this.layer.imageMaxHeight;c.width>b&&(c.height=Math.floor(c.height*b/c.width),c.width=b);c.height>f&&(c.width=Math.floor(c.width*f/c.height),c.height=f)}b=this._extents[a];b&&g.equals(b.extent,h)&&!this._imageSizeDiffers(h,e,b.imageSize,c)||(this._extents[a]={extent:g.create(h),spatialReference:e,
imageSize:c,renderLocalOrigin:d},this.suspended||this._fetch(a))};b.prototype.getGraphicsFromStageObject=function(a,c){return u.reject()};b.prototype.clear=function(){for(var a=0;a<this._images.length;a++)this._clearImage(a)};b.prototype.canResume=function(){if(!this.inherited(arguments))return!1;if(this._isScaleRangeLayer()){var a=this.layer,c=a.minScale,a=a.maxScale;if(0<c||0<a){var e=this.view.scale;if(e<a||0<c&&e>c)return!1}}return!0};b.prototype.isUpdating=function(){if(this._overlayUpdating)return!0;
for(var a=0,c=this._images;a<c.length;a++)if(c[a].loadingPromise)return!0;return!1};b.prototype.processResult=function(a,c){if(c instanceof HTMLImageElement||c instanceof HTMLCanvasElement)a.image=c};b.prototype.updateImage=function(a){return!1};b.prototype.refetch=function(){for(var a=0;a<this._extents.length;a++)this._extents[a]&&this._fetch(a)};b.prototype.beforeFetch=function(){};b.prototype.findExtentInfoAt=function(a){for(var c=0,e=this._extents;c<e.length;c++){var b=e[c],d=b.extent;if((new p(d[0],
d[1],d[2],d[3],b.spatialReference)).contains(a))return b}return null};b.prototype._imageSizeDiffers=function(a,c,e,b){if(!this.maximumDataResolution||x.TESTS_DISABLE_UPDATE_THROTTLE_THRESHOLDS)return!0;c=g.width(a)/this.maximumDataResolution.x;a=g.height(a)/this.maximumDataResolution.y;a=Math.abs(a/e.height-a/b.height);return 1.5<Math.abs(c/e.width-c/b.width)||1.5<a?!0:!1};b.prototype._fetch=function(a){var c=this;if(!this.suspended){this.beforeFetch();var e=this._extents[a],b=e.extent,d=new p(b[0],
b[1],b[2],b[3],e.spatialReference);this._images[a]||(this._images[a]={texture:null,material:null,rendergeometry:null,loadingPromise:null,image:null,pixelData:null,renderExtent:g.create(b)});var f=this._images[a];f.loadingPromise&&f.loadingPromise.cancel();0===d.width||0===d.height?this._clearImage(a):(f.loadingPromise=this.layer.fetchImage(d,e.imageSize.width,e.imageSize.height,{allowImageDataAccess:!0}),f.loadingPromise.then(function(e){g.set(f.renderExtent,b);c.processResult(f,e);c._createStageObjects(a,
f.image);0===a&&c._images[1]&&c._images[1].rendergeometry&&c._createStageObjects(1,null);c._evaluateUpdatingState();c.emit("draped-data-change")}).otherwise(function(a){a&&"CancelError"===a.name||c._evaluateUpdatingState()}).always(function(){f.loadingPromise=null}),this._evaluateUpdatingState())}};b.prototype._clearImage=function(a){a=this._images[a];var c=this.view._stage;a&&(a.rendergeometry&&(c.getTextureGraphicsRenderer().removeRenderGeometries([a.rendergeometry]),a.rendergeometry=null),a.texture&&
(c.remove(l.ModelContentType.TEXTURE,a.texture.getId()),a.texture=null),a.material&&(c.remove(l.ModelContentType.MATERIAL,a.material.getId()),a.material=null),a.loadingPromise&&(a.loadingPromise.cancel(),a.loadingPromise=null),a.image=null,a.pixelData=null)};b.prototype._evaluateUpdatingState=function(){this.notifyChange("updating")};b.prototype._createStageObjects=function(a,c){var b=this.view._stage,h=b.getTextureGraphicsRenderer(),d=this._images[a];c&&(d.texture&&b.remove(l.ModelContentType.TEXTURE,
d.texture.getId()),d.texture=new z(c,"dynamicLayer",{width:c.width,height:c.height,wrapClamp:!0}),b.add(l.ModelContentType.TEXTURE,d.texture));d.material?c&&d.material.setParameterValues({textureId:d.texture.getId()}):(d.material=new B({ambient:[1,1,1],diffuse:[0,0,0],transparent:!0,opacity:this.fullOpacity,textureId:d.texture.getId(),receiveSSAO:!1},"dynamicLayer"),d.material.setRenderPriority(this.drawingOrder),b.add(l.ModelContentType.MATERIAL,d.material));c=this._extents[a].renderLocalOrigin;
if(0===a)a=q.createGeometryForExtent(d.renderExtent,-1);else if(1===a){a=this._images[0].renderExtent;if(!a)return;a=q.createOuterImageGeometry(a,d.renderExtent,-1)}else{console.error("DynamicLayerView3D._createStageObjects: Invalid extent idx");return}b=new A(a);b.material=d.material;b.origin=c;b.transformation=y.mat4d.identity();b.name="dynamicLayer";b.uniqueName="dynamicLayer#"+a.id;h.addRenderGeometries([b]);d.rendergeometry&&h.removeRenderGeometries([d.rendergeometry]);d.rendergeometry=b};b.prototype._isScaleRangeLayer=
function(){return"minScale"in this.layer&&"maxScale"in this.layer};b.prototype._isScaleRangeActive=function(){return this._isScaleRangeLayer()?0<this.layer.minScale||0<this.layer.maxScale:!1};b.prototype._extentAndSizeAtResolution=function(a,c,b){var e=g.width(a)/g.height(a),d={width:b,height:b};1.0001<e?d.height=b/e:.9999>e&&(d.width=b*e);c=this._clippedExtent(a,c,D);d.width=Math.round(d.width/(g.width(a)/g.width(c)));d.height=Math.round(d.height/(g.height(a)/g.height(c)));return{size:d,extent:c}};
b.prototype._clippedExtent=function(a,c,b){if("local"!==this.view.viewingMode)return g.set(b,a);c=this.view.basemapTerrain;var e=c.extent;return c.ready&&e?g.intersection(a,e,b):g.set(b,a)};b.prototype._opacityChangeHandler=function(a){for(var c=0,b=this._images;c<b.length;c++){var f=b[c];f&&f.material&&f.material.setParameterValues({opacity:a})}this.emit("draped-data-change")};b.prototype._layerRedrawHandler=function(){for(var a=!1,c=0;c<this._images.length;c++){var b=this._images[c];this.updateImage(b)&&
(a=!0,this._createStageObjects(c,b.image))}a&&this.emit("draped-data-change")};b.prototype._suspendedChangeHandler=function(){if(this.suspended)this.clear(),this.emit("draped-data-change");else for(var a=0;a<this._extents.length;a++)this._fetch(a)};k([f.property()],b.prototype,"layer",void 0);k([f.property({dependsOn:["view.scale","layer.minScale","layer.maxScale"]})],b.prototype,"suspended",void 0);k([f.property({type:Boolean})],b.prototype,"supportsDraping",void 0);k([f.property({type:Boolean})],
b.prototype,"hasDraped",void 0);k([f.property({value:0,type:Number})],b.prototype,"drawingOrder",null);k([f.property({readOnly:!0})],b.prototype,"fullExtentInViewSpatialReference",void 0);return b=k([f.subclass("esri.views.3d.layers.DynamicLayerView3D")],b)}(f.declared(v));var D=g.create();return n});