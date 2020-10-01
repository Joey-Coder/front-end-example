// jsonp函数封装
function jsonp(options) {
  var script = document.createElement("script");
  ///Math.random产生0～1中的小数
  // 产生一个随机函数名
  var fnName = "myJsonp" + Math.random().toString().replace(".", "");
  // 使success变成全局函数
  window[fnName] = options.success;
  //获取data，并拼接成get参数形式
  var params = "";
  for (var attr in options.data) {
    params += "&" + attr + "=" + options.data[attr];
  }
  // console.log(params)

  script.src = options.url + `?callback=${fnName}` + params;
  document.body.appendChild(script);

  // script加载完后删除，避免每次点击产生额外的script
  script.onload = function () {
    document.body.removeChild(script);
  };
}
