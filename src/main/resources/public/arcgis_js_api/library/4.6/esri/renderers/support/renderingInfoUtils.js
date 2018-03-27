// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.6/esri/copyright.txt for details.
//>>built
define(["require","exports"],function(m,h){function k(b,c){if(!b||b.symbol)return null;c=c.renderer;return b&&c&&c.getObservationRenderer?c.getObservationRenderer(b):c}function l(b,c){if(b.symbol)return b.symbol;var a=k(b,c);return a&&a.getSymbol(b,c)}Object.defineProperty(h,"__esModule",{value:!0});h.getRenderer=k;h.getSymbol=l;h.getRenderingInfo=function(b,c){var a=k(b,c),e=l(b,c);if(!e)return null;e={renderer:a,symbol:e};if(a){a.colorInfo&&(e.color=a.getColor(b).toRgba());if(a.sizeInfo){var d=
a.getSize(b);e.size=[d,d,d]}if(a.visualVariables){b=a.getVisualVariableValues(b,c);d=["proportional","proportional","proportional"];for(c=0;c<b.length;c++){var f=b[c],a=f.variable,g=f.value;"color"===a.type?e.color=g.toRgba():"size"===a.type?"outline"===a.target?e.outlineSize=g:(f=a.axis,a=a.useSymbolValue?"symbolValue":g,"width"===f?d[0]=a:"depth"===f?d[1]=a:"height"===f?d[2]=a:d[0]="width-and-depth"===f?d[1]=a:d[1]=d[2]=a):"opacity"===a.type?e.opacity=g:"rotation"===a.type&&"tilt"===a.axis?e.tilt=
g:"rotation"===a.type&&"roll"===a.axis?e.roll=g:"rotation"===a.type&&(e.heading=g)}if(isFinite(d[0])||isFinite(d[1])||isFinite(d[2]))e.size=d}}return e}});