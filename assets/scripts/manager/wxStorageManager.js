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

    getNowDataStorage:function(){
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

    getFirstStorage:function(callback){
        let self = this;
        if(!this.allStorageName){
            this.allStorageName = this.initStorageName.concat();
        }
        if(this.allStorageName.length > 0){
            this.initFirstStorage(this.allStorageName.shift(), function(){
                self.getFirstStorage(callback);
            });
        }else{
            callback();
        }
    },

    initFirstStorage:function(keyValue, callback){
        if(this.transferStorageName.indexOf(keyValue) != -1){
            this[keyValue] = JSON.parse(cc.sys.localStorage.getItem(keyValue));
        }else{
            this[keyValue] = cc.sys.localStorage.getItem(keyValue);
        }
        if(callback){
            callback();
        }
    },

    //获得数据
    getStorage:function(keyValue){
        return this[keyValue];
    },

    //保存数据
    setStorage:function(keyValue, keyData){
        if(!keyData){
            keyData = this[keyValue];
        }
        if(this.transferStorageName.indexOf(keyValue) != -1){
            cc.sys.localStorage.setItem(keyValue, JSON.stringify(keyData));
        }else{
            cc.sys.localStorage.setItem(keyValue, keyData);
        }
    }
});