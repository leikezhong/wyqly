cc.Class({
    extends: uiBase,
    properties: {

    },

    setAdventureInfo:function(title, content){
        this.adventureTitle.getComponent(cc.Label).string = title;
        this.adventureContent.getComponent(cc.Label).string = content;
    }
});