cc.Class({
    extends: cc.Component,
    properties: {
        adventurePic:cc.Sprite,
        adventureLabel:cc.Label
    },

    setTravelInfo:function(info){
        this.adventureLabel.string = info;
    },

    closeInfoFunc:function (event) {
        this.node && this.node.destroy();
    }
});