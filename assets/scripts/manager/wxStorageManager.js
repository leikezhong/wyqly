cc.Class({
    init:function(){
        this.nowMaxMeter = 0;
        this.nowCoins = 0;
        this.nowSpeed = 1;
        this.nextTravelIndex = -1;
        this.nowMaxLevel = 0;
        this.nowAllItems = [];
        this.nowTravelCity = [];
        this.lastLoginTime = 0;
        this.initStorageName = ["nowMaxMeter", "nowCoins", "nowSpeed", "nextTravelIndex", "nowMaxLevel", "nowAllItems", "nowTravelCity", "lastLoginTime"];
    },

    initLocalStorage:function(){
        this.nowMaxMeter = 0;
        this.nowCoins = 0;
        this.nowSpeed = 1;
        this.nextTravelIndex = -1;
        this.nowMaxLevel = 0;
        this.nowAllItems = [];
        this.nowTravelCity = [];
        this.lastLoginTime = 0;
    },

    analysisCloudInfo:function(info){
        this.nowMaxMeter = info.nowMaxMeter;
        this.nowCoins = info.nowCoins;
        this.nowSpeed = info.nowSpeed;
        this.nextTravelIndex = info.nextTravelIndex;
        this.nowMaxLevel = info.nowMaxLevel;
        this.nowAllItems = info.nowAllItems;
        this.nowTravelCity = info.nowTravelCity;
        this.lastLoginTime = info.lastLoginTime;
    
        this.setStorage("isInit", true);
        this.setStorage("nowMaxMeter");
        this.setStorage("nowCoins");
        this.setStorage("nowSpeed");
        this.setStorage("nextTravelIndex");
        this.setStorage("nowMaxLevel");
        this.setStorage("nowAllItems");
        this.setStorage("nowTravelCity");
        this.setStorage("lastLoginTime");
    },

    getFirstStorage:function(callback){
        var self = this;
        if(this.initStorageName.length > 0){
            this.getStorage(this.initStorageName.shift(), function(){
                self.getFirstStorage(callback);
            });
        }else{
            callback();
        }
    },

    getStorage:function(keyValue, callback){
        if(!CC_WECHATGAME)  return;
        var self = this;
        wx.getStorage({
            key: keyValue,
            success(res) {
                console.log("get "+keyValue+" storage success!");
                // console.log(res.data);
                self[keyValue] = res.data;
                if(callback){
                    callback();
                }
            },
            fail(res){
                console.log("get "+keyValue+" storage fail!");
            }
        });
    },

    setStorage:function(keyValue, keyData){
        if(!CC_WECHATGAME)  return;
        if(!keyData){
            keyData = this[keyValue];
        }
        wx.setStorage({
            key: keyValue,
            data: keyData
        });
    }
});