// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.5/esri/copyright.txt for details.
//>>built
define("require exports ../../core/tsSupport/declareExtendsHelper ../../core/tsSupport/decorateHelper ../../core/accessorSupport/decorators ../../core/JSONSupport ../../core/kebabDictionary".split(" "),function(k,l,f,c,b,g,h){var d=h({codedValue:"coded-value"});return function(e){function a(a){a=e.call(this,a)||this;a.name=null;a.type=null;return a}f(a,e);a.prototype.writeType=function(a,b){b.type=d.toJSON(a)};c([b.property({json:{write:!0}})],a.prototype,"name",void 0);c([b.property({json:{read:d.fromJSON,
write:!0}})],a.prototype,"type",void 0);c([b.writer("type")],a.prototype,"writeType",null);return a=c([b.subclass("esri.layers.support.Domain")],a)}(b.declared(g))});