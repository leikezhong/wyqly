cc.Class({
    init:function(){
        // console.log("---init battleManager---");
        this.allTravelCity = battle.configManager.allTravelCity;
        this.allTravelMeter = battle.configManager.allTravelMeter;
        this.battleFrameCount = 0;
        this.battleSecondCount = 0;
        this.battleMinuteCount = 0;
    },

    initBattle:function(){
        battle.adventureManager.initAdventure();
        battle.uiManager.initUI();
        battle.dragAndDropManager.initDAD();
    },

    buyTransport:function(){
        if(battle.wxStorageManager.nowAllItems.length < 16){
            battle.dragAndDropManager.addADAItem(1);
            battle.wxStorageManager.addItem(1);
        }else{
            console.log("already enough!");
        }
    },

    mergeTransport:function(level){
        battle.wxStorageManager.removeItem(level);
        battle.wxStorageManager.removeItem(level);
        battle.wxStorageManager.addItem(level + 1);
        // console.log(battle.wxStorageManager.nowAllItems);
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
        this.addCoinsStep();
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

            let travelInfo = cc.instantiate(cc.loader.getRes("prefab/uiTravelInfo"));
            travelInfo.uiTravelInfo = travelInfo.getComponent("uiTravelInfo");
            travelInfo.uiTravelInfo.setTravelInfo(this.allTravelCity[battle.wxStorageManager.nextTravelIndex]);
            travelInfo.parent = battle.mainScene.node;
        }
    },

    addCoinsStep:function(){
        let addCoins = 0;
        for(let i = 0; i < battle.wxStorageManager.nowAllItems.length; i++){
            addCoins +=battle.configManager.allTransportCoins[battle.wxStorageManager.nowAllItems[i] - 1];
        }
        battle.wxStorageManager.nowCoins += addCoins;
        battle.wxStorageManager.allCoins += addCoins;
        battle.wxStorageManager.setStorage("allCoins");
        battle.wxStorageManager.setStorage("nowCoins");
        battle.uiManager.setNowCoins();
    },

    //每分
    minuteStep:function(){
        this.battleMinuteCount++;
        battle.adventureManager.judgeHasAdventure();
    }
});