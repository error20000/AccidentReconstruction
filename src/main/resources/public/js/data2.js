var TimeLineEventSlideCache = false;
var TimeLineEventData = [
	{"name":"事故背景介绍","timeStart":0,"index":[],"timeLength":Utils.timeLength("00:01", "01:20"),"time":["",""],select:true,event: function(timePoint, timeEvent){
		Config.timeSelect = timeEvent.timeStart;
		var timeSplit = 30;
		var tempSlideCache1 = timePoint < timeEvent.timeStart + timeSplit ? TimeLineEventSlideCache : false;
		var tempSlideCache2 = timePoint >= timeEvent.timeStart + timeSplit ? TimeLineEventSlideCache : false;
		//map
		if(timePoint == timeEvent.timeStart+5 || tempSlideCache1){
			ArGis.view.goTo({center:[52.3156, 27.5066],zoom: 8}, {duration: 3000});
			TimeLineEventSlideCache = false;
		}
		if(timePoint == timeEvent.timeStart + 9){
			Utils.setShip(0, {lon:52.3156, lat:27.5066, head: 140, cog: 0});
		}
				
		if(timePoint == timeEvent.timeStart + 5){
			Utils.addDescMsg(1, "<b>2017年12月18日</b>，“1”轮从伊朗阿萨卢耶港装载凝析油约111,510吨驶往韩国瑞山港，离港时艏艉吃水均为13.4米，船上重油2974吨、轻油119吨、滑油42吨，预计抵达目的港时船上重油1900吨、轻油119吨、滑油42吨，开航时船上32人。1月6日，该船在东海海域航行。");
		}
		//map
		if(timePoint == timeEvent.timeStart + timeSplit || tempSlideCache2){
			ArGis.view.goTo({center:[-122.8474, 46.0085],zoom: 8}, {duration: 3000});
			Utils.setShip(1, {lon: -122.8474, lat: 46.0085, head: 330, cog: 0});
			TimeLineEventSlideCache = false;
		}
		if(timePoint == timeEvent.timeStart + timeSplit){
			Utils.addDescMsg(2, "<b>2017年12月15日</b>，“2”轮装载63997.817吨散装高梁从美国卡拉马港开航，目的港中国东莞，离港时艏吃水13.02米，艉吃水13.02米。");
		}
		if(timePoint == timeEvent.timeStart + 50){
			Utils.addDescMsg(3, "<b>2018年1月5日0106时许</b>，该轮抵达韩国釜山港外锚地，在锚地完成加油（加重油1050吨、轻油90吨和润滑油17.43吨）后于当日1430时起锚续航，开航时航行灯开启，主机转速为87RPM。");
		}
		if(timePoint == timeEvent.timeStart + 70){
			Utils.addDescMsg(4, "<b>1月6日1200时许</b>，船长指令将主机转速加到100RPM（实际97 RPM），此后该轮定速航行。");
		}
	}},
	{"name":"开始靠近（19001号交接班）","timeStart":0,"index":[],"timeLength":Utils.timeLength("01:21", "01:56"),"time":["2018/1/6 19:00:00","2018/1/6 19:30:00"],select:true,event: function(timePoint, timeEvent){
		//time
		var startTime = timeEvent.time[0];
		var endTime = timeEvent.time[1];
		var interval = (Math.floor(new Date(endTime).getTime()/1000) - Math.floor(new Date(startTime).getTime()/1000))/timeEvent.timeLength; //单位秒
		interval = interval < 1 ? 1 : interval;
		var time = new Date(startTime).getTime();
		time += (timePoint - timeEvent.timeStart) * interval * 1000;
		Config.timeSelect = timeEvent.timeStart;
		ArGis.initAccident();
		//map
		if(timePoint == timeEvent.timeStart + 1 || TimeLineEventSlideCache){
			ArGis.view.goTo({center:[Center.lon,Center.lat],zoom: 10}, {duration: 1000});
			TimeLineEventSlideCache = false;
		}
		//ship
		Utils.updateShipInfo(0, Utils.formatDate(time, Config.defulatTimeFormat), {});
		Utils.updateShipInfo(1, Utils.formatDate(time, Config.defulatTimeFormat), {});
		
		var fromTime = Utils.formatDate(time - ((timePoint-timeEvent.timeStart) == 0 ? 0 : interval * 1000), Config.defulatTimeFormat);
		var toTime = Utils.formatDate(time, Config.defulatTimeFormat);
		Utils.animateShip(0, fromTime, toTime, timeEvent);
		Utils.animateShip(1, fromTime, toTime, timeEvent);
		
		//radar
		Utils.drawRadar(time, interval);

		//message
		if(timePoint == timeEvent.timeStart + 1){
			Utils.appendShipInfo(0, {
				weather: '能见度良好、风向东北偏北、风力4-5级、轻浪'
			});
		}
		if(timePoint == timeEvent.timeStart + 2){
			Utils.addDescMsg(5, "<b>1900时许</b> “1”轮航向340度，航速10.3节。三副上驾驶台接班。该轮VHF在16频道值守，两部雷达开启， 其中X波段雷达设置了6海里量程、北向上相对运动、偏心显示，物标真矢量、真尾迹显示，并设置了0.9海里、15分钟的物标报警。");
			Utils.appendShipInfo(0, {driver: '三副'});
		}
		
	}},
	{"name":"继续靠近（1930-1939）","timeStart":0,"index":[],"timeLength":Utils.timeLength("01:57", "04:08"),"time":["2018/1/6 19:30:00","2018/1/6 19:39:00"],select:true,event: function(timePoint, timeEvent){
		//time
		var startTime = timeEvent.time[0];
		var endTime = timeEvent.time[1];
		var interval = (Math.floor(new Date(endTime).getTime()/1000) - Math.floor(new Date(startTime).getTime()/1000))/timeEvent.timeLength; //单位秒
		interval = interval < 1 ? 1 : interval;
		var time = new Date(startTime).getTime();
		time += (timePoint - timeEvent.timeStart) * interval * 1000;
		Config.timeSelect = timeEvent.timeStart;
		ArGis.initAccident();
		//map
		if(timePoint == timeEvent.timeStart + 1 || TimeLineEventSlideCache){
			ArGis.view.goTo({center:[Center.lon,Center.lat],zoom: 11}, {duration: 1000});
			TimeLineEventSlideCache = false;
		}
		//ship
		Utils.updateShipInfo(0, Utils.formatDate(time, Config.defulatTimeFormat), {});
		Utils.updateShipInfo(1, Utils.formatDate(time, Config.defulatTimeFormat), {});
		
		var fromTime = Utils.formatDate(time - ((timePoint-timeEvent.timeStart) == 0 ? 0 : interval * 1000), Config.defulatTimeFormat);
		var toTime = Utils.formatDate(time, Config.defulatTimeFormat);
		Utils.animateShip(0, fromTime, toTime, timeEvent);
		Utils.animateShip(1, fromTime, toTime, timeEvent);

		//radar
		Utils.drawRadar(time, interval);

		//message
		if(timePoint == timeEvent.timeStart + 1){ //"2018/1/6 19:30:00"
			//Utils.addDescMsg(6, "<b>1930时许</b> 1号轮航向358度，航速10.4节，“长峰水晶”轮距该轮7.5海里，方位022度，CPA约0.5海里。");
			Utils.appendShipInfo(0, {
				car: '',
				cc: '', 
				tc: '', 
				driver: '',
				sailor: '',
				ro: '',
				time: '',
				carl: '',
				man: '',
				distance: '7.5nmi',
				position: '022°',
				cpa: '0.5nmi', 
				tcpa: '', 
				weather: '能见度良好、风向东北偏北、风力4-5级、轻浪'
			});
		}else if(timePoint == Math.floor(timeEvent.timeStart + 0*60/interval)){ //"2018/1/6 19:32:00"
			Utils.addDescMsg(7, "<b>1932时许</b> 2轮航向约216度 ，航速约13.2节，“桑吉”轮位于本船约6.8海里、方位202度，CPA约0.4海里，TCPA约18.2分钟。大副在雷达上发现了“1”轮AIS物标, CPA约0.9海里。");
			Utils.appendShipInfo(1, {
				car: '',
				cc: '', 
				tc: '', 
				driver: '',
				sailor: '',
				ro: '',
				time: '',
				carl: '',
				man: '',
				distance: '6.8nmi',
				position: '202°',
				cpa: '0.4nmi', 
				tcpa: '18.2min', 
			});
		}
		if(timePoint == Math.floor(timeEvent.timeStart + 22)){ //"2018/1/6 19:34:00"
			Utils.addDescMsg(8, "<b>1934时许</b> 1轮航向358度，航速10.4节，“2”轮距该轮6.0海里，方位023度，CPA约0.3海里，TCPA约16.3分钟。值班人员提及了该轮船艏右舷022度方位的来船。");
			Utils.appendShipInfo(0, {
				distance: '6.0nmi',
				position: '023°',
				cpa: '0.3nmi', 
				tcpa: '16.3min'
			});
		}else if(timePoint == Math.floor(timeEvent.timeStart + 25)){ //"2018/1/6 19:34:00"
//			Utils.addDescMsg(9, "<b>1934时许</b> 2轮航向约216度 ，航速约13.2节，“1”轮位于本船约6.0海里、方位203度，CPA约0.3海里，TCPA约16.3分钟。大副发现船位向左偏离计划航线，开始用自动舵向右调整航向。");
			Utils.appendShipInfo(1, {
				distance: '6.0nmi',
				position: '203°',
				cpa: '0.3nmi', 
				tcpa: '16.3min'
			});
		}else if(timePoint == Math.floor(timeEvent.timeStart + 47)){ //"2018/1/6 19:35:00"
			Utils.addDescMsg(10, "<b>1935时许</b> 1轮航向358度，航速10.4节，“2”轮距该轮5.7海里，方位023度，CPA约0.3海里，TCPA约15.3分钟。此时，值班人员在X波段雷达上将光标移至“2”轮。");
			Utils.appendShipInfo(0, {
				distance: '5.7nmi',
				position: '023°',
				cpa: '0.3nmi', 
				tcpa: '15.3min'
			});
		}else if(timePoint == Math.floor(timeEvent.timeStart + 57)){ //"2018/1/6 19:36:00"
			Utils.addDescMsg(11, "<b>1936时许</b> “1”轮距2号轮5.3海里，方位023度，CPA约0.3海里，TCPA约14.3分钟。此时，值班人员在X波段雷达上将光标移至“浙岱渔03187”船，“浙岱渔03187”开始用英语呼叫“1”轮并要求“左对左”通过。随后，该轮X波段雷达出现碰撞危险视觉报警（“2”轮、“浙岱渔03187”轮AIS物标显示红色，雷达屏幕右下出现“AIS碰撞”）。");
			Utils.appendShipInfo(0, {
				distance: '5.3nmi',
				position: '023°',
				cpa: '0.3nmi', 
				tcpa: '14.3min'
			});
		}else if(timePoint == Math.floor(timeEvent.timeStart + 90)){ //"2018/1/6 19:39:00"
			Utils.addDescMsg(12, "<b>1939时许</b> “2”轮距该1轮4.2海里，方位024度，CPA约0.3海里、TCPA约11.3分钟。“浙岱渔03187”轮用英语呼叫“1”轮，“1”轮三副对水手说：“不用理睬他，因为一旦回答，对方会认为你确认了，就必须要采取行动。但是只要不回答，他就不得不采取行动”。");
			Utils.appendShipInfo(1, {
				distance: '4.2nmi',
				position: '024°',
				cpa: '0.3nmi', 
				tcpa: '11.3min'
			});
		}
	}},
	{"name":"碰撞前10分钟（1940-1949）","timeStart":0,"index":[],"timeLength":Utils.timeLength("04:09", "10:48"),"time":["2018/1/6 19:41:00","2018/1/6 19:49:00"],select:true,event: function(timePoint, timeEvent){
		//time
		var startTime = timeEvent.time[0];
		var endTime = timeEvent.time[1];
		var interval = (Math.floor(new Date(endTime).getTime()/1000) - Math.floor(new Date(startTime).getTime()/1000))/timeEvent.timeLength; //单位秒
		interval = interval < 1 ? 1 : interval;
		var time = new Date(startTime).getTime();
		time += (timePoint - timeEvent.timeStart) * interval * 1000;
		Config.timeSelect = timeEvent.timeStart;
		ArGis.initAccident();
		//map
		if(timePoint == timeEvent.timeStart + 1 || TimeLineEventSlideCache){
			ArGis.view.goTo({center:[Center.lon,Center.lat],zoom: 12}, {duration: 1000});
			TimeLineEventSlideCache = false;
		}
		//ship
		
		var fromTime = Utils.formatDate(time - ((timePoint-timeEvent.timeStart) == 0 ? 0 : interval * 1000), Config.defulatTimeFormat);
		var toTime = Utils.formatDate(time, Config.defulatTimeFormat);
		Utils.animateShip(0, fromTime, toTime, timeEvent);
		Utils.animateShip(1, fromTime, toTime, timeEvent);
		
		if(timePoint > timeEvent.timeStart + 110){ //45
			time += 100 * interval * 1000;

		}
		if(timePoint > timeEvent.timeStart + 170){ //46
			time += 40 * interval * 1000;

		}
		if(timePoint > timeEvent.timeStart + 260){ //48
			time += 2*40* interval * 1000;

		}
		if(timePoint > timeEvent.timeStart + 350){ //49
			time += 40 * interval * 1000;
		}

		Utils.updateShipInfo(0, Utils.formatDate(time, Config.defulatTimeFormat), {});
		Utils.updateShipInfo(1, Utils.formatDate(time, Config.defulatTimeFormat), {});

		//radar
		Utils.drawRadar(time, interval);
		
		//message
		if(timePoint == timeEvent.timeStart + 1){ //"2018/1/6 19:41:00"
			Utils.addDescMsg(13, "<b>1941时许</b> “1”轮航向358度，航速10.4节，“2”轮距1轮3.5海里，方位025度，CPA约0.1海里、TCPA约9.5分钟。“浙岱渔03187”渔船距该轮约1.8海里，方位约040度。三副要求值班水手用莫氏信号灯警示“浙岱渔03187”轮，并说：“你看，她要采取行动了”，此时“浙岱渔03187”船开始大幅度向左转向。");
			Utils.appendShipInfo(0, {
				driver: '三副',
				distance: '3.5nmi',
				position: '025°',
				cpa: '0.1nmi', 
				tcpa: '9.5min'
			});
		}
		if(timePoint == Math.floor(timeEvent.timeStart + 1*60/interval)){ //"2018/1/6 19:42:00"
//			Utils.addDescMsg(14, "<b>1942时许</b> 2轮航向约225度，航速约13.2节，“1”轮位于本船约3.1海里、方位205度，CPA约0.1海里、TCPA约8.5分钟，航向调整结束。大副在雷达观察到“1”轮AIS物标，CPA显示为0.4海里。据大副笔录其判断该轮为小船，不存在碰撞危险。");
			Utils.appendShipInfo(1, {
				driver: '大副',
				distance: '3.1nmi',
				position: '205°',
				cpa: '0.1nmi', 
				tcpa: '8.5min'
			});
		}else if(timePoint == Math.floor(timeEvent.timeStart + 2*60/interval)){ //"2018/1/6 19:43:00"
//			Utils.addDescMsg(15, "<b>1943时许</b> 2轮航向约223度，航速约13.3节， “1”轮位于本船2.7海里、方位205度，CPA约0.1海里、TCPA约7.5分钟，三副上驾驶台与大副交接。三副在海图室察看了船位和周边障碍物的情况，并通过雷达观察到在本船左前方有两个AIS物标。");
			Utils.appendShipInfo(1, {
				driver: '三副',
				distance: '2.7nmi',
				position: '205°',
				cpa: '0.1nmi', 
				tcpa: '7.5min'
			});
		}else if(timePoint == Math.floor(timeEvent.timeStart + 3*60/interval)){ //"2018/1/6 19:44:00"
//			Utils.addDescMsg(16, "<b>1944时许</b> “2”轮距1轮2.3海里，方位025度，CPA约0海里、TCPA约6.3分钟，“1”轮三副说：“这是一个困难的局面”。");
			Utils.appendShipInfo(1, {
				distance: '2.3nmi',
				position: '025°',
				cpa: '0nmi', 
				tcpa: '6.3min'
			});
		}
		if(timePoint == timeEvent.timeStart + 110){ //"2018/1/6 19:45:00"
			Utils.addDescMsg(17, "<b>1945时许</b> “2”轮距1轮约2海里，方位025度，CPA约0海里、TCPA约5.3分钟，“浙岱渔03187”轮位于“1”轮右正横。“1”轮三副说“我们右边有个物标，我们应该采取行动，但是我能采取什么行动呢？右侧都是船”，并要求值班水手用莫氏信号灯警示“2”轮。");
			Utils.appendShipInfo(1, {
				distance: '2nmi',
				position: '025°',
				cpa: '0nmi', 
				tcpa: '5.3min'
			});
		}
		if(timePoint == Math.floor(timeEvent.timeStart + 4*60/interval+10)){ //"2018/1/6 19:45:00"
//			Utils.addDescMsg(18, "<b>1945时许</b> 2轮大副接船长电话，征得三副同意后，离开驾驶台。大副离开后不久，三副班水手上驾驶台与大副班水手交接班，大副班水手告知三副班水手船舶当前使用自动舵航行以及船舶当前的航向，之后大副班水手离开驾驶台。");
			Utils.appendShipInfo(1, {
				sailor: '三副班',
				distance: '2nmi',
				position: '025°',
				cpa: '0nmi', 
				tcpa: '5.3min'
			});
		}
		if(timePoint == timeEvent.timeStart + 163){ //"2018/1/6 19:46:00"
			Utils.addDescMsg(19, "<b>1946时许</b> “2”轮距1轮1.6海里，方位026度，CPA约0海里、TCPA约4.5分钟。值班水手说：“C[后被证实为“浙岱渔03817”轮]物标已经通过了，对吧？可以向右让一点吧？”。三副回复：“C物标已经通过了，我们就剩下B[后被证实为“2”轮]物标了。为什么向右让呢？”水手说：“CPA已经0，如果我们向右让，CPA会增大”。三副说：“这是一艘小船，对吗?”,值班水手说：“不，是艘大船”。");
			Utils.appendShipInfo(1, {
				distance: '1.6nmi',
				position: '026°',
				cpa: '0nmi', 
				tcpa: '4.5min'
			});
		}
		if(timePoint == Math.floor(timeEvent.timeStart + 5*60/interval+10)){ //"2018/1/6 19:47:00"
//			Utils.addDescMsg(20, "<b>1946时许</b> “2”轮距1轮1.3海里，方位026度，CPA约0海里、TCPA约3.5分钟。1轮三副说：“这是一艘小船，对吗?”,值班水手说：“不，是艘大船”。");
			Utils.appendShipInfo(1, {
				distance: '1.3nmi',
				position: '026°',
				cpa: '0nmi', 
				tcpa: '3.5min'
			});
		}else if(timePoint == Math.floor(timeEvent.timeStart + 6*60/interval)){ //"2018/1/6 19:47:00"
//			Utils.addDescMsg(21, "<b>1947时许</b> “2”轮距1轮1.3海里，方位026度，CPA约0海里、TCPA约3.5分钟。1轮三副说：“这是一艘小船，对吗?”,值班水手说：“不，是艘大船”。");
			Utils.appendShipInfo(1, {
				distance: '1.3nmi',
				position: '026°',
				cpa: '0nmi', 
				tcpa: '3.5min'
			});
		}else if(timePoint == Math.floor(timeEvent.timeStart + 6*60/interval+10)){ //"2018/1/6 19:47:00"
//			Utils.addDescMsg(22, "<b>1947时许</b> 2号值班水手提醒三副，在雷达上观察到“1”轮AIS物标，CPA约0.2海里，三副也注意到该物标并判断来船为小船。");
			
		}
		if(timePoint == timeEvent.timeStart + 253){ //"2018/1/6 19:48:00"
			Utils.addDescMsg(23, "<b>1948时许</b> “2”轮距1轮0.9海里，方位026度，CPA约0海里、TCPA约2.5分钟。1轮三副打电话给船长：“船长，有一艘船在我右舷，CPA为0，距离很近，是条大船”。");
			Utils.appendShipInfo(1, {
				distance: '0.9nmi',
				position: '026°',
				cpa: '0nmi', 
				tcpa: '2.5min'
			});
		}
		if(timePoint == timeEvent.timeStart + 342){ //"2018/1/6 19:49:00"
			Utils.addDescMsg(24, "<b>1949时许</b> “2”轮距1轮0.5海里。1轮三副先后下令“左满舵”、“右满舵”。之后船长上驾驶台下令“右满舵”、紧接着又下令“左满舵”。此时，2轮值班水手提醒三副 “1”轮CPA约0.1海里，三副随即要求水手使用手操舵操右舵但未给出具体舵令，舵角操至右舵20度时水手报告三副。");
			Utils.appendShipInfo(1, {
				distance: '0.5nmi'
			});
		}
		if(timePoint == timeEvent.timeStart + 342 + 1){ //"2018/1/6 19:49:00"
			Utils.appendShipInfo(0, {
				ro: '左满舵'
			});
		}else if(timePoint == timeEvent.timeStart + 342 + 2){ //"2018/1/6 19:49:00"
			Utils.appendShipInfo(0, {
				ro: '右满舵'
			});
		}else if(timePoint == timeEvent.timeStart + 342 + 5){ //"2018/1/6 19:49:00"
			Utils.appendShipInfo(0, {
				ro: '右满舵'
			});
		}else if(timePoint == timeEvent.timeStart + 342 + 6){ //"2018/1/6 19:49:00"
			Utils.appendShipInfo(0, {
				ro: '左满舵'
			});
		}
		if(timePoint == Math.floor(timeEvent.timeStart + 8*60/interval+10)){ //"2018/1/6 19:49:00"
//			Utils.addDescMsg(25, "<b>1949时许</b> 此时，2轮值班水手提醒三副 “1”轮CPA约0.1海里，三副随即要求水手使用手操舵操右舵但未给出具体舵令，舵角操至右舵20度时水手报告三副。");
		}
	}},
	{"name":"碰撞过程（1950-1952）","timeStart":0,"index":[],"timeLength":Utils.timeLength("10:49", "12:40"),"time":["2018/1/6 19:50:00","2018/1/6 19:50:13"],select:true,event: function(timePoint, timeEvent){
		//time
		var startTime = timeEvent.time[0];
		var endTime = timeEvent.time[1];
		var interval = (Math.floor(new Date(endTime).getTime()/1000) - Math.floor(new Date(startTime).getTime()/1000))/timeEvent.timeLength; //单位秒
		interval = interval < 1 ? 1 : interval;
		var time = new Date(startTime).getTime();
		time += (timePoint - timeEvent.timeStart) * interval * 1000;
		Config.timeSelect = timeEvent.timeStart;
		ArGis.initAccident();
		//map
		if(timePoint == timeEvent.timeStart + 1 || TimeLineEventSlideCache){
			ArGis.view.goTo({center:[Center.lon,Center.lat],zoom: 16}, {duration: 1000});
			TimeLineEventSlideCache = false;
		}
		//ship
		Utils.updateShipInfo(0, Utils.formatDate(time, Config.defulatTimeFormat), {});
		Utils.updateShipInfo(1, Utils.formatDate(time, Config.defulatTimeFormat), {});
		var fromTime = Utils.formatDate(time - ((timePoint-timeEvent.timeStart) == 0 ? 0 : interval * 1000), Config.defulatTimeFormat);
		var toTime = Utils.formatDate(time, Config.defulatTimeFormat);
		Utils.animateShip(0, fromTime, toTime, timeEvent);
		Utils.animateShip(1, fromTime, toTime, timeEvent);
		
		if(timePoint < 706){
			Utils.updateShipInfo(0, Utils.formatDate(time, Config.defulatTimeFormat), {});
			Utils.updateShipInfo(1, Utils.formatDate(time, Config.defulatTimeFormat), {});
			var fromTime = Utils.formatDate(time - ((timePoint-timeEvent.timeStart) == 0 ? 0 : interval * 1000), Config.defulatTimeFormat);
			var toTime = Utils.formatDate(time, Config.defulatTimeFormat);
			Utils.animateShip(0, fromTime, toTime, timeEvent);
			Utils.animateShip(1, fromTime, toTime, timeEvent);

		}else if(timePoint > 706 ){ //1
			var backTime = 700;
			time = new Date(startTime).getTime();
			time += (timePoint - (backTime-timeEvent.timeStart) - timeEvent.timeStart) * interval * 1000;
			Utils.updateShipInfo(0, Utils.formatDate(time, Config.defulatTimeFormat), {});
			Utils.updateShipInfo(1, Utils.formatDate(time, Config.defulatTimeFormat), {});
			var fromTime = Utils.formatDate(time - ((timePoint - (backTime-timeEvent.timeStart)-timeEvent.timeStart) == 0 ? 0 : interval * 1000), Config.defulatTimeFormat);
			var toTime = Utils.formatDate(time, Config.defulatTimeFormat);
			Utils.animateShip(0, fromTime, toTime, timeEvent);
			Utils.animateShip(1, fromTime, toTime, timeEvent);
			
			if(timePoint == backTime + 8){ 
				Utils.addDescMsg(27, "<b>1950时许</b> “2”轮船首与“桑吉”轮右舷2、3舱之间船体碰撞，碰撞夹角约50度，“长峰水晶”轮船艏撞入“桑吉”轮船艏破损，3号货舱之前甲板、舱盖受损变形，左舷舷墙及部分甲板设施过火受损。");
			}

		}
	
		//radar
		Utils.drawRadar(time, interval);
		
		//message
		if(timePoint == timeEvent.timeStart + 1){ 
			Utils.addDescMsg(26, "<b>1950时许</b> 1轮右舷2、3舱之间船体与“2”轮船艏发生碰撞，“1”轮货油舱破损、凝析油泄漏并发生燃爆。船长要求打开甲板灯、“左满舵”，并发出遇险报警 。");
		}
	}},
	{"name":"燃烧起火漏油（1950-1952）","timeStart":0,"index":[],"timeLength":Utils.timeLength("12:41", "12:48"),"time":["2018/1/6 19:52:00","2018/1/6 19:53:00"],select:true,event: function(timePoint, timeEvent){
		//time
		var startTime = timeEvent.time[0];
		var endTime = timeEvent.time[1];
		var interval = (Math.floor(new Date(endTime).getTime()/1000) - Math.floor(new Date(startTime).getTime()/1000))/timeEvent.timeLength; //单位秒
		interval = interval < 1 ? 1 : interval;
		var time = new Date(startTime).getTime();
		time += (timePoint - timeEvent.timeStart) * interval * 1000;
		Config.timeSelect = timeEvent.timeStart;
		ArGis.initAccident();
		//map
		if(timePoint == timeEvent.timeStart + 1 || TimeLineEventSlideCache){
			ArGis.view.goTo({center:[124.9594, 30.8535],zoom: 16}, {duration: 1000});
			TimeLineEventSlideCache = false;
		}
		//ship
		Utils.updateShipInfo(0, Utils.formatDate(time, Config.defulatTimeFormat), {});
		Utils.updateShipInfo(1, Utils.formatDate(time, Config.defulatTimeFormat), {});
		
		var fromTime = Utils.formatDate(time - ((timePoint-timeEvent.timeStart) == 0 ? 0 : interval * 1000), Config.defulatTimeFormat);
		var toTime = Utils.formatDate(time, Config.defulatTimeFormat);
		Utils.animateShip(0, fromTime, toTime, timeEvent);
		Utils.animateShip(1, fromTime, toTime, timeEvent);

		/*if(timePoint < 711){
			Utils.updateShipInfo(0, Utils.formatDate(time, Config.defulatTimeFormat), {});
			Utils.updateShipInfo(1, Utils.formatDate(time, Config.defulatTimeFormat), {});
			var fromTime = Utils.formatDate(time - ((timePoint-timeEvent.timeStart) == 0 ? 0 : interval * 1000), Config.defulatTimeFormat);
			var toTime = Utils.formatDate(time, Config.defulatTimeFormat);
			Utils.animateShip(0, fromTime, toTime, timeEvent);
			Utils.animateShip(1, fromTime, toTime, timeEvent);

		}else if(timePoint > 711 && timePoint < 733){ //1
			var backTime = 711;
			time = new Date(startTime).getTime();
			time += (timePoint - (backTime-timeEvent.timeStart) - timeEvent.timeStart) * interval * 1000;
			Utils.updateShipInfo(0, Utils.formatDate(time, Config.defulatTimeFormat), {});
			Utils.updateShipInfo(1, Utils.formatDate(time, Config.defulatTimeFormat), {});
			var fromTime = Utils.formatDate(time - ((timePoint - (backTime-timeEvent.timeStart)-timeEvent.timeStart) == 0 ? 0 : interval * 1000), Config.defulatTimeFormat);
			var toTime = Utils.formatDate(time, Config.defulatTimeFormat);
			Utils.animateShip(0, fromTime, toTime, timeEvent);
			Utils.animateShip(1, fromTime, toTime, timeEvent);
			
			if(timePoint == backTime + 2){ 
				Utils.addDescMsg(27, "<b>1950时许</b> “2”轮船首与“桑吉”轮右舷2、3舱之间船体碰撞，碰撞夹角约50度，“长峰水晶”轮船艏撞入“桑吉”轮船艏破损，3号货舱之前甲板、舱盖受损变形，左舷舷墙及部分甲板设施过火受损。");
			}

		}else if(timePoint > 733 && timePoint < 773){ //2
			var backTime = 733;
			time = new Date(startTime).getTime();
			time += (timePoint - (backTime-timeEvent.timeStart) - timeEvent.timeStart) * interval * 1000;
			Utils.updateShipInfo(0, Utils.formatDate(time, Config.defulatTimeFormat), {});
			Utils.updateShipInfo(1, Utils.formatDate(time, Config.defulatTimeFormat), {});
			var fromTime = Utils.formatDate(time - ((timePoint - (backTime-timeEvent.timeStart)-timeEvent.timeStart) == 0 ? 0 : interval * 1000), Config.defulatTimeFormat);
			var toTime = Utils.formatDate(time, Config.defulatTimeFormat);
			Utils.animateShip(0, fromTime, toTime, timeEvent);
			Utils.animateShip(1, fromTime, toTime, timeEvent);

		}else if(timePoint > 773 && timePoint < timeEvent.timeStart+timeEvent.timeLength){ //3
			var backTime = 773;
			time = new Date(startTime).getTime();
			time += (timePoint - (backTime-timeEvent.timeStart) - timeEvent.timeStart) * interval * 1000;
			Utils.updateShipInfo(0, Utils.formatDate(time, Config.defulatTimeFormat), {});
			Utils.updateShipInfo(1, Utils.formatDate(time, Config.defulatTimeFormat), {});
			var fromTime = Utils.formatDate(time - ((timePoint - (backTime-timeEvent.timeStart)-timeEvent.timeStart) == 0 ? 0 : interval * 1000), Config.defulatTimeFormat);
			var toTime = Utils.formatDate(time, Config.defulatTimeFormat);
			Utils.animateShip(0, fromTime, toTime, timeEvent);
			Utils.animateShip(1, fromTime, toTime, timeEvent);
		}*/

		//radar
		Utils.drawRadar(time, interval);
		
		//message
		
	}},
	{"name":"2号轮弃船脱离（1952分后）","timeStart":0,"index":[],"timeLength":Utils.timeLength("12:49", "13:01"),"time":["2018/1/6 19:52:00","2018/1/6 19:52:00"],select:true,event: function(timePoint, timeEvent){
		Config.timeSelect = timeEvent.timeStart;
		ArGis.initAccident();
		Utils.animateClear();
		//map
		if(timePoint == timeEvent.timeStart + 1 || TimeLineEventSlideCache){
			ArGis.view.goTo({center:[124.9594, 30.8535],zoom: 16}, {duration: 1000});
			TimeLineEventSlideCache = false;
		}
		//ship
		if(timePoint == timeEvent.timeStart + 3){
			Utils.setShip2(0, "2018/1/6 19:52:52");
			Utils.setShip2(1, "2018/1/6 19:52:52");
		}
		//message
		if(timePoint == timeEvent.timeStart + 9){ 
			Utils.addDescMsg(28, "<b>1952分后</b> 2轮船长通过VHF16频道发出“MAYDAY”的遇险呼叫，并采取了全速倒车措施。随后两轮逐渐脱离。船长下达弃船指令。全员弃船乘坐全封闭救生艇逃生。");
		}
	}},
	{"name":"救援、灭火（1.7-1.12）","timeStart":0,"index":[],"timeLength":Utils.timeLength("13:02", "13:42"),"time":["2018/1/7 00:00:00","2018/1/12 23:59:59"],select:true,event: function(timePoint, timeEvent){
		Config.timeSelect = timeEvent.timeStart;
		ArGis.initAccident();
		Utils.animateClear();
		//map
		if(timePoint == timeEvent.timeStart + 1 || TimeLineEventSlideCache){
			ArGis.view.goTo({center:[124.9594, 30.8535],zoom: 16}, {duration: 1000});
			TimeLineEventSlideCache = false;
		}
		//ship
		if(timePoint == timeEvent.timeStart + 3){
			Utils.setShip2(0, "2018/1/6 19:52:52");
			Utils.setShip2(1, "2018/1/6 19:52:52");
		}
		//message
		/*if(timePoint == timeEvent.timeStart + 8){ 
			Utils.addDescMsg(29, "<b>1月7日0230时</b> “东海救101”轮抵达现场后从渔船上接下遇险船员。“2号船”轮处于失控状态，船艏凹陷破损。");
			Utils.updateTimeInfo("2018/1/7 02:30:00");
		}else */if(timePoint == timeEvent.timeStart + 10){ 
			Utils.addDescMsg(30, "<b>1月7日0230时</b> “东海救101”轮抵达现场后从渔船上接下遇险船员。“2号船”轮处于失控状态，船艏凹陷破损。“东海救101”轮协助“2号船”轮船员返回本船对船上设备进行检查，并将船控制住。“东海救101”轮和“2号船”轮登轮船员对艏部进行灭火作业。");
			Utils.updateTimeInfo("2018/1/7 02:30:00");
		}else if(timePoint == timeEvent.timeStart + 34){ 
			Utils.addDescMsg(31, "<b>1月7日1628时</b> 所有船员全部返船，对船上设备进行检修，由“东海救118”轮全程伴航，驶往舟山靠泊接受海事调查。");
			Utils.updateTimeInfo("2018/1/7 16:28:00");
		}
	}},
	{"name":"碰撞后沉没前1轮情况（1.7-1.12）","timeStart":0,"index":[],"timeLength":Utils.timeLength("13:43", "13:55"),"time":["2018/1/7 00:00:00","2018/1/12 23:59:59"],select:true,event: function(timePoint, timeEvent){
		Config.timeSelect = timeEvent.timeStart;
		ArGis.initAccident();
		Utils.animateClear();
		//map
		if(timePoint == timeEvent.timeStart + 1 || TimeLineEventSlideCache){
			ArGis.view.goTo({center:[124.9594, 30.8535],zoom: 16}, {duration: 1000});
			TimeLineEventSlideCache = false;
		}
		//ship
		if(timePoint == timeEvent.timeStart + 3){
			Utils.setShip2(0, "2018/1/6 19:52:52");
			Utils.setShip2(1, "2018/1/6 19:52:52");
		}
		//message
		if(timePoint == timeEvent.timeStart + 1){ 
			Utils.addDescMsg(32, "<b>1月7日-1月12日</b> “1号船”轮艏部右舷侧持续剧烈燃烧，船体右倾。");
		}/*else if(timePoint == timeEvent.timeStart + 16){ 
			Utils.addDescMsg(33, "<b>1月8日</b> “1号船”轮持续燃烧，起火点持续向艉部蔓延。 1044时，“东海救117”轮在“1号船”轮西北向约3海里处发现并打捞一具遗体。");
		}else if(timePoint == timeEvent.timeStart + 31){ 
			Utils.addDescMsg(34, "<b>1月9、10、11日</b> “1号船”轮火势情况配图，艏部外部已无明显明火，火势主要集中于右舷船中偏后位置，船整体向右舷艏部倾斜（配图说明）。");
		}else if(timePoint == timeEvent.timeStart + 46){ 
			Utils.addDescMsg(35, "<b>1月12日</b> “1号船”轮依然右倾，右舷侧火势明显（配图说明）。动画现场深潜号灭火。");
		}*/
	}},
	{"name":"打捞局登船救援（1.13）","timeStart":0,"index":[],"timeLength":Utils.timeLength("13:56", "14:25"),"time":["2018/1/13 00:00:00","2018/1/13 23:59:59"],select:true,event: function(timePoint, timeEvent){
		Config.timeSelect = timeEvent.timeStart;
		ArGis.initAccident();
		Utils.animateClear();
		//map
		if(timePoint == timeEvent.timeStart + 1 || TimeLineEventSlideCache){
			ArGis.view.goTo({center:[124.9594, 30.8535],zoom: 16}, {duration: 1000});
			TimeLineEventSlideCache = false;
		}
		//message
		if(timePoint == timeEvent.timeStart + 1){ 
			Utils.addDescMsg(36, "<b>1月13日0837时</b> 上海打捞局4名搜救人员从“深潜”号通过吊篮登上“1号船”轮尾部甲板。搜救人员在救生甲板发现2名船员遗体，在驾驶台取下航行数据记录仪，驾驶台内未发现遇险船员。");
			Utils.updateTimeInfo("2018/1/13 08:37:00");
		}
	}},
	{"name":"沉没（1.14）","timeStart":0,"index":[],"timeLength":Utils.timeLength("14:26", "14:57"),"time":["2018/1/14 00:00:00","2018/1/14 23:59:59"],select:true,event: function(timePoint, timeEvent){
		Config.timeSelect = timeEvent.timeStart;
		ArGis.initAccident();
		Utils.animateClear();
		//map
		if(timePoint == timeEvent.timeStart + 1 || TimeLineEventSlideCache){
			for (var i = 0; i < Ships.length; i++) {
				var graphics = ArGis["shipLayer_"+Ships[i].mmsi].graphics;
				graphics.removeAll();
			}
			ArGis.view.goTo({center:[125.91666666666667,28.366666666666667],zoom: 6}, {duration: 1000});
			TimeLineEventSlideCache = false;
		}
		if(timePoint == timeEvent.timeStart + 2){
			Utils.setShip(0, {lon:125.91666666666667, lat:28.366666666666667, head: 0, cog: 0});
		}
		//message
		if(timePoint == timeEvent.timeStart + 1){ 
			Utils.addDescMsg(37, "<b>1月14日1258时</b> “1号船”轮火势继续增大，全船被火包围，船头已在水下 。");
			Utils.updateTimeInfo("2018/1/14 12:58:00");
		}else if(timePoint == timeEvent.timeStart + 11){ 
			Utils.addDescMsg(38, "<b>1月14日1645时</b> 现场搜救船舶确认，看不到“1号船”轮船形，雷达回波消失，现场海面持续燃烧，位置28°22′N，125°55′E。");
			Utils.updateTimeInfo("2018/1/14 16:45:00");
		}
	}},
];

