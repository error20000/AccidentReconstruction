// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.5/esri/copyright.txt for details.
//>>built
(function(q,A){"function"===typeof define&&define.amd?define(["exports"],A):"object"===typeof exports&&"string"!==typeof exports.nodeName?A(exports):A(q.maquette={})})(this,function(q){var A=[],y=function(b,a){var d={};Object.keys(b).forEach(function(a){d[a]=b[a]});a&&Object.keys(a).forEach(function(b){d[b]=a[b]});return d},D=function(b,a){return b.vnodeSelector!==a.vnodeSelector?!1:b.properties&&a.properties?b.properties.key!==a.properties.key?!1:b.properties.bind===a.properties.bind:!b.properties&&
!a.properties},F=function(b){return{vnodeSelector:"",properties:void 0,children:void 0,text:b.toString(),domNode:null}},G=function(b,a,d){for(var e=0,f=a.length;e<f;e++){var c=a[e];Array.isArray(c)?G(b,c,d):null!==c&&void 0!==c&&(c.hasOwnProperty("vnodeSelector")||(c=F(c)),d.push(c))}},H=function(){throw Error("Provide a transitions object to the projectionOptions to do animations");},w={namespace:void 0,eventHandlerInterceptor:void 0,styleApplyer:function(b,a,d){b.style[a]=d},transitions:{enter:H,
exit:H}},I=function(b){if("string"!==typeof b)throw Error("Style values must be strings");},L=function(b,a,d){if(a)for(var e=d.eventHandlerInterceptor,f=Object.keys(a),c=f.length,g=function(c){c=f[c];var l=a[c];if("className"===c)throw Error('Property "className" is not supported, use "class".');if("class"===c)l.split(/\s+/).forEach(function(a){return b.classList.add(a)});else if("classes"===c){var g=Object.keys(l),h=g.length;for(c=0;c<h;c++){var m=g[c];l[m]&&b.classList.add(m)}}else if("styles"===
c)for(g=Object.keys(l),h=g.length,c=0;c<h;c++){var m=g[c],n=l[m];n&&(I(n),d.styleApplyer(b,m,n))}else"key"!==c&&null!==l&&void 0!==l&&(g=typeof l,"function"===g?0===c.lastIndexOf("on",0)&&(e&&(l=e(c,l,b,a)),"oninput"===c&&function(){var a=l;l=function(b){a.apply(this,[b]);b.target["oninput-value"]=b.target.value}}(),b[c]=l):"string"===g&&"value"!==c&&"innerHTML"!==c?"http://www.w3.org/2000/svg"===d.namespace&&"href"===c?b.setAttributeNS("http://www.w3.org/1999/xlink",c,l):b.setAttribute(c,l):b[c]=
l)},h=0;h<c;h++)g(h)},J=function(b,a){var d=b.domNode;if(b.properties){var e=b.properties.exitAnimation;if(e){d.style.pointerEvents="none";var f=function(){d.parentNode&&d.parentNode.removeChild(d)};"function"===typeof e?e(d,f,b.properties):a.exit(b.domNode,b.properties,e,f);return}}d.parentNode&&d.parentNode.removeChild(d)},E=function(b,a,d,e){var f=b[a];if(""!==f.vnodeSelector){var c=f.properties;if(!(c&&(void 0===c.key?c.bind:c.key)))for(c=0;c<b.length;c++)if(c!==a&&D(b[c],f)){if("added"===e)throw Error(d.vnodeSelector+
" had a "+f.vnodeSelector+" child added, but there is now more than one. You must add unique key properties to make them distinguishable.");throw Error(d.vnodeSelector+" had a "+f.vnodeSelector+" child removed, but there were more than one. You must add unique key properties to make them distinguishable.");}}},z,C,K=function(b,a,d){var e=a.children;if(e)for(var f=0;f<e.length;f++)z(e[f],b,void 0,d);a.text&&(b.textContent=a.text);L(b,a.properties,d);a.properties&&a.properties.afterCreate&&a.properties.afterCreate.apply(a.properties.bind||
a.properties,[b,d,a.vnodeSelector,a.properties,a.children])};z=function(b,a,d,e){var f,c,g,h=0,n=b.vnodeSelector,l=a.ownerDocument;if(""===n)f=b.domNode=l.createTextNode(b.text),void 0!==d?a.insertBefore(f,d):a.appendChild(f);else{for(c=0;c<=n.length;++c)if(g=n.charAt(c),c===n.length||"."===g||"#"===g)g=n.charAt(h-1),h=n.slice(h,c),"."===g?f.classList.add(h):"#"===g?f.id=h:("svg"===h&&(e=y(e,{namespace:"http://www.w3.org/2000/svg"})),void 0!==e.namespace?f=b.domNode=l.createElementNS(e.namespace,
h):(f=b.domNode=b.domNode||l.createElement(h),"input"===h&&b.properties&&void 0!==b.properties.type&&f.setAttribute("type",b.properties.type)),void 0!==d?a.insertBefore(f,d):f.parentNode!==a&&a.appendChild(f)),h=c+1;K(f,b,e)}};C=function(b,a,d){var e=b.domNode;if(b===a)return!1;var f=!1;if(""===a.vnodeSelector){if(a.text!==b.text)return b=e.ownerDocument.createTextNode(a.text),e.parentNode.replaceChild(b,e),a.domNode=b,!0}else{0===a.vnodeSelector.lastIndexOf("svg",0)&&(d=y(d,{namespace:"http://www.w3.org/2000/svg"}));
b.text!==a.text&&(f=!0,void 0===a.text?e.removeChild(e.firstChild):e.textContent=a.text);var c;c=b.children;var g=a.children,h=d;if(c===g)c=!1;else{c=c||A;for(var g=g||A,n=c.length,l=g.length,v=h.transitions,r=0,m=0,t=!1;m<l;){var p=r<n?c[r]:void 0,k=g[m];if(void 0!==p&&D(p,k))t=C(p,k,h)||t,r++;else{b:{var p=c,q=k;if(""!==q.vnodeSelector)for(var u=r+1;u<p.length;u++)if(D(p[u],q)){p=u;break b}p=-1}if(0<=p){for(;r<p;r++)J(c[r],v),E(c,r,a,"removed");t=C(c[p],k,h)||t;r=p+1}else z(k,e,r<n?c[r].domNode:
void 0,h),p=v,k.properties&&(q=k.properties.enterAnimation)&&("function"===typeof q?q(k.domNode,k.properties):p.enter(k.domNode,k.properties,q)),E(g,m,a,"added")}m++}if(n>r)for(;r<n;r++)J(c[r],v),E(c,r,a,"removed");c=t}f=c||f;c=b.properties;g=a.properties;h=d;if(g){t=!1;n=Object.keys(g);l=n.length;for(v=0;v<l;v++)if(k=n[v],m=g[k],r=c[k],"class"===k){if(r!==m)throw Error('"class" property may not be updated. Use the "classes" property for conditional css classes.');}else if("classes"===k)for(p=e.classList,
q=Object.keys(m),u=q.length,k=0;k<u;k++){var x=q[k],w=!!m[x];w!==!!r[x]&&(t=!0,w?p.add(x):p.remove(x))}else if("styles"===k)for(p=Object.keys(m),q=p.length,k=0;k<q;k++)u=p[k],x=m[u],x!==r[u]&&(t=!0,x?(I(x),h.styleApplyer(e,u,x)):h.styleApplyer(e,u,""));else if(m||"string"!==typeof r||(m=""),"value"===k)p=e[k],p!==m&&(e["oninput-value"]?p===e["oninput-value"]:m!==r)&&(e[k]=m,e["oninput-value"]=void 0),m!==r&&(t=!0);else if(m!==r){t=typeof m;if("function"===t)throw Error("Functions may not be updated on subsequent renders (property: "+
k+"). Hint: declare event handler functions outside the render() function.");"string"===t&&"innerHTML"!==k?"http://www.w3.org/2000/svg"===h.namespace&&"href"===k?e.setAttributeNS("http://www.w3.org/1999/xlink",k,m):"role"===k&&""===m?e.removeAttribute(k):e.setAttribute(k,m):e[k]!==m&&(e[k]=m);t=!0}c=t}else c=void 0;f=c||f;a.properties&&a.properties.afterUpdate&&a.properties.afterUpdate.apply(a.properties.bind||a.properties,[e,d,a.vnodeSelector,a.properties,a.children])}f&&a.properties&&a.properties.updateAnimation&&
a.properties.updateAnimation(e,a.properties,b.properties);a.domNode=b.domNode;return!1};var B=function(b,a){return{update:function(d){if(b.vnodeSelector!==d.vnodeSelector)throw Error("The selector for the root VNode may not be changed. (consider using dom.merge and add one extra level to the virtual DOM)");C(b,d,a);b=d},domNode:b.domNode}};q.h=function(b){var a=arguments[1];if("string"!==typeof b)throw Error();var d=1;!a||a.hasOwnProperty("vnodeSelector")||Array.isArray(a)||"object"!==typeof a?a=
void 0:d=2;var e,f,c=arguments.length;if(c===d+1){var g=arguments[d];"string"===typeof g?e=g:void 0!==g&&null!==g&&1===g.length&&"string"===typeof g[0]&&(e=g[0])}if(void 0===e)for(f=[];d<c;d++)g=arguments[d],null!==g&&void 0!==g&&(Array.isArray(g)?G(b,g,f):g.hasOwnProperty("vnodeSelector")?f.push(g):f.push(F(g)));return{vnodeSelector:b,properties:a,children:f,text:""===e?void 0:e,domNode:null}};q.dom={create:function(b,a){a=y(w,a);z(b,document.createElement("div"),void 0,a);return B(b,a)},append:function(b,
a,d){d=y(w,d);z(a,b,void 0,d);return B(a,d)},insertBefore:function(b,a,d){d=y(w,d);z(a,b.parentNode,b,d);return B(a,d)},merge:function(b,a,d){d=y(w,d);a.domNode=b;K(b,a,d);return B(a,d)},replace:function(b,a,d){d=y(w,d);z(a,b.parentNode,b,d);b.parentNode.removeChild(b);return B(a,d)}};q.createCache=function(){var b,a;return{invalidate:function(){b=a=void 0},result:function(d,e){if(b)for(var f=0;f<d.length;f++)b[f]!==d[f]&&(a=void 0);a||(a=e(),b=d);return a}}};q.createMapping=function(b,a,d){var e=
[],f=[];return{results:f,map:function(c){for(var g=c.map(b),h=f.slice(),n=0,l=0;l<c.length;l++){var v=c[l],r=g[l];if(r===e[n])f[l]=h[n],d(v,h[n],l),n++;else{for(var m=!1,q=1;q<e.length+1;q++){var p=(n+q)%e.length;if(e[p]===r){f[l]=h[p];d(c[l],h[p],l);n=p+1;m=!0;break}}m||(f[l]=a(v,l))}}f.length=c.length;e=g}}};q.createProjector=function(b){var a,d=y(w,b);d.eventHandlerInterceptor=function(b,c,d,e){return function(){a.scheduleRender();return c.apply(e.bind||this,arguments)}};var e=!0,f,c=!1,g=[],h=
[],n=function(){f=void 0;if(e){e=!1;for(var a=0;a<g.length;a++){var b=h[a]();g[a].update(b)}e=!0}};return a={renderNow:n,scheduleRender:function(){f||c||(f=requestAnimationFrame(n))},stop:function(){f&&(cancelAnimationFrame(f),f=void 0);c=!0},resume:function(){c=!1;e=!0;a.scheduleRender()},append:function(a,b){g.push(q.dom.append(a,b(),d));h.push(b)},insertBefore:function(a,b){g.push(q.dom.insertBefore(a,b(),d));h.push(b)},merge:function(a,b){g.push(q.dom.merge(a,b(),d));h.push(b)},replace:function(a,
b){g.push(q.dom.replace(a,b(),d));h.push(b)},detach:function(a){for(var b=0;b<h.length;b++)if(h[b]===a)return h.splice(b,1),g.splice(b,1)[0];throw Error("renderMaquetteFunction was not found");}}}});