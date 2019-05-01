const Koa = require("koa");
const bodyParser = require("koa-bodyparser"); //中间件，
const cors = require("koa2-cors");
const session = require("koa-session");
const router = require("./src/index")();
const static = require('koa-static');
const path = require("path")

const mongoose = require("mongoose");

const db = "mongodb://127.0.0.1:27017/goods_db"; //mongoose 地址

mongoose.connect(db, { useNewUrlParser: true }); //链接mongoose

const app = new Koa();
// 配置静态web服务的中间件
app.use(static(path.join(__dirname, './uploads')));
app.keys = ["some secret hurr"];
const CONFIG = {
  key: "koa:sess",
  maxAge: 3000000,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: true,
  renew: false
};

app.use(session(CONFIG, app));
app.use(cors()); //跨域处理
app.use(bodyParser({ enableTypes: ["json", "form", "text"] }));
app.use(router.routes()).use(router.allowedMethods());

app.listen(8088, () => {
  console.log("start http://127.0.0.1:8088 ......");
});
