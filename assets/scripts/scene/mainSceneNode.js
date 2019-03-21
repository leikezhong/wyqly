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
        this.initAllInfo();
    },

    initWXInfo:function(){
        var self = this;
        if(battle.wxManager.userInfo.avatarUrl){
            cc.loader.load({url: battle.wxManager.userInfo.avatarUrl, type: 'jpg'},
                function (err, texture) {
                    self.wxHead.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
                    self.wxHead.width = 60;
                    self.wxHead.height = 60;
                }
            );
        }
        this.wxName.getComponent(cc.Label).string = battle.wxManager.userInfo.nickName;
    },

    initEvent:function(){
        //更新ui
        // NOTIFICATION.on(EVENT.UPDATE_MAX_METER, this.updateMaxMeter, this);
    },

    initAllInfo:function(){
        battle.wxManager.initStorage();
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
        
    },

    click_adventureSystem: function () {
        
    },

    update (dt) {
        
    }
});
