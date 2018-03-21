// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.5/esri/copyright.txt for details.
//>>built
define("require exports ../../geometry/Geometry ../../geometry/Polygon ../../geometry/Polyline ../../geometry/Point ../../geometry/Extent ../../geometry/Multipoint ../../geometry/support/jsonUtils ../languageUtils ../Dictionary ../Feature".split(" "),function(x,u,n,p,q,r,v,t,m,d,k,g){Object.defineProperty(u,"__esModule",{value:!0});u.registerFunctions=function(f,l){f.polygon=function(c,e){return l(c,e,function(b,h,a){d.pcCheck(a,1,1);b=null;if(a[0]instanceof k){if(b=d.fixSpatialReference(g.parseGeometryFromDictionary(a[0]),
c.spatialReference),!1===b instanceof p)throw Error("Illegal Parameter");}else b=a[0]instanceof p?m.fromJSON(a[0].toJSON()):d.fixSpatialReference(new p(JSON.parse(a[0])),c.spatialReference);if(null!==b&&!1===b.spatialReference.equals(c.spatialReference))throw Error("Cannot create Geometry in this SpatialReference. Engine is using a different spatial reference.");return d.fixNullGeometry(b)})};f.polyline=function(c,e){return l(c,e,function(b,h,a){d.pcCheck(a,1,1);b=null;if(a[0]instanceof k){if(b=d.fixSpatialReference(g.parseGeometryFromDictionary(a[0]),
c.spatialReference),!1===b instanceof q)throw Error("Illegal Parameter");}else b=a[0]instanceof q?m.fromJSON(a[0].toJSON()):d.fixSpatialReference(new q(JSON.parse(a[0])),c.spatialReference);if(null!==b&&!1===b.spatialReference.equals(c.spatialReference))throw Error("Cannot create Geometry in this SpatialReference. Engine is using a different spatial reference.");return d.fixNullGeometry(b)})};f.point=function(c,e){return l(c,e,function(b,h,a){d.pcCheck(a,1,1);b=null;if(a[0]instanceof k){if(b=d.fixSpatialReference(g.parseGeometryFromDictionary(a[0]),
c.spatialReference),!1===b instanceof r)throw Error("Illegal Parameter");}else b=a[0]instanceof r?m.fromJSON(a[0].toJSON()):d.fixSpatialReference(new r(JSON.parse(a[0])),c.spatialReference);if(null!==b&&!1===b.spatialReference.equals(c.spatialReference))throw Error("Cannot create Geometry in this SpatialReference. Engine is using a different spatial reference.");return d.fixNullGeometry(b)})};f.multipoint=function(c,e){return l(c,e,function(b,h,a){d.pcCheck(a,1,1);b=null;if(a[0]instanceof k){if(b=
d.fixSpatialReference(g.parseGeometryFromDictionary(a[0]),c.spatialReference),!1===b instanceof t)throw Error("Illegal Parameter");}else b=a[0]instanceof t?m.fromJSON(a[0].toJSON()):d.fixSpatialReference(new t(JSON.parse(a[0])),c.spatialReference);if(null!==b&&!1===b.spatialReference.equals(c.spatialReference))throw Error("Cannot create Geometry in this SpatialReference. Engine is using a different spatial reference.");return d.fixNullGeometry(b)})};f.extent=function(c,e){return l(c,e,function(b,
h,a){d.pcCheck(a,1,1);b=null;a[0]instanceof k?b=d.fixSpatialReference(g.parseGeometryFromDictionary(a[0]),c.spatialReference):a[0]instanceof r?(b={xmin:a[0].x,ymin:a[0].y,xmax:a[0].x,ymax:a[0].y,spatialReference:a[0].spatialReference.toJSON()},a[0].hasZ?(b.zmin=a[0].z,b.zmax=a[0].z):a[0].hasM&&(b.mmin=a[0].m,b.mmax=a[0].m),b=m.fromJSON(b)):b=a[0]instanceof p?m.fromJSON(a[0].extent.toJSON()):a[0]instanceof q?m.fromJSON(a[0].extent.toJSON()):a[0]instanceof t?m.fromJSON(a[0].extent.toJSON()):a[0]instanceof
v?m.fromJSON(a[0].toJSON()):d.fixSpatialReference(new v(JSON.parse(a[0])),c.spatialReference);if(null!==b&&!1===b.spatialReference.equals(c.spatialReference))throw Error("Cannot create Geometry in this SpatialReference. Engine is using a different spatial reference.");return d.fixNullGeometry(b)})};f.geometry=function(c,e){return l(c,e,function(b,h,a){d.pcCheck(a,1,1);b=null;b=a[0]instanceof g?d.fixSpatialReference(a[0].geometry,c.spatialReference):a[0]instanceof k?d.fixSpatialReference(g.parseGeometryFromDictionary(a[0]),
c.spatialReference):d.fixSpatialReference(m.fromJSON(JSON.parse(a[0])),c.spatialReference);if(null!==b&&!1===b.spatialReference.equals(c.spatialReference))throw Error("Cannot create Geometry in this SpatialReference. Engine is using a different spatial reference.");return d.fixNullGeometry(b)})};f.setgeometry=function(c,e){return l(c,e,function(b,c,a){d.pcCheck(a,2,2);if(a[0]instanceof g){if(!0===a[0].immutable)throw Error("Feature is Immutable");if(a[1]instanceof n||null===a[1])a[0].geometry=a[1];
else throw Error("Illegal Argument");}else throw Error("Illegal Argument");return d.voidOperation})};f.feature=function(c,e){return l(c,e,function(b,h,a){if(0===a.length)throw Error("Missing Parameters");b=null;if(1===a.length)if(d.isString(a[0]))b=g.fromJson(JSON.parse(a[0]));else if(a[0]instanceof g)b=new g(a[0]);else if(a[0]instanceof n)b=new g(null,a[0]);else if(a[0]instanceof k)b=a[0].hasField("geometry")?a[0].field("geometry"):null,h=a[0].hasField("attributes")?a[0].field("attributes"):null,
null!==b&&b instanceof k&&(b=g.parseGeometryFromDictionary(b)),null!==h&&(h=g.parseAttributesFromDictionary(h)),b=new g(h,b);else throw Error("Illegal Argument");else{if(2===a.length){h=b=null;if(null!==a[0])if(a[0]instanceof n)b=a[0];else if(b instanceof k)b=g.parseGeometryFromDictionary(a[0]);else throw Error("Illegal Argument");if(null!==a[1])if(a[1]instanceof k)h=g.parseAttributesFromDictionary(a[1]);else throw Error("Illegal Argument");}else{b=null;h={};if(null!==a[0])if(a[0]instanceof n)b=a[0];
else if(b instanceof k)b=g.parseGeometryFromDictionary(a[0]);else throw Error("Illegal Argument");for(var e=1;e<a.length;e+=2){var w=d.toString(a[e]),f=a[e+1];if(null===f||void 0===f||d.isString(f)||isNaN(f)||d.isDate(f)||d.isNumber(f)||d.isBoolean(f)){if(d.isFunctionParameter(f)||!1===d.isSimpleType(f))throw Error("Illegal Argument");h[w]=f===d.voidOperation?null:f}else throw Error("Illegal Argument");}}b=new g(h,b)}b.geometry=d.fixSpatialReference(b.geometry,c.spatialReference);b.immutable=!1;return b})};
f.dictionary=function(c,e){return l(c,e,function(b,c,a){if(0===a.length)throw Error("Missing Parameters");if(0!==a.length%2)throw Error("Missing Parameters");b={};for(c=0;c<a.length;c+=2){var h=d.toString(a[c]),e=a[c+1];if(null===e||void 0===e||d.isString(e)||isNaN(e)||d.isDate(e)||d.isNumber(e)||d.isBoolean(e)||d.isArray(e)||d.isImmutableArray(e)){if(d.isFunctionParameter(e))throw Error("Illegal Argument");b[h]=e===d.voidOperation?null:e}else throw Error("Illegal Argument");}a=new k(b);a.immutable=
!1;return a})};f.haskey=function(c,e){return l(c,e,function(b,c,a){d.pcCheck(a,2,2);b=d.toString(a[1]);if(a[0]instanceof g||a[0]instanceof k)return a[0].hasField(b);throw Error("Illegal Argument");})};f.indexof=function(c,e){return l(c,e,function(b,c,a){d.pcCheck(a,2,2);b=a[1];if(d.isArray(a[0])){for(c=0;c<a[0].length;c++)if(d.equalityTest(b,a[0][c]))return c;return-1}if(d.isImmutableArray(a[0])){var e=a[0].length();for(c=0;c<e;c++)if(d.equalityTest(b,a[0].get(c)))return c;return-1}throw Error("Illegal Argument");
})}}});