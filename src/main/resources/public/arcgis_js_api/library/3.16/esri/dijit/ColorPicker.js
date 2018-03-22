// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.16/esri/copyright.txt for details.
//>>built
require({cache:{"url:esri/dijit/ColorPicker/templates/ColorPicker.html":'\x3cdiv class\x3d"${css.container}"\x3e\r\n  \x3cdiv class\x3d"${css.header}" data-dojo-attach-point\x3d"dap_header"\x3e\r\n    \x3cspan class\x3d"${css.swatchPreview} ${css.container}"\x3e\r\n      \x3cspan class\x3d"${css.swatch} ${css.swatchTransparencyBackground}"\x3e\x3c/span\x3e\r\n      \x3cspan data-dojo-attach-point\x3d"dap_previewSwatch" class\x3d"${css.swatch}"\x3e\x3c/span\x3e\r\n    \x3c/span\x3e\r\n  \x3c/div\x3e\r\n  \x3cdiv class\x3d"${css.middle}"\x3e\r\n    \x3cdiv data-dojo-attach-point\x3d"dap_paletteContainer" class\x3d"${css.palette} ${css.container}"\x3e\r\n      \x3cdiv data-dojo-attach-point\x3d"dap_primaryPalette" class\x3d"${css.palette}"\x3e\x3c/div\x3e\x3c!--\r\n      --\x3e\x3cdiv data-dojo-attach-point\x3d"dap_secondaryPalette" class\x3d"${css.palette}"\x3e\x3c/div\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv class\x3d"${css.paletteOptions}"\x3e\r\n      \x3cinput type\x3d"text" data-dojo-type\x3d"dijit/form/TextBox" data-dojo-attach-point\x3d"dap_hexInput" class\x3d"${css.hexInput}"/\x3e\r\n      \x3cinput class\x3d"${css.paletteToggle}" type\x3d"button" data-dojo-type\x3d"dijit/form/ToggleButton" data-dojo-attach-point\x3d"dap_paletteToggle" label\x3d"${labels.more}"/\x3e\r\n    \x3c/div\x3e\r\n  \x3c/div\x3e\r\n  \x3cdiv class\x3d"${css.footer}" data-dojo-attach-point\x3d"dap_footer"\x3e\r\n    \x3cdiv class\x3d"${css.section}" data-dojo-attach-point\x3d"dap_suggestedColorSection"\x3e\r\n      \x3cdiv class\x3d"${css.label}"\x3e${labels.suggested}\x3c/div\x3e\r\n      \x3cdiv data-dojo-attach-point\x3d"dap_suggestedColorPalette" class\x3d"${css.suggested} ${css.palette} ${css.swatchRow}"\x3e\x3c/div\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv class\x3d"${css.section}" data-dojo-attach-point\x3d"dap_recentColorSection"\x3e\r\n      \x3cdiv class\x3d"${css.label}"\x3e${labels.recent}\x3c/div\x3e\r\n      \x3cdiv data-dojo-attach-point\x3d"dap_recentColorPalette" class\x3d"${css.recent} ${css.palette} ${css.swatchRow}"\x3e\x3c/div\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv class\x3d"${css.section}" data-dojo-attach-point\x3d"dap_transparencySection"\x3e\r\n      \x3cdiv data-dojo-attach-point\x3d"dap_transparencyLabel" class\x3d"${css.label}"\x3e${labels.transparency}\x3c/div\x3e\r\n      \x3cdiv class\x3d"${css.transparencySlider}"\r\n           data-dojo-attach-point\x3d"dap_transparencySlider"\r\n           data-dojo-type\x3d"esri/dijit/HorizontalSlider"\r\n           data-dojo-props\x3d"minimum: 0, maximum: 1, discreteValues: 100, labels: [\'0%\', \'50%\', \'100%\']"\x3e\r\n      \x3c/div\x3e\r\n    \x3c/div\x3e\r\n  \x3c/div\x3e\r\n\x3c/div\x3e\r\n'}});
define("esri/dijit/ColorPicker","../Color ../kernel ./_EventedWidget ./_Tooltip ./ColorPicker/colorUtil ./ColorPicker/HexPalette dijit/_TemplatedMixin dijit/_WidgetsInTemplateMixin dojo/_base/array dojo/_base/declare dojo/_base/lang dojo/dom-class dojo/dom-construct dojo/on dojo/query dojo/sniff dojo/dom-style dojo/i18n!../nls/jsapi dojo/text!./ColorPicker/templates/ColorPicker.html ./HorizontalSlider dijit/form/RadioButton dijit/form/TextBox dijit/form/ToggleButton dojo/NodeList-dom".split(" "),
function(p,u,q,v,d,s,w,x,k,y,h,g,l,m,r,t,n,z,A){q=y("esri.dijit.ColorPicker",[q,w,x,v],{_DEFAULT_COLORS_PER_ROW:13,templateString:A,labels:z.widgets.colorPicker,baseClass:"esriColorPicker",css:{container:"esriContainer",header:"esriHeader",footer:"esriFooter",middle:"esriMiddle",swatch:"esriSwatch",swatchRow:"esriSwatchRow",swatchEmpty:"esriSwatchEmpty",swatchPreview:"esriSwatchPreview",swatchTransparencyBackground:"esriSwatchTransparencyBackground",palette:"esriPalette",paletteOptions:"esriPaletteOptions",
paletteToggle:"esriPaletteToggle",label:"esriLabel",hexInput:"esriHexInput",recent:"esriRecent",suggested:"esriSuggested",selected:"esriSelected",disabled:"esriDisabled",section:"esriSection",displayNone:"esriDisplayNone",transparencySlider:"esriTransparencySlider",alt:"esriAlt"},color:null,trackColors:!0,_required:!1,_activePalette:null,recentColors:[],_showRecentColors:!0,_showTransparencySlider:!0,colorsPerRow:void 0,_brightsPalette:null,_pastelsPalette:null,_swatches:null,_colorInstance:null,
_swatchCreator:null,_noColorSwatchNode:null,constructor:function(a,b){a=a||{};this._colorInstance=new p;this._brightsPalette=new s({colors:a.palette});this._pastelsPalette=new s({colors:this._toPastels(this._brightsPalette.get("colors"))});this._activePalette=this._brightsPalette;this._swatchCreator=a.swatchCreator||this._createSwatch;a.hasOwnProperty("required")&&(this._required=a.required);a.hasOwnProperty("showRecentColors")&&(this._showRecentColors=a.showRecentColors);a.hasOwnProperty("showSuggestedColors")&&
(this._showSuggestedColors=a.showSuggestedColors);a.hasOwnProperty("showTransparencySlider")&&(this._showTransparencySlider=a.showTransparencySlider);a.color&&(a.color=d.normalizeColor(a.color));this.colorsPerRow=0<a.colorsPerRow?a.colorsPerRow:this._DEFAULT_COLORS_PER_ROW;this._swatches={}},_toPastels:function(a){var b=this._colorInstance,c=new p([238,238,238]);return k.map(a,function(a){return p.blendColors(b.setColor(a),c,0.2)},this)},_createSwatch:function(a){return l.create("span",{className:a.className,
style:{background:a.hexColor||"transparent"}},a.paletteNode)},_createSwatches:function(a,b){var c=this.css.swatch,f=this.css.swatchRow,e=this.colorsPerRow,d=b.get("colors"),g,h;k.forEach(d,function(b,d){0===d%e&&(g=l.create("div",{className:f},a));h=this._swatchCreator({className:c,hexColor:b,paletteNode:g});this._swatches[b]=h},this)},_selectColor:function(){var a=this.color||this._activePalette.get("colors")[0];this.set("color",a)},_setColorWithCurrentAlpha:function(a){"no-color"!==a&&"no-color"!==
this.color&&(a=d.normalizeColor(a),a.a=this.color.a);this.set("color",a)},_updatePreviewSwatch:function(a){var b=this.css.swatchEmpty,c=this.dap_previewSwatch,f,e;"no-color"===a?(g.add(c,b),n.set(c,{backgroundColor:"",borderColor:""})):(f=d.getContrastingColor(a),e=8!==t("ie"),g.remove(c,b),b=a.toCss(e),f=f.toCss(e),f={backgroundColor:b,borderColor:f},e||(f.opacity=a.a),n.set(c,f))},_showBrights:function(){g.remove(this.dap_paletteContainer,this.css.alt);this._activePalette=this._brightsPalette},
_showPastels:function(){g.add(this.dap_paletteContainer,this.css.alt);this._activePalette=this._pastelsPalette},_setColorFromSwatch:function(a){a=n.get(a,"backgroundColor");this._setColorWithCurrentAlpha(a)},_checkSelection:function(){var a=this.get("color");this._activePalette.contains(a)?this._highlightColor(a):this._clearSelection()},_addListeners:function(){var a="."+this.css.swatch;this.own(m(this.dap_paletteContainer,m.selector(a,"click"),h.hitch(this,function(a){this._setColorFromSwatch(a.target)})));
this.own(m(this.dap_recentColorPalette,m.selector(a,"click"),h.hitch(this,function(a){this._setColorFromSwatch(a.target)})));this.own(m(this.dap_suggestedColorPalette,m.selector(a,"click"),h.hitch(this,function(a){this._setColorFromSwatch(a.target)})));this._required||this.own(m(this._noColorSwatchNode,"click",h.hitch(this,function(a){this.set("color","no-color")})));var b=this.dap_hexInput;b.on("blur",h.hitch(this,function(){var a=d.normalizeHex(b.get("value"));d.isShorthandHex(a)?this._setColorWithCurrentAlpha(a):
this._silentlyUpdateHexInput(this.color)}));b.on("change",h.hitch(this,function(){var a=d.normalizeHex(b.get("value"));d.isLonghandHex(a)&&this.color.toHex()!==a&&this._setColorWithCurrentAlpha(a)}));this.dap_transparencySlider.on("change",h.hitch(this,function(a){var b=this.get("color");"no-color"!==b&&(b=d.normalizeColor(this._colorInstance.setColor(b)),b.a=1-a,this._updatePreviewSwatch(b),this._silentlyUpdateHexInput(b),this.set("color",b))}));this.dap_paletteToggle.on("change",h.hitch(this,this._togglePalette))},
_togglePalette:function(a){this.dap_paletteToggle.set("checked",a,!1);a?this._showPastels():this._showBrights();this._checkSelection()},postCreate:function(){this.inherited(arguments);this._addListeners();this._selectColor();this.dap_hexInput.intermediateChanges=!0;this.dap_transparencySlider.intermediateChanges=!0;this.createTooltips([{node:this.dap_paletteContainer,label:this.labels.paletteTooltip},{node:this.dap_hexInput,label:this.labels.hexInputTooltip},{node:this._noColorSwatchNode,label:this.labels.noColorTooltip},
{node:this.dap_paletteToggle,label:this.labels.moreColorsTooltip}])},buildRendering:function(){this.inherited(arguments);this._createPalettes();var a=this.css.swatch,b=this.css.swatchEmpty;this._required||(this._noColorSwatchNode=l.create("div",{className:a+" "+b},this.dap_hexInput.domNode,"after"));a=this.css.displayNone;this._showTransparencySlider||g.add(this.dap_transparencySection,a);this._showRecentColors||g.add(this.dap_recentColorSection,a);this._showSuggestedColors||g.add(this.dap_suggestedColorSection,
a)},_createPalettes:function(){this._swatches={};l.empty(this.dap_primaryPalette);l.empty(this.dap_secondaryPalette);this._createSwatches(this.dap_primaryPalette,this._brightsPalette);this._createSwatches(this.dap_secondaryPalette,this._pastelsPalette)},_silentlyUpdateHexInput:function(a){a="no-color"===a?"":a.toHex();this._silentlyUpdateIntermediateChangingValueWidget(this.dap_hexInput,a)},_silentlyUpdateIntermediateChangingValueWidget:function(a,b){a.intermediateChanges=!1;a.set("value",b,!1);a.intermediateChanges=
!0},addRecentColor:function(a){a&&"no-color"!==a&&this._addRecentColor(d.normalizeColor(a).toHex())},_addRecentColor:function(a){if(a){var b=this.recentColors,c=k.indexOf(b,a);-1<c&&b.splice(c,1);b.unshift(a);b.length>this.colorsPerRow&&b.pop();this._renderRecentSwatches()}},_renderRecentSwatches:function(){if(this.recentColors){var a=this.css.recent,b=this.css.swatch,c=r("."+a+"."+b,this.dap_recentColorPalette);k.forEach(this.recentColors,function(f,e){if(e<this.colorsPerRow){if(e+1>c.length){var d=
this._swatchCreator({hexColor:f,className:b+" "+a,paletteNode:this.dap_recentColorPalette});c.push(d)}n.set(c[e],"backgroundColor",f)}},this)}},_renderSuggestedSwatches:function(){if(this.suggestedColors){var a=this.css.suggested,b=this.css.swatch,c=r("."+a+"."+b,this.dap_recentColorPalette);k.forEach(this.suggestedColors,function(d,e){if(e<this.colorsPerRow){if(e+1>c.length){var g=this._swatchCreator({hexColor:d,className:b+" "+a,paletteNode:this.dap_suggestedColorPalette});c.push(g)}n.set(c[e],
"backgroundColor",d)}},this)}},_clearRecentSwatches:function(){l.empty(this.dap_recentColorPalette)},_clearSuggestedSwatches:function(){l.empty(this.dap_suggestedColorPalette)},_clearSelection:function(){var a=this.css.selected;r("."+a,this.dap_paletteContainer).removeClass(a)},_highlightColor:function(a){var b=this.css.selected,c=this._findColorSwatch(a);c&&(a=d.normalizeColor(a),a=d.getContrastingColor(a),g.add(c,b),n.set(c,"borderColor",a.toHex()))},_findColorSwatch:function(a){var b=this._activePalette.get("colors");
a=this._colorInstance.setColor(a).toHex();var c;-1<k.indexOf(b,a)&&(c=this._swatches[a]);return c},_getColorAttr:function(){return"no-color"===this.color?"no-color":new p(this.color)},_previousColor:null,_enableTransparencySlider:function(){g.remove(this.dap_transparencyLabel,this.css.disabled);this.dap_transparencySlider.set("disabled",!1)},_disableTransparencySlider:function(){g.add(this.dap_transparencyLabel,this.css.disabled);this.dap_transparencySlider.set("disabled",!0)},_setColorAttr:function(a,
b){a=a||"no-color";b=b||void 0===b;if(!this._required){if("no-color"===a){this._set("color","no-color");this._previousColor="no-color";this._disableTransparencySlider();this._clearSelection();this._silentlyUpdateHexInput("no-color");this._updatePreviewSwatch(a);g.add(this._noColorSwatchNode,this.css.selected);b&&this.emit("color-change",{color:"no-color"});return}this._enableTransparencySlider();g.remove(this._noColorSwatchNode,this.css.selected)}var c=d.normalizeColor(a),f=this._previousColor,e=
this._colorInstance,h=this.css.selected;if(f){if(d.equal(f,c))return;if(f=this._findColorSwatch(f))g.remove(f,h),n.set(f,"borderColor","")}e.setColor(c);h=e.toHex();this._set("color",new p(e));this._previousColor=c;this._silentlyUpdateIntermediateChangingValueWidget(this.dap_transparencySlider,1-e.a);this._updatePreviewSwatch(e);this._checkSelection();this._silentlyUpdateHexInput(e);this.trackColors&&this._addRecentColor(h);b&&this.emit("color-change",{color:new p(e)})},_getRecentColorsAttr:function(){return k.map(this.recentColors,
function(a){return d.normalizeColor(a)})},_setRecentColorsAttr:function(a){this.recentColors=a||[];this._showRecentColors&&(this.recentColors=k.map(this.recentColors,function(a){return d.normalizeColor(a).toHex()}));0===this.recentColors.length?this._clearRecentSwatches():this._renderRecentSwatches()},suggestedColors:null,_getSuggestedColorsAttr:function(){return k.map(this.suggestedColors,function(a){return d.normalizeColor(a)})},_setSuggestedColorsAttr:function(a){this._showSuggestedColors&&(this._clearSuggestedSwatches(),
this.suggestedColors=a||[],this.suggestedColors=k.map(this.suggestedColors,function(a){return d.normalizeColor(a).toHex()}),0<this.suggestedColors.length&&this._renderSuggestedSwatches())},_setPaletteAttr:function(a){var b=this._activePalette===this._brightsPalette;this._brightsPalette.set("colors",a);this._pastelsPalette.set("colors",this._toPastels(this._brightsPalette.get("colors")));this._activePalette=b?this._brightsPalette:this._pastelsPalette;this._createPalettes();this._togglePalette(!b)},
saveRecentColors:function(a){localStorage.setItem(a,JSON.stringify(this.get("recentColors")))},loadRecentColors:function(a){this.set("recentColors",JSON.parse(localStorage.getItem(a)))}});q.NO_COLOR="no-color";t("extend-esri")&&h.setObject("dijit.ColorPicker",q,u);return q});