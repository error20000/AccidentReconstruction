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
		updateShip: function(timePoint, timeEvent, shipIndex){
			var ship = Ships[shipIndex];
			if(timeEvent){
				var temp1 = ship.timeLine[timeEvent.time[0]];
				var temp2 = ship.timeLine[timeEvent.time[1]];
				//总差距
				var count = timeEvent.index[1] - timeEvent.index[0];
				var lonCount = temp2.lon - temp1.lon;
				var latCount = temp2.lat - temp1.lat;
				var speedCount = temp2.speed - temp1.speed;
				var cogCount = temp2.cog - temp1.cog;
				var headCount = temp2.head - temp1.head;
				//每秒差距
				var lonSecond = lonCount/count;
				var latSecond = latCount/count;
				var speedSecond = speedCount/count;
				var cogSecond = cogCount/count;
				var headSecond = headCount/count;
				//动画
				var startTime = timePoint-1 <= 0 ? 0 : timePoint-1;
				var startPoint = {
						lon: temp1.lon + startTime*lonSecond,
						lat: temp1.lat + startTime*latSecond,
						speed: temp1.speed + startTime*speedSecond,
						cog: temp1.cog + startTime*cogSecond,
						head: temp1.head + startTime*headSecond
				};
				var interval = 1/60;
				var intervalCount = 0;
				var tempInterval = setInterval(() => {
					//ship
					ArGis["shipLayer_"+ship.mmsi].graphics.removeAll();
					var shipGraphic = Utils.createShip({
						lon: startPoint.lon,
						lat: startPoint.lat,
						angle: startPoint.head * Math.PI/180,
						shipPath: "M23.5,29 14.5,0 5.5,29z" //ship.paths
					})
					ArGis["shipLayer_"+ship.mmsi].graphics.add(shipGraphic);
					//cog
					ArGis["shipCogLayer_"+ship.mmsi].graphics.removeAll();
					var cogLon = startPoint.cog * Math.PI/180;
					var lon = ship.shipLength/ArGis.view.scale;
					var lat = lon/Math.atan(cogLon);
					console.log(ship.shipLength);
					console.log(cogLon);
					console.log(lat);
					var cogLine = Utils.createLine({
						paths:[[startPoint.lon, startPoint.lat],[startPoint.lon+lon, startPoint.lat+lat]],
						width: "1px"
					});
					ArGis["shipCogLayer_"+ship.mmsi].graphics.add(cogLine);
					
					startPoint = {
							lon: startPoint.lon + lonSecond*interval,
							lat: startPoint.lat + latSecond*interval,
							speed: startPoint.speed + speedSecond*interval,
							cog: startPoint.cog + cogSecond*interval,
							head: startPoint.head + headSecond*interval
					};
					intervalCount = intervalCount+1;
					if(intervalCount >= 1/interval - 2){
						clearInterval(tempInterval);
					}
				}, interval*1000);
			}
		},
		/*updateShip: function(timePoint, timeEvent){
			var shipsTemp = {};
			for (var i = 0; i < Ships.length; i++) {
				var ship = Ships[i];
				if(timeEvent){
					var temp1 = ship.timeLine[timeEvent.time[0]];
					var temp2 = ship.timeLine[timeEvent.time[1]];
					//总差距
					var count = timeEvent.index[1] - timeEvent.index[0];
					var lonCount = temp2.lon - temp1.lon;
					var latCount = temp2.lat - temp1.lat;
					var speedCount = temp2.speed - temp1.speed;
					var cogCount = temp2.cog - temp1.cog;
					var headCount = temp2.head - temp1.head;
					//每秒差距
					var lonSecond = lonCount/count;
					var latSecond = latCount/count;
					var speedSecond = speedCount/count;
					var cogSecond = cogCount/count;
					var headSecond = headCount/count;
					//动画
					var startTime = timePoint-1 <= 0 ? 0 : timePoint-1;
					var startPoint = {
							lon: temp1.lon + startTime*lonSecond,
							lat: temp1.lat + startTime*latSecond,
							speed: temp1.speed + startTime*speedSecond,
							cog: temp1.cog + startTime*cogSecond,
							head: temp1.head + startTime*headSecond
					};
					shipsTemp[ship.mmsi] = {
							startPoint: startPoint,
							lonSecond: lonSecond,
							latSecond: latSecond,
							speedSecond: speedSecond,
							cogSecond: cogSecond,
							headSecond: headSecond,
					};
				}
			}
			//动画
			var interval = 1/60;
			var intervalCount = 0;
			var tempInterval = setInterval(() => {
				ArGis.shipLayer.graphics.removeAll();
				ArGis.shipCogLayer.graphics.removeAll();
				for (var i = 0; i < Ships.length; i++) {
					var ship = Ships[i];
					var shipsTemp = shipsTemp[ship.mmsi];
					if(shipsTemp){
						var startPoint = shipsTemp.startPoint;
						var lonSecond = shipsTemp.lonSecond;
						var latSecond = shipsTemp.latSecond;
						var speedSecond = shipsTemp.speedSecond;
						var cogSecond = shipsTemp.cogSecond;
						var headSecond = shipsTemp.headSecond;
						
						//ship
						var shipGraphic = Utils.createShip({
							lon: startPoint.lon,
							lat: startPoint.lat,
							angle: startPoint.head * Math.PI/180,
							shipPath: "M23.5,29 14.5,0 5.5,29z" //ship.paths
						})
						ArGis.shipLayer.graphics.add(shipGraphic);
						//cog
						var cogLon = startPoint.cog * Math.PI/180;
						var lon = ship.shipLength/ArGis.view.scale;
						var lat = lon/Math.atan(cogLon);
						console.log(ship.shipLength);
						console.log(cogLon);
						console.log(lat);
						var cogLine = Utils.createLine({
							paths:[[startPoint.lon, startPoint.lat],[startPoint.lon+lon, startPoint.lat+lat]],
							width: "1px"
						});
						ArGis.shipCogLayer.graphics.add(cogLine);
						
						startPoint = {
								lon: startPoint.lon + lonSecond*interval,
								lat: startPoint.lat + latSecond*interval,
								speed: startPoint.speed + speedSecond*interval,
								cog: startPoint.cog + cogSecond*interval,
								head: startPoint.head + headSecond*interval
						};
						intervalCount = intervalCount+1;
						if(intervalCount >= 1/interval - 2){
							clearInterval(tempInterval);
						}
					}
				}
			}, interval*1000);
		},*/
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
			var geometry = {
					type: "point",
				    longitude: params.lon ? params.lon : params.paths[0],
					latitude: params.lat ? params.lat : params.paths[1]
				  };
				
		      var symbol  = {
		  		    type: "simple-marker",  
		  		    angle:  params.angle,
		  		    path: params.shipPath
		  		  };
			return this.createGraphic(geometry, symbol, params.attr, params.template);
		},
		createPoint: function(params){
			var geometry = {
					type: "point",
				    longitude: params.lon ? params.lon : params.paths[0],
				    latitude: params.lat ? params.lat : params.paths[1]
				  };
				
		      var symbol  = {
		  		    type: "simple-marker",  
		  		    color: params.color ? params.color : [226, 119, 40],
		  		     size: params.width ? params.width : "4px",
				    outline: {
				    	style:"none"
				    }
		  		  };
			return this.createGraphic(geometry, symbol, params.attr, params.template);
		},
		createLine: function(params){
			var geometry = {
			        type: "polyline", 
			        paths: params.paths
			      };
				
		      var symbol  = {
		  		    type: "simple-line",  
		  		    color: params.color ? params.color : [226, 119, 40],
		  		    width: params.width ? params.width : "1px",
		  		    style: params.style ? params.style : "solid"
		  		  };
			return this.createGraphic(geometry, symbol, params.attr, params.template);
		},
		createShap: function(params){
		    var geometry = {
				type: "point",
			    longitude: params.lon ? params.lon : params.paths[0],
				latitude: params.lat ? params.lat : params.paths[1]
			  };
				
			var symbol  = {
				type: "picture-marker", 
				  url: params.url,
				  width: params.width ? params.width : "8px",
				  height: params.height ? params.height : "8px"

	  		  };
			return this.createGraphic(geometry, symbol, params.attr, params.template);
		},
		createInfo: function(params){
			var geometry = {
					type: "point",
				    longitude: params.lon ? params.lon : params.paths[0],
					latitude: params.lat ? params.lat : params.paths[1]
				  };
					
			var symbol  = {
	  		    type: "simple-marker",  
	  		    color: params.color ? params.color : [226, 119, 40],
	  		     size: params.width ? params.width : "1px",
			    outline: {
			    	style:"none"
			    }
	  		  };
			return this.createGraphic(geometry, symbol, params.attr, params.template);
		},
		createGraphic: function(geometry, symbol, attr, template){
			var graphic;
			require(["esri/Graphic"], 
					function (Graphic) {
				      
					graphic = new Graphic({
			    	  	geometry: geometry,
					    symbol: symbol
			      	});
					
			      if(attr){
			    	  graphic.attributes = attr;
			      }
			      if(template){
			    	  graphic.popupTemplate = template;
			      }
			});
			return graphic;
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