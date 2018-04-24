
var PlayController = {
	  curPlayTime: 0,
	  progress: 0,
	  progressSpeed: 0,
	  timeSpeed: 1/60,
	  endTime: 0,
	  paused: true,
	  progressTimer: null,
	  timeCount: 0,
	  timeEventCache: {}, //执行控制器
	  initPlay: function(curPlayTime) {
		  this.curPlayTime = curPlayTime ? curPlayTime : 0;
		  if(this.curPlayTime > this.endTime){
			  this.curPlayTime = this.endTime
		  }
		  this.progressSpeed= 100 / this.endTime;
    	  this.progress = this.progressSpeed * this.curPlayTime;
    	  if(this.progress > 100){
    		  this.progress = 100;
    	  }
          if(this.progressTimer) {
              this.clearTimer();
          }
          if(!this.paused){
        	  this.progressGo();
          }
      },
      progressGo: function() {
          if(this.paused){
        	  this.clearTimer();
          }else{
        	  if(this.curPlayTime == 0 && this.progress != 0){
        		  this.progress = 0;
        	  }
        	  if(this.progress < 100) {
                  /*this.progressTimer = setTimeout(() => {
                	  this.curPlayTime += this.timeSpeed;
                	  this.progress += this.progressSpeed * this.timeSpeed;
                	  this.timeCount++;
                	  if(this.timeCount > 1/this.timeSpeed){ //每秒执行一次事件（timePointEvent）
                		  this.timePointEvent(this.curPlayTime);
                		  this.timeCount = 0;
                	  }
                      this.progressGo();
                  }, this.timeSpeed * 1000);*/
            	  this.progress = this.progressSpeed * this.curPlayTime;
            	  var hasKey = String(Math.floor(this.curPlayTime));
            	  var hasEvent = this.timeEventCache[hasKey];
            	  if(!hasEvent){
            		  this.timePointEvent(this.curPlayTime);
            		  this.timeEventCache[hasKey] = 1;
            	  }
              }else {
                  this.progress = 100;
                  this.curPlayTime = this.endTime;
                  this.paused = true;
                  this.emitPaused();
              }
          }
          
      },
      clearTimer() {
          clearTimeout(this.progressTimer);
      },
	  handlePaused: function(){
		  this.paused = true;
		  Utils.animateClear();
//		  this.progressGo();
	  },
	  handlePlay: function(){
		  this.paused = false;
//		  this.progressGo();
	  },
	  handleTimeUpdate: function(timePoint){
		  this.curPlayTime = timePoint;
		  this.progressGo();
	  },

	  emitPaused: function(){
		  //do something
	  },
	  emitPlay: function(){
		  //do something
	  },
	  emitRePlay: function(){
		  //do something
	  },
	  emitUpdateTime: function(updateTime){
		  //do something
	  },
	  timePointEvent: function(timePoint){
		  //do something
	  }
};

Vue.component('play-controller',{
  template: `
	  <div class="play-container">
 			 <div class="time-wrap">
                   <div class="start-time">{{ curPlayTime | formatDate }}</div>
                   <div class="progress-wrap">
                       <div class="progress-bar-p" @click = "updateProgress" ref = "progressBar"></div>
                       <div class="progress" :style = "{width: progress + '%'}"></div>
                       <div class="progress-dot" ref = "progressDot" :style = "{'margin-left': progress + '%'}"></div>
                   </div>
                   <div class="end-time">{{ endTime | formatDate }}</div>
               </div>
               <div class="play-operateBox">
                   <div class="play-detail">
				        <span class = "prev" @click = "changePlay('prev')"></span>
				        <span class = "play" @click = "changePlayState" :class = "{pause: paused}"></span>
				        <span class = "next" @click = "changePlay('next')"></span>
				    </div>
               </div>
      </div>
  `,
  props: [],
  data() {
      return PlayController
  },
  methods: {
      // 点击进度条更新时间
      updateProgress: function(evt) {
          const offsetX = evt.offsetX;
          const targetWidth = this.$refs.progressBar.offsetWidth;
          this.progress = Number((offsetX / targetWidth * 100).toFixed(2));
          this.curPlayTime = parseInt((this.endTime * this.progress / 100).toFixed(2));
          PlayController.emitUpdateTime(this.curPlayTime);
      },
      // 切换状态 play or paused
      changePlayState() {
          this.paused = !this.paused;
          if(this.progress == 100){
    		  this.progress = 0;
    		  this.curPlayTime = 0;
    		  PlayController.emitRePlay();
    	  }else{
    		  if(this.paused){
        		  PlayController.emitPaused();
        	  }else{
        		  PlayController.emitPlay();
        	  }
    	  }
    	  
      },
      // 切歌 上一首 or 下一首
      changePlay(operate) {
    	  var step = 20;
          if(operate === "next"){
        	  this.progress += this.progressSpeed * step;
        	  this.curPlayTime += step;
        	  if(this.curPlayTime >= this.endTime) {
        		  this.progress = 100;
        		  this.curPlayTime = this.endTime;
        	  }
          }else{
        	  this.progress -= this.progressSpeed * step;
        	  this.curPlayTime -=  step;
        	  if(this.curPlayTime <= 0) {
        		  this.progress = 0;
        		  this.curPlayTime = 0;
        	  }
          }     
          PlayController.emitUpdateTime(this.curPlayTime);
      }
  },
  filters: {
      // 进度条时间过滤器
      formatDate(time) {
          let minutes = parseInt(time / 60);
          let seconds = parseInt(time % 60);
          if(minutes < 10) {
              minutes = `0${minutes}`;
          }
          if(seconds < 10) {
              seconds = `0${seconds}`;
          }
          return `${minutes}:${seconds}`;
      }
  }
	  
});



