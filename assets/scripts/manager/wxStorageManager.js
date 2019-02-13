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
        this.nowFood = [];
        this.initStorageName = [
            "nowMaxMeter", "allCoins", "nowCoins", "nowSpeed",
            "nextTravelIndex", "nowMaxLevel", "lastLoginTime", "nowAllItems",
            "nowTravelCity", "nowAdventure", "nowFood"
        ];
        this.transferStorageName = ["nowAllItems", "nowTravelCity", "nowAdventure", "nowFood"];//数组和对象属性保存需要转化为JSON
    },

    initLocalStorage:function(){
        this.nowMaxMeter = 0;
        this.allCoins = 0;
        this.nowCoins = 0;
        this.nowSpeed = 1;
        this.nextTravelIndex = -1;
        this.nowMaxLevel = 1;
        this.lastLoginTime = 0;
        this.nowAllItems = [1];
        this.nowTravelCity = [];
        this.nowAdventure = [];
        this.nowFood = [];
    },

    getInitDataStorage:function(){
        this.initLocalStorage();
        let data = {};
        for(let i = 0; i < this.initStorageName.length; i++){
            data[this.initStorageName[i]] = this[this.initStorageName[i]];
        }
        return data;
    },

    analysisCloudInfo:function(info){
        this.setStorage("isInit", true);
        for(let i = 0; i < this.initStorageName.length; i++){
            this[this.initStorageName[i]] = info[this.initStorageName[i]];
            this.setStorage(this.initStorageName[i]);
        }
    },

    removeItem:function(num){
        var index = this.nowAllItems.indexOf(num);
        if(index != -1){
            this.nowAllItems.splice(index, 1);
        }
        this.setStorage("nowAllItems");
    },

    addItem:function(num){
        this.nowAllItems.push(num);
        this.analysisMaxLevel();
        this.setStorage("nowAllItems");
    },

    changeCoins:function(addCoins){
        this.nowCoins += addCoins;
        this.setStorage("allCoins");
        if(addCoins > 0) {
            this.allCoins += addCoins;
            this.setStorage("nowCoins");
        }
    },

    changeStorageValue: function (key, value) {
        this[key] += value;
        this.setStorage(key);
    },

    setStorageValue: function (key, value) {
        this[key] = value;
        this.setStorage(key);
    },

    addArrStorageValue: function (key, value) {
        this[key].push(value);
        this.setStorage(key);
    },

    removeArrStorageValue: function (key, value) {
        var index = this[key].indexOf(value);
        if(index != -1){
            this[key].splice(index, 1);
        }
        this.setStorage(key);
    },

    analysisMaxLevel:function(){
        for(let i = 0; i < this.nowAllItems.length; i++){
            if(this.nowMaxLevel  < this.nowAllItems[i]){
                this.nowMaxLevel = this.nowAllItems[i];
                this.nowSpeed = battle.configManager.allTransportSpeed[this.nowMaxLevel - 1];
                this.setStorage("nowMaxLevel");
                this.setStorage("nowSpeed");
                NOTIFICATION.emit(EVENT.UPDATE_NOW_SPEED);
            }
        }
    },

    getFirstStorage:function(callback){
        let self = this, allStorageName = this.initStorageName.concat();
        if(allStorageName.length > 0){
            this.initLocalStorage(allStorageName.shift(), function(){
                self.getFirstStorage(callback);
            });
        }else{
            callback();
        }
    },

    initLocalStorage:function(keyValue, callback){
        // if(!CC_WECHATGAME)  return;
        if(this.transferStorageName.indexOf(keyValue) != -1){
            this[keyValue] = JSON.parse(cc.sys.localStorage.getItem(keyValue));
        }else{
            this[keyValue] = cc.sys.localStorage.getItem(keyValue);
        }
        if(callback){
            callback();
        }
        // wx.getStorage({
        //     key: keyValue,
        //     success(res) {
        //         console.log("get "+keyValue+" storage success!");
        //         // console.log(res.data);
        //         self[keyValue] = res.data;
        //         if(callback){
        //             callback();
        //         }
        //     },
        //     fail(res){
        //         console.log("get "+keyValue+" storage fail!");
        //     }
        // });
    },

    getStorage:function(keyValue){
        return this[keyValue];
    },

    setStorage:function(keyValue, keyData){
        // if(!CC_WECHATGAME)  return;
        if(!keyData){
            keyData = this[keyValue];
        }
        if(this.transferStorageName.indexOf(keyValue) != -1){
            cc.sys.localStorage.setItem(keyValue, JSON.stringify(keyData));
        }else{
            cc.sys.localStorage.setItem(keyValue, keyData);
        }
        // wx.setStorage({
        //     key: keyValue,
        //     data: keyData
        // });
    }
});