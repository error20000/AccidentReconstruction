// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.5/esri/copyright.txt for details.
//>>built
define(["require","exports","../../core/Error","../HeightModelInfo"],function(q,f,g,k){function n(a,c,b){if(h(a)&&h(c)){if(null==a||null==c)return 0;if(b||a.heightUnit===c.heightUnit){if(a.heightModel!==c.heightModel)return 2;switch(a.heightModel){case "gravity-related-height":return 0;case "ellipsoidal":return a.vertCRS===c.vertCRS?0:3;default:return 4}}else return 1}else return 4}function h(a){return null==a||null!=a.heightModel&&null!=a.heightUnit}function m(a){return a.heightModelInfo?a.heightModelInfo:
("hasZ"in a?!0===a.hasZ:l(a))?k.deriveUnitFromSR(p,a.spatialReference):null}function l(a){switch(a.type){case "elevation":case "integrated-mesh":case "point-cloud":case "scene":return!0;default:return!1}}Object.defineProperty(f,"__esModule",{value:!0});f.validateWebSceneError=function(a,c){if(!a)return null;if(!h(a))return new g("webscene:unsupported-height-model-info","The vertical coordinate system of the scene is not supported",{heightModelInfo:a});var b=a.heightUnit;a=k.deriveUnitFromSR(a,c).heightUnit;
return b!==a?new g("webscene:incompatible-height-unit","The vertical units of the scene ("+b+") must match the horizontal units of the scene ("+a+")",{verticalUnit:b,horizontalUnit:a}):null};f.rejectLayerError=function(a,c,b){var d=m(a),f=n(d,c,b),e=null;if(d){var h=k.deriveUnitFromSR(d,a.spatialReference).heightUnit;b||h===d.heightUnit||(e=new g("layerview:unmatched-height-unit","The vertical units of the layer must match the horizontal units ("+h+")",{horizontalUnit:h}))}if(null==a.heightModelInfo&&
null==a.spatialReference&&("hasZ"in a?!0===a.hasZ:l(a))||4===f||e)return new g("layerview:unsupported-height-model-info","The vertical coordinate system of the layer is not supported",{heightModelInfo:d,error:e});e=null;switch(f){case 1:a=d.heightUnit||"unknown";b=c.heightUnit||"unknown";e=new g("layerview:incompatible-height-unit","The vertical units of the layer ("+a+") must match the vertical units of the scene ("+b+")",{layerUnit:a,sceneUnit:b});break;case 2:a=d.heightModel||"unknown";b=c.heightModel||
"unknown";e=new g("layerview:incompatible-height-model","The height model of the layer ("+a+") must match the height model of the scene ("+b+")",{layerHeightModel:a,sceneHeightModel:b});break;case 3:a=d.vertCRS||"unknown",b=c.vertCRS||"unknown",e=new g("layerview:incompatible-vertical-datum","The vertical datum of the layer ("+a+") must match the vertical datum of the scene ("+b+")",{layerDatum:a,sceneDatum:b})}return e?new g("layerview:incompatible-height-model-info","The vertical coordinate system of the layer is incompatible with the scene",
{layerHeightModelInfo:d,sceneHeightModelInfo:c,error:e}):null};f.deriveHeightModelInfoFromLayer=m;f.mayHaveHeightModelInfo=function(a){return null!=a.layers||l(a)||void 0!==a.hasZ||void 0!==a.heightModelInfo};var p=new k({heightModel:"gravity-related-height"})});