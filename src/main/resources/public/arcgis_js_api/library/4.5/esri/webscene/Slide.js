// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.5/esri/copyright.txt for details.
//>>built
define("require exports ../core/tsSupport/declareExtendsHelper ../core/tsSupport/decorateHelper ../core/accessorSupport/decorators ../Viewpoint ../Basemap ../support/basemapUtils ../core/JSONSupport ../core/lang ../core/Logger ../core/Collection ../core/collectionUtils ../core/promiseUtils ./Environment ./Lighting ./support/Description ./support/Title ./support/Thumbnail dojo/_base/lang dojo/promise/all ../views/3d/lib/glMatrix".split(" "),function(J,K,l,e,c,z,A,p,t,B,C,u,D,g,m,E,v,w,n,h,F,G){var H=
0,x=function(f){function b(){var a=null!==f&&f.apply(this,arguments)||this;a.id="";return a}l(b,f);a=b;b.prototype.clone=function(){return new a({id:this.id})};e([c.property({type:String,json:{write:!0}})],b.prototype,"id",void 0);return b=a=e([c.subclass()],b);var a}(c.declared(t)),k=u.ofType(x),I=C.getLogger("esri.webscene.Slide");return function(f){function b(a){a=f.call(this,a)||this;a._currentAnimation=null;a.id=Date.now().toString(16)+"-slide-"+H++;a.title=new w.default;a.description=new v.default;
a.thumbnail=new n.default;a.viewpoint=null;a.basemap=null;a.environment=new m;a.visibleLayers=new k;return a}l(b,f);b.prototype.castBasemap=function(a){return p.ensureType(a)};Object.defineProperty(b.prototype,"visibleLayers",{set:function(a){this._set("visibleLayers",D.referenceSetter(a,this._get("visibleLayers"),k))},enumerable:!0,configurable:!0});b.prototype.castVisibleLayers=function(a){return a&&"function"===typeof a.map?a.map(function(a){if("string"===typeof a)return{id:a};if(a.id)return{id:a.id};
I.warn('Invalid visible layer, expected { id }, Layer or "id"');return a}):a};b.prototype.clone=function(){return new this.constructor({id:this.id,title:this.title.clone(),thumbnail:this.thumbnail.clone(),description:this.description&&this.description.clone()||null,viewpoint:this.viewpoint&&this.viewpoint.clone()||null,basemap:this.basemap&&this.basemap.clone()||null,visibleLayers:this.visibleLayers.clone(),environment:this.environment&&this.environment.clone()||null})};b.prototype._updateVisibleLayersFrom=
function(a){var d=this,b=[];return g.eachAlways(this._allLayers(a.map).map(function(d){return a.whenLayerView(d).then(function(a){a.visible&&b.push(new x({id:a.layer.id}))})}).toArray()).then(function(){d.visibleLayers.removeAll();d.visibleLayers.addMany(b)})};b.prototype.updateFrom=function(a,d){var b=this;d=h.mixin({screenshot:h.mixin({format:"jpeg",quality:80,width:120,height:75},d&&d.screenshot)},d);return a.then(function(){b.viewpoint=a.viewpoint.clone();b.environment.lighting=E.prototype.clone.apply(a.environment.lighting);
b.basemap=a.map.basemap&&a.map.basemap.clone()||null;return b._updateVisibleLayersFrom(a)}).then(function(){return a.takeScreenshot(d.screenshot)}).then(function(a){b.thumbnail=new n.default({url:a.dataURL});return b})};b.prototype.applyTo=function(a,b){var d=this,y=h.mixin({animate:!0},b);return this._applyBasemap(a).then(function(){return F([d._applyViewpoint(a,y),d._applyLayerVisibility(a,y)])}).then(function(){return d})};b.prototype._applyBasemap=function(a){var b=this;return this.basemap?this.basemap.load().always(function(){a.map.basemap=
p.clonePreservingTiledLayers(b.basemap,a.map.basemap)}):g.resolve()};b.prototype._allLayers=function(a){var b=new u;this._collectLayers(a,b);this._collectLayers(a.ground,b);return b};b.prototype._collectLayers=function(a,b){var d=this;a.layers.forEach(function(a){b.add(a);a.layers&&d._collectLayers(a,b)})};b.prototype._applyLayerVisibility=function(a,b){var d=this;if(this.visibleLayers){var c=this._allLayers(a.map);if(b.applyToLayerViews)return g.eachAlways(c.map(function(b){return a.whenLayerView(b).then(function(a){a.visible=
d.visibleLayers.some(function(b){return b.id===a.layer.id})})}).toArray());c.forEach(function(a){return a.visible=d.visibleLayers.some(function(b){return b.id===a.id})});return g.resolve()}};b.prototype._applyViewpoint=function(a,b){if(this.viewpoint){this.viewpoint.camera.fov=a.camera.fov;if(b.animate){if(this.get("environment.lighting.date"))return this._animateToLighting(a,b).then(function(){});a.environment.lighting=this.environment.lighting.clone();return a.goTo(this.viewpoint,b).then(function(){})}a.viewpoint=
this.viewpoint;a.environment.lighting=this.environment.lighting.clone()}return g.resolve()};b.prototype._animateToLighting=function(a,b){var d=this,c;"global"===a.viewingMode&&(c=this._animateLightingWithCamera(a));this._currentAnimation&&(this._currentAnimation.stop(),this._currentAnimation=null);a.environment.lighting.cameraTrackingEnabled=!1;a.environment.lighting.directShadowsEnabled=this.environment.lighting.directShadowsEnabled;null!=this.environment.lighting.displayUTCOffset&&(a.environment.lighting.displayUTCOffset=
this.environment.lighting.displayUTCOffset);var e=a.goTo(this.viewpoint,b);this._currentAnimation=e;this._currentAnimation.always(function(){c&&c.remove();d._currentAnimation===e&&(a.environment.lighting.cameraTrackingEnabled=!0)});this._currentAnimation.then(function(){a.environment.lighting=d.environment.lighting.clone()});return this._currentAnimation};b.prototype._getTime=function(a){var b=a.getTime();a=3600*a.getUTCHours()+60*a.getUTCMinutes()+a.getUTCSeconds();return[b,a]};b.prototype._setTime=
function(a,b,c){a.setTime(b);a.setUTCHours(c/3600);a.setUTCMinutes(c%3600/60);a.setUTCSeconds(c%3600%60);return a};b.prototype._animateLightingWithCamera=function(a){var b=this,c=G.vec3d,e=this._getTime(new Date(a.environment.lighting.date.toString())),f=e[0],g=e[1],e=this._getTime(this.environment.lighting.date),m=e[0],n=e[1],h=a.renderCoordsHelper,k=[0,0,0];h.toRenderCoords(a.camera.position,k);var l=[0,0,0];h.toRenderCoords(this.viewpoint.camera.position,l);var q=[0,0,0],p=new Date;return a.watch("camera",
function(d){h.toRenderCoords(d.position,q);d=c.dist2(k,q);var e=c.dist2(l,q),r=0;0!==d+e&&(r=d/(d+e));a.environment.lighting.date=b._setTime(p,f+(m-f)*r,g+(n-g)*r)})};b.createFrom=function(a,b){return(new this).updateFrom(a,b)};b.sanitizeJSON=function(a){var b;b=void 0!==a.visibleLayers&&Array.isArray(a.visibleLayers)?B.clone(a.visibleLayers):[];b={id:a.id||"",title:a.title||{text:""},thumbnail:a.thumbnail||{url:""},viewpoint:a.viewpoint,baseMap:a.baseMap,visibleLayers:b};void 0!==a.description&&
(b.description=a.description);void 0!==a.environment&&(b.environment=m.sanitizeJSON(a.environment));return b};e([c.property({json:{write:!0}})],b.prototype,"id",void 0);e([c.property({type:w.default,json:{write:!0}})],b.prototype,"title",void 0);e([c.property({type:v.default,json:{write:!0}})],b.prototype,"description",void 0);e([c.property({type:n.default,json:{write:!0}})],b.prototype,"thumbnail",void 0);e([c.property({type:z,json:{write:!0}})],b.prototype,"viewpoint",void 0);e([c.property({type:A,
json:{read:{source:"baseMap"},write:{target:"baseMap"}}})],b.prototype,"basemap",void 0);e([c.cast("basemap")],b.prototype,"castBasemap",null);e([c.property({type:k,json:{write:!0}})],b.prototype,"visibleLayers",null);e([c.cast("visibleLayers")],b.prototype,"castVisibleLayers",null);e([c.property({type:m,json:{write:!0}})],b.prototype,"environment",void 0);return b=e([c.subclass("esri.webscene.Slide")],b)}(c.declared(t))});