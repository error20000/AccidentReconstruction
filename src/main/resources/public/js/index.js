
var Colors=[];
var Trail={
		isShow: true,
		isPoint: true,
		isLine: true,
		isDashed: true,
		isShape: true,
		isInfo: true,
		point: [],
		line: [],
		dashed: [],
		shape: [],
		info: []
};
var Ships=[];
var ShipsData={};
var TimeControl={
		speed: 1,
		startTime: '',
		video: [] //碰撞时间，碰撞经纬度，碰撞概述
};
var ArGis={
		baseUrl: window.location.href.replace("index.html","")+"arcgis_js_api/library/3.16",
		map: "",
		center: [124, 30],
		initData: function(){
			//加载数据
		},
		initMap: function(){
			
			//绘制碰撞点
			Draws.point(124, 33,[226, 119, 40], 10, {
				time: "",
				lon: 124,
				lat: 33,
				content: "test"
			},{
				title:"碰撞点",
				content:"碰撞时间：${time}<br/>碰撞经度：${lon}<br/>碰撞纬度：${lat}<br/>碰撞描述：${content}"
			});
		},
		initTrail: function(){
			if(Trail.isShow){
				this.drawTrail();
			}else{
				this.clearTrail();
			}
		},
		initShips: function(){
			
		},
		initTimeLine: function(){
			
		},
		drawTrail: function(){
			this.showTrailPoint();
			this.showTrailLine();
			this.showTrailDashed();
			this.showTrailShape();
		},
		clearTrail: function(){
			this.clearTrailPoint();
			this.clearTrailLine();
			this.clearTrailDashed();
			this.clearTrailShape();
		},
		showTrailPoint: function(){
			if(Trail.isPoint){
				Draws.point(124,30,[226, 119, 40]);
			}
		},
		showTrailLine: function(){
			
		},
		showTrailDashed: function(){
			
		},
		showTrailShape: function(){
			
		},
		
};

