window.NOTIFICATION = {
    eventList : {},
    on(type, callback, target) {
        if (typeof type !== "string" || typeof callback !== "function" || typeof target === "undefined") {
            cc.error("GLOBAL_DEF.js: NOTIFICATION method 'on' param error!");
            return;
        }
        if (typeof this.eventList[type] === "undefined") {
            this.eventList[type] = [];
        }
        this.eventList[type].push({callback: callback, target: target});
    },

    once(type, callback, target) {
        if (typeof type !== "string" || typeof callback !== "function" || typeof target === "undefined") {
            cc.error("GLOBAL_DEF.js: NOTIFICATION method 'on' param error!");
            return;
        }
        if (typeof this.eventList[type] === "undefined") {
            this.eventList[type] = [];
        }
        this.eventList[type].push({callback: callback, target: target, once: true});
    },

    emit(type, data) {
        if (typeof type !== "string") {
            cc.error("GLOBAL_DEF.js: NOTIFICATION method 'emit' param error!");
            return;
        }
        var list = this.eventList[type];
        if (typeof list !== "undefined") {
            for (var i = 0; i < list.length; i++) {
                var event = list[i];
                if (event) {
                    event.callback.call(event.target, data);
                    if(event.once){
                        off(type, event.callback, event.target);
                    }
                }
            }
        }
    },

    off(type, callback, target) {
        if (typeof type !== "string" || typeof callback !== "function" || typeof target === "undefined") {
            cc.error("GLOBAL_DEF.js: NOTIFICATION method 'off' param error!");
            return;
        }
        var list = this.eventList[type];
        if (typeof list !== "undefined") {
            for (var i = 0; i < list.length; i++) {
                var event = list[i];
                if (event && event.callback === callback && event.target === target) {
                    list.splice(i, 1);
                    break;
                }
            }
        }
    },

    offByType(type) {
        if (typeof type !== "string") {
            cc.error("GLOBAL_DEF.js: NOTIFICATION method 'offByType' param error!");
            return;
        }
        while (this.eventList[type].length > 1) {
            this.eventList[type].shift();
        }
        this.eventList[type] = undefined;
    },

    offByTarget(target){
        if (typeof target === "undefined") {
            cc.error("GLOBAL_DEF.js: NOTIFICATION method 'offByTarget' param error!");
            return;
        }
        for(var key in this.eventList){
            for(var i = 0; i < this.eventList[key].length ; i++){
                if(this.eventList[key][i].target === target){
                    this.eventList[key].splice(i, 1);
                    cc.log('off ' + key);
                    break;
                }
            }
        }
    }
};