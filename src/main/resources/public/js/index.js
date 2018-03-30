

var Config = {
		defulatColor: [226, 119, 40],
		defulatTimeFormat: "yyyy/M/d HH:mm:ss",
		timeLength: 5*60, 
		
		select: 0,
		shipsSelect: [],
		shipsForm:{
			mmsi:'',
			shipLength: 0,
			shipWidth: 0,
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
		},
		shipsShape: [],
		msgEvent: "",
		
		isTrackShow: false,
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
				var key = ShipTrackData[i].Mmsi;
				var keyHash = ShipTrackData[i].Mmsi+"_"+ShipTrackData[i].UpdateTime;
				var change = {
						mmsi: ShipTrackData[i].Mmsi,
						lat: Number(ShipTrackData[i].Lat),
						lon: Number(ShipTrackData[i].Long),
						time: ShipTrackData[i].UpdateTime,
						speed: Number(ShipTrackData[i].Speed),
						cog: Number(ShipTrackData[i].Cog),
						head: Number(ShipTrackData[i].Head),
						unkonw: ShipTrackData[i].unkonw,
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
				var key = ShipTimeData[i].Mmsi;
				var timePoint = {
						mmsi: ShipTimeData[i].Mmsi,
						lat: Number(ShipTimeData[i].Lat),
						lon: Number(ShipTimeData[i].Long),
						time: ShipTimeData[i].UpdateTime,
						speed: Number(ShipTimeData[i].Speed),
						cog: Number(ShipTimeData[i].Cog),
						head: Number(ShipTimeData[i].Head),
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
						ship.timeLine = ship.timeLine || [];
						var tmp1 = timePoints[j];
						var tmp2 = timePoints[j+1];
						var count = Math.floor(new Date(tmp2.time).getTime()/1000) - Math.floor(new Date(tmp1.time).getTime()/1000);
						var latCount = tmp2.lat - tmp1.lat;
						var lonCount = tmp2.lon - tmp1.lon;
						var speedCount = tmp2.speed - tmp1.speed;
						var cogCount = tmp2.cog - tmp1.cog;
						var headCount = tmp2.head - tmp1.head;
						ship.timeLine.push(tmp1);
						for (var k = 1; k < count; k++) {
							var timeLinePoint = {
									mmsi: tmp1.mmsi,
									lat: tmp1.lat + k*latCount/count,
									lon: tmp1.lon + k*lonCount/count,
									time: Utils.formatDate(new Date(tmp1.time).getTime() + k*1000, Config.defulatTimeFormat),
									speed: tmp1.speed + k*speedCount/count,
									cog: tmp1.cog + k*cogCount/count,
									head: tmp1.head + k*headCount/count,
									real: false
							};
							ship.timeLine.push(timeLinePoint);
						}
					}
				}
			}
			console.log(Ships);
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
		},
		initMap: function(){
			//加载工具

			//绘制碰撞点
			Utils.drawPoint({
						lon: Center.lon,
						lat: Center.lat,
						color: [226, 119, 40],
						size: 10,
						attr: {
							time: "2018/1/6 19:50:00",
							lon: Center.lon,
							lat: Center.lat,
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
				for (var i = 0; i < Ships.length; i++) {
					var ship = Ships[i];
					for (var j = 0; j < ship.data.length; j++) {
						var point = ship.data[j];
						if(point.real){
							//点
							var cgp = Utils.createGraphicPoint({
								lon: point.lon,
								lat: point.lat,
								color: point.color || ship.trackColor,
								size: point.size,
								attr: {mmsi: ship.mmsi, type: "track_point"},
								template:{}
							});
							var tempPoint = Config.trackPoint[ship.mmsi];
							if(!tempPoint){
								tempPoint = [cgp];
							}else{
								tempPoint.push(cgp);
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
							Utils.drawShape({
								paths: [],
								color: point.color,
								width: "",
								style: "",
								attr: {mmsi: ship.mmsi, type: "track_shape"},
								template:{}
							});
							//事件
							Utils.drawInfo({
								paths: [],
								color: point.color,
								width: "",
								style: "",
								attr: {mmsi: ship.mmsi, type: "track_info"},
								template:{}
							});
						}
					}
				}
//			}, 10);
		},
		initShips: function(){
			var startTime = "2018/1/6 19:00:00"; 
			for (var i = 0; i < Ships.length; i++) {
				var lal = Utils.findShipTimePointLaL(Ships[i], startTime);
				//绘制船型
				var cgp = Utils.createGraphicPoint({
					lon: lal.lon,
					lat: lal.lat,
					color: Ships[i].trackColor,
					size: 4,
					attr: {mmsi: Ships[i].mmsi, type: "ship_point"},
					template:{}
				});
				//加入缓存
				Config.shipsShape.push(cgp);console.log(cgp);
				//加入地图
				ArGis.view.graphics.add(cgp);
			}
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
			PlayController.emitPaused = function(){
				video.pause();
			};
			PlayController.emitPlay = function(){
				video.play();
			};
			PlayController.emitRePlay = function(){
				video.currentTime = 0;
				video.play();
			};
			PlayController.emitUpdateTime = function(updateTime){
				video.currentTime += updateTime;
			};
			PlayController.timePointEvent = function(timePoint){
				var temp = Utils.formatDate(Math.floor(new Date(minTime.replace("-","/")).getTime()/1000) + Math.floor(timePoint), Config.defulatTimeFormat);
				Utils.updateShipInfo(temp);
				if(TimeEvent[temp]){
					for (var i = 0; i < TimeEvent[temp].length; i++) {
						if(typeof TimeEvent[temp][i].event == "function"){
							TimeEvent[temp][i].event();
						}
					}
				}
			};
		},
		drawTrack: function(){
			if(Config.isTrackShow){
				for (var i = 0; i < Ships.length; i++) {
					var ship = Ships[i];
					this.showTrackPoint(ship);
					this.showTrackLine(ship);
					this.showTrackDashed(ship);
					this.showTrackShape(ship);
					this.showTrackInfo(ship);
				}
			}else{
				Config.isTrackShowPoint = false;
				Config.isTrackShowLine = false;
				Config.isTrackShowDashed = false;
				Config.isTrackShowShape = false;
				Config.isTrackShowInfo = false;
				this.clearTrack();
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
			Utils.removeGraphicsByType("track_point");
		},
		clearTrackLine: function(){
			Utils.removeGraphicsByType("track_line");
		},
		clearTrackDash: function(){
			Utils.removeGraphicsByType("track_dash");
		},
		clearTrackShape: function(){
			Utils.removeGraphicsByType("track_shape");
		},
		clearTrackInfo: function(){
			Utils.removeGraphicsByType("track_info");
		},
		showTrackPoint: function(ship){
			if(Config.isTrackShowPoint){
				ArGis.view.graphics.addMany(Config.trackPoint[ship.mmsi]);
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
				//TODO 需要改为shape
				ArGis.view.graphics.addMany(Config.trackPoint[ship.mmsi]);
			}
		},
		showTrackInfo: function(ship){
			if(Config.isTrackShowInfo){
				//TODO 需要改为info
				ArGis.view.graphics.addMany(Config.trackPoint[ship.mmsi]);
			}
		}
};

