// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.5/esri/copyright.txt for details.
//>>built
define(["require","exports","dojo/keys"],function(g,c,d){function f(e){return function(a){for(var c=[],b=1;b<arguments.length;b++)c[b-1]=arguments[b];b=a.type;if(a instanceof KeyboardEvent||"keyup"===b||"keydown"===b||"keypress"===b){if(a.keyCode===d.ENTER||a.keyCode===d.SPACE)a.preventDefault(),a.target.click()}else e.call.apply(e,[this,a].concat(c))}}Object.defineProperty(c,"__esModule",{value:!0});c.accessibleHandler=function(){return function(c,a){return{value:f(c[a])}}}});