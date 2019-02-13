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
        // manager.enabledDebugDraw = true;
        // manager.enabledDrawBoundingBox = true;
    },

    initDAD:function(){
        for(let i = 0; i < 16; ++i){
            let item = cc.instantiate(battle.mainScene.transportPrefab);
            battle.mainScene.transportLayer.addChild(item);
            item.on(cc.Node.EventType.TOUCH_START, this.startMoveFunc, this);
            item.on(cc.Node.EventType.TOUCH_MOVE, this.onMoveFunc, this);
            item.on(cc.Node.EventType.TOUCH_END, this.endMoveFunc, this);
            item.on(cc.Node.EventType.TOUCH_CANCEL, this.endMoveFunc, this);
            item.touchIndex = i;
            item.transportItem = item.getComponent("transportItem");
            item.transportItem.setShow(false);
            this.allDADItem.push(item);
        }

        for(let j = 0; j < battle.wxStorageManager.nowAllItems.length; j++){
            this.allDADItem[j].transportItem.setShow(true);
            this.allDADItem[j].transportItem.setTransportLevel(battle.wxStorageManager.nowAllItems[j]);
        }
    },

    startMoveFunc:function(event){
        if(event.target.transportItem && !event.target.transportItem.isShow)    return;
        this.nowDADItemStartPos = event.target.position;
        this.nowDADItem = event.target;
        this.nowDADItem.zIndex = 100;
        this.nowDADItemIndex = this.nowDADItem.touchIndex;
    },

    onMoveFunc:function(event){
        if(this.nowDADItem){
            this.touchPos = battle.mainScene.transportLayer.convertToNodeSpaceAR(event.touch.getLocation());
            this.nowDADItem.position = this.touchPos;
        }
    },

    endMoveFunc:function(event){
        this.analysisDADItem();
    },

    setCollisionDADItem:function(item1, item2){
        this.collisionItem1 = item1;
        this.collisionItem2 = item2;
    },

    analysisDADItem:function(){
        if(this.nowDADItem){
            this.nowDADItem.position = this.nowDADItemStartPos;
            if(this.collisionItem1 == null){
                this.nowDADItem.zIndex = 1;
                this.nowDADItem = null;
            }else{
                if(this.collisionItem1.transportItem.isShow
                 && this.collisionItem2.transportItem.isShow){
                    if(this.collisionItem1.transportItem.nowLevel == this.collisionItem2.transportItem.nowLevel){
                        battle.battleManager.mergeTransport(this.collisionItem1.transportItem.nowLevel);
                        if(this.collisionItem1 == this.nowDADItem){
                            this.collisionItem1.transportItem.setShow(false);
                            this.collisionItem2.transportItem.addTransportLevel();
                        }
                        if(this.collisionItem2 == this.nowDADItem){
                            this.collisionItem2.transportItem.setShow(false);
                            this.collisionItem1.transportItem.addTransportLevel();
                        }
                    }else{
                        let preLevel = this.collisionItem1.transportItem.nowLevel;
                        this.collisionItem1.transportItem.setTransportLevel(this.collisionItem2.transportItem.nowLevel);
                        this.collisionItem2.transportItem.setTransportLevel(preLevel);
                    }
                }else{
                    if(this.collisionItem1.transportItem.isShow){
                        this.collisionItem2.transportItem.setTransportLevel(this.collisionItem1.transportItem.nowLevel);
                        this.collisionItem2.transportItem.setShow(true);
                        this.collisionItem1.transportItem.setShow(false);
                    }else if(this.collisionItem2.transportItem.isShow){
                        this.collisionItem1.transportItem.setTransportLevel(this.collisionItem2.transportItem.nowLevel);
                        this.collisionItem1.transportItem.setShow(true);
                        this.collisionItem2.transportItem.setShow(false);
                    }
                }
                this.nowDADItem = null;
            }
        }
    },

    addADAItem:function(level){
        for(let i = 0; i < this.allDADItem.length; i++){
            if(!this.allDADItem[i].transportItem.isShow){
                this.allDADItem[i].transportItem.setShow(true);
                this.allDADItem[i].transportItem.setTransportLevel(level);
                break;
            }
        }
    }
});