cc.Class({
    extends: cc.Component,
    properties: {
        isShow:true,
        transportSp:cc.Sprite,
        transportLabel:cc.Label,

        nowLevel:0,
    },

    onLoad:function(){
        this.transportLabel.string = this.nowLevel;
    },

    setShow:function(value){
        if(this.isShow != value){
            this.isShow = value;
            this.transportSp.node.active = value;
            this.transportLabel.node.active = value;
        }
    },

    addTransportLevel:function(){
        this.nowLevel++;
        this.transportLabel.string = this.nowLevel;
    },

    setTransportLevel:function(level){
        this.nowLevel = level;
        this.transportLabel.string = this.nowLevel;
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
