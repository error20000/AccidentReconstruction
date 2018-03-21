// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.5/esri/copyright.txt for details.
//>>built
define("require exports ../../core/tsSupport/extendsHelper ../../core/tsSupport/decorateHelper ../../core/typescript dojo/Deferred ../../identity/IdentityManager ../../identity/Credential ../../request ./messageHandler ./MessageReceiver ./errorMessages ../MapWidgetProxy ../DataSourceProxy".split(" "),function(v,w,q,l,m,e,g,r,t,d,u,f,n,h){return function(k){function b(){var a=null!==k&&k.apply(this,arguments)||this;a.portalHelperServices=null;a.drawingType={POINT:"point",LINE:"line",POLYLINE:"polyline",
FREEHAND_POLYLINE:"freehandpolyline",EXTENT:"extent",CIRCLE:"circle",POLYGON:"polygon",FREEHAND_POLYGON:"freehandpolygon"};a.isNative=null;a.portalUrl=null;return a}q(b,k);b.prototype.dojoConstructor=function(){var a=this;this._hostInitialized=!1;this._dataSourceProxies=[];this._mapWidgetProxies=[];this.portalHelperServices=null;d._sendMessageWithReply({functionName:"initialize"}).then(function(c){return a._initializeResponseReceived(c)}).then(function(){return a._hostReady()}).then(function(){d._sendMessage({functionName:"afterInitialize"})}).otherwise(function(c){a._hostInitializationError(c)})};
b.prototype.__messageReceived=function(a){switch(a.functionName.toLowerCase()){case "datasourceadded":this._dataSourceAdded(a.args.dataSource);break;case "datasourceremoved":this._dataSourceRemoved(a.args.dataSourceId);break;case "mapwidgetadded":this._mapWidgetAdded(a.args.mapWidget);break;case "mapwidgetremoved":this._mapWidgetRemoved(a.args.mapWidgetId);break;default:this._messageReceived(a)}};b.prototype._initializeResponseReceived=function(a){this.isNative=d.isNative;this._hostInitialized=!0;
this.portalHelperServices=a.helperServices;this.portalUrl=a.portalUrl;this.setupIdentityManager(a.usePortalServices);this._setConfig(a.configuration);return(new e).resolve()};b.prototype._isHostInitialized=function(){return this._hostInitialized};b.prototype._hostReady=function(){this.hostReady();this.emit("host-ready")};b.prototype.hostReady=function(){};b.prototype._hostInitializationError=function(a){this._hostInitialized=!1;this.hostInitializationError(a);this.emit("initialization-error",{error:a})};
b.prototype.hostInitializationError=function(a){};b.prototype.getMapWidgetProxies=function(){var a=this;return this._isHostInitialized()?this._mapWidgetProxies&&0<this._mapWidgetProxies.length?(new e).resolve(this._mapWidgetProxies):d._sendMessageWithReply({functionName:"getMapWidgets"}).then(function(c){a._mapWidgetProxies=c.mapWidgets.map(function(a){return new n(a)},a);return a._mapWidgetProxies}):(new e).reject(Error(f.hostNotReady))};b.prototype.getMapWidgetProxy=function(a){return this._isHostInitialized()?
a?this.getMapWidgetProxies().then(function(c){for(var b=0;b<c.length;b++)if(c[b].id===a)return c[b];return null}):(new e).reject(Error(f.invalidArguments)):(new e).reject(Error(f.hostNotReady))};b.prototype._mapWidgetRemoved=function(a){for(var b=0;b<this._mapWidgetProxies.length;b++)if(this._mapWidgetProxies[b].id===a){this._mapWidgetProxies.splice(b,1);break}this.mapWidgetRemoved(a);this.emit("map-widget-removed",{mapWidgetId:a})};b.prototype.mapWidgetRemoved=function(a){};b.prototype._mapWidgetAdded=
function(a){a=new n(a);this._mapWidgetProxies.push(a);this.mapWidgetAdded(a);this.emit("map-widget-added",{mapWidgetProxy:a})};b.prototype.mapWidgetAdded=function(a){};b.prototype.getDataSourceProxies=function(){var a=this;return this._isHostInitialized()?d._sendMessageWithReply({functionName:"getDataSources"}).then(function(b){a._dataSourceProxies=[];return b.dataSources.map(function(b){var c=new h(b);return a._dataSourceProxies[b.id]=c})}):(new e).reject(Error(f.hostNotReady))};b.prototype.getDataSourceProxy=
function(a){var b=this;if(!this._isHostInitialized())return(new e).reject(Error(f.hostNotReady));if(!a)return(new e).reject(Error(f.invalidArguments));var p=this._dataSourceProxies[a];return p?(new e).resolve(p):d._sendMessageWithReply({functionName:"getDataSource",args:{dataSourceId:a}}).then(function(a){var c=new h(a.dataSource);return b._dataSourceProxies[a.dataSource.id]=c})};b.prototype._dataSourceRemoved=function(a){for(var b=0;b<this._dataSourceProxies.length;b++)if(this._dataSourceProxies[b].id===
a){this._dataSourceProxies.splice(b,1);break}this.dataSourceRemoved(a);this.emit("data-source-removed",{dataSourceId:a})};b.prototype.dataSourceRemoved=function(a){};b.prototype._dataSourceAdded=function(a){var b=new h(a);this._dataSourceProxies[a.dataSourceId]=b;this.dataSourceAdded(b);this.emit("data-source-added",{dataSourceProxy:b})};b.prototype.dataSourceAdded=function(a){};b.prototype.setupIdentityManager=function(a){function b(a){return d._sendMessageWithReply({functionName:"getCredential",
args:{url:a}})}a&&(g.useSignInPage=!1,t.setRequestPreCallback(function(a){a.failOk=!0;return a}),g.signIn=function(a,c){var d=new e;b(a).then(function(a){a=new r(a.credential);a.refreshToken=function(){var a=this;return b(this.server).then(function(b){a.token=b.credential.token;a.expires=b.credential.expires?Number(b.credential.expires):null;a.creationTime=b.credential.creationTime;a.validity=b.credential.validity;a.onTokenChange()})};d.resolve(a)});(function(a){d.reject(a)});return d},g.setProtocolErrorHandler(function(){return!0}))};
l([m.shared("esri.opsdashboard.ExtensionBase")],b.prototype,"declaredClass",void 0);return b=l([m.subclass()],b)}(u)});