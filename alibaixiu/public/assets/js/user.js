// 当表单发生提交行为的时候
$("#userForm").on("submit", function () {
  // 获取到用户在表单中输入的内容并将内容格式化成参数字符串
  var formData = $(this).serialize();
  // 向服务器端发送添加用户的请求
  $.ajax({
    type: "post",
    url: "/users",
    data: formData,
    success: function () {
      // 刷新页面
      location.reload();
    },
    error: function () {
      alert("用户添加失败");
    },
  });
  // 阻止表单的默认提交行为
  return false;
});

// 上传头像
// 当用户选择文件的时候
$("#modifyBox").on("change", "#avatar", function () {
  // 用户选择到的文件
  // this.files[0]
  var formData = new FormData();
  formData.append("avatar", this.files[0]);

  $.ajax({
    type: "post",
    url: "/upload",
    data: formData,
    // 告诉$.ajax方法不要解析请求参数
    processData: false,
    // 告诉$.ajax方法不要设置请求参数的类型
    contentType: false,
    success: function (response) {
      console.log(response);
      // 实现头像预览功能
      $("#preview").attr("src", response[0].avatar);
      $("#hiddenAvatar").val(response[0].avatar);
    },
  });
});

// 向服务器端发送请求 索要用户列表数据
$.ajax({
  type: "get",
  url: "/users",
  success: function (response) {
    console.log(response);
    // 使用模板引擎将数据和HTML字符串进行拼接
    var html = template("userTpl", { data: response });
    // 将拼接好的字符串显示在页面中
    $("#userBox").html(html);
  },
});

// 通过事件委托的方式为编辑按钮添加点击事件
$("#userBox").on("click", ".edit", function () {
  // 获取被点击用户的id值
  var id = $(this).attr("data-id");
  // 根据id获取用户的详细信息
  $.ajax({
    type: "get",
    url: "/users/" + id,
    success: function (response) {
      console.log(response);
      var html = template("modifyTpl", response);
      $("#modifyBox").html(html);
    },
  });
});

// 为修改表单添加表单提交事件
$("#modifyBox").on("submit", "#modifyForm", function () {
  // 获取用户在表单中输入的内容
  var formData = $(this).serialize();
  // 获取要修改的那个用户的id值
  var id = $(this).attr("data-id");
  // 发送请求 修改用户信息
  $.ajax({
    type: "put",
    url: "/users/" + id,
    data: formData,
    success: function (response) {
      // 修改用户信息成功 重新加载页面
      location.reload();
    },
  });

  // 阻止表单默认提交
  return false;
});

$("#userBox").on("click", ".delete", function () {
  if (confirm("是否真的要删除用户？")) {
  }
});

// 获取全选按钮
var selectAll = $("#selectAll");

// 批量删除删除
var deleteMany = $("#deleteMany");

// 当全选按钮发生改变时
selectAll.on("change", function () {
  // 获取check值
  var status = $(this).prop("checked");
  if (status) {
    deleteMany.show();
  } else {
    deleteMany.hide();
  }
  // 获取到所有的用户, 让全选与所有用户的状态保持一致
  $("#userBox").find("input").prop("checked", status);
  //
});

// 当用户前面的复选框发生改变时
$("#userBox").on("change", ".userStatus", function () {
  // 获取所有用户，在所有用户中过滤初选中的用户
  // 判断选中用户的数量与所有用户数量
  var inputs = $("#userBox").find("input");

  if (inputs.length == inputs.filter(":checked").length) {
    // alert("所有用户都被选中");
    selectAll.prop("checked", true);
  } else {
    // alert("不是所有用户都被选中");
    selectAll.prop("checked", false);
  }
  if (inputs.filter(":checked").length == 0) {
    deleteMany.hide();
  } else {
    deleteMany.show();
  }
});

// 为批量删除按钮添加点击事件
deleteMany.on("click", function () {
  var ids = [];
  // 获取选中用户
  var checkUser = $("#userBox").find("input").filter(":checked");
  //
  checkUser.each(function (index, element) {
    ids.push($(element).attr("data-id"));
  });
  //
  if (confirm("您真的确定要进行批量删除操作么？")) {
    $.ajax({
      type: "delete",
      url: "/users/" + ids.join("-"),
      success: function () {
        location.reload();
      },
    });
  }
});
