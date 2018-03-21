// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.5/esri/copyright.txt for details.
//>>built
define("./terrainUtils ./tileUtils ./TerrainConst ./ElevationData ./TilePerLayerInfo ./ElevationTileAgent ./MapTileAgent ../support/mathUtils ../lib/glMatrix ../../../core/arrayUtils".split(" "),function(C,y,k,D,E,z,u,A,d,F){var l=d.vec3d,q=d.vec2d,v=d.vec4d,H=d.mat4d,G=C.weakAssert,w=l.create(),f=v.create(),r=v.create(),I=l.create(),m=u.AGENT_DONE,t=k.LayerClass.LAYER_CLASS_COUNT,B=k.LayerClass.MAP,n=k.LayerClass.ELEVATION,p=k.TileUpdateTypes;d=function(a,b,c){this.lij=[0,0,0];this.extent=v.create();
this.extentWGS84Rad=v.create();this.centerAtSeaLevel=l.create();this.center=l.create();this.tileUp=I;this.elevationBounds=q.create();this.children=[null,null,null,null];this.layerInfo=Array(t);this.intersectsClippingArea=this.isWithinClippingArea=!0;this.clippingArea=null;this._maxTesselation=0};d.prototype.init=function(a,b,c,e){this.lij[0]=a[0];this.lij[1]=a[1];this.lij[2]=a[2];e.getExtent(a[0],a[1],a[2],this.extent,this.extentWGS84Rad);this.intersectsClippingArea=this.isWithinClippingArea=!0;this.clippingArea=
null;this.radius=this.edgeLen=0;this.vlevel=a?a[0]:0;b&&b.elevationBounds?q.set(b.elevationBounds,this.elevationBounds):q.set2(0,0,this.elevationBounds);this.parent=b;for(a=0;4>a;a++)this.children[a]=null;this.pendingUpdates=0;this.renderData=null;this.renderOrder=this.screenDepth=0;this.visible=!1;this.parentSurface=c;for(a=0;a<t;a++)if(c){b=c.numLayers(a);var g;this.layerInfo[a]?(g=this.layerInfo[a],g.length=b):(g=Array(b),this.layerInfo[a]=g);for(var d=0;d<b;d++)g[d]=E.makeEmptyLayerInfo(a,g[d]),
a==n&&this.findElevationBoundsForLayer(d,-1)}else this.layerInfo[a]=null;this.computeElevationBounds();this._maxTesselation=Math.min(e.pixelSize[0],k.MAX_TILE_TESSELATION)};d.prototype.dispose=function(){for(var a=0;a<t;a++)for(var b=this.layerInfo[a],c=0;c<b.length;c++)b[c].dispose()};d.prototype.updateScreenDepth=function(a){l.set(this.center,r);r[3]=1;H.multiplyVec4(a,r,r);this.screenDepth=r[2]/r[3]};d.prototype.shouldSplit=function(a,b){var c=this.lij[0];if(1>c)return p.SPLIT;l.subtract(this.center,
b,w);var e=l.length(w),g=this.edgeLen/(a[0]*e*2),e=this.edgeLen/(a[2]*e*2),d=a[1],h=a[3],k=a[4];a=a[5];return g<d?this.vlevel!==this.lij[0]?(this.vlevel=this.lij[0],p.VSPLITMERGE):p.NONE:c>=k?(b=c+Math.ceil(-A.log2(d/g)),b!==this.vlevel?(this.vlevel=b,p.VSPLITMERGE):p.NONE):6<c&&(l.scale(this.tileUp,l.dot(this.tileUp,w),f),l.subtract(f,w),l.length2(f)>this.radius*this.radius&&(l.scale(f,this.radius/l.length(f)),l.add(f,this.center),l.subtract(b,f,f),b=this.elevationBounds[1]-this.elevationBounds[0],
Math.min(1,(Math.abs(l.dot(f,this.tileUp))+.5*b+this.curvatureHeight)/l.length(f))*e<.1/a*h))?p.NONE:p.SPLIT};d.prototype.decodeElevationData=function(a){var b;if(a instanceof ArrayBuffer)try{b=D.createFromLERC(this.lij,this.extent,a,k.noDataValueOpt)}catch(c){console.warn("Error decoding %s: %s",a.url,c.message)}else b=D.createFromFetchTileResult(this.lij,this.extent,a);return b};d.prototype.getWGS84Extent=function(){return this.extentWGS84Rad.map(A.rad2deg)};d.prototype.load=function(a){for(var b=
0;b<t;b++)this.layerInfo[b]&&this._createOrUpdateAgents(0,b);a.loadTile(this)};d.prototype.unload=function(a){this.renderData&&a.unloadTile(this);for(a=0;a<t;a++)for(var b=this.layerInfo[a],c=0;c<b.length;c++){var e=b[c];e.loadingAgent&&e.loadingAgent!==m&&(e.loadingAgent.dispose(),(a===k.LayerClass.ELEVATION?z:u).Pool.release(e.loadingAgent),e.loadingAgent=null);e.pendingUpdates=0}this.pendingUpdates&=~k.TileUpdateTypes.UPDATE_GEOMETRY;this.pendingUpdates&=~k.TileUpdateTypes.UPDATE_TEXTURE};d.prototype.updateClippingStatus=
function(a){F.equals(a,this.clippingArea)||(a?(this.intersectsClippingArea=this.intersectsExtent(a),this.isWithinClippingArea=this.isWithinExtent(a)):this.isWithinClippingArea=this.intersectsClippingArea=!0,this.clippingArea=a,this.renderData&&this.updateGeometry())};d.prototype.updateVisibility=function(a,b,c){a=c||this.isVisible(a,b)&&this.intersectsClippingArea;if(a!==this.visible)for(this.visible=a,b=this.layerInfo[0],c=0;c<b.length;c++){var e=b[c];e.loadingAgent&&e.loadingAgent!==m&&e.loadingAgent.setSuspension(!a)}return a};
d.prototype.getLayerInfo=function(a,b){return this.layerInfo[b][a]};d.prototype.hasLayerData=function(a,b){return(a=this.layerInfo[b][a])&&a.data&&!a.dataInvalidated};d.prototype.tileDataAvailable=function(a,b,c){return(b=this.layerInfo[c][b].tilemap)?"unavailable"!==b.getAvailability(a.lij[1],a.lij[2]):!0};d.prototype.requestLayerData=function(a,b,c){k.TILE_LOADING_DEBUGLOG&&console.log("tile %s layer %d/%d requested by tile %s",this.lij.toString(),b,a,c.tile.lij.toString());var e=this.layerInfo[b][a];
if(-1<e.waitingAgents.indexOf(c))return console.warn("agent already requested this piece of map data (tile %s, agent tile %s, layer: %d/%d)",this.lij.toString(),c.tile.lij.toString(),b,a),!0;if(e.data&&!e.dataInvalidated)return console.warn("agent requested existing data (tile %s, agent tile %s, layer: %d/%d)",this.lij.toString(),c.tile.lij.toString(),b,a),e.waitingAgents.push(c),setTimeout(c.dataArrived.bind(c,this),0),!0;if(e.pendingUpdates&p.DECODE_ELEVATION)return e.waitingAgents.push(c),!0;e.waitingAgents.push(c);
if(!e.requestPromise){var g=this.parentSurface.requestTileData(this,a,b);if(g.isFulfilled())return!1;a=function(){e.requestPromise===g&&(e.requestPromise=null)};e.requestPromise=g;g.then(a,a);return!!g}return!0};d.prototype.descendants=function(a){a||(a=[]);for(var b=0;4>b;b++){var c=this.children[b];c&&(c.descendants(a),a.unshift(this.children[b]))}return a};d.prototype.isLij=function(a){return this.lij[0]===a[0]&&this.lij[1]===a[1]&&this.lij[2]==a[2]};d.prototype.findByLij=function(a){if(this.isLij(a))return this;
for(var b=0;4>b;b++){var c=this.children[b];if(c&&(c=c.findByLij(a)))return c}return null};d.prototype.unrequestLayerData=function(a,b,c){k.TILE_LOADING_DEBUGLOG&&console.log("tile %s layer %d/%d canceled by tile %s",this.lij.toString(),b,a,c.tile.lij.toString());var e=this.layerInfo[b][a],g=e.waitingAgents;c=g.indexOf(c);G(-1<c,"agent has not requested this piece of map data");g[c]=g[g.length-1];g.length--;1>g.length&&(g=e.requestPromise,c=!1,b===B&&(c=this.parentSurface.layerViewByIndex(a,B),c=
C.isVectorTileLayerView(c)),c||G(g||e.rawData,"no pending operations on layerInfo that agents were waiting for"),g&&!g.isFulfilled()&&(g.cancel(),e.requestPromise=null),k.TILE_LOADING_DEBUGLOG&&console.log("tile %s layer %d/%d request/loading canceled",this.lij.toString(),b,a))};d.prototype.dataArrived=function(a,b,c){a=this.layerInfo[b][a];a.data=c;a.dataInvalidated=!1;for(c=0;c<a.waitingAgents.length;c++)a.waitingAgents[c].dataArrived(this);a.waitingAgents.length=0};d.prototype.dataMissing=function(a,
b,c){c.notInTilemap||console.error("Tile %s layer %d/%d error",this.lij.toString(),b,a);a=this.layerInfo[b][a];a.dataMissing=!0;for(b=0;b<a.waitingAgents.length;b++)a.waitingAgents[b].dataMissing(this);a.waitingAgents.length=0};d.prototype.updateTexture=function(a){this.renderData&&(a?this.parentSurface._renderer.updateTileTexture(this):(this.pendingUpdates|=k.TileUpdateTypes.UPDATE_TEXTURE,this.parentSurface._pendingUpdates=!0))};d.prototype.invalidateLayerData=function(a,b){this.layerInfo[b][a].invalidateSourceData();
this.restartAgents(b)};d.prototype.computeElevationBounds=function(){q.set2(Number.MAX_VALUE,-Number.MAX_VALUE,this.elevationBounds);for(var a=this.layerInfo[n],b=!1,c=0;c<a.length;c++){var e=a[c];e.elevationBounds&&(this.elevationBounds[0]=Math.min(this.elevationBounds[0],e.elevationBounds[0]),this.elevationBounds[1]=Math.max(this.elevationBounds[1],e.elevationBounds[1]),b=!0)}b||q.set2(0,0,this.elevationBounds);this.updateRadiusAndCenter()};d.prototype.updateRadiusAndCenter=function(){l.scale(this.tileUp,
.5*(this.elevationBounds[0]+this.elevationBounds[1]),f);l.add(this.centerAtSeaLevel,f,this.center)};d.prototype.findElevationBoundsForLayer=function(a,b){var c=this.layerInfo[n][a];if(!c.elevationBounds||c.elevationBounds[2]<b)if(b=this.parentSurface.layerViewByIndex(a,n),y.fallsWithinLayer(this,b.layer,!1)){b=!1;if(c.data)q.set(c.data.bounds,f),f[2]=this.lij[0],b=!0;else{for(var e=this.parent,g=0,d=null,h=c.data;e&&(!h||g<k.ELEVATION_DESIRED_RESOLUTION_LEVEL);){g=this.vlevel-e.lij[0];d=h||d;h=e.layerInfo[n][a].data;
if(!h&&d&&g>=k.ELEVATION_DESIRED_RESOLUTION_LEVEL)break;e=e.parent}if(h=h||d)h.computeMinMaxValue(this.lij[0],this.lij[1],this.lij[2],f),Infinity!==f[0]&&(f[2]=h.level,b=!0)}b&&(c.elevationBounds?l.set(f,c.elevationBounds):c.elevationBounds=[f[0],f[1],f[2]])}};d.prototype.updateGeometry=function(){this.pendingUpdates|=k.TileUpdateTypes.UPDATE_GEOMETRY;this.parentSurface._pendingUpdates=!0};d.prototype.modifyLayers=function(a,b,c){for(var e=b.length,g=this.layerInfo[c],d=Array(e),h=0;h<g.length;h++){var f=
g[h];f.loadingAgent&&f.loadingAgent!==m&&(f.loadingAgent.dispose(),(c===k.LayerClass.ELEVATION?z:u).Pool.release(f.loadingAgent),f.loadingAgent=null);f.waitingAgents.length=0}if(c===B)for(h=0;h<g.length;h++)void 0===a[h]&&g[h].dispose();for(h=0;h<e;h++)a=b[h],d[h]=-1<a?g[a]:E.makeEmptyLayerInfo(c);this.layerInfo[c]=d};d.prototype.restartAgents=function(a){if(this.renderData)if(this._createOrUpdateAgents(0,a),a===n){this.updateGeometry();a=this.layerInfo[a];for(var b=0;b<a.length;b++)a[b].pendingUpdates|=
k.TileUpdateTypes.UPDATE_GEOMETRY;this.parentSurface._pendingUpdates=!0}else this.updateTexture(!0)};d.prototype.updateAgents=function(a){if(this.renderData){for(var b=this.layerInfo[a],c=0;c<b.length;c++){var e=b[c];e.loadingAgent===m&&(e.loadingAgent=null)}this._createOrUpdateAgents(0,a)}};d.prototype.removeLayerAgent=function(a,b){a=this.layerInfo[b][a];a.loadingAgent&&a.loadingAgent!==m&&a.loadingAgent.dispose();a.loadingAgent=null};d.prototype.agentDone=function(a,b){var c=this.layerInfo[b],
e=c[a];e.loadingAgent=m;e.data||e.upsampleFromTile||a<c.length-1&&this._createOrUpdateAgents(a+1,b)};d.prototype._createOrUpdateAgents=function(a,b){var c;c=b===n?!1:!this.visible;for(var e=this.layerInfo[b];a<e.length;){var d=e[a],f=!1,h=this.parentSurface.layerViewByIndex(a,b);if(null!==d.loadingAgent&&d.loadingAgent!==m)f=d.loadingAgent.update();else if(d.loadingAgent!==m&&y.fallsWithinLayer(this,h.layer,!1)){var l=b===k.LayerClass.ELEVATION?z:u,x=l.Pool.acquire();(f=x.init(this,a,b,c))?d.loadingAgent=
x:(x.dispose(),l.Pool.release(x),d.loadingAgent=m)}if(f&&!h.isTransparent)break;a++}};d.prototype.geometryState=function(a){var b,c=this._getElevationInfo(a?a.samplerData:null),e=this.lij[0],d=!1;c.samplerData?(b=this.vlevel-e,b=Math.max(e-c.maxTileLevel,k.ELEVATION_DESIRED_RESOLUTION_LEVEL-b),e=this._maxTesselation,b=A.clamp((e>>b)+1,2,e+1)):b=8>e?this._numSubdivisionsAtLevel[e]+1:2;e=this.clippingArea;if(!this.intersectsClippingArea||this.isWithinClippingArea)e=null;a?(a.numVertsPerRow!==b&&(a.numVertsPerRow=
b,d=!0),c.changed&&(a.samplerData=c.samplerData,d=!0),F.equals(a.clippingArea,e)||(a.clippingArea=e,d=!0),a.needsUpdate=d):a={numVertsPerRow:b,samplerData:c.samplerData,needsUpdate:!0,clippingArea:e};return a};d.prototype._getElevationInfo=function(a){for(var b=this.layerInfo[n],c=b.length,e=Array(c),d=0,f=0,h=!1,l=0;l<c;l++){var k=b[l];if(k.upsampleFromTile){var k=k.upsampleFromTile.tile,m=k.layerInfo[n][l].data;a&&a[d]===m.samplerData||(h=!0);e[d++]=m.samplerData;f=Math.max(f,k.lij[0])}else k.data&&
(m=this.parentSurface.layerViewByIndex(l,n),y.fallsWithinLayer(this,m.layer,!1)&&(a&&a[d]===k.data.samplerData||(h=!0),e[d++]=k.data.samplerData,f=this.lij[0]))}a&&a.length!==d&&(h=!0);0<d?e.length=d:e=null;return{changed:h,samplerData:e,maxTileLevel:f}};d.prototype.isWithinExtent=function(a){var b=this.extent;return b[0]>=a[0]&&a[2]>=b[2]&&b[1]>=a[1]&&a[3]>=b[3]};d.prototype.intersectsExtent=function(a){var b=this.extent;return b[2]>=a[0]&&a[2]>=b[0]&&b[3]>=a[1]&&a[3]>=b[1]};return d});