cc.Class({
    extends: cc.Component,

    properties: {
        wxHead:cc.Sprite,
        wxName:cc.Label,
        maxMeter:cc.Label,
        nowSpeed:cc.Label,
        nowCoins:cc.Label,
        coinsSpeed:cc.Label,
        transportLayer:cc.Node,
        buyTransportBtn:cc.Node,
        uiLayer:cc.Node
    },

    onLoad () {
        battle.mainScene = this;
        this.initWXInfo();
        battle.layerManager.initAllLayer(this);
        if(CC_WECHATGAME){
            this.init();
        }else{
            this.initLocal();
        }
    },

    init:function(){
        this.initAllInfo();
        this.initEvent();
    },

    initWXInfo:function(){
        var self = this;
        cc.loader.load({url: battle.wxManager.userInfo.avatarUrl, type: 'jpg'},
            function (err, texture) {
                self.wxHead.spriteFrame = new cc.SpriteFrame(texture);
                self.wxHead.node.width = 60;
                self.wxHead.node.height = 60;
            }
        );
        this.wxName.string = battle.wxManager.userInfo.nickName;
    },

    initEvent:function(){
        //加载完成
        NOTIFICATION.on(EVENT.INIT_COMPLETE, this.initComplete.bind(this));

        //更新ui
        NOTIFICATION.on(EVENT.UPDATE_MAX_METER, this.updateMaxMeter.bind(this));
        NOTIFICATION.on(EVENT.UPDATE_NOW_SPEED, this.updateNowSpeed.bind(this));
        NOTIFICATION.on(EVENT.UPDATE_NOW_COINS, this.updateNowCoins.bind(this));
        NOTIFICATION.on(EVENT.UPDATE_COINS_SPEED, this.updateCoinsSpeed.bind(this));
        NOTIFICATION.on(EVENT.UPDATE_ALL_INFO, this.updateAllInfo.bind(this));
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

    buyTransportFunc:function(){
        battle.battleManager.buyTransport();
    },

    showAdventureSystemFunc:function(){
        battle.uiManager.showUI("uiAdventureSystem", "system");
    },

    updateMaxMeter:function(){
        this.maxMeter.string = "maxMeter:" + battle.wxStorageManager.nowMaxMeter + "m";
    },

    updateNowSpeed:function(){
        this.nowSpeed.string = "speed:" + battle.wxStorageManager.nowSpeed + "m/s";
    },

    updateNowCoins:function(){
        this.nowCoins.string = "coins:" + battle.wxStorageManager.nowCoins;
    },

    updateCoinsSpeed:function(){
        this.coinsSpeed.string = "coinsSpeed:" + battle.battleManager.battleSecondCoins + "/s";
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

    update (dt) {
        if(battle.battleManager){
            battle.battleManager.step();
        }
    },
});
