// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.6/esri/copyright.txt for details.
//>>built
define("require exports ../../../core/tsSupport/extendsHelper ../../../core/tsSupport/decorateHelper dojo/has dojo/number dstore/Csv ../../../core/accessorSupport/decorators ../../../core/Accessor ../../../core/Error ../../../core/Promise ../../../core/promiseUtils ../../../core/urlUtils ../../../request ../../../geometry ../../../geometry/support/webMercatorUtils ../../../tasks/support/FeatureSet ../stores/SparsePointFeatureStore".split(" "),function(M,N,v,n,w,x,y,h,z,t,A,p,B,C,D,E,F,G){var H=["esriFieldTypeSmallInteger",
"esriFieldTypeInteger","esriFieldTypeSingle","esriFieldTypeDouble","esriFieldTypeLong"],I="lat latitude y ycenter latitude83 latdecdeg POINT-Y".split(" "),J="lon lng long longitude x xcenter longitude83 longdecdeg POINT-X".split(" "),K=[","," ",";","|","\t"],L=/^((jan(uary)?)|(feb(ruary)?)|(mar(ch)?)|(apr(il)?)|(may)|(jun(e)?)|(jul(y)?)|(aug(ust)?)|(sep(tember)?)|(oct(ober)?)|(nov(ember)?)|(dec(ember)?)|(am)|(pm)|(gmt)|(utc))$/i,u=function(){var f=x._parseInfo(),c=new RegExp("^"+f.regexp+"$"),a=new RegExp("["+
f.group+"\\s\\xa0]","g"),b=f.factor;return function(d){d=c.exec(d);f.factor=b;if(!d)return NaN;var k=d[1];if(!d[1]){if(!d[2])return NaN;k=d[2];f.factor*=-1}k=k.replace(a,"").replace(f.decimal,".");return+k*f.factor}}();return function(f){function c(){var a=null!==f&&f.apply(this,arguments)||this;a.delimiter=null;a.fields=null;a.latitudeField=null;a.longitudeField=null;a.layerDefinition=null;a.url=null;return a}v(c,f);c.prototype.initialize=function(){this.addResolvingPromise(this._fetchCSV())};Object.defineProperty(c.prototype,
"parsedUrl",{get:function(){return this.url?B.urlToObject(this.url):null},enumerable:!0,configurable:!0});c.prototype.buildIndex=function(){var a=this;return this._storePromise?this._storePromise:this._storePromise=this._fetchCSVText().then(function(b){var d=a._parseFeatures(a._data);return new G({numFeatures:d.coords.length,fields:a.layerDefinition.fields,objectIdField:a.layerDefinition.objectIdField,spatialReference:D.SpatialReference.WebMercator,readCoordinates:function(a,b){return 0===a&&b===
d.coords.length?d.coords:d.coords.slice(a,a+b)},readFeatureAttributes:function(a){return d.attributes[a]}})})};c.prototype.queryFeaturesJSON=function(a){return this.buildIndex().then(function(b){return b.execute(a)})};c.prototype.queryFeatures=function(a){return this.buildIndex().then(function(b){return b.execute(a)}).then(function(a){return F.fromJSON(a)})};c.prototype.queryFeatureCount=function(a){return this.buildIndex().then(function(b){return b.executeForCount(a)})};c.prototype.queryObjectIds=
function(a){return this.buildIndex().then(function(b){return b.executeForIds(a)})};c.prototype.queryExtent=function(a){return this.buildIndex().then(function(b){return b.executeForExtent(a)})};c.prototype._fetchCSV=function(){var a=this;return this._fetchCSVText().then(function(b){return a._processCSV(b)})};c.prototype._fetchCSVText=function(){var a=this;this._data&&p.resolve(this._data);var b=this.parsedUrl;b||p.reject(new t("csv-source:invalid-source","url not defined"));return C(b.path,{query:b.query,
responseType:"text"}).then(function(b){var k=a.url;b.ssl&&(a.url=k.replace(/^http:/i,"https:"));return a._data=b.data})};c.prototype._processCSV=function(a){var b=this._readFirstLine(a);if(!b)return p.reject(new t("CSVSource","CSV is empty"));if(!this.delimiter){var d=this._inferDelimiter(b);if(!d)return p.reject(new t("CSVSource","Unable to detect the delimiter from CSV"));this.delimiter=d}b=b.split(this.delimiter);if(!this.latitudeField||!this.longitudeField){var k=this._inferCoordinateFields(b),
d=k.longitudeField,k=k.latitudeField;if(!this.longitudeField&&!d||!this.latitudeField&&!k)return p.reject(new t("CSVSource","Unable to identify latitudeField and/or longitudeField from CSV"));this.longitudeField=this.longitudeField||d;this.latitudeField=this.latitudeField||k}this.layerDefinition||(d=this.layerDefinition={name:"csv",geometryType:"esriGeometryPoint",objectIdField:"__OBJECTID",fields:[{name:"__OBJECTID",alias:"__OBJECTID",type:"esriFieldTypeOID",domain:null}],extent:null},this.fields&&
this.fields.length?d.fields=this.fields.map(function(a){return a.toJSON()}):(k=this._inferFields(a,this.delimiter,b,this.latitudeField,this.longitudeField),(e=d.fields).push.apply(e,k)),a=this._inferExtent(a,this.delimiter,b,this.latitudeField,this.longitudeField),d.extent=a);var e};c.prototype._inferFields=function(a,b,d,k,e){var c=[],f=this._sampleLines(a).map(function(a){return a.split(b).map(function(a){return a.trim()})});a=function(a){var b=d[a];if(b===k||b===e)c.push({name:b,alias:b,type:"esriFieldTypeDouble",
domain:null});else{var g=f.map(function(b){return b[a]}),g=h._inferFieldType(g),b={name:b.replace(/[\s\'\u2019\u2018\.\-\/\(\)]+/g,"_"),type:null,alias:b,domain:null,editable:!0,nullable:!0};switch(g){case "integer":b.type="esriFieldTypeInteger";break;case "double":b.type="esriFieldTypeDouble";break;case "date":b.type="esriFieldTypeDate";b.length=36;break;default:b.type="esriFieldTypeString",b.length=255}c.push(b)}};for(var h=this,g=0;g<d.length;g++)a(g);return c};c.prototype._inferFieldType=function(a){var b=
this,d=/[^+-.,0-9]/;return a.map(function(a){var e=!1;if(""===a||d.test(a))e=!0;else if(e=u(a),isNaN(e))if(-1===a.indexOf("E"))e=!0;else if(e=Number(a),isNaN(e))if(-1===a.indexOf(","))e=!0;else if(a=a.replace(",","."),e=Number(a),isNaN(e))e=!0;else return"double";else return"double";else return/[.,]/.test(a)?"double":214783647<e||-214783648>e?"double":"integer";return e&&!/^[-]?\d*[.,]?\d*$/.test(a)&&b._isValidDate(new Date(a),a)?"date":"string"}).reduce(function(a,b){if(a===b)return b;if("string"===
a||"string"===b)return"string";if("double"===a||"double"===b)return"double"})};c.prototype._isValidDate=function(a,b){if(!a||"[object Date]"!==Object.prototype.toString.call(a)||isNaN(a.getTime()))return!1;a=!0;if(w("chrome")&&/\d+\W*$/.test(b)&&(b=b.match(/[a-zA-Z]{2,}/))){a=!1;for(var d=0;!a&&d<=b.length;)a=!L.test(b[d]),d++;a=!a}return a};c.prototype._inferExtent=function(a,b,d,c,e){return{xmin:-2.0037508342787E7,ymin:-2.003750834278E7,xmax:2.003750834278E7,ymax:2.0037508342787E7,spatialReference:{wkid:102100}}};
c.prototype._parseCoordinateValue=function(a){var b=u(a);if(isNaN(b)||181<Math.abs(b))b=parseFloat(a);return b};c.prototype._readFirstLine=function(a){return a.substring(0,a.indexOf("\n")).trim()};c.prototype._sampleLines=function(a,b){void 0===b&&(b=10);for(var d=!1,c=[],e=a.indexOf("\n")+1;!d&&c.length<b;){var f=a.indexOf("\n",e);-1===f&&(d=!0);var h=void 0;(h=-1===f&&e<a.length-1?a.substring(e).trim():a.substring(e,f).trim())&&c.push(h);e=f+1}return c};c.prototype._inferDelimiter=function(a){var b=
0,d="";K.forEach(function(c){var e=a.split(c).length;e>b&&(b=e,d=c)});return""===d?null:d};c.prototype._inferCoordinateFields=function(a){var b=null,d=null;a.forEach(function(a){var c=a.toLowerCase(),f;f=I.indexOf(c);-1===f||d||(d=a);f=J.indexOf(c);-1===f||b||(b=a)});return{longitudeField:b,latitudeField:d}};c.prototype._parseFeatures=function(a){for(var b=this.latitudeField,c=this.longitudeField,f=[],e=[],h=[],n=[],p=[],g=this.layerDefinition,q=g.objectIdField,l=0,g=g.fields;l<g.length;l++){var r=
g[l];"esriFieldTypeDate"===r.type?h.push(r.name):-1<H.indexOf(r.type)&&n.push(r.name);r.name!==q&&p.push(r.name)}q=new y;q.delimiter=this.delimiter;q.fieldNames=p;q.newline="\n";a=q.parse(a);p=0;a.shift();for(q=0;q<a.length;q++){var l=a[q],m;for(m in l)-1<h.indexOf(m)?(g=new Date(l[m]),l[m]=this._isValidDate(g,l[m])?g.getTime():null):-1<n.indexOf(m)&&(g=u(l[m]),m!==b&&m!==c||!(isNaN(g)||181<Math.abs(g))||(g=parseFloat(l[m])),isNaN(g)?l[m]=null:l[m]=g);g=l[b];r=l[c];l[this.layerDefinition.objectIdField]=
p;p++;null===r||null===g||isNaN(g)||isNaN(r)||(f.push(E.lngLatToXY(r,g)),e.push(l))}return{coords:f,attributes:e}};n([h.property({readOnly:!0,dependsOn:["url"]})],c.prototype,"parsedUrl",null);n([h.property()],c.prototype,"delimiter",void 0);n([h.property()],c.prototype,"fields",void 0);n([h.property()],c.prototype,"latitudeField",void 0);n([h.property()],c.prototype,"longitudeField",void 0);n([h.property()],c.prototype,"layerDefinition",void 0);n([h.property()],c.prototype,"url",void 0);return c=
n([h.subclass("esri.layers.graphics.sources.CSVSource")],c)}(h.declared(z,A))});