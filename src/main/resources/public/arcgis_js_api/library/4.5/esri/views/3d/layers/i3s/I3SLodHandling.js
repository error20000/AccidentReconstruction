// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.5/esri/copyright.txt for details.
//>>built
define(["require","exports"],function(l,m){return function(){function d(a,b,c){this.layerViewRequiredFunctions=a;this.layerViewOptionalFunctions=b;this.lodGlobalDirtyChanged=c}d.prototype.startNodeLoading=function(a,b,c,d,e){this._lodGlobalDirty=!1;this._lodMode=e.mode;this._allowPartialOverlaps=e.allowPartialOverlaps;this._nodeIndex=c;this._rootId=d;this._nodeTraversalState=b;this._nodeIsVisible=a;this.lodGlobalDirtyChanged(this._lodGlobalDirty)};d.prototype.shouldLoadNode=function(a){var b=this._nodeTraversalState(a.id),
c=b.nodeHasLOD,b=b.isChosenLOD;return"perLevel"!==this._lodMode?b||!c:b||!c?!0:this._allowPartialOverlaps?!this._subtreeComplete(a):this._subtreeEmpty(a)};d.prototype.shouldSetPolygonOffset=function(a){return"perLevel"===this._lodMode?!this._nodeTraversalState(a.id).isChosenLOD:!1};d.prototype.setLodGlobalDirty=function(){this._lodGlobalDirty=!0;this.lodGlobalDirtyChanged(this._lodGlobalDirty)};d.prototype.finishedLevel=function(a){"perLevel"===this._lodMode&&this._removeUpToLevelRecursive(this._nodeIndex[this._rootId],
a-1)};d.prototype.lodSwapBundleLoaded=function(a){"perLevel"===this._lodMode?this._nodeTraversalState(a.id).isChosenLOD&&this._removeChildrenRecursive(a):this.setLodGlobalDirty()};Object.defineProperty(d.prototype,"requiresLODGlobalHandling",{get:function(){return"global"===this._lodMode&&null!=this._rootId&&(!0===this._lodGlobalDirty||this.layerViewRequiredFunctions.isOverMemory())},enumerable:!0,configurable:!0});d.prototype.lodGlobalHandling=function(){if(this.requiresLODGlobalHandling){var a=
this._rootId,b=this.layerViewRequiredFunctions.isOverMemory();this._lodGlobalHandlingRecursion(a,!1,b);this._lodGlobalDirty=!1;this.lodGlobalDirtyChanged(this._lodGlobalDirty)}};d.prototype._lodGlobalHandlingRecursion=function(a,b,c){var d=this._nodeIndex[a];if(null==d)return!1;a=this._nodeTraversalState(a).isChosenLOD;var e=this.layerViewRequiredFunctions.isBundleAlreadyAddedToStage(d,0);e&&null!=this.layerViewOptionalFunctions.setPolygonOffset&&this.layerViewOptionalFunctions.setPolygonOffset(d,
!a);if(a&&e)return this._removeChildrenRecursive(d),!0;var f=!1;if(null!=d.children&&0!==d.children.length)for(var f=!0,h=0,k=d.children;h<k.length;h++){var g=k[h];this._nodeIsVisible(g)&&(g=this._lodGlobalHandlingRecursion(g.id,e||b,c),f=f&&g)}e&&!a&&(b||f||c)&&(this.layerViewRequiredFunctions.removeNodeData(d),e=!1);return f||e};d.prototype._removeChildrenRecursive=function(a){if(null!=a.children){var b=0;for(a=a.children;b<a.length;b++){var c=this._nodeIndex[a[b].id];null!=c&&(this._removeChildrenRecursive(c),
this.layerViewRequiredFunctions.removeNodeData(c))}}};d.prototype._removeUpToLevelRecursive=function(a,b){if(!(null==a||0>b)&&(this._nodeTraversalState(a.id).isChosenLOD||this.layerViewRequiredFunctions.removeNodeData(a),null!=a.children)){var c=0;for(a=a.children;c<a.length;c++)this._removeUpToLevelRecursive(this._nodeIndex[a[c].id],b-1)}};d.prototype._subtreeEmpty=function(a){if(this.layerViewRequiredFunctions.areAllBundlesLoaded(a))return!1;if(null==a.children)return!0;var b=0;for(a=a.children;b<
a.length;b++){var c=a[b];if(this._nodeIsVisible(c)&&(c=this._nodeIndex[c.id],null!=c&&!this._subtreeEmpty(c)))return!1}return!0};d.prototype._subtreeComplete=function(a){if(this.layerViewRequiredFunctions.areAllBundlesLoaded(a))return!0;if(null==a.children||0===a.children.length)return!1;var b=0;for(a=a.children;b<a.length;b++){var c=a[b];if(this._nodeIsVisible(c)&&(c=this._nodeIndex[c.id],null==c||!this._subtreeComplete(c)))return!1}return!0};return d}()});