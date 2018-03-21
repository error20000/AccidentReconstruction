// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.5/esri/copyright.txt for details.
//>>built
define("require exports ../../core/tsSupport/extendsHelper ../../core/tsSupport/decorateHelper ../../core/ArrayPool ./Bucket ../2d/engine/webgl/Geometry ../../core/libs/earcut/earcut".split(" "),function(B,C,y,D,w,z,v,A){return function(x){function g(a,c,e,d,b,f){a=x.call(this,a,c)||this;a.polygonVertexBuffer=e;a.polygonIndexBuffer=d;a.polygonOutlineVertexBuffer=b;a.polygonOutlineIndexBuffer=f;return a}y(g,x);Object.defineProperty(g.prototype,"polygonIndexStart",{get:function(){return this._triangleElementsStart},
enumerable:!0,configurable:!0});Object.defineProperty(g.prototype,"polygonIndexCount",{get:function(){return this._triangleElementsNum},enumerable:!0,configurable:!0});Object.defineProperty(g.prototype,"polygonOutlineIndexStart",{get:function(){return this._outlineElementsStart},enumerable:!0,configurable:!0});Object.defineProperty(g.prototype,"polygonOutlineIndexCount",{get:function(){return this._outlineElementsNum},enumerable:!0,configurable:!0});g.prototype.assignBufferInfo=function(a){a._triangleElementsStart=
this._triangleElementsStart;a._triangleElementsNum=this._triangleElementsNum;a.layer.hasPaintProperty("fill-outline-color")?(a._outlineElementsStart=this._outlineElementsStart,a._outlineElementsNum=this._outlineElementsNum):(a._outlineElementsStart=0,a._outlineElementsNum=0)};g.prototype.processFeatures=function(a,c){this._triangleElementsStart=this.polygonIndexBuffer.index;this._triangleElementsNum=0;this._outlineElementsStart=this.polygonOutlineIndexBuffer.index;this._outlineElementsNum=0;a&&a.setExtent(this.layerExtent);
c=this.layer.getPaintValue("fill-pattern",this.zoom);c=this.layer.getPaintValue("fill-antialias",this.zoom)&&void 0===c;for(var e=0,d=this._features;e<d.length;e++){var b=d[e].getGeometry(a);this._processFeature(b,c)}};g.prototype._processFeature=function(a,c){if(a){var e=a.length;if(c)for(c=0;c<e;c++)this._processOutline(a[c]);var d;for(c=0;c<e;c++){var b=g._area(a[c]);128<b?(void 0!==d&&this._processFill(a,d),d=[c]):-128>b&&void 0!==d&&d.push(c)}void 0!==d&&this._processFill(a,d)}};g.prototype._processOutline=
function(a){var c=this.polygonOutlineVertexBuffer,e=this.polygonOutlineIndexBuffer,d=e.index,b,f,g,m=new v.Point(0,0),l=new v.Point(0,0),n=new v.Point(0,0),k=-1,h=-1,r=b=-1,u=-1,p=a.length;if(!(2>p)){var t=a[0];for(b=a[p-1];p&&b.isEqual(t);)--p,b=a[p-1];if(!(2>p-0)){for(t=0;t<p;++t){0===t?(b=a[p-1],f=a[0],g=a[1],m.assignSub(f,b),m.normalize(),m.rightPerpendicular()):(b=f,f=g,g=t!==p-1?a[t+1]:a[0],m.assign(l));l.assignSub(g,f);l.normalize();l.rightPerpendicular();b=m.x*l.y-m.y*l.x;n.assignAdd(m,l);
n.normalize();var q=-n.x*-m.x+-n.y*-m.y,q=Math.abs(0!==q?1/q:1);8<q&&(q=8);0<=b?(b=c.add(f.x,f.y,m.x,m.y,0,1),-1===r&&(r=b),0<=k&&0<=h&&0<=b&&e.add(k,h,b),h=c.add(f.x,f.y,q*-n.x,q*-n.y,0,-1),-1===u&&(u=h),0<=k&&0<=h&&0<=b&&e.add(k,h,b),k=h,h=b,b=c.add(f.x,f.y,n.x,n.y,0,1),0<=k&&0<=h&&0<=b&&e.add(k,h,b),h=c.add(f.x,f.y,l.x,l.y,0,1)):(b=c.add(f.x,f.y,q*n.x,q*n.y,0,1),-1===r&&(r=b),0<=k&&0<=h&&0<=b&&e.add(k,h,b),h=c.add(f.x,f.y,-m.x,-m.y,0,-1),-1===u&&(u=h),0<=k&&0<=h&&0<=b&&e.add(k,h,b),k=h,h=b,b=c.add(f.x,
f.y,-n.x,-n.y,0,-1),0<=k&&0<=h&&0<=b&&e.add(k,h,b),k=c.add(f.x,f.y,-l.x,-l.y,0,-1));0<=k&&0<=h&&0<=b&&e.add(k,h,b)}0<=k&&0<=h&&0<=r&&e.add(k,h,r);0<=k&&0<=r&&0<=u&&e.add(k,u,r);this._outlineElementsNum+=3*(e.index-d)}}};g.prototype._processFill=function(a,c){var e;1<c.length&&(e=[]);for(var d=0,b=0;b<c.length;b++){var f=c[b];0!==d&&e.push(d);d+=a[f].length}for(var b=2*d,d=w.acquire(),g=0;g<c.length;g++)for(var f=c[g],f=a[f],m=f.length,l=0;l<m;++l)d.push(f[l].x),d.push(f[l].y);a=A(d,e,2);c=a.length;
if(0<c){e=this.polygonVertexBuffer.index;for(g=0;g<b;)this.polygonVertexBuffer.add(d[g++],d[g++]);for(b=0;b<c;)this.polygonIndexBuffer.add(e+a[b++],e+a[b++],e+a[b++]);this._triangleElementsNum+=c}w.release(d)};g._area=function(a){for(var c=0,e=a.length-1,d=0;d<e;d++)c+=(a[d].x-a[d+1].x)*(a[d].y+a[d+1].y);c+=(a[e].x-a[0].x)*(a[e].y+a[0].y);return.5*c};return g}(z)});