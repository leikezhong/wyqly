cc.Class({
    extends: uiBase,

    properties: {

    },

    onLoad () {
        this._super();
        this.initWX();
        this.initResource();
    },

    initResource:function(){
        this.uiLayer.active = false;
        this.isOnLoading = true;
        battle.resourceManager.loadResource(this.onLoadComplete.bind(this));
    },

    //initUI:function(){
    //    var self = this;
    //    cc.director.preloadScene("mainScene",
    //        function(completedCount, totalCount, item){
    //            var percent = (completedCount / totalCount).toFixed(2);
    //            self.progressBar.getComponent(cc.ProgressBar).progress = percent;
    //            // console.log(percent);
    //        },
    //        function () {
    //            console.log("mainScene preload complete!");
    //            self.onLoadComplete();
    //        }
    //    );
    //},

    initWX:function(){
        if(CC_WECHATGAME){
            var self = this;
            wx.getSystemInfo({
                success: function(info) {
                    battle.wxManager.systemInfo = info;
                    self.wxLogin(self.startBtn);
                }
            });
        }
    },

    onLoadComplete:function(){
        this.isOnLoading = false;
        this.progressLayer.active = false;
        this.uiLayer.active = true;
    },

    wxLogin:function (btnNode) {
        if(CC_WECHATGAME){
            var self = this;
            wx.login({
                success: function () {
                    console.log("login success!");
                    let btnSize = cc.size(btnNode.width+10,btnNode.height+10);
                    let frameSize = cc.view.getFrameSize();
                    let winSize = cc.director.getWinSize();
                    // console.log("winSize: ",winSize);
                    // console.log("frameSize: ",frameSize);
                    //适配不同机型来创建微信授权按钮
                    let left = (winSize.width*0.5+btnNode.x-btnSize.width*0.5)/winSize.width*frameSize.width;
                    let top = (winSize.height*0.5-btnNode.y-btnSize.height*0.5)/winSize.height*frameSize.height;
                    let width = btnSize.width/winSize.width*frameSize.width;
                    let height = btnSize.height/winSize.height*frameSize.height;
                    // console.log("button pos: ",cc.v2(left,top));
                    // console.log("button size: ",cc.size(width,height));
                    let button = wx.createUserInfoButton({
                        type: 'text',
                        text: '',
                        style: {
                            left: left,
                            top: top,
                            width: width,
                            height: height,
                            lineHeight: 0,
                            backgroundColor: '',
                            color: '#ffffff',
                            textAlign: 'center',
                            fontSize: 16,
                            borderRadius: 4
                        }
                    });
                    button.onTap((res) => {
                        console.log("onTap: ",res);
                        if (res.userInfo) {
                            button.hide();
                            battle.wxManager.userInfo = res.userInfo;
                            self.click_startBtn();
                            console.log("wxLogin auth success");
                            // wx.showToast({title:"授权成功"});
                        }else {
                            console.log("wxLogin auth fail");
                            wx.showToast({title:"授权失败"});
                        }
                    })
                }
            });
        }
    },

    click_startBtn:function(){
        if(!CC_WECHATGAME){
            battle.wxManager.userInfo.avatarUrl = "http://wx.qlogo.cn/mmopen/vi_32/1vZvI39NWFQ9XM4LtQpFrQJ1xlgZxx3w7bQxKARol6503Iuswjjn6nIGBiaycAjAtpujxyzYsrztuuICqIM5ibXQ/0";
            battle.wxManager.userInfo.nickName = "测试";
        }
        let self = this;
        battle.uiManager.showUI("mainSceneNode", "scene", battle.layerManager.mainLayer, function () {
            self.onClose();
        });
    },

    update (dt) {
        if(this.isOnLoading){
            this.progressBar.getComponent(cc.ProgressBar).progress = (battle.resourceManager.nowProgressNum / battle.resourceManager.nowProgressTotal).toFixed(2);
        }
    }
});
