cc.Class({
    extends: uiBase,

    properties: {
        getCoinsNum:cc.Label,

        _getCoinsNum:0
    },

    setShow:function(){
        this._super();
        this.setCoinsNum();
    },

    setCoinsNum:function () {
        let addCoins = 0;
        for(let i = 0; i < battle.wxStorageManager.nowAllItems.length; i++){
            addCoins += battle.configManager.allTransportCoins[battle.wxStorageManager.nowAllItems[i] - 1];
        }
        this._getCoinsNum = addCoins * 100;
        this.getCoinsNum.string = "Get " + this._getCoinsNum + " Coins!";
    },

    click_getCoinsBtn:function(){
        battle.wxStorageManager.changeCoins(this._getCoinsNum);
        NOTIFICATION.emit(EVENT.UPDATE_NOW_COINS);
        this.onClose();
    }
});
