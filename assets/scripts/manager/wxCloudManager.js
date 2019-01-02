var amapFile = require('../libs/amap-wx.js');
cc.Class({
    init:function(){
        if(!CC_WECHATGAME)  return;
        this.addressInfo = null;
        this.initCloud();
    },

    initCloud:function(){
        wx.cloud.init({
            env: 'test-9bdb94'
        });

        this.db = wx.cloud.database();
        this.nowCollection = this.db.collection('wyqly');
        this.nowDoc = null;
        this.nowDocInfo = null;
    },

    setCloudInfo:function(){

    },

    //init storage fail and try get cloud data
    getCloudInitInfo:function(){
        var self = this;
        this.nowCollection.where({

        }).get({
            success(res){
                if(res.data.length == 0){
                    //not cloud info
                    self.addCloudInfo();
                }else{
                    //has cloud info
                    self.nowDoc = self.nowCollection.doc(res.data[0]._id);
                    self.getCloudInfo();
                }
            }
        })
    },

    getCloudInfo:function(){
        var self = this;
        this.nowDoc.get({
            success(res){
                console.log("get doc info success!");
                self.nowDocInfo = res.data;
                battle.wxManager.getCloudStorage(self.nowDocInfo);
            },
            fail(res){
                console.log("get doc fail!");
                console.log(res)
            }
        });
    },

    addCloudInfo:function(){
        var self = this;
        this.nowCollection.add({
            // data 字段表示需新增的 JSON 数据
            data: self.getInitDataInfo(),
            success(res) {
                // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
                console.log("add info success!");
                self.nowDoc = self.nowCollection.doc(res._id);
                self.getCloudInfo();
            }
        });
    },

    getInitDataInfo:function(){
        let data = {
            nowMaxMeter:0,
            nowCoins:0,
            nowSpeed:1,
            nextCityIndex:-1,
            nowMaxLevel:0,
            nowAllItems:[],
            nowTravelCity:[],
            lastLoginTime:0
        };
        return data;
    }

    // getCityAddress:function(){
    //     var self = this;
    //     var myAmapFun = new amapFile.AMapWX({key:'8f5c1305e1551727d89f816d21da887f'});
    //     myAmapFun.getRegeo({
    //         success: function(data){
    //             //成功回调
    //             console.log("get gaode success!");
    //             console.log(data);
    //             self.addressInfo = data[0];
    //             self.cityAddressCallback();
    //         },
    //         fail: function(info){
    //             //失败回调
    //             console.log("fail!");
    //             console.log(info)
    //         }
    //     })
    // },
});