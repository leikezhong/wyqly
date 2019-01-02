cc.Class({
    init:function(){

    },

    initUI:function(){
        this.setMaxMeter();
        this.setNowSpeed();
    },

    setMaxMeter:function(){
        battle.mainScene.maxMeter.string = "maxMeter:" + battle.wxStorageManager.nowMaxMeter + "m";
    },

    setNowSpeed:function(){
        battle.mainScene.nowSpeed.string = "speed:" + battle.wxStorageManager.nowSpeed + "m/s";
    }
});