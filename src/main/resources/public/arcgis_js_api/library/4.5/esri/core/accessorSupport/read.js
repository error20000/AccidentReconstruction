// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.5/esri/copyright.txt for details.
//>>built
define("require exports dojo/_base/lang ./utils ./get ./extensions/serializableProperty".split(" "),function(E,d,C,D,r,t){function n(w,b,g){void 0===g&&(g=x);for(var c=D.getProperties(w),y=c.metadatas,p={},h=0,m=Object.getOwnPropertyNames(b);h<m.length;h++){var k=p,l=y,e=m[h],d=b,n=g,a=t.originSpecificReadPropertyDefinition(l[e],n);a&&(!a.read||!1!==a.read.enabled&&!a.read.source)&&(k[e]=!0);for(var u=0,z=Object.getOwnPropertyNames(l);u<z.length;u++){var A=z[u],a=t.originSpecificReadPropertyDefinition(l[A],
n),f;a:{f=e;var B=d;if(a&&a.read&&!1!==a.read.enabled&&a.read.source)if(a=a.read.source,"string"===typeof a){if(a===f||-1<a.indexOf(".")&&0===a.indexOf(f)&&r.exists(a,B)){f=!0;break a}}else for(var v=0;v<a.length;v++){var q=a[v];if(q===f||-1<q.indexOf(".")&&0===q.indexOf(f)&&r.exists(q,B)){f=!0;break a}}f=!1}f&&(k[A]=!0)}}c.setDefaultOrigin(g.origin);h=0;for(p=Object.getOwnPropertyNames(p);h<p.length;h++)m=p[h],l=(k=t.originSpecificReadPropertyDefinition(y[m],g).read)&&k.source,e=void 0,e=l&&"string"===
typeof l?r.valueOf(b,l):b[m],k&&k.reader&&(e=k.reader.call(w,e,b,g)),void 0!==e&&c.set(m,e);c.setDefaultOrigin("user")}Object.defineProperty(d,"__esModule",{value:!0});var x={origin:"service"};d.read=n;d.readLoadable=function(d,b,g,c){void 0===c&&(c=x);b=C.mixin({},c,{messages:[]});g(b);b.messages.forEach(function(b){"warning"!==b.type||d.loaded?c&&c.messages.push(b):d.loadWarnings.push(b)})};d.default=n});