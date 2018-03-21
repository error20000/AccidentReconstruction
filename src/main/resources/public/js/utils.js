
var Utils = {
		
		point: function(lon, lat, color, veiw){
			require(["esri/Color","esri/Graphic"], function (Color, Graphic) {
				var point = {
				        type: "point", // autocasts as new Point()
				        longitude: lon,
				        latitude: lat
				      };

				      // Create a symbol for drawing the point
				      var markerSymbol = {
				        type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
				        color: new Color(color) //[226, 119, 40],
				      };
				      
				   // Create an object for storing attributes related to the line
				      var lineAtt = {
				        Name: "Keystone Pipeline",
				        Owner: "TransCanada",
				        Length: "3,456 km"
				      };

				      // Create a graphic and add the geometry and symbol to it
				      var pointGraphic = new Graphic({
				        geometry: point,
				        symbol: markerSymbol,
				        attributes: lineAtt,
				        popupTemplate: { // autocasts as new PopupTemplate()
				          title: "{Name}",
				          content: [{
				            type: "fields",
				            fieldInfos: [{
				              fieldName: "Name"
				            }, {
				              fieldName: "Owner"
				            }, {
				              fieldName: "Length"
				            }]
				          }]
				        }
				      });
				      
				      veiw.graphics.add(pointGraphic);
			});
			 
		}
}