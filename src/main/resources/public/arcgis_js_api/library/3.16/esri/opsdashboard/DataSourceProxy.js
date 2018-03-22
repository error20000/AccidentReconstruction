// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.16/esri/copyright.txt for details.
//>>built
define("esri/opsdashboard/DataSourceProxy","dojo/_base/declare dojo/_base/lang dojo/json dojo/Deferred ../layers/Field ../tasks/FeatureSet ../renderers/jsonUtils ./core/messageHandler ./core/errorMessages ./core/MessageReceiver".split(" "),function(k,f,l,g,m,n,p,c,h,q){return k([q],{id:null,name:null,mapWidgetId:null,objectIdFieldName:null,displayFieldName:null,typeIdFieldName:null,fields:null,types:null,geometryType:null,supportsSelection:!1,isBroken:!1,_popupInfo:null,_renderer:null,advancedQueryCapabilities:null,
constructor:function(){this.fields||(this.fields=[]);for(var a=0;a<this.fields.length;a++){var b=this.fields[a];"string"===typeof b&&(b=l.parse(b));this.fields[a]=new m(b)}},executeQuery:function(a){return c._sendMessageWithReply({functionName:"executeQuery",args:{dataSourceId:this.id,query:a}}).then(f.hitch(this,function(a){this.isBroken=!1;return new n(a.featureSet)}),f.hitch(this,function(a){this.isBroken=!0;throw a;}))},getAssociatedSelectionDataSourceProxy:function(){return c._sendMessageWithReply({functionName:"getAssociatedSelectionDataSource",
args:{dataSourceId:this.id}}).then(f.hitch(this,function(a){return this.getDataSourceProxy(a.dataSourceId)}))},selectFeaturesByObjectIds:function(a){if(!Array.isArray(a))throw Error(h.invalidObjectIdArray);if(!this.supportsSelection)throw Error(h.selectionNotSupported);c._sendMessage({functionName:"selectFeaturesByIds",args:{dataSourceId:this.id,objectIds:a}})},selectFeatures:function(a){if(!this.supportsSelection)throw Error(h.selectionNotSupported);c._sendMessage({functionName:"selectFeatures",
args:{dataSourceId:this.id,geometry:a}})},clearSelection:function(){this.supportsSelection&&c._sendMessage({functionName:"clearSelection",args:{dataSourceId:this.id}})},getPopupInfo:function(){return this._popupInfo?(new g).resolve(this._popupInfo):c._sendMessageWithReply({functionName:"getPopupInfo",args:{dataSourceId:this.id}}).then(f.hitch(this,function(a){return this._popupInfo=a.popupInfo}))},getRenderer:function(){return this._renderer?(new g).resolve(this._renderer):c._sendMessageWithReply({functionName:"getRenderer",
args:{dataSourceId:this.id}}).then(f.hitch(this,function(a){return!a.renderer?null:this._renderer=p.fromJson(a.renderer)}))},getAdvancedQueryCapabilities:function(){return this.advancedQueryCapabilities?(new g).resolve(this.advancedQueryCapabilities):c.isNative?c._sendMessageWithReply({functionName:"getAdvancedQueryCapabilities",args:{dataSourceId:this.id}}).then(f.hitch(this,function(a){return!a.advancedQueryCapabilities?null:this.advancedQueryCapabilities=a.advancedQueryCapabilities})):(new g).resolve(null)},
_findField:function(a){if(!a||!Array.isArray(this.fields))return null;for(var b=0;b<this.fields.length;b++)if(this.fields[b].name===a)return this.fields[b];return null},_findType:function(a){if(!a||!Array.isArray(this.types))return null;for(var b=0;b<this.types.length;b++)if(this.types[b].id===a)return this.types[b];return null},_getCodedValueFromCodedDomain:function(a,b){if(!b||"codedValue"!==b.type)return null;for(var c=0;c<b.codedValues.length;c++)if(b.codedValues[c].code===a)return b.codedValues[c];
return null},getTypeFromFeature:function(a){return!this.typeIdFieldName?null:this._findType(a.attributes[this.typeIdFieldName])},getValueFromFeature:function(a,b){var c=this._findField(b);if(!b||!c)return null;var e=a.attributes[b];if(!e&&(e=a.attributes[b.toUpperCase()],!e))return null;if(this.typeIdFieldName===b){var d=this._findType(e);if(d)return d.name}if((d=this.getFeatureType(a))&&Array.isArray(d.domains))if(d=this.getCodedValueFromCodedDomain(e,d.domains[b]))return d.name;return(d=this._getCodedValueFromCodedDomain(e,
c.domain))?d.name:e}})});