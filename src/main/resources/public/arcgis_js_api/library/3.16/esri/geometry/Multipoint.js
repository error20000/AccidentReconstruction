// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.16/esri/copyright.txt for details.
//>>built
define("esri/geometry/Multipoint","dojo/_base/declare dojo/_base/lang dojo/has ../kernel ../SpatialReference ./Geometry ./Point ./Extent ../srUtils".split(" "),function(b,c,q,f,t,r,g,m,s){var e={type:"multipoint",points:null};b=b(r,{declaredClass:"esri.geometry.Multipoint",constructor:function(a){c.mixin(this,e);this.points=[];a&&(a.points?c.mixin(this,a):this.spatialReference=a,this.spatialReference&&(this.spatialReference=s.createSpatialReference(this.spatialReference)));this.verifySR()},addPoint:function(a){this.clearCache();
c.isArray(a)?this.points.push(a):this.points.push([a.x,a.y]);return this},removePoint:function(a){if(this._validateInputs(a))return this.clearCache(),new g(this.points.splice(a,1)[0],this.spatialReference)},getExtent:function(){var a=this.getCacheValue("_extent");if(a)return new m(a);var a=this.points,n=a.length;if(n){var d=a[0],b,c,e=b=d[0],k=c=d[1],f=Math.min,g=Math.max,p=this.spatialReference,l,h;for(h=0;h<n;h++)d=a[h],l=d[0],d=d[1],e=f(e,l),k=f(k,d),b=g(b,l),c=g(c,d);a={xmin:e,ymin:k,xmax:b,ymax:c,
spatialReference:p?p.toJson():null};this.setCacheValue("_extent",a);return new m(a)}},_validateInputs:function(a){return null===a||0>a||a>=this.points.length?!1:!0},getPoint:function(a){if(this._validateInputs(a))return a=this.points[a],new g(a[0],a[1],this.spatialReference)},setPoint:function(a,b){if(this._validateInputs(a))return this.clearCache(),this.points[a]=[b.x,b.y],this},toJson:function(){var a={points:c.clone(this.points)},b=this.spatialReference;b&&(a.spatialReference=b.toJson());return a}});
b.defaultProps=e;q("extend-esri")&&(c.setObject("geometry.Multipoint",b,f),f.geometry.defaultMultipoint=e);return b});