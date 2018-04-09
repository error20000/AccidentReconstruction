

var Config = {
		defulatColor: [226, 119, 40],
		defulatTimeFormat: "yyyy/M/d HH:mm:ss",
		timeLength: 0,
		accidentTime: ["2018/1/6 19:45:00", "2018/1/6 19:55:00"],
		detailTime: ["2018/1/6 19:00:00", "2018/1/6 20:00:00"],
		
		select: 0,
		shipsSelect: [],
		shipsForm:[{
			mmsi:'',
			shipLength: '',
			shipWidth: '',
			name: '',
			showName: '',
			callSign:'',
			shipType:'',
			left: '',
			track: '',
			lon: '', 
			lat: '', 
			real: false, 
			time: '', 
			speed: '', 
			cog: '', 
			head: '', 
			
			lonlat: '', 
			car: '',
			cc: '', 
			tc: '', 
			driver: '',
			sailor: '',
			ro: '',
			time: '',
			carl: '',
			man: '',
			distance: '',
			position: '',
			cpa: '', 
			tcpa: ''
		},{
			mmsi:'',
			shipLength: '',
			shipWidth: '',
			name: '',
			showName: '',
			callSign:'',
			shipType:'',
			left: '',
			track: '',
			lon: '', 
			lat: '', 
			real: false, 
			time: '', 
			speed: '', 
			cog: '', 
			head: '', 
			
			lonlat: '', 
			car: '',
			cc: '', 
			tc: '', 
			driver: '',
			sailor: '',
			ro: '',
			time: '',
			carl: '',
			man: '',
			distance: '',
			position: '',
			cpa: '', 
			tcpa: ''
		}],
		shipsShape: [],
		timeEvent: [],
		timeSelect: 0,
		msgDesc: [],
		weatherDesc: "",
		timeDesc: "",
		timeUTCDesc: "",

		isTrackShowPoint: false,
		isTrackShowLine: false,
		isTrackShowDashed: false,
		isTrackShowShape: false,
		isTrackShowInfo: false,
		trackPoint: {},
		trackLine: {},
		trackDashed: {},
		trackShape: {},
		trackInfo: {}
		
};

var Ships=[];

var CurShipInfo = {};
var TimeEvent = {
		
};

