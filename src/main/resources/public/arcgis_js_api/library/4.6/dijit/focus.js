//>>built
define("dojo/aspect dojo/_base/declare dojo/dom dojo/dom-attr dojo/dom-class dojo/dom-construct dojo/Evented dojo/_base/lang dojo/on dojo/domReady dojo/sniff dojo/Stateful dojo/_base/window dojo/window ./a11y ./registry ./main".split(" "),function(n,w,p,x,y,q,z,h,k,A,B,C,D,r,E,l,m){var t,u,c=new (w([C,z],{curNode:null,activeStack:[],constructor:function(){var a=h.hitch(this,function(a){p.isDescendant(this.curNode,a)&&this.set("curNode",null);p.isDescendant(this.prevNode,a)&&this.set("prevNode",null)});
n.before(q,"empty",a);n.before(q,"destroy",a)},registerIframe:function(a){return this.registerWin(a.contentWindow,a)},registerWin:function(a,f){var e=this,b=a.document&&a.document.body;if(b){var v=k(a.document,"pointerdown",function(a){a&&a.target&&null==a.target.parentNode||e._onTouchNode(f||a.target,"mouse")}),d=k(b,"focusin",function(a){if(a.target.tagName){var b=a.target.tagName.toLowerCase();"#document"!=b&&"body"!=b&&(E.isFocusable(a.target)?e._onFocusNode(f||a.target):e._onTouchNode(f||a.target))}}),
c=k(b,"focusout",function(a){e._onBlurNode(f||a.target)});return{remove:function(){v.remove();d.remove();c.remove();b=v=d=c=null}}}},_onBlurNode:function(a){a=(new Date).getTime();a<t+100||(this._clearFocusTimer&&clearTimeout(this._clearFocusTimer),this._clearFocusTimer=setTimeout(h.hitch(this,function(){this.set("prevNode",this.curNode);this.set("curNode",null)}),0),this._clearActiveWidgetsTimer&&clearTimeout(this._clearActiveWidgetsTimer),a<u+100||(this._clearActiveWidgetsTimer=setTimeout(h.hitch(this,
function(){delete this._clearActiveWidgetsTimer;this._setStack([])}),0)))},_onTouchNode:function(a,f){u=(new Date).getTime();this._clearActiveWidgetsTimer&&(clearTimeout(this._clearActiveWidgetsTimer),delete this._clearActiveWidgetsTimer);y.contains(a,"dijitPopup")&&(a=a.firstChild);var e=[];try{for(;a;){var b=x.get(a,"dijitPopupParent");if(b)a=l.byId(b).domNode;else if(a.tagName&&"body"==a.tagName.toLowerCase()){if(a===D.body())break;a=r.get(a.ownerDocument).frameElement}else{var c=a.getAttribute&&
a.getAttribute("widgetId"),d=c&&l.byId(c);!d||"mouse"==f&&d.get("disabled")||e.unshift(c);a=a.parentNode}}}catch(F){}this._setStack(e,f)},_onFocusNode:function(a){a&&9!=a.nodeType&&(t=(new Date).getTime(),this._clearFocusTimer&&(clearTimeout(this._clearFocusTimer),delete this._clearFocusTimer),this._onTouchNode(a),a!=this.curNode&&(this.set("prevNode",this.curNode),this.set("curNode",a)))},_setStack:function(a,c){var e=this.activeStack,b=e.length-1,f=a.length-1;if(a[f]!=e[b]){this.set("activeStack",
a);var d;for(d=b;0<=d&&e[d]!=a[d];d--)if(b=l.byId(e[d]))b._hasBeenBlurred=!0,b.set("focused",!1),b._focusManager==this&&b._onBlur(c),this.emit("widget-blur",b,c);for(d++;d<=f;d++)if(b=l.byId(a[d]))b.set("focused",!0),b._focusManager==this&&b._onFocus(c),this.emit("widget-focus",b,c)}},focus:function(a){if(a)try{a.focus()}catch(f){}}}));A(function(){var a=c.registerWin(r.get(document));B("ie")&&k(window,"unload",function(){a&&(a.remove(),a=null)})});m.focus=function(a){c.focus(a)};for(var g in c)/^_/.test(g)||
(m.focus[g]="function"==typeof c[g]?h.hitch(c,g):c[g]);c.watch(function(a,c,e){m.focus[a]=e});return c});