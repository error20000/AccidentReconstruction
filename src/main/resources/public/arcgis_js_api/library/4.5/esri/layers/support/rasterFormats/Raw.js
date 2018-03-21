// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.5/esri/copyright.txt for details.
//>>built
define([],function(){return{decodeBIP:function(b,a){var f=a.pixelType,e=a.bandCount,g=[],d=a.width*a.height,c=this.getBandCount(b,a),e=e||c,h=b.byteLength-b.byteLength%(d*this._getPixelLength(f)),l=new f(b,0,d*c),m,k,p,n;for(m=0;m<e;m++){n=new f(d);for(k=0;k<d;k++)n[k]=l[k*c+m];g.push(n)}h<b.byteLength-1&&(p=this._decodeMask(b.slice(h),a));return{pixels:g,mask:p}},decodeBSQ:function(b,a){var f=a.pixelType,e=a.bandCount;if(void 0===e||null===e)e=this.getBandCount(b,a);for(var g=[],d=a.width*a.height,
c=d*e,h=b.byteLength-b.byteLength%(d*this._getPixelLength(f)),f=new f(b,0,c),l,c=0;c<e;c++)g.push(f.subarray(c*d,(c+1)*d));h<b.byteLength-1&&(l=this._decodeMask(b.slice(h),a));return{pixels:g,mask:l}},getBandCount:function(b,a){return Math.floor(b.byteLength/(a.width*a.height*this._getPixelLength(a.pixelType)))},_getPixelLength:function(b){var a=1;switch(b){case Uint8Array:case Int8Array:case Uint8ClampedArray:a=1;break;case Uint16Array:case Int16Array:a=2;break;case Uint32Array:case Int32Array:case Float32Array:a=
4;break;case Float64Array:a=8}return a},_decodeMask:function(b,a){var f=a.width*a.height;if(8*b.byteLength<f)return null;b=new Uint8Array(b,0,Math.ceil(f/8));a=new Uint8Array(a.width*a.height);for(var e=0,g=0,d=0,c=0,d=0;d<b.length-1;d++)for(g=b[d],c=7;0<=c;c--)a[e++]=g>>c&1;for(c=7;e<f-1;)g=b[b.length-1],a[e++]=g>>c&1,c--;return a}}});