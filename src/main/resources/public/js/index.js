
var Colors=[];

var Config = {
		defulatColor: [226, 119, 40],
		defulatTimeFormat: "yyyy-MM-dd HH:mm:ss",
		
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

var Ships=[{
	mmsi: 0,
	name: "1号船",
	paths:[],
	trackColor: "",
	trackSize: "",
	data: [{lat:30.1976, lon:124.9822, real:true, time: "2018-03-24 12:00:00", speed: 11, cos: 4, head:359,mmsi:0 },
			{lat:30.1977, lon:124.9822, real:true, time: "2018-03-24 12:00:01", speed: 11, cos: 4, head:359,mmsi:0 },
			{lat:30.1978, lon:124.9822, real:true, time: "2018-03-24 12:00:02", speed: 11, cos: 4, head:359,mmsi:0 },
			{lat:30.1979, lon:124.9822, real:true, time: "2018-03-24 12:00:03", speed: 11, cos: 4, head:359,mmsi:0 },
			{lat:30.198, lon:124.9822, real:true, time: "2018-03-24 12:00:04", speed: 11, cos: 4, head:359,mmsi:0 },
			{lat:30.1981, lon:124.9822, real:true, time: "2018-03-24 12:00:05", speed: 11, cos: 4, head:359,mmsi:0, event: function(){console.log("time event!");} },
			{lat:30.1982, lon:124.9822, real:true, time: "2018-03-24 12:00:06", speed: 11, cos: 4, head:359,mmsi:0 },
			{lat:30.1983, lon:124.9822, real:true, time: "2018-03-24 12:00:07", speed: 11, cos: 4, head:359,mmsi:0 },
			{lat:30.1984, lon:124.9822, real:true, time: "2018-03-24 12:00:08", speed: 11, cos: 4, head:359,mmsi:0 },
			{lat:30.1985, lon:124.9822, real:true, time: "2018-03-24 12:00:09", speed: 11, cos: 4, head:359,mmsi:0 },
			{lat:30.1986, lon:124.9822, real:true, time: "2018-03-24 12:00:10", speed: 11, cos: 4, head:359,mmsi:0 }

	]
}];

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
		center: [124, 30],
		initData: function(){
			//加载数据
			//基础数据
			for (var i = 0; i < ShipInfoData.length; i++) {
				var info = ShipInfoData[i];
				info.data = [];
				Ships[i] = info;
				
			}
			//轨迹数据
			var shipsTemp = {};
			for (var i = 0; i < ShipTrackData.length; i++) {
				var key = ShipTrackData[i].Mmsi;
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
				if(!obj){
					obj = {
						mmsi: key,
						data: []
					};
					obj.data.push(change);
					shipsTemp[key] = obj;
				}else{
					obj.data.push(change);
					shipsTemp[key] = obj;
				}
			}
			for (var i = 0; i < Ships.length; i++) {
				Ships[i].data = shipsTemp[Ships[i].mmsi].data;
				delete shipsTemp[Ships[i].mmsi];
			}
			/*for (var k in shipsTemp) {
				Ships.push(shipsTemp[k]);
			}*/
			console.log(Ships);
			
			//ship
			for (var i = 0; i < Ships.length; i++) {
				var ship = Ships[i];
				var select = {
						value: i,
						label: ship.showName
				};
				Config.shipsSelect.push(select);
				//select
				if(Config.select == i){
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
				}
			}
		},
		initMap: function(){
			//加载工具

			//绘制碰撞点
			Utils.drawPoint({
						lon: 124,
						lat: 33,
						color: [226, 119, 40],
						size: 10,
						attr: {
							time: "",
							lon: 124,
							lat: 33,
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
			
		},
		initTimeLine: function(){
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
						minTime: ShipTimeData[i].UpdateTime,
						maxTime: ShipTimeData[i].UpdateTime,
						timePoints: {}
					};
					obj.timePoints[ShipTimeData[i].UpdateTime] = timePoint;//对象方便查询，且去重
					shipTimeTemp[key] = obj;
				}else{
					obj.timePoints[ShipTimeData[i].UpdateTime] = timePoint;
					if(ShipTimeData[i].UpdateTime < obj.minTime){
						obj.minTime = ShipTimeData[i].UpdateTime;
					}
					if(ShipTimeData[i].UpdateTime > obj.maxTime){
						obj.maxTime = ShipTimeData[i].UpdateTime;
					}
					shipTimeTemp[key] = obj;
				}
			}
			// 2、创建虚拟点
			
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
			var minTime = "";
			var maxTime = "";
			for (var i = 0; i < Ships.length; i++) {
				var ship = Ships[i];
				for (var j = 0; j < ship.data.length; j++) {
					if(!minTime){
						minTime = ship.data[j].time;
					}else{
						if(minTime > ship.data[j].time){
							minTime = ship.data[j].time;
						}
					}
					if(!maxTime){
						maxTime = ship.data[j].time;
					}else{
						if(maxTime < ship.data[j].time){
							maxTime = ship.data[j].time;
						}
					}
				}
			}
			var endTime = Math.floor((new Date(maxTime.replace("-","/")).getTime() - new Date(minTime.replace("-","/")).getTime())/1000);
			
			PlayController.endTime= endTime;
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

