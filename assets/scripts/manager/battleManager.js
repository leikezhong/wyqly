cc.Class({
    init:function(){
        // console.log("---init battleManager---");
        this.dtCount = 0;
        this.battleFrameCount = 0;
        this.battleSecondCount = 0;
        this.battleMinuteCount = 0;
    },

    initBattle:function(){
        
    },

    step:function(dt){
        this.dtCount += dt;
        while(this.dtCount > FRAME.INTERVAL){
            this.dtCount -= FRAME.INTERVAL;
            this.frameStep();
        }
    },

    //每帧
    frameStep:function(){
        this.battleFrameCount++;
        if(this.battleFrameCount % 60 == 0){
            this.secondStep();
        }
    },

    //每秒
    secondStep:function(){
        this.battleSecondCount++;
        if(this.battleSecondCount % 60 == 0){
            this.minuteStep();
        }
    },

    //每分
    minuteStep:function(){
        this.battleMinuteCount++;
    }
});