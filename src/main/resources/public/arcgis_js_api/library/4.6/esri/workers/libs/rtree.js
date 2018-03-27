// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.6/esri/copyright.txt for details.
//>>built
var RTree=function(a){var e=3,m=6;isNaN(a)||(e=Math.floor(a/2),m=a);this.min_width=e;this.max_width=m;var h={x:0,y:0,w:0,h:0,id:"root",nodes:[]};(function(){var d={};return function(c){var b=0;c in d?b=d[c]++:d[c]=0;return c+"_"+b}})();var t=function(d,c,b){var p=[],a=[],k=[];if(!d||!RTree.Rectangle.overlap_rectangle(d,b))return k;d={x:d.x,y:d.y,w:d.w,h:d.h,target:c};a.push(b.nodes.length);p.push(b);do if(b=p.pop(),c=a.pop()-1,"target"in d)for(;0<=c;){var f=b.nodes[c];if(RTree.Rectangle.overlap_rectangle(d,
f))if(d.target&&"leaf"in f&&f.leaf===d.target||!d.target&&("leaf"in f||RTree.Rectangle.contains_rectangle(f,d))){"nodes"in f?(k=q(f,!0,[],f),b.nodes.splice(c,1)):k=b.nodes.splice(c,1);RTree.Rectangle.make_MBR(b.nodes,b);delete d.target;b.nodes.length<e&&(d.nodes=q(b,!0,[],b));break}else"nodes"in f&&(a.push(c),p.push(b),b=f,c=f.nodes.length);--c}else if("nodes"in d){b.nodes.splice(c+1,1);0<b.nodes.length&&RTree.Rectangle.make_MBR(b.nodes,b);for(c=0;c<d.nodes.length;c++)r(d.nodes[c],b);d.nodes.length=
0;0===p.length&&1>=b.nodes.length?(d.nodes=q(b,!0,d.nodes,b),b.nodes.length=0,p.push(b),a.push(1)):0<p.length&&b.nodes.length<e?(d.nodes=q(b,!0,d.nodes,b),b.nodes.length=0):delete d.nodes}else RTree.Rectangle.make_MBR(b.nodes,b);while(0<p.length);return k},q=function(d,c,b,p){var a=[];if(!RTree.Rectangle.overlap_rectangle(d,p))return b;a.push(p.nodes);do{p=a.pop();for(var e=p.length-1;0<=e;e--){var f=p[e];RTree.Rectangle.overlap_rectangle(d,f)&&("nodes"in f?a.push(f.nodes):"leaf"in f&&(c?b.push(f):
b.push(f.leaf)))}}while(0<a.length);return b},r=function(d,c){var b;if(0===c.nodes.length)c.x=d.x,c.y=d.y,c.w=d.w,c.h=d.h,c.nodes.push(d);else{var a=-1,u=[],k;u.push(c);c=c.nodes;do{-1!==a&&(u.push(c[a]),c=c[a].nodes,a=-1);for(var f=c.length-1;0<=f;f--){var g=c[f];if("leaf"in g){a=-1;break}var h=RTree.Rectangle.squarified_ratio(g.w,g.h,g.nodes.length+1),g=RTree.Rectangle.squarified_ratio(Math.max(g.x+g.w,d.x+d.w)-Math.min(g.x,d.x),Math.max(g.y+g.h,d.y+d.h)-Math.min(g.y,d.y),g.nodes.length+2);if(0>
a||Math.abs(g-h)<k)k=Math.abs(g-h),a=f}}while(-1!==a);do{if(b&&"nodes"in b&&0===b.nodes.length)for(a=b,b=u.pop(),k=0;k<b.nodes.length;k++){if(b.nodes[k]===a||0===b.nodes[k].nodes.length){b.nodes.splice(k,1);break}}else b=u.pop();if("leaf"in d||"nodes"in d||Array.isArray(d)){if(Array.isArray(d)){for(a=0;a<d.length;a++)RTree.Rectangle.expand_rectangle(b,d[a]);b.nodes=b.nodes.concat(d)}else RTree.Rectangle.expand_rectangle(b,d),b.nodes.push(d);if(b.nodes.length<=m)d={x:b.x,y:b.y,w:b.w,h:b.h};else{a=
d=b.nodes;k=a.length-1;c=0;for(var f=a.length-1,h=0,l=g=void 0,g=a.length-2;0<=g;g--)l=a[g],l.x>a[c].x?c=g:l.x+l.w<a[k].x+a[k].w&&(k=g),l.y>a[h].y?h=g:l.y+l.h<a[f].y+a[f].h&&(f=g);Math.abs(a[k].x+a[k].w-a[c].x)>Math.abs(a[f].y+a[f].h-a[h].y)?k>c?(g=a.splice(k,1)[0],l=a.splice(c,1)[0]):(l=a.splice(c,1)[0],g=a.splice(k,1)[0]):f>h?(g=a.splice(f,1)[0],l=a.splice(h,1)[0]):(l=a.splice(h,1)[0],g=a.splice(f,1)[0]);for(a=[{x:g.x,y:g.y,w:g.w,h:g.h,nodes:[g]},{x:l.x,y:l.y,w:l.w,h:l.h,nodes:[l]}];0<d.length;){k=
d;c=a[0];for(var f=a[1],g=RTree.Rectangle.squarified_ratio(c.w,c.h,c.nodes.length+1),l=RTree.Rectangle.squarified_ratio(f.w,f.h,f.nodes.length+1),r=void 0,t=void 0,h=void 0,q=k.length-1;0<=q;q--){var n=k[q],v=Math.abs(RTree.Rectangle.squarified_ratio(Math.max(c.x+c.w,n.x+n.w)-Math.min(c.x,n.x),Math.max(c.y+c.h,n.y+n.h)-Math.min(c.y,n.y),c.nodes.length+2)-g),n=Math.abs(RTree.Rectangle.squarified_ratio(Math.max(f.x+f.w,n.x+n.w)-Math.min(f.x,n.x),Math.max(f.y+f.h,n.y+n.h)-Math.min(f.y,n.y),f.nodes.length+
2)-l);if(!t||!r||Math.abs(n-v)<r)t=q,r=Math.abs(n-v),h=n<v?f:c}g=k.splice(t,1)[0];c.nodes.length+k.length+1<=e?(c.nodes.push(g),RTree.Rectangle.expand_rectangle(c,g)):f.nodes.length+k.length+1<=e?(f.nodes.push(g),RTree.Rectangle.expand_rectangle(f,g)):(h.nodes.push(g),RTree.Rectangle.expand_rectangle(h,g))}d=a;1>u.length&&(b.nodes.push(a[0]),u.push(b),d=a[1])}}else RTree.Rectangle.expand_rectangle(b,d),d={x:b.x,y:b.y,w:b.w,h:b.h}}while(0<u.length)}};this.serialize=function(){return JSON.stringify(h)};
this.deserialize=function(a,c){var b=c=c||h;b.nodes=a.nodes;b.x=a.x;b.y=a.y;b.w=a.w;b.h=a.h;return c};this.search=function(a,c){c=[a,!!c,[],h];if(void 0===a)throw"Wrong number of arguments. RT.Search requires at least a bounding rectangle.";return q.apply(this,c)};this.remove=function(a,c){var b=Array.prototype.slice.call(arguments);1===b.length&&b.push(!1);b.push(h);if(!1===c){var d=0,e=[];do d=e.length,e=e.concat(t.apply(this,b));while(d!==e.length);return e}return t.apply(this,b)};this.insert=
function(a,c){if(2>arguments.length)throw"Wrong number of arguments. RT.Insert requires at least a bounding rectangle and an object.";r({x:a.x,y:a.y,w:a.w,h:a.h,leaf:c},h);return h}};
RTree.Rectangle=function(a,e,m,h){var t,q,r,d,c,b;a.x?(t=a.x,r=a.y,0!==a.w&&!a.w&&a.x2?(c=a.x2-a.x,b=a.y2-a.y):(c=a.w,b=a.h)):(t=a,r=e,c=m,b=h);q=t+c;d=r+b;this.x1=this.x=function(){return t};this.y1=this.y=function(){return r};this.x2=function(){return q};this.y2=function(){return d};this.w=function(){return c};this.h=function(){return b};this.toJSON=function(){return'{"x":'+t.toString()+', "y":'+r.toString()+', "w":'+c.toString()+', "h":'+b.toString()+"}"};this.overlap=function(a){return this.x()<
a.x2()&&this.x2()>a.x()&&this.y()<a.y2()&&this.y2()>a.y()};this.expand=function(a){var d=Math.min(this.x(),a.x()),e=Math.min(this.y(),a.y());c=Math.max(this.x2(),a.x2())-d;b=Math.max(this.y2(),a.y2())-e;t=d;r=e;return this};this.setRect=function(a,b,c,d){}};RTree.Rectangle.overlap_rectangle=function(a,e){return a.x<e.x+e.w&&a.x+a.w>e.x&&a.y<e.y+e.h&&a.y+a.h>e.y};RTree.Rectangle.contains_rectangle=function(a,e){return a.x+a.w<=e.x+e.w&&a.x>=e.x&&a.y+a.h<=e.y+e.h&&a.y>=e.y};
RTree.Rectangle.expand_rectangle=function(a,e){var m,h;m=a.x<e.x?a.x:e.x;h=a.y<e.y?a.y:e.y;a.w=a.x+a.w>e.x+e.w?a.x+a.w-m:e.x+e.w-m;a.h=a.y+a.h>e.y+e.h?a.y+a.h-h:e.y+e.h-h;a.x=m;a.y=h;return a};RTree.Rectangle.make_MBR=function(a,e){if(1>a.length)return{x:0,y:0,w:0,h:0};e?(e.x=a[0].x,e.y=a[0].y,e.w=a[0].w,e.h=a[0].h):e={x:a[0].x,y:a[0].y,w:a[0].w,h:a[0].h};for(var m=a.length-1;0<m;m--)RTree.Rectangle.expand_rectangle(e,a[m]);return e};
RTree.Rectangle.squarified_ratio=function(a,e,m){var h=(a+e)/2;a*=e;return a*m/(a/(h*h))};