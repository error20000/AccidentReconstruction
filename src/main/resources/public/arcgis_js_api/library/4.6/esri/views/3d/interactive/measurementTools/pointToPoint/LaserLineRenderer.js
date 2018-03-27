// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.6/esri/copyright.txt for details.
//>>built
require({cache:{"url:esri/views/3d/interactive/measurementTools/pointToPoint/LaserLine.xml":'\x3c?xml version\x3d"1.0" encoding\x3d"UTF-8"?\x3e\r\n\r\n\x3csnippets\x3e\r\n\r\n\x3csnippet name\x3d"fsLaserLine"\x3e\x3c![CDATA[\r\n#ifdef GL_OES_standard_derivatives\r\n#extension GL_OES_standard_derivatives : enable\r\n#endif\r\n\r\n  $fsprecisionf\r\n\r\n  varying vec2 uv;\r\n\r\n  uniform sampler2D depthMap;\r\n\r\n  uniform vec2 nearFar;\r\n  uniform vec4 projInfo;\r\n\r\n  // focus plane in camera space\r\n  uniform vec4 focusPlane;\r\n\r\n  // segment plane in camera space\r\n  uniform vec4 segmentPlane;\r\n\r\n  // line segment\r\n  uniform vec3 segmentStart;\r\n  uniform vec3 segmentEnd;\r\n\r\n  // styling\r\n  uniform vec3 glowColor;\r\n  uniform float glowWidth;\r\n  uniform vec3 innerColor;\r\n  uniform float innerWidth;\r\n  uniform float globalAlpha;\r\n\r\n  #define INFINITY 100000.0\r\n\r\n  $rgba2float\r\n\r\n  // reconstruct depth value from linear depth map\r\n  float linearDepth(vec2 uv) {\r\n    return -(rgba2float(texture2D(depthMap, uv)) * (nearFar[1] - nearFar[0]) + nearFar[0]);\r\n  }\r\n\r\n  // reconstruct position in view space\r\n  vec3 reconstructPosition(vec2 fragCoord, float depth) {\r\n    return vec3((fragCoord * projInfo.xy + projInfo.zw) * depth, depth);\r\n  }\r\n\r\n#ifdef GL_OES_standard_derivatives\r\n  float planeDistancePixels(vec4 plane, vec3 pos) {\r\n    // compute distance to plane\r\n    float dist \x3d dot(plane.xyz, pos) + plane.w;\r\n    // compute derivative of distance function with respect to pixels\r\n    float width \x3d fwidth(dist);\r\n    // normalize distance by the derivative to get a measurement with respect to pixels\r\n    // the clamping is used to prevent excessive artifacts along depth discontinuities\r\n    dist /\x3d clamp(width, 0.01, 5.0);\r\n    return abs(dist);\r\n  }\r\n#endif\r\n\r\n  // computes laser line color based on distance in pixels\r\n  vec4 laserLineProfile(float dist) {\r\n    if (dist \x3e glowWidth) {\r\n      return vec4(0.0);\r\n    }\r\n\r\n    float inner \x3d smoothstep(innerWidth, 0.0, dist);\r\n    float alpha \x3d globalAlpha * pow(max(0.0, 1.0 - dist / glowWidth), 8.0);\r\n    vec3 color \x3d glowColor + inner * innerColor;\r\n    return vec4(color, alpha);\r\n  }\r\n\r\n  void main() {\r\n#ifdef GL_OES_standard_derivatives\r\n    // do not draw laserline on background\r\n    float depth \x3d linearDepth(uv);\r\n    if (-depth \x3d\x3d nearFar[0]) {\r\n      discard;\r\n    }\r\n\r\n    // reconstruct position in view space\r\n    vec3 pos \x3d reconstructPosition(gl_FragCoord.xy, depth);\r\n\r\n    // empirical hack to fade out laser line in problematic areas:\r\n    // the derivatives to normalize the distance function are valid inside smooth surfaces,\r\n    // but break down at depth discontinuities (e.g. edges). We fade out the laser lines in\r\n    // areas where depth valus have large variations in order to avoid this problem.\r\n    float ddepth \x3d fwidth(depth);\r\n    float fade \x3d smoothstep(0.01, 0.0, -ddepth / depth);\r\n\r\n    // reconstruct normal using derivatives\r\n    vec3 normal \x3d normalize(cross(dFdx(pos), dFdy(pos)));\r\n\r\n    // distance to focus plane\r\n    float focusDistance \x3d planeDistancePixels(focusPlane, pos);\r\n\r\n    // distance to segment plane\r\n    float segmentDistance \x3d INFINITY;\r\n    float segmentLength \x3d length(segmentEnd - segmentStart);\r\n    vec3 segmentDir \x3d (segmentEnd - segmentStart) / segmentLength;\r\n    float t \x3d dot(segmentDir, pos - segmentStart);\r\n    if (segmentLength \x3e 0.0 \x26\x26 t \x3e\x3d 0.0 \x26\x26 t \x3c\x3d segmentLength) {\r\n      segmentDistance \x3d planeDistancePixels(segmentPlane, pos);\r\n    }\r\n\r\n    // evaluate color profile for both planes\r\n    vec4 focusColor \x3d laserLineProfile(focusDistance);\r\n    vec4 segmentColor \x3d laserLineProfile(segmentDistance);\r\n\r\n    // empirical hack to fade out laser line when planes are nearly parallel\r\n    float focusFade \x3d smoothstep(0.999, 0.995, abs(dot(normal, focusPlane.xyz)));\r\n    float segmentFade \x3d smoothstep(0.999, 0.995, abs(dot(normal, segmentPlane.xyz)));\r\n\r\n    // combine colors\r\n    vec4 color \x3d max(focusColor * focusFade, segmentColor * segmentFade);\r\n    color.a \x3d min(1.0, color.a) * fade;\r\n    gl_FragColor \x3d color;\r\n#else\r\n    // we might compute the derivatives ourselves, but because\r\n    // GL_OES_standard_derivatives should be widely supported we just\r\n    // disable laser lines when support is missing.\r\n    gl_FragColor \x3d vec4(0.0);\r\n#endif\r\n  }\r\n]]\x3e\x3c/snippet\x3e\r\n\r\n\x3c/snippets\x3e\r\n'}});
define("require exports ../../../../../core/tsSupport/extendsHelper ../../../../webgl/Program ../../../../webgl/VertexArrayObject ../../../../webgl/BufferObject ../../../../webgl/enums ../../../lib/glMatrix ../../../webgl-engine/lib/RenderSlot ../../../webgl-engine/lib/DefaultVertexBufferLayouts ../../../webgl-engine/lib/DefaultVertexAttributeLocations ../../../webgl-engine/materials/internal/MaterialUtil dojo/text!./LaserLine.xml".split(" "),function(E,F,G,w,x,y,H,l,z,A,r,t,B){function u(b,c,d,v){var e=
p,f=C;m.multiplyVec3(v,c,e);a.set(d,f);f[3]=0;m.multiplyVec4(v,f);q.set4(f[0],f[1],f[2],-a.dot(f,e),b)}var a=l.vec3d,q=l.vec4d,m=l.mat4d,p=a.create(),C=q.create(),D={glowColor:[1,.5,0],glowWidth:8,innerColor:[1,1,1],innerWidth:.75,globalAlpha:.75};return function(){function b(c,d){void 0===d&&(d={});this._projInfo=new Float32Array(4);this._focusPosition=a.create();this._segmentStartPosition=a.create();this._segmentEndPosition=a.create();this._tempNormal=a.create();this._tempDir=a.create();this._tempUp=
a.create();this._tempVec3=a.create();this._tempVec4=q.create();this.didRender=!1;this.needsRender=!0;this.segmentActive=this.focusActive=!1;this._renderCoordsHelper=c;this._params=t.copyParameters(d,D)}Object.defineProperty(b.prototype,"renderSlots",{get:function(){return[z.POSTPROCESSING_EXTERNAL]},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"needsLinearDepth",{get:function(){return!0},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"focusPosition",{get:function(){return this._focusPosition},
set:function(c){a.set(c,this._focusPosition);this.needsRender=!0},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"segmentStartPosition",{get:function(){return this._segmentStartPosition},set:function(c){a.set(c,this._segmentStartPosition);this.needsRender=!0},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"segmentEndPosition",{get:function(){return this._segmentEndPosition},set:function(c){a.set(c,this._segmentEndPosition);this.needsRender=!0},enumerable:!0,configurable:!0});
b.prototype.setParameterValues=function(c){t.updateParameters(this._params,c)&&(this.needsRender=!0)};b.prototype.initializeRenderContext=function(c){var d=c.rctx,a=new Float32Array([-1,-1,1,-1,-1,1,1,1]);this._quadVAO=new x(d,r.Default3D,{geometry:A.Pos2},{geometry:y.createVertex(d,35044,a)});c.shaderSnippets.fsLaserLine||c.shaderSnippets._parse(B);this._laserLineProgram=new w(d,c.shaderSnippets.vsUVQuad,c.shaderSnippets.fsLaserLine,r.Default3D)};b.prototype.uninitializeRenderContext=function(a){this._quadVAO.dispose();
this._quadVAO=null;this._laserLineProgram.dispose();this._projInfo=this._laserLineProgram=null};b.prototype.render=function(c){var d=c.rctx,b=c.camera,e=b.width,f=b.height,n=this._renderCoordsHelper,g=this._laserLineProgram,h=this._projInfo;d.bindProgram(g);var k=b.projectionMatrix;h[0]=-2/(e*k[0]);h[1]=-2/(f*k[5]);h[2]=(1-k[2])/k[0];h[3]=(1+k[6])/k[5];g.setUniform4fv("projInfo",h);g.setUniform2f("nearFar",b.near,b.far);this.focusActive?(e=this._focusPosition,f=this._tempVec3,h=this._tempVec4,n.worldUpAtPosition(e,
f),u(h,e,f,b.viewMatrix),g.setUniform4fv("focusPlane",h)):g.setUniform4fv("focusPlane",[0,0,0,1E10]);if(this.segmentActive){var e=this._tempVec4,f=this._tempVec3,h=this._tempUp,k=this._tempDir,l=this._tempNormal;a.lerp(this._segmentStartPosition,this._segmentEndPosition,.5,f);n.worldUpAtPosition(f,h);a.subtract(this._segmentEndPosition,this._segmentStartPosition,k);a.normalize(k);a.cross(h,k,l);a.normalize(l);u(e,this._segmentStartPosition,l,b.viewMatrix);g.setUniform4fv("segmentPlane",e)}else g.setUniform4fv("segmentPlane",
[0,0,0,1E10]);e=p;a.set(this._segmentStartPosition,e);n.setAltitude(0,e);m.multiplyVec3(b.viewMatrix,e);g.setUniform3fv("segmentStart",e);e=p;a.set(this._segmentEndPosition,e);n.setAltitude(0,e);m.multiplyVec3(b.viewMatrix,e);g.setUniform3fv("segmentEnd",e);g.setUniform1i("depthMap",0);d.bindTexture(c.depth.colorTexture,0);g.setUniform3fv("innerColor",this._params.innerColor);g.setUniform1f("innerWidth",this._params.innerWidth);g.setUniform3fv("glowColor",this._params.glowColor);g.setUniform1f("glowWidth",
this._params.glowWidth);g.setUniform1f("globalAlpha",this._params.globalAlpha);d.bindVAO(this._quadVAO);d.setDepthTestEnabled(!1);d.setDepthWriteEnabled(!1);d.setBlendingEnabled(!0);d.setBlendFunctionSeparate(770,771,1,771);d.drawArrays(5,0,4);d.setDepthTestEnabled(!0);d.setDepthWriteEnabled(!0);d.setBlendingEnabled(!1);return!0};return b}()});