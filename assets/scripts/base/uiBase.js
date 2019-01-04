cc.Class({
    extends: cc.Component,
    properties: {
        _isShow:true
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
    }
});
