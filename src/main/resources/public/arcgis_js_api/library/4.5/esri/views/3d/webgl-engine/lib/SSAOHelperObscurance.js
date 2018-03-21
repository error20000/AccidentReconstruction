// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.5/esri/copyright.txt for details.
//>>built
require({cache:{"url:esri/views/3d/webgl-engine/materials/internal/ssao.xml":'\x3c?xml version\x3d"1.0" encoding\x3d"UTF-8"?\x3e\r\n\r\n\x3csnippets\x3e\r\n\r\n\t\x3csnippet name\x3d"createFsSSAOSrc"\x3e\x3c![CDATA[\r\n\r\n\t$fsprecisionf\r\n\r\n\tuniform sampler2D rnm;\r\n\tuniform sampler2D normalMap;\r\n\tuniform sampler2D depthMap;\r\n\tuniform float\t\tssaoAtt;\r\n\tuniform vec2\t\trnmScale;\r\n\tuniform float\t\tradius;\r\n\tuniform vec2\t\tnearFar;\r\n\tuniform vec3\t\tpSphere[64];\r\n\r\n\tvarying vec2\t\tuv;\r\n\r\n\tconst\tfloat\t\tstrength \x3d .07;\r\n\tconst\tfloat\t\tfalloff \x3d .000002;\r\n\r\n\t$rgba2float\r\n\tvoid main(void) {\r\n\t\tvec3 fres \x3d normalize((texture2D(rnm, uv * rnmScale).xyz * 2.0) - vec3(1.0));\r\n\t\tfloat currentPixelDepth \x3d rgba2float(texture2D(depthMap, uv));\r\n\t\tvec3 ep \x3d vec3(uv.xy, currentPixelDepth);\r\n\t\tvec3 norm \x3d vec3(-1.0) + 2.0 * texture2D(normalMap, uv).xyz;\r\n\t\tfloat bl \x3d .0;\r\n\t\tfloat f \x3d mix(nearFar.x, nearFar.y, currentPixelDepth) / nearFar.x;\r\n\t\tfloat radD \x3d radius / f;\r\n\t\tradD \x3d min(radD, .5);\r\n\t\tfloat depthDifference;\r\n\t\tvec3 ray;\r\n\r\n\t\tfor(int i \x3d 0; i \x3c NUM_TAP_SAMPLES; ++i) {\r\n\t\t\tray \x3d radD*reflect(pSphere[i], fres);\r\n\t\t\tvec2 tc \x3d ep.xy + sign(dot(ray, norm) ) * ray.xy;\r\n\t\t\tif (tc.x \x3e\x3d .0 \x26\x26 tc.y \x3e\x3d .0 \x26\x26 tc.x \x3c\x3d 1.0 \x26\x26 tc.y \x3c\x3d 1.0) {\r\n\t\t\t\tfloat occluderDepth \x3d rgba2float(texture2D(depthMap, tc));\r\n\t\t\t\tvec3 occluderNormal \x3d vec3(-1.0) + 2.0 * texture2D(normalMap, tc).xyz;\r\n\t\t\t\tdepthDifference \x3d currentPixelDepth - occluderDepth;\r\n\t\t\t\tbl +\x3d step(falloff, depthDifference) * (1.0 - dot(occluderNormal, norm)) * (1.0 - smoothstep(falloff, strength, depthDifference));\r\n\t\t\t};\r\n\t\t}\r\n\r\n\t\tfloat ao \x3d 1.0 + bl * (-1.38 / float(NUM_TAP_SAMPLES)) * ssaoAtt;\r\n\t\tgl_FragColor.a \x3d ao;\r\n\t}\r\n]]\x3e\x3c/snippet\x3e\r\n\r\n\t\x3csnippet name\x3d"getDepthLinear"\x3e\x3c![CDATA[\r\n\tfloat getDepthLinear(vec2 ssC) {\r\n\t\treturn -(rgba2float(texture2D(depthMap, ssC))*(nearFar[1] - nearFar[0])+nearFar[0]);\r\n\t}\r\n]]\x3e\x3c/snippet\x3e\r\n\r\n\x3csnippet name\x3d"createFsSSAOSrcObscurance"\x3e\x3c![CDATA[\r\n\t$fsprecisionf\r\n\r\n\tuniform mat4 projMatrixInv;\r\n\r\n\tuniform sampler2D normalMap;\r\n\tuniform sampler2D depthMap;\r\n\r\n\tuniform float     intensity;\r\n\r\n\tuniform float projScale;\r\n\tuniform float     radius;\r\n\tuniform vec2      nearFar;\r\n\r\n\tuniform vec4      projInfo;\r\n\r\n\tuniform vec2\t  screenDimensions;\r\n\r\n\t//noise texture lookup could be replaced with hash function if WebGL gets XOR functionality\r\n\tuniform vec3\t\tpSphere[NUM_TAP_SAMPLES]; //tap position\r\n\tuniform vec2\t\trnmScale;\r\n\tuniform sampler2D rnm; //noise texture\r\n\r\n\t//set z scaling, used to prevent division in ortho mode\r\n\tuniform vec2 zScale;\r\n\r\n\tvarying vec2  uv;\r\n\tvarying vec4  camPos;\r\n\r\n\t$rgba2float\r\n\t$getDepthLinear\r\n\r\n\t/** Returns a unit vector and a screen-space radius for the tap on a unit disk (the caller should scale by the actual disk radius) */\r\n\t/*uniform float numSpiralTurns;\r\n\tvec2 tapLocation(int sampleNumber, float spinAngle, out float ssR){\r\n\t\t// Radius relative to ssR\r\n\t\tfloat alpha \x3d (float(sampleNumber) + 0.5) * (1.0 / float(NUM_TAP_SAMPLES));\r\n\t\tfloat angle \x3d alpha * (numSpiralTurns * 6.28) + spinAngle;\r\n\r\n\t\tssR \x3d alpha;\r\n\t\treturn vec2(cos(angle), sin(angle));\r\n\t}*/\r\n\r\n\r\n\tfloat fallOffFunction(float vv, float vn, float bias) {\r\n\t  float radius2 \x3d radius * radius;\r\n\r\n\t\t// A: From the HPG12 paper\r\n\t\t// Note large epsilon to avoid overdarkening within cracks\r\n\t\t// return float(vv \x3c radius2) * max((vn - bias) / (epsilon + vv), 0.0) * radius2 * 0.6;\r\n\r\n\t\t// B: Smoother transition to zero (lowers contrast, smoothing out corners). [Recommended]\r\n\t\tfloat f \x3d max(radius2 - vv, 0.0); return f * f * f * max(vn-bias, 0.0);\r\n\r\n\t\t// C: Medium contrast (which looks better at high radii), no division.  Note that the\r\n\t\t// contribution still falls off with radius^2, but we\'ve adjusted the rate in a way that is\r\n\t\t// more computationally efficient and happens to be aesthetically pleasing.\r\n\t\t// return 4.0 * max(1.0 - vv * invRadius2, 0.0) * max(vn - bias, 0.0);\r\n\r\n\t\t// D: Low contrast, no division operation\r\n\t\t// return 2.0 * float(vv \x3c radius * radius) * max(vn - bias, 0.0);\r\n\t}\r\n\r\n\r\n\t/** Compute the occlusion due to sample point \\a Q about camera-space point \\a C with unit normal \\a n_C */\r\n\tfloat aoValueFromPositionsAndNormal(vec3 C, vec3 n_C, vec3 Q) {\r\n\t\tvec3 v \x3d Q - C;\r\n\t\tfloat vv \x3d dot(v, v);\r\n\t\tfloat vn \x3d dot(normalize(v), n_C);\r\n\t\treturn fallOffFunction(vv, vn, 0.1);\r\n\t}\r\n\r\n\r\n\t/** Reconstruct camera-space P.xyz from screen-space S \x3d (x, y) in\r\n\t\tpixels and camera-space z \x3c 0.  Assumes that the upper-left pixel center\r\n\t\tis at (0.5, 0.5) [but that need not be the location at which the sample tap\r\n\t\twas placed!]\r\n\r\n\t\tCosts 3 MADD.  Error is on the order of 10^3 at the far plane, partly due to z precision.\r\n\t  */\r\n\tvec3 reconstructCSPosition(vec2 S, float z) {\r\n\t\treturn vec3(( (S.xy) * projInfo.xy + projInfo.zw)*(z*zScale.x+zScale.y), z);\r\n\t}\r\n\r\n\tvoid main(void)\r\n\t{\r\n\r\n\t\t//Hash function used in the HPG12 AlchemyAO paper\r\n\t\t//Not supported in WebGL -\x3e using texture lookup as in old SSAO shader instead\r\n\t\t//ivec2 ssC \x3d ivec2(gl_FragCoord.xy);\r\n\t\t//float randomPatternRotationAngle \x3d float((3 * ssC.x ^ ssC.y + ssC.x * ssC.y) * 10);\r\n\t\tvec3 fres \x3d normalize((texture2D(rnm, uv * rnmScale).xyz * 2.0) - vec3(1.0));\r\n\r\n\t   float currentPixelDepth \x3d getDepthLinear(uv);\r\n\r\n\t   if (-currentPixelDepth\x3enearFar.y || -currentPixelDepth\x3cnearFar.x) {\r\n\t\tgl_FragColor \x3d vec4(0);\r\n\t\treturn;\r\n\t   }\r\n\r\n\t   vec3 currentPixelPos \x3d reconstructCSPosition(gl_FragCoord.xy,currentPixelDepth);\r\n\r\n\t   // get the normal of current fragment\r\n\t   vec4 norm4 \x3d texture2D(normalMap, uv);\r\n\t   vec3 norm \x3d vec3(-1.0) + 2.0 * norm4.xyz;\r\n\t   bool isTerrain \x3d norm4.w\x3c0.5;\r\n\r\n\t   float sum \x3d .0;\r\n\r\n\t   vec4 occluderFragment;\r\n\t   vec3 ray;\r\n\r\n\t   vec3 tapPixelPos;\r\n\r\n\t   // note: the factor 2.0 should not be necessary, but makes ssao much nicer.\r\n\t   // bug or deviation from CE somewhere else?\r\n\t   float ps \x3d projScale/(2.0*currentPixelPos.z*zScale.x+zScale.y);\r\n\r\n\t   for(int i \x3d 0; i \x3c NUM_TAP_SAMPLES; ++i)\r\n\t   {\r\n\t\t  // get a vector (randomized inside of a sphere with radius 1.0) from a texture and reflect it\r\n\t\t  //float ssR;\r\n\t\t  //vec2 unitOffset \x3d tapLocation(i, randomPatternRotationAngle, ssR);\r\n\t\t  // get the depth of the occluder fragment\r\n\t\t  //vec2 offset \x3d vec2(-unitOffset*radius*ssR*ps);\r\n\r\n\t\t  vec2 unitOffset \x3d reflect(pSphere[i], fres).xy;\r\n\t\t  vec2 offset \x3d vec2(-unitOffset*radius*ps);\r\n\r\n\r\n\t\t  //don\'t use current or very nearby samples\r\n\t\t  if ( abs(offset.x)\x3c2.0 || abs(offset.y)\x3c2.0) continue;\r\n\r\n\r\n\t\t  vec2 tc \x3d vec2(gl_FragCoord.xy + offset);\r\n\t\t  if (tc.x \x3c 0.0 || tc.y \x3c 0.0 || tc.x \x3e screenDimensions.x || tc.y \x3e screenDimensions.y) continue;\r\n\t\t  vec2 tcTap \x3d tc/screenDimensions;\r\n\t\t  float occluderFragmentDepth \x3d getDepthLinear(tcTap);\r\n\r\n\t\t  if (isTerrain) {\r\n\t\t  \tbool isTerrainTap \x3d texture2D(normalMap, tcTap).w\x3c0.5;\r\n\t\t  \tif (isTerrainTap)\r\n\t\t  \t\tcontinue;\r\n\t\t  }\r\n\r\n\t\t  tapPixelPos \x3d reconstructCSPosition(tc, occluderFragmentDepth);\r\n\r\n\t\t  sum+\x3d aoValueFromPositionsAndNormal(currentPixelPos, norm, tapPixelPos);\r\n\t   }\r\n\r\n\t   // output the result\r\n\r\n\t\tfloat A \x3d max(1.0-sum*intensity/float(NUM_TAP_SAMPLES),0.0);\r\n\r\n\t\t// Anti-tone map to reduce contrast and drag dark region farther\r\n\t\t// (x^0.2 + 1.2 * x^4)/2.2\r\n\t\tA \x3d (pow(A, 0.2) + 1.2 * A*A*A*A) / 2.2;\r\n\r\n\r\n\t   //gl_FragColor \x3d vec4(norm/2.0+0.5, 1.0);\r\n\t   //gl_FragColor \x3d vec4(-currentPixelDepth/1000.0);\r\n\t   //gl_FragColor \x3d vec4(tapPixelPos.x/100.0);\r\n\t   gl_FragColor \x3d vec4(A);\r\n\r\n\r\n\t}\r\n]]\x3e\x3c/snippet\x3e\r\n\r\n\x3csnippet name\x3d"fsBlurEdgeAware"\x3e\x3c![CDATA[\r\n\t$fsprecisionf\r\n\r\n\tuniform sampler2D normalMap;\r\n\tuniform sampler2D depthMap;\r\n\tuniform sampler2D tex;\r\n\r\n\r\n\tuniform vec2 blurSize;\r\n\r\n\r\n\tuniform float g_BlurFalloff;\r\n\tuniform float projScale;\r\n\r\n\r\n\tvarying vec2 uv;\r\n\r\n\tuniform vec2\t\tnearFar;\r\n\r\n\t//set z scaling, used to prevent division in ortho mode\r\n\tuniform vec2 zScale;\r\n\r\n\t$rgba2float\r\n\t$getDepthLinear\r\n\r\n\tfloat BlurFunction(vec2 uv, float r, float center_d, inout float w_total, float sharpness)\r\n\t{\r\n\t\tfloat c \x3d texture2D(tex, uv).r;\r\n\t\tfloat d \x3d getDepthLinear(uv);\r\n\r\n\t\tfloat ddiff \x3d d - center_d;\r\n\r\n\t\tfloat w \x3d exp(-r*r*g_BlurFalloff - ddiff*ddiff*sharpness);\r\n\r\n\t\tw_total +\x3d w;\r\n\r\n\t\treturn w*c;\r\n\t}\r\n\r\n\tvoid main(void)\r\n\t{\r\n\r\n\t\tfloat b \x3d 0.0;\r\n\t\tfloat w_total \x3d 0.0;\r\n\r\n\t\tfloat center_d \x3d  getDepthLinear(uv);\r\n\r\n\t\tfloat sharpness \x3d -0.05*projScale/(center_d*zScale.x+zScale.y);\r\n\t\tfor (int r \x3d -RADIUS; r \x3c\x3d RADIUS; ++r)\r\n\t\t{\r\n\t\t\tfloat rf \x3d float(r);\r\n\t\t\tvec2 uvOffset \x3d uv + rf*blurSize;\r\n\t\t\tb +\x3d BlurFunction(uvOffset, rf, center_d, w_total, sharpness);\r\n\t\t}\r\n\r\n\t\tgl_FragColor \x3d vec4(b/w_total);\r\n\t}\r\n]]\x3e\x3c/snippet\x3e\r\n\r\n\r\n\t\x3csnippet name\x3d"fsBlurSrc0"\x3e\x3c![CDATA[\r\n\t$fsprecisionf\r\n\r\n\tuniform sampler2D tex;\r\n\tuniform float blurSize;\r\n\tvarying vec2 uv;\r\n\r\n\tvoid main() {\r\n\t\tint rad \x3d RADIUS - 1;\r\n\r\n\t\tvec4 sum \x3d vec4(0.0);\r\n\t\tfor (int k \x3d -RADIUS; k \x3c\x3d RADIUS; ++k) { \t\t// NOTE for-variable-init must be a const expression\r\n\t\t\tfloat fi \x3d float(k);\r\n]]\x3e\x3c/snippet\x3e\r\n\r\n\t\x3csnippet name\x3d"fsBlurSrc1"\x3e\x3c![CDATA[\r\n\t\t}\r\n\r\n\t\tgl_FragColor \x3d sum / float(RADIUS * RADIUS);\r\n\t}\r\n]]\x3e\x3c/snippet\x3e\r\n\r\n\t\x3csnippet name\x3d"fsBlurH"\x3e\x3c![CDATA[\r\n\t$fsBlurSrc0\r\n\t\t\tsum +\x3d texture2D(tex, vec2(uv.x + fi * blurSize, uv.y)) * (float(rad) - abs(fi) + 1.0);\r\n\t$fsBlurSrc1\r\n]]\x3e\x3c/snippet\x3e\r\n\r\n\t\x3csnippet name\x3d"fsBlurV"\x3e\x3c![CDATA[\r\n\t$fsBlurSrc0\r\n\t\t\tsum +\x3d texture2D(tex, vec2(uv.x, uv.y + fi * blurSize)) * (float(rad) - abs(fi) + 1.0);\r\n\t$fsBlurSrc1\r\n]]\x3e\x3c/snippet\x3e\r\n\r\n\x3c/snippets\x3e\r\n'}});
define("require exports ../../../../core/Logger ./Util ./gl-matrix dojo/text!../materials/internal/ssao.xml ../../../webgl/Program ../../../webgl/Texture ../../../webgl/FramebufferObject ../../../webgl/VertexArrayObject ../../../webgl/BufferObject ../../../webgl/Util ../../support/imageUtils ../../../webgl/enums ./DefaultVertexBufferLayouts ./DefaultVertexAttributeLocations".split(" "),function(y,P,F,v,z,G,g,A,w,B,C,t,H,Q,D,l){var I=z.vec3d,x=z.vec4d,J=F.getLogger("esri.views.3d.webgl-engine.lib.SSAOHelperObscurance");
y=function(){function b(a,f,c,b){this._enabled=!1;this._BLUR_F=2;this._attenuation=.5;this._radius=3;this._samples=16;this._viewportToRestore=x.create();this._rctx=c;this._programRep=a;this._textureRep=f;this._requestRender=b;this._emptyTexture=new A(c,{target:3553,pixelFormat:6408,dataType:5121,samplingMode:9728,width:4,height:4},null)}b.prototype.dispose=function(){this._emptyTexture.dispose();this._emptyTexture=null};b.prototype.getIsSupported=function(){var a=this._rctx,b=-1!==a.parameters.versionString.indexOf("WebGL 0.93"),
c=-1!==a.parameters.versionString.indexOf("WebGL 0.94");return a.extensions.standardDerivatives&&!(b||c)};b.prototype.setEnableState=function(a){a?this.enable():this.disable()};b.prototype.getEnableState=function(){return this._enabled};b.prototype.enable=function(){var a=this;if(!this.getEnableState())if(this.getIsSupported()){this._enabled=!0;var b={target:3553,pixelFormat:6408,dataType:5121,samplingMode:9729,wrapMode:33071,width:0,height:0},c={colorTarget:0,depthStencilTarget:0};this._ssaoFBO=
w.createWithAttachments(this._rctx,b,c);this._blur0FBO=w.createWithAttachments(this._rctx,b,c);this._blur1FBO=w.createWithAttachments(this._rctx,b,c);H.dataUriToImage("data:image/png;base64,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\x3d\x3d").then(function(c){a._noiseTexture=
new A(a._rctx,{target:3553,pixelFormat:6408,dataType:5121,hasMipmap:!0,width:u,height:u},c);a._requestRender()})}else J.warn("SSAO is not supported for this browser or hardware")};b.prototype.getQuadVAO=function(){if(!this._quadVAO){var a=new Float32Array([-1,-1,1,-1,-1,1,1,1]);this._quadVAO=new B(this._rctx,l.Default3D,{geometry:D.Pos2},{geometry:C.createVertex(this._rctx,35044,a)})}return this._quadVAO};b.prototype.disable=function(){this.getEnableState()&&(this._enabled=!1,this._quadVAO&&this._quadVAO.dispose(!0),
this._noiseTexture&&this._noiseTexture.dispose(),this._blur1FBO.dispose(),this._blur0FBO.dispose(),this._ssaoFBO.dispose(),this._ssaoFBO=this._blur0FBO=this._blur1FBO=this._noiseTexture=this._quadVAO=null)};b.prototype.setAttenuation=function(a){this._attenuation=a};b.prototype.getAttenuation=function(){return this._attenuation};b.prototype.setRadius=function(a){this._radius=a};b.prototype.getRadius=function(){return this._radius};b.prototype.getFilterRadius=function(){return 4};b.prototype.setSamples=
function(a){this._samples=a};b.prototype.getSamples=function(){return this._samples};b.prototype.computeSSAO=function(a,b,c,l){if(this._noiseTexture){v.assert(this.getEnableState());var d=this._rctx,f=c.width,k=c.height,m=f/this._BLUR_F,p=k/this._BLUR_F;this._ssaoFBO.resize(f,k);this._blur0FBO.resize(m,p);this._blur1FBO.resize(m,p);m=1*f;p=1*k;d.bindFramebuffer(this._ssaoFBO);x.set(a.fullViewport,this._viewportToRestore);d.setViewport(0,0,f,k);var e=this._programRep.get(8>=this._samples?"ssao8":16>=
this._samples?"ssao16":32>=this._samples?"ssao32":"ssao64"),h=this._programRep.get("blur"),n=a.projectionMatrix;r[0]=-2/(m*n[0]);r[1]=-2/(p*n[5]);r[2]=(1-n[2])/n[0];r[3]=(1+n[6])/n[5];n=0===n[11];e.setUniform2f("rnmScale",f/u,k/u);e.setUniform3fv("pSphere",8>=this._samples?K:16>=this._samples?L:32>=this._samples?M:N);d.bindProgram(e);e.setUniform1f("numSpiralTurns",this._samples<E.length?E[this._samples]:5779);e.setUniform4fv("projInfo",new Float32Array(r));f=1/a.computePixelSizeAtDist(1);e.setUniform1f("projScale",
1*f);e.setUniform2f("screenDimensions",m,p);n?(e.setUniform2f("nearFar",a.near,a.far),e.setUniform2f("zScale",0,-1)):(e.setUniform2f("nearFar",a.near,a.far),e.setUniform2f("zScale",1,0));var g=2*this._radius,k=I.dist(a.eye,a.center),g=20*a.computePixelSizeAtDist(k),g=Math.max(.1,g);e.setUniform1f("radius",g);e.setUniform1f("intensity",4*this._attenuation/Math.pow(g,6));e.setUniform1i("rnm",0);e.setUniform1i("normalMap",1);e.setUniform1i("depthMap",2);d.bindTexture(this._noiseTexture,0);d.bindTexture(l.colorTexture,
1);d.bindTexture(c.colorTexture,2);c=this.getQuadVAO();d.bindVAO(c);d.drawArrays(5,0,t.vertexCount(c,"geometry"));d.bindTexture(this._ssaoFBO.colorTexture,0);d.setViewport(0,0,m/this._BLUR_F,p/this._BLUR_F);d.bindFramebuffer(this._blur0FBO);h.setUniform2f("screenDimensions",m,p);h.setUniform1i("tex",0);h.setUniform1i("normalMap",1);h.setUniform1i("depthMap",2);h.setUniform2f("blurSize",0,1*this._BLUR_F/p);h.setUniform1i("radius",4);h.setUniform1f("g_BlurFalloff",.08);h.setUniform2f("nearFar",a.near,
a.far);5E4<k&&(f=Math.max(0,f-(k-5E4)));h.setUniform1f("projScale",f);n?h.setUniform2f("zScale",0,-1):h.setUniform2f("zScale",1,0);d.drawArrays(5,0,t.vertexCount(c,"geometry"));h.setUniform2f("blurSize",1*this._BLUR_F/m,0);d.bindFramebuffer(this._blur1FBO);d.bindTexture(this._blur0FBO.colorTexture,0);d.drawArrays(5,0,t.vertexCount(c,"geometry"));d.bindFramebuffer(b);d.setViewport(this._viewportToRestore[0],this._viewportToRestore[1],this._viewportToRestore[2],this._viewportToRestore[3])}};b.prototype.setUniforms=
function(a){var b=this.getEnableState()&&this._noiseTexture,c=this._rctx;c.bindTexture(b?this._blur1FBO.colorTexture:this._emptyTexture,6);c.setActiveTexture(0);a.setUniform1i("ssaoTex",6);b?a.setUniform4f("viewportPixelSz",this._viewportToRestore[0],this._viewportToRestore[1],1/this._ssaoFBO.width,1/this._ssaoFBO.height):a.setUniform4f("viewportPixelSz",-1,-1,-1,-1)};b.prototype.bindAll=function(a){a=a.getProgramsUsingUniform("viewportPixelSz");for(var b=0;b<a.length;b++)this.setUniforms(a[b])};
b.prototype.drawQuad=function(a){v.assert(this.getEnableState());var b=this._programRep.get("showDepth");this._debugQuadVAO||(this._debugQuadVAO=new B(this._rctx,l.Default3D,{geometry:D.Pos2Tex},{geometry:C.createVertex(this._rctx,35044,O)}));var c=this._rctx;c.setDepthTestEnabled(!1);b.setUniformMatrix4fv("proj",new Float32Array(a));b.setUniform1i("depthTex",0);c.bindTexture(this._ssaoFBO.colorTexture,0);c.bindVAO(this._debugQuadVAO);c.drawArrays(5,0,t.vertexCount(this._debugQuadVAO,"geometry"));
c.setDepthTestEnabled(!0)};b.loadShaders=function(a,b,c,q){v.assert(null==a.samples);a._parse(G);b=new g(q,a.vertexShaderShowDepth,a.fragmentShaderShowDepth,l.Default3D);var d=a.createFsSSAOSrcObscurance,f=new g(q,a.vsUVQuad,d,l.Default3D,{NUM_TAP_SAMPLES:"8"}),k=new g(q,a.vsUVQuad,d,l.Default3D,{NUM_TAP_SAMPLES:"16"}),m=new g(q,a.vsUVQuad,d,l.Default3D,{NUM_TAP_SAMPLES:"32"}),d=new g(q,a.vsUVQuad,d,l.Default3D,{NUM_TAP_SAMPLES:"64"});a=new g(q,a.vsUVQuad,a.fsBlurEdgeAware,l.Default3D,{RADIUS:(4).toString()});
c.add("showDepth",b);c.add("ssao8",f);c.add("ssao16",k);c.add("ssao32",m);c.add("ssao64",d);c.add("blur",a)};return b}();var r=x.create(),K=new Float32Array([.186937,0,0,.677503,0,0,-.782832,.128424,.557187,.248064,.460317,-.659755,.062892,.918659,.312829,-.241031,-.814826,.224206,-.642866,.132138,-.45016,.145727,-.590568,-.626141,.005017,-.002234,.012668]),L=new Float32Array([.186937,0,0,.700542,0,0,-.864858,-.481795,-.111713,-.624773,.102853,-.730153,-.387172,.260319,.007229,-.222367,-.642631,-.707697,
-.01336,-.014956,.169662,.122575,.1544,-.456944,-.177141,.85997,-.42346,-.131631,.814545,.524355,-.779469,.007991,.624833,.308092,.209288,.35969,.359331,-.184533,-.377458,.192633,-.482999,-.065284,.233538,.293706,-.055139,.417709,-.386701,.442449,-.301656,-.836426,.408344]),M=new Float32Array([.837372,0,0,.723531,-.467287,.034157,.169582,-.31169,-.881801,.696236,.455215,-.204568,-.304514,.528086,.626381,-.053116,.222507,.037523,.199755,.311291,.916799,-.681552,-.516264,.501792,-.37127,.021088,.737477,
-.029503,.209188,-.95298,-.573731,.009962,-.154202,-.257345,-.905958,.282747,.370779,.527867,-.669424,-.601758,-.191278,-.708243,.271796,.782684,.535565,-.006867,-.015312,-.017276,.419958,.265628,.233036,-.543898,.554747,-.174055,-.079242,.053475,-.099539,.372042,-.339267,-.357362,.015781,-.011352,.042707,-.340564,-.272507,-.067725,.799249,-.127948,.586808,.450015,.01965,-.416454,-.506524,.323229,.206546,-.087316,-.311097,.466049,.146374,-.34528,-.045904,-.152614,-.926686,-.287529,-.665726,-.032904,
.246643,.248703,.637193,-.062541,-.073706,.495925,-.315143,.05946,-.116042,.075586]),N=new Float32Array([.186937,0,0,.605726,-.313457,-.097616,.003541,.781245,.283011,-.225029,-.373279,.274442,-.047511,.04992,-.226365,.627629,-.623617,-.463628,.133094,-.318299,.528128,.262035,.100234,-.09012,.178335,-.426972,-.666048,-.27306,-.207352,.05514,-.613649,-.063395,.060608,-.283391,-.41382,-.087565,.136768,.506126,.484137,-.593808,-.344603,.453164,.675326,.124799,-.697865,-.33502,.411337,-.09337,-.15271,
.002908,-.063582,.366733,-.699739,.401148,-.519536,-.585625,-.508413,.106482,-.428709,-.260221,.012847,-.118806,.016962,-.188182,.49945,.452364,.586617,.722539,-.23302,.111295,.202827,.066695,-.036503,.315842,.896467,-.039109,-.270116,-.080062,.613435,.508787,.538656,-.352275,.566869,-.666275,.887876,-.138341,-.434135,-.444711,.269156,.119506,-.029457,-.077316,.754474,.274125,-.13876,-.37082,-.73268,.332723,.568545,-.203992,.878922,-.430778,.541154,-.546752,.11786,-3.93E-4,-.083318,.059333,-.341406,
-.117017,-.318568,-.262425,-.457913,.848753,.89229,-.30157,.322416,.742328,.032262,.643827,.048091,-.078044,-.49908,.064858,.549944,-.796252,-.230688,.88978,-.010153,.397241,-.27645,.405666,-.46593,.131187,-.600166,.333834,-.078219,.73837,-.870169,-.411658,-.222175,-.492421,.741454,.293757,-.591244,.389112,-.388324,.792346,.578552,.088459,-.121858,-.437241,-.472535,-.374835,.302427,.721264,.057485,.204085,-.126575,.510325,.481492,-.579888,-.29411,-.82136,.156404,-.819717,-.042466,.456573,.079884,
.07019,.179002,.220279,.970222,-.088025,-.299911,-.234627,-.820794,.912112,.243306,.317869,.241336,.161841,-.721568,.301135,-.635993,-.0939,-.514731,-.089673,.850964,-.905087,.314604,-.098397]),u=64,E=[1,1,1,2,3,2,5,2,3,2,3,3,5,5,3,4,7,5,5,7,9,8,5,5,7,7,7,8,5,8,11,12,7,10,13,8,11,8,7,14,11,11,13,12,13,19,17,13,11,18,19,11,11,14,17,21,15,16,17,18,13,17,11,17,19,18,25,18,19,19,29,21,19,27,31,29,21,18,17,29,31,31,23,18,25,26,25,23,19,34,19,27,21,25,39,29,17,21,27,29],O=new Float32Array([0,0,0,0,512,
0,1,0,0,512,0,1,512,512,1,1]);return y});