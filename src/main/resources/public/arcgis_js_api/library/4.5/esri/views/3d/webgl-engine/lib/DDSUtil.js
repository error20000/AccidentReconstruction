// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.5/esri/copyright.txt for details.
//>>built
define(["require","exports","../../../webgl/Texture","../../../webgl/enums"],function(u,g,p,v){function f(b){return b.charCodeAt(0)+(b.charCodeAt(1)<<8)+(b.charCodeAt(2)<<16)+(b.charCodeAt(3)<<24)}Object.defineProperty(g,"__esModule",{value:!0});var q=f("DXT1"),r=f("DXT3"),t=f("DXT5");g.createDDSTexture=function(b,d,f,e){var a=new Int32Array(f,0,31);if(542327876!==a[0])return console.error("Invalid magic number in DDS header"),null;if(!(a[20]&4))return console.error("Unsupported format, must contain a FourCC code"),
null;var c=a[21],l;switch(c){case q:c=8;l=33776;break;case r:c=16;l=33778;break;case t:c=16;l=33779;break;default:return console.error("Unsupported FourCC code:",String.fromCharCode(c&255,c>>8&255,c>>16&255,c>>24&255)),null}var h=1;a[2]&131072&&!1!==e&&(h=Math.max(1,a[7]));e=a[4];var k=a[3],g=a[1]+4,n,m;d.samplingMode=1<h?9987:9729;d.hasMipmap=1<h;d.width=a[4];d.height=a[3];d=new p(b,d);b.bindTexture(d);for(a=0;;++a){a<h&&(m=Math.floor((e+3)/4)*Math.floor((k+3)/4)*c,n=new Uint8Array(f,g,m));b.gl.compressedTexImage2D(b.gl.TEXTURE_2D,
a,l,e,k,0,n);g+=m;if(1===e&&1===k||1===h)break;e=Math.max(1,e>>1);k=Math.max(1,k>>1)}return d}});