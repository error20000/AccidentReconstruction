// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.5/esri/copyright.txt for details.
//>>built
define("require exports dojo/i18n!../../nls/smartMapping dojo/_base/lang ../../../core/lang ../../ClassBreaksRenderer ../statistics/summaryStatistics ../symbology/size ../../support/utils ../../../core/promiseUtils ../../../views/SceneView ./support/utils ../support/utils".split(" "),function(H,n,z,q,A,B,C,r,v,c,w,f,k){function D(a){if(!(a&&a.layer&&(a.field||a.valueExpression||a.sqlExpression)))return c.reject(f.createError("size-visual-variable:missing-parameters","'layer' and 'field', 'valueExpression' or 'sqlExpression' parameters are required"));
var b=q.mixin({},a);a=[0,1];var e=k.createLayerAdapter(b.layer,a);return(b.layer=e)?e.load().then(function(){var a=e.geometryType;if("mesh"===a)return c.reject(f.createError("size-visual-variable:invalid-parameters","Size visualization is not applicable to layers with 'mesh' geometry type"));if(b.worldScale){if("polyline"===a||"polygon"===a)return c.reject(f.createError("size-visual-variable:not-supported","'worldScale' sizing is not supported for polyline and polygon layers"));if(!(b.view instanceof
w))return c.reject(f.createError("size-visual-variable:invalid-parameters","'view' parameter should be an instance of SceneView when 'worldScale' parameter is true"))}a=k.getFieldsList({field:b.field,normalizationField:b.normalizationField,valueExpression:b.valueExpression});return(a=f.verifyBasicFieldValidity(e,a,"size-visual-variable:invalid-parameters"))?c.reject(a):b}):c.reject(f.createError("size-visual-variable:invalid-parameters","'layer' must be one of these types: "+k.getLayerTypeLabels(a).join(", ")))}
function E(a){if(!(a&&a.layer&&(a.field||a.valueExpression||a.sqlExpression)))return c.reject(f.createError("size-continuous-renderer:missing-parameters","'layer' and 'field', 'valueExpression' or 'sqlExpression' parameters are required"));var b=q.mixin({},a);b.symbolType=b.symbolType||"2d";a=[0,1];var e=k.createLayerAdapter(b.layer,a);return(b.layer=e)?e.load().then(function(){var a=e.geometryType,u=-1<b.symbolType.indexOf("3d");if("mesh"===a)return c.reject(f.createError("size-continuous-renderer:invalid-parameters",
"Size visualization is not applicable to layers with 'mesh' geometry type"));if(u&&("polyline"===a||"polygon"===a))return c.reject(f.createError("size-continuous-renderer:not-supported","3d symbols are not supported for polyline and polygon layers"));if(-1<b.symbolType.indexOf("3d-volumetric")&&!(b.view instanceof w))return c.reject(f.createError("size-continuous-renderer:invalid-parameters","'view' parameter should be an instance of SceneView when 'symbolType' parameter is '3d-volumetric' or 3d-volumetric-uniform"));
a=k.getFieldsList({field:b.field,normalizationField:b.normalizationField,valueExpression:b.valueExpression});return(a=f.verifyBasicFieldValidity(e,a,"size-continuous-renderer:invalid-parameters"))?c.reject(a):b}):c.reject(f.createError("size-continuous-renderer:invalid-parameters","'layer' must be one of these types: "+k.getLayerTypeLabels(a).join(", ")))}function F(a){a=q.mixin({},a);var b=-1<a.symbolType.indexOf("3d-volumetric");if(a.worldScale=b)a.axis="3d-volumetric-uniform"===a.symbolType?"all":
"height";delete a.symbolType;delete a.defaultSymbolEnabled;return a}function G(a,b,e,c){var u=c.field,d=c.layer.geometryType,l=null==c.defaultSymbolEnabled?!0:c.defaultSymbolEnabled,m=r.cloneScheme(a.sizeScheme),t="polygon"===d,g=t?m.marker:m,h=t?m.background:null,m="polyline"===d?g.noDataWidth:g.noDataSize,h=h?f.createSymbol(h,h.color,d,c.symbolType):null;return{renderer:new B({backgroundFillSymbol:h,classBreakInfos:[{minValue:-x,maxValue:x,symbol:f.createSymbol(g,g.color,t?"point":d,c.symbolType)}],
defaultLabel:l?z.other:null,defaultSymbol:l?f.createSymbol(g,g.noDataColor,t?"point":d,c.symbolType,null,m):null,field:u,normalizationField:e,normalizationType:b,valueExpression:c.valueExpression,visualVariables:a.visualVariables.map(function(a){return v.cloneSizeVariable(a)}),authoringInfo:A.clone(a.authoringInfo)}),visualVariables:a.visualVariables.map(function(a){return v.cloneSizeVariable(a)}),statistics:a.statistics,defaultValuesUsed:a.defaultValuesUsed,sizeScheme:r.cloneScheme(a.sizeScheme),
basemapId:a.basemapId}}function y(a){return D(a).then(function(a){var b=a.normalizationField,k=b?"field":void 0;return(a.statistics?c.resolve(a.statistics):C({layer:a.layer,field:a.field,valueExpression:a.valueExpression,sqlExpression:a.sqlExpression,sqlWhere:a.sqlWhere,normalizationType:k,normalizationField:b,minValue:a.minValue,maxValue:a.maxValue})).then(function(e){var d,l;d=a.layer;var m=a.field,k=(l=m&&"function"!==typeof m?d.getField(m):null)&&"date"===l.type,g=d.geometryType;d=a.sizeScheme;
l=a.basemap;d?d=r.cloneScheme(d):(d=(l=r.getSchemes({basemap:a.basemap,geometryType:g,worldScale:a.worldScale,view:a.view}))&&l.primaryScheme,l=l&&l.basemapId);if(d){var h,p;switch(g){case "point":case "multipoint":p=[d.minSize,d.maxSize];break;case "polyline":p=[d.minWidth,d.maxWidth];break;case "polygon":p=[d.marker.minSize,d.marker.maxSize]}h=p;p=(k=f.getDefaultDataRange(e,k,!1))||[e.min,e.max];var g=[],n=h[0];h=h[1];var q=void 0;"height"===a.axis&&(g.push({type:"size",axis:"width-and-depth",minSize:((h-
n)/2+n)/4.6}),q="height",h*=2);g.unshift({type:"size",field:m,valueExpression:a.valueExpression,valueUnit:"unknown",normalizationField:b,axis:q,minSize:n,maxSize:h,minDataValue:p[0],maxDataValue:p[1],legendOptions:a.legendOptions});e=c.resolve({basemapId:l,visualVariables:g,statistics:e,defaultValuesUsed:!!k,sizeScheme:r.cloneScheme(d),authoringInfo:{visualVariables:[{type:"size",minSliderValue:e.min,maxSliderValue:e.max}]}})}else e=c.reject(f.createError("size-visual-variable:insufficient-info",
"Unable to find size scheme"));return e})})}Object.defineProperty(n,"__esModule",{value:!0});var x=Math.pow(2,53)-1;n.createVisualVariables=y;n.createContinuousRenderer=function(a){return E(a).then(function(a){return y(F(a)).then(function(b){var c=a.normalizationField;return G(b,c?"field":void 0,c,a)})})}});