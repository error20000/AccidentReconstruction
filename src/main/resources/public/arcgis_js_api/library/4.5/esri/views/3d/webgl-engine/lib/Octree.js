// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.5/esri/copyright.txt for details.
//>>built
define("require exports ./gl-matrix ./Util dojo/has ./PerformanceTimer".split(" "),function(v,C,z,q,D,E){function w(c,a,b){b=b||c;b[0]=c[0]+a;b[1]=c[1]+a;b[2]=c[2]+a;return b}var h=z.vec3d;v=function(){function c(a,b,d){this._maximumObjectsPerNode=10;this._maximumDepth=20;this._autoResize=!0;this._outsiders=[];d&&(void 0!==d.maximumObjectsPerNode&&(this._maximumObjectsPerNode=d.maximumObjectsPerNode),void 0!==d.maximumDepth&&(this._maximumDepth=d.maximumDepth),void 0!==d.autoResize&&(this._autoResize=
d.autoResize));isNaN(a[0])||isNaN(a[1])||isNaN(a[2])||isNaN(b)?this._root=new g(null,h.createFrom(0,0,0),.5):this._root=new g(null,a,b/2)}Object.defineProperty(c.prototype,"center",{get:function(){return this._root.center},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"size",{get:function(){return 2*this._root.halfSize},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"root",{get:function(){return this._root.node},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,
"outsiders",{get:function(){return this._outsiders.slice()},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"maximumObjectsPerNode",{get:function(){return this._maximumObjectsPerNode},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"maximumDepth",{get:function(){return this._maximumDepth},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"autoResize",{get:function(){return this._autoResize},enumerable:!0,configurable:!0});c.prototype.add=function(a){a=
this._objectOrObjectsArray(a);this._grow(a);for(var b=g.acquire(),d=0;d<a.length;d++){var e=a[d];b.init(this._root);0===e.getBSRadius()||isNaN(e.getBSRadius())||!this._autoResize&&!this._fitsInsideTree(this._boundingSphereFromObject(e,t))?this._outsiders.push(e):this._add(e,b)}g.release(b)};c.prototype.remove=function(a,b){a=this._objectOrObjectsArray(a);for(var d=g.acquire(),e=!0,c=0;c<a.length;c++){var e=a[c],f=this._boundingSphereFromObject(b||e,t);0===f.radius||isNaN(f.radius)||!this._autoResize&&
!this._fitsInsideTree(f)?e=null!=q.arrayRemove(this._outsiders,e):(d.init(this._root),e=this._remove(e,f,d))}g.release(d);this._shrink();return e};c.prototype.update=function(a,b){this.remove(a,b);this.add(a)};c.prototype.forEachAlongRay=function(a,b,d){this._forEachTest(function(d){w(d.center,2*-d.halfSize,l);w(d.center,2*d.halfSize,m);return q.rayBoxTest(a,b,l,m)},d)};c.prototype.forEachInBoundingBox=function(a,b,d){this._forEachTest(function(d){for(var e=2*d.halfSize,c=0;3>c;c++)if(d.center[c]+
e<a[c]||d.center[c]-e>b[c])return!1;return!0},d)};c.prototype.forEachNode=function(a){this._forEachNode(this._root,function(b){return a(b.node,b.center,2*b.halfSize)})};c.prototype._forEachTest=function(a,b){this._outsiders.forEach(b);this._forEachNode(this._root,function(d){return a(d)?(d=d.node,d.terminals.forEach(b),null!==d.residents&&d.residents.forEach(b),!0):!1})};c.prototype._forEachNode=function(a,b){a=g.acquire().init(a);for(var d=[a];0!==d.length;){a=d.pop();if(b(a)&&!a.isLeaf())for(var e=
0;e<a.node.children.length;e++)a.node.children[e]&&d.push(g.acquire().init(a).advance(e));g.release(a)}};c.prototype._objectOrObjectsArray=function(a){Array.isArray(a)||(x[0]=a,a=x);return a};c.prototype._remove=function(a,b,d){n.length=0;d.advanceTo(b,function(a,b){n.push(a.node,b)})?(a=null!=q.arrayRemove(d.node.terminals,a),d=0===d.node.terminals.length):(a=null!=q.arrayRemove(d.node.residents,a),d=0===d.node.residents.length);if(d)for(d=n.length-2;0<=d&&this._purge(n[d],n[d+1]);d-=2);return a};
c.prototype._nodeIsEmpty=function(a){if(0!==a.terminals.length)return!1;if(null!==a.residents)return 0===a.residents.length;for(var b=0;b<a.children.length;b++)if(a.children[b])return!1;return!0};c.prototype._purge=function(a,b){0<=b&&(a.children[b]=null);return this._nodeIsEmpty(a)?(null===a.residents&&(a.residents=[]),!0):!1};c.prototype._add=function(a,b){b.advanceTo(this._boundingSphereFromObject(a,t))?b.node.terminals.push(a):(b.node.residents.push(a),b.node.residents.length>this._maximumObjectsPerNode&&
b.depth<this._maximumDepth&&this._split(b))};c.prototype._split=function(a){var b=a.node.residents;a.node.residents=null;for(var d=0;d<b.length;d++){var e=g.acquire().init(a);this._add(b[d],e);g.release(e)}};c.prototype._grow=function(a){if(0!==a.length&&this._autoResize&&(a=this._boundingSphereFromObjects(a,this._boundingSphereFromObject,p),!isNaN(a.radius)&&0!==a.radius&&!this._fitsInsideTree(a)))if(this._nodeIsEmpty(this._root.node))h.set(a.center,this._root.center),this._root.halfSize=1.25*a.radius;
else{var b=g.acquire();this._rootBoundsForRootAsSubNode(a,b);this._placingRootViolatesMaxDepth(b)?this._rebuildTree(a,b):this._growRootAsSubNode(b);g.release(b)}};c.prototype._rebuildTree=function(a,b){var d=this;h.set(b.center,u.center);u.radius=b.halfSize;a=this._boundingSphereFromObjects([a,u],function(a){return a},A);b=g.acquire().init(this._root);this._root.initFrom(null,a.center,1.25*a.radius);this._forEachNode(b,function(a){d.add(a.node.terminals);null!==a.node.residents&&d.add(a.node.residents);
return!0});g.release(b)};c.prototype._placingRootViolatesMaxDepth=function(a){var b=0;this._forEachNode(this._root,function(a){b=Math.max(b,a.depth);return!0});return b+Math.log(a.halfSize/this._root.halfSize)*Math.LOG2E>this._maximumDepth};c.prototype._rootBoundsForRootAsSubNode=function(a,b){var d=a.radius,e=a.center;a=-Infinity;for(var c=this._root.center,f=this._root.halfSize,k=0;3>k;k++){var h=Math.max(0,Math.ceil((c[k]-f-(e[k]-d))/(2*f))),g=Math.max(0,Math.ceil((e[k]+d-(c[k]+f))/(2*f)))+1;a=
Math.max(a,Math.pow(2,Math.ceil(Math.log(h+g)*Math.LOG2E)));r[k].min=h;r[k].max=g}for(k=0;3>k;k++)h=r[k].min,g=r[k].max,d=(a-(h+g))/2,h+=Math.ceil(d),g+=Math.floor(d),y[k]=c[k]-f-h*f*2+(g+h)*f;return b.initFrom(null,y,a*f,0)};c.prototype._growRootAsSubNode=function(a){var b=this._root.node;h.set(this._root.center,p.center);p.radius=this._root.halfSize;this._root.init(a);a.advanceTo(p,null,!0);a.node.children=b.children;a.node.residents=b.residents;a.node.terminals=b.terminals};c.prototype._shrink=
function(){if(this._autoResize)for(;;){var a=this._findShrinkIndex();if(-1===a)break;this._root.advance(a);this._root.depth=0}};c.prototype._findShrinkIndex=function(){if(0!==this._root.node.terminals.length||this._root.isLeaf())return-1;for(var a=null,b=this._root.node.children,d=0,c=0;c<b.length&&null==a;)d=c++,a=b[d];for(;c<b.length;)if(b[c++])return-1;return d};c.prototype._fitsInsideTree=function(a){var b=this._root.center,d=this._root.halfSize,c=a.center;return a.radius<=d&&c[0]>=b[0]-d&&c[0]<=
b[0]+d&&c[1]>=b[1]-d&&c[1]<=b[1]+d&&c[2]>=b[2]-d&&c[2]<=b[2]+d};c.prototype._boundingSphereFromObject=function(a,b){h.set(a.getCenter(),b.center);b.radius=a.getBSRadius();return b};c.prototype._boundingSphereFromObjects=function(a,b,d){if(1===a.length){var c=b(a[0],p);h.set(c.center,d.center);d.radius=c.radius}else{l[0]=Infinity;l[1]=Infinity;l[2]=Infinity;m[0]=-Infinity;m[1]=-Infinity;m[2]=-Infinity;for(var g=0;g<a.length;g++){var c=b(a[g],p),f=l,k=c.center,n=c.radius;f[0]=Math.min(f[0],k[0]-n);
f[1]=Math.min(f[1],k[1]-n);f[2]=Math.min(f[2],k[2]-n);f=m;k=c.center;c=c.radius;f[0]=Math.max(f[0],k[0]+c);f[1]=Math.max(f[1],k[1]+c);f[2]=Math.max(f[2],k[2]+c)}h.scale(h.add(l,m,d.center),.5);d.radius=Math.max(m[0]-l[0],m[1]-l[1],m[2]-l[2])/2}return d};return c}();var g=function(){function c(a,b,d,c){void 0===d&&(d=0);void 0===c&&(c=0);this.center=h.create();this.initFrom(a,b,d,0)}c.prototype.init=function(a){return this.initFrom(a.node,a.center,a.halfSize,a.depth)};c.prototype.initFrom=function(a,
b,d,e){void 0===a&&(a=null);void 0===d&&(d=this.halfSize);void 0===e&&(e=this.depth);this.node=a||c.createEmptyNode();b&&h.set(b,this.center);this.halfSize=d;this.depth=e;return this};c.prototype.advance=function(a){var b=this.node.children[a];b||(b=c.createEmptyNode(),this.node.children[a]=b);this.node=b;this.halfSize/=2;this.depth++;a=B[a];this.center[0]+=a[0]*this.halfSize;this.center[1]+=a[1]*this.halfSize;this.center[2]+=a[2]*this.halfSize;return this};c.prototype.advanceTo=function(a,b,d){for(void 0===
d&&(d=!1);;){if(this.isTerminalFor(a))return b&&b(this,-1),!0;if(this.isLeaf()&&!d)return b&&b(this,-1),!1;this.isLeaf()&&(this.node.residents=null);var c=this._childIndex(a);b&&b(this,c);this.advance(c)}};c.prototype.isLeaf=function(){return null!=this.node.residents};c.prototype.isTerminalFor=function(a){return a.radius>this.halfSize/2};c.prototype._childIndex=function(a){a=a.center;for(var b=this.center,d=0,c=0;3>c;c++)b[c]<a[c]&&(d|=1<<c);return d};c.createEmptyNode=function(){return{children:[null,
null,null,null,null,null,null,null],terminals:[],residents:[]}};c.acquire=function(){if(0===this._pool.length)return new c;var a=this._pool[this._pool.length-1];this._pool.length--;return a};c.release=function(a){this._pool.push(a)};c._pool=[];return c}(),B=[[-1,-1,-1],[1,-1,-1],[-1,1,-1],[1,1,-1],[-1,-1,1],[1,-1,1],[-1,1,1],[1,1,1]],x=[null],y=h.create(),l=h.create(),m=h.create(),n=[],t={center:h.create(),radius:0},p={center:h.create(),radius:0},u={center:h.create(),radius:0},A={center:h.create(),
radius:0},r=[{min:0,max:0},{min:0,max:0},{min:0,max:0}];return v});