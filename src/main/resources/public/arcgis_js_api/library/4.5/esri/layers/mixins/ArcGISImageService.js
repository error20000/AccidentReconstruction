// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.5/esri/copyright.txt for details.
//>>built
define("dojo/_base/lang ./ArcGISService ../support/Field ../support/Raster ../support/PixelBlock ../support/MosaicRule ../support/RasterFunction ../support/DimensionalDefinition ../../geometry/Extent ../../geometry/Point ../../geometry/SpatialReference ../../tasks/QueryTask ../../tasks/ImageServiceIdentifyTask ../../tasks/support/ImageServiceIdentifyParameters ../../request ../../Graphic ../../PopupTemplate ../../core/lang ../../core/Accessor ../../core/kebabDictionary ../../core/promiseUtils ../../core/Logger".split(" "),
function(l,z,v,A,B,p,w,C,q,D,E,F,G,H,r,I,x,g,u,t,y,J){t=t({S8:"s8",S16:"s16",S32:"s32",U8:"u8",U16:"u16",U32:"u32",F32:"f32",F64:"f64"});var K=J.getLogger("esri.layers.mixins.ArcGISImageService");u=u.createSubclass({properties:{layer:{},mosaicRule:{dependsOn:["layer.mosaicRule"],get:function(){return this.get("layer.mosaicRule")||null}},version:{value:0,dependsOn:"layer.bandIds layer.format layer.compressionQuality layer.compressionTolerance layer.interpolation layer.noData layer.noDataInterpretation layer.mosaicRule layer.renderingRule layer.adjustAspectRatio".split(" "),
get:function(){return this._get("version")+1}}},toJSON:function(){var a=this.layer;return{bandIds:a.bandIds?a.bandIds.join(","):null,format:a.format,compressionQuality:a.compressionQuality,compressionTolerance:a.compressionTolerance,interpolation:a.interpolation,noData:a.noData,noDataInterpretation:a.noDataInterpretation,mosaicRule:this.mosaicRule?JSON.stringify(this.mosaicRule.toJSON()):null,renderingRule:a.renderingRule?JSON.stringify(a.renderingRule.toJSON()):null,adjustAspectRatio:a.adjustAspectRatio}}});
return z.createSubclass({declaredClass:"esri.layers.mixins.ArcGISImageService",getDefaults:function(){return l.mixin(this.inherited(arguments),{exportImageServiceParameters:{layer:this}})},_raster:null,properties:{adjustAspectRatio:{},bandCount:{},bandIds:{json:{write:!0}},capabilities:{json:{read:function(a){return a&&a.split(",").map(function(a){return a.trim()})}}},compressionQuality:{json:{write:!0}},compressionTolerance:.01,copyright:{json:{read:{source:["copyrightText"],reader:function(a,b){return b.copyrightText}}}},
definitionExpression:{get:function(){return this.mosaicRule?this.mosaicRule.where:null},set:function(a){var b=this.mosaicRule||new p;b.where=a;this._set("mosaicRule",b)},json:{read:{source:["definitionExpression","layerDefinition.definitionExpression"],reader:function(a,b){return a||b.layerDefinition&&b.layerDefinition.definitionExpression||void 0}}}},domainFields:{value:null,type:[v],dependsOn:["fields"],get:function(){return this.fields&&this.fields.filter(function(a){return null!=a.domain})||[]}},
exportImageServiceParameters:{readOnly:!0,type:u},fields:{type:[v]},fullExtent:{type:q,json:{read:{source:["extent"],reader:function(a,b){return q.fromJSON(b.extent)}}}},format:{value:"jpgpng",json:{write:!0}},hasRasterAttributeTable:{},hasMultidimensions:{},imageMaxHeight:{value:4100,json:{origins:{service:{read:{source:"maxImageHeight"}}}}},imageMaxWidth:{value:15E3,json:{origins:{service:{read:{source:"maxImageWidth"}}}}},interpolation:{json:{write:!0}},mosaicRule:{value:null,type:p,json:{origins:{service:{read:{source:["defaultMosaicMethod"],
reader:function(a,b){return p.fromJSON(b)}}}},write:!0}},multidimensionalInfo:null,noData:{json:{write:!0}},noDataInterpretation:{json:{write:!0}},objectIdField:{json:{read:{source:["fields"],reader:function(a,b){!a&&b.fields&&b.fields.some(function(b){"esriFieldTypeOID"===b.type&&(a=b.name);return!!a});return a}}}},pixelType:{value:null,json:{read:t.fromJSON,write:t.write}},popupTemplate:{value:null,type:x,json:{read:{source:["popupInfo"],reader:function(a,b){return b.popupInfo?x.fromJSON(b.popupInfo):
null}},write:function(a,b){a&&(b.popupInfo=a.toJSON())}}},queryTask:{readOnly:!0,dependsOn:["url"],get:function(){return new F({url:this.url})}},renderer:{json:{origins:{service:{read:!1}},read:{source:"layerDefinition.drawingInfo.renderer",reader:function(){K.warn("Client side renderer configuration on ImageryLayer (id: "+this.id+", title: "+this.title+") is not yet supported. Visualization of the layer data may differ from what is expected.")}},write:!1}},rasterAttributeTable:null,rasterAttributeTableFieldPrefix:"Raster.",
rasterFields:{value:null,dependsOn:["fields","rasterAttributeTable","rasterAttributeTableFieldPrefix"],get:function(){var a=this.rasterAttributeTableFieldPrefix,b={name:"Raster.ItemPixelValue",alias:"Item Pixel Value",domain:null,editable:!1,length:50,type:"string"},d=this.fields?g.clone(this.fields):[],c=d.length;d[c]={name:"Raster.ServicePixelValue",alias:"Service Pixel Value",domain:null,editable:!1,length:50,type:"string"};if(this.capabilities&&-1<this.capabilities.indexOf("Catalog")||this.fields&&
0<this.fields.length)d[c+1]=b;!g.isDefined(this.pixelFilter)||"esriImageServiceDataTypeVector-UV"!==this.serviceDataType&&"esriImageServiceDataTypeVector-MagDir"!==this.serviceDataType||(d[c+2]={name:"Raster.Magnitude",alias:"Magnitude",domain:null,editable:!1,type:"double"},d[c+3]={name:"Raster.Direction",alias:"Direction",domain:null,editable:!1,type:"double"});(b=this.rasterAttributeTable&&this.rasterAttributeTable.fields||null)&&0<b.length&&(b=b.filter(function(a){return"esriFieldTypeOID"!==a.type&&
"value"!==a.name.toLowerCase()}).map(function(b){var c=g.clone(b);c.name=a+b.name;return c}),d=d.concat(b));return d}},renderingRule:{value:null,type:w,json:{origins:{service:{read:{source:["rasterFunctionInfos"],reader:function(a,b){a=b.rasterFunctionInfos;return b.renderingRule||a&&a.length&&"None"!==a[0].name?w.fromJSON(b.renderingRule||{rasterFunctionInfos:b.rasterFunctionInfos}):null}}}},write:!0}},serviceDataType:{},spatialReference:{value:null,readOnly:!0,json:{read:{source:["extent"],reader:function(a,
b){return(a=b.extent&&b.extent.spatialReference)&&E.fromJSON(a)}}}},url:{},version:{value:null,readOnly:!0,json:{read:{source:["currentVersion","fields","timeInfo"],reader:function(a,b){(a=b.currentVersion)||(a=b.hasOwnProperty("fields")||b.hasOwnProperty("objectIdField")||b.hasOwnProperty("timeInfo")?10:9.3);return a}}}}},applyFilter:function(a){a=this._clonePixelData(a);this.pixelFilter&&this.pixelFilter(a);return a},fetchImage:function(a,b,d,c){if(!(g.isDefined(this._raster)&&g.isDefined(a)&&g.isDefined(b)&&
g.isDefined(d)))return y.reject(Error("Insufficient parameters for requesting an image. A valid extent, width and height values are required."));a={imageServiceParameters:this.getExportImageServiceParameters(a,b,d,c),nBands:Math.min(this.bandCount,3),pixelType:this.pixelType};return this._raster.read(a)},fetchKeyProperties:function(){return r(this.parsedUrl.path+"/keyProperties",{query:l.mixin({f:"json"}),responseType:"json",callbackParamName:"callback"}).then(function(a){return a.data})},getExportImageServiceParameters:function(a,
b,d,c){c=(c=(a=a.clone().shiftCentralMeridian())&&a.spatialReference)&&(c.wkid||JSON.stringify(c.toJSON()));return l.mixin({bbox:a&&a.xmin+","+a.ymin+","+a.xmax+","+a.ymax,bboxSR:c,imageSR:c,size:b+","+d},this.exportImageServiceParameters.toJSON())},queryRasters:function(a){return this.queryTask.execute(a)},queryVisibleRasters:function(a,b){this._visibleRasters=[];var d=!1,c=this.popupTemplate;c&&c.fieldInfos&&0<c.fieldInfos.length&&(d=1<c.fieldInfos.length||"raster.servicepixelvalue"!==c.fieldInfos[0].toLowerCase());
c&&!d&&this.rasterFields&&(d=this.rasterFields.some(function(a){return(a=a&&a.name?a.name.toLowerCase():null)&&"raster.servicepixelvalue"!==a&&(c.title&&-1<c.title.toLowerCase().indexOf(a)||c.content&&-1<c.content.toLowerCase().indexOf(a))}));var f,e,k;b.layerView&&b.layerView.view&&(e=b.layerView.view,"2d"===e.type&&(e=e.state),f=e.spatialReference.clone(),(e=e.resolution)&&(k=new D(.5*e,.5*e,f)),e=f.equals(this.spatialReference));a=new H({geometry:a.geometry,returnCatalogItems:d,timeExtent:a.timeExtent,
mosaicRule:this.mosaicRule||null,renderingRule:this.renderingRule||null,returnGeometry:e,outSpatialReference:f,pixelSize:k});return(new G({url:this.url})).execute(a).then(function(a){return this._processVisibleRastersResponse(a,b)}.bind(this)).otherwise(function(a){throw Error("Error querying for visible rasters");})},_isScientificData:function(){return"esriImageServiceDataTypeVector-UV"===this.serviceDataType||"esriImageServiceDataTypeVector-MagDir"===this.serviceDataType||"esriImageServiceDataTypeScientific"===
this.serviceDataType},_fetchService:function(){return y.resolve().then(function(){return this.resourceInfo||r(this.parsedUrl.path,{query:l.mixin({f:"json"},this.parsedUrl.query),responseType:"json",callbackParamName:"callback"})}.bind(this)).then(function(a){a.ssl&&(this.url=this.url.replace(/^http:/i,"https:"));this.read(a.data,{origin:"service",url:this.parsedUrl});this._raster=new A({url:this.url})}.bind(this)).then(function(){if(10<this.version&&this.hasRasterAttributeTable)return r(this.parsedUrl.path+
"/rasterAttributeTable",{query:{f:"json"},responseType:"json"}).then(function(a){(a=a.data)&&a.features&&a.fields&&this.read({rasterAttributeTable:a},{origin:"service",url:this.parsedUrl})}.bind(this))}.bind(this)).then(function(){if(10.3<=this.version&&this._isScientificData()&&this.hasMultidimensions)return r(this.parsedUrl.path+"/multiDimensionalInfo",{query:{f:"json"},responseType:"json"}).then(function(a){(a=a.data)&&a.multidimensionalInfo&&(this._updateMultidimensionalDefinition(a.multidimensionalInfo),
this.multidimensionalInfo=a.multidimensionalInfo)}.bind(this))}.bind(this))},_updateMultidimensionalDefinition:function(a){var b=a.variables[0].dimensions,d;a=[];for(d in b)if(b.hasOwnProperty(d)){var c=b[d],f=!0,e=c.extent,k=[e[0]];c.hasRanges&&!0===c.hasRanges?(f=!1,k=[c.values[0]]):"stdz"===c.name.toLowerCase()&&Math.abs(e[1])<=Math.abs(e[0])&&(k=[e[1]]);a.push(new C({variableName:"",dimensionName:b[d].name,isSlice:f,values:k}))}0<a.length&&(this.mosaicRule=this.mosaicRule||new p,d=this.mosaicRule.multidimensionalDefinition,
!d||d&&0>=d.length)&&(this.mosaicRule.multidimensionalDefinition=a)},_clonePixelData:function(a){if(null===a||void 0===a)return a;var b={};a.extent&&(b.extent=a.extent.clone());a=a.pixelBlock;if(null===a||void 0===a)return b;b.pixelBlock=a.clone();return b},_processVisibleRastersResponse:function(a,b){var d=a.value,c,f,e=0,k=this.objectIdField,g,h=a.catalogItems&&a.catalogItems.features&&a.catalogItems.features.length||0;if(h){var l=0,m,n;m=0;f=[h];c=[h];g=[h];for(e=0;e<h;e++)-1<a.properties.Values[e].toLowerCase().indexOf("nodata")&&
m++;m=h-m;for(e=0;e<h;e++)n=-1<a.properties.Values[e].toLowerCase().indexOf("nodata")?m++:l++,f[n]=a.catalogItems.features[e],c[n]=a.properties.Values[e],g[n]=f[n].attributes[k]}this._visibleRasters=[];e=-1<d.toLowerCase().indexOf("nodata");!d||f||e||(k="ObjectId",f=[],a=new I(new q(this.fullExtent),null,{ObjectId:0}),f.push(a));k=[];if(!f)return k;g=b&&b.returnDomainValues||!1;e=0;for(b=f.length;e<b;e++)a=f[e],a.popupTemplate=this.popupTemplate,a._layer=this,d&&(h=d,c&&c.length>=e&&(h=c[e],h=h.replace(/ /gi,
", ")),a.attributes["Raster.ItemPixelValue"]=h,a.attributes["Raster.ServicePixelValue"]=d,this._updateFeatureWithMagDirValues(a,h),this._updateFeatureWithRasterAttributeTableValues(a,h)),g&&this._updateFeatureWithDomainValues(a),k.push(a);return k},_updateFeatureWithRasterAttributeTableValues:function(a,b){var d=this.rasterAttributeTable&&this.rasterAttributeTable.features;if(d&&!(1>d.length)&&this.rasterAttributeTableFieldPrefix){var c=null;d.forEach(function(a){a&&a.attributes&&(a.attributes.Value==
b||a.attributes.VALUE==b)&&(c=a)});if(c){var d={},f,e;for(f in c.attributes)c.attributes.hasOwnProperty(f)&&(e=this.rasterAttributeTableFieldPrefix+f,d[e]=c.attributes[f]);a.attributes=l.mixin(a.attributes,d)}}},_updateFeatureWithMagDirValues:function(a,b){if(this.pixelFilter&&("esriImageServiceDataTypeVector-UV"===this.serviceDataType||"esriImageServiceDataTypeVector-MagDir"===this.serviceDataType)){b=b.replace(" ","").split(",");var d=new B({height:1,width:1,pixelType:"f32",pixels:[],statistics:[]});
b.forEach(function(a){d.addData({pixels:[a],statistics:{minValue:a,maxValue:a,noDataValue:null}})});this.pixelFilter({pixelBlock:d,extent:new q(0,0,0,0,this.spatialReference)});a.attributes["Raster.Magnitude"]=d.pixels[0][0];a.attributes["Raster.Direction"]=d.pixels[1][0]}},_updateFeatureWithDomainValues:function(a){var b=this.domainFields;g.isDefined(b)&&b.forEach(function(b){if(b){var c=a.attributes[b.name];g.isDefined(c)&&(c=this._findMatchingDomainValue(b.domain,c),g.isDefined(c)&&(a.attributes[b.name]=
c))}},this)},_findMatchingDomainValue:function(a,b){if(a=a&&a.codedValues){var d;a.some(function(a){return a.code===b?(d=a.name,!0):!1});return d}}})});