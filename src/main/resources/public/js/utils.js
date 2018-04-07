var Utils = {
		setShip: function(shipIndex, lon, lat){
			var ship = Ships[shipIndex];
			var shipGraphic = Utils.createShip({
				lon: lon,
				lat: lat,
				angle: 0,
				url: ship.url,
				width: ship.shipWidth/ArGis.view.state.resolution + "px",
				height: ship.shipLength/ArGis.view.state.resolution + "px"
			});
			ArGis["shipLayer_"+ship.mmsi].graphics.add(shipGraphic);
		},
		updateShipInfo: function(shipIndex, time, params){
			var curShip = Ships[shipIndex];
			if(curShip){
				//基本信息
				Config.shipsForm[shipIndex].mmsi = curShip.mmsi;
				Config.shipsForm[shipIndex].shipLength = curShip.shipLength;
				Config.shipsForm[shipIndex].shipWidth = curShip.shipWidth;
				Config.shipsForm[shipIndex].name = curShip.name;
				Config.shipsForm[shipIndex].showName = curShip.showName;
				Config.shipsForm[shipIndex].callSign = curShip.callSign;
				Config.shipsForm[shipIndex].shipType = curShip.shipType;
				Config.shipsForm[shipIndex].left = curShip.left;
				Config.shipsForm[shipIndex].trail = curShip.trail;
				//时间线信息
				var curPoint = curShip.timeLine[time];
				if(curPoint){
					Config.shipsForm[shipIndex].lat = curPoint.lat;
					Config.shipsForm[shipIndex].lon = curPoint.lon;
					Config.shipsForm[shipIndex].time = curPoint.time;
					Config.shipsForm[shipIndex].speed = Number(Number(curPoint.speed).toFixed(1));
					Config.shipsForm[shipIndex].cog = Number(Number(curPoint.cog).toFixed(1));
					Config.shipsForm[shipIndex].head = Number(Number(curPoint.head).toFixed(1));
					Config.shipsForm[shipIndex].unkonw = curPoint.unkonw;
				}
				//其他信息
				this.appendShipInfo(shipIndex, {
					lonlat: Utils.lonTodfm(curPoint.lon)+"/"+Utils.latTodfm(curPoint.lat),
					time: Utils.formatDate(curPoint.time, "HH:mm"),
					cc: Config.shipsForm[shipIndex].head+"°",
					tc: Config.shipsForm[shipIndex].cog+"°",
				});
				//日期
				Config.timeDesc = Utils.formatDate(curPoint.time, "HH:mm:ss DATE JAN/dd/18"); 
				var date = new Date(curPoint.time);
				Config.timeUTCDesc = date.getUTCHours()+":"+(date.getUTCMinutes() < 10 ? "0"+date.getUTCMinutes() : date.getUTCMinutes())+" UTC"; 
			}
		},
		appendShipInfo: function(shipIndex, params){
			var curShip = Ships[shipIndex];
			if(curShip){
				//其他信息
				Config.shipsForm[shipIndex].lonlat = params.lonlat || Config.shipsForm[shipIndex].lonlat; //文本经纬度
				Config.shipsForm[shipIndex].car = params.car || Config.shipsForm[shipIndex].car; //车
				Config.shipsForm[shipIndex].cc = params.cc || Config.shipsForm[shipIndex].cc; //罗航向
				Config.shipsForm[shipIndex].tc = params.tc || Config.shipsForm[shipIndex].tc; //真航向
				Config.shipsForm[shipIndex].driver = params.driver || Config.shipsForm[shipIndex].driver; //值班驾驶员
				Config.shipsForm[shipIndex].sailor = params.sailor || Config.shipsForm[shipIndex].sailor; //值班水手
				Config.shipsForm[shipIndex].ro = params.ro || Config.shipsForm[shipIndex].ro; //舵令
				Config.shipsForm[shipIndex].time = params.time || Config.shipsForm[shipIndex].time; //时间
				Config.shipsForm[shipIndex].carl = params.carl || Config.shipsForm[shipIndex].carl; //车令
				Config.shipsForm[shipIndex].man = params.man || Config.shipsForm[shipIndex].man; //下达人
				Config.shipsForm[shipIndex].distance = params.distance || Config.shipsForm[shipIndex].distance; //距离
				Config.shipsForm[shipIndex].position = params.position || Config.shipsForm[shipIndex].position; //方位
				Config.shipsForm[shipIndex].cpa = params.cpa || Config.shipsForm[shipIndex].cpa; //cpa
				Config.shipsForm[shipIndex].tcpa = params.tcpa || Config.shipsForm[shipIndex].tcpa; //tcpa
				Config.weatherDesc = params.weather || Config.weatherDesc; //天气
			}
		},
		updateShip: function(timePoint, timeEvent, shipIndex){
			var ship = Ships[shipIndex];
			if(timeEvent){
				var temp1 = ship.timeLine[timeEvent.time[0]];
				var temp2 = ship.timeLine[timeEvent.time[1]];
				console.log(temp1.lon +"---"+temp1.lat);
				console.log(temp2.lon +"---"+temp2.lat);
				console.log("=====================================");
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
				var startTime = timePoint-timeEvent.timeStart-1 <= 0 ? 0 : timePoint-timeEvent.timeStart-1;
				var startPoint = {
						lon: temp1.lon + startTime*lonSecond,
						lat: temp1.lat + startTime*latSecond,
						speed: temp1.speed + startTime*speedSecond,
						cog: temp1.cog + startTime*cogSecond,
						head: temp1.head //+ startTime*headSecond
				};
				var interval = 1/60;
				var intervalCount = 0;
				var tempInterval = setInterval(() => {
					//ship
					ArGis["shipLayer_"+ship.mmsi].graphics.removeAll();
					var shipGraphic = "";
					if(ArGis.view.zoom >= 0 && ArGis.view.zoom <= 14){
						shipGraphic = Utils.createShipSign({
							lon: startPoint.lon,
							lat: startPoint.lat,
							angle: startPoint.head,
							color: ship.color
						});
					}else{
						shipGraphic = Utils.createShip({
							lon: startPoint.lon,
							lat: startPoint.lat,
							angle: startPoint.head,
							url: ship.url,
							width: ship.shipWidth/ArGis.view.state.resolution + "px",
							height: ship.shipLength/ArGis.view.state.resolution + "px"
						});
					}
					
					ArGis["shipLayer_"+ship.mmsi].graphics.add(shipGraphic);
					//cog
					ArGis["shipCogLayer_"+ship.mmsi].graphics.removeAll();
					var cogLon = startPoint.cog;
					var lon = ship.shipLength/ArGis.view.scale;
					var lat = lon/Math.atan(cogLon);
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
							head: startPoint.head //+ headSecond*interval
					};
					intervalCount = intervalCount+1;
					if(intervalCount >= 1/interval - 2){
						clearInterval(tempInterval);
					}
				}, interval*1000);
				
			}
		},
		animateShip: function(shipIndex, formTime, toTime, timeEvent){
			var ship = Ships[shipIndex];
			if(timeEvent){
				var temp1 = ship.timeLine[formTime];
				var temp2 = ship.timeLine[toTime];
				console.log(temp1.lon +"---"+temp1.lat);
				console.log(temp2.lon +"---"+temp2.lat);
				console.log("================******=====================");
				var count = 60;
				var interval = 1/count;
				var intervalCount = 0;
				//总差距
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
				var tempInterval = setInterval(() => {
					var startPoint = {
							lon: temp1.lon + intervalCount*lonSecond,
							lat: temp1.lat + intervalCount*latSecond,
							speed: temp1.speed + intervalCount*speedSecond,
							cog: temp1.cog + intervalCount*cogSecond,
							head: temp1.head + intervalCount*headSecond
					};
					//ship
					ArGis["shipLayer_"+ship.mmsi].graphics.removeAll();
					var shipGraphic = "";
					if(ArGis.view.zoom >= 0 && ArGis.view.zoom <= 14){
						shipGraphic = Utils.createShipSign({
							lon: startPoint.lon,
							lat: startPoint.lat,
							angle: startPoint.head,
							color: ship.color
						});
					}else{
						shipGraphic = Utils.createShip({
							lon: startPoint.lon,
							lat: startPoint.lat,
							angle: startPoint.head,
							url: ship.url,
							width: ship.shipWidth/ArGis.view.state.resolution + "px",
							height: ship.shipLength/ArGis.view.state.resolution + "px"
						});
					}
					
					ArGis["shipLayer_"+ship.mmsi].graphics.add(shipGraphic);
					//cog
					ArGis["shipCogLayer_"+ship.mmsi].graphics.removeAll();
					var cogLon = startPoint.cog;
					var lon = ship.shipLength/ArGis.view.scale;
					var lat = lon/Math.atan(cogLon);
					var cogLine = Utils.createLine({
						paths:[[startPoint.lon, startPoint.lat],[startPoint.lon+lon, startPoint.lat+lat]],
						width: "1px"
					});
					ArGis["shipCogLayer_"+ship.mmsi].graphics.add(cogLine);
					
					intervalCount = intervalCount+1;
					if(intervalCount >= 1/interval ){
						clearInterval(tempInterval);
					}
				}, interval*1000);
				
			}
		},
		createShip: function(params){
			var geometry = {
					type: "point",
				    longitude: params.lon ? params.lon : params.paths[0],
					latitude: params.lat ? params.lat : params.paths[1]
				  };
				
		      var symbol  = {
		  		    type: "picture-marker",  
		  		    angle:  params.angle,
		  		    url: params.url,
		  		    width: params.width,
				    height: params.height
		  		  };
			return this.createGraphic(geometry, symbol, params.attr, params.template);
		},
		createShipSign: function(params){
			var geometry = {
					type: "point",
				    longitude: params.lon ? params.lon : params.paths[0],
					latitude: params.lat ? params.lat : params.paths[1]
				  };
				
		      var symbol  = {
		  		    type: "simple-marker", 
		  		    color: params.color,
		  		    angle: params.angle,
		  		    path: "M23.5,29 14.5,0 5.5,29z"
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
		    t = t.replace('yy', date.getYear());
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
		},
		mercatorToLonLat: function(x, y){ //20037508.342789244 = (Math.PI * 6378137)
			var toX = x/ 20037508.342789244 * 180;
            var toY = y/ 20037508.342789244 * 180;
            toY = 180 / Math.PI * (2 * Math.atan(Math.exp(toY * Math.PI / 180)) - Math.PI / 2);
            return {
            	lon: toX,
            	lat: toY
            };
		},
		lonLatToMercator: function(lon, lat){
			var toX = lon * 20037508.342789244 / 180;
            var toY = Math.log(Math.tan((90 + lat) * Math.PI / 360)) / (Math.PI / 180);
            toY = toY * 20037508.342789244 / 180;
            return {
            	x: toX,
            	y: toY
            };
		},
		xToLon: function(x){ 
			var toX = x/ 20037508.342789244 * 180;
            return toX;
		},
		yToLon: function(y){ 
            var toY = y/ 20037508.342789244 * 180;
            toY = 180 / Math.PI * (2 * Math.atan(Math.exp(toY * Math.PI / 180)) - Math.PI / 2);
            return toY;
		},
		lonTox: function(lon){
			var toX = lon * 20037508.342789244 / 180;
            return toX;
		},
		latToy: function(lat){
			var toY = Math.log(Math.tan((90 + lat) * Math.PI / 360)) / (Math.PI / 180);
            toY = toY * 20037508.342789244 / 180;
            return toY;
		},
		dfmTolonlat: function(str){
			var d = Number(str.split("°")[0]);
			var f = Number(str.split("°")[1].split("′")[0]);
			var m = Number(str.split("°")[1].split("′")[1].split("″")[0]);
			return d + f/60 + m/3600 
		},
		lonlatTodfm: function(lonlat){
			var d = String(lonlat).split(".")[0];
			var deg = String(lonlat).split(".").length < 2 ? 0 : Number("0."+String(lonlat).split(".")[1]);
			var f = String(deg*60).split(".")[0];
			deg = String(deg*60).split(".").length < 2 ? 0 : Number("0."+String(deg*60).split(".")[1]);
			var m = Number(deg*60).toFixed(1);
			return d + "°" + f + "′" + m;
		},
		lonTodfm: function(lon){
			return this.lonlatTodfm(lon).replace("-","") + (lon < 0 ? "W" : "E");
		},
		latTodfm: function(lat){
			return this.lonlatTodfm(lat).replace("-","") + (lat < 0 ? "S" : "N");
		}
};