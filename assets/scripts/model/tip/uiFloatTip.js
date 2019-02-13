cc.Class({
    extends: uiBase,

    properties: {
        tipLabel:cc.Label
    },

    setInfo:function (info) {
        this.node.active = true;
        this.node.y = 0;
        this.tipLabel.string = info;
        this.tipCount = 0;
    },

    update:function(){
        this.tipCount++;
        if(this.tipCount > 30){
            this.node.y += 3;
            if(this.node.y > 90){
                this.node.active = false;
                battle.uiManager.floatTipArr.push(this.node);
            }
        }
    }
});
