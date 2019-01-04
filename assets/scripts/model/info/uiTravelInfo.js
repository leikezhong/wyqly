let uiBase = require("uiBase");
cc.Class({
    extends: uiBase,
    properties: {
        travelPic:cc.Sprite,
        travelTitle:cc.Label,
        travelContent:cc.Label
    },

    setTravelInfo:function(title, content){
        this.travelTitle.string = title;
        this.travelContent.string = content;
    },

    closeInfoFunc:function (event) {
        this.node && this.node.destroy();
    }
});