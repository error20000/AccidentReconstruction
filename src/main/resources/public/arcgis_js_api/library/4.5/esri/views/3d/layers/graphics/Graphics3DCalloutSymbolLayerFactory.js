// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.5/esri/copyright.txt for details.
//>>built
define(["require","exports","../../../../core/Logger","../../../../symbols/callouts/calloutUtils","./Graphics3DLineCalloutSymbolLayer"],function(k,b,e,f,g){Object.defineProperty(b,"__esModule",{value:!0});var c=e.getLogger("esri.views.3d.layers.graphics.Graphics3DCalloutSymbolLayerFactory");b.make=function(a,b){if(!f.isCalloutSupport(a))return c.error("Graphics3DCalloutSymbolLayerFactory#make","symbol of type '"+a.type+"' does not support callouts"),null;if(!a.callout)return null;var d=h[a.callout.type];
return d?new d(a,b):(c.error("Graphics3DCalloutSymbolLayerFactory#make","unknown or unsupported callout type "+a.callout.type),null)};var h={line:g}});