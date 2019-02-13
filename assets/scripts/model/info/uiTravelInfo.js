cc.Class({
    extends: uiBase,
    properties: {

    },

    setTravelInfo:function(title, content){
        this.travelTitle.getComponent(cc.Label).string = title;
        this.travelContent.getComponent(cc.Label).string = content;
    }
});