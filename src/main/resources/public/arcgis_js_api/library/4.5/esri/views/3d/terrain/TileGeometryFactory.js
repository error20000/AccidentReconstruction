// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.5/esri/copyright.txt for details.
//>>built
define("../webgl-engine/lib/Geometry ../webgl-engine/lib/GeometryData ../lib/glMatrix ../support/earthUtils ../support/mathUtils ./TerrainConst".split(" "),function(Z,aa,ba,ca,M,G){function P(h,e,f,k,c){h<k[0]&&(k[0]=h);h>c[0]&&(c[0]=h);e<k[1]&&(k[1]=e);e>c[1]&&(c[1]=e);f<k[2]&&(k[2]=f);f>c[2]&&(c[2]=f)}function R(h,e,f){for(var k=0;k<f.length;k++){var c=f[k];if(c){var b=c.safeWidth,x=c.width,t=c.pixelData,m=M.clamp(c.dy*(c.y1-e),0,b),c=M.clamp(c.dx*(h-c.x0),0,b),b=Math.floor(m),n=Math.floor(c),A=
b*x+n,a=A+x,y=t[A],x=t[a],A=t[A+1],t=t[a+1];if(y+x+A+t<.5*G.ELEVATION_NODATA_VALUE)return m-=b,c-=n,h=y+(A-y)*c,h+(x+(t-x)*c-h)*m}}return null}var S=ca.earthRadius,H=ba.vec3d,da=M.lerp,ea=function(){var h=H.create(),e=H.create(),f=H.create(),k,c,b;this.init=function(x,t){c=x;b=t;H.subtract(f,e,h);k=.5*H.length(h);H.lerp(e,f,.5,h)};this.getCenter=function(){return h};this.getBSRadius=function(){return k};this.getBBMin=function(){return e};this.getBBMax=function(){return f};this.getPosition=function(){return c};
this.getIndices=function(){return b};this.getPrimitiveIndices=function(){};this.getChildren=function(){}},T=function(h,e,f,k){h*=S;for(var c=0;c<=e;c++)f[5*k]=0,f[5*k+1]=0,f[5*k+2]=h,k++},Q=new function(){var h=Array(50),e=0,f={};this.get=function(c){var b=f[c];b||(b={ptr:0,data:Array(50)},f[c]=b);0<b.ptr?(k.vertexArrayHits++,c=b.data[--b.ptr],b.data[b.ptr]=null):(k.vertexArrayMisses++,c=new Float32Array(c));if(0<e)return k.geometryHits++,b=h[--e],h[e]=null,b.getData().getVertexAttr().terrain.data=
c,b;k.geometryMisses++;b={};b.terrain={size:5,data:c};c=new ea;return new Z(new aa([{type:"triangle",indices:{terrain:null},positionKey:"terrain"}],b),"tile",[c])};this.put=function(c){var b=c.getData(),k=b.getVertexAttr(),t=k.terrain.data,m=f[t.length];50>m.ptr&&(m.data[m.ptr++]=t);k.terrain.data=null;b.getFaces()[0].indices.terrain=null;50>e&&(h[e++]=c)};var k={geometryHits:0,geometryMisses:0,vertexArrayHits:0,vertexArrayMisses:0};this.stats=k;this._pools={geometry:h,vertexArray:f}},O=[],U=Array(G.MAX_TILE_TESSELATION+
1),V=Array(G.MAX_TILE_TESSELATION+1),W=Array(G.MAX_TILE_TESSELATION+1),X=Array(G.MAX_TILE_TESSELATION+1),fa={values:null,numSurfaceIndices:0,numSkirtIndices:0},N=function(h,e,f){f||(h.values=e.values);h.numSurfaceIndices=e.numSurfaceIndices;h.numSkirtIndices=e.numSkirtIndices;return h},Y=function(h,e,f,k,c){var b;b=fa;var x=f&2,t=e+(k?1024:0)+(x?2048:0),m=O[t];b||(b={});if(m)N(b,m);else{var m=e-1,n=e-1,A=e*e,a=2*m+2*n,y=m*n*6,D=6*a,C=6*(2*m+n-1);k&&(y*=2,D*=2,C*=2);for(var a=65536<A+a?new Uint32Array(y+
D):new Uint16Array(y+D),r=0,l=0,g=y,p,w,q,v,z=0,u=0;u<=n;u++){x&&(z=0===u?C:u===n?-C:0);for(var g=g+z,d=0;d<=m;d++)v=w=-1,0===u&&(w=A+d,d!==m&&(v=r+1)),d===m&&(w=A+m+u,u<n&&(v=r+m+1)),u===n&&(w=A+m+n+(m-d),0<d&&(v=r-1)),0===d&&0<u&&(w=A+2*m+n+(n-u),v=r-(m+1)),-1<w&&(q=0===d&&1===u?A:w+1,-1<v&&(p=r,k?(a[g+0]=p,a[g+1]=w,a[g+2]=w,a[g+3]=q,a[g+4]=q,a[g+5]=p,a[g+6]=q,a[g+7]=v,a[g+8]=v,a[g+9]=p,a[g+10]=p,a[g+11]=q,g+=12):(a[g+0]=p,a[g+1]=w,a[g+2]=q,a[g+3]=q,a[g+4]=v,a[g+5]=p,g+=6))),++r,d<m&&u<n&&(p=u*
(m+1)+d,w=p+1,q=w+(m+1),v=q-1,k?(a[l+0]=p,a[l+1]=w,a[l+2]=w,a[l+3]=q,a[l+4]=q,a[l+5]=p,a[l+6]=q,a[l+7]=v,a[l+8]=v,a[l+9]=p,a[l+10]=p,a[l+11]=q,l+=12):(a[l+0]=p,a[l+1]=w,a[l+2]=q,a[l+3]=q,a[l+4]=v,a[l+5]=p,l+=6));g-=z}b.values=a;b.numSurfaceIndices=y;b.numSkirtIndices=D;O[t]=N({},b)}x=h.getData();t=x.getVertexAttr();x.getFaces()[0].indices.terrain=b.values;h.getBoundingInfo(0).init(t.terrain,b.values);c||(c={});c.geometry=h;c.numWithoutSkirtIndices=b.numSurfaceIndices+(f?6*(e-1)*(k?2:1):0);c.numVertsPerRow=
e;return N(c,b,!0)};return{createPlanarGlobeTile:function(h,e,f,k,c,b,x){var t=e[0],m=e[1],n=e[2]-t;e=e[3]-m;var A=.1*n,a=h-1,y=h-1,D=h*h,C=Q.get(5*(D+(2*a+2*y))),r=C.getData().getVertexAttr().terrain.data,l,g,p=0;l=C.getBoundingInfo(0);var w=l.getBBMin(),q=l.getBBMax();H.set3(1E7,1E7,1E7,w);H.set3(-1E7,-1E7,-1E7,q);for(g=0;g<=y;g++){var v=g/y,z=m+v*e;b&&(z<b[1]?(z=b[1],v=(z-m)/e):z>b[3]&&(z=b[3],v=(z-m)/e));for(l=0;l<=a;l++){var u=l/a,d=t+u*n;b&&(d<b[0]?(d=b[0],u=(d-t)/n):d>b[2]&&(d=b[2],u=(d-t)/
n));var F=f?R(d,z,f)||0:0,d=d-k[0],I=z-k[1],F=F-k[2];P(d,I,F,w,q);r[5*p]=d;r[5*p+1]=I;r[5*p+2]=F;r[5*p+3]=u;r[5*p+4]=v;var E=-1;0===g&&(E=D+l);l===a&&(E=D+a+g);g===y&&(E=D+a+y+(a-l));0===l&&0<g&&(E=D+2*a+y+(y-g));-1<E&&(r[5*E]=d,r[5*E+1]=I,r[5*E+2]=F-A,r[5*E+3]=u,r[5*E+4]=v,P(d,I,F-A,w,q));++p}}return Y(C,h,0,c,x)},createSphericalGlobeTile:function(h,e,f,k,c,b,x,t,m){var n=f[0],A=f[1],a=f[2],y=f[3],D=Math.max(.9,1-.5*(a-n));f=h-1;var C=h-1,r=h*h,l=Q.get(5*(r+(2*f+2*C))),g=l.getData().getVertexAttr().terrain.data,
p=e[2]-e[0],w=e[3]-e[1],q=a-n,a=b[0],v=b[1];b=b[2];var z=l.getBoundingInfo(0),u=z.getBBMin(),z=z.getBBMax();H.set3(1E7,1E7,1E7,u);H.set3(-1E7,-1E7,-1E7,z);var d;for(d=0;d<=f;d++){var F=d/f,I=n+F*q;U[d]=Math.sin(I);V[d]=Math.cos(I);W[d]=F;X[d]=e[0]+F*p}for(n=p=0;n<=C;n++){q=n/C;d=da(A,y,q);var I=Math.cos(d),E=Math.sin(d),G;k?(G=S/2*Math.log((1+E)/(1-E)),q=(G-e[1])/w):G=180*d/Math.PI;for(d=0;d<=f;d++){var F=W[d],K=U[d],L=V[d],J=S;c&&(J+=R(X[d],G,c)||0);var L=L*I*J,K=K*I*J,J=E*J,M=L-a,N=K-v,O=J-b;P(M,
N,O,u,z);var B=5*p;g[B+0]=M;g[B+1]=N;g[B+2]=O;g[B+3]=F;g[B+4]=q;B=-1;0===n&&(B=r+d);d===f&&(B=r+f+n);n===C&&(B=r+f+C+(f-d));0===d&&0<n&&(B=r+2*f+C+(C-n));-1<B&&(L=L*D-a,K=K*D-v,J=J*D-b,P(L,K,J,u,z),B*=5,g[B+0]=L,g[B+1]=K,g[B+2]=J,g[B+3]=F,g[B+4]=q);++p}}k&&(e=!!(x&2),x&1&&T(-1,f,g,r),e&&T(1,f,g,r+f+C));return Y(l,h,k?x:0,t,m)},releaseGeometry:Q.put,elevationSampler:R,_geometryObjectPool:Q}});