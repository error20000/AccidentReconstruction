// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.5/esri/copyright.txt for details.
//>>built
define("require exports ../core/tsSupport/declareExtendsHelper ../core/tsSupport/decorateHelper ../core/Collection ../core/Logger ../core/collectionUtils ../core/Warning ../core/urlUtils ./Symbol ./Symbol3DLayer ./IconSymbol3DLayer ./ObjectSymbol3DLayer ./LineSymbol3DLayer ./PathSymbol3DLayer ./FillSymbol3DLayer ./ExtrudeSymbol3DLayer ./TextSymbol3DLayer ./support/Thumbnail ./support/StyleOrigin ../portal/Portal ../core/accessorSupport/decorators".split(" "),function(G,H,r,e,t,u,v,g,f,w,h,x,y,z,A,
B,C,D,E,k,F,c){var l={icon:x,object:y,line:z,path:A,fill:B,extrude:C,text:D},n=t.ofType({base:h,key:"type",typeMap:l}),p=u.getLogger("esri.symbols.Symbol3D");return function(q){function b(a){a=q.call(this)||this;a.styleOrigin=null;a.thumbnail=null;a.type=null;a._set("symbolLayers",a._createSymbolLayersCollection());return a}r(b,q);Object.defineProperty(b.prototype,"symbolLayers",{set:function(a){var b=this._get("symbolLayers");b?(b.removeAll(),b.addMany(a)):(b=this._createSymbolLayersCollection(a),
this._set("symbolLayers",b))},enumerable:!0,configurable:!0});b.prototype.readSymbolLayers=function(a,b,d){b=this._createSymbolLayersCollection();for(var c=0;c<a.length;c++){var e=a[c],m=h.typeJSONDictionary.read(e.type),f=l[m];f?(e=new f,e.read(a[c],d),b.add(e)):(p.warn("Unknown symbol layer type: "+m),d&&d.messages&&d.messages.push(new g("symbol-layer:unsupported","Symbol layers of type '"+(m||"unknown")+"' are not supported",{definition:e,context:d})))}return b};b.prototype.readStyleOrigin=function(a,
b,d){if(a.styleUrl&&a.name)return b=f.read(a.styleUrl,d),new k({styleUrl:b,name:a.name});if(a.styleName&&a.name)return new k({portal:d&&d.portal||F.getDefault(),styleName:a.styleName,name:a.name});d&&d.messages&&d.messages.push(new g("symbol3d:incomplete-style-origin","Style origin requires either a 'styleUrl' or 'styleName' and a 'name' property",{context:d,definition:a}))};b.prototype.writeStyleOrigin=function(a,b,d,c){a.styleUrl&&a.name?(d=f.write(a.styleUrl,c),f.isAbsolute(d)&&(d=f.normalize(d)),
b.styleOrigin={styleUrl:d,name:a.name}):a.styleName&&a.name&&(a.portal&&c&&c.portal&&!f.hasSamePortal(a.portal.restUrl,c.portal.restUrl)?c&&c.messages&&c.messages.push(new g("symbol:cross-portal","The symbol style origin cannot be persisted because it refers to an item on a different portal than the one being saved to.",{symbol:this})):b.styleOrigin={styleName:a.styleName,name:a.name})};b.prototype.normalizeCtorArgs=function(a){return a instanceof h||a&&l[a.type]?{symbolLayers:this._createSymbolLayersCollection([a])}:
Array.isArray(a)?{symbolLayers:this._createSymbolLayersCollection(a)}:a};b.prototype._createSymbolLayersCollection=function(a){var b=this;a=new n(a);a.on("before-add",function(a){return b._onSymbolLayersBeforeAdd(a)});return a};b.prototype._onSymbolLayersBeforeAdd=function(a){0>this._allowedLayerTypes.indexOf(a.item.type)&&(p.error("Symbol layer of type '"+a.item.type+"' is not allowed for symbol of type '"+this.type+"'"),a.preventDefault())};e([c.property({json:{write:!1}})],b.prototype,"color",
void 0);e([c.property({type:n,json:{write:!0}}),c.cast(v.castForReferenceSetter)],b.prototype,"symbolLayers",null);e([c.reader("symbolLayers")],b.prototype,"readSymbolLayers",null);e([c.property({type:k})],b.prototype,"styleOrigin",void 0);e([c.reader("styleOrigin")],b.prototype,"readStyleOrigin",null);e([c.writer("styleOrigin")],b.prototype,"writeStyleOrigin",null);e([c.property({type:E.default,json:{read:!1}})],b.prototype,"thumbnail",void 0);e([c.property({type:String,readOnly:!0,json:{read:!1}})],
b.prototype,"type",void 0);e([c.shared([])],b.prototype,"_allowedLayerTypes",void 0);return b=e([c.subclass("esri.symbols.Symbol3D")],b)}(c.declared(w))});