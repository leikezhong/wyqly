/**
 * @name foodManager
 * @author lkz
 * @create 2019-01-16 20:18
 */
cc.Class({
    init: function () {
        // console.log("---init exploreManager---");
        this.initRemainFood();
    },
    
    initRemainFood: function () {
        this.allRemainFood = battle.configManager.allFood.concat();
        let nowFood = battle.wxStorageManager.nowFood.concat();
        for(let i = 0; i < nowFood.length; i++){
            for(let j = 0; j < this.allRemainFood.length; j++){
                if(this.allRemainFood[j].id == nowFood[i]){
                    this.allRemainFood.splice(j, 1);
                    break;
                }
            }
        }
    },
    
    addFood: function (foodId) {
        battle.wxStorageManager.addArrStorageValue("nowFood", foodId);
    },

    getRandomFood: function () {
        let randomIndex = -1;
        if(battle.configManager.allFood.length == battle.wxStorageManager.nowFood.length){
            console.log("---no food!---");
        }else {
            randomIndex = Math.floor(this.allRemainFood.length * Math.random());
        }
        return randomIndex;
    },

    mergeFood: function () {

    }
});