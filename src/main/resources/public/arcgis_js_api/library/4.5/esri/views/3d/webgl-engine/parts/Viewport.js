// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.5/esri/copyright.txt for details.
//>>built
define("require exports dojo/has ../lib/PerformanceTimer ../lib/Camera ../lib/Util ../lib/gl-matrix ./Visualizer".split(" "),function(d,L,M,N,q,v,m,r){var n=m.vec3;d=m.vec4d;var t=m.mat4d,g=[0,0],u=t.create(),b=[d.create(),d.create(),d.create(),d.create(),d.create(),d.create()];return function(){function c(a,h,c,b){this._content={};this._frustumCullingEnabled=!0;this._maxFarNearRatio=2E4;this._stats={renderGeometriesTotal:0,renderGeometriesVisible:0,visualizerRenderTimer:null,viewportRenderTimer:null};
this._needsRender=!0;this._rctx=b;this._gl=b.gl;this._visualizer=new r(a,h,c,this._rctx);this._camera=new q(n.createFrom(0,100,-100),n.createFrom(0,0,0))}c.prototype.getCombinedStats=function(){var a={},h=this._visualizer.getCombinedStats(),b;for(b in h)a[b]=h[b];a.renderGeometriesTotal=this._stats.renderGeometriesTotal;a.renderGeometriesVisible=this._stats.renderGeometriesVisible;void 0!==this._gl.getUsedTextureMemory&&(a.textureMemory=this._gl.getUsedTextureMemory());void 0!==this._gl.getUsedRenderbufferMemory&&
(a.renderbufferMemory=this._gl.getUsedRenderbufferMemory());void 0!==this._gl.getUsedVBOMemory&&(a.VBOMemory=this._gl.getUsedVBOMemory());if(void 0!==this._gl.getUsedTextureMemoryStats){var h=this._gl.getUsedTextureMemoryStats(),c;for(c in h)a["texMem type: "+c]=h[c]}return a};c.prototype.dispose=function(){this._visualizer.dispose();this._visualizer=null};c.prototype.setLighting=function(a){this._visualizer.setLighting(a)};c.prototype.getViewParams=function(a){var b=this._visualizer.getViewParams(a);
if(!a||a.frustumCullingEnabled)b.frustumCullingEnabled=this._frustumCullingEnabled;if(!a||a.maxFarNearRatio)b.maxFarNearRatio=this._maxFarNearRatio;return b};c.prototype.setViewParams=function(a){void 0!==a.frustumCullingEnabled&&(this._frustumCullingEnabled=a.frustumCullingEnabled);void 0!==a.maxFarNearRatio&&(this._maxFarNearRatio=-1===a.maxFarNearRatio?2E4:a.maxFarNearRatio);this._visualizer.setViewParams(a);this._needsRender=!0};c.prototype.setRenderParams=function(a){this._visualizer.setRenderParams(a)};
c.prototype.getRenderParams=function(){return this._visualizer.getRenderParams()};c.prototype.getFrustumObjects=function(){var a={},b;for(b in this._content)a[this._content[b].name]=1;return a};c.prototype.modify=function(a,b,c,d){this._visualizer.modify(a,b,c,d);this._content=this._visualizer.getContent()};c.prototype.getContent=function(){return this._content};c.prototype.setCamera=function(a){this._camera.copyFrom(a);this._updateNearFar();this._needsRender=!0};c.prototype.getCamera=function(){return this._camera};
c.prototype.getPickRay=function(a,b,c){return this.pickRayWithBeginPoint(a,void 0,this._camera.viewMatrix,b,c)};c.prototype.pickRayWithBeginPoint=function(a,b,c,d,g){return this._visualizer.getPickRay(a,b,this._camera,c,d,g)};c.prototype.addExternalRenderer=function(a,b){return this._visualizer.addExternalRenderer(a,b)};c.prototype.removeExternalRenderer=function(a){return this._visualizer.removeExternalRenderer(a)};c.prototype.getExternalRenderers=function(){return this._visualizer.getExternalRenderers()};
c.prototype.render=function(a,b){this._updateNearFar();this._visualizer.render(this._camera,a,b)};c.prototype.resetNeedsRender=function(){this._needsRender=!1;this._visualizer.resetNeedsRender()};c.prototype.needsRender=function(){return this._needsRender||this._visualizer.needsRender()};c.prototype._updateNearFar=function(){if(this._frustumCullingEnabled||0<this._maxFarNearRatio)g[1]=0,this._computeFrustumCullingAndNearFar(this._camera.eye,g),0<this._maxFarNearRatio&&0<g[1]&&(this._camera.far=g[1],
this._camera.near=Math.max(g[0],this._camera.far/this._maxFarNearRatio))};c.prototype._computeFrustumCullingAndNearFar=function(a,c){t.perspective(this._camera.fovY,this._camera.aspect,1,10,u);v.matrix2frustumPlanes(this._camera.viewMatrix,u,b);this._stats.renderGeometriesTotal=0;this._stats.renderGeometriesVisible=0;a=-Number.MAX_VALUE;var d=-Number.MAX_VALUE,g=b[0][0],h=b[0][1],m=b[0][2],n=b[0][3],q=b[1][0],r=b[1][1],w=b[1][2],x=b[1][3],y=b[2][0],z=b[2][1],A=b[2][2],B=b[2][3],C=b[3][0],D=b[3][1],
E=b[3][2],F=b[3][3],G=b[4][0],H=b[4][1],I=b[4][2],J=b[4][3],K=b[5][3],p;for(p in this._content){var f=this._content[p];this._stats.renderGeometriesTotal++;if(!f.material.isBackdrop){var k=f.center,l=k[0],e=k[1],k=k[2],f=f.bsRadius;if(g*l+h*e+m*k+n>f)continue;if(q*l+r*e+w*k+x>f)continue;if(y*l+z*e+A*k+B>f)continue;if(C*l+D*e+E*k+F>f)continue;e=G*l+H*e+I*k;l=e+f;e=-e+f;l>a&&(a=l);e>d&&(d=e)}this._stats.renderGeometriesVisible++}p=a!==-Number.MAX_VALUE;0<this._stats.renderGeometriesVisible&&p&&(c[0]=
.99*Math.max(1-(a+J),2),c[1]=1.01*Math.max(10+(d+K),c[0]+1))};return c}()});