// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.5/esri/copyright.txt for details.
//>>built
define(["../mixins/AnimationMixin","../../lib/glMatrix","../../support/mathUtils"],function(r,e,l){function t(a,b){var g=b[0]-a[0],c=b[1]-a[1],d=b[2]-a[2];a=b[3]-a[3];return g*g+c*c+d*d+a*a}function u(a,b){return Math.sqrt(t(a,b))}function v(a){this.interpolate=function(b,a,c){c=Math.min(5*c,.3);d.lerp(b.eye,a.eye,c);d.lerp(b.center,a.center,c);d.lerp(b.up,a.up,c);b.fov=l.lerp(b.fov,a.fov,c);b.padding=k.lerp(b.padding,a.padding,c,m)}}function w(a,b,g){b=b||250;g=g||b;var c=0,e=0,n=0,p=0,q=0,h=function(c,
d,f,x,e){return a.easeInOutInterpLinear(g,b,c,d,f,x,e)};this.interpolate=function(b,a,f){c=h(b.eye,a.eye,f,c,d);e=h(b.center,a.center,f,e,d);n=h(b.up,a.up,f,n,d);q=h(b.padding,a.padding,f,q,{dist:u,lerp:function(b,a,c){return k.lerp(b,a,c,m)},set:function(a){b.padding=a}});p=h(b.fov,a.fov,f,p,{dist:function(b,a){return Math.abs(a-b)},lerp:l.lerp,set:function(a){b.fov=a}})}}var d=e.vec3d,k=e.vec4d,m=k.create();return r.createSubclass({declaredClass:"esri.views.3d.navigation.planar.AnimationPlanar",
constructor:function(){this.interpolationTypes={linear:v,easeInOut:w}}})});