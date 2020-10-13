$("#addCategory").on("submit", function () {
  //
  var formData = $(this).serialize();
  console.log(formData);
  $.ajax({
    type: "post",
    url: "/categories",
    data: formData,
    success: function () {
      location.reload();
    },
  });
  //
  return false;
});

// 发送ajax

$.ajax({
  type: "get",
  url: "/categories",
  success: function (response) {
    // console.log(response);
    var html = template("categoryListTpl", { data: response });
    // console.log(html);
  },
});
