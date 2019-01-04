let uiBase = require("uiBase");
cc.Class({
    extends: uiBase,
    properties: {
        adventurePic:cc.Sprite,
        adventureTitle:cc.Label,
        adventureContent:cc.Label
    },

    setAdventureInfo:function(title, content){
        this.adventureTitle.string = title;
        this.adventureContent.string = content;
    },

    closeInfoFunc:function (event) {
        this.node && this.node.destroy();
    }
});