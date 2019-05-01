const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uSchema = new Schema(
  {
    userName: String,
    password: String,
    cid: String, //身份证
    phone: String, //手机号
    sex: String, // 性别
    icon: String, //头像
    name: { type: String, default: "" }, // 姓名
    email: String, // 邮箱
    role: { type: Number, default: 1 }, //0卖家 1买家
    score: { type: Number, default: 0 }, //积分
    balance: { type: Number, default: 0 } //余额
  },
  {
    versionKey: false,
    timestamps: true
  }
);

module.exports = mongoose.model("users", uSchema);
