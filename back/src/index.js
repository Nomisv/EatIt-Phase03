const Router = require("koa-router");
const multer = require('koa-multer')
const path = require('path')
const storage = multer.diskStorage({
  //文件保存路径
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/'))
  },
  //修改文件名称
  filename: function (req, file, cb) {
    var fileFormat = (file.originalname).split(".");
    cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
  }
})
const upload = multer({ storage: storage });
const User = require('./model/Users')
module.exports = function () {
  const app = new Router();
  const UsersController = require("./controller/user");
  const LoginController = require("./controller/login");
  const users = new UsersController();
  const login = new LoginController();
  app.post('/upload', upload.single('file'), users.uploadImage)
  // 登录校验
  app.post("/api/login", login.login);
  app.post("/api/loginOut", login.loginOut);
  app.get("/api/login/checkcode", login.checkcode.bind(login));

  //用户
  app.post("/api/users/update", users.update);
  app.post("/api/users/remove", users.removeAll);
  app.post("/api/users/create", users.create);
  app.post("/api/users/list", users.list);

  //goods
  app.post("/api/goods/create", users.goodsAdd);
  app.get('/api/goods/list', users.goodsList)
  app.post('/api/cart', users.cart)
  app.post('/api/order', users.order)
  app.get('/api/order/list', users.orderList)
  app.get('/api/order/delete', users.deleteOrder)
  initData()
  return app;
};
//初始化用户数据
async function initData() {
  const count = await User.count()
  console.log(count)
  if (count === 0) {
    console.log('init user admin')
    await User.create({
      userName: "123456",
      password: "123456",
      name: "admin",
      role: 0,
    })
  }
}