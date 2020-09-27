const http = require("http");
const url = require("url");
const querystring = require("querystring");
require("./model/index.js");
const User = require("./model/user");

// 创建服务器
const app = http.createServer();

// 为服务其对象添加请求事件
app.on("request", async (req, res) => {
  const method = req.method;
  const { pathname, query } = url.parse(req.url, true);
  if (method == "GET") {
    // 呈现用户列表
    if (pathname == "/list") {
      let users = await User.find();
      //   console.log(users);
      let list = `
            <!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>用户列表</title>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">
</head>
<body>
	<div class="container">
		<h6>
			<a href="/add" class="btn btn-primary">添加用户</a>
		</h6>
		<table class="table table-striped table-bordered">
			<tr>
				<td>用户名</td>
				<td>年龄</td>
				<td>爱好</td>
				<td>邮箱</td>
				<td>操作</td>
			</tr>
		`;

      users.forEach((item) => {
        list += `
            <tr>
                <td>${item.name}</td>
                <td>${item.age}</td>
                <td>
            `;
        item.hobbies.forEach((item) => {
          list += `<span>${item} </span>`;
        });
        list += `
        </td>
        <td>${item.email}</td>
        <td>
            <a href="/delete?id=${item._id}" class="btn btn-danger btn-xs">删除</a>
            <a href="/modify?id=${item._id}" class="btn btn-success btn-xs">修改</a>
        </td>
    </tr>
        `;
      });
      list += `
      </table>
      </div>
  </body>
  </html> 
      `;
      res.end(list);
    } else if (pathname == "/add") {
      // 增加用户
      let add = `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <title>用户列表</title>
            <link
              rel="stylesheet"
              href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css"
            />
          </head>
          <body>
            <div class="container">
              <h3>添加用户</h3>
              <form method="post" action="/add">
                <div class="form-group">
                  <label>用户名</label>
                  <input name="name" type="text" class="form-control" placeholder="请填写用户名" />
                </div>
                <div class="form-group">
                  <label>密码</label>
                  <input 
                    name="password" 
                    type="password"
                    class="form-control"
                    placeholder="请输入密码"
                  />
                </div>
                <div class="form-group">
                  <label>年龄</label>
                  <input name="age" type="text" class="form-control" placeholder="请填写年龄" />
                </div>
                <div class="form-group">
                  <label>邮箱</label>
                  <input name="email" type="email" class="form-control" placeholder="请填写邮箱" />
                </div>
                <div class="form-group">
                  <label>请选择爱好</label>
                  <div>
                    <label class="checkbox-inline">
                      <input type="checkbox" value="足球" name="hobbies" /> 足球
                    </label>
                    <label class="checkbox-inline">
                      <input type="checkbox" value="篮球" name="hobbies" /> 篮球
                    </label>
                    <label class="checkbox-inline">
                      <input type="checkbox" value="橄榄球" name="hobbies" /> 橄榄球
                    </label>
                    <label class="checkbox-inline">
                      <input type="checkbox" value="敲代码" name="hobbies" /> 敲代码
                    </label>
                    <label class="checkbox-inline">
                      <input type="checkbox" value="抽烟" name="hobbies" /> 抽烟
                    </label>
                    <label class="checkbox-inline">
                      <input type="checkbox" value="喝酒" name="hobbies" /> 喝酒
                    </label>
                    <label class="checkbox-inline">
                      <input type="checkbox" value="烫头" name="hobbies" /> 烫头
                    </label>
                  </div>
                </div>
                <button type="submit" class="btn btn-primary">添加用户</button>
              </form>
            </div>
          </body>
        </html>
        `;
      res.end(add);
    } else if (pathname == "/modify") {
      // 修改用户
      //   console.log(typeof query.id);
      let user = await User.findOne({ _id: query.id });
      let hobbies = [
        "足球",
        "篮球",
        "橄榄球",
        "敲代码",
        "抽烟",
        "喝酒",
        "烫头",
        "吃饭",
        "睡觉",
        "打豆豆",
      ];
      //   console.log("user: " + user);
      let modify = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>用户列表</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css"
        />
      </head>
      <body>
        <div class="container">
          <h3>修改用户</h3>
          <form method="post" action="/modify?${user._id}">
            <div class="form-group">
              <label>用户名</label>
              <input value="${user.name}" name="name" type="text" class="form-control" placeholder="请填写用户名" />
            </div>
            <div class="form-group">
              <label>密码</label>
              <input 
                value="${user.password}" 
                name="password" 
                type="password"
                class="form-control"
                placeholder="请输入密码"
              />
            </div>
            <div class="form-group">
              <label>年龄</label>
              <input value="${user.age}" name="age" type="text" class="form-control" placeholder="请填写年龄" />
            </div>
            <div class="form-group">
              <label>邮箱</label>
              <input value="${user.email}" name="email" type="email" class="form-control" placeholder="请填写邮箱" />
            </div>
            <div class="form-group">
              <label>请选择爱好</label>
              <div>`;
      hobbies.forEach((item) => {
        let isHobby = user.hobbies.includes(item);
        if (isHobby) {
          modify += `
            <label class="checkbox-inline">
              <input type="checkbox" value="${item}" name="hobbies" checked /> ${item}
            </label> 
            `;
        } else {
          modify += `
            <label class="checkbox-inline">
              <input type="checkbox" value="${item}" name="hobbies" /> ${item}
            </label>
            `;
        }
      });

      modify += `
                  </div>
                </div>
                <button type="submit" class="btn btn-primary">修改用户</button>
              </form>
            </div>
          </body>
        </html>
        `;
      res.end(modify);
    } else if (pathname == "/delete") {
      // 删除用户
      await User.findOneAndDelete({ _id: query.id }, (err, res) => {
        !err ? console.log(res) : console.log(err);
      });
      res.writeHead(302, {
        Location: "/list",
      });
      res.end();
    }
  } else if (method == "POST") {
    if (pathname == "/add") {
      // 添加用户
      let formData = "";
      // 接收数据
      // 参数接收完毕
      req.on("data", (param) => {
        formData += param;
      });
      // 数据接收完毕后调用end方法
      req.on("end", async () => {
        //
        //   console.log(formData)
        let user = querystring.parse(formData);
        console.log(user);
        await User.updateOne({ _id: query.id }, user);
        // 用户提交表单后，进行重定向
        // location后面为重定向地址
        res.writeHead(302, {
          Location: "/list",
        });
        // console.log('sfsd')
        res.end();
      });
    } else if (pathname == "/modify") {
      let formData = "";
      // 接收数据
      // 参数接收完毕
      req.on("data", (param) => {
        formData += param;
      });
      // 数据接收完毕后调用end方法
      req.on("end", async () => {
        //
        //   console.log(formData)
        let user = querystring.parse(formData);
        // console.log(user);
        await User.updateOne(user).then((res) => {
          console.log("insert success");
        });
        // 用户提交表单后，进行重定向
        // location后面为重定向地址
        res.writeHead(302, {
          Location: "/list",
        });
        // console.log('sfsd')
        res.end();
      });
    }
  }
});

// 监听端口
app.listen(3000);
