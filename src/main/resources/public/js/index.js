
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
			trail: 0,
			lat: 0, 
			lon: 0, 
			real: false, 
			time: '', 
			speed: 0, 
			cos: 0, 
			head: 0
		},
		
		msgEvent: "",
		
		isTrailShow: false,
		isTrailShowPoint: false,
		isTrailShowLine: false,
		isTrailShowDashed: false,
		isTrailShowShape: false,
		isTrailShowInfo: false,
		trailPoint: {},
		trailLine: {},
		trailDashed: {},
		trailShape: {},
		trailInfo: {}
		
};

var Ships=[{
	mmsi: 0,
	name: "1号船",
	paths:[],
	trailColor: "",
	trailSize: "",
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
			for (var i = 0; i < ShipTrailData.length; i++) {
				var key = ShipTrailData[i].Mmsi;
				var change = {
						mmsi: ShipTrailData[i].Mmsi,
						lat: Number(ShipTrailData[i].Lat),
						lon: Number(ShipTrailData[i].Long),
						time: ShipTrailData[i].UpdateTime,
						speed: Number(ShipTrailData[i].Speed),
						cog: Number(ShipTrailData[i].Cog),
						head: Number(ShipTrailData[i].Head),
						unkonw: ShipTrailData[i].unkonw,
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
		initTrail: function(){
			for (var i = 0; i < Ships.length; i++) {
				var ship = Ships[i];
				for (var j = 0; j < ship.data.length; j++) {
					var point = ship.data[j];
					if(point.real){
						//点
						Utils.drawPoint({
							lon: point.lon,
							lat: point.lat,
							color: point.color || ship.trailColor,
							size: point.size,
							attr: {mmsi: ship.mmsi, type: "trail_point"},
							template:{}
						});
						//线
						var tempLine = Config.trailLine[ship.mmsi];
						if(!tempLine){
							tempLine = [[point.lon, point.lat]];
						}else{
							tempLine.push([point.lon, point.lat]);
						}
						Config.trailLine[ship.mmsi] = tempLine;
						//形状
						Utils.drawShape({
							paths: [],
							color: point.color,
							width: "",
							style: "",
							attr: {mmsi: ship.mmsi, type: "trail_shape"},
							template:{}
						});
						//事件
						Utils.drawInfo({
							paths: [],
							color: point.color,
							width: "",
							style: "",
							attr: {mmsi: ship.mmsi, type: "trail_info"},
							template:{}
						});
					}
				}
			}
		},
		initShips: function(){
			
		},
		initTimeLine: function(){
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
		drawTrail: function(){
			if(Config.isTrailShow){
				for (var i = 0; i < Ships.length; i++) {
					var ship = Ships[i];
					this.showTrailPoint(ship);
					this.showTrailLine(ship);
					this.showTrailDashed(ship);
					this.showTrailShape(ship);
					this.showTrailInfo(ship);
				}
			}else{
				Config.isTrailShowPoint = false;
				Config.isTrailShowLine = false;
				Config.isTrailShowDashed = false;
				Config.isTrailShowShape = false;
				Config.isTrailShowInfo = false;
				this.clearTrail();
			}
		},
		clearTrail: function(){
			this.clearTrailPoint();
			this.clearTrailLine();
			this.clearTrailDash();
			this.clearTrailShape();
			this.clearTrailInfo();
		},
		clearTrailPoint: function(){
			Utils.removeGraphicsByType("trail_point");
		},
		clearTrailLine: function(){
			Utils.removeGraphicsByType("trail_line");
		},
		clearTrailDash: function(){
			Utils.removeGraphicsByType("trail_dash");
		},
		clearTrailShape: function(){
			Utils.removeGraphicsByType("trail_shape");
		},
		clearTrailInfo: function(){
			Utils.removeGraphicsByType("trail_info");
		},
		showTrailPoint: function(ship){
			if(Config.isTrailShowPoint){
				ArGis.view.graphics.addMany(Config.trailPoint[ship.mmsi]);
			}
		},
		showTrailLine: function(ship){
			if(Config.isTrailShowLine){
				var params = {
						paths: Config.trailLine[ship.mmsi],
						color: ship.trailColor,
						width: ship.trailSize,
						style: "",
						attr: {mmsi: ship.mmsi, type: "trail_line"},
						template: {}
				};
				Utils.drawLine(params);
			}
		},
		showTrailDashed: function(ship){
			if(Config.isTrailShowDashed){
				var params = {
						paths: Config.trailLine[ship.mmsi],
						color: ship.trailColor,
						width: ship.trailSize,
						style: "short-dash",
						attr: {mmsi: ship.mmsi, type: "trail_dash"},
						template: {}
				};
				Utils.drawLine(params);
			}
		},
		showTrailShape: function(ship){
			if(Config.isTrailShowShape){
				//TODO 需要改为shape
				ArGis.view.graphics.addMany(Config.trailPoint[ship.mmsi]);
			}
		},
		showTrailInfo: function(ship){
			if(Config.isTrailShowInfo){
				//TODO 需要改为info
				ArGis.view.graphics.addMany(Config.trailPoint[ship.mmsi]);
			}
		}
};

