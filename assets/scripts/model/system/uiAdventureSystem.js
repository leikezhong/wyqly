cc.Class({
    extends: uiBase,

    properties: {
        adventureItemPrefab:cc.Prefab
    },

    onLoad:function(){
        this._super();
        this.allAdventureItem = [];
        for(let i = 0; i < battle.configManager.allAdventure.length; i++){
            var item = cc.instantiate(this.adventureItemPrefab);
            item.adventureItem = item.getComponent("adventureItem");
            item.adventureItem.setAdventureInfo(battle.configManager.allAdventure[i]);
            this.adventureLayout.addChild(item);
            this.allAdventureItem.push(item);
        }
    }
});
