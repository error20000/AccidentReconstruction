// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.5/esri/copyright.txt for details.
//>>built
define("require exports ../../core/tsSupport/declareExtendsHelper ../../core/tsSupport/decorateHelper ../../core/accessorSupport/decorators ../support/widget ../Widget ./PopupRendererViewModel ../../core/requireUtils ../support/uriUtils dojo/i18n!./nls/PopupRenderer ../../core/watchUtils".split(" "),function(v,A,w,l,k,d,r,t,x,y,n,z){function e(d,b){return void 0===b?"esri-popup-renderer__"+d:"esri-popup-renderer__"+d+"-"+b}return function(u){function b(a){a=u.call(this)||this;a._chartMap=new Map;
a._activeMediaMap=new Map;a._chartRequirePromise=null;a._refreshTimers=new Map;a._mediaInfo=new Map;a.contentEnabled=null;a.graphic=null;a.title=null;a.view=null;a.viewModel=new t;return a}w(b,u);b.prototype.postInitialize=function(){var a=this;this.own(z.init(this,"viewModel.content",function(){return a._setupMediaRefreshTimers()}))};b.prototype.destroy=function(){this._clearMediaRefreshTimers();this._activeMediaMap.clear();this._activeMediaMap=null;this._cancelChartModules();this._destroyCharts()};
b.prototype.render=function(){var a=d.tsx("div",{key:e("loading-container"),class:"esri-popup-renderer__loading-container"},d.tsx("span",{class:d.join("esri-icon-loading-indicator esri-rotating","esri-popup-renderer__loading-spinner")})),a=this.viewModel.waitingForContent?a:this._renderContent();return d.tsx("div",{class:"esri-popup-renderer"},d.tsx("div",{class:"esri-popup-renderer__size-container"},d.tsx("div",{class:"esri-popup-renderer__main-container"},a)))};b.prototype.goToMedia=function(a,
c){this._setContentElementMedia(a,c)};b.prototype.nextMedia=function(a){this._pageContentElementMedia(a,"next")};b.prototype.previousMedia=function(a){this._pageContentElementMedia(a,"previous")};b.prototype._cancelChartModules=function(){this._chartRequirePromise&&this._chartRequirePromise.cancel()};b.prototype._destroyChart=function(a){var c=this._chartMap.get(a);c&&(c.chart.destroy(),c.tooltip.destroy());this._chartMap.delete(a)};b.prototype._destroyCharts=function(){this._chartMap.forEach(function(a){a.chart.destroy();
a.tooltip.destroy()});this._chartMap.clear()};b.prototype._renderContent=function(){this._destroyCharts();var a=this.viewModel.content;if("string"===typeof a)return d.tsx("div",{key:e("content-string"),innerHTML:a});if(a&&a.isInstanceOf&&a.isInstanceOf(r))return d.tsx("div",{key:e("content-widget")},a.render());if(a instanceof HTMLElement)return d.tsx("div",{key:e("content-html-element"),bind:a,afterUpdate:this._attachToNode,afterCreate:this._attachToNode});if(a&&"function"===typeof a.postMixInProperties&&
"function"===typeof a.buildRendering&&"function"===typeof a.postCreate&&"function"===typeof a.startup)return d.tsx("div",{key:e("content-dijit"),bind:a.domNode,afterUpdate:this._attachToNode,afterCreate:this._attachToNode});if(Array.isArray(a))return a.length?d.tsx("div",{key:e("content-content-elements")},a.map(this._renderContentElement,this)):null};b.prototype._renderContentElement=function(a,c){var f=this.viewModel.contentTypes;switch(a.type){case f.attachments:return this._renderAttachments(a,
c);case f.fields:return this._renderFields(a,c);case f.media:return this._renderMedia(a,c);case f.text:return this._renderText(a,c);default:return null}};b.prototype._renderAttachmentInfo=function(a,c){return d.tsx("li",{class:"esri-popup-renderer__attachments-item",key:e("attachment",c)},d.tsx("a",{class:"esri-popup-renderer__attachments-item-link",href:a.url,target:"_blank"},d.tsx("span",{class:d.join("esri-icon-download","esri-popup-renderer__attachments-item-icon")}),d.tsx("span",{class:"esri-popup-renderer__attachments-item-title"},
a.name||n.noTitle)))};b.prototype._renderAttachments=function(a,c){return(a=a.attachmentInfos)&&a.length?d.tsx("div",{key:e("attachments-element"),class:d.join("esri-popup-renderer__attachments","esri-popup-renderer__content-element")},d.tsx("div",{class:"esri-popup-renderer__attachments-title"},n.attach),d.tsx("ul",{class:"esri-popup-renderer__attachments-items"},a.map(this._renderAttachmentInfo))):null};b.prototype._renderFieldInfo=function(a,c){var f=this.viewModel,b=f.formattedAttributes.content[c]||
f.formattedAttributes.global,m=a.fieldName,f=a.label||m;a=!(!a.format||!a.format.dateFormat);b=y.autoLink(null==b[m]?"":b[m]);a=(g={},g["esri-popup-renderer__field-data--date"]=a,g);return d.tsx("tr",{key:e("fields-element-info-row",c)},d.tsx("th",{key:e("fields-element-info-row-header",c),class:"esri-popup-renderer__field-header",innerHTML:f}),d.tsx("td",{key:e("fields-element-info-row-data",c),class:"esri-popup-renderer__field-data",classes:a,innerHTML:b}));var g};b.prototype._renderFields=function(a,
c){var f=this;return(a=a.fieldInfos)?d.tsx("div",{key:e("fields-element",c),class:d.join("esri-popup-renderer__fields","esri-popup-renderer__content-element")},d.tsx("table",{summary:n.fieldsSummary,key:e("fields-element-table",c)},d.tsx("tbody",{key:e("fields-element-table-body",c)},a.map(function(a){return f._renderFieldInfo(a,c)})))):null};b.prototype._shouldOpenInNewTab=function(a){void 0===a&&(a="");return!/^(?:mailto:|tel:)/.test(a.trim().toLowerCase())};b.prototype._clearMediaRefreshTimers=
function(){this._refreshTimers.forEach(function(a){return clearTimeout(a)});this._refreshTimers.clear()};b.prototype._clearMediaRefreshTimer=function(a){var c=this._refreshTimers.get(a);c&&(clearTimeout(c),this._refreshTimers.delete(a))};b.prototype._getImageSource=function(a,c){var f=-1!==a.indexOf("?")?"\x26":"?";a=a.split("#");var d=a[1],d=void 0===d?"":d;return""+a[0]+f+"timestamp\x3d"+c+(d?"#":"")+d};b.prototype._setupMediaRefreshTimer=function(a){var c=this.get("viewModel.content");if(Array.isArray(c)&&
(c=c[a])&&"media"===c.type){var f=this._activeMediaMap.get(a);isNaN(f)&&(f=0);(c=c.mediaInfos[f])&&"image"===c.type&&c.refreshInterval&&this._setRefreshTimeout(a,c)}};b.prototype._setupMediaRefreshTimers=function(){var a=this;this._clearMediaRefreshTimers();var c=this.get("viewModel.content");Array.isArray(c)&&c.forEach(function(c,d){return a._setupMediaRefreshTimer(d)})};b.prototype._updateMediaInfoTimestamp=function(a,c){var d=Date.now();this._mediaInfo.set(c,{timestamp:d,sourceURL:this._getImageSource(a,
d)});this.scheduleRender()};b.prototype._setRefreshTimeout=function(a,c){var d=this,b=c.refreshInterval,e=c.value;b&&(c=6E4*b,this._updateMediaInfoTimestamp(e.sourceURL,a),c=setInterval(function(){d._updateMediaInfoTimestamp(e.sourceURL,a)},c),this._refreshTimers.set(a,c))};b.prototype._renderMediaInfoType=function(a,c){var f=a.value,b=a.title,b=void 0===b?"":b,m=a.type,g=a.refreshInterval,h=f.sourceURL,f=f.linkURL;if("image"===m)return a=this._shouldOpenInNewTab(f)?"_self":"_blank",h=(g=g?this._mediaInfo.get(c):
null)?g.sourceURL:h,c=d.tsx("img",{alt:b,key:e("media-image-"+(g?g.timestamp:0),c),src:h}),(b=f?d.tsx("a",{title:b,href:f,target:a},c):null)?b:c;if(-1!==m.indexOf("chart"))return d.tsx("div",{key:e("chart",c),bind:this,"data-media-info":a,"data-content-element-index":c,class:"esri-popup-renderer__media-chart",afterCreate:this._getChartDependencies,afterUpdate:this._getChartDependencies})};b.prototype._getChartDependencies=function(a){var c=this,d=a["data-media-info"],b=a["data-content-element-index"],
e=d.value,g=e.theme||"Claro",h=d.type,d=["dojox/charting/Chart2D","dojox/charting/action2d/Tooltip"],q=g;"string"===typeof g&&(q=g.replace(/\./g,"/"),-1===q.indexOf("/")&&(q="dojox/charting/themes/"+q));d.push(q);this._cancelChartModules();this._chartRequirePromise=x.when(v,d).then(function(d){c._renderChart(a,b,h,e,d[0],d[1],d[2]);c._chartRequirePromise=null})};b.prototype._renderChart=function(a,c,d,b,e,g,h){a=new e(a,{margins:{l:4,t:4,r:4,b:4}});h&&a.setTheme(h);switch(d){case "pie-chart":a.addPlot("default",
{type:"Pie",labels:!1});a.addSeries("Series A",b.fields);break;case "line-chart":a.addPlot("default",{type:"Markers"});a.addAxis("x",{min:0,majorTicks:!1,minorTicks:!1,majorLabels:!1,minorLabels:!1});a.addAxis("y",{includeZero:!0,vertical:!0,fixUpper:"minor"});b.fields.forEach(function(a,c){a.x=c+1});a.addSeries("Series A",b.fields);break;case "column-chart":a.addPlot("default",{type:"Columns",gap:3});a.addAxis("y",{includeZero:!0,vertical:!0,fixUpper:"minor"});a.addSeries("Series A",b.fields);break;
case "bar-chart":a.addPlot("default",{type:"Bars",gap:3}),a.addAxis("x",{includeZero:!0,fixUpper:"minor",minorLabels:!1}),a.addAxis("y",{vertical:!0,majorTicks:!1,minorTicks:!1,majorLabels:!1,minorLabels:!1}),a.addSeries("Series A",b.fields)}d=new g(a);a.render();this._chartMap.set(c,{chart:a,tooltip:d})};b.prototype._renderMediaInfo=function(a,c){this._destroyChart(c);var b=this._renderMediaInfoType(a,c),p=a.title?d.tsx("div",{key:e("media-title",c),class:"esri-popup-renderer__media-item-title",
innerHTML:a.title}):null;a=a.caption?d.tsx("div",{key:e("media-caption",c),class:"esri-popup-renderer__media-item-caption",innerHTML:a.caption}):null;return d.tsx("div",{key:e("media-container",c),class:"esri-popup-renderer__media-item-container"},d.tsx("div",{key:e("media-item-container",c),class:"esri-popup-renderer__media-item"},b),p,a)};b.prototype._renderMediaStatsItem=function(a,c,b){b="chart"===b?d.join("esri-popup-renderer__media-chart-icon","esri-icon-chart"):d.join("esri-popup-renderer__media-image-icon",
"esri-icon-media");return d.tsx("li",{class:"esri-popup-renderer__media-image-summary"},d.tsx("span",{class:"esri-popup-renderer__media-count","aria-label":a},"("+c+")"),d.tsx("span",{"aria-hidden":"true",class:b}))};b.prototype._renderMediaPageButton=function(a,c){var b=(a="previous"===a)?n.previous:n.next,p=a?d.join("esri-popup-renderer__button","esri-popup-renderer__media-previous"):d.join("esri-popup-renderer__button","esri-popup-renderer__media-next"),m=a?d.join("esri-popup-renderer__icon","esri-popup-renderer__media-previous-icon",
"esri-icon-left-triangle-arrow"):d.join("esri-popup-renderer__icon","esri-popup-renderer__media-next-icon","esri-icon-right-triangle-arrow"),g=a?d.join("esri-popup-renderer__icon","esri-popup-renderer__media-previous-icon--rtl","esri-icon-right-triangle-arrow"):d.join("esri-popup-renderer__icon","esri-popup-renderer__media-next-icon--rtl","esri-icon-left-triangle-arrow"),h=a?this._previousClick:this._nextClick;return d.tsx("div",{key:e(a?"previous":"next",c),title:b,tabIndex:0,role:"button",class:p,
"data-content-element-index":c,bind:this,onkeydown:h,onclick:h},d.tsx("span",{"aria-hidden":"true",class:m}),d.tsx("span",{"aria-hidden":"true",class:g}),d.tsx("span",{class:"esri-icon-font-fallback-text"},b))};b.prototype._renderMedia=function(a,c){a=a.mediaInfos;var b=this._getMediaStats(a),p=b.total,m=(g={},g["esri-popup-renderer--media-pagination-visible"]=1<b.total,g),g=this._renderMediaStatsItem(n.numImages,b.images,"image"),b=this._renderMediaStatsItem(n.numCharts,b.charts,"chart"),h=this._renderMediaPageButton("previous",
c),l=this._renderMediaPageButton("next",c),k=this._activeMediaMap.get(c);isNaN(k)&&(this._activeMediaMap.set(c,0),k=0);return p?d.tsx("div",{key:e("media-element",c),class:d.join("esri-popup-renderer__media","esri-popup-renderer__content-element"),classes:m},d.tsx("ul",{class:"esri-popup-renderer__media-summary"},g,b),d.tsx("div",{key:e("media-element-container",c),class:"esri-popup-renderer__media-container"},h,this._renderMediaInfo(a[k],c),l)):null;var g};b.prototype._renderText=function(a,c){return a.text?
d.tsx("div",{key:e("text-element",c),innerHTML:a.text,class:d.join("esri-popup-renderer__text","esri-popup-renderer__content-element")}):null};b.prototype._attachToNode=function(a){a.appendChild(this)};b.prototype._getMediaStats=function(a){var c=0,b=0;a.forEach(function(a){a=a.type;"image"===a?c++:-1!==a.indexOf("chart")&&b++});return{total:b+c,images:c,charts:b}};b.prototype._setContentElementMedia=function(a,c){this._clearMediaRefreshTimer(a);var b=this.viewModel.content;(b=(b=b&&b[a])&&b.mediaInfos)&&
b.length&&(this._activeMediaMap.set(a,(c+b.length)%b.length),this._setupMediaRefreshTimer(a),this.scheduleRender())};b.prototype._pageContentElementMedia=function(a,b){b="previous"===b?-1:1;b=this._activeMediaMap.get(a)+b;this._setContentElementMedia(a,b)};b.prototype._previousClick=function(a){this.previousMedia(a.currentTarget["data-content-element-index"])};b.prototype._nextClick=function(a){this.nextMedia(a.currentTarget["data-content-element-index"])};l([k.aliasOf("viewModel.contentEnabled")],
b.prototype,"contentEnabled",void 0);l([k.aliasOf("viewModel.graphic")],b.prototype,"graphic",void 0);l([k.aliasOf("viewModel.title")],b.prototype,"title",void 0);l([k.aliasOf("viewModel.view")],b.prototype,"view",void 0);l([k.property({type:t}),d.renderable(["viewModel.waitingForContent","viewModel.content"])],b.prototype,"viewModel",void 0);l([d.accessibleHandler()],b.prototype,"_previousClick",null);l([d.accessibleHandler()],b.prototype,"_nextClick",null);return b=l([k.subclass("esri.widgets.Popup.PopupRenderer")],
b)}(k.declared(r))});