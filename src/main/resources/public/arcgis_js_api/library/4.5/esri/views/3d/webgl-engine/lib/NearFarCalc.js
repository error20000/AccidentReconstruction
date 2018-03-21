// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.5/esri/copyright.txt for details.
//>>built
define(["require","exports","./Util","./gl-matrix","./ComponentUtils"],function(r,y,t,l,u){r=l.vec3d;var g=l.vec4d,k=l.mat4d;l=function(){function e(){this._context={content:[],near:[],far:[],nearSpecial:[],farSpecial:[],bestNear:0,bestFar:0,bestNear2:0,bestFar2:0};this._boundingInfoHelper=new w}e.prototype._resetContext=function(){var b=this._context;b.content.length=0;b.near.length=0;b.far.length=0;b.nearSpecial.length=0;b.farSpecial.length=0;b.bestNear=Number.MAX_VALUE;b.bestFar=-Number.MAX_VALUE;
return this._context};e.prototype.calculateSceneNearFar=function(b,a){var c=this._resetContext(),d=b.viewMatrix,f=d[2],n=d[6],e=d[10],v=d[14],g=0,k;for(k in a)if(d=a[k],!u.isAllHidden(d.instanceParameters.componentVisibilities,d.componentOffsets)&&d.castShadow){var p=void 0,m=void 0;d.hasShaderTransformation?(p=d.getBoundingSphere(d.getShaderTransformation(),null,h),m=h):(p=d.bsRadius,m=d.center);var l=f*m[0]+n*m[1]+e*m[2]+v,m=l-p,p=l+p;c.content[g]=d;c.near[g]=-p;c.far[g]=-m;++g}if(0===g)return[c.bestNear,
c.bestFar];for(a=0;a<g;++a)c.near[a]>c.bestFar&&(c.bestFar=c.near[a]),2<c.near[a]&&c.far[a]<c.bestNear&&(c.bestNear=c.far[a]);c.bestNear2=Math.max(.5*c.bestNear,2);c.bestFar2=2*c.bestFar;for(a=n=f=0;a<g;++a)c.near[a]<c.bestNear&&(c.near[a]>=c.bestNear2?c.bestNear=c.near[a]:c.nearSpecial[f++]=a),c.far[a]>c.bestFar&&(c.far[a]<=c.bestFar2?c.bestFar=c.far[a]:c.farSpecial[n++]=a);if(0===f&&0===n)return[c.bestNear,c.bestFar];c.nearSpecial.length=f;c.farSpecial.length=n;c.nearSpecial.sort(function(a,b){return c.near[a]<
c.near[b]?-1:c.near[a]>c.near[b]?1:0});c.farSpecial.sort(function(a,b){return c.far[a]<c.far[b]?1:c.far[a]>c.far[b]?-1:0});this._boundingInfoHelper.init(b,c);for(a=0;a<f;++a)c.near[c.nearSpecial[a]]<c.bestNear&&(d=c.content[c.nearSpecial[a]],b=d.boundingInfo,this._boundingInfoHelper.includeNearBoundingInfoRec(b,d.getShaderTransformation()));for(a=0;a<n;++a)c.far[c.farSpecial[a]]>c.bestFar&&(d=c.content[c.farSpecial[a]],b=d.boundingInfo,this._boundingInfoHelper.includeFarBoundingInfoRec(b,d.getShaderTransformation()));
return[c.bestNear,c.bestFar]};return e}();var w=function(){function e(){this._clippingHelper=new x;this._planes=[g.create(),g.create(),g.create(),g.create(),g.create(),g.create()];this._viewProj=k.create();this._view=k.create()}e.prototype.init=function(b,a){this._context=a;k.set(b.viewMatrix,this._view);k.multiply(b.projectionMatrix,this._view,this._viewProj);b.copyFrustumPlanes(this._planes);this._clippingHelper.init(a)};e.prototype.includeNearBoundingInfoRec=function(b,a){var c=b.getBSRadius(),
d=b.getCenter();k.multiplyVec3(a,d,h);var d=h[0],f=h[1],e=h[2],c=c*Math.sqrt(Math.max(Math.max(a[0]*a[0]+a[4]*a[4]+a[8]*a[8],a[1]*a[1]+a[5]*a[5]+a[9]*a[9]),a[2]*a[2]+a[6]*a[6]+a[10]*a[10]));if(!(this._planes[0][0]*d+this._planes[0][1]*f+this._planes[0][2]*e+this._planes[0][3]>c||this._planes[1][0]*d+this._planes[1][1]*f+this._planes[1][2]*e+this._planes[1][3]>c||this._planes[2][0]*d+this._planes[2][1]*f+this._planes[2][2]*e+this._planes[2][3]>c||this._planes[3][0]*d+this._planes[3][1]*f+this._planes[3][2]*
e+this._planes[3][3]>c||(d=this._view[2]*d+this._view[6]*f+this._view[10]*e+this._view[14],f=d+c,2>-(d-c)||-f>=this._context.bestNear)))if(-f>this._context.bestNear2)this._context.bestNear=-f;else{if(100<c&&(c=b.getChildren(),void 0!==c)){for(b=0;8>b;++b)void 0!==c[b]&&this.includeNearBoundingInfoRec(c[b],a);return}this._clippingHelper.intersectFrustumAABB(this._viewProj,a,b.getBBMin(),b.getBBMax())}};e.prototype.includeFarBoundingInfoRec=function(b,a){var c=b.getBSRadius(),d=b.getCenter();k.multiplyVec3(a,
d,h);var d=h[0],f=h[1],e=h[2],c=c*Math.sqrt(Math.max(Math.max(a[0]*a[0]+a[4]*a[4]+a[8]*a[8],a[1]*a[1]+a[5]*a[5]+a[9]*a[9]),a[2]*a[2]+a[6]*a[6]+a[10]*a[10]));if(!(this._planes[0][0]*d+this._planes[0][1]*f+this._planes[0][2]*e+this._planes[0][3]>c||this._planes[1][0]*d+this._planes[1][1]*f+this._planes[1][2]*e+this._planes[1][3]>c||this._planes[2][0]*d+this._planes[2][1]*f+this._planes[2][2]*e+this._planes[2][3]>c||this._planes[3][0]*d+this._planes[3][1]*f+this._planes[3][2]*e+this._planes[3][3]>c||
(d=this._view[2]*d+this._view[6]*f+this._view[10]*e+this._view[14]-c,-d<=this._context.bestFar)))if(-d<this._context.bestFar2)this._context.bestFar=-d;else{if(100<c&&(c=b.getChildren(),void 0!==c)){for(b=0;8>b;++b)void 0!==c[b]&&this.includeFarBoundingInfoRec(c[b],a);return}this._clippingHelper.intersectFrustumAABB(this._viewProj,a,b.getBBMin(),b.getBBMax())}};return e}(),x=function(){function h(){this._clipP=Array(8);for(var b=0;8>b;++b)this._clipP[b]=g.create()}h.prototype.init=function(b){this._context=
b};h.prototype.intersectFrustumAABB=function(b,a,c,d){k.multiply(b,a,e);for(b=0;8>b;++b){a=this._clipP[b];var f=0===b||3===b||4===b||7===b?c[0]:d[0],g=0===b||1===b||4===b||5===b?c[1]:d[1],h=4>b?c[2]:d[2];a[0]=e[0]*f+e[4]*g+e[8]*h+e[12];a[1]=e[1]*f+e[5]*g+e[9]*h+e[13];a[2]=e[2]*f+e[6]*g+e[10]*h+e[14];a[3]=e[3]*f+e[7]*g+e[11]*h+e[15]}for(b=0;12>b;++b){c=this._clipTriangle(this._clipP[q[b][0]],this._clipP[q[b][1]],this._clipP[q[b][2]]);d=!0;for(a=0;a<c.length;++a)if(f=c[a][3],2<=f){d=!1;break}if(!d)for(a=
0;a<c.length;++a)f=c[a][3],f<this._context.bestNear&&(this._context.bestNear=f),f>this._context.bestFar&&(this._context.bestFar=f)}};h.prototype._inside=function(b,a){if(0===a)return b[0]>=-b[3];if(1===a)return b[1]>=-b[3];if(2===a)return b[0]<=b[3];if(3===a)return b[1]<=b[3];t.assert(!1)};h.prototype._intersect=function(b,a,c){var d=0;0===c?d=(-b[3]-b[0])/(a[0]-b[0]+a[3]-b[3]):1===c?d=(-b[3]-b[1])/(a[1]-b[1]+a[3]-b[3]):2===c?d=(b[3]-b[0])/(a[0]-b[0]-a[3]+b[3]):3===c&&(d=(b[3]-b[1])/(a[1]-b[1]-a[3]+
b[3]));return g.lerp(b,a,d,g.create())};h.prototype._clipTriangle=function(b,a,c){b=[b,a,c];for(a=0;4>a;++a){c=b;b=[];for(var d=0;d<c.length;++d){var e=c[d],g=c[(d+1)%c.length];this._inside(g,a)?(this._inside(e,a)||b.push(this._intersect(e,g,a)),b.push(g)):this._inside(e,a)&&b.push(this._intersect(e,g,a))}}return b};return h}(),q=[[0,1,3],[2,3,1],[1,5,2],[6,2,5],[5,4,6],[7,6,4],[4,0,7],[3,7,0],[3,2,7],[6,7,2],[4,5,0],[1,0,5]],h=r.create(),e=k.create();return l});