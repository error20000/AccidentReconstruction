// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.5/esri/copyright.txt for details.
//>>built
define(["require","exports","../lib/glMatrix"],function(d,e,c){var a=c.vec2d;return function(){function b(){this.overlayTexOffset=a.create();this.texOffset=a.create();this.geometryInfo={geometry:null,numSurfaceIndices:0,numSkirtIndices:0,numWithoutSkirtIndices:0,numVertsPerRow:0};this.init()}b.prototype.init=function(){this.geometryInfo.geometry=null;this.geometryInfo.numSurfaceIndices=0;this.geometryInfo.numSkirtIndices=0;this.geometryInfo.numWithoutSkirtIndices=0;this.geometryInfo.numVertsPerRow=
0;this.textureReference=this.texture=this.vao=this.geometryState=null;a.set2(0,0,this.texOffset);this.texScale=1;this.highlightOverlayTexId=this.overlayTexId=null;this.overlayTexScale=[1,1];this.overlayOpacity=1;this.localOrigin=null};b.prototype.updateGeometryState=function(a){return this.geometryState=a.geometryState(this.geometryState)};return b}()});