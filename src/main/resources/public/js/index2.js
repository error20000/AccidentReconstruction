

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
		timeEvents: [],
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
		trackInfo: {},
		trackInfo2: {}
		
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
			}
			//处理时间线
			// 1、创建实点
			var shipTimeTemp = {}, shipsTimeHash={};
			for (var i = 0; i < ShipTrackData.length; i++) {
				var shipData = ShipTrackData[i];
				var key = shipData.Mmsi;
				var uniKey = shipData.Mmsi+"_"+shipData.UpdateTime;
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
					shipsTimeHash[uniKey] = obj.timePoints.length;
				}else{
					var uniObj = shipsTimeHash[uniKey];
					if(!uniObj){
						obj.timePoints.push(timePoint);
						shipsTimeHash[uniKey] = obj.timePoints.length;
					}else{
						obj.timePoints[uniObj-1] = timePoint;
					}
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
							var timeLinePoint = {};
							/*if(Math.abs(speedCount) >= 2){
								//不均分
								timeLinePoint = {
										mmsi: tmp1.mmsi,
										lat: tmp1.lat + latCount,
										lon: tmp1.lon + lonCount,
										time: time,
										speed: tmp1.speed,
										cog: tmp1.cog + k*cogCount/count,
										head: tmp1.head + k*headCount/count,
										real: false
								};
							}else{*/
								//均分
								//head
								var tempHead =  tmp1.head;
								if(Math.abs(headCount) > 180){
									if(headCount > 0){
										tempHead = tmp1.head + k*(Math.abs(headCount) - 360)/count
										if(tempHead < 0){
											tempHead = 360 + tempHead;
										}
									}else{
										tempHead = tmp1.head + k*(360 - Math.abs(headCount))/count
										if(tempHead > 360){
											tempHead = tempHead - 360;
										}
									}
								}else{
									tempHead = tmp1.head + k*headCount/count;
								}
								//cog
								var tempCog =  tmp1.cog;
								if(Math.abs(cogCount) > 180){
									if(cogCount > 0){
										tempCog = tmp1.cog + k*(Math.abs(cogCount) - 360)/count
										if(tempCog < 0){
											tempCog = 360 + tempCog;
										}
									}else{
										tempCog = tmp1.cog + k*(360 - Math.abs(cogCount))/count
										if(tempCog > 360){
											tempCog = tempCog - 360;
										}
									}
								}else{
									tempCog = tmp1.cog + k*cogCount/count;
								}
								
								timeLinePoint = {
										mmsi: tmp1.mmsi,
										lat: tmp1.lat + k*latCount/count,
										lon: tmp1.lon + k*lonCount/count,
										time: time,
										speed: tmp1.speed + k*speedCount/count,
										cog: tempCog,
										head: tempHead,
										real: false
								};
//							}
							if(time >= Config.detailTime[0] && time <= Config.detailTime[1]){
								ship.timeLine[time] = timeLinePoint;
							}
						}
						
					}
				}
			}

			console.log(Ships);
			//处理事件
			for (var i = 0; i < TimeLineEventData.length; i++) {
				TimeLineEventData[i].timeStart = Config.timeLength;
				if(TimeLineEventData[i].select){
					Config.timeEvents.push({name:TimeLineEventData[i].name, timeStart:TimeLineEventData[i].timeStart});
				}
				TimeLineEventData[i].index.push(Config.timeLength);
				Config.timeLength += TimeLineEventData[i].timeLength;
				TimeLineEventData[i].index.push(Config.timeLength);
			}
		},
		initMap: function(){
			//加载工具
			/*require([
				  "esri/geometry/Geometry"
				], function(Geometry, TextSymbol3DLayer, ScaleBar, BasemapToggle, GraphicsLayer, Fullscreen){
				
				var peaks = new FeatureLayer({
			        url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/AlpineSummits/FeatureServer",
			        elevationInfo: {
			          mode: "relative-to-ground"
			        },
			        // Select peaks higher than 3000m
			        definitionExpression: "HOEHE > 3000",
			        title: "Peaks higher than 3000m",
			        // Set a renderer that will show the points with icon symbols
			        renderer: {
			          type: "simple", // autocasts as new SimpleRenderer()
			          symbol: {
			            type: "point-3d", // autocasts as new PointSymbol3D()
			            symbolLayers: [{
			              type: "icon", // autocasts as new IconSymbol3DLayer()
			              resource: {
			                primitive: "circle"
			              },
			              material: {
			                color: "black"
			              },
			              size: 4
			            }]
			          }
			        },
			        outFields: ["*"],
			        // Add labels with callouts of type line to the icons
			        labelingInfo: [{
			          // When using callouts on labels, "above-center" is the only allowed position
			          labelPlacement: "above-center",
			          labelExpressionInfo: {
			            value: "{NAME} - {HOEHE}m"
			          },
			          symbol: {
			            type: "label-3d", // autocasts as new LabelSymbol3D()
			            symbolLayers: [{
			              type: "text", // autocasts as new TextSymbol3DLayer()
			              material: {
			                color: "black"
			              },
			              halo: {
			                color: [255, 255, 255, 0.7],
			                size: 2
			              },
			              size: 10
			            }],
			            // Labels need a small vertical offset that will be used by the callout
			            verticalOffset: {
			              screenLength: 150,
			              maxWorldLength: 2000,
			              minWorldLength: 30
			            },
			            // The callout has to have a defined type (currently only line is possible)
			            // The size, the color and the border color can be customized
			            callout: {
			              type: "line", // autocasts as new LineCallout3D()
			              size: 0.5,
			              color: [0, 0, 0],
			              border: {
			                color: [255, 255, 255, 0.7]
			              }
			            }
			          }
			        }],
			        labelsVisible: true
			      });
					ArGis.trackLayer.add(graphic);
			})*/
			
			/*Utils.drawPoint({
				lon: 124.9597,
				lat: 30.851,
				color: "green",
				width: 10,
				attr: {
					time: "2018/1/6 19:50:10",
					lon: 124.9597,
					lat: 30.851
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
					time: "2018/1/6 19:50:10",
					lon: 124.9616,
					lat: 30.8531
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
			
		},
		initAccident: function(){
			//绘制碰撞区域
			/*var draw = true;
			var graphics = ArGis.labelLayer.graphics;
			graphics.forEach(function(item, i){
				if(item.attributes && item.attributes.type == "accident"){
					draw = false;
				}
			});
			if(!draw){
				return;
			}
			var geometry = {
					type: "point",
				    longitude: Center.lon,
					latitude: Center.lat
				  };
					
			var symbol  = {
		  		    type: "simple-marker",  
		  		    color: [255, 255, 255, 0],
		  		     size: 100,
				    outline: {
				    	color : [226, 119, 40],
				    	width: "1px",
				    	style: "short-dash"
				    }
		  		  };
			var attr = {
					time: "2018/1/6 19:50:10",
					lon: Center.lon,
					lat: Center.lat,
					type: "accident"
			};
			var template = {
				title:"碰撞区域",
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
			};
			ArGis.labelLayer.add(Utils.createGraphic(geometry, symbol, attr, template));
			*/
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
					var shipGisPoint = {x: shipCenterPoint.x - ship.left, y: shipCenterPoint.y - ship.trail}; //以天线为原点
					var distance = Math.sqrt(Math.pow(shipGisPoint.x, 2) + Math.pow(shipGisPoint.y, 2));
					//形状
					var tempShipe = {};
					//事件
					var tempInfo = {};
					
					for (var j = 0; j < ship.data.length; j++) {
						var point = ship.data[j];
						if(point.real){
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
							var lonlatPoint = Utils.lonLatToMercator(point.lon, point.lat);
							var shipD = (360-point.head)*Math.PI/180 - Math.atan(shipGisPoint.x/shipGisPoint.y);
							var shipA = {
									x: 0,
									y: distance
							};
							var shipB = {
									x: shipA.x*Math.cos(shipD) - shipA.y*Math.sin(shipD) + lonlatPoint.x,
									y: shipA.y*Math.cos(shipD) + shipA.x*Math.sin(shipD) + lonlatPoint.y
							};
							var centerPoint = {
									x: shipB.x,
									y: shipB.y
							};
							var tempShipe2 ={
									x: centerPoint.x,
									y: centerPoint.y,
									angle: point.head,
									width: ship.shipWidth*2,
									height: ship.shipLength*2,
							};
							var flag = this.canAddShipe(tempShipe, tempShipe2);
//							var flag = true;
							if(flag){
								tempShipe = {
										x: centerPoint.x,
										y: centerPoint.y,
										angle: point.head,
										width: ship.shipWidth*2,
										height: ship.shipLength*2,
								};
								var createShape = Utils.createShape({
										lon: Utils.xToLon(centerPoint.x),
										lat: Utils.yToLat(centerPoint.y),
										angle: point.head,
										url: ship.trackUrl,
										width: ship.shipWidth/Math.floor(ArGis.view.state.resolution)+"px" ,
										height: ship.shipLength/Math.floor(ArGis.view.state.resolution)+"px",
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
							}
							//事件
							/*var lonlatPoint = Utils.lonLatToMercator(point.lon, point.lat);
							var shipD = (360-point.head)*Math.PI/180 - Math.atan(shipGisPoint.x/shipGisPoint.y);
							var shipA = {
									x: 0,
									y: distance
							};
							var shipB = {
									x: shipA.x*Math.cos(shipD) - shipA.y*Math.sin(shipD) + lonlatPoint.x,
									y: shipA.y*Math.cos(shipD) + shipA.x*Math.sin(shipD) + lonlatPoint.y
							};
							var centerPoint = {
									x: shipB.x,
									y: shipB.y
							};
							var tempInfo2 ={
									x: centerPoint.x,
									y: centerPoint.y,
									angle: point.head,
									width: ship.shipWidth,
									height: ship.shipLength,
							};
							var flag = this.canAddShipe(tempInfo, tempInfo2);*/
							if(flag){
								/*tempInfo = {
										x: centerPoint.x,
										y: centerPoint.y,
										angle: point.head,
										width: ship.shipWidth,
										height: ship.shipLength,
								};*/
								var createInfo = Utils.createInfo({
									lon: Utils.xToLon(centerPoint.x),
									lat: Utils.yToLat(centerPoint.y),
									color: point.color || ship.trackColor,
									width: point.width,
									text: point.time,
									attr: {mmsi: ship.mmsi, time: point.time, type: "track_info"},
									template:""
								});
								var tempInfo = Config.trackInfo[ship.mmsi];
								if(!tempInfo){
									tempInfo = [createInfo];
								}else{
									tempInfo.push(createInfo);
								}
								Config.trackInfo[ship.mmsi] = tempInfo;
								
								var createInfo2 = Utils.createShape({
									lon: Utils.xToLon(centerPoint.x),
									lat: Utils.yToLat(centerPoint.y),
									angle: point.head,
									url: ship.trackUrl,
									width: ship.shipWidth/Math.floor(ArGis.view.state.resolution)+"px" ,
									height: ship.shipLength/Math.floor(ArGis.view.state.resolution)+"px",
									attr: {mmsi: ship.mmsi, type: "track_info", base: ship},
									template:""
								});
								var tempInfo2 = Config.trackInfo2[ship.mmsi];
								if(!tempInfo2){
									tempInfo2 = [createInfo2];
								}else{
									tempInfo2.push(createInfo2);
								}
								Config.trackInfo2[ship.mmsi] = tempInfo2;
								
							}
							
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
					ArGis.map.add(ArGis["shipLayer_"+Ships[i].mmsi]);
				}
			});
			
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
//				PlayController.curPlayTime = 0;
				PlayController.handlePaused();
			};
			video.ontimeupdate = function(evt){
				if(video.paused){
					PlayController.timeEventCache = {};
					PlayController.emitUpdateTime(video.currentTime);
				}else{
					PlayController.handleTimeUpdate(video.currentTime);
				}
			};
			video.onwaiting = function(){
				console.log("onwaiting");
			};
			video.onratechange = function(){
				console.log("onratechange");
			};
			video.onloadeddata = function(){
				console.log("onloadeddata");
			};
			//插件
			PlayController.endTime= Config.timeLength;
			PlayController.paused= true;
			PlayController.initPlay();
			PlayController.emitPlay = function(){
				video.play();
//				PlayController.handlePlay();
			};
			PlayController.emitPaused = function(){
				video.pause();
//				PlayController.handlePaused();
			};
			PlayController.emitRePlay = function(){
				video.currentTime = 0;
				video.play();
			};
			PlayController.emitUpdateTime = function(updateTime){
				video.currentTime = updateTime;
				PlayController.curPlayTime = updateTime;
				PlayController.progress = PlayController.progressSpeed * PlayController.curPlayTime;
				//切换地图效果
				
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
			Utils.removeTrackType("track_info", ArGis.trackLayer.graphics);
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
				for (var i = 0; i < Config.trackShape[ship.mmsi].length; i++) {
					var graphic = Config.trackShape[ship.mmsi][i];
					graphic.symbol.width = ship.shipWidth/Math.floor(ArGis.view.state.resolution * 10-3)*10+"px" ;
					graphic.symbol.height = ship.shipLength/Math.floor(ArGis.view.state.resolution * 10-3)*10+"px";
				}
				ArGis.trackLayer.addMany(Config.trackShape[ship.mmsi]);
			}
		},
		showTrackInfo: function(ship){
			if(Config.isTrackShowInfo){
				
				var trackInfoPoint = [];
				for (var i = 0; i < Config.trackInfo[ship.mmsi].length; i++) {
					var graphic = Config.trackInfo[ship.mmsi][i].clone();
					graphic.symbol  = {
						  type: "text", 
						  color: ship.color,
						  haloColor: "black",
						  haloSize: "1px",
						  text: graphic.attributes.time,
						  xoffset: 0,
						  yoffset: 0,
						  font: {  
						    size: ArGis.view.zoom > 13 ? "12px" : ArGis.view.zoom > 10 ? "4px" : "2px",
						    family: "sans-serif"
						  }

			  		  };
					trackInfoPoint.push(graphic);
				}
				ArGis.trackLayer.addMany(trackInfoPoint);
				
				for (var i = 0; i < Config.trackInfo2[ship.mmsi].length; i++) {
					var graphic = Config.trackInfo2[ship.mmsi][i];
					graphic.symbol.width = ship.shipWidth/Math.floor(ArGis.view.state.resolution * 10-3)*10+"px" ;
					graphic.symbol.height = ship.shipLength/Math.floor(ArGis.view.state.resolution * 10-3)*10+"px";
				}
				ArGis.trackLayer.addMany(Config.trackInfo2[ship.mmsi]);
			}
		},
		zoom: function(){
			ArGis.view.zoom = Math.round(ArGis.view.zoom);
			//轨迹
			ArGis.clearTrack();
			ArGis.drawTrack(); 
			//ship
			for (var i = 0; i < Ships.length; i++) {
				var graphics = ArGis["shipLayer_"+Ships[i].mmsi].graphics;
				graphics.forEach(function(item, i){
					if(item.attributes && item.attributes.type == "ship"){
						var shipGraphic;
						if(ArGis.view.zoom >= 0 && ArGis.view.zoom <= 14){
							shipGraphic = Utils.createShipSign({
								lon: item.attributes.params.lon,
								lat: item.attributes.params.lat,
								angle: item.attributes.params.head || 0,
								color: item.attributes.base.color,
								attr: item.attributes
							});
						}else{
							shipGraphic = Utils.createShip({
								lon: item.attributes.change.lon,
								lat: item.attributes.change.lat,
								angle: item.attributes.params.head || 0,
								url: item.attributes.base.url,
								width: item.attributes.base.shipWidth/Math.floor(ArGis.view.state.resolution * 10-3)*10 + "px",
								height: item.attributes.base.shipLength/Math.floor(ArGis.view.state.resolution * 10-3)*10 + "px",
								attr:item.attributes
							});
						}
						graphics.removeAt(i);
						graphics.add(shipGraphic, i);
					}
				});
			}
		},
		fullScreen: function(type){
			if(type == 'map'){
				//内容
				$('.content_1').toggleClass('map_full');
				//按钮
				$('.video_full_button').hide();
				if($('.map_full').length > 0){
					$('.map_full_button .esri-fullscreen').attr('title', '退出全屏模式');
					$('.map_full_button .esri-icon').removeClass('esri-icon-zoom-out-fixed');
					$('.map_full_button .esri-icon').addClass('esri-icon-zoom-in-fixed');
					$('.map_full_button .esri-icon-font-fallback-text').html('退出全屏模式');
					$('.map_full_button').css('left', '1226px');
				}else{
					$('.map_full_button .esri-fullscreen').attr('title', '进入全屏模式');
					$('.map_full_button .esri-icon').removeClass('esri-icon-zoom-in-fixed');
					$('.map_full_button .esri-icon').addClass('esri-icon-zoom-out-fixed');
					$('.map_full_button .esri-icon-font-fallback-text').html('进入全屏模式');
					$('.map_full_button').css('left', '594px');
					$('.video_full_button').show();
				}
			}else{
				//内容
				$('.content_1').toggleClass('video_full');
				//按钮
				$('.map_full_button').hide();
				if($('.video_full').length > 0){
					$('.video_full_button .esri-fullscreen').attr('title', '退出全屏模式');
					$('.video_full_button .esri-icon').removeClass('esri-icon-zoom-out-fixed');
					$('.video_full_button .esri-icon').addClass('esri-icon-zoom-in-fixed');
					$('.video_full_button .esri-icon-font-fallback-text').html('退出全屏模式');
				}else{
					$('.video_full_button .esri-fullscreen').attr('title', '进入全屏模式');
					$('.video_full_button .esri-icon').removeClass('esri-icon-zoom-in-fixed');
					$('.video_full_button .esri-icon').addClass('esri-icon-zoom-out-fixed');
					$('.video_full_button .esri-icon-font-fallback-text').html('进入全屏模式');
					$('.map_full_button').show();
				}
			}
		},
		canAddShipe: function(older, newer){
			if(Utils.isEmpty(older)){
				return true;
			}
			//矩形A
			var c1 = {
				x: older.x,
				y: older.y
			};
			var s1 = {
				width: 	older.width,
				height: older.height
			};
			var d1 = (360 - older.angle) * Math.PI / 180;
			var A = this.rectVertex(c1, s1, d1);
			//矩形B
			var c2 = {
					x: newer.x,
					y: newer.y
			};
			var s2 = {
					width: 	newer.width,
					height: newer.height
			};
			var d2 = (360 - newer.angle) * Math.PI / 180;
			var B = this.rectVertex(c2, s2, d2);
			//OBB
			var flag = false; //默认
			// 1 以A为轴，B在A上的映射
			// x
			var vectorAx = {x: A.x3-A.x4, y: A.y3-A.y4};
			flag = this.collisionTesting(A, B, c1, c2, vectorAx);
			if(flag) return flag;
			// y
			var vectorAy = {x: A.x1-A.x4, y: A.y1-A.y4};
			flag = this.collisionTesting(A, B, c1, c2, vectorAy);
			if(flag) return flag;
			// 2 以B为轴，A在B上的映射
			// x
			var vectorBx = {x: B.x3-B.x4, y: B.y3-B.y4};
			flag = this.collisionTesting(B, A, c2, c1, vectorBx);
			if(flag) return flag;
			// y
			var vectorBy = {x: B.x1-B.x4, y: B.y1-B.y4};
			flag = this.collisionTesting(B, A, c2, c1, vectorBy);
			if(flag) return flag;
			
			return flag;
		},
		rectVertex: function(c1, s1, d1){
			//矩形四个顶点
			/*
			 * p1	p2
			 * p4	p3
			 */
			var p1 = {
				x: c1.x - s1.width/2,
				y: c1.y + s1.height/2,
			};
			var p2 = {
				x: c1.x + s1.width/2,
				y: c1.y + s1.height/2,
			};
			var p3 = {
				x: c1.x + s1.width/2,
				y: c1.y - s1.height/2,
			};
			var p4 = {
				x: c1.x - s1.width/2,
				y: c1.y - s1.height/2,
			};
			//旋转
			var p11 = {
					x: p1.x*Math.cos(d1) - p1.y*Math.sin(d1) + c1.x,
					y: p1.y*Math.cos(d1) + p1.x*Math.sin(d1) + c1.y
			};
			var p12 = {
					x: p2.x*Math.cos(d1) - p2.y*Math.sin(d1) + c1.x,
					y: p2.y*Math.cos(d1) + p2.x*Math.sin(d1) + c1.y
			};
			var p13 = {
					x: p3.x*Math.cos(d1) - p3.y*Math.sin(d1) + c1.x,
					y: p3.y*Math.cos(d1) + p3.x*Math.sin(d1) + c1.y
			};
			var p14 = {
					x: p4.x*Math.cos(d1) - p4.y*Math.sin(d1) + c1.x,
					y: p4.y*Math.cos(d1) + p4.x*Math.sin(d1) + c1.y
			};
			return {
				x1: p11.x,
				y1: p11.y,
				x2: p12.x,
				y2: p12.y,
				x3: p13.x,
				y3: p13.y,
				x4: p14.x,
				y4: p14.y,
			};
		},
		collisionTesting: function(A, B, c1, c2, axis){
			/*
			 * 向量公式：
			 * 两点 A(x1,y1) ，B(x2,y2)
                                                    向量a=AB=(x2-x1,y2-y1)
			 * 向量夹角公式：
			   cosA=a*b/(|a|*|b|)
			               先求出两个向量的模
				再求出两个向量的向量积
				|a|=√(x1^2+y1^2)
				|b|=√(x2^2+y2^2)
				a*b=(x1,y1)(x2,y2)=x1x2+y1y2
				cos=a*b/(|a|*|b|)
			 * */
			// 中心点
			var vectorAB = {x: c2.x-c1.x, y: c2.y-c1.y};
			var cosAB = (vectorAB.x*axis.x+vectorAB.y*axis.y)/(Math.sqrt(Math.pow(vectorAB.x,2) + Math.pow(vectorAB.y,2)) * Math.sqrt(Math.pow(axis.x,2) + Math.pow(axis.y,2)));
			var dABx = Math.abs(cosAB * Math.sqrt(Math.pow(vectorAB.x,2) + Math.pow(vectorAB.y,2)));
			// B1B4 + B1B2 = B2B3 + B3B4
			var vectorB1B4 = {x: B.x1-B.x4, y: B.y1-B.y4};
			var vectorB1B2 = {x: B.x2-B.x1, y: B.y2-B.y1};
			var cosB1B4 = (vectorB1B4.x*axis.x+vectorB1B4.y*axis.y)/(Math.sqrt(Math.pow(vectorB1B4.x,2) + Math.pow(vectorB1B4.y,2)) * Math.sqrt(Math.pow(axis.x,2) + Math.pow(axis.y,2)));
			var cosB1B2 = (vectorB1B2.x*axis.x+vectorB1B2.y*axis.y)/(Math.sqrt(Math.pow(vectorB1B2.x,2) + Math.pow(vectorB1B2.y,2)) * Math.sqrt(Math.pow(axis.x,2) + Math.pow(axis.y,2)));
			var dB1B4x = Math.abs(cosB1B4 * Math.sqrt(Math.pow(vectorB1B4.x,2) + Math.pow(vectorB1B4.y,2)));
			var dB1B2x = Math.abs(cosB1B2 * Math.sqrt(Math.pow(vectorB1B2.x,2) + Math.pow(vectorB1B2.y,2)));
			// axis
			var dAxis = Math.sqrt(Math.pow(axis.x,2) + Math.pow(axis.y,2));
			if(dABx > Math.abs(dB1B2x - dB1B4x)/2 + dAxis/2)
				return true; //未碰撞
			return false //已碰撞
		}
};

