// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.5/esri/copyright.txt for details.
//>>built
define("require exports ../../core/tsSupport/declareExtendsHelper ../../core/tsSupport/decorateHelper ../../core/accessorSupport/decorators ../../core/Accessor ../../core/accessorSupport/write".split(" "),function(h,k,f,c,b,g,e){return function(d){function a(){var a=null!==d&&d.apply(this,arguments)||this;a.minScale=0;a.maxScale=0;return a}f(a,d);c([b.property({json:{write:{overridePolicy:function(a,b,c){if(e.willPropertyWrite(this,"maxScale",{},c))return{ignoreOrigin:!0}}}}})],a.prototype,"minScale",
void 0);c([b.property({json:{write:{overridePolicy:function(a,c,b){if(e.willPropertyWrite(this,"minScale",{},b))return{ignoreOrigin:!0}}}}})],a.prototype,"maxScale",void 0);return a=c([b.subclass("esri.layers.mixins.ScaleRangeLayer")],a)}(b.declared(g))});