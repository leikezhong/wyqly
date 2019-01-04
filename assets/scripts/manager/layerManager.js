cc.Class({
    init:function () {
        // console.log("---init layerManager---");
        
    },

    initAllLayer:function(node){
        this.uiLayer = node.uiLayer;

        this.normalLayer = new cc.Node();
        this.bottomTipLayer = new cc.Node();
        this.topTipLayer = new cc.Node();
        this.debugLayer = new cc.Node();
        this.debugLayer.addComponent(cc.Graphics);

        this.uiLayer.addChild(this.normalLayer);
        this.uiLayer.addChild(this.bottomTipLayer);
        this.uiLayer.addChild(this.topTipLayer);
        this.uiLayer.addChild(this.debugLayer);

    },

    clear:function(){
        this.normalLayer.removeFromParent();
        this.bottomTipLayer.removeFromParent();
        this.topTipLayer.removeFromParent();
        this.debugLayer.removeFromParent();

        this.normalLayer = null;
        this.bottomTipLayer = null;
        this.topTipLayer = null;
        this.mainLayer = null;
    }
});
