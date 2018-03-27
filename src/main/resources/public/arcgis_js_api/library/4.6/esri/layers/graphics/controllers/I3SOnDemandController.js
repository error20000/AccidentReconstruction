// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.6/esri/copyright.txt for details.
//>>built
define("require exports ../../../core/tsSupport/declareExtendsHelper ../../../core/tsSupport/decorateHelper dojo/promise/all dojo/errors/CancelError dojo/has dojo/_base/lang ../../../views/3d/support/ResourceController ../../../core/sql/WhereClause ../../../views/3d/layers/SceneLayerView3D ../../../views/3d/layers/i3s/I3SNodeLoader ../../../views/3d/layers/i3s/I3SIndexTraversal ../../../views/3d/layers/i3s/I3SUtil ../../../views/3d/layers/i3s/I3SLodHandling ../../../views/3d/layers/i3s/I3SViewportQueries ../../../views/3d/layers/i3s/IdleQueue ../../../views/3d/layers/i3s/GoogPriorityQueue ../../../layers/SceneLayer ../../../layers/IntegratedMeshLayer ../../../core/accessorSupport/decorators ../../../core/Accessor ../../../core/Evented ../../../core/Promise ../../../core/Logger ../../../core/promiseUtils ../../../core/watchUtils ../../../core/HandleRegistry ../../../views/3d/support/PromiseLightweight ../../../views/3d/support/projectionUtils ../../../views/3d/lib/glMatrix".split(" "),
function(l,S,A,e,B,C,r,D,E,F,v,n,G,m,H,I,J,K,p,w,d,L,M,N,O,x,t,P,y,Q,h){function u(d,b){b=b.toLowerCase();for(var a=0;a<d.length;a++)if(d[a].name.toLowerCase()===b)return a;return-1}var k=O.getLogger("esri.layers.graphics.controllers.I3SOnDemandController");l=function(l){function b(a){a=l.call(this)||this;a.nodeIndex={};a.screenSizeFactor=0;a.updating=!0;a.updatingPercentage=0;a._lodFactorProperty=null;a._isIdle=!1;a._alwaysLoadEverythingModeEnabled=!1;a._uncompressedTextureDownsamplingEnabled=!1;
a._computedMbs={};a._nodeQueue=null;a.maxQueueLevel=0;a._numNodesLoading=0;a._numAttributesLoading=0;a._progressMaxNumNodes=1;a._poi=null;a._requiredAttributesDirty=!0;a._updatesDisabled=!1;a.disableCache=!1;a._restartNodeLoading=!1;a._fields=null;a._attributeStorageInfo=null;a._handles=new P;a._idleQueue=new J.IdleQueue;return a}A(b,l);Object.defineProperty(b.prototype,"isMeshPyramid",{get:function(){return"mesh-pyramids"===this.layer.profile||"MeshPyramid"===this.layer.store.lodType},enumerable:!0,
configurable:!0});Object.defineProperty(b.prototype,"streamDataSupplier",{get:function(){return this.layerView.view.resourceController.registerClient(this.layerView,E.ClientType.SCENE,{trackRequests:!0})},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"parsedDefinitionExpression",{get:function(){if(this.layer instanceof p&&this.layer.definitionExpression)try{var a=F.create(this.layer.definitionExpression);if(!a.isStandardized())return k.error("definitionExpression is using non standard function"),
null;var c=[],f=a.getFields();m.findFieldsCaseInsensitive(f,this.layer.fields,{missingFields:c});return 0<c.length?(k.error("definitionExpression references unknown fields: "+c.join(", ")),null):a}catch(g){return k.error("Failed to parse definitionExpression: "+g),null}else return null},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"definitionExpressionFields",{get:function(){if(this.parsedDefinitionExpression){var a=this.parsedDefinitionExpression.getFields();return m.findFieldsCaseInsensitive(a,
this._fields)}return null},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"crsVertex",{get:function(){return m.getVertexCrs(this.layer)},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"crsIndex",{get:function(){return m.getIndexCrs(this.layer)},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"rootNodeVisible",{get:function(){var a=this._rootNodeId&&this.nodeIndex[this._rootNodeId];return a&&this._viewportQueries?this._viewportQueries.isNodeVisible(a):
!0},enumerable:!0,configurable:!0});b.prototype.initialize=function(){var a=this;this.updateEventListener={needsUpdate:function(){return a._needsAnimationFrameHandler()},idleFrame:function(c){return a._animationFrameHandler(c)},idleBegin:function(){a._startNodeLoading();a._updateIdleState(!0)},idleEnd:function(){a.cancelNodeLoading();a._updateIdleState(!1)}};this.updateEventListenerWhileSuspended={idleBegin:function(){return a._startNodeLoadingWhileSuspended()}};this._lodHandling=new H(this.layerViewRequiredFunctions,
this.layerViewOptionalFunctions,function(){return a._evaluateUpdatingState()});this.layerView._controller=this;var c=this.layer;this._defaultGeometrySchema=c.store.defaultGeometrySchema;this._rootNodeUrl=c.store.rootNode;var f=this._rootNodeUrl.split("/");this._rootNodeId=f[f.length-1];this.disableCache=r("disable-feature:idb-cache");c instanceof p?("mesh"===c.geometryType?this._lodFactorProperty="qualitySettings.sceneService.3dObject.lodFactor":"point"===c.geometryType&&(this._lodFactorProperty=
"qualitySettings.sceneService.point.lodFactor"),this._fields=c.fields,this._attributeStorageInfo=c.attributeStorageInfo):c instanceof w&&(this._lodFactorProperty="qualitySettings.sceneService.integratedMesh.lodFactor");c=B([this.layer.when(),this.layerView.when()]).then(function(){if(!a.destroyed&&a.layerView&&!a.layerView.destroyed){a.setClippingArea(a.layerView.view.clippingArea);var c=a.layerView.view.pointsOfInterest,f=function(){return a.restartNodeLoading()};a._centerOnSurface=c.centerOnSurfaceFrequent;
a._handles.add([a._centerOnSurface.watch("renderLocation",function(){return a._pointOfInterestChanged()}),c.events.on("camera-parameters-changed",f)],"view");var b=a.layerView.view.resourceController,z=!1;a._handles.add(t.init(a.layerView,"suspended",function(c){z&&b.deregisterIdleFrameWorker(a);c?b.registerIdleFrameWorker(a,a.updateEventListenerWhileSuspended):b.registerIdleFrameWorker(a,a.updateEventListener);z=!0}),"layerview");a._handles.add(a.layer.watch("elevationInfo",function(c){return a._elevationInfoChanged(c)}),
"layer");a.layerView instanceof v&&a._handles.add([t.init(a.layerView,"alwaysLoadEverythingModeEnabled",function(c){a._alwaysLoadEverythingModeEnabled=c;f()}),t.init(a.layerView,"uncompressedTextureDownsamplingEnabled",function(c){a._uncompressedTextureDownsamplingEnabled=c;f()})],"layer");a._lodFactorProperty&&a._handles.add(a.layerView.view.watch(a._lodFactorProperty,function(){return a._qualityChanged()}),"quality")}});this.addResolvingPromise(c)};b.prototype.destroy=function(){this.layerView.view.resourceController.deregisterIdleFrameWorker(this);
this.layerView.view.resourceController.deregisterClient(this.layerView);this._handles.destroy();this._nodeLoader=null};b.prototype._getRequiredAttributes=function(){if(!(null!=this._attributeStorageInfo&&this.layer instanceof p&&this._fields))return[];var a=Object.create(null);this.layer.renderer&&this.layer.renderer.collectRequiredFields(a);this.layer.labelsVisible&&this.layer.labelingInfo&&this.layer.labelingInfo.forEach(function(c){c._collectRequiredFields(a)});if(null!=this.definitionExpressionFields)for(var c=
0,f=this.definitionExpressionFields;c<f.length;c++)a[f[c]]=!0;var b=this._attributeStorageInfo,d=this._fields,e=this.layer.objectIdField;return Object.keys(a).map(function(a){var c=u(b,a);a=u(d,a);return 0<=c&&0<=a?{index:c,name:d[a].name,field:d[a],attributeStorageInfo:b[c]}:null}).filter(function(a){return null!=a&&a.name!==e}).sort(function(a,c){return c.index-a.index}).filter(function(a,c,f){return 0===c||f[c-1].index!==a.index})};b.prototype._requiredFieldsChange=function(){this._requiredAttributesDirty=
!0;this.restartNodeLoading()};b.prototype._labelingChanged=function(){var a=this._requiredAttributes,c=this._getRequiredAttributes();a.length===c.length&&a.every(function(a){return 0<=u(c,a.name)})||this._requiredFieldsChange()};b.prototype.setClippingArea=function(a){var c=[];Q.extentToBoundingBox(a,c,this.layerView.view.renderSpatialReference)?this._clippingArea=c:this._clippingArea=null};b.prototype._qualityChanged=function(){this.restartNodeLoading()};b.prototype._pointOfInterestChanged=function(){this._poi&&
(this._calculatePointOfInterest(this._poi),this._indexLoader&&(this._indexLoader.updatePointOfInterest(this._poi),this._indexLoader.progressiveLoadPenalty=q.distancePenalty*this._viewportQueries.distCameraToPOI(this._poi)))};b.prototype._calculatePointOfInterest=function(a){void 0===a&&(a=h.vec3d.create());var c=h.vec3d.create(),f=h.vec3d.create(),b=this._centerOnSurface.renderLocation,d=this.layerView.view.renderCoordsHelper;h.vec3d.subtract(b,this.camPos,c);h.vec3d.normalize(c);d.worldUpAtPosition(b,
f);c=Math.acos(h.vec3d.dot(f,c))-.5*Math.PI;h.vec3d.lerp(this.camPos,b,Math.max(0,Math.min(1,c/(.5*Math.PI))),a);return a};b.prototype.updateClippingArea=function(a){this.setClippingArea(a);this.restartNodeLoading()};b.prototype.getBaseUrl=function(){return this.layer.parsedUrl.path};b.prototype.updateElevationChanged=function(a,c,b){m.findIntersectingNodes(a,c,this.nodeIndex.root,this.crsIndex,this.nodeIndex,b);for(a=0;a<b.length;a++)c=b.data[a],this._computedMbs[c.id]&&(this._computedMbs[c.id][3]=
-1),c.id===this._rootNodeId&&this.notifyChange("rootNodeVisible");b.length&&this.restartNodeLoading()};b.prototype._elevationInfoChanged=function(a){a=0;for(var c=Object.keys(this._computedMbs);a<c.length;a++)this._computedMbs[c[a]][3]=-1;this._initViewData()};b.prototype.restartNodeLoading=function(){this._restartNodeLoading=!0;this._evaluateUpdatingState()};b.prototype.schedule=function(a){return this._idleQueue.push(a)};b.prototype._needsAnimationFrameHandler=function(){return!0};b.prototype._animationFrameHandler=
function(a){this._restartNodeLoading&&(this.cancelNodeLoading(),this._startNodeLoading());if(null!=this._nodeLoader){var c=this._indexLoader&&(this.maxQueueLevel>=this._indexLoader.getMaxLevel(0)||!this._indexLoader.isLoading());if(this._nodeQueue&&c)for(var b=this._indexLoader.isLoading()?3:5;this._numNodesLoading<b&&!this._nodeQueue.isEmpty();)this._loadNode(this._nodeQueue.dequeue());this._indexLoader&&(c=c?4:10,b=this._indexLoader.getNumLoading(),c=Math.min(c-b,4),0<c&&this._indexLoader.continueTraversal(c));
for(;0<this._idleQueue.length()&&!a.done();)this._idleQueue.process();this._evaluateUpdatingState();this._lodHandling.lodGlobalHandling()}};b.prototype._evaluateUpdatingState=function(){var a=this._indexLoader?this._indexLoader.getQueueSize():0,c=this._nodeQueue?this._nodeQueue.getCount():0,a=a+3*(c+this._numNodesLoading),c=!(!(0<a||0<this._numAttributesLoading||this._indexLoader&&this._indexLoader.isLoading()||this._restartNodeLoading||0<this._idleQueue.length()||this._lodHandling&&this._lodHandling.requiresLODGlobalHandling)&&
this._isIdle);0===a&&(this._progressMaxNumNodes=1);this._progressMaxNumNodes=Math.max(a,this._progressMaxNumNodes);c!==this._get("updating")&&this._set("updating",c);a=100*a/this._progressMaxNumNodes;a!==this._get("updatingPercentage")&&this._set("updatingPercentage",a)};b.prototype._initViewData=function(){var a=this.layerView.view,c=a.state.camera,b=a.renderCoordsHelper;this.camPos=h.vec3d.create(a.pointsOfInterest.renderPointOfView);this.screenSizeFactor=1/c.perPixelRatio;this._poi=this._calculatePointOfInterest();
var g=this._lodFactorProperty&&this.layerView.view.get(this._lodFactorProperty)||1;this._viewportQueries=new I(this._computedMbs,this.crsIndex,b,c,this._clippingArea,null!=this.layerViewOptionalFunctions.traversalOptions?this.layerViewOptionalFunctions.traversalOptions.errorMetricPreference:null,a.elevationProvider,this.layer.elevationInfo,{progressiveLoadFactor:this._getProgressiveLoadFactor(this.layer,g),screenspaceErrorBias:g,angleDependentLoD:.5>g,disableLod:this._alwaysLoadEverythingModeEnabled});
this.notifyChange("rootNodeVisible")};b.prototype._getProgressiveLoadFactor=function(a,c){return a instanceof p&&"mesh"===a.geometryType?(a=1<=c&&r("enable-feature:progressive-3dobject"))?q.factor3dObject:1:a instanceof w?(a=1<=c&&!r("disable-feature:progressive-im"))?q.factorIM:1:1};b.prototype._startNodeLoadingWhileSuspended=function(){var a=this;this._initViewData();this._alwaysLoadEverythingModeEnabled&&this.layerView.visible&&!this.layerView.get("parent.suspended")||this._removeInvisibleNodes(function(c){return a._viewportQueries.isNodeVisible(c)})};
b.prototype._startNodeLoading=function(){var a=this;this._restartNodeLoading=!1;if(!this._updatesDisabled&&null!=this.streamDataSupplier){this._initViewData();null!=this.layerViewOptionalFunctions.getLoadedAttributes&&this._requiredAttributesDirty&&(this._requiredAttributes=this._getRequiredAttributes(),this._requiredAttributesDirty=!1,this._handles.add([this.layer.watch("renderer",function(){return a._requiredFieldsChange()}),this.layer.watch("definitionExpression",function(){return a._requiredFieldsChange()}),
this.layer.watch("labelsVisible",function(){return a._labelingChanged()}),this.layer.watch("labelingInfo",function(){return a._labelingChanged()})],"requiredAttributes"));var c=this.layerViewOptionalFunctions.textureOptions,b=n.TextureFormat.Normal;c&&c.useCompressedTextures?b=n.TextureFormat.Compressed:this._uncompressedTextureDownsamplingEnabled&&(b=n.TextureFormat.Downsampled);c=this._defaultGeometrySchema;this._nodeLoader=new n(this.streamDataSupplier,k,c,this._requiredAttributes,{textureFormat:b,
loadTextureData:this.layerView instanceof v&&this.layerView.rendererNeedsTextures,loadFeatureData:!this.isMeshPyramid||null==c||null==c.ordering});b=D.mixin({loadEverything:this._alwaysLoadEverythingModeEnabled},this.layerViewOptionalFunctions.traversalOptions);this._indexLoader=new G(this.getBaseUrl(),this._rootNodeUrl,this._rootNodeId,this._poi,this.nodeIndex,this.streamDataSupplier,this._viewportQueries,function(c,b){return a._processNodeIndexDocument(c,b)},function(c){return a._lodHandling.finishedLevel(c)},
k,b);this._indexLoader.progressiveLoadPenalty=q.distancePenalty*this._viewportQueries.distCameraToPOI(this._poi);this._nodeQueue=new R;this.maxQueueLevel=0;this._indexLoader.start();this._alwaysLoadEverythingModeEnabled||this._removeInvisibleNodes(function(c){return a._indexLoader.nodeIsVisible(c)});this._lodHandling.startNodeLoading(function(c){return a._indexLoader.nodeIsVisible(c)},function(c){return a._indexLoader.nodeTraversalState(c)},this.nodeIndex,this._rootNodeId,{mode:null!=b&&b.perLevelTraversal?
"perLevel":"global",allowPartialOverlaps:!!b.allowPartialOverlaps,maxLodLevel:this._viewportQueries.maxLodLevel});this.layerViewOptionalFunctions.additionalStartNodeLoadingHandler&&this.layerViewOptionalFunctions.additionalStartNodeLoadingHandler();this._evaluateUpdatingState()}};b.prototype.isNodeLoading=function(){return null!=this._nodeLoader&&null!=this._indexLoader};b.prototype.cancelNodeLoading=function(){this.isNodeLoading()&&(this._indexLoader.cancel(),this._nodeLoader.cancel(),this.streamDataSupplier.cancelAll(),
this._idleQueue.cancelAll(),this._numNodesLoading=0,this._poi=this._nodeQueue=this._indexLoader=this._nodeLoader=null,this.layerViewOptionalFunctions.additionalCancelNodeLoadingHandler&&this.layerViewOptionalFunctions.additionalCancelNodeLoadingHandler(),this._evaluateUpdatingState())};b.prototype._removeInvisibleNodes=function(a){for(var c={},b=this.layerViewRequiredFunctions.getAddedNodeIDs(),g=0;g<b.length;g++){var d=b[g],e=this.nodeIndex[d];this._isNodeVisibleWithParents(e,a)?c[d]=e:this._removeNodeData(e)}return c};
b.prototype._isNodeVisibleWithParents=function(a,c){var b=a;do a=c(b),b=b.parentNode,b=null!=b?this.nodeIndex[b.id]:null;while(a&&null!=b);return a};b.prototype._removeNodeData=function(a){this._lodHandling.setLodGlobalDirty();this.layerViewRequiredFunctions.removeNodeData(a)};b.prototype._processNodeIndexDocument=function(a,c){var b=this.layerViewOptionalFunctions.traversalOptions;if(b&&b.perLevelTraversal)return this._loadNode(a);this._nodeQueue.enqueue(c,a);this.maxQueueLevel=Math.max(a.level,
this.maxQueueLevel);a=new y.Promise;a.done();return a};b.prototype._loadNode=function(a){var c=this,b=new y.Promise;if(null!=a.featureData&&0<a.featureData.length)if(this.layerViewRequiredFunctions.areAllBundlesLoaded(a)){var d=this.layerViewOptionalFunctions.getLoadedAttributes,d=null!=d?d(a):void 0;null!=d&&d!==this._requiredAttributes&&(this._nodeLoader.loadAttributes(a,a.baseUrl,this._requiredAttributes).then(function(b){c.layerViewOptionalFunctions.setAttributeData(a,c._requiredAttributes,b)}).otherwise(function(b){c.layerViewOptionalFunctions.setAttributeData(a,
c._requiredAttributes,{})}).then(function(){c._numAttributesLoading--;c._evaluateUpdatingState()}),this._numAttributesLoading++,this._evaluateUpdatingState());this._lodHandling.shouldLoadNode(a)&&this._lodHandling.lodSwapBundleLoaded(a)}else if(this._lodHandling.shouldLoadNode(a)){if(this.layerViewRequiredFunctions.isOverMemory())return b.done(),b;for(var d=[],e=0;e<a.featureData.length;e++)this.layerViewRequiredFunctions.isBundleAlreadyAddedToStage(a,e)||d.push(this._loadAndAddBundle(a,e));this._numNodesLoading++;
this._evaluateUpdatingState();x.eachAlways(d).then(function(){c._numNodesLoading--;c._evaluateUpdatingState();b.done()});return b}b.done();return b};b.prototype._loadCached=function(a,c){var b=this,d=this.disableCache?null:this.layerViewOptionalFunctions.loadCachedBundle,e=this.disableCache?null:this.layerViewOptionalFunctions.addCachedBundle;return d&&e?this.schedule().then(function(){return d(a,c,function(a,c){return b._nodeLoader.loadTextures(a,c)})}).then(function(d){if(null==d)return!1;var f=
b._requiredAttributes;return b.schedule().then(function(){return b._nodeLoader.loadAttributes(a,a.baseUrl,f)}).then(function(a){return b.schedule({loadedAttributes:f,attributeData:a})}).then(function(b){return e(a,c,d,b)}).then(function(){b._lodHandling.lodSwapBundleLoaded(a);return!0})}):x.resolve(!1)};b.prototype._loadUncached=function(a,b){var c=this;return this.schedule().then(function(){return c._nodeLoader.loadBundleData(a,b)}).then(function(a){return c.schedule(a)}).then(function(d){return c.layerViewRequiredFunctions.addBundle(a,
b,d)}).then(function(){return c._lodHandling.lodSwapBundleLoaded(a)})};b.prototype._loadAndAddBundle=function(a,b){var c=this;return this._loadCached(a,b).then(function(d){if(!d)return c._loadUncached(a,b)}).otherwise(function(c){c instanceof C||k.error("Failed to load node '"+a.id+"' bundle "+b+": "+c)})};b.prototype._updateIdleState=function(a){a!==this._isIdle&&(this._isIdle=a,this._evaluateUpdatingState())};e([d.property({readOnly:!0})],b.prototype,"isMeshPyramid",null);e([d.property({readOnly:!0})],
b.prototype,"streamDataSupplier",null);e([d.property({readOnly:!0,dependsOn:["layer.definitionExpression"]})],b.prototype,"parsedDefinitionExpression",null);e([d.property({readOnly:!0,dependsOn:["parsedDefinitionExpression"]})],b.prototype,"definitionExpressionFields",null);e([d.property({readOnly:!0})],b.prototype,"crsVertex",null);e([d.property({readOnly:!0})],b.prototype,"crsIndex",null);e([d.property({readOnly:!0})],b.prototype,"nodeIndex",void 0);e([d.property()],b.prototype,"camPos",void 0);
e([d.property()],b.prototype,"screenSizeFactor",void 0);e([d.property()],b.prototype,"layerView",void 0);e([d.property()],b.prototype,"layerViewRequiredFunctions",void 0);e([d.property()],b.prototype,"layerViewOptionalFunctions",void 0);e([d.property()],b.prototype,"layer",void 0);e([d.property({readOnly:!0})],b.prototype,"updating",void 0);e([d.property({readOnly:!0})],b.prototype,"updatingPercentage",void 0);e([d.property({readOnly:!0})],b.prototype,"rootNodeVisible",null);return b=e([d.subclass("esri.layers.graphics.controllers.I3SOnDemandController")],
b)}(d.declared(L,N,M));var q={factorIM:.2,factor3dObject:.05,distancePenalty:10},R=K.goog.structs.PriorityQueue;return l});