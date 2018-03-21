// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.5/esri/copyright.txt for details.
//>>built
define(["require","exports","./Util"],function(w,d,f){function q(a){return Math.abs(a*a*a)}function k(a,b,c,e){void 0===e&&(e=v);var g=c.parameters;c=c.paddingPixelsOverride;e.scale=Math.min(g.divisor/(b-g.offset),1);e.factor=q(a);e.minPixelSize=g.minPixelSize;e.paddingPixels=c;return e}function n(a,b){return Math.max(f.lerp(a*b.scale,a,b.factor),b.minPixelSize*(1+2*b.paddingPixels/a))}function r(a,b,c){a=k(a,b,c);a.minPixelSize=0;a.paddingPixels=0;return n(1,a)}Object.defineProperty(d,"__esModule",
{value:!0});d.getSettings=function(a){return new t(a,d.defaultDescription)};d.getLabelSettings=function(a){var b=d.defaultDescription.curvatureDependent;return new t(a,{curvatureDependent:{min:{curvature:b.min.curvature,tiltAngle:b.min.tiltAngle,scaleFallOffFactor:p.curvatureDependent.min.scaleFallOffFactor},max:{curvature:b.max.curvature,tiltAngle:b.max.tiltAngle,scaleFallOffFactor:p.curvatureDependent.max.scaleFallOffFactor}},scaleStart:d.defaultDescription.scaleStart,scaleFallOffRange:d.defaultDescription.scaleFallOffRange,
minPixelSize:p.minPixelSize})};d.perspectiveFactor=q;d.scaleFactor=k;d.applyScaleFactor=n;d.applyScaleFactorVec2=function(a,b,c){void 0===c&&(c=[0,0]);var e=Math.min(Math.max(b.scale,b.minPixelSize*(1+2*b.paddingPixels/a[1])/a[1]),1);c[0]=f.lerp(a[0]*e,a[0],b.factor);c[1]=f.lerp(a[1]*e,a[1],b.factor);return c};d.precomputeScale=r;d.precomputeScaleFactor=function(a,b,c,e){e.scale=r(a,b,c);e.factor=0;e.minPixelSize=c.parameters.minPixelSize;e.paddingPixels=c.paddingPixelsOverride;return e};d.applyPrecomputedScaleFactorVec2=
function(a,b,c){void 0===c&&(c=[0,0]);b=Math.min(Math.max(b.scale,b.minPixelSize*(1+2*b.paddingPixels/a[1])/a[1]),1);c[0]=a[0]*b;c[1]=a[1]*b;return c};d.scale=function(a,b,c,e){return n(a,k(b,c,e))};var t=function(){function a(b,a,e,g){void 0===e&&(e={camera:{distance:0,fovY:0},divisor:0,offset:0,minPixelSize:0,paddingPixels:0});this.viewingMode=b;this.description=a;this.parameters=e;this._paddingPixelsOverride=g;"local"===this.viewingMode?(this.coverageCompensation=this.surfaceCoverageCompensationLocal,
this.calculateCurvatureDependentParameters=this.calculateCurvatureDependentParametersLocal):(this.coverageCompensation=this.surfaceCoverageCompensationGlobal,this.calculateCurvatureDependentParameters=this.calculateCurvatureDependentParametersGlobal)}Object.defineProperty(a.prototype,"paddingPixelsOverride",{get:function(){return this._paddingPixelsOverride||this.parameters.paddingPixels},enumerable:!0,configurable:!0});a.prototype.update=function(b){if(this.parameters&&this.parameters.camera.fovY===
b.fovY&&this.parameters.camera.distance===b.distance)return!1;this.calculateParameters(b,this.parameters);return!0};a.prototype.overridePadding=function(b){return b!==this.paddingPixelsOverride?new a(this.viewingMode,this.description,this.parameters,b):this};a.prototype.calculateParameters=function(b,a){var c=this.description,g=c.scaleStart,d=c.scaleFallOffRange,c=c.minPixelSize,f=b.fovY,h=b.distance,l=this.calculateCurvatureDependentParameters(b),k=this.coverageCompensation(b,l),m=l.tiltAngle,l=
l.scaleFallOffFactor,h=Math.sin(m)*h,m=.5*Math.PI-m-f*(.5-g*k),g=h/Math.cos(m),d=(g-h/Math.cos(m+f*d*k)*l)/(1-l);a.camera.fovY=b.fovY;a.camera.distance=b.distance;a.offset=d;a.divisor=g-d;a.minPixelSize=c;return a};a.prototype.calculateCurvatureDependentParametersLocal=function(b,a){void 0===a&&(a=u);a.tiltAngle=this.description.curvatureDependent.min.tiltAngle;a.scaleFallOffFactor=this.description.curvatureDependent.min.scaleFallOffFactor;return a};a.prototype.calculateCurvatureDependentParametersGlobal=
function(b,a){void 0===a&&(a=u);var c=this.description.curvatureDependent;b=1+b.distance/h;var d=[c.min.curvature,c.max.curvature],k=d[0];b=f.clamp((Math.sqrt(b*b-1)-k)/(d[1]-k),0,1);d=[c.min,c.max];c=d[0];d=d[1];a.tiltAngle=f.lerp(c.tiltAngle,d.tiltAngle,b);a.scaleFallOffFactor=f.lerp(c.scaleFallOffFactor,d.scaleFallOffFactor,b);return a};a.prototype.surfaceCoverageCompensationLocal=function(b,a){return(b.fovY-a.tiltAngle)/b.fovY};a.prototype.surfaceCoverageCompensationGlobal=function(a,c){var b=
h*h;c=c.tiltAngle+.5*Math.PI;var d=a.fovY;a=a.distance;a=a*a+b-2*Math.cos(c)*a*h;var f=Math.sqrt(a);return(Math.acos(Math.sqrt(a-b)/f)-Math.asin(h/(f/Math.sin(c)))+.5*d)/d};return a}();d.defaultDescription={curvatureDependent:{min:{curvature:f.deg2rad(10),tiltAngle:f.deg2rad(12),scaleFallOffFactor:.5},max:{curvature:f.deg2rad(70),tiltAngle:f.deg2rad(40),scaleFallOffFactor:.8}},scaleStart:.3,scaleFallOffRange:.65,minPixelSize:0};var p={curvatureDependent:{min:{scaleFallOffFactor:.7},max:{scaleFallOffFactor:.95}},
minPixelSize:14};d.copyParameters=function(a,b){b.camera.distance=a.camera.distance;b.camera.fovY=a.camera.fovY;b.divisor=a.divisor;b.offset=a.offset;b.minPixelSize=a.minPixelSize;return b};var v={scale:0,factor:0,minPixelSize:0,paddingPixels:0},u={tiltAngle:0,scaleFallOffFactor:0},h=6378137});