// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.5/esri/copyright.txt for details.
//>>built
define("require dojo/_base/lang dojo/Deferred ../request ../renderers/support/jsonUtils ./QueryTask ./Task ./support/StatisticDefinition ./support/Query".split(" "),function(h,f,k,l,m,n,p,g,q){return p.createSubclass({declaredClass:"esri.tasks.GenerateRendererTask",constructor:function(){this._handler=f.hitch(this,this._handler);this._handleExecuteResponse=this._handleExecuteResponse.bind(this)},normalizeCtorArgs:function(a,d){if(f.isObject(a)&&("esri.layers.FeatureLayer"===a.declaredClass||"esri.layers.CSVLayer"===
a.declaredClass)){var b=a,e=f.mixin({featureLayer:b},d);"string"===typeof b.url&&"esri.layers.CSVLayer"!==b.declaredClass&&(e.url=b.url);return e}return this.inherited(arguments)},properties:{checkValueRange:{value:null},gdbVersion:{value:null,type:String},source:{value:null},parsedUrl:{get:function(){var a=this._parseUrl(this.url);a.path+="/generateRenderer";return a}}},execute:function(a,d){var b;if(this._features=a.features||this._getCollectionFeatures()){b=new k;var e=this._features;h(["./support/generateRenderer"],
function(c){var d;"esri.tasks.support.ClassBreaksDefinition"===a.classificationDefinition.declaredClass?d=c.createClassBreaksRenderer({features:e,definition:a.classificationDefinition}):"esri.tasks.support.UniqueValueDefinition"===a.classificationDefinition.declaredClass&&(d=c.createUniqueValueRenderer({features:e,definition:a.classificationDefinition}));d?b.resolve(this._handleExecuteResponse(d)):b.reject()});return b.promise}var c=f.mixin(a.toJSON(),{f:"json"});this._field="esri.tasks.support.ClassBreaksDefinition"===
a.classificationDefinition.declaredClass?a.classificationDefinition.classificationField:a.classificationDefinition.attributeField;this.source&&(c.layer=JSON.stringify({source:this.source}));this.gdbVersion&&(c.gdbVersion=this.gdbVersion);c.classificationDef&&(c.classificationDef=JSON.stringify(c.classificationDef));c={query:c,callbackParamName:"callback"};if(this.requestOptions||d)c=f.mixin({},this.requestOptions,d,c);return l(this.parsedUrl.path,c).then(this._handleExecuteResponse)},_handleExecuteResponse:function(a){a=
a.data;var d;d="esri.renderers.ClassBreaksRenderer"===a.declaredClass||"esri.renderers.UniqueValueRenderer"===a.declaredClass?a:m.fromJSON(a);if(!this.checkValueRange)return this._processRenderer(d);a=new n(this.url);var b=new g({statisticType:"min",onStatisticField:this._field}),e=new g({statisticType:"max",onStatisticField:this._field}),b=new q({outStatistics:[b,e]});return a.execute(b).then(f.hitch(this,function(a){a=a.features[0].attributes;for(var b in a)if(0===b.toLowerCase().indexOf("min"))var c=
a[b];else var e=a[b];return this._processRenderer(d,c,e)}))},_processRenderer:function(a,d,b){"class-breaks"===a.type?a.classBreakInfos.forEach(function(e,c){0===c&&void 0!==d&&null!==d&&(e.minValue=d);c===a.classBreakInfos.length-1&&void 0!==b&&null!==b&&(e.maxValue=b)}):a.uniqueValueInfos.forEach(function(e,c){0===c&&void 0!==d&&null!==d&&(e.value=d);c===a.uniqueValueInfos.length-1&&void 0!==b&&null!==b&&(e.value=b)});return a},_getCollectionFeatures:function(){var a=this.featureLayer;return a&&
a.hasMemorySource&&a.graphics}})});