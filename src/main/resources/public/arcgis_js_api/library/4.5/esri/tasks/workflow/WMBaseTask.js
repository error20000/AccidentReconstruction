// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.5/esri/copyright.txt for details.
//>>built
define(["dojo/_base/lang","../../request","../Task"],function(d,e,f){return f.createSubclass({declaredClass:"esri.tasks.workflow.WMBaseTask",_sendRequest:function(a,b,c){b=this.parsedUrl.path+b;a.f="json";a=this._encode(d.mixin({},this.parsedUrl.query,a));c=this._generateOptions(a,c);return e(b,c).then(function(a){return a.data})},_sendRequestFile:function(a,b,c){b=this.parsedUrl.path+b;a=this._encode(d.mixin({},this.parsedUrl.query,{form:a,f:"json"}));c=this._generateOptions(a,c);return e(b,c).then(function(a){return a.data})},
_generateOptions:function(a,b){a={query:a,callbackParamName:"callback"};if(this.requestOptions||b)a=d.mixin({},this.requestOptions,b,a),a.query=d.mixin({},this.requestOptions?this.requestOptions.query:null,b?b.query:null,a.query);return a}})});