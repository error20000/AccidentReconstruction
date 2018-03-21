// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.5/esri/copyright.txt for details.
//>>built
define(["../Point","../Polyline","../Polygon","../Multipoint","../Extent"],function(b,c,d,e,f){function g(a){if(!a)return null;if(a){if(void 0!==a.x&&void 0!==a.y)return b.fromJSON(a);if(void 0!==a.paths)return c.fromJSON(a);if(void 0!==a.rings)return d.fromJSON(a);if(void 0!==a.points)return e.fromJSON(a);if(void 0!==a.xmin&&void 0!==a.ymin&&void 0!==a.xmax&&void 0!==a.ymax)return f.fromJSON(a)}return null}var h={esriGeometryPoint:b,esriGeometryPolyline:c,esriGeometryPolygon:d,esriGeometryEnvelope:f,
esriGeometryMultipoint:e};return{fromJSON:g,fromJson:function(a){try{throw Error("fromJson is deprecated, use fromJSON instead");}catch(k){console.warn(k.stack)}return g(a)},getJsonType:function(a){return a instanceof b?"esriGeometryPoint":a instanceof c?"esriGeometryPolyline":a instanceof d?"esriGeometryPolygon":a instanceof f?"esriGeometryEnvelope":a instanceof e?"esriGeometryMultipoint":null},getGeometryType:function(a){return a&&h[a]||null}}});