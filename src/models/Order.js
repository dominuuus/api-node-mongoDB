const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
    pizza: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pizza",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    price: {
        type: Number,
        required: true,
    }
});

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: [orderItemSchema],
    totalPrice: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["pendente", "preparando", "saiu_para_entrega", "entregue", "cancelado"],
        default: "pendente",
    },
    address: {
        street: { type: String, required: true },
        number: { type: Number, required: true },
        complement: { type: String },
        neighborhood: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipCode: { type: String, required: true },
    },
    paymentMethod: {
        type: String,
        enum: ["dinheiro", "cartao_credito", "cartao_debito", "pix"],
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

orderSchema.pre(/^find/, function(next) {
  this.populate('items.pizza', 'name price imgURL');
  next();
});

module.exports = mongoose.model("Order", orderSchema);