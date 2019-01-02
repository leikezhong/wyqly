cc.Class({
    init:function(){
        this.allDADItem = [];
        this.nowDADItem = null;
        this.nowDADItemStartPos = null;
        this.collisionItem1 = null;
        this.collisionItem2 = null;

        this.startX = -220;
        this.startY = 250;
        this.intervalX = 150;
        this.intervalY = -150;

        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = true;
        manager.enabledDrawBoundingBox = true;
    },

    initDAD:function(){
        let children = battle.mainScene.transportLayer.children;
        for(let i = 0; i < children.length; i++){
            // children[i].active = false;
            children[i].on(cc.Node.EventType.TOUCH_START, this.startMoveFunc, this);
            children[i].on(cc.Node.EventType.TOUCH_MOVE, this.onMoveFunc, this);
            children[i].on(cc.Node.EventType.TOUCH_END, this.endMoveFunc, this);
            children[i].on(cc.Node.EventType.TOUCH_CANCEL, this.endMoveFunc, this);
            children[i].touchIndex = i;
            this.allDADItem.push(children[i]);
        }
    },

    startMoveFunc:function(event){
        this.nowDADItemStartPos = event.target.position;
        this.nowDADItem = event.target;
        this.nowDADItem.zIndex = 100;
        this.nowDADItemIndex = this.nowDADItem.touchIndex;
    },

    onMoveFunc:function(event){
        this.touchPos = battle.mainScene.transportLayer.convertToNodeSpaceAR(event.touch.getLocation());
        this.nowDADItem.position = this.touchPos;
    },

    endMoveFunc:function(event){
        this.analysisDADItem();
    },

    setCollisionDADItem:function(item1, item2){
        this.collisionItem1 = item1;
        this.collisionItem2 = item2;
    },

    analysisDADItem:function(){
        if(this.collisionItem1 == null){
            this.nowDADItem.zIndex = 1;
            this.nowDADItem.position = this.nowDADItemStartPos;
            this.nowDADItem = null;
        }else{
            console.log("111111");
            this.collisionItem1.active = false;
            this.collisionItem2.active = false;
            console.log("222222");
        }
    }
});