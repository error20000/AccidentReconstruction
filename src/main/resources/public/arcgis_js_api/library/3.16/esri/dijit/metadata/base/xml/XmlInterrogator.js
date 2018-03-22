// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.16/esri/copyright.txt for details.
//>>built
define("esri/dijit/metadata/base/xml/XmlInterrogator","dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/has ./XmlFlattener ./xmlUtil ../../../../kernel".split(" "),function(m,n,k,p,q,r,s){m=m(null,{constructor:function(a){n.mixin(this,a)},interrogate:function(a,g){var b=(new q).flatten(a),h=b.prefixesByUri,c=b.valuesByPath,d={};k.forEach(g,function(e){var a=e.interrogationRules;if(a&&0!==a.length){var l=r.makeGxeUrisByPrefix(e.getNamespaces());e=e.key;var g=a.length,b=0,f=!1;k.forEach(a,function(d){var e=
d.path;e&&(e=this._transformPath(h,l,e),(d=this._evaluateMatch(c,e,d))?b++:a.must&&(f=!0))},this);!f&&0<b&&(d[e]={nRules:g,nRulesMatched:b})}},this);var f=null,l=0;k.forEach(g,function(a){var b=a.key,c=null;b in d&&(c=d[b],null===f?(f=a,l=c.nRulesMatched):c.nRulesMatched>l&&c.nRules===c.nRulesMatched&&(f=a,l=c.nRulesMatched))});return f},_evaluateMatch:function(a,g,b){var h=!1,c=null;"undefined"!==typeof b.value&&(c=b.value);if(g in a){if(null===c)return!0;a=a[g];h=k.some(a,function(a){return c===
a})}return h},_transformPath:function(a,g,b){var h=[],c,d,f;k.forEach(b.split("/"),function(b){var e=-1!==b.indexOf("@");c=b.replace("@","").split(":");2===c.length?(d=null,(f=g[c[0]])&&(d=a[f]),d?(e&&(d="@"+d),h.push(d+":"+c[1])):h.push(b)):h.push(b)});return h.join("/")}});p("extend-esri")&&n.setObject("dijit.metadata.base.xml.XmlInterrogator",m,s);return m});