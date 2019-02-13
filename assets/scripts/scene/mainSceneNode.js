cc.Class({
    extends: uiBase,

    properties: {
        transportPrefab:cc.Prefab,
        charPrefab:cc.Prefab
    },

    onLoad () {
        this._super();
        battle.mainScene = this;
        this.initWXInfo();
        this.initEvent();
        if(CC_WECHATGAME){
            this.initWeChat();
        }else{
            this.initLocal();
        }
    },

    initWeChat:function(){
        this.initAllInfo();
    },

    initWXInfo:function(){
        var self = this;
        cc.loader.load({url: battle.wxManager.userInfo.avatarUrl, type: 'jpg'},
            function (err, texture) {
                self.wxHead.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
                self.wxHead.width = 60;
                self.wxHead.height = 60;
            }
        );
        this.wxName.getComponent(cc.Label).string = battle.wxManager.userInfo.nickName;
    },

    initEvent:function(){
        //更新ui
        NOTIFICATION.on(EVENT.UPDATE_MAX_METER, this.updateMaxMeter, this);
        NOTIFICATION.on(EVENT.UPDATE_NOW_SPEED, this.updateNowSpeed, this);
        NOTIFICATION.on(EVENT.UPDATE_NOW_COINS, this.updateNowCoins, this);
        NOTIFICATION.on(EVENT.UPDATE_COINS_SPEED, this.updateCoinsSpeed, this);
        NOTIFICATION.on(EVENT.UPDATE_ALL_INFO, this.updateAllInfo, this);
    },

    initAllInfo:function(){
        battle.wxManager.initStorage();
    },

    initComplete:function(){
        console.log("init complete");
        battle.battleManager.initBattle();
    },

    initLocal:function(){
        battle.wxStorageManager.initLocalStorage();
        battle.battleManager.initBattle();
    },

    updateMaxMeter:function(){
        this.maxMeter.getComponent(cc.Label).string = "maxMeter:" + battle.wxStorageManager.nowMaxMeter + "m";
    },

    updateNowSpeed:function(){
        this.nowSpeed.getComponent(cc.Label).string = "speed:" + battle.wxStorageManager.nowSpeed + "m/s";
    },

    updateNowCoins:function(){
        this.nowCoins.getComponent(cc.Label).string = "coins:" + battle.wxStorageManager.nowCoins;
    },

    updateCoinsSpeed:function(){
        this.coinsSpeed.getComponent(cc.Label).string = "coinsSpeed:" + battle.battleManager.battleSecondCoins + "/s";
    },

    updateAllInfo:function(){
        this.updateMaxMeter();
        this.updateNowSpeed();
        this.updateNowCoins();
        this.updateCoinsSpeed();
    },

    startShareFunc:function(){
        if(CC_WECHATGAME){
            wx.updateShareMenu({
                withShareTicket: true,
                success:function(info){
                    console.log("share success");
                    console.log(info);
                    wx.shareAppMessage({
                        title: "测试！！！！！",
                        imageUrl: canvas.toTempFilePathSync({
                            destWidth: 500,
                            destHeight: 400
                        }),
                        success: function (res) {
                            console.log('分享成功', res)
                            // 转发成功
                        },
                        fail: function (res) {
                            console.log('分享失败', res)
                            // 转发失败
                        }
                    });
                }
            });
        }
    },

    click_buyTransport: function () {
        battle.battleManager.buyTransport();
    },

    click_adventureSystem: function () {
        battle.uiManager.showUI("uiAdventureSystem", "system", battle.layerManager.normalLayer);
    },

    update (dt) {
        if(battle.battleManager){
            battle.battleManager.step();
        }
    }
});
