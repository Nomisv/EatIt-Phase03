const model = require("../model/Users");
const Order = require("../model/Orders");
const goods = require("../model/Goods");
const utils = require("./utils");
const mongo = require('mongoose')
module.exports = class UsersController {
  async create(ctx) {
    const { _id, ...data } = ctx.request.body;
    if (!data.userName) {
      ctx.body = {
        code: 0,
        data: await model.create(data)
      };
      return
    }
    const find = await model.findOne({
      userName: data.userName
    });
    if (!find) {
      ctx.body = {
        code: 0,
        data: await model.create(data)
      };
      return;
    }

    ctx.body = {
      code: 417,
      message: "The account already exists!"
    };
  }
  /** base */
  async removeAll(ctx) {
    const { ids } = ctx.request.body;
    ctx.body = await model.remove({ _id: { $in: ids } });
  }
  async update(ctx) {
    const { _id, ...update } = ctx.request.body;
    ctx.body = await model.update({ _id }, update);
  }
  async list(ctx) {
    let { size, pageNo, ...query } = ctx.request.body;
    ctx.body = await utils.QueryPage({ size, pageNo }, () => {
      if (query._id) {
        return model.find({ _id: query._id }).sort({ _id: -1 });
      } else {
        delete query._id
      }
      query = query || {};
      query.name = new RegExp(query.name);
      return model.find(query).sort({ _id: -1 });
    });
  }
  async goodsAdd(ctx, next) {
    ctx.body = {
      code: 0,
      data: await goods.create(ctx.request.body)
    };
  }
  async goodsList(ctx, next) {
    const query = {}
    if (ctx.query.text) {
      query.name = new RegExp(ctx.query.text)
    }
    ctx.body = await goods.find(query)
  }
  async cart(ctx, next) {
    const data = ctx.request.body
    const ids = Object.keys(data)
    const mdata = await goods.find({
      _id: { $in: ids }
    })
    const result = []
    mdata.map(item => {
      result.push({
        goods: item,
        num: data[item._id].num
      })
    })
    ctx.body = result
  }

  async order(ctx, next) {
    const { data, userId } = ctx.request.body
    const order = {}
    let total = 0
    order.items = data.map(item => {
      total += item.num * item.goods.price
      return {
        num: item.num,
        goods: item.goods._id
      }
    })
    if (!userId) {
      ctx.body = { code: -1 }
      return
    }
    order.user = userId

    order.totalPrice = total
    order.status = 0
    ctx.body = await Order.create(order)
  }
  async orderList(ctx, next) {
    const { userId, all, _id } = ctx.query
    const query = {}
    if (_id) {
      query._id = mongo.Types.ObjectId(_id)
    }
    if (all) {
      ctx.body = await Order.find(query).populate("items.goods user")
      return
    }
    query.user = userId
    ctx.body = await Order.find(query).populate("items.goods user")
  }
  async deleteOrder(ctx, next) {
    const { id } = ctx.query
    ctx.body = await Order.remove({ _id: id })

  }
  /** end */
  async uploadImage(ctx, next) {
    let file = ctx.req.file;
    if (!file) {
      ctx.status = 422;
      return (ctx.body = { error_msg: "缺少文件参数." });
    }
    try {
      ctx.status = 200;
      ctx.body = { success: true, url: ctx.req.file.filename };
    } catch (err) {
      ctx.throw(err);
    }
  }
};
