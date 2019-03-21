window.battle = window.battle || {};
cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad () {
        this.allManager = [
            "configManager",
            "jsonManager",
            "resourceManager",
            "layerManager",
            "battleManager",
            "wxManager",
            "wxCloudManager",
            "wxStorageManager",
            "uiManager"
        ];

        for(let i = 0; i < this.allManager.length; i++){
            let manager = require(this.allManager[i]);
            battle[this.allManager[i]] = new manager();
            battle[this.allManager[i]].init();
        }

        cc.loader.loadRes("prefab/tip/uiLoading", function (errorMessage, loadedResource) {
            window.uiLoading = cc.instantiate(loadedResource);
            battle.layerManager.topTipLayer.addChild(uiLoading);
            uiLoading.active = false;
            battle.uiManager.showUI("loginSceneNode", "scene", battle.layerManager.normalLayer);
        });

    }

    // update (dt) {},
});