var TimeControl={
		speed: 1,
		startTime: '',
		video: [] 
};
ArGis={
		map: "",
		view: "",
		center: [Center.lon, Center.lat],
		initData: function(){
//			Ships = shipFinalData;
//			return;
			//加载数据
			// 1、基础数据
			for (var i = 0; i < ShipInfoData.length; i++) {
				var info = ShipInfoData[i];
				info.data = [];
				Ships[i] = info;
				
			}
			// 2、轨迹数据
			var shipsTemp = {}, shipsHash={};
			for (var i = 0; i < ShipTrackData.length; i++) {
				var shipData = ShipTrackData[i];
				var key = shipData.Mmsi;
				var keyHash = shipData.Mmsi+"_"+shipData.UpdateTime;
				var change = {
						mmsi: shipData.Mmsi,
						lat: Number(shipData.Lat),
						lon: Number(shipData.Long),
						time: shipData.UpdateTime,
						speed: Number(shipData.Speed),
						cog: Number(shipData.Cog),
						head: Number(shipData.Head),
						unkonw: shipData.unkonw,
						real: true
				};
				var obj = shipsTemp[key];
				var objHash = shipsHash[keyHash];
				if(!obj){
					obj = {
						mmsi: key,
						data: []
					};
					var index = obj.data.push(change);
					shipsTemp[key] = obj;
					shipsHash[keyHash] = index;
				}else{
					if(!objHash){
						var index = obj.data.push(change);
						shipsHash[keyHash] = index;
					}else{
						obj.data[objHash-1] = change;
					}
					shipsTemp[key] = obj;
				}
			}
			for (var i = 0; i < Ships.length; i++) {
				Ships[i].data = shipsTemp[Ships[i].mmsi].data;
				delete shipsTemp[Ships[i].mmsi];
			}
			/*for (var k in shipsTemp) { //添加所有船只
				Ships.push(shipsTemp[k]);
			}*/
			// 3、优化轨迹数据
			for (var i = 0; i < Ships.length; i++) {
				var ship = Ships[i];
				var tempData = [];
				for (var j = 0; j < ship.data.length; j++) {
					if(ship.data[j].time >= Config.accidentTime[0] && ship.data[j].time <= Config.accidentTime[1]){ //这个时间段内点不优化
						tempData.push(ship.data[j]);
						continue;
					}
					if(j == 0){
						tempData.push(ship.data[j]);
					}else if(j == ship.data.length-1){
						tempData.push(ship.data[j]);
					}else{
						var temp1 = ship.data[j-1];
						var temp2 = ship.data[j];
						if(temp1.lat != temp2.lat && temp1.lon != temp2.lon){
							tempData.push(ship.data[j]);
						}
					}
				}
				ship.data = tempData;
			}
			
			// 4、设置被观察船只
			for (var i = 0; i < Ships.length && i < ShipInfoData.length; i++) {
				var ship = Ships[i];
				var select = {
						value: i,
						label: ship.showName
				};
				Config.shipsSelect.push(select);
				//select
				/*if(Config.select == i){
					for (var j = 0; j < ship.data.length; j++) {
						CurShipInfo[ship.data[j].time] = ship.data[j];
					}
				}
				//event
				for (var j = 0; j < ship.data.length; j++) {
					if(ship.data[j].event){
						var events = TimeEvent[ship.data[j].time];
						if(!events){
							events = [];
						}
						events.push(ship.data[j]);
						TimeEvent[ship.data[j].time] = events;
					}
				}*/
			}
			//处理时间线
			// 1、创建实点
			var shipTimeTemp = {};
			for (var i = 0; i < ShipTimeData.length; i++) {
				var shipData = ShipTimeData[i];
				var key = shipData.Mmsi;
				var timePoint = {
						mmsi: shipData.Mmsi,
						lat: Number(shipData.Lat),
						lon: Number(shipData.Long),
						time: shipData.UpdateTime,
						speed: Number(shipData.Speed),
						cog: Number(shipData.Cog),
						head: Number(shipData.Head),
						real: true
				};
				var obj = shipTimeTemp[key];
				if(!obj){
					obj = {
						timePoints: [timePoint]
					};
					shipTimeTemp[key] = obj;
				}else{
					obj.timePoints.push(timePoint);
					shipTimeTemp[key] = obj;
				}
			}
			
			// 2、创建虚拟点(只设置被观察船只)
			for (var i = 0; i < Ships.length && i < ShipInfoData.length; i++) {
				var ship = Ships[i];
				if(shipTimeTemp[ship.mmsi]){
					var timePoints = shipTimeTemp[ship.mmsi].timePoints;
					for (var j = 0; j < timePoints.length - 1; j++) {
						ship.timeLine = ship.timeLine || {};
						var tmp1 = timePoints[j];
						var tmp2 = timePoints[j+1];
						var count = Math.floor(new Date(tmp2.time).getTime()/1000) - Math.floor(new Date(tmp1.time).getTime()/1000);
						var latCount = tmp2.lat - tmp1.lat;
						var lonCount = tmp2.lon - tmp1.lon;
						var speedCount = tmp2.speed - tmp1.speed;
						var cogCount = tmp2.cog - tmp1.cog;
						var headCount = tmp2.head - tmp1.head;
						if(tmp1.time >= Config.detailTime[0] && tmp1.time <= Config.detailTime[1]){
							ship.timeLine[tmp1.time] = tmp1;
						}
						for (var k = 1; k < count; k++) {
							var time = Utils.formatDate(new Date(tmp1.time).getTime() + k*1000, Config.defulatTimeFormat);
							var timeLinePoint = {
									mmsi: tmp1.mmsi,
									lat: tmp1.lat + k*latCount/count,
									lon: tmp1.lon + k*lonCount/count,
									time: time,
									speed: tmp1.speed + k*speedCount/count,
									cog: tmp1.cog + k*cogCount/count,
									head: tmp1.head + k*headCount/count,
									real: false
							};
							if(time >= Config.detailTime[0] && time <= Config.detailTime[1]){
								ship.timeLine[time] = timeLinePoint;
							}
						}
					}
				}
			}
			console.log(Ships);
			/*var blob = new Blob([JSON.stringify(Ships)],{type : 'application/json'});
			var a = document.createElement('a');
			var url = window.URL.createObjectURL(blob);
			var filename = 'ship.txt';
			a.href = url;
			a.download = filename;
			a.click();
			window.URL.revokeObjectURL(url);*/
			/*// 3、创建事件
			var shipEventTemp = {};
			for (var i = 0; i < Ships.length && i < Config.shipsSelect.length; i++) {
				var ship = Ships[i];
				if(ship.timeLine){
					for (var j = 0; j < ship.timeLine.length; j++) {
						var key = ship.mmsi+"_"+ship.timeLine[j].time;
						shipEventTemp[key] = i+"_"+j;
					}
				}
			}
			for (var i = 0; i < ShipEventData.length; i++) {
				var shipEvent = ShipEventData[i];
				var key = shipEvent.Mmsi+"_"+shipEvent.UpdateTime;
				if(shipEventTemp[key]){
					var shipIndex = shipEventTemp[key].split("_")[0];
					var timeLineIndex = shipEventTemp[key].split("_")[1];
					Ships[shipIndex].timeLine[timeLineIndex].eventDesc = shipEvent.EventDesc;
					Ships[shipIndex].timeLine[timeLineIndex].dcpaDesc = shipEvent.DcpaDesc;
				}
			}*/
			//处理事件
			for (var i = 0; i < TimeLineEventData.length; i++) {
				TimeLineEventData[i].timeStart = Config.timeLength;
				Config.timeEvent.push({name:TimeLineEventData[i].name,timeStart:TimeLineEventData[i].timeStart});
				TimeLineEventData[i].index.push(Config.timeLength);
				Config.timeLength += TimeLineEventData[i].timeLength;
				TimeLineEventData[i].index.push(Config.timeLength);
			}
		},
		initMap: function(){
			//加载工具

			//绘制碰撞点
			/*Utils.drawPoint({
						lon: 124.9598,
						lat: 30.8506,
						color: [226, 119, 40],
						width: 10,
						attr: {
							time: "2018/1/6 19:50:00",
							lon: 124.9598,
							lat: 30.8506,
							content: "test"
						},
						template: {
							title:"碰撞点",
							content:[{
							        type: "fields",
							        fieldInfos: [{
							          fieldName: "time",
							          label: "碰撞时间"
							        }, {
							          fieldName: "lon",
							          label: "碰撞经度"
							        }, {
								          fieldName: "lat",
								          label: "碰撞纬度"
							        }, {
								          fieldName: "content",
								          label: "碰撞描述"
							        }]
							      }]
						}
					});*/
			Utils.drawPoint({
				lon: 124.9597,
				lat: 30.851,
				color: "green",
				width: 10,
				attr: {
					time: "2018/1/6 19:50:00",
					lon: 124.9598,
					lat: 30.8506,
					content: "test"
				},
				template: {
					title:"碰撞点",
					content:[{
					        type: "fields",
					        fieldInfos: [{
					          fieldName: "time",
					          label: "碰撞时间"
					        }, {
					          fieldName: "lon",
					          label: "碰撞经度"
					        }, {
						          fieldName: "lat",
						          label: "碰撞纬度"
					        }, {
						          fieldName: "content",
						          label: "碰撞描述"
					        }]
					      }]
				}
			});
			Utils.drawPoint({
				lon: 124.9616,
				lat: 30.8531,
				color: "red",
				width: 10,
				attr: {
					time: "2018/1/6 19:50:00",
					lon: 124.9598,
					lat: 30.8506,
					content: "test"
				},
				template: {
					title:"碰撞点",
					content:[{
					        type: "fields",
					        fieldInfos: [{
					          fieldName: "time",
					          label: "碰撞时间"
					        }, {
					          fieldName: "lon",
					          label: "碰撞经度"
					        }, {
						          fieldName: "lat",
						          label: "碰撞纬度"
					        }, {
						          fieldName: "content",
						          label: "碰撞描述"
					        }]
					      }]
				}
			});
			
		},
		initTrack: function(){
//			setTimeout(() => {
			Config.trackPoint = {};
			Config.trackLine = {};
			Config.trackDashed = {};
			Config.trackShape = {};
			Config.trackInfo = {};
				for (var i = 0; i < Ships.length; i++) {
					var ship = Ships[i];
					
					var shipCenterPoint = {x: ship.shipWidth/2, y: ship.shipLength/2}; 
					var shipGisPoint = {x: ship.left - shipCenterPoint.x, y: ship.trail - shipCenterPoint.y}; //以天线为原点
					var distance = Math.sqrt(Math.pow(shipGisPoint.x, 2) + Math.pow(shipGisPoint.y, 2));
					
					for (var j = 0; j < ship.data.length; j++) {
						var point = ship.data[j];
						if(point.real && (point.time == "2018/1/6 19:50:10" || point.time == "2018/1/6 19:50:23")){
							Utils.drawPoint({
								lon: point.lon,
								lat: point.lat,
								color: point.mmsi == "477550800" ? "red" : "green",
								width: 10
							});
							//点
							var createPoint = Utils.createPoint({
								lon: point.lon,
								lat: point.lat,
								color: point.color || ship.trackColor,
								width: point.width || ship.trackSize,
								attr: {mmsi: ship.mmsi, type: "track_point"},
								template:{}
							});
							var tempPoint = Config.trackPoint[ship.mmsi];
							if(!tempPoint){
								tempPoint = [createPoint];
							}else{
								tempPoint.push(createPoint);
							}
							Config.trackPoint[ship.mmsi] = tempPoint;
							//线
							var tempLine = Config.trackLine[ship.mmsi];
							if(!tempLine){
								tempLine = [[point.lon, point.lat]];
							}else{
								tempLine.push([point.lon, point.lat]);
							}
							Config.trackLine[ship.mmsi] = tempLine;
							//形状
							/*var ship={
									shipWidth: 50,
									shipLength: 274,
									left:13,
									trail: 43,
									head: 350
							};
							var point = {
									lon: 20,
									lat: 20
							}
							var shipCenterPoint = {x: ship.shipWidth/2, y: ship.shipLength/2}; 
							console.log(shipCenterPoint);
							var shipGisPoint = {x: shipCenterPoint.x - ship.left, y: shipCenterPoint.y - ship.trail}; //以船中心为原点
							console.log(shipGisPoint);
							var distance = Math.sqrt(Math.pow(shipGisPoint.x, 2) + Math.pow(shipGisPoint.y, 2));
							console.log(distance);
							var sina = Math.asin(shipGisPoint.y/distance) - (360-ship.head)*Math.PI/180;
							var cos = Math.PI/180 - Math.acos(shipGisPoint.x/distance) - (360-ship.head)*Math.PI/180;
							console.log(sina);
							console.log(cos);
							var lonlatPoint = {x:point.lon,y:point.lat};//Utils.lonLatToMercator(point.lon, point.lat);
							var centerPoint = {
									x: lonlatPoint.x - Math.cos(cos) * distance,
									y: lonlatPoint.y - Math.sin(sina) * distance
							};
							console.log(centerPoint);*/
							
							/*console.log(shipCenterPoint);
							console.log(shipGisPoint);
							console.log(distance);
							console.log(deg);*/
							
							var lonlatPoint = Utils.lonLatToMercator(point.lon, point.lat);
							var centerPoint = {};
							var deg = Math.atan(shipGisPoint.x/shipGisPoint.y)*180/Math.PI+180;
							deg = deg + point.head > 360 ? deg + point.head - 360 : deg + point.head;
							var angle = deg*Math.PI/180;
							centerPoint = {
									x: lonlatPoint.x - Math.sin(angle) * distance,
									y: lonlatPoint.y - Math.cos(angle) * distance
							};
							/*var x = Math.abs(Math.sin(angle) * distance);
							var y = Math.abs(Math.cos(angle) * distance);
							var degLimit = deg;
							if(degLimit >= 0 && degLimit < 90){
								centerPoint = {
										x: lonlatPoint.x - x,
										y: lonlatPoint.y - y
								};
							}else if(degLimit >= 90 && degLimit < 180){
								centerPoint = {
										x: lonlatPoint.x - x,
										y: lonlatPoint.y + y
								};
							}else if(degLimit >= 180 && degLimit < 270){
								centerPoint = {
										x: lonlatPoint.x + x,
										y: lonlatPoint.y + y
								};
							}else{
								centerPoint = {
										x: lonlatPoint.x + x,
										y: lonlatPoint.y - y
								};
							}*/
							
							
							/*var lonlatPoint = Utils.lonLatToMercator(point.lon, point.lat);
							var centerPoint = {};
							if(ship.head >= 0 && ship.head < 90){
								centerPoint = {
										x: lonlatPoint.x + Math.sqrt(1-Math.pow(Math.sin(sina), 2)) * distance,
										y: lonlatPoint.y + Math.sin(sina) * distance
								};
							}else if(ship.head >= 90 && ship.head < 180){
								centerPoint = {
										x: lonlatPoint.x + Math.sqrt(1-Math.pow(Math.sin(sina), 2)) * distance,
										y: lonlatPoint.y - Math.sin(sina) * distance
								};
							}else if(ship.head >= 180 && ship.head < 270){
								centerPoint = {
										x: lonlatPoint.x - Math.sqrt(1-Math.pow(Math.sin(sina), 2)) * distance,
										y: lonlatPoint.y - Math.sin(sina) * distance
								};
							}else{
								centerPoint = {
										x: lonlatPoint.x - Math.sqrt(1-Math.pow(Math.sin(sina), 2)) * distance,
										y: lonlatPoint.y + Math.sin(sina) * distance
								};
							}*/
							
//							console.log(centerPoint);
							
							//画船首线
							var headLine = Utils.createLine({
								paths:[
									[Utils.xToLon(centerPoint.x), Utils.yToLat(centerPoint.y)],
									[Utils.xToLon(centerPoint.x)+Math.sin(point.head*Math.PI/180) * 0.005, Utils.yToLat(centerPoint.y)+Math.cos(point.head*Math.PI/180) * 0.005]
								],
								width: "1px",
								color: ship.color
							});
							//画cog
							var cogLine = Utils.createLine({
								paths:[
									[point.lon, point.lat],
									[point.lon+Math.sin(point.cog*Math.PI/180) * 0.005*(point.speed), point.lat+Math.cos(point.cog*Math.PI/180) * 0.005*(point.speed)]
								],
								width: "1px",
								style: "short-dash"
							});
							ArGis.shipLayer.graphics.add(headLine);
							ArGis.shipLayer.graphics.add(cogLine);
							
							var createShape = Utils.createShape({
								lon: Utils.xToLon(centerPoint.x),/*point.lon,*/
								lat: Utils.yToLat(centerPoint.y),/*point.lat,*/
								angle: point.head,
								url: ship.url,
								width: /*ship.shipWidth/ArGis.view.zoom,*/ship.shipWidth/ArGis.view.state.resolution+"px" ,
								height: /*ship.shipLength/ArGis.view.zoom,*/ship.shipLength/ArGis.view.state.resolution+"px",
								attr: {mmsi: ship.mmsi, type: "track_shape",
									lon: point.lon,
									lat: point.lat,
									time: point.time,
									speed: point.speed,
									head: point.head,
									cog: point.cog,
									showName: ship.showName
								},
								template:{
									title:"详细信息",
									content:[{
									        type: "fields",
									        fieldInfos: [{
										          fieldName: "showName",
										          label: "名称"
										    },{
									          fieldName: "time",
									          label: "时间"
									        }, {
									          fieldName: "lon",
									          label: "经度"
									        }, {
										          fieldName: "lat",
										          label: "纬度"
									        }, {
										          fieldName: "speed",
										          label: "船速"
									        }, {
										          fieldName: "head",
										          label: "船首向"
									        }, {
										          fieldName: "cog",
										          label: "COG"
									        }]
									      }]
								}
							});
							var tempShape = Config.trackShape[ship.mmsi];
							if(!tempShape){
								tempShape = [createShape];
							}else{
								tempShape.push(createShape);
							}
							Config.trackShape[ship.mmsi] = tempShape;
							//事件
							var createInfo = Utils.createInfo({
								lon: point.lon,
								lat: point.lat,
								color: point.color || ship.trackColor,
								width: point.width,
								text: point.time,
								attr: {mmsi: ship.mmsi, type: "track_info"},
								template:{}
							});
							var tempInfo = Config.trackInfo[ship.mmsi];
							if(!tempInfo){
								tempInfo = [createInfo];
							}else{
								tempInfo.push(createInfo);
							}
							Config.trackInfo[ship.mmsi] = tempInfo;
						}
					}
				}
//			}, 10);
		},
		initShips: function(){
			require([
				  "esri/layers/GraphicsLayer",
				], function(GraphicsLayer){
				for (var i = 0; i < Ships.length; i++) {
					ArGis["shipLayer_"+Ships[i].mmsi] = new GraphicsLayer({id:"shipGraphicsLayer_"+Ships[i].mmsi});
					ArGis["shipCogLayer_"+Ships[i].mmsi] = new GraphicsLayer({id:"shipCogGraphicsLayer_"+Ships[i].mmsi});
					ArGis.map.add(ArGis["shipLayer_"+Ships[i].mmsi]);
					ArGis.map.add(ArGis["shipCogLayer_"+Ships[i].mmsi]);
				}
			});
			for (var i = 0; i < Ships.length; i++) {
				
			}
			//绘制船型
			/*var cgp = Utils.createShip({
				paths: "M150 0 L75 200 L225 200 Z",
				color: Ships[i].trackColor,
				width: 4,
				attr: {mmsi: Ships[i].mmsi, type: "ship_"+Ships[i].mmsi},
				template:{}
			});
			//加入缓存
			Config.shipsShape.push(cgp);
			//加入地图
			ArGis.view.graphics.add(cgp);*/
			/*var shipGf = Utils.createShap({
				lon: Center.lon,
				lat: Center.lat
			});
			ArGis.shipLayer.add(shipGf);*/
			/*var shipGraphic = Utils.createShipSign({
				lon: 124.9727,
				lat: 30.7071,
				angle: 0,
				color: "gray"
			})
			ArGis.shipLayer.graphics.add(shipGraphic);*/
			/*var geometry = {
			        type: "polygon", 
			        centroid:{
			        	type: "point", 
			        	x: 13910460.708464786, 
				        y: 3613339.776019942,
				        spatialReference:{
				        	wkid:102100
				        }
			        },
			        rings: [
			            [13910460.708464786-25, 3613339.776019942-150],
			            [13910460.708464786+25, 3613339.776019942-150],
			            [13910460.708464786+25,3613339.776019942+150],
			            [13910460.708464786-25, 3613339.776019942+150],
			            [13910460.708464786-25, 3613339.776019942-150]
			          ],
			          spatialReference:{
				        	wkid:102100
				        }
			      };
				
		      var symbol  = {
		    		  type: "simple-marker", 
		    	        color: [227, 139, 79, 0.8],
		    	        outline: { 
		    	          color: [255, 255, 255],
		    	          width: 1
		    	        },
		    	        style:'square'
		  		  };*/
			/*var geometry = {
			        type: "point", 
			        longitude: 124.9823,
					latitude: 30.199,
			  };
		      var symbol  = {
		    		  type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
				      url: "/images/11.png",
				      width: "50px",
				      height: "275px",
				      angle: 90
		  		  };
		      
			var shipGraphic = Utils.createGraphic(geometry, symbol);
			ArGis.shipLayer.graphics.add(shipGraphic);*/
		},
		initTimeLine: function(){
			//播放事件绑定
			//视频
			var video = document.getElementById("video");
			video.onplay = function(evt){
				PlayController.handlePlay();
			};
			video.onpause = function(evt){
				PlayController.handlePaused();
			};
			video.onended = function(evt){
				PlayController.curPlayTime = 0;
				PlayController.handlePaused();
			};
			video.ontimeupdate = function(evt){
//				console.log(video.currentTime);
			};
			video.onwaiting = function(){
				console.log("onwaiting");
			};
			//插件
			PlayController.endTime= Config.timeLength;
			PlayController.paused= true;
			PlayController.initPlay();
			PlayController.emitPlay = function(){
//				video.play();
				PlayController.handlePlay();
			};
			PlayController.emitPaused = function(){
//				video.pause();
				PlayController.handlePaused();
			};
			PlayController.emitRePlay = function(){
				video.currentTime = 0;
				video.play();
			};
			PlayController.emitUpdateTime = function(updateTime){
				video.currentTime = updateTime;
			};
			PlayController.timePointEvent = function(timePoint){
				var timeEvent;
				for (var i = 0; i < TimeLineEventData.length; i++) {
					if(timePoint >= TimeLineEventData[i].index[0] && timePoint < TimeLineEventData[i].index[1]){
						timeEvent = TimeLineEventData[i];
						break;
					}
				}
				if(timeEvent && typeof timeEvent.event == "function"){
					timeEvent.event(Math.floor(timePoint), timeEvent);
				}
			};
		},
		drawTrack: function(){
			for (var i = 0; i < Ships.length; i++) {
				var ship = Ships[i];
				this.showTrackPoint(ship);
				this.showTrackLine(ship);
				this.showTrackDashed(ship);
				this.showTrackShape(ship);
				this.showTrackInfo(ship);
			}
		},
		clearTrack: function(){
			this.clearTrackPoint();
			this.clearTrackLine();
			this.clearTrackDash();
			this.clearTrackShape();
			this.clearTrackInfo();
		},
		clearTrackPoint: function(){
			Utils.removeTrackType("track_point", ArGis.trackLayer.graphics);
		},
		clearTrackLine: function(){
			Utils.removeTrackType("track_line", ArGis.trackLayer.graphics);
		},
		clearTrackDash: function(){
			Utils.removeTrackType("track_dash", ArGis.trackLayer.graphics);
		},
		clearTrackShape: function(){
			Utils.removeTrackType("track_shape", ArGis.trackLayer.graphics);
		},
		clearTrackInfo: function(){
//			Utils.removeTrackType("track_info", ArGis.map.findLayerById("infoFeatureLayer").source);
		},
		showTrackPoint: function(ship){
			if(Config.isTrackShowPoint){
				ArGis.trackLayer.addMany(Config.trackPoint[ship.mmsi]);
			}
		},
		showTrackLine: function(ship){
			if(Config.isTrackShowLine){
				var params = {
						paths: Config.trackLine[ship.mmsi],
						color: ship.trackColor,
						width: ship.trackSize,
						style: "",
						attr: {mmsi: ship.mmsi, type: "track_line"},
						template: {}
				};
				Utils.drawLine(params);
			}
		},
		showTrackDashed: function(ship){
			if(Config.isTrackShowDashed){
				var params = {
						paths: Config.trackLine[ship.mmsi],
						color: ship.trackColor,
						width: ship.trackSize,
						style: "short-dash",
						attr: {mmsi: ship.mmsi, type: "track_dash"},
						template: {}
				};
				Utils.drawLine(params);
			}
		},
		showTrackShape: function(ship){
			if(Config.isTrackShowShape){
				ArGis.trackLayer.addMany(Config.trackShape[ship.mmsi]);
			}
		},
		showTrackInfo: function(ship){
			if(Config.isTrackShowInfo){
				require(["esri/Color","esri/Graphic","esri/layers/FeatureLayer"], 
						function (Color, Graphic, FeatureLayer) {
					
					var pointsRenderer = {
							type: "unique-value", // autocasts as new UniqueValueRenderer()
							field: "mmsi",
							uniqueValueInfos: [{
								value: "356137000",
								symbol: {
								    type: "simple-fill",  // autocasts as new SimpleFillSymbol()
								    color: "blue"
								  }
							}]
					};
					
					var pointsLayer = new FeatureLayer({
						id: "infoFeatureLayer",
						title: "infoFeatureLayer",
						fields: [
						    {
						     name: "ObjectID",
						     alias: "ObjectID",
						     type: "string"
						   }],
					   objectIdField: "ObjectID",
					   geometryType: "point",

						source: Config.trackInfo[ship.mmsi],
						renderer: pointsRenderer,
						labelingInfo:[{
				            labelExpression: "12344",
				            labelPlacement: "always-horizontal",
				            symbol: {
				              type: "text", // autocasts as new TextSymbol()
				              color: [255, 255, 255, 0.7],
				              haloColor: [0, 0, 0, 0.7],
				              haloSize: 1,
				              font: {
				                size: 11
				              }
				            }
				          }],
						labelsVisible: true
					});
					ArGis.map.add(pointsLayer);
				});
//				ArGis.trackLayer.addMany(Config.trackInfo[ship.mmsi]);
			}
		}
};

