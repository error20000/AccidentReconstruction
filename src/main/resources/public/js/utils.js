
var Utils = {
		createGraphicShip: function(ship){
			
		},
		updateShipInfo: function(time){
			var curShip = Ships[Config.select];
			if(curShip){
				//基本信息
				Config.shipsForm.mmsi = curShip.mmsi;
				Config.shipsForm.shipLength = curShip.shipLength;
				Config.shipsForm.shipWidth = curShip.shipWidth;
				Config.shipsForm.name = curShip.name;
				Config.shipsForm.showName = curShip.showName;
				Config.shipsForm.callSign = curShip.callSign;
				Config.shipsForm.shipType = curShip.shipType;
				Config.shipsForm.left = curShip.left;
				Config.shipsForm.trail = curShip.trail;
				//时间线信息
				var curPoint = curShip.timeLine[time];
				if(curPoint){
					Config.shipsForm.lat = curPoint.lat;
					Config.shipsForm.lon = curPoint.lon;
					Config.shipsForm.time = curPoint.time;
					Config.shipsForm.speed = curPoint.speed;
					Config.shipsForm.cog = curPoint.cog;
					Config.shipsForm.head = curPoint.head;
					Config.shipsForm.unkonw = curPoint.unkonw;
				}
			}
			
			/*for (var i = 0; i < curShip.data.length; i++) {
				if(){
					Config.shipsForm = {
						mmsi: curShip.mmsi,
						shipLength: curShip.shipLength,
						shipWidth: curShip.shipLength,
						name: '',
						showName: '',
						callSign:'',
						shipType:'',
						left: 0,
						track: 0,
						lat: 0, 
						lon: 0, 
						real: false, 
						time: '', 
						speed: 0, 
						cos: 0, 
						head: 0
					}
				}
				(function(h){
					var oldLal = Config.shipsShape[h];
					var lal = Utils.findShipTimePointLaL(Ships[h], timePoint);
					var lonCount = lal.lon - oldLal.geometry.longitude;
					var latCount = lal.lat - oldLal.geometry.latitude;
					setTimeout(() => {
						ArGis.view.graphics.removeMany(Config.shipsShape);
						var tmp = oldLal.clone();
						tmp.geometry.longitude = tmp.geometry.longitude + lonCount;
						tmp.geometry.latitude = tmp.geometry.latitude + latCount;
						var cgp = Utils.createGraphicPoint({
							lon: oldLal.geometry.longitude + lonCount,
							lat: oldLal.geometry.latitude + latCount,
							color: Ships[h].trackColor,
							size: 4,
							attr: {mmsi: Ships[h].mmsi, type: "ship_point"},
							template:{}
						});
						Config.shipsShape.push(cgp);
						console.log(cgp);
						//加入地图
						ArGis.view.graphics.add(cgp);
					}, 1*1000);
				})(i);
			}*/
			/*if(CurShipInfo[timePoint]){
				//绘制ship
				console.log(CurShipInfo[timePoint].time);
				//绘制shipInfo
				
			}*/
		},
		updateShip: function(time){
			for (var i = 0; i < Ships.length; i++) {
				var ship = Ships[i];
				var timePoint = ship.timeLine[time];
				if(timePoint){
					var oldTimePoint = "";
					this.animateShip(oldTimePoint, timePoint);
				}
			}
			
		},
		animateShip: function(fromPoint, toPoint){
			if(!toPoint){
				return;
			}
			if(!fromPoint){ //加入
				var mmsi = toPoint.mmsi;
				
			}else{ //运动
				
			}
		},
		findShipTimePointLaL: function(ship, time){
			var timePoint = {};
			for (var i = 0; i < ship.timeLine.length; i++) {
				if(time == ship.timeLine[i].time){
					timePoint = ship.timeLine[i];
					break;
				}
			}
			return {
				lon: timePoint.lon,
				lat: timePoint.lat
			}
		},
		createShip: function(params){
			var ship;
			require(["esri/Color","esri/Graphic"], 
					function (Color, Graphic) {
				 	  var geometry = {
					        type: "polyline", 
					        paths: params.paths
					      };
						
				      var symbol  = {
				  		    type: "simple-line",  
				  		    color: params.color ? new Color(params.color) : [226, 119, 40],
				  		    width: params.width ? params.width : "4px",
				  		    style: params.style ? params.style : "solid"
				  		  };
				      
				      ship = new Graphic({
				    	  	geometry: geometry,
						    symbol: symbol,
						    attributes: params.attr
				      	});
				      
				      if(params.template){
				    	  line.popupTemplate = params.template;
				      }
			});
			return ship;
		},
		createPoint: function(params){
			var point;
			require(["esri/Color","esri/Graphic"], 
					function (Color, Graphic) {
						var geometry = {
							type: "point",
						    longitude: params.lon,
						    latitude: params.lat
						  };
						
				      var symbol  = {
				  		    type: "simple-marker",  
				  		    color: params.color ? new Color(params.color) : [226, 119, 40],
				  		     size: params.size ? params.size : "8px",
						    outline: {
						    	style:"none"
						    }
				  		  };

				      point = new Graphic({
				    	  	geometry: geometry,
						    symbol: symbol,
						    attributes: params.attr
				      	});

				      if(params.template){
				    	  point.popupTemplate = params.template;
				      }
			});
			return point;
		},
		createLine: function(params){
			var line;
			require(["esri/Color","esri/Graphic"], 
					function (Color, Graphic) {
				 	  var geometry = {
					        type: "polyline", 
					        paths: params.paths
					      };
						
				      var symbol  = {
				  		    type: "simple-line",  
				  		    color: params.color ? new Color(params.color) : [226, 119, 40],
				  		    width: params.width ? params.width : "4px",
				  		    style: params.style ? params.style : "solid"
				  		  };
				      
				      line = new Graphic({
				    	  	geometry: geometry,
						    symbol: symbol,
						    attributes: params.attr
				      	});
				      
				      if(params.template){
				    	  line.popupTemplate = params.template;
				      }
			});
			return line;
		},
		createShap: function(params){
			var point;
			require(["esri/Color","esri/Graphic"], 
					function (Color, Graphic) {
						var geometry = {
							type: "point",
						    longitude: params.lon,
						    latitude: params.lat
						  };
							
						var symbol  = {
							type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
							  url: "/images/onerun.png",
							  width: "8px",
							  height: "8px"

				  		  };
				      
				      point = new Graphic({
				    	  	geometry: geometry,
						    symbol: symbol,
						    attributes: params.attr
				      	});
				      
				      if(params.template){
				    	  point.popupTemplate = params.template;
				      }
			});
			return point;
		},
		createInfo: function(params){
			var point;
			require(["esri/Color","esri/Graphic"], 
					function (Color, Graphic) {
						var geometry = {
							type: "point",
						    longitude: params.lon,
						    latitude: params.lat
						  };
							
						var symbol  = {
				  		    type: "simple-marker",  
				  		    color: params.color ? new Color(params.color) : [226, 119, 40],
				  		     size: params.size ? params.size : "8px",
						    outline: {
						    	style:"none"
						    }
				  		  };
				      
				      point = new Graphic({
				    	  	geometry: geometry,
						    symbol: symbol,
						    attributes: params.attr
				      	});
				      
				      if(params.template){
				    	  point.popupTemplate = params.template;
				      }
			});
			return point;
		},
		drawPoint: function(params){
			var point = this.createPoint(params);
			ArGis.trackLayer.add(point);
		},
		drawLine: function(params){
			var line = this.createLine(params);
			ArGis.trackLayer.add(line);
		},
		drawShape: function(params){
			
		},
		drawInfo: function(params){
			
		},
		removeTrackType: function(type, graphics) {
			var delArray = [];
			graphics.forEach(function(item, i){
			  if(item.attributes && item.attributes.type == type){
				  delArray.push(item);
			  }
			});
			graphics.removeMany(delArray);
		},
		formatDate: function(d, s){
		    var date = new Date();
		    if(d){
		        if(typeof d == 'object'){
		            date = d;
		        }else{
		            if(isNaN(d)){
		                date = new Date(d.replace(/-/g, "/").replace(/年/g, "/").replace(/月/g, "/").replace(/日/g, " ").replace(/时/g, ":").replace(/分/g, ":").replace(/秒/g, ""));
		            }else{
		                d = String(d).length == 10 ? d + "000" : String(d).length == 13 ? d : new Date().getTime() + Number(d);
		                date = new Date(Number(d));
		            }
		        }
		    }
		    var weekday = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
		    var weekdayS = ["日","一","二","三","四","五","六"];
		    var weekdayEn = ["Sunday","Monday","Tuesday","Wednesday","Thursday ","Friday","Saturday"];
		    var weekdayEnS = ["Sun.","Mon.","Tues.","Wed.","Thurs. ","Fri.","Sat."];
		    var t = String(s);
		    t = t.replace('yyyy', date.getFullYear());
		    t = t.replace('yy', date.getYear);
		    t = t.replace('MM', (date.getMonth()+1) < 10 ? "0"+(date.getMonth()+1) : (date.getMonth()+1));
		    t = t.replace('M', (date.getMonth()+1));
		    t = t.replace('dd', date.getDate() < 10 ? "0"+date.getDate() : date.getDate());
		    t = t.replace('d', date.getDate());
		    t = t.replace('HH', date.getHours() < 10 ? "0"+date.getHours() : date.getHours());
		    t = t.replace('H', date.getHours());
		    t = t.replace('mm', date.getMinutes() < 10 ? "0"+date.getMinutes() : date.getMinutes());
		    t = t.replace('m', date.getMinutes());
		    t = t.replace('ss', date.getSeconds() < 10 ? "0"+date.getSeconds() : date.getSeconds());
		    t = t.replace('s', date.getSeconds());
		    t = t.replace('S', date.getMilliseconds());
		    t = t.replace('en:ww', weekdayEn[date.getDay()]);
		    t = t.replace('en:w', weekdayEnS[date.getDay()]);
		    t = t.replace('cn:ww', weekday[date.getDay()]);
		    t = t.replace('cn:w', weekdayS[date.getDay()]);
		    t = t.replace('ww', weekday[date.getDay()]);
		    t = t.replace('w', weekdayS[date.getDay()]);
		    return t;
		}
};