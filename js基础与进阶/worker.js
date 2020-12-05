function fib(n) {
  if (n <= 2) {
    return 1;
  }
  return fib(n - 1) + fib(n - 2);
}

var onmessage = function (event) {
  var n = event.data;
  console.log("分线程接收到主线程传来的数据:", n);
  var result = fib(n);
  console.log("分线程任务完成，返回数据：", result);
  postMessage(result);
};
