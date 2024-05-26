const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FurnitureSchema = new Schema({
  name: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  description: { type: String, required: true },
  long_description: {type: String, required: true},
  price: { type: Number, required: true },
  number_in_stock: {type: Number, required: true}
});

FurnitureSchema.virtual("url").get(function () {
  return `/store/furniture/${this._id}`;
});

// Export model
module.exports = mongoose.model("Furniture", FurnitureSchema);