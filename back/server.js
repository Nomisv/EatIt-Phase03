const Koa = require("koa");
const bodyParser = require("koa-bodyparser"); 
const cors = require("koa2-cors");
const session = require("koa-session");
const router = require("./src/index")();
const static = require('koa-static');
const path = require("path")

const mongoose = require("mongoose");

const db = "mongodb://127.0.0.1:27017/goods_db"; //mongoose address

mongoose.connect(db, { useNewUrlParser: true }); //connect to mongoose

const app = new Koa();

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
app.use(cors()); 
app.use(bodyParser({ enableTypes: ["json", "form", "text"] }));
app.use(router.routes()).use(router.allowedMethods());

app.listen(8088, () => {
  console.log("start http://127.0.0.1:8088 ......");
});
