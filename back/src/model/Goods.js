const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uSchema = new Schema(
    {
        name: { type: String, default: "" }, //
        title: { type: String, default: "" }, //
        price: { type: Number, default: 0 }, //
        desc: { tyoe: String, default: "" },//描述
        image: String,//图片
    },
    {
        versionKey: false,
        timestamps: true
    }
);

module.exports = mongoose.model("goods", uSchema);
