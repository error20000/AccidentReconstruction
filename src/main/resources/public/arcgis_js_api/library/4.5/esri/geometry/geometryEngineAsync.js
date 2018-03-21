// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.5/esri/copyright.txt for details.
//>>built
define("require exports ../kernel module ./Geometry ./Polygon ./Polyline ./Point ./Extent ./Multipoint ../workers/WorkerClient dojo/Deferred".split(" "),function(C,Q,K,L,w,D,E,B,F,G,M,k){function N(b){if(void 0===B.fromJson){if(void 0!==b.x&&void 0!==b.y)return new B(b);if(void 0!==b.paths)return new E(b);if(void 0!==b.rings)return new D(b);if(void 0!==b.points)return new G(b);if(void 0!==b.xmin&&void 0!==b.ymin&&void 0!==b.xmax&&void 0!==b.ymax)return new F(b)}else{if(void 0!==b.x&&void 0!==b.y)return B.fromJson(b);
if(void 0!==b.paths)return E.fromJson(b);if(void 0!==b.rings)return D.fromJson(b);if(void 0!==b.points)return G.fromJson(b);if(void 0!==b.xmin&&void 0!==b.ymin&&void 0!==b.xmax&&void 0!==b.ymax)return F.fromJson(b)}}function u(b,a){var c;if(null==b||void 0===b||"number"===typeof b)return b;var d=b.toString();if(""===d)return null;if(2==a){if(c=O[d],void 0!==c)return c}else if(0==a){c=H[d];if(void 0!==c)return c;c=I[b];if(void 0!==c)return c}else if(3==a&&(c=H[d],void 0!==c))return c;if(1==a&&(c=I[b],
void 0!==c))return c;if(!0===/^\d+$/.test(d))return parseInt(d);throw Error("Unrecognised Unit Type");}function z(b){if(void 0!==b&&null!==b)switch(b){case "loxodrome":return 1;case "great-elliptic":return 2;case "normal-section":return 3;case "shape-preserving":return 4}return 0}function f(b){if(null===b||void 0===b)return null;if(x)switch(b.type){case "point":return{x:b.x,y:b.y,z:b.z,m:b.m};case "multipoint":return{points:b.points,hasZ:b.hasZ,hasM:b.hasM};case "polyline":return{paths:b.paths,hasZ:b.hasZ,
hasM:b.hasM};case "polygon":return{rings:b.rings,hasZ:b.hasZ,hasM:b.hasM};case "extent":return{xmin:b.xmin,ymin:b.ymin,xmax:b.xmax,ymax:b.ymax,zmin:b.zmin,zmax:b.zmax,mmin:b.mmin,mmax:b.mmax}}else switch(b.type){case "point":return{x:b.x,y:b.y};case "multipoint":return{points:b.points};case "polyline":return{paths:b.paths};case "polygon":return{rings:b.rings};case "extent":return{xmin:b.xmin,ymin:b.ymin,xmax:b.xmax,ymax:b.ymax}}return null}function m(b,a){if(null===b)return null;b=N(b);x?b.set("spatialReference",
a):b.setSpatialReference(a);return b}function l(b){return null==b||void 0===b?null:-1!=b.wkid&&null!==b.wkid&&void 0!==b.wkid?{wkid:b.wkid}:""!==b.wkt&&void 0!==b.wkt&&null!==b.wkt?{wkt:b.wkt}:null}function A(b,a,c){var d=new k,e=a.spatialReference;h.a({action:b,geoma:f(a),geomb:f(c),spatialReference:l(a.spatialReference)}).then(function(a){0===a.status?d.reject(Error(a.error.message)):d.resolve(m(a.result,e))},function(a){d.reject(a)});return d.promise}function v(b,a,c){var d=new k;h.a({action:b,
geoma:f(a),geomb:f(c),spatialReference:l(a.spatialReference)}).then(function(a){0===a.status?d.reject(Error(a.error.message)):d.resolve(a.result)},function(a){d.reject(a)});return d.promise}var x=0==K.version.indexOf("4."),J;(function(b){b[b.Linear=0]="Linear";b[b.Angular=1]="Angular";b[b.Area=2]="Area";b[b.LinearOrAngular=3]="LinearOrAngular"})(J||(J={}));var H={feet:9002,kilometers:9036,meters:9001,miles:9035,"nautical-miles":9030,yards:9096},O={acres:109402,ares:109463,hectares:109401,"square-feet":109405,
"square-kilometers":109414,"square-meters":109404,"square-miles":109413,"square-yards":109442},I={degrees:9102,radians:9101},P=function(){function b(){this.c=!0;this.i=null}b.prototype.A=function(a){var b=this;this.i=new M;this.i.setWorker(this.l(),function(){b.c=!1;a()})};b.prototype.l=function(){return C.B?C.B("./geometryenginewebworker"):L.id.replace(/\/[^\/]*$/ig,"/")+"./geometryenginewebworker"};return b}(),h=function(){function b(){}b.a=function(a){var c=new k;b.h.push({task:a,d:c});b.f();return c.promise};
b.f=function(){if(0<b.h.length){for(var a=null,c=0;c<b.b.length;c++)if(!1===b.b[c].c){a=b.b[c];break}null===a&&b.b.length<b.g&&(c=new P,b.b.push(c),c.A(function(){b.f()}));if(null!==a){var d=this.h.shift();a.c=!0;a.i.postMessage(d.task).then(function(c){a.c=!1;try{d.d.resolve(c)}catch(g){}b.f()},function(c){a.c=!1;try{d.d.reject(c)}catch(g){}b.f()})}}};b.b=[];b.h=[];b.g=4;return b}();return function(){function b(){}b._removeAllWorkers=function(){h.b=[]};b._setMaxWorkers=function(a){b._removeAllWorkers();
h.g=a};b._getMaxWorkers=function(){return h.g};b._getNumWorkers=function(){return h.b.length};b.extendedSpatialReferenceInfo=function(a){var b=new k;h.a({action:"extendedspatialreferenceinfo",spatialReference:l(a)}).then(function(a){0===a.status?b.reject(Error(a.error.message)):b.resolve(a.result)},function(a){b.reject(a)});return b.promise};b.equals=function(a,b){return null===a&&null!==b||null===b&&null!==a?!1:v("equals",a,b)};b.intersects=function(a,b){if(null===a||null===b)throw Error("Illegal Argument Exception");
return v("intersects",a,b)};b.touches=function(a,b){if(null===a||null===b)throw Error("Illegal Argument Exception");return v("touches",a,b)};b.within=function(a,b){if(null===a||null===b)throw Error("Illegal Argument Exception");return v("within",a,b)};b.disjoint=function(a,b){if(null===a||null===b)throw Error("Illegal Argument Exception");return v("disjoint",a,b)};b.overlaps=function(a,b){if(null===a||null===b)throw Error("Illegal Argument Exception");return v("overlaps",a,b)};b.crosses=function(a,
b){if(null===a||null===b)throw Error("Illegal Argument Exception");return v("crosses",a,b)};b.contains=function(a,b){if(null===a||null===b)throw Error("Illegal Argument Exception");return v("contains",a,b)};b.isSimple=function(a){return v("issimple",a,null)};b.clip=function(a,b){return A("clip",a,b)};b.simplify=function(a){var b=new k,d=a.spatialReference;h.a({action:"simplify",geoma:f(a),spatialReference:l(a.spatialReference)}).then(function(a){0===a.status?b.reject(Error(a.error.message)):b.resolve(m(a.result,
d))},function(a){b.reject(a)});return b.promise};b.rotate=function(a,b,d){var c=new k,g=a.spatialReference;if(void 0===d||null===d)switch(a.type){case "point":d=a;break;case "extent":d=x?a.get("center"):a.getCenter();break;default:d=x?a.get("extent").get("center"):a.getExtent().getCenter()}h.a({action:"rotate",geoma:f(a),spatialReference:l(a.spatialReference),angle:b,rotpt:f(d)}).then(function(a){0===a.status?c.reject(Error(a.error.message)):c.resolve(m(a.result,g))},function(a){c.reject(a)});return c.promise};
b.flipHorizontal=function(a,b){var c=new k,e=a.spatialReference;if(void 0===b||null===b)switch(a.type){case "point":b=a;break;case "extent":b=x?a.get("center"):a.getCenter();break;default:b=x?a.get("extent").get("center"):a.getExtent().getCenter()}h.a({action:"fliph",geoma:f(a),spatialReference:l(a.spatialReference),flippt:f(b)}).then(function(a){0===a.status?c.reject(Error(a.error.message)):c.resolve(m(a.result,e))},function(a){c.reject(a)});return c.promise};b.flipVertical=function(a,b){var c=new k,
e=a.spatialReference;if(void 0===b||null===b)switch(a.type){case "point":b=a;break;case "extent":b=x?a.get("center"):a.getCenter();break;default:b=x?a.get("extent").get("center"):a.getExtent().getCenter()}h.a({action:"flipv",geoma:f(a),spatialReference:l(a.spatialReference),flippt:f(b)}).then(function(a){0===a.status?c.reject(Error(a.error.message)):c.resolve(m(a.result,e))},function(a){c.reject(a)});return c.promise};b.distance=function(a,b,d){var c=new k;h.a({action:"distance",geoma:f(a),geomb:f(b),
spatialReference:l(a.spatialReference),distanceunits:u(d,3)}).then(function(a){0===a.status?c.reject(Error(a.error.message)):c.resolve(a.result)},function(a){c.reject(a)});return c.promise};b.relate=function(a,b,d){var c=new k;h.a({action:"relate",geoma:f(a),geomb:f(b),relation:d,spatialReference:l(a.spatialReference)}).then(function(a){0===a.status?c.reject(Error(a.error.message)):c.resolve(a.result)},function(a){c.reject(a)});return c.promise};b.nearestCoordinate=function(a,b,d){var c=new k,g=a.spatialReference;
h.a({action:"nearestcoord",geoma:f(a),geomb:f(b),spatialReference:l(a.spatialReference),testinterior:void 0===d?!0:d}).then(function(a){0===a.status?c.reject(Error(a.error.message)):(a.result.coordinate=m(a.result.coordinate,g),c.resolve(a.result))},function(a){c.reject(a)});return c.promise};b.nearestVertex=function(a,b){var c=new k,e=a.spatialReference;h.a({action:"nearestvertex",geoma:f(a),geomb:f(b),spatialReference:l(a.spatialReference)}).then(function(a){0===a.status?c.reject(Error(a.error.message)):
(a.result.coordinate=m(a.result.coordinate,e),c.resolve(a.result))},function(a){c.reject(a)});return c.promise};b.nearestVertices=function(a,b,d,e){var c=new k,n=a.spatialReference;h.a({action:"nearestvertices",geoma:f(a),geomb:f(b),spatialReference:l(a.spatialReference),searchradius:d,maxreturn:e}).then(function(a){if(0===a.status)c.reject(Error(a.error.message));else{for(var b=0;b<a.result.length;b++)a.result[b].coordinate=m(a.result[b].coordinate,n);c.resolve(a.result)}},function(a){c.reject(a)});
return c.promise};b.cut=function(a,b){var c=new k,e=a.spatialReference;h.a({action:"cut",geoma:f(a),geomb:f(b),spatialReference:l(a.spatialReference)}).then(function(a){if(0===a.status)c.reject(Error(a.error.message));else{for(var b=0;b<a.result.length;b++)a.result[b]=m(a.result[b],e);c.resolve(a.result)}},function(a){c.reject(a)});return c.promise};b.generalize=function(a,b,d,e){var c=new k,n=a.spatialReference;h.a({action:"generalize",geoma:f(a),maxdeviation:b,removedegenerateparts:d,maxdeviationunit:u(e,
3),spatialReference:l(a.spatialReference)}).then(function(a){0===a.status?c.reject(Error(a.error.message)):c.resolve(m(a.result,n))},function(a){c.reject(a)});return c.promise};b.densify=function(a,b,d){var c=new k,g=a.spatialReference;h.a({action:"densify",geoma:f(a),maxsegmentlength:b,maxsegmentlengthunit:u(d,3),spatialReference:l(a.spatialReference)}).then(function(a){0===a.status?c.reject(Error(a.error.message)):c.resolve(m(a.result,g))},function(a){c.reject(a)});return c.promise};b.geodesicDensify=
function(a,b,d,e){void 0===e&&(e=0);var c=new k,n=a.spatialReference;h.a({action:"geodensify",geoma:f(a),maxsegmentlength:b,maxsegmentlengthunit:u(d,3),spatialReference:l(a.spatialReference),curveType:e}).then(function(a){0===a.status?c.reject(Error(a.error.message)):c.resolve(m(a.result,n))},function(a){c.reject(a)});return c.promise};b.intersect=function(a,c){return a instanceof w?A("intersect",a,c):b.u(a,c)};b.u=function(a,b){for(var c=new k,e=[],g=0;g<a.length;g++)e.push(f(a[g]));var n=b.spatialReference;
h.a({action:"intersectmany",geom:f(b),geometries:e,spatialReference:l(b.spatialReference)}).then(function(a){if(0===a.status)c.reject(Error(a.error.message));else{for(var b=0;b<a.result.length;b++)a.result[b]=m(a.result[b],n);c.resolve(a.result)}},function(a){c.reject(a)});return c.promise};b.difference=function(a,c){return a instanceof w?A("difference",a,c):b.s(a,c)};b.s=function(a,b){for(var c=new k,e=[],g=0;g<a.length;g++)e.push(f(a[g]));var n=b.spatialReference;h.a({action:"differencemany",geom:f(b),
geometries:e,spatialReference:l(b.spatialReference)}).then(function(a){if(0===a.status)c.reject(Error(a.error.message));else{for(var b=0;b<a.result.length;b++)a.result[b]=m(a.result[b],n);c.resolve(a.result)}},function(a){c.reject(a)});return c.promise};b.symmetricDifference=function(a,c){return a instanceof w?A("symdifference",a,c):b.w(a,c)};b.w=function(a,b){for(var c=new k,e=[],g=0;g<a.length;g++)e.push(f(a[g]));var n=b.spatialReference;h.a({action:"symdifferencemany",geom:f(b),geometries:e,spatialReference:l(b.spatialReference)}).then(function(a){if(0===
a.status)c.reject(Error(a.error.message));else{for(var b=0;b<a.result.length;b++)a.result[b]=m(a.result[b],n);c.resolve(a.result)}},function(a){c.reject(a)});return c.promise};b.union=function(a,b){void 0===b&&(b=null);var c=new k,e=[];if(null===a)return c.resolve(null),c.promise;a instanceof w&&(a=[a],null!==b&&a.push(b));if(0===a.length)return c.resolve(null),c.promise;for(b=0;b<a.length;b++)e.push(f(a[b]));var g=a[0].spatialReference;h.a({action:"unionmany",geometries:e,spatialReference:l(g)}).then(function(a){0===
a.status?c.reject(Error(a.error.message)):c.resolve(m(a.result,g))},function(a){c.reject(a)});return c.promise};b.buffer=function(a,c,d,e){void 0===e&&(e=!1);if(a instanceof w){var g=new k,n=a.spatialReference;h.a({action:"buffer",geoma:f(a),spatialReference:l(a.spatialReference),distance:c,unit:u(d,3),geodesic:!1,geodesicmaxdeviation:NaN,geodesiccurvetype:0}).then(function(a){0===a.status?g.reject(Error(a.error.message)):g.resolve(m(a.result,n))},function(a){g.reject(a)});return g.promise}if("[object Array]"!==
Object.prototype.toString.call(c)){for(var p=[],q=0;q<a.length;q++)p.push(c);c=p}if(c.length!=a.length){if(0==c.length)throw Error("Illegal Argument Exception");for(var p=[],r=0,q=0;q<a.length;q++)void 0===c[q]?p.push(r):(p.push(c[q]),r=c[q]);c=p}return b.j(a,c,d,!1,e,"geodesic",NaN)};b.geodesicBuffer=function(a,c,d,e,g,n){if(a instanceof w){var p=new k;void 0===g&&(g=NaN);var q=a.spatialReference;h.a({action:"buffer",geoma:f(a),spatialReference:l(a.spatialReference),distance:c,unit:u(d,0),geodesic:!0,
geodesicmaxdeviation:g,geodesiccurvetype:z(e)}).then(function(a){0===a.status?p.reject(Error(a.error.message)):p.resolve(m(a.result,q))},function(a){p.reject(a)});return p.promise}if("[object Array]"!==Object.prototype.toString.call(c)){for(var r=[],t=0;t<a.length;t++)r.push(c);c=r}if(c.length!=a.length){if(0==c.length)throw Error("Illegal Argument Exception");for(var r=[],y=0,t=0;t<a.length;t++)void 0===c[t]?r.push(y):(r.push(c[t]),y=c[t]);c=r}return b.j(a,c,d,!0,e,g,n)};b.j=function(a,b,d,e,g,n,
p){var c=new k,r=[];void 0===p&&(p=NaN);if(null===a||0===a.length)return c.resolve(null),c.promise;for(var t=0;t<a.length;t++)r.push(f(a[t]));d=e?u(d,0):u(d,3);var y=a[0].spatialReference;h.a({action:"buffermany",geometries:r,spatialReference:l(y),distances:b,tounionresults:g,unit:d,geodesic:e,geodesicmaxdeviation:p,geodesiccurvetype:z(n)}).then(function(a){if(0===a.status)c.reject(Error(a.error.message));else{for(var b=0;b<a.result.length;b++)a.result[b]=m(a.result[b],y);c.resolve(a.result)}},function(a){c.reject(a)});
return c.promise};b.convexHull=function(a,c){void 0===c&&(c=!1);if(a instanceof w){var d=new k,e=a.spatialReference;h.a({action:"convexhull",geoma:f(a),spatialReference:l(a.spatialReference)}).then(function(a){0===a.status?d.reject(Error(a.error.message)):d.resolve(m(a.result,e))},function(a){d.reject(a)});return d.promise}return b.o(a,c)};b.o=function(a,b){for(var c=new k,e=[],g=0;g<a.length;g++)e.push(f(a[g]));var l=0<a.length?a[0].spatialReference:null;h.a({action:"convexhullmany",geometries:e,
merge:b}).then(function(a){if(0===a.status)c.reject(Error(a.error.message));else{for(var b=0;b<a.result.length;b++)a.result[b]=m(a.result[b],l);c.resolve(a.result)}},function(a){c.reject(a)});return c.promise};b.offset=function(a,c,d,e,g,n){var p=0;if(null!=e&&void 0!=e)switch(e){case "round":p=0;break;case "bevel":p=1;break;case "miter":p=2;break;case "square":p=3}if(a instanceof w){var q=new k,r=a.spatialReference;h.a({action:"offset",geoma:f(a),spatialReference:l(a.spatialReference),distance:c,
joins:p,bevelratio:g,flattenerror:n,offsetunit:u(d,3)}).then(function(a){0===a.status?q.reject(Error(a.error.message)):q.resolve(m(a.result,r))},function(a){q.reject(a)});return q.promise}return b.v(a,c,d,p,g,n)};b.v=function(a,b,d,e,g,n){for(var c=new k,q=[],r=0;r<a.length;r++)q.push(f(a[r]));var t=0<a.length?a[0].spatialReference:null;h.a({action:"offsetmany",geometries:q,spatialReference:l(t),distance:b,joins:e,bevelratio:g,offsetunit:u(d,3),flattenerror:n}).then(function(a){if(0===a.status)c.reject(Error(a.error.message));
else{for(var b=0;b<a.result.length;b++)a.result[b]=m(a.result[b],t);c.resolve(a.result)}},function(a){c.reject(a)});return c.promise};b.planarArea=function(a,b){var c=new k;h.a({action:"area",geoma:f(a),unit:u(b,2),spatialReference:l(a.spatialReference)}).then(function(a){0===a.status?c.reject(Error(a.error.message)):c.resolve(a.result)},function(a){c.reject(a)});return c.promise};b.planarLength=function(a,b){var c=new k;h.a({action:"length",geoma:f(a),unit:u(b,3),spatialReference:l(a.spatialReference)}).then(function(a){0===
a.status?c.reject(Error(a.error.message)):c.resolve(a.result)},function(a){c.reject(a)});return c.promise};b.geodesicArea=function(a,b,d){var c=new k;h.a({action:"geodesicarea",geoma:f(a),unit:u(b,2),geodesiccurvetype:z(d),spatialReference:l(a.spatialReference)}).then(function(a){0===a.status?c.reject(Error(a.error.message)):c.resolve(a.result)},function(a){c.reject(a)});return c.promise};b.geodesicLength=function(a,b,d){var c=new k;h.a({action:"geodesiclength",geoma:f(a),unit:u(b,0),geodesiccurvetype:z(d),
spatialReference:l(a.spatialReference)}).then(function(a){0===a.status?c.reject(Error(a.error.message)):c.resolve(a.result)},function(a){c.reject(a)});return c.promise};return b}()});