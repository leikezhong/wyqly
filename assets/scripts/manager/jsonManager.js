/**
 * @name jsonManager
 * @author lkz
 * @create 2019-01-17 16:32
 */
cc.Class({
    init: function () {
        // console.log("---init exploreManager---");
        this.configData = {};
    },

    initJson: function (asset) {
        this.configData[asset.name] = asset.json.RECORDS;
    }
});