// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.5/esri/copyright.txt for details.
//>>built
define([],function(){var f=function(a,b){for(var c=["webgl","experimental-webgl","webkit-3d","moz-webgl"],d=null,e=0;e<c.length;++e){try{d=a.getContext(c[e],b)}catch(g){}if(d)break}return d};return{create3DContext:f,setupWebGL:function(a,b){function c(b){var c=a.parentNode;c&&(c.innerHTML='\x3ctable style\x3d"background-color: #8CE; width: 100%; height: 100%;"\x3e\x3ctr\x3e\x3ctd align\x3d"center"\x3e\x3cdiv style\x3d"display: table-cell; vertical-align: middle;"\x3e\x3cdiv style\x3d""\x3e'+b+"\x3c/div\x3e\x3c/div\x3e\x3c/td\x3e\x3c/tr\x3e\x3c/table\x3e")}
if(!window.WebGLRenderingContext)return c('This page requires a browser that supports WebGL.\x3cbr/\x3e\x3ca href\x3d"http://get.webgl.org"\x3eClick here to upgrade your browser.\x3c/a\x3e'),[null,'This page requires a browser that supports WebGL.\x3cbr/\x3e\x3ca href\x3d"http://get.webgl.org"\x3eClick here to upgrade your browser.\x3c/a\x3e'];b=f(a,b);return b?[b]:(c('It doesn\'t appear your computer can support WebGL.\x3cbr/\x3e\x3ca href\x3d"http://get.webgl.org/troubleshooting/"\x3eClick here for more information.\x3c/a\x3e'),
[null,'It doesn\'t appear your computer can support WebGL.\x3cbr/\x3e\x3ca href\x3d"http://get.webgl.org/troubleshooting/"\x3eClick here for more information.\x3c/a\x3e'])},detectWebGL:function(){var a;try{a=window.WebGLRenderingContext}catch(c){a=[!1,0]}var b;try{b=f(document.createElement("canvas"))}catch(c){b=[!1,1]}a?b?(a=b,a=[!0,{VERSION:a.getParameter(a.VERSION),SHADING_LANGUAGE_VERSION:a.getParameter(a.SHADING_LANGUAGE_VERSION),VENDOR:a.getParameter(a.VENDOR),RENDERER:a.getParameter(a.RENDERER),
EXTENSIONS:a.getSupportedExtensions(),MAX_TEXTURE_SIZE:a.getParameter(a.MAX_TEXTURE_SIZE),MAX_RENDERBUFFER_SIZE:a.getParameter(a.MAX_RENDERBUFFER_SIZE),MAX_VERTEX_TEXTURE_IMAGE_UNITS:a.getParameter(a.MAX_VERTEX_TEXTURE_IMAGE_UNITS)}]):a=[!1,1]:a=[!1,0];return a}}});