// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.5/esri/copyright.txt for details.
//>>built
define(["./TileBase","./TileGeometryFactory","../../../core/ObjectPool","../support/mathUtils","../lib/glMatrix"],function(h,l,m,k,b){var n=b.vec3d.createFrom(0,0,1);b=function(a,p,b,d){h.call(this);this.tileUp=n;void 0!==a&&this.init(a,p,b,d)};b.prototype=new h;b.prototype.constructor=b;b.prototype.init=function(a,b,c,d){h.prototype.init.call(this,a,b,c,d);this.edgeLen=this.extent[2]-this.extent[0];this.curvatureHeight=0;this.centerAtSeaLevel[0]=k.lerp(this.extent[0],this.extent[2],.5);this.centerAtSeaLevel[1]=
k.lerp(this.extent[1],this.extent[3],.5);this.centerAtSeaLevel[2]=0;this.updateRadiusAndCenter()};b.prototype.updateRadiusAndCenter=function(){h.prototype.updateRadiusAndCenter.call(this);var a=(this.extent[2]-this.extent[0])*Math.SQRT1_2,b=.5*(this.elevationBounds[0]-this.elevationBounds[1]);this.radius=Math.sqrt(a*a+b*b)};b.prototype.isVisible=function(a){if(!this.intersectsClippingArea)return!1;var b=this.extent[0],c=this.extent[1],d=this.elevationBounds[0],e=this.extent[2],f=this.extent[3],g=
this.elevationBounds[1];return 0<a[0][0]*(0<a[0][0]?b:e)+a[0][1]*(0<a[0][1]?c:f)+a[0][2]*(0<a[0][2]?d:g)+a[0][3]||0<a[1][0]*(0<a[1][0]?b:e)+a[1][1]*(0<a[1][1]?c:f)+a[1][2]*(0<a[1][2]?d:g)+a[1][3]||0<a[2][0]*(0<a[2][0]?b:e)+a[2][1]*(0<a[2][1]?c:f)+a[2][2]*(0<a[2][2]?d:g)+a[2][3]||0<a[3][0]*(0<a[3][0]?b:e)+a[3][1]*(0<a[3][1]?c:f)+a[3][2]*(0<a[3][2]?d:g)+a[3][3]||0<a[4][0]*(0<a[4][0]?b:e)+a[4][1]*(0<a[4][1]?c:f)+a[4][2]*(0<a[4][2]?d:g)+a[4][3]||0<a[5][0]*(0<a[5][0]?b:e)+a[5][1]*(0<a[5][1]?c:f)+a[5][2]*
(0<a[5][2]?d:g)+a[5][3]?!1:!0};b.prototype._numSubdivisionsAtLevel=[2,2,2,2,2,2,2,2];b.prototype.createGeometry=function(a,b,c){a.needsUpdate=!1;return l.createPlanarGlobeTile(a.numVertsPerRow,this.extent,a.samplerData,b,c,a.clippingArea)};b.Pool=new m(b);return b});