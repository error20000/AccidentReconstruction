var ShipInfoData = [
	{mmsi:'356137000',shipLength: 274,shipWidth: 50,name: 'SANCHI',showName: '1号船',callSign:'3FJU8',shipType:'油轮',left: 13,trail: 43,paths: "M23.5,29 14.5,0 5.5,29z",color: "green",trackColor: "green",trackSize: "",url:"images/11.png",trackUrl:"images/track1.png"},
	{mmsi:'477550800',shipLength: 225,shipWidth: 32,name: 'CF CRYSTAL',showName: '2号船',callSign:'VRIC2',shipType:'货船',left: 17,trail: 32,paths: "",color: "red",trackColor: "red",trackSize: "",url:"images/22.png",trackUrl:"images/track2.png"},
	{mmsi:'249023000',shipLength: 129,shipWidth: 20,name: 'CCL NINGBO',showName: '3号船',callSign:'9HA4081',shipType:'集装箱船',left: 10,trail: 12,paths: "",color: "",trackColor: "",trackSize: "",url:"",trackUrl:""},
	{mmsi:'412420292',shipLength: 50,shipWidth: 6,name: '浙岱渔03187',showName: '4号船',callSign:'',shipType:'捕捞',left: 3,trail: 35,paths: "",color: "",trackColor: "",trackSize: "",url:"",trackUrl:""}
	];

/*getShipCenterPoint : (function(){
	return {x: this.shipWidth/2, y: this.shipLength/2};
}),
getCenterToGisPoint : (function(){
	return {x: this.getShipCenterPoint().x - this.left, y: this.getShipCenterPoint().y - this.trail};//以船中心为原点
}),
getCenterToGisDistance : (function(){
	return Math.sqrt(Math.pow(this.getCenterToGisPoint().x, 2) + Math.pow(this.getCenterToGisPoint().y, 2));
}),
getCenterToGisDeg : (function(){
	return Math.atan(this.getCenterToGisPoint().x/this.getCenterToGisPoint().y)*180/Math.PI+180;
}) */

