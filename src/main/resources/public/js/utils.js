
var Draws = {
		trail: function(){
			
		},
		ship: function(){
			
		},
		point: function(lon, lat, color, size, attr, template){
			require(["esri/geometry/Point", "esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol","esri/Color","esri/graphic","esri/InfoTemplate"], 
					function (Point, SimpleMarkerSymbol, SimpleLineSymbol, Color, Graphic, InfoTemplate) {
					var geometry = new Point({
				        x: lon,
				        y: lat,
				        spatialReference: {"wkid": 4326 }
				      });

				      var symbol = new SimpleMarkerSymbol({
				    	  style: SimpleMarkerSymbol.STYLE_CIRCLE,
				    	  size: size ? size : 10,
				    	  color: color ? new Color(color) : [226, 119, 40]
				      });
				      
				      var point = new Graphic({
					        geometry: geometry,
					        symbol: symbol.toJson(),
					        attributes: attr,
					        infoTemplate: template
				      	});
				      
				      ArGis.map.graphics.add(point);
			});
			 
		}
}