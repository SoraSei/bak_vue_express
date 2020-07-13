const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  name: { type: String },
  bg: { type: String },
  img: { type: String },
  title: { type: String },
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Category" }],
  scores: {
    attr1: { type: Number },
    attr2: { type: Number }
  },
  skills: [
    {
      name: { type: String },
      img: { type: String },
      description: { type: String }
    }
  ],
  items1: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Item" }],
  items2: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Item" }],
  description: { type: String }
});
module.exports = mongoose.model("Roles", schema);
