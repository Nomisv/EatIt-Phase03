const Users = require("../model/Users");
module.exports = class LoginController {
  async login(ctx) {
    const { userName, password, img } = ctx.request.body;
    const existUser = await Users.findOne({ userName, password });
    if (!existUser) {
      ctx.body = {
        code: 401,
        message: "Username or password incorrect"
      };
      return
    }
    ctx.session.user = existUser;
    ctx.body = {
      code: 0,
      data: existUser
    }
  }

  async loginOut() {
    ctx.session.user = null;
    ctx.body = {
      code: 0
    };
  }
  async getCheckCode() {
    const captchapng = require("captchapng");
    const width = 100;
    const height = 42;
    const code = parseInt(Math.random() * 9000 + 1000);
    const p = new captchapng(width, height, code);
    p.color(0, 0, 0, 0);
    p.color(80, 80, 80, 255);
    const img = p.getBase64();
    const imgbase64 = new Buffer(img, "base64");
    return {
      imgbase64,
      code
    };
  }
  async checkcode(ctx) {
    const { code, imgbase64 } = await this.getCheckCode();
    ctx.session.code = code;
    ctx.set("Content-Type", "image/png");
    ctx.body = imgbase64;
  }
};
