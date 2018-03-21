// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.5/esri/copyright.txt for details.
//>>built
define("dojo/_base/lang dojo/sniff dojo/number dojo/Deferred dstore/Csv ../../../core/Accessor ../../../core/Error ../../../core/Promise ../../../core/urlUtils ../../../core/promiseUtils ../../../geometry/Extent ../../support/Field ../../../tasks/support/FeatureSet ../../../request".split(" "),function(p,q,r,t,u,v,g,w,x,l,y,z,A,B){var C=["small-integer","integer","single","double","long"],D="lat latitude y ycenter latitude83 latdecdeg POINT-Y".split(" "),E="lon lng long longitude x xcenter longitude83 longdecdeg POINT-X".split(" "),
F=[","," ",";","|","\t"];return v.createSubclass([w],{properties:{parsedUrl:{get:function(){return this.url?x.urlToObject(this.url):null}},delimiter:null,fields:[],latitudeField:null,longitudeField:null,layerDefinition:null,outFields:null,url:null},initialize:function(){this.addResolvingPromise(this._fetchCSV())},queryFeatures:function(a){return l.resolve(A.fromJSON(this._featureSetJSON))},queryFeatureCount:function(a){a=this._featureSetJSON&&this._featureSetJSON.features;return l.resolve(a?a.length:
0)},_updateUrl:function(a){a&&(this.url=this.url.replace(/^http:/i,"https:"))},_fetchCSV:function(){return B(this.parsedUrl.path,{query:this.parsedUrl.query,responseType:"text"}).then(function(a){this._updateUrl(a.ssl);return this._processCSV(a.data)}.bind(this))},_isValidDate:function(a,b){if(!a||"[object Date]"!==Object.prototype.toString.call(a)||isNaN(a.getTime()))return!1;a=!0;if(q("chrome")&&/\d+\W*$/.test(b)&&(b=b.match(/[a-zA-Z]{2,}/))){a=!1;for(var c=0,h=b.length,e=/^((jan(uary)?)|(feb(ruary)?)|(mar(ch)?)|(apr(il)?)|(may)|(jun(e)?)|(jul(y)?)|(aug(ust)?)|(sep(tember)?)|(oct(ober)?)|(nov(ember)?)|(dec(ember)?)|(am)|(pm)|(gmt)|(utc))$/i;!a&&
c<=h&&!(a=!e.test(b[c]));)c++;a=!a}return a},_getCSVExtent:function(a){var b;a.forEach(function(a){a.geometry&&(b?(b.xmin=Math.min(b.xmin,a.geometry.x),b.ymin=Math.min(b.ymin,a.geometry.y),b.xmax=Math.max(b.xmax,a.geometry.x),b.ymax=Math.max(b.ymax,a.geometry.y)):b=new y(a.geometry.x,a.geometry.y,a.geometry.x,a.geometry.y))});b&&0>=b.width&&0>=b.height&&(b=null);return b},_readFirstLine:function(a){var b=a.indexOf("\n");return p.trim(a.substr(0,b))},_detectDelimiter:function(a){if(!this.delimiter){var b=
0,c="";F.forEach(function(h){var e=a.split(h).length;e>b&&(b=e,c=h)});this.delimiter=c}},_readFieldNames:function(a){return a.split(this.delimiter)},_createLayerDefinition:function(a){this.layerDefinition||(this.layerDefinition={name:"csv",geometryType:"esriGeometryPoint",fields:[]});this.fields&&(this.layerDefinition.fields=this.fields.map(function(a){return a.toJSON()}));var b=this.layerDefinition.fields;if(!this.layerDefinition.objectIdField){for(var c=0;c<b.length;c++)if("esriFieldTypeOID"===
b[c].type){this.layerDefinition.objectIdField=b[c].name;break}this.layerDefinition.objectIdField||(b.push({name:"__OBJECTID",alias:"__OBJECTID",type:"esriFieldTypeOID",editable:!1}),this.layerDefinition.objectIdField="__OBJECTID")}a.forEach(function(a){b.some(function(b){return a===b.name})||b.push({name:a,alias:a,type:a===this.latitudeField||a===this.longitudeField?"esriFieldTypeDouble":"esriFieldTypeString"})},this)},_getCoordinateFields:function(a){var b,c;a.forEach(function(a){var e;e=D.indexOf(a.toLowerCase());
-1===e||b||(b=a);e=E.indexOf(a.toLowerCase());-1===e||c||(c=a)});this.latitudeField=this.latitudeField||b;this.longitudeField=this.longitudeField||c},_createFeatureSet:function(a){var b=[],c=[],h=[],e=this.latitudeField,m=this.longitudeField,g=this.fields.filter(function(a){return a.name!==this.layerDefinition.objectIdField},this).map(function(a){return a.name});this.fields.forEach(function(a){"date"===a.type?c.push(a.name):-1<C.indexOf(a.type)&&h.push(a.name)});var k;-1===this.outFields.indexOf("*")&&
(k=this.outFields);var n=new u;n.delimiter=this.delimiter;n.fieldNames=g;n.newline="\n";a=n.parse(a);var l=0;a.shift();a.forEach(function(a){for(var d in a)if(d===e||d===m||!k||-1<k.indexOf(d))if(-1<c.indexOf(d)){var f=new Date(a[d]);a[d]=this._isValidDate(f,a[d])?f.getTime():null}else-1<h.indexOf(d)&&(f=r.parse(a[d]),d!==e&&d!==m||!(isNaN(f)||181<Math.abs(f))||(f=parseFloat(a[d])),isNaN(f)?a[d]=null:a[d]=f);else delete a[d];d=a[e];f=a[m];a[this.layerDefinition.objectIdField]=l;l++;var g={attributes:a};
null===f||null===d||isNaN(d)||isNaN(f)||(k&&-1===k.indexOf(e)&&delete a[e],k&&-1===k.indexOf(m)&&delete a[m],g.geometry={x:f,y:d});b.push(g)},this);this._featureSetJSON={features:b,geometryType:"esriGeometryPoint",spatialReference:{wkid:4326}}},_processCSV:function(a){var b=new t,c=this._readFirstLine(a);if(!c)return b.reject(new g("CSVSource","CSV is empty"));this._detectDelimiter(c);if(!this.delimiter)return b.reject(new g("CSVSource","Unable to detect the delimiter from CSV"));c=this._readFieldNames(c);
this._getCoordinateFields(c);if(!this.latitudeField||!this.longitudeField)return b.reject(new g("CSVSource","Unable to identify latitudeField and/or longitudeField from CSV"));this._createLayerDefinition(c);this.fields=this.layerDefinition.fields.map(function(a){return z.fromJSON(a)},this);this._createFeatureSet(a);if(a=this._getCSVExtent(this._featureSetJSON.features))this.layerDefinition.extent=a.toJSON();return b.resolve()}})});