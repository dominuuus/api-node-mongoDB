const mongoose = require("mongoose");

const pizzaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  size: {
    type: String,
    enum: ["Pequena", "Média", "Grande", "Família"],
    required: true,
    default: "Média",
  },
  ingredients: [
    {
      type: String,
      required: true,
    },
  ],
  available: {
    type: Boolean,
    default: true,
  },
  imgURL: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Pizza", pizzaSchema);
