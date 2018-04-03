var TimeLineEventData = [
	{"index":[0,10],"time":["2018/1/6 19:40:00","2018/1/6 19:58:00"],event: function(timePoint, timeEvent){
			Utils.updateShip(timePoint, timeEvent, 0);
			Utils.updateShip(timePoint, timeEvent, 1);
	}},
];