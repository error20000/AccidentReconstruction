// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.5/esri/copyright.txt for details.
//>>built
define("require exports ../core/tsSupport/declareExtendsHelper ../core/tsSupport/decorateHelper ../core/accessorSupport/decorators dojo/_base/lang ../core/requireUtils ../core/urlUtils ./FeatureLayer".split(" "),function(g,n,h,d,c,k,l,e,m){return function(f){function a(b,a){b=f.call(this)||this;b.fields=[];b.delimiter=null;b.locationType="coordinates";b.latitudeField=null;b.longitudeField=null;b.outFields=["*"];b.operationalLayerType="CSV";b.type="csv";return b}h(a,f);a.prototype.normalizeCtorArgs=
function(b,a){return"string"===typeof b?k.mixin({},{url:b},a):b};Object.defineProperty(a.prototype,"hasService",{get:function(){return!1},enumerable:!0,configurable:!0});a.prototype.readWebMapLabelsVisible=function(b,a){return null!=a.showLabels?a.showLabels:!!(a.layerDefinition&&a.layerDefinition.drawingInfo&&a.layerDefinition.drawingInfo.labelingInfo)};a.prototype.readUrl=function(b,a,c){return e.read(b,c)};a.prototype.writeUrl=function(b,a,c,d){b=e.write(b,d);a.url=b?e.normalize(b):b};a.prototype.createGraphicsSource=
function(){var a=this;return l.when(g,"./graphics/sources/CSVSource").then(function(b){return new b({url:a.url,delimiter:a.delimiter,latitudeField:a.latitudeField,longitudeField:a.longitudeField,fields:a.fields,outFields:a.outFields})}).then(function(b){a.fields=b.fields.map(function(a){return a});a.delimiter=b.delimiter;a.latitudeField=b.latitudeField;a.longitudeField=b.longitudeField;return b})};a.prototype._verifyFields=function(){};d([c.property({json:{read:{source:"layerDefinition.fields"}}})],
a.prototype,"fields",void 0);d([c.property({json:{write:{target:"columnDelimiter"},read:{source:"columnDelimiter"}}})],a.prototype,"delimiter",void 0);d([c.property({readOnly:!0})],a.prototype,"hasService",null);d([c.property({json:{write:{target:"locationInfo.locationType"},read:{source:"locationInfo.locationType"}}})],a.prototype,"locationType",void 0);d([c.property({json:{write:{target:"locationInfo.latitudeFieldName"},read:{source:"locationInfo.latitudeFieldName"}}})],a.prototype,"latitudeField",
void 0);d([c.property({json:{write:{target:"locationInfo.longitudeFieldName"},read:{source:"locationInfo.longitudeFieldName"}}})],a.prototype,"longitudeField",void 0);d([c.property()],a.prototype,"outFields",void 0);d([c.property()],a.prototype,"operationalLayerType",void 0);d([c.reader("web-map","labelsVisible",["layerDefinition.drawingInfo.labelingInfo","showLabels"])],a.prototype,"readWebMapLabelsVisible",null);d([c.property({json:{read:!1},value:"csv",readOnly:!0})],a.prototype,"type",void 0);
d([c.property({json:{write:!0}})],a.prototype,"url",void 0);d([c.reader("url")],a.prototype,"readUrl",null);d([c.writer("url")],a.prototype,"writeUrl",null);return a=d([c.subclass("esri.layers.CSVLayer")],a)}(c.declared(m))});