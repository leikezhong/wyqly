cc.Class({
    extends: uiBase,
    properties: {
        isShow:true,

        nowLevel:0
    },

    onLoad:function(){
        this._super();
        this.transportLabel.string = this.nowLevel;
    },

    setShow:function(value){
        if(this.isShow != value){
            this.isShow = value;
            this.transportSp.active = value;
            this.transportLabel.active = value;
        }
    },

    addTransportLevel:function(){
        this.nowLevel++;
        this.transportLabel.getComponent(cc.Label).string = this.nowLevel;
    },

    setTransportLevel:function(level){
        this.nowLevel = level;
        this.transportLabel.getComponent(cc.Label).string = this.nowLevel;
    },

    onCollisionEnter: function (other, self) {
        battle.dragAndDropManager.setCollisionDADItem(other.node, self.node);
    },
    
    onCollisionStay: function (other, self) {

    },
    
    onCollisionExit: function (other, self) {
        battle.dragAndDropManager.setCollisionDADItem(null, null);
    }
});
