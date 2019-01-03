cc.Class({
    init:function(){

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
    }
});