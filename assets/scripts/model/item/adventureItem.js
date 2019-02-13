cc.Class({
    extends: uiBase,

    properties: {
        adventureSp:cc.Sprite,
        adventureTitle:cc.Label
    },

    setAdventureInfo:function (info) {
        this.adventureTitle.string = info;
    }
});
