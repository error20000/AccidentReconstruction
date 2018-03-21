// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.5/esri/copyright.txt for details.
//>>built
require({cache:{"url:esri/views/3d/webgl-engine/materials/ColorMaterial.xml":'\x3c?xml version\x3d"1.0" encoding\x3d"UTF-8"?\x3e\r\n\r\n\x3csnippets\x3e\r\n\r\n\x3csnippet name\x3d"vertexShaderColorMaterial"\x3e\x3c![CDATA[\r\n  $vsprecisionf\r\n\r\n\tuniform mat4 proj;\r\n\tuniform mat4 view;\r\n\tuniform mat4 model;\r\n\r\n\tattribute vec3 $position;\r\n\tattribute vec4 $color;\r\n\r\n\tvarying vec4 vColor;\r\n\r\n\tvoid main(void) {\r\n\t\tvColor \x3d $color * 0.003921568627451; // \x3d 1/255;\r\n\t\tgl_Position \x3d proj * view * vec4((model * vec4($position, 1.0)).xyz, 1.0);\r\n\t}\r\n]]\x3e\x3c/snippet\x3e\r\n\r\n\x3csnippet name\x3d"fragmentShaderColorMaterial"\x3e\x3c![CDATA[\r\n\t$fsprecisionf\r\n\r\n\tuniform vec4 eColor;\r\n\tvarying vec4 vColor;\r\n\r\n\tvoid main() {\r\n\t\tgl_FragColor \x3d vColor * eColor;\r\n\t}\r\n]]\x3e\x3c/snippet\x3e\r\n\x3c/snippets\x3e\r\n'}});
define("dojo/_base/lang dojo/text!./ColorMaterial.xml ./internal/MaterialUtil ../lib/RenderSlot ../lib/Util ../../../webgl/Program ../lib/DefaultVertexAttributeLocations ../lib/DefaultVertexBufferLayouts ../../../webgl/Util".split(" "),function(l,m,f,h,e,n,p,q,r){e=function(a,g){f.basicMaterialConstructor(this,g);a=a||{};a.color=a.color||[1,1,1,1];a.polygonOffset=a.polygonOffset||!1;a.vertexColors=a.vertexColors||!1;var k=q.Pos3Col;this.getParams=function(){return a};this.setColor=function(b){a.color=
b;this.notifyDirty("matChanged")};this.getColor=function(){return a.color};this.setTransparent=function(b){a.transparent=b;this.notifyDirty("matChanged")};this.getTransparent=function(b){return a.transparent};this.dispose=function(){};this.getOutputAmount=function(a){var b=r.getStride(k)/4;return a*b};this.getVertexBufferLayout=function(){return k};this.fillInterleaved=function(a,d,g,c,t,h,e){f.fillInterleaved(a,d,g,c,k,t,h,e)};this.intersect=f.intersectTriangleGeometry;this.getGLMaterials=function(){return{color:u,
depthShadowMap:void 0,normal:void 0,depth:void 0,highlight:v}};this.getAllTextureIds=function(){return[]}};var u=function(a,g,k){f.basicGLMaterialConstructor(this,a);var b=l.clone(a.getParams()),d=g.get("colorMaterial"),e=a.getColor();this.beginSlot=function(c){return c===(1>e[3]?h.TRANSPARENT_MATERIAL:h.OPAQUE_MATERIAL)};this.getProgram=function(){return d};this.updateParameters=function(){b.color=a.getColor();b.transparent=a.getTransparent()};this.bind=function(c,a){c.bindProgram(d);d.setUniform4fv("eColor",
b.color);c.setFaceCullingEnabled(!1);b.polygonOffset&&(c.setPolygonOffsetFillEnabled(!0),c.setPolygonOffset(1,1));b.transparent&&(c.setBlendingEnabled(!0),c.setBlendFunctionSeparate(c.gl.SRC_ALPHA,c.gl.ONE_MINUS_SRC_ALPHA,c.gl.ONE,c.gl.ONE_MINUS_SRC_ALPHA));c.setDepthTestEnabled(!0)};this.release=function(a){a.setPolygonOffsetFillEnabled(!1);b.transparent&&a.setBlendingEnabled(!1)};this.bindView=function(a,b){f.bindView(b.origin,b.view,d)};this.bindInstance=function(a,b){d.setUniformMatrix4fv("model",
b.transformation)};this.getDrawMode=function(a){return a.gl.TRIANGLES}},v=function(a,e,k){f.basicGLMaterialConstructor(this,a);var b=l.clone(a.getParams()),d=e.get("colorMaterial"),g=[1,1,1,1];this.beginSlot=function(a){return a===(1>g[3]?h.TRANSPARENT_MATERIAL:h.OPAQUE_MATERIAL)};this.getProgram=function(){return d};this.updateParameters=function(){b.color=a.getColor();b.transparent=a.getTransparent()};this.bind=function(a,e){a.bindProgram(d);d.setUniform4fv("eColor",b.color);a.setFaceCullingEnabled(!1);
b.polygonOffset&&(a.setPolygonOffsetFillEnabled(!0),a.setPolygonOffset(1,1))};this.release=function(a){a.setPolygonOffsetFillEnabled(!1)};this.bindView=function(a,b){f.bindView(b.origin,b.view,d)};this.bindInstance=function(a,b){d.setUniformMatrix4fv("model",b.transformation)};this.getDrawMode=function(a){return a.gl.TRIANGLES}};e.programs=null;e.loadShaders=function(a,e,f,b){a._parse(m);a=new n(b,a.vertexShaderColorMaterial,a.fragmentShaderColorMaterial,p.Default3D);f.add("colorMaterial",a)};return e});