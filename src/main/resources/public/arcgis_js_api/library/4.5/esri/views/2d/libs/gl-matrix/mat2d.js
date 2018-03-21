// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.5/esri/copyright.txt for details.
//>>built
define(["./common"],function(d){var m=d.GLMAT_ARRAY_TYPE;d={create:function(){var a=new m(6);a[0]=1;a[1]=0;a[2]=0;a[3]=1;a[4]=0;a[5]=0;return a},clone:function(a){var b=new m(6);b[0]=a[0];b[1]=a[1];b[2]=a[2];b[3]=a[3];b[4]=a[4];b[5]=a[5];return b},copy:function(a,b){a[0]=b[0];a[1]=b[1];a[2]=b[2];a[3]=b[3];a[4]=b[4];a[5]=b[5];return a},identity:function(a){a[0]=1;a[1]=0;a[2]=0;a[3]=1;a[4]=0;a[5]=0;return a},invert:function(a,b){var c=b[0],l=b[1],f=b[2],g=b[3],h=b[4];b=b[5];var e=c*g-l*f;if(!e)return null;
e=1/e;a[0]=g*e;a[1]=-l*e;a[2]=-f*e;a[3]=c*e;a[4]=(f*b-g*h)*e;a[5]=(l*h-c*b)*e;return a},determinant:function(a){return a[0]*a[3]-a[1]*a[2]},multiply:function(a,b,c){var l=b[0],f=b[1],g=b[2],h=b[3],e=b[4];b=b[5];var d=c[0],m=c[1],n=c[2],p=c[3],q=c[4];c=c[5];a[0]=l*d+g*m;a[1]=f*d+h*m;a[2]=l*n+g*p;a[3]=f*n+h*p;a[4]=l*q+g*c+e;a[5]=f*q+h*c+b;return a}};d.mul=d.multiply;d.rotate=function(a,b,c){var d=b[0],f=b[1],g=b[2],h=b[3],e=b[4];b=b[5];var k=Math.sin(c);c=Math.cos(c);a[0]=d*c+g*k;a[1]=f*c+h*k;a[2]=
d*-k+g*c;a[3]=f*-k+h*c;a[4]=e;a[5]=b;return a};d.scale=function(a,b,c){var d=b[1],f=b[2],g=b[3],h=b[4],e=b[5],k=c[0];c=c[1];a[0]=b[0]*k;a[1]=d*k;a[2]=f*c;a[3]=g*c;a[4]=h;a[5]=e;return a};d.translate=function(a,b,c){var d=b[0],f=b[1],g=b[2],h=b[3],e=b[4];b=b[5];var k=c[0];c=c[1];a[0]=d;a[1]=f;a[2]=g;a[3]=h;a[4]=d*k+g*c+e;a[5]=f*k+h*c+b;return a};d.fromRotation=function(a,b){var c=Math.sin(b);b=Math.cos(b);a[0]=b;a[1]=c;a[2]=-c;a[3]=b;a[4]=0;a[5]=0;return a};d.fromScaling=function(a,b){a[0]=b[0];a[1]=
0;a[2]=0;a[3]=b[1];a[4]=0;a[5]=0;return a};d.fromTranslation=function(a,b){a[0]=1;a[1]=0;a[2]=0;a[3]=1;a[4]=b[0];a[5]=b[1];return a};d.str=function(a){return"mat2d("+a[0]+", "+a[1]+", "+a[2]+", "+a[3]+", "+a[4]+", "+a[5]+")"};d.frob=function(a){return Math.sqrt(Math.pow(a[0],2)+Math.pow(a[1],2)+Math.pow(a[2],2)+Math.pow(a[3],2)+Math.pow(a[4],2)+Math.pow(a[5],2)+1)};return d});