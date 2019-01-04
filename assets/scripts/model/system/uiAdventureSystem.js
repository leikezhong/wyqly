let uiBase = require("uiBase");
cc.Class({
    extends: uiBase,

    properties: {
        adventureLayout:cc.Layout
    },

    onLoad:function(){
        this.allAdventureItem = [];
        for(let i = 0; i < battle.configManager.allAdventure.length; i++){
            var item = cc.instantiate(cc.loader.getRes("prefab/item/adventureItem"));
            item.adventureItem = item.getComponent("adventureItem");
            item.adventureItem.setAdventureInfo(battle.configManager.allAdventure[i]);
            this.adventureLayout.node.addChild(item);
            this.allAdventureItem.push(item);
        }
    },

    closeSystemFunc:function (event) {
        this.setHide();
    }
});
