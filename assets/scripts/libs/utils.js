window.utils = window.utils || {};
utils.EARTH_RADIUS = 6371;//km 地球半径 平均值，千米

/// <summary>
/// 给定的纬度1，经度1；纬度2，经度2. 计算2个经纬度之间的距离。
/// </summary>
/// <param name="lat1">纬度1</param>
/// <param name="lon1">经度1</param>
/// <param name="lat2">纬度2</param>
/// <param name="lon2">经度2</param>
/// <returns>距离（公里、千米）</returns>
utils.Distance = function(lat1, lon1, lat2, lon2){
    //用haversine公式计算球面两点间的距离。
    //经纬度转换成弧度
    lat1 = utils.ConvertDegreesToRadians(lat1);
    lon1 = utils.ConvertDegreesToRadians(lon1);
    lat2 = utils.ConvertDegreesToRadians(lat2);
    lon2 = utils.ConvertDegreesToRadians(lon2);
    //差值
    let vLon = Math.abs(lon1 - lon2);
    let vLat = Math.abs(lat1 - lat2);

    //h is the great circle distance in radians, great circle就是一个球体上的切面，它的圆心即是球心的一个周长最大的圆。
    let h = utils.HaverSin(vLat) + Math.cos(lat1) * Math.cos(lat2) * utils.HaverSin(vLon);
    let distance = 2 * utils.EARTH_RADIUS * Math.asin(Math.sqrt(h)) * 1000;

    return distance;
}

utils.HaverSin = function(theta){
    var v = Math.sin(theta / 2);
    return v * v;
};

/// <summary>
/// 将角度换算为弧度。
/// </summary>
/// <param name="degrees">角度</param>
/// <returns>弧度</returns>
utils.ConvertDegreesToRadians = function(degrees){
    return degrees * Math.PI / 180;
};

utils.ConvertRadiansToDegrees = function(radian){
    return radian * 180.0 / Math.PI;
}