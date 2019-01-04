cc.Class({
    init:function(){
        this.floatTipArr = [];
    },

    initUI:function(){
        this.setMaxMeter();
        this.setNowSpeed();
        this.setNowCoins();
    },

    setMaxMeter:function(){
        battle.mainScene.maxMeter.string = "maxMeter:" + battle.wxStorageManager.nowMaxMeter + "m";
    },

    setNowSpeed:function(){
        battle.mainScene.nowSpeed.string = "speed:" + battle.wxStorageManager.nowSpeed + "m/s";
    },

    setNowCoins:function(){
        battle.mainScene.nowCoins.string = "coins:" + battle.wxStorageManager.nowCoins;
    },

    setCoinsSpeed:function(addCoins){
        battle.mainScene.coinsSpeed.string = "coinsSpeed:" + addCoins + "/s";
    },

    showFloatTip:function(info){
        if(this.floatTipArr.length == 0){
            let floatTip = cc.instantiate(cc.loader.getRes("prefab/tip/uiFloatTip"));
            floatTip.uiFloatTip = floatTip.getComponent("uiFloatTip");
            floatTip.uiFloatTip.setInfo(info);
            battle.layerManager.topTipLayer.addChild(floatTip);
        }else{
            let floatTip = this.floatTipArr.shift();
            floatTip.uiFloatTip.setInfo(info);
        }
    },

    showUI:function(uiName, dir){
        if(this[uiName] == null){
            if(dir){
                this[uiName] = cc.instantiate(cc.loader.getRes("prefab/" + dir + "/" + uiName));
            }else{
                this[uiName] = cc.instantiate(cc.loader.getRes("prefab/" + uiName));
            }
            this[uiName][uiName] = this[uiName].getComponent(uiName);
            battle.layerManager.normalLayer.addChild(this[uiName]);
        }
        this[uiName][uiName].setShow();
        return this[uiName];
    }
});