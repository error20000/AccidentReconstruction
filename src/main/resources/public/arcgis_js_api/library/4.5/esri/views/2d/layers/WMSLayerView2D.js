// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.5/esri/copyright.txt for details.
//>>built
define("require exports ../../../core/tsSupport/extendsHelper ../../../core/tsSupport/decorateHelper ../../../core/accessorSupport/decorators ../../../core/HandleRegistry ../../../geometry/Extent ../../../layers/support/ExportWMSImageParameters ./LayerView2D ./support/ExportStrategy ../engine/BitmapSource ../engine/Canvas2DContainer ../../layers/RefreshableLayerView".split(" "),function(A,B,n,p,d,q,r,t,u,v,w,x,y){return function(c){function b(){var a=null!==c&&c.apply(this,arguments)||this;a._handles=
new q;a.container=new x;return a}n(b,c);b.prototype.hitTest=function(a,b){var z=this;if(!this.layer.popupEnabled)return null;a=this.view.toMap(a,b);var l=a.x,g=a.y,e=null,k=0,c=0;this.container.children.some(function(a){var b=a.width,m=a.height,h=a.resolution,f=a.coords;a=f[0];var f=f[1],d=a+h*b,h=f-h*m;return l>=a&&l<=d&&g<=f&&g>=h?(e=new r({xmin:a,ymin:h,xmax:d,ymax:f,spatialReference:z.view.spatialReference}),k=b,c=m,!0):!1});return e&&k&&c?(a=e.width/k,this.layer.fetchFeatureInfo(e,k,c,Math.round((l-
e.xmin)/a),Math.round((e.ymax-g)/a))):null};b.prototype.update=function(a){this.strategy.update(a);this.notifyChange("updating")};b.prototype.attach=function(){var a=this,b=this.layer,c=b.imageMaxHeight,b=b.imageMaxWidth;this.strategy=new v({container:this.container,fetchImage:this.fetchImage.bind(this),requestUpdate:this.requestUpdate.bind(this),imageMaxHeight:c,imageMaxWidth:b,imageRotationSupported:!1,imageNormalizationSupported:!1,hidpi:!1});this._exportWMSImageParameters=new t({layer:this.layer});
this._handles.add(this._exportWMSImageParameters.watch("version",function(b){a._exportImageVersion!==b&&(a._exportImageVersion=b,a._exportWMSImageParameters.layers?a.requestUpdate():a.container.removeAllChildren())}))};b.prototype.detach=function(){this.container.removeAllChildren();this.strategy.destroy();this._handles.removeAll();this._exportWMSImageParameters.layer=null;this._exportWMSImageParameters.destroy();this._exportWMSImageParameters=null};b.prototype.moveStart=function(){};b.prototype.viewChange=
function(){};b.prototype.moveEnd=function(){this.requestUpdate()};b.prototype.isUpdating=function(){return this.attached&&(this.strategy.updating||this.updateRequested)};b.prototype.fetchImage=function(a,b,c,d){var g=this;return this.layer.fetchImage(a,b,c,d).then(function(a){g.notifyChange("updating");return new w(a)})};return b=p([d.subclass("esri.views.2d.layers.WMSLayerView2D")],b)}(d.declared(u,y))});