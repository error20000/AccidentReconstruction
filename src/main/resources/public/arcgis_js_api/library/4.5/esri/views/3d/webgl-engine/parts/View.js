// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.5/esri/copyright.txt for details.
//>>built
define("require exports ../../../../core/Logger ../lib/GLTextureRep ../lib/GLMaterialRep ../lib/ShaderSnippets ../lib/GLSLShaderRep ../lib/TextureRenderer ../lib/gl-matrix ../lib/webgl-utils ./Model ./Viewport ../materials/repository ../lib/SSAOHelperObscurance ../lib/HighlightHelper ../lib/OffscreenRenderingHelper ../lib/tracer ../../../webgl/RenderingContext ../lib/ProgramRepository ../lighting/Lightsources ../../../support/screenshotUtils".split(" "),function(K,L,q,r,t,u,v,w,p,x,y,z,A,B,C,D,n,
E,F,G,H){var k=p.vec3d,I=p.vec4d,J=q.getLogger("esri.views.3d.webgl-engine.parts.View");return function(){function b(a,e,b,f){var d=this;this._backgroundColor=I.createFrom(1,1,1,1);this._lightDirection=k.createFrom(0,1,0);this._didRender=!1;this._idleSuspend=this._needsRender=!0;this._shouldRender=!1;this._screenCaptureQueue=[];this._container=a;this._stage=e;this._initializeContext(f);this._initializeShaders(f);this._textureRep=new r(e.getAll(y.ContentType.TEXTURE),this._programRepository,function(){return d._viewport.getCamera().viewport},
this._rctx);this._materialRep=new t(this._textureRep,this._programRepository);this._viewport=new z(this._programRepository,this._materialRep,this._textureRep,this._rctx);this._initializeViewportCamera();this._textureRenderer=new w(this._rctx,this._canvas,this._programRepository,this._materialRep,this._textureRep,b);this._initializeFrameTask()}b.prototype._initializeFrameTask=function(){var a=this;this._frameTask={preRender:function(){n.begin();a._stage.processDirty();a.needsRender()?(a._shouldRender=
!0,a._viewport.getCamera().setGLViewport(a._rctx),a._rctx.setClearColor.apply(a._rctx,a._backgroundColor),a._rctx.clear(16640)):a._shouldRender=!1},render:function(){a._shouldRender&&(a._didRender=!0,a._viewport.render(a._lightDirection,null))},postRender:function(){n.end()},update:function(){a._performScreenCaptures();a.resetNeedsRender()}}};b.prototype._initializeViewportCamera=function(){var a=this._container.getBoundingClientRect(),e=this._viewport.getCamera();e.viewport[2]=a.width;e.viewport[3]=
a.height;this._viewport.setCamera(e)};b.prototype._initializeContext=function(a){this._canvas=a.canvas;this._canvas||(this._canvas=document.createElement("canvas"));this._canvas.setAttribute("style","width: 100%; height:100%; display:block;");var e=x.setupWebGL(this._canvas,{alpha:a.alpha||!1,antialias:!1,depth:!0,stencil:null==a.stencil?!0:a.stencil});this._gl=n.instrumentContext(e[0]);this._rctx=new E(e[0],{disabledExtensions:a.deactivatedWebGLExtensions});!a.alpha&&this._rctx.contextAttributes.alpha&&
J.error("WebGL context has alpha channel even though no alpha channel was requested");this._container.appendChild(this._canvas)};b.prototype._initializeShaders=function(a){this._shaderSnippets=new u({fsprecisionf:"\n#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\nprecision highp sampler2D;\n#else\nprecision mediump float;\nprecision mediump sampler2D;\n#endif\n",vsprecisionf:"\nprecision highp float;\nprecision highp sampler2D;\n",viewingMode:"global"===a.viewingMode?"#define VIEWING_MODE_GLOBAL 1 \n":
" #define VIEWING_MODE_LOCAL 1 \n"});this._shaderRep=new v;this._programRepository=new F;A.initializeShaders(this._shaderSnippets,this._shaderRep,this._programRepository,this._rctx);C.loadShaders(this._shaderSnippets,this._shaderRep,this._programRepository,this._rctx);B.loadShaders(this._shaderSnippets,this._shaderRep,this._programRepository,this._rctx);D.loadShaders(this._shaderSnippets,this._shaderRep,this._programRepository,this._rctx)};b.prototype.dispose=function(){this._viewport.dispose();this._viewport=
null;this._textureRenderer.dispose();this._textureRenderer=null;this._programRepository.dispose();this._programRepository=null;this._container.contains(this._canvas)&&this._container.removeChild(this._canvas);this._gl=this._canvas=this._container=null};b.prototype.getCombinedStats=function(){return this._viewport.getCombinedStats()};b.prototype.setNeedsRender=function(){this._didRender=!1;this._needsRender=!0};b.prototype.resetNeedsRender=function(){this._didRender&&(this._didRender=this._needsRender=
!1);this._viewport.resetNeedsRender();this._textureRep.resetNeedsRender()};b.prototype.needsRender=function(){return this._needsRender||!this._idleSuspend||this._viewport.needsRender()||this._textureRep.needsRender()};b.prototype.getFrameTask=function(){return this._frameTask};b.prototype.setLighting=function(a){k.set3(0,0,0,this._lightDirection);for(var e=0,b=a.lights;e<b.length;e++){var f=b[e];if(f instanceof G.MainLight){k.negate(f.direction,this._lightDirection);break}}this._viewport.setLighting(a);
this._needsRender=!0};b.prototype.getMainLightDirection=function(){return this._lightDirection};b.prototype.getViewParams=function(a){var e=this._viewport.getViewParams(a);if(!a||a.backgroundColor)e.backgroundColor=this._backgroundColor;return e};b.prototype.setViewParams=function(a){this._needsRender=!0;a.backgroundColor&&(this._backgroundColor=a.backgroundColor);this._viewport.setViewParams(a)};b.prototype.setRenderParams=function(a){this._needsRender=!0;void 0!==a.idleSuspend&&(this._idleSuspend=
!!a.idleSuspend);this._viewport.setRenderParams(a)};b.prototype.getRenderParams=function(){var a=this._viewport.getRenderParams();a.anisotropicFiltering=this._textureRep.getMaxAnisotropy();a.idleSuspend=this._idleSuspend;return a};Object.defineProperty(b.prototype,"renderingContext",{get:function(){return this._rctx},enumerable:!0,configurable:!0});b.prototype.has=function(a){return"s3tc"===a?!!this._rctx.extensions.compressedTextureS3TC:"standardDerivatives"===a?!!this._rctx.extensions.standardDerivatives:
"shaderTextureLOD"===a?!!this._rctx.extensions.shaderTextureLOD:"angleInstancedArrays"===a?!!this._rctx.extensions.angleInstancedArrays:!1};b.prototype.getFrustumObjects=function(){return this._viewport.getFrustumObjects()};b.prototype.modify=function(a,e,b,f){this._viewport.modify(a,e,b,f)};b.prototype.setCamera=function(a){this._viewport.setCamera(a)};b.prototype.getCamera=function(){return this._viewport.getCamera()};b.prototype.getPickRay=function(a,b,h){this._viewport.getPickRay(a,b,h)};b.prototype.pickRayWithBeginPoint=
function(a,b,h,f,d){this._viewport.pickRayWithBeginPoint(a,b,h,f,d)};b.prototype.getCanvas=function(){return this._canvas};b.prototype.getTextureGraphicsRenderer=function(){return this._textureRenderer};b.prototype.requestScreenCapture=function(a,b){this._screenCaptureQueue.push({settings:a||{},callback:b});this._needsRender=!0};b.prototype.getAllTexturesLoaded=function(){return 0===this._textureRep.getLoadingCount()};b.prototype.getTextureLoaded=function(a){return this._textureRep.getIsLoaded(a)};
b.prototype.addTextureListener=function(a){this._textureRep.addTextureListener(a)};b.prototype.removeTextureListener=function(a){this._textureRep.removeTextureListener(a)};b.prototype.addExternalRenderer=function(a,b){return this._viewport.addExternalRenderer(a,b)?(b.initializeRenderContext({rctx:this._rctx,gl:this._rctx.gl,shaderSnippets:this._shaderSnippets,shaderRep:this._shaderRep,programRep:this._programRepository,textureRep:this._textureRep}),!0):!1};b.prototype.removeExternalRenderer=function(a){return this._viewport.removeExternalRenderer(a)?
(a.uninitializeRenderContext({rctx:this._rctx,gl:this._rctx.gl}),!0):!1};b.prototype._performScreenCaptures=function(){if(0!==this._screenCaptureQueue.length){for(var a=0;a<this._screenCaptureQueue.length;a++){var b=this._screenCaptureQueue[a],h=0,f=0,d=this._canvas.width,g=this._canvas.height,l=this._canvas.width,m=this._canvas.height,c=b.settings.area;c&&(h=c.x,f=c.y,d=c.width,g=c.height);void 0!==b.settings.width&&void 0!==b.settings.height?(c=b.settings.width/b.settings.height,g*c<d?(c*=g,h+=
Math.floor((d-c)/2),d=Math.floor(c)):(c=d/c,f+=Math.floor((g-c)/2),g=Math.floor(c)),l=b.settings.width,m=b.settings.height):(l=d,m=g);var n=this._canvas,c=null;if(0!==h||0!==f||d!==this._canvas.width||g!==this._canvas.height||l!==this._canvas.width||m!==this._canvas.height){this._resizeCanvas||(this._resizeCanvas=document.createElement("canvas"));this._resizeCanvas.width=l;this._resizeCanvas.height=m;var k=this._resizeCanvas.getContext("2d"),c=new Uint8Array(d*g*4);this._gl.readPixels(h,this._canvas.height-
(f+g),d,g,6408,5121,c);h=k.getImageData(0,0,l,m);H.resampleHermite(c,d,g,h.data,l,m,!0);k.putImageData(h,0,0);n=this._resizeCanvas;k=null}d={png:"image/png",jpg:"image/jpeg",jpeg:"image/jpeg"}[b.settings.format?b.settings.format.toLowerCase():"png"];g=1;void 0!==b.settings.quality&&(g=b.settings.quality/100);d={dataURL:n.toDataURL(d,g),x:0,y:0,width:l,height:m};b.settings.returnByteBuffer&&(d.data=c);b.callback(d)}this._screenCaptureQueue=[]}};return b}()});