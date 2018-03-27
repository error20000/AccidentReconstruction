// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.6/esri/copyright.txt for details.
//>>built
define("require exports ../core/tsSupport/declareExtendsHelper ../core/tsSupport/decorateHelper ../core/accessorSupport/decorators ../core/Accessor ../core/kebabDictionary ../geometry/Extent ../geometry/support/webMercatorUtils ../geometry/SpatialReference dojo/_base/lang".split(" "),function(t,u,h,e,c,k,l,m,n,p,q){var r=l({avgRating:"avg-rating",numRatings:"num-ratings",numComments:"num-comments",numViews:"num-views"});return function(g){function b(a){a=g.call(this)||this;a.disableExtraQuery=!1;
a.extent=null;a.num=10;a.query=null;a.sortField=null;a.start=1;return a}h(b,g);f=b;Object.defineProperty(b.prototype,"sortOrder",{get:function(){return this._get("sortOrder")||"asc"},set:function(a){"asc"!==a&&"desc"!==a||this._set("sortOrder",a)},enumerable:!0,configurable:!0});b.prototype.clone=function(){return new f({disableExtraQuery:this.disableExtraQuery,extent:this.extent?this.extent.clone():null,num:this.num,query:this.query,sortField:this.sortField,sortOrder:this.sortOrder,start:this.start})};
b.prototype.toRequestOptions=function(a,b){var c;if(this.extent){var d=n.project(this.extent,p.WGS84);d&&(c=d.xmin+","+d.ymin+","+d.xmax+","+d.ymax)}d=this.query;!this.disableExtraQuery&&a.extraQuery&&(d="("+d+")"+a.extraQuery);a={bbox:c,q:d,num:this.num,sortField:null,sortOrder:null,start:this.start};this.sortField&&(a.sortField=r.toJSON(this.sortField),a.sortOrder=this.sortOrder);return{query:q.mixin(b,a)}};e([c.property()],b.prototype,"disableExtraQuery",void 0);e([c.property({type:m})],b.prototype,
"extent",void 0);e([c.property()],b.prototype,"num",void 0);e([c.property()],b.prototype,"query",void 0);e([c.property()],b.prototype,"sortField",void 0);e([c.property()],b.prototype,"sortOrder",null);e([c.property()],b.prototype,"start",void 0);return b=f=e([c.subclass("esri.portal.PortalQueryParams")],b);var f}(c.declared(k))});