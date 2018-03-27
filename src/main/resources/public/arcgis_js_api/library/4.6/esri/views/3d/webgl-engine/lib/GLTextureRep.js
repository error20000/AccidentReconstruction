// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.6/esri/copyright.txt for details.
//>>built
define("require exports ./Util ../../../../core/Logger ../../../webgl/Texture ../../../webgl/enums".split(" "),function(q,r,f,l,k,t){var m=l.getLogger("esri.views.3d.webgl-engine.lib.GLTextureRep"),n=function(){function b(a){this._glTexture=null;this._refCount=0;this._glTexture=a}b.prototype.incRefCnt=function(){++this._refCount};b.prototype.decRefCnt=function(){--this._refCount;f.assert(0<=this._refCount)};b.prototype.getRefCnt=function(){return this._refCount};b.prototype.setGLTexture=function(a){this._glTexture=
a};b.prototype.getGLTexture=function(){return this._glTexture};return b}();return function(){function b(a,c,b,d){this.NUM_PARALLEL=8;this.textures=a;this._programRepository=c;this.getViewportToRestore=b;this._rctx=d;this.NUM_PARALLEL=8;this.id2textureRef={};this.loading={};this._queue=[];this.listeners=[];this.maxMaxAnisotropy=(this.afExt=d.extensions.textureFilterAnisotropic)?d.parameters.maxMaxAnisotropy:1;this.maxAnisotropy=Math.min(8,this.maxMaxAnisotropy);this._needsRender=!0;this._fallbackTextureData=
new Uint8Array(256);this._fallbackTextureTransparentData=new Uint8Array(256);for(a=0;a<this._fallbackTextureData.length;++a)this._fallbackTextureData[a]=255,this._fallbackTextureTransparentData[a]=0!==(a+1)%4?255:0;this._fallbackTextureDesc={target:3553,pixelFormat:6408,dataType:5121,samplingMode:9728,width:8,height:8,maxAnisotropy:8}}b.prototype.resetNeedsRender=function(){this._needsRender=!1};b.prototype.needsRender=function(){return this._needsRender};b.prototype.aquire=function(a,c,b,d){var g=
this,e=this.id2textureRef[a];if(null==e){c=this.textures[a];f.assert(void 0!==c);c.setUnloadFunc(this._unload.bind(this));b=!0===b;var h=this._createGLTextureDescription(c),e=new n(null);f.assert(null==this.id2textureRef[a]);this.id2textureRef[a]=e;if(c.initializeThroughRender)a=c.initializeThroughRender(this._rctx,h),e.setGLTexture(a),d&&d(e);else if(c.deferredLoading())this.getLoadingCount()<this.NUM_PARALLEL?this._loadImage(a,h,d):this._queue.push([a,h,d]);else try{c.initializeThroughUpload(this._rctx,
h,this._programRepository,this.getViewportToRestore(),function(a){e.setGLTexture(a);g._needsRender=!0;d&&d(e)})}catch(p){m.error("#aquire","Error loading texture: "+p.toString())}null==e.getGLTexture()&&e.setGLTexture(b?new k(this._rctx,this._fallbackTextureDesc,this._fallbackTextureTransparentData):new k(this._rctx,this._fallbackTextureDesc,this._fallbackTextureData));this._needsRender=!0}e.incRefCnt();return e};b.prototype.release=function(a){a=this.id2textureRef[a];void 0!==a&&(a.decRefCnt(),f.assert(0<=
a.getRefCnt()))};b.prototype.getLoadingCount=function(){return Object.keys(this.loading).length};b.prototype.getIsLoaded=function(a){if(null==this.id2textureRef[a]||void 0!==this.loading[a])return!1;for(var c=0;c<this._queue.length;++c)if(this._queue[c][0]===a)return!1;return!0};b.prototype.addTextureListener=function(a){f.assert(-1===this.listeners.indexOf(a));this.listeners.push(a)};b.prototype.removeTextureListener=function(a){a=this.listeners.indexOf(a);f.assert(-1!==a);this.listeners.splice(a,
1)};b.prototype.getTexture=function(a){return this.textures[a]};b.prototype.getMaxAnisotropy=function(){return this.maxAnisotropy};b.prototype._unload=function(a){var c=this.id2textureRef[a];void 0!==c&&(c.getGLTexture().dispose(),delete this.id2textureRef[a]);this.next(a)};b.prototype._createGLTextureDescription=function(a){return{target:3553,pixelFormat:6408,dataType:5121,maxAnisotropy:this.afExt&&a.params&&a.params.mipmap&&!a.params.disableAnisotropy?this.maxAnisotropy:void 0,wrapMode:a.params&&
a.params.wrapClamp?33071:void 0}};b.prototype.next=function(a){if(a in this.loading){delete this.loading[a];var c=Object.keys(this.id2textureRef),b=Object.keys(this.loading);this.listeners.forEach(function(d){d(a,c,b)});this.processQueue()}};b.prototype._loadImage=function(a,c,b){var d=this;f.assert(null==this.loading[a]);this.loading[a]=!0;var g=this.textures[a];f.assert(void 0!==g);setTimeout(function(){var e=d.id2textureRef[a];e&&e.getRefCnt()&&g.initializeThroughUpload(d._rctx,c,d._programRepository,
d.getViewportToRestore(),function(c){d.next(a);d._needsRender=!0;e&&e.getRefCnt()&&(e.setGLTexture(c),b&&b(e))})},0)};b.prototype.processQueue=function(){for(var a=[],b=0;b<this._queue.length;++b){var f=this._queue[b][0],d=this.id2textureRef[f];void 0!==d&&(0===d.getRefCnt()?(d.getGLTexture().dispose(),delete this.id2textureRef[f]):a.push(this._queue[b]))}this._queue=a;a=Math.min(this.NUM_PARALLEL-Object.keys(this.loading).length,this._queue.length);for(b=0;b<a;++b)this._loadImage(this._queue[b][0],
this._queue[b][1],this._queue[b][2]);this._queue.splice(0,a)};return b}()});