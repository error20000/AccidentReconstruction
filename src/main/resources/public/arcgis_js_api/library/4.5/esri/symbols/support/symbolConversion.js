// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.5/esri/copyright.txt for details.
//>>built
define("require exports dojo/_base/lang ../../core/lang ../../core/Error ../Font ../SimpleLineSymbol ../SimpleMarkerSymbol ../PictureMarkerSymbol ../SimpleFillSymbol ../TextSymbol ../WebStyleSymbol ../Symbol3D ../LineSymbol3D ../PointSymbol3D ../PolygonSymbol3D ../LabelSymbol3D ../LineSymbol3DLayer ../IconSymbol3DLayer ../FillSymbol3DLayer ../TextSymbol3DLayer ../../Color".split(" "),function(G,g,k,r,t,u,v,e,l,w,x,y,m,z,n,A,B,C,D,E,F,p){function q(a){var e=a.color?a.color.clone():new p([255,255,255]),
c,b,f;a instanceof l?(a.color&&0===a.color.r&&0===a.color.g&&0===a.color.b&&(e=new p([255,255,255])),c={href:a.url},b=a.width<=a.height?a.height:a.width):(c=a.style,c in d?c=d[c]:(console.log(c+' cannot be mapped to Icon symbol. Fallback to "circle"'),c="circle"),c={primitive:c},b=a.size,a.outline&&a.outline.color&&0<a.outline.width&&(f={size:a.outline.width,color:a.outline.color.clone()}));return new n(new D({size:b,resource:c,material:{color:e},outline:f}))}Object.defineProperty(g,"__esModule",
{value:!0});var d={};d[e.STYLE_CIRCLE]="circle";d[e.STYLE_CROSS]="cross";d[e.STYLE_DIAMOND]="kite";d[e.STYLE_SQUARE]="square";d[e.STYLE_X]="x";g.to3D=function(a,d,c,b){void 0===d&&(d=!1);void 0===c&&(c=!1);void 0===b&&(b=!0);if(!a)return{symbol:null};if(a instanceof m||a instanceof y)b=a.clone();else if(a instanceof v)b=new z(new C({size:a.width||1,material:{color:a.color?a.color.clone():[255,255,255]}}));else if(a instanceof e)b=q(a);else if(a instanceof l)b=q(a);else if(a instanceof w)b=new E({material:{color:a.color?
a.color.clone():[255,255,255]}}),a.outline&&a.outline.color&&(b.outline={size:a.outline.width||0,color:a.outline.color}),b=new A(b);else if(a instanceof x){var f=k.clone(u.defaultProps);a.font&&k.mixin(f,a.font);var h;h=a.haloColor;var g=a.haloSize;h=h&&0<g?{color:r.clone(h),size:g}:null;b=new (b?B:n)(new F({size:f.size,font:{family:f.family,weight:f.weight,style:f.style},halo:h,material:{color:a.color.clone()},text:a.text}))}else return{error:new t("symbol-conversion:unsupported-2d-symbol","2D symbol of type '"+
(a.type||a.declaredClass)+"' is unsupported in 3D",{symbol:a})};d&&(b.id=a.id);if(c&&b.isInstanceOf(m))for(a=0;a<b.symbolLayers.length;++a)b.symbolLayers.getItemAt(a)._ignoreDrivers=!0;return{symbol:b}}});