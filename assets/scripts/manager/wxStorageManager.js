cc.Class({
    init:function(){
        this.nowMaxMeter = 0;
        this.allCoins = 0;
        this.nowCoins = 0;
        this.nowSpeed = 1;
        this.nextTravelIndex = -1;
        this.nowMaxLevel = 1;
        this.nowAllItems = [1];
        this.nowTravelCity = [];
        this.nowAdventure = [];
        this.lastLoginTime = 0;
        this.initStorageName = ["nowMaxMeter", "allCoins", "nowCoins", "nowSpeed", "nextTravelIndex", "nowMaxLevel", "nowAllItems", "nowTravelCity", "lastLoginTime"];
    },

    initLocalStorage:function(){
        this.nowMaxMeter = 0;
        this.allCoins = 0;
        this.nowCoins = 0;
        this.nowSpeed = 3;
        this.nextTravelIndex = -1;
        this.nowMaxLevel = 1;
        this.nowAllItems = [1];
        this.nowTravelCity = [];
        this.nowAdventure = [7,8,9];
        this.lastLoginTime = 0;
    },

    getInitDataStorage:function(){
        let data = {
            nowMaxMeter:0,
            allCoins:0,
            nowCoins:0,
            nowSpeed:1,
            nextTravelIndex:-1,
            nowMaxLevel:0,
            nowAllItems:[1],
            nowTravelCity:[],
            nowAdventure:[],
            lastLoginTime:0
        }
        return data;
    },

    analysisCloudInfo:function(info){
        this.nowMaxMeter = info.nowMaxMeter;
        this.allCoins = info.allCoins;
        this.nowCoins = info.nowCoins;
        this.nowSpeed = info.nowSpeed;
        this.nextTravelIndex = info.nextTravelIndex;
        this.nowMaxLevel = info.nowMaxLevel;
        this.nowAllItems = info.nowAllItems;
        this.nowTravelCity = info.nowTravelCity;
        this.nowAdventure = info.nowAdventure;
        this.lastLoginTime = info.lastLoginTime;
    
        this.setStorage("isInit", true);
        this.setStorage("nowMaxMeter");
        this.setStorage("allCoins");
        this.setStorage("nowCoins");
        this.setStorage("nowSpeed");
        this.setStorage("nextTravelIndex");
        this.setStorage("nowMaxLevel");
        this.setStorage("nowAllItems");
        this.setStorage("nowTravelCity");
        this.setStorage("nowAdventure");
        this.setStorage("lastLoginTime");
    },

    removeItem:function(num){
        var index = this.nowAllItems.indexOf(num);
        if(index != -1){
            this.nowAllItems.splice(index, 1);
        }
    },

    addItem:function(num){
        this.nowAllItems.push(num);
        this.analysisMaxLevel();
    },

    changeCoins:function(addCoins){
        this.nowCoins += addCoins;
        this.allCoins += addCoins;
        this.setStorage("allCoins");
        this.setStorage("nowCoins");
    },

    analysisMaxLevel:function(){
        for(let i = 0; i < this.nowAllItems.length; i++){
            if(this.nowMaxLevel  < this.nowAllItems[i]){
                this.nowMaxLevel = this.nowAllItems[i];
                this.nowSpeed = battle.configManager.allTransportSpeed[this.nowMaxLevel - 1];
                this.setStorage("nowMaxLevel");
                this.setStorage("nowSpeed");
                battle.uiManager.setNowSpeed();
            }
        }
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