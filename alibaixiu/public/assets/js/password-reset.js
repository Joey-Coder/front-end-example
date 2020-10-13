// 当修改密码表单提交
$("#modifyForm").on("submit", function () {
  //
  var formData = $(this).serialize();
  console.log(formData);
  //
  $.ajax({
    type: "put",
    url: "/users/password",
    data: formData,
    success: function () {
      location.href = "/admin/login.html";
    },
  });

  // 阻止表单提交
  return false;
});
