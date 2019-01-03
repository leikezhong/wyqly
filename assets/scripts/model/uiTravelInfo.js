cc.Class({
    extends: cc.Component,
    properties: {
        travelPic:cc.Sprite,
        travelLabel:cc.Label
    },

    setTravelInfo:function(info){
        this.travelLabel.string = info;
    },

    closeInfoFunc:function (event) {
        this.node && this.node.destroy();
    }
});