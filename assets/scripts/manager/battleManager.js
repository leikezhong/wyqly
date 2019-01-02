cc.Class({
    init:function(){
        // console.log("---init battleManager---");
        this.allTravelCity = ["好朋友家", "幼儿园", "小学", "初中", "高中", "无限宇宙"];
        this.allTravelMeter = [10, 50, 200, 500, 1000, -1];
        this.battleFrameCount = 0;
        this.battleSecondCount = 0;
        this.battleMinuteCount = 0;
    },

    initBattle:function(){
        battle.uiManager.initUI();
        battle.dragAndDropManager.initDAD();
    },

    step:function(){
        this.battleFrameCount++;
        if(this.battleFrameCount % 60 == 0){
            this.secondStep();
        }
    },

    //每秒
    secondStep:function(){
        this.battleSecondCount++;
        this.maxMeterStep();
        if(this.battleSecondCount % 60 == 0){
            this.minuteStep();
        }
    },

    maxMeterStep:function(){
        battle.wxStorageManager.nowMaxMeter += battle.wxStorageManager.nowSpeed;
        battle.wxStorageManager.setStorage("nowMaxMeter");
        battle.uiManager.setMaxMeter();

        let nowIndex = battle.wxStorageManager.nextTravelIndex;
        for(let i = nowIndex; i < this.allTravelMeter.length; i++){
            if(this.allTravelMeter[i] == -1 || battle.wxStorageManager.nowMaxMeter < this.allTravelMeter[i]){
                break;
            }else{
                nowIndex = i;
            }
        }
        if(nowIndex > battle.wxStorageManager.nextTravelIndex){
            battle.wxStorageManager.nextTravelIndex = nowIndex;
            battle.wxStorageManager.setStorage("nextTravelIndex");
            console.log("nowMaxMeter:" + battle.wxStorageManager.nowMaxMeter);
            console.log("nowTravel:" + this.allTravelCity[battle.wxStorageManager.nextTravelIndex]);
        }
    },

    //每分
    minuteStep:function(){
        this.battleMinuteCount++;
    }
});