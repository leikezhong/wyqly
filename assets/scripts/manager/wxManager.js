cc.Class({
    init:function(){
        // console.log("---init wxManager---");
        this.systemInfo = {};
        this.userInfo = {};
    },

    initStorage:function(){
        var self = this;
        wx.getStorage({
            key: 'isInit',
            success(res) {
                console.log("already init!");
                // console.log(res.data);
                battle.wxStorageManager.getFirstStorage(self.getLocalStorage.bind(self));
            },
            fail(res){
                console.log("not init!");
                battle.wxCloudManager.getCloudInitInfo();
                // console.log(res.data);
            }
        });
    },

    getCloudStorage:function(res){
        console.log("get cloud storage!");
        battle.wxStorageManager.analysisCloudInfo(res);
        battle.mainScene.initComplete();
    },

    getLocalStorage:function(){
        battle.mainScene.initComplete();
    }
});