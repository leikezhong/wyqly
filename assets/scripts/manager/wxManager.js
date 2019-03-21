cc.Class({
    init:function(){
        // console.log("---init wxManager---");
        this.systemInfo = {};
        this.userInfo = {};
    },

    initStorage:function(){
        if(CC_WECHATGAME){
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
        }else{
            if(cc.sys.localStorage.getItem('isInit')){
                battle.wxStorageManager.getFirstStorage(this.getLocalStorage.bind(this));
            }else{
                battle.wxStorageManager.analysisCloudInfo(battle.wxStorageManager);
                battle.battleManager.initBattle();
            }
        }
    },

    getCloudStorage:function(res){
        console.log("get cloud storage!");
        battle.wxStorageManager.analysisCloudInfo(res);
        battle.battleManager.initBattle();
    },

    getLocalStorage:function(){
        battle.battleManager.initBattle();
    }
});