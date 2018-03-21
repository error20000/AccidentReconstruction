// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.5/esri/copyright.txt for details.
//>>built
define("require exports ./IdGen ./Util ./gl-matrix ./ComponentUtils ./HighlightUtils ./ModelContentType ./GeometryRecord".split(" "),function(q,z,w,x,r,f,t,y,p){var n=x.assert,k=r.mat4d,h=r.vec3d;q=function(){function b(a){void 0===a&&(a={});this._bvObjectSpace=new u;this._bvWorldSpace=new u;this._bvDirty=!0;this._hasVolatileTransformation=!1;this.id=b._idGen.gen(a.idHint);this.name=a.name;this.castShadow=null!=a.castShadow?a.castShadow:!0;this.metadata=a.metadata;this.objectTransformation=k.identity();
this._initializeGeometryRecords(a.geometries,a.materials,a.transformations)}b.prototype._initializeGeometryRecords=function(a,c,d){if(Array.isArray(a)){n(c.length===a.length,"Object3D: materials don't match geometries");n(d.length===a.length,"Object3D: transformations don't match geometries");this.geometryRecords=Array(a.length);this.geometries=a.slice();for(var b=0;b<a.length;b++)n(Array.isArray(c[b]),"Object3D: materials parameter must be array of array"),this.geometryRecords[b]=new p(a[b],c[b].slice(),
k.create(d[b]),{});this._hasVolatileTransformation=!1}else this.geometryRecords=[],this.geometries=[]};b.prototype.getId=function(){return this.id};Object.defineProperty(b.prototype,"parentLayer",{get:function(){return this._parentLayer},set:function(a){n(null==this._parentLayer||null==a,"Object3D can only be added to a single Layer");this._parentLayer=a},enumerable:!0,configurable:!0});b.prototype.getParentLayer=function(){return this.parentLayer};b.prototype.addParentLayer=function(a){this.parentLayer=
a};b.prototype.removeParentLayer=function(a){this.parentLayer=null};b.prototype.getNumGeometryRecords=function(){return this.geometryRecords.length};b.prototype.getFirstGeometryIndex=function(a){a=this.geometries.indexOf(a);n(-1<a,"Object3D.getFirstGeometryIndex: geometry not found");return a};b.prototype.findGeometryRecords=function(a){for(var c=[],d=0;d<this.geometries.length;d++)this.geometries[d]===a&&c.push(this.geometryRecords[d]);return c};b.prototype.getGeometryRecord=function(a){n(0<=a&&
a<this.geometryRecords.length,"Object3d.getGeometryDataByIndex: index out of range");return this.geometryRecords[a]};b.prototype.getGeometryRecords=function(){return this.geometryRecords};b.prototype.addGeometry=function(a,c,d,b,g,h){n(Array.isArray(c),"Object3D.addGeometry: materials must be array");this.geometries.push(a);a=new p(a,c.slice(),k.create(d),b||{},g,h);this.geometryRecords.push(a);this._hasVolatileTransformation=this.geometryRecords.some(function(a){return!!a.customTransformation});
this._notifyDirty("objGeometryAdded",a);this._invalidateBoundingVolume();return a};b.prototype.hasGeometry=function(a){return-1<this.geometries.indexOf(a)};b.prototype.removeGeometry=function(a){var c=this.geometryRecords.splice(a,1)[0];this._hasVolatileTransformation=this.geometryRecords.some(function(a){return!!a.customTransformation});this.geometries.splice(a,1);this._notifyDirty("objGeometryRemoved",c);this._invalidateBoundingVolume();return c};b.prototype.geometryVertexAttrsUpdated=function(a){this._notifyDirty("vertexAttrsUpdated",
this.geometryRecords[a]);this._invalidateBoundingVolume()};b.prototype.geometryColorAttrsUpdated=function(a){this._notifyDirty("colorAttrsUpdated",this.geometryRecords[a])};b.prototype.isAllHidden=function(){for(var a=0,c=this.geometryRecords;a<c.length;a++){var b=c[a],e=b.instanceParameters.componentVisibilities,b=b.geometry.getData().componentOffsets;if(!f.isAllHidden(e,b))return!1}return!0};b.prototype.isAllVisible=function(){for(var a=0,c=this.geometryRecords;a<c.length;a++){var b=c[a],e=b.instanceParameters.componentVisibilities,
b=b.geometry.getData().componentOffsets;if(!f.isAllVisible(e,b))return!1}return!0};b.prototype.hasComponents=function(){for(var a=!1,c=0;c<this.geometries.length&&!(a=this.geometries[c].getData(),a=f.hasComponents(a.componentOffsets));c++);return a};b.prototype.setComponentVisibility=function(a,c,b){var d=a.instanceParameters.componentVisibilities,g=a.geometry.getData().componentOffsets;c=f.updateVisibility(d,g,c,b);a.instanceParameters.componentVisibilities=c;this._notifyDirty("componentVisibilityChanged",
a)};b.prototype.getComponentVisibility=function(a,c){return f.getVisibility(a.instanceParameters.componentVisibilities,c)};b.prototype.hideAllComponents=function(){for(var a=0,c=this.geometryRecords;a<c.length;a++){var b=c[a],e=f.hideAllComponents(b.instanceParameters.componentVisibilities);b.instanceParameters.componentVisibilities=e}this._notifyDirty("componentVisibilityChanged")};b.prototype.unhideAllComponents=function(){for(var a=0,c=this.geometryRecords;a<c.length;a++){var b=c[a],e=f.unhideAllComponents(b.instanceParameters.componentVisibilities);
b.instanceParameters.componentVisibilities=e}this._notifyDirty("componentVisibilityChanged")};b.prototype._setComponentHighlight=function(a,b,d,e){b=f.addHighlight(a.instanceParameters.componentHighlights,b,d,e);a.instanceParameters.componentHighlights=b};b.prototype.setComponentHighlight=function(a,b,d){var c=t.generateHighlightId();this._setComponentHighlight(a,b,d,c);this._notifyDirty("componentHighlightChanged");return c};b.prototype.highlightAllComponents=function(a){for(var b=t.generateHighlightId(),
d=0,e=this.geometryRecords;d<e.length;d++)this._setComponentHighlight(e[d],null,a,b);this._notifyDirty("componentHighlightChanged");return b};b.prototype.removeHighlights=function(a){for(var b=0,d=this.geometryRecords;b<d.length;b++){var e=d[b].instanceParameters,g=f.removeHighlight(e.componentHighlights,a);e.componentHighlights=g}this._notifyDirty("componentHighlightChanged")};b.prototype.getFaceRangeIndexFromTriangleNr=function(a){var b=this.metadata.faceRanges;if(null!=b)for(var d=0;d<b.length;d++)if(b[d][0]<=
a&&b[d][1]>=a)return d};b.prototype.getFaceRangeFromTriangleNr=function(a){a=this.getFaceRangeIndexFromTriangleNr(a);var b=this.metadata.faceRanges;return a?[b[a]]:null};b.prototype.setGeometryTransformation=function(a,b){n(0<=a&&a<this.geometryRecords.length,"Object3d.setGeometryTransformation: index out of range");var c=this.geometryRecords[a];b=new p(c.geometry,c.materials,k.create(b),c.instanceParameters);this.geometryRecords[a]=b;this._notifyDirty("objGeometryReplaced",[c,b]);this._invalidateBoundingVolume()};
b.prototype.getObjectTransformation=function(){return k.create(this.objectTransformation)};b.prototype.setObjectTransformation=function(a){k.set(a,this.objectTransformation);this._invalidateBoundingVolume();this._notifyDirty("objTransformation")};b.prototype.getCombinedStaticTransformation=function(a,b){b=b||k.create();k.multiply(this.objectTransformation,a.getStaticTransformation(),b);return b};b.prototype.getCombinedShaderTransformation=function(a,b){b=b||k.create();k.multiply(this.objectTransformation,
a.getShaderTransformation(),b);return b};b.prototype.hasVolativeTransformation=function(){return this._hasVolatileTransformation};b.prototype.getCastShadow=function(){return this.castShadow};b.prototype.setCastShadow=function(a){this.castShadow=a};b.prototype.getMetadata=function(){return this.metadata};b.prototype.getName=function(){return this.name};b.prototype.getBBMin=function(a){this._validateBoundingVolume();return a?this._bvObjectSpace.bbMin:this._bvWorldSpace.bbMin};b.prototype.getBBMax=function(a){this._validateBoundingVolume();
return a?this._bvObjectSpace.bbMax:this._bvWorldSpace.bbMax};b.prototype.getCenter=function(a){this._validateBoundingVolume();return a?this._bvObjectSpace.center:this._bvWorldSpace.center};b.prototype.getBSRadius=function(a){this._validateBoundingVolume();return a?this._bvObjectSpace.bsRadius:this._bvWorldSpace.bsRadius};b.prototype._validateBoundingVolume=function(){if(this._bvDirty||this._hasVolatileTransformation){this._bvObjectSpace.init();this._bvWorldSpace.init();for(var a=0;a<this.geometryRecords.length;++a)for(var b=
this.geometries[a],d=this.geometryRecords[a],e=b.getNumGroups(),g=0;g<e;++g){var l=b.getBoundingInfo(g);this._calculateTransformedBoundingVolume(l,this._bvObjectSpace,d.getShaderTransformation());this._calculateTransformedBoundingVolume(l,this._bvWorldSpace,this.getCombinedShaderTransformation(d))}h.lerp(this._bvObjectSpace.bbMin,this._bvObjectSpace.bbMax,.5,this._bvObjectSpace.center);h.lerp(this._bvWorldSpace.bbMin,this._bvWorldSpace.bbMax,.5,this._bvWorldSpace.center);for(var d=h.create(),v=h.create(),
m=this._getScaleFactor(this.objectTransformation),a=0;a<this.geometryRecords.length;++a)for(var b=this.geometries[a],f=this.geometryRecords[a].getShaderTransformation(),n=this._getScaleFactor(f),e=b.getNumGroups(),g=0;g<e;++g){l=b.getBoundingInfo(g);k.multiplyVec3(f,l.getCenter(),d);var p=h.dist(d,this._bvObjectSpace.center),l=l.getBSRadius()*n;this._bvObjectSpace.bsRadius=Math.max(this._bvObjectSpace.bsRadius,p+l);k.multiplyVec3(this.objectTransformation,d,v);p=h.dist(v,this._bvWorldSpace.center);
this._bvWorldSpace.bsRadius=Math.max(this._bvWorldSpace.bsRadius,p+l*m)}this._bvDirty=!1}};b.prototype._calculateTransformedBoundingVolume=function(a,b,d){var c=a.getBBMin();a=a.getBBMax();for(var g=h.create(),l=h.create(),f=-1;3>f;++f){h.set(c,g);h.set(a,l);-1<f&&(g[f]=a[f],l[f]=c[f]);k.multiplyVec3(d,g);k.multiplyVec3(d,l);for(var m=0;3>m;++m)b.bbMin[m]=Math.min(b.bbMin[m],g[m],l[m]),b.bbMax[m]=Math.max(b.bbMax[m],g[m],l[m])}};b.prototype._getScaleFactor=function(a){return Math.max(Math.max(Math.sqrt(a[0]*
a[0]+a[4]*a[4]+a[8]*a[8]),Math.sqrt(a[1]*a[1]+a[5]*a[5]+a[9]*a[9])),Math.sqrt(a[2]*a[2]+a[6]*a[6]+a[10]*a[10]))};b.prototype._invalidateBoundingVolume=function(){this._bvDirty=!0;this._parentLayer&&this._parentLayer.notifyObjectBBChanged(this,this._bvWorldSpace)};b.prototype._notifyDirty=function(a,b,d,e){this._parentLayer&&(d=d||y.OBJECT,this._parentLayer.notifyDirty(a,b,d,e||this))};b._idGen=new w;return b}();var u=function(){function b(){this.bbMin=h.create();this.bbMax=h.create();this.center=
h.create();this.bsRadius=0}b.prototype.init=function(){h.set3(Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE,this.bbMin);h.set3(-Number.MAX_VALUE,-Number.MAX_VALUE,-Number.MAX_VALUE,this.bbMax);h.set3(0,0,0,this.center);this.bsRadius=0};b.prototype.getCenter=function(){return this.center};b.prototype.getBSRadius=function(){return this.bsRadius};return b}();return q});