cc.Class({
    init:function(){
        // console.log("---init battleManager---");
        this.allTravelCity = battle.configManager.allTravelCity;
        this.allTravelCityContent = battle.configManager.allTravelCityContent;
        this.allTravelMeter = battle.configManager.allTravelMeter;
        this.battleFrameCount = 0;
        this.battleSecondCount = 0;
        this.battleMinuteCount = 0;
        this.battleSecondCoins = 0;
    },

    initBattle:function(){
        battle.adventureManager.initAdventure();
        battle.uiManager.initUI();
        battle.dragAndDropManager.initDAD();

        this.initCoinsSpeed();
    },

    initCoinsSpeed:function(){
        let addCoins = 0;
        for(let i = 0; i < battle.wxStorageManager.nowAllItems.length; i++){
            addCoins +=battle.configManager.allTransportCoins[battle.wxStorageManager.nowAllItems[i] - 1];
        }
        this.battleSecondCoins = addCoins;
        NOTIFICATION.emit(EVENT.UPDATE_COINS_SPEED);
    },

    //购买
    buyTransport:function(){
        if(battle.wxStorageManager.nowAllItems.length < 16){
            let itemLevel = battle.wxStorageManager.nowMaxLevel - 4;
            if(itemLevel < 1){
                itemLevel = 1;
            }
            if(battle.wxStorageManager.nowCoins >= battle.configManager.allTransportCost[itemLevel - 1]){
                battle.dragAndDropManager.addADAItem(itemLevel);
                battle.wxStorageManager.addItem(itemLevel);
                battle.wxStorageManager.changeCoins(-battle.configManager.allTransportCost[itemLevel - 1]);
                NOTIFICATION.emit(EVENT.UPDATE_NOW_COINS);
            }else{
                battle.uiManager.showUI("uiGetCoinsInfo", "info");
                // battle.uiManager.showFloatTip("coins not enough!");
                console.log("coins not enough!");
            }
        }else{
            battle.uiManager.showFloatTip("amount already enough!");
            console.log("amount already enough!");
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
        battle.wxStorageManager.changeStorageValue("nowMaxMeter", battle.wxStorageManager.nowSpeed);
        NOTIFICATION.emit(EVENT.UPDATE_MAX_METER);

        let nowIndex = battle.wxStorageManager.nextTravelIndex;
        for(let i = nowIndex; i < this.allTravelMeter.length; i++){
            if(this.allTravelMeter[i] == -1 || battle.wxStorageManager.nowMaxMeter < this.allTravelMeter[i]){
                break;
            }else{
                nowIndex = i;
            }
        }
        if(nowIndex > battle.wxStorageManager.nextTravelIndex){
            battle.wxStorageManager.setStorageValue("nextTravelIndex", nowIndex);
            console.log("nowMaxMeter:" + battle.wxStorageManager.nowMaxMeter);
            console.log("nowTravel:" + this.allTravelCity[battle.wxStorageManager.nextTravelIndex]);

            let travelInfo = cc.instantiate(cc.loader.getRes("prefab/info/uiTravelInfo"));
            travelInfo.uiTravelInfo = travelInfo.getComponent("uiTravelInfo");
            travelInfo.uiTravelInfo.setTravelInfo(this.allTravelCity[battle.wxStorageManager.nextTravelIndex], this.allTravelCityContent[battle.wxStorageManager.nextTravelIndex]);
            battle.layerManager.bottomTipLayer.addChild(travelInfo);
        }
    },

    //每秒增加金币
    addCoinsStep:function(){
        let addCoins = 0;
        for(let i = 0; i < battle.wxStorageManager.nowAllItems.length; i++){
            addCoins += battle.configManager.allTransportCoins[battle.wxStorageManager.nowAllItems[i] - 1];
        }
        this.battleSecondCoins = addCoins;
        battle.wxStorageManager.changeCoins(addCoins);
        NOTIFICATION.emit(EVENT.UPDATE_NOW_COINS);
        NOTIFICATION.emit(EVENT.UPDATE_COINS_SPEED);
    },

    //每分
    minuteStep:function(){
        this.battleMinuteCount++;
        battle.adventureManager.judgeHasAdventure();
    }
});