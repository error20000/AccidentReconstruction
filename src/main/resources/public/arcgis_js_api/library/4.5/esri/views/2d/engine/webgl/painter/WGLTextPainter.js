// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.5/esri/copyright.txt for details.
//>>built
define(["require","exports","../../../../webgl/VertexArrayObject","../Utils"],function(q,r,k,l){return function(){function e(){this._attributeLocations={a_pos:0,a_id:1,a_color:2,a_offsetAndNormal:3,a_texFontSize:4,a_visible:5};this._attributeLocationsVV={a_pos:0,a_id:1,a_color:2,a_offsetAndNormal:3,a_texFontSize:4,a_visible:5,a_vv:6};this._vertexAttributeLayout={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:20,normalized:!1,divisor:0},{name:"a_id",count:4,type:5121,offset:4,stride:20,
normalized:!0,divisor:0},{name:"a_color",count:4,type:5121,offset:8,stride:20,normalized:!0,divisor:0},{name:"a_offsetAndNormal",count:4,type:5120,offset:12,stride:20,normalized:!1,divisor:0},{name:"a_texFontSize",count:4,type:5120,offset:16,stride:20,normalized:!1,divisor:0}],visibility:[{name:"a_visible",count:1,type:5120,offset:0,stride:1,normalized:!1,divisor:0}]};this._vertexAttributeLayoutVV={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:36,normalized:!1,divisor:0},{name:"a_id",
count:4,type:5121,offset:4,stride:36,normalized:!0,divisor:0},{name:"a_color",count:4,type:5121,offset:8,stride:36,normalized:!0,divisor:0},{name:"a_offsetAndNormal",count:4,type:5120,offset:12,stride:36,normalized:!1,divisor:0},{name:"a_texFontSize",count:4,type:5120,offset:16,stride:36,normalized:!1,divisor:0},{name:"a_vv",count:4,type:5126,offset:20,stride:36,normalized:!1,divisor:0}],visibility:[{name:"a_visible",count:1,type:5120,offset:0,stride:1,normalized:!1,divisor:0}]};this._glyphsTextureSize=
new Float32Array(2)}e.prototype.draw=function(f,b,g,c,a,p,e,k,h,n,l){if(g.canDisplay){var d=b.materialKeyInfo,m=d.vvSizeMinMaxValue||d.vvSizeScaleStops||d.vvSizeFieldStops||d.vvSizeUnitValue||d.vvColor||d.vvRotation||d.vvOpacity;if(a=k.getProgram(b.materialKey,a,m?this._attributeLocationsVV:this._attributeLocations))f.bindProgram(a),m=this._getVAO(f,g,m),f.bindVAO(m),b=b.texBindingInfo[0],h.bindGlyphsPage(f,b.pageId,b.unit),a.setUniform1i(b.semantic,b.unit),h=h.glyphs,this._glyphsTextureSize[0]=h.width/
4,this._glyphsTextureSize[1]=h.height/4,n=c.vvMaterialParameters.vvRotationEnabled&&"geographic"===c.vvMaterialParameters.vvRotationType?n:l,a.setUniformMatrix4fv("u_transformMatrix",g.tileTransform.transform),a.setUniformMatrix4fv("u_extrudeMatrix",n),a.setUniform2fv("u_normalized_origin",g.tileTransform.displayCoord),a.setUniform2fv("u_mosaicSize",this._glyphsTextureSize),a.setUniform1f("u_pixelRatio",1),a.setUniform1f("u_opacity",1),d.vvSizeMinMaxValue&&a.setUniform4fv("u_vvSizeInfo",c.vvSizeMinMaxValue),
d.vvColor&&(a.setUniform1fv("u_vvColorValues",c.vvColorValues),a.setUniform4fv("u_vvColors",c.vvColors)),d.vvOpacity&&(a.setUniform1fv("u_vvOpacityValues",c.vvOpacityValues),a.setUniform1fv("u_vvOpacities",c.vvOpacities)),f.drawElements(4,e,5125,4*p),f.bindVAO(null)}};e.prototype._getVAO=function(f,b,g){if(b.iconGeometry.vao)return b.iconGeometry.vao;var c=b.iconGeometry.vertexBufferMap[l.C_VBO_GEOMETRY],a=b.iconGeometry.vertexBufferMap[l.C_VBO_VISIBILITY],e=b.iconGeometry.indexBuffer;if(!c||!e)return null;
b.iconGeometry.vao=g?new k(f,this._attributeLocationsVV,this._vertexAttributeLayoutVV,{geometry:c,visibility:a},e):new k(f,this._attributeLocations,this._vertexAttributeLayout,{geometry:c,visibility:a},e);return b.iconGeometry.vao};return e}()});