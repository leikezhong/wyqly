cc.Class({
    init:function(){
        // console.log("---init wxManager---");
        if(!CC_WECHATGAME)  return;
        this.systemInfo = null;
        this.userInfo = null;

        this.initCloud();
        this.initStorage();
        this.initLocation();
    },

    initCloud:function(){
        wx.cloud.init({
            env: 'test-9bdb94'
        });

        this.db = wx.cloud.database();

        // db.collection('score').where({
            
        // }).get({
        //     success(res) {
        //         console.log(res.data)
        //     }
        // });
    },

    initStorage:function(){
        wx.getStorage({
            key: 'key',
            success(res) {
                console.log(res.data)
            }
        })

        wx.setStorage({
            key: 'key',
            data: 'value'
        })
    },

    initLocation:function(){

    }
});