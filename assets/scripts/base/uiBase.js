var uiBase = cc.Class({
    extends: cc.Component,
    properties: {
        _isShow:true
    },

    onLoad: function () {
        this.allMountChild = [];
        this.findAllNode(this.node, this.mountChildName.bind(this));
    },

    findAllNode: function (node, cb) {
        let children = node.getChildren();
        for(let i = 0; i < children.length; ++i) {
            let child = children[i];
            cb(child);
            this.findAllNode(child, cb);
        }
    },

    mountChildName(node) {
        let nodeName = node.getName();
        if (nodeName) {
            this[nodeName] = node;
            if(nodeName == "closeBtn"){
                node.on(cc.Node.EventType.TOUCH_START, this.onClose, this);
            }else {
                if (node.getComponent(cc.Button)) {
                    node.on(cc.Node.EventType.TOUCH_START, this.onClickBtn, this);
                }
            }
            this.allMountChild.push(nodeName);
        }
    },

    setShow:function(){
        if(this.node){
            this.node.active = true;
        }
        this._isShow = true;
    },

    setHide:function(){
        if(this.node){
            this.node.active = false;
        }
        this._isShow = false;
    },

    onClickBtn: function (event) {
        this["click_" + event.target.name] && this["click_" + event.target.name]();
    },

    onClose: function () {
        for(let i = 0; i < this.allMountChild.length; ++i){
            this[this.allMountChild[i]] && this[this.allMountChild[i]].destroy && this[this.allMountChild[i]].destroy();
        }
        this.node && this.node.destroy();
    }
});

window.uiBase = uiBase;
module.exports = uiBase;