// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.5/esri/copyright.txt for details.
//>>built
define(["../../core/Accessor","./colorUtils"],function(d,b){var c="#ffffff #858585 #ffbebe #ffebbe #ffebaf #ffffbe #e9ffbe #d3ffbe #beffe8 #bee8ff #bed2ff #e8beff #ffbee8 #ebebeb #707070 #ff7f7f #ffa77f #ffd37f #ffff73 #d1ff73 #a3ff73 #73ffdf #73dfff #73b2ff #df73ff #ff73df #d6d6d6 #5c5c5c #ff0000 #ff5500 #ffaa00 #ffff00 #aaff00 #55ff00 #00ffc5 #00c5ff #0070ff #c500ff #ff00c5 #c2c2c2 #474747 #e60000 #e64c00 #e69800 #e6e600 #98e600 #4ce600 #00e6a9 #00a9e6 #005ce6 #a900e6 #e600a9 #adadad #242424 #a80000 #a83800 #a87000 #a8a800 #70a800 #38a800 #00a884 #0084a8 #004da8 #8400a8 #a80084 #999999 #1a1a1a #730000 #732600 #734c00 #737300 #4c7300 #267300 #00734c #004c73 #002673 #4c0073 #73004c".split(" ");
return d.createSubclass({properties:{colors:{value:c}},colors:null,_colorsSetter:function(a){this._set("colors",this._normalizeColors(a||c))},contains:function(a){return-1<this.colors.indexOf(b.toHex(a))},_normalizeColors:function(a){return a.map(b.toHex)}})});