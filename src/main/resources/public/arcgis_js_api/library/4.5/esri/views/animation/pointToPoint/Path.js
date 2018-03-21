// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.5/esri/copyright.txt for details.
//>>built
define(["require","exports"],function(k,l){Object.defineProperty(l,"__esModule",{value:!0});k=function(){function c(){this.segments=[]}Object.defineProperty(c.prototype,"time",{get:function(){return this.segments.reduce(function(b,a){return b+a.time},0)},enumerable:!0,configurable:!0});c.prototype.interpolateComponentsAt=function(b,a){b=Math.min(Math.max(b,0),1);b*=this.time;for(var e=0,c=0,f=this.definition,h=0;h<this.segments.length;h++){var g=this.segments[h],d=g.definition;if(b<=g.time||h===this.segments.length-
1)return a=this.segmentInterpolateComponentsAt(g,b/g.time,a),a.pan=f.hasPan?(e+d.compared.pan*a.pan)/f.compared.pan:1,a.rotate=f.hasRotate?(c+d.compared.rotate*a.rotate)/f.compared.rotate:1,b=a.zoom*(d.compared.targetZoom-d.compared.sourceZoom)+d.compared.sourceZoom,e=this.segments[0].definition.compared.sourceZoom,c=this.segments[this.segments.length-1].definition.compared.targetZoom,a.zoom=f.hasZoom?(b-e)/(c-e):1,a;b-=g.time;e+=d.compared.pan;c+=d.compared.rotate}};c.prototype.segmentInterpolateComponentsAt=
function(b,a,c){return b.interpolateComponentsAt(a,c)};return c}();l.Path=k;l.default=k});