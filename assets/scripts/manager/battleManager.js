cc.Class({
    init:function(){
        // console.log("---init battleManager---");
        this.battleFrameCount = 0;
        this.battleSecondCount = 0;
        this.battleMinuteCount = 0;
    },

    initBattle:function(){
        
    },

    step:function(){
        this.battleFrameCount++;
        this.mapMoveStep();
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