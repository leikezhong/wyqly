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
        this.initMap();
        this.initChar();
        //battle.dragAndDropManager.initDAD();
        this.initCoinsSpeed();
    },

    initMap: function () {
        this.maps = [];
        this.mapSpeed = 1;
        for(let i = 0; i < 3; ++i){
            let mapNode = new cc.Node();
            mapNode.setAnchorPoint(0, 0);
            battle.layerManager.bgLayer.addChild(mapNode);
            let mapSp = mapNode.addComponent(cc.Sprite);
            utils.setSpriteFrame("map/map_1", mapSp, function () {
                mapNode.x = i * mapNode.width;
            });
            this.maps.push(mapNode);
        }
    },

    initChar: function () {
        this.mainChar = cc.instantiate(battle.mainScene.charPrefab);
        this.mainChar.setPosition(300, 200);
        battle.layerManager.charLayer.addChild(this.mainChar);
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

        //if(battle.wxStorageManager.nowAllItems.length < 16){
        //    let itemLevel = battle.wxStorageManager.nowMaxLevel - 4;
        //    if(itemLevel < 1){
        //        itemLevel = 1;
        //    }
        //    if(battle.wxStorageManager.nowCoins >= battle.configManager.allTransportCost[itemLevel - 1]){
        //        battle.dragAndDropManager.addADAItem(itemLevel);
        //        battle.wxStorageManager.addItem(itemLevel);
        //        battle.wxStorageManager.changeCoins(-battle.configManager.allTransportCost[itemLevel - 1]);
        //        NOTIFICATION.emit(EVENT.UPDATE_NOW_COINS);
        //    }else{
        //        battle.uiManager.showUI("uiGetCoinsInfo", "info", battle.layerManager.normalLayer);
        //        // battle.uiManager.showFloatTip("coins not enough!");
        //        console.log("coins not enough!");
        //    }
        //}else{
        //    battle.uiManager.showFloatTip("amount already enough!");
        //    console.log("amount already enough!");
        //}
    },

    mergeTransport:function(level){
        battle.wxStorageManager.removeItem(level);
        battle.wxStorageManager.removeItem(level);
        battle.wxStorageManager.addItem(level + 1);
        // console.log(battle.wxStorageManager.nowAllItems);
    },

    step:function(){
        this.battleFrameCount++;
        this.mapMoveStep();
        if(this.battleFrameCount % 60 == 0){
            this.secondStep();
        }
    },

    mapMoveStep: function () {
        for(let i = this.maps.length - 1; i >= 0; --i){
            this.maps[i].x -= this.mapSpeed;
        }

        //第一张图
        if(this.maps.length > 0) {
            if (this.maps[0].x < -this.maps[0].width - 100) {
                let map = this.maps.splice(0, 1)[0];
                map.x = this.maps[this.maps.length - 1].x + this.maps[this.maps.length - 1].width;
                this.maps.push(map);
            }
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

            let self = this;
            battle.uiManager.showUI("uiTravelInfo", "info", battle.layerManager.normalLayer, function (node) {
                node.uiTravelInfo.setTravelInfo(self.allTravelCity[battle.wxStorageManager.nextTravelIndex], self.allTravelCityContent[battle.wxStorageManager.nextTravelIndex]);
            });

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