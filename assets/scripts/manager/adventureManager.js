cc.Class({
    init:function(){
        
    },

    initAdventure:function(){
        this.allAdventure = battle.configManager.allAdventure.concat();
        for(let i = this.allAdventure.length - 1; i >= 0; i--){
            for(let j = 0; j < battle.wxStorageManager.nowAdventure.length; j++){
                if(i == battle.wxStorageManager.nowAdventure[j]){
                    this.allAdventure.splice(i, 1);
                }
            }
        }
        // console.log(this.allAdventure);
    },

    judgeHasAdventure:function(){
        if(Math.random() < 0.2 && this.allAdventure.length > 0){
            let adventureIndex = Math.floor(Math.random() * this.allAdventure.length);
            let nowAdventure = this.allAdventure[adventureIndex];
            this.allAdventure.splice(adventureIndex, 1);
            let adventureInfo = cc.instantiate(cc.loader.getRes("prefab/info/uiAdventureInfo"));
            adventureInfo.uiAdventureInfo = adventureInfo.getComponent("uiAdventureInfo");
            battle.layerManager.bottomTipLayer.addChild(adventureInfo);

            adventureIndex = battle.configManager.allAdventure.indexOf(nowAdventure);
            battle.wxStorageManager.nowAdventure.push(adventureIndex);
            battle.wxStorageManager.nowAdventure.sort(this.sortNumber);
            battle.wxStorageManager.setStorage("allAdventure");
            adventureInfo.uiAdventureInfo.setAdventureInfo(battle.configManager.allAdventure[adventureIndex], battle.configManager.allAdventureContent[adventureIndex]);
            // console.log(battle.wxStorageManager.nowAdventure);
        }
    },

    sortNumber:function(a,b){
        return a - b
    }

});