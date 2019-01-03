cc.Class({
    init:function () {
        // console.log("---init resourceManager---");
    },

    loadResource:function(callback){
        let path = ["prefab"];
        this.loadAllRes(path, callback);
    },

    loadBaseResource:function(callback){
        let path = ["prefab/base"];
        this.loadAllRes(path, callback);
    },

    loadSelectResource:function(selectNames, callback){
        this.selectNames = selectNames;
        let path = [];
        for(let i = 0; i < selectNames.length; i++){
            path.push("prefab/" + selectNames[i]);
        }
        this.loadAllRes(path, callback);
    },

    loadAllRes:function(path, callback){
        var self = this;
        var nowPath = path.shift();
        cc.loader.loadResDir(nowPath, function(err, prefabs){
            if(path.length == 0){
                callback();
            }else{
                self.loadAllRes(path, callback);
            }
        });
    },
    clear:function(){
        for(let i = 0; i < this.selectNames.length; i++){
            cc.loader.releaseResDir("prefabs/" + this.selectNames[i]);
        }
    }
});
