cc.Class({
    init:function () {
        // console.log("---init layerManager---");
        this.rootNode = new cc.Node();
        this.rootNode.x = cc.winSize.width / 2;
        this.rootNode.y = cc.winSize.height / 2;
        cc.director.getScene().addChild(this.rootNode);

        this.gameLayer = new cc.Node();
        this.gameLayer.x = -cc.winSize.width * .5;
        this.gameLayer.y = 0;
        this.rootNode.addChild(this.gameLayer);

        this.uiLayer = new cc.Node();
        this.rootNode.addChild(this.uiLayer);

        this.bgLayer = new cc.Node();
        this.charLayer = new cc.Node();
        this.itemLayer = new cc.Node();
        this.gameLayer.addChild(this.bgLayer);
        this.gameLayer.addChild(this.charLayer);
        this.gameLayer.addChild(this.itemLayer);

        this.mainLayer = new cc.Node();
        this.normalLayer = new cc.Node();
        this.bottomTipLayer = new cc.Node();
        this.topTipLayer = new cc.Node();
        this.debugLayer = new cc.Node();
        this.debugLayer.addComponent(cc.Graphics);
        this.uiLayer.addChild(this.mainLayer);
        this.uiLayer.addChild(this.normalLayer);
        this.uiLayer.addChild(this.bottomTipLayer);
        this.uiLayer.addChild(this.topTipLayer);
        this.uiLayer.addChild(this.debugLayer);
    },

    clear:function(){
        this.mainLayer.removeFromParent();
        this.normalLayer.removeFromParent();
        this.bottomTipLayer.removeFromParent();
        this.topTipLayer.removeFromParent();
        this.debugLayer.removeFromParent();
        this.uiLayer.removeFromParent();

        this.bgLayer.removeFromParent();
        this.charLayer.removeFromParent();
        this.itemLayer.removeFromParent();
        this.gameLayer.removeFromParent();

        this.rootNode.removeFromParent();

        this.normalLayer = null;
        this.bottomTipLayer = null;
        this.topTipLayer = null;
        this.mainLayer = null;
        this.debugLayer = null;
        this.uiLayer = null;

        this.bgLayer = null;
        this.charLayer = null;
        this.itemLayer = null;
        this.gameLayer = null;

        this.rootNode = null;
    }
});
