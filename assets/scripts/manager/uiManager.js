cc.Class({
    init:function(){
        this.floatTipArr = [];
    },

    initUI:function(){
        NOTIFICATION.emit(EVENT.UPDATE_MAX_METER);
        NOTIFICATION.emit(EVENT.UPDATE_NOW_SPEED);
        NOTIFICATION.emit(EVENT.UPDATE_NOW_COINS);
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