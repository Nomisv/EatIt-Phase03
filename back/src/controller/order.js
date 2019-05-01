const model = require("../model/Orders");
const Users = require("../model/Users");
const utils = require("./utils");
module.exports = class OrderController {
  async create(ctx) {
    
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
      query = query || {};
      return model.find(query).sort({ _id: -1 });
    });
  }
  /** end */
};
