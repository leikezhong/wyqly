cc.Class({
    init:function(){
        this.floatTipArr = [];
        this.loadingTime = 0;
    },

    initUI:function(){
        
    },

    showFloatTip:function(info){
        if(this.floatTipArr.length == 0){
            let floatTip = cc.instantiate(cc.loader.getRes("prefab/tip/uiFloatTip"));
            floatTip.uiFloatTip = floatTip.getComponent("uiFloatTip");
            floatTip.uiFloatTip.setInfo(info);
            battle.layerManager.topTipLayer.addChild(floatTip);
        }else{
            let floatTip = this.floatTipArr.shift();
            floatTip.uiFloatTip.setInfo(info);
        }
    },

    showUI:function(uiName, dir, layer, callback){
        console.log("---uiName:" + uiName + "---");
        let self = this;
        if(!uiLoading.active) {
            clearTimeout(this.loadingTime);
            this.loadingTime = setTimeout(function () {
                uiLoading.active = true;
            }, 1000);
        }
        let path = "";
        if(dir){
            path = "prefab/" + dir + "/" + uiName;
        }else{
            path = "prefab/" + uiName;
        }
        cc.loader.loadRes(path, function (errorMessage, loadedResource) {
            self[uiName] = cc.instantiate(loadedResource);
            layer.addChild(self[uiName]);
            self[uiName][uiName] = self[uiName].getComponent(uiName);
            if(self[uiName][uiName]) {
                self[uiName][uiName].setShow();
            }
            if(self.loadingTime){
                clearTimeout(self.loadingTime);
                uiLoading.active = false;
                self.loadingTime = null;
            }
            callback && callback(self[uiName]);
        });
    }
});