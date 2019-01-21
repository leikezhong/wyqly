cc.Class({
    init:function () {
        // console.log("---init resourceManager---");
    },

    loadResource:function(callback){
        let path = [
            {
                name:"prefab",
                type:"folder"
            },
            {
                name:"config",
                type:"folder"
            },
            {
                name:"scene/mainScene",
                type:"scene"
            }
        ];
        this.nowProgressNum = 0;
        this.nowProgressTotal = path.length;
        this.loadAllRes(path, callback);
    },

    loadAllRes:function(path, callback){
        var self = this;
        var nowPath = path.shift();
        if(nowPath.type == "folder") {
            cc.loader.loadResDir(nowPath.name, function (err, asset) {
                for (let i = 0; i < asset.length; i++) {
                    if (asset[i] instanceof cc.JsonAsset) {
                        battle.jsonManager.initJson(asset[i]);
                    }
                }
                if (path.length == 0) {
                    callback();
                } else {
                    self.loadAllRes(path, callback);
                }
            });
        }else if(nowPath.type == "scene"){
            cc.loader.loadRes(nowPath.name, (err, res) => {
                if (path.length == 0) {
                    callback();
                } else {
                    self.loadAllRes(path, callback);
                }
            });
        }
    },

    clear:function(){
        //for(let i = 0; i < this.selectNames.length; i++){
        //    cc.loader.releaseResDir("prefabs/" + this.selectNames[i]);
        //}
    }

    //loadBaseResource:function(callback){
    //    let path = ["prefab/base"];
    //    this.loadAllRes(path, callback);
    //},
    //
    //loadSelectResource:function(selectNames, callback){
    //    this.selectNames = selectNames;
    //    let path = [];
    //    for(let i = 0; i < selectNames.length; i++){
    //        path.push("prefab/" + selectNames[i]);
    //    }
    //    this.loadAllRes(path, callback);
    //},
});
