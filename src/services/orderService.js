const Order = require("../models/Order");
const Pizza = require("../models/Pizza");

class OrderService {
  async createOrder(userId, items, address, paymentMethod) {
    if (!items || items.length === 0) {
      throw new Error("O pedido deve conter pelo menos um item");
    }

    if (
      !address ||
      !address.street ||
      !address.number ||
      !address.neighborhood ||
      !address.city ||
      !address.state ||
      !address.zipCode
    )
      throw new Error("Endereço completo é obrigatório");
    if (!paymentMethod) throw new Error("Método de pagamento é obrigatório");

    const pizzasIds = items.map((item) => item.pizza || item.pizzasId);
    const pizzas = await Pizza.find({
      _id: { $in: pizzasIds },
      available: true,
    });

    if (pizzas.length !== items.length) {
      throw new Error("Uma ou mais pizzas não estão disponíveis");
    }

    let total = 0;
    const orderItems = items.map((item) => {
      const itemPizzaId = item.pizza || item.pizzasId;
      const pizza = pizzas.find((p) => p._id.toString() === itemPizzaId);
      const itemTotal = pizza.price * item.quantity;
      total += itemTotal;

      return {
        pizza: pizza._id,
        quantity: item.quantity,
        price: itemTotal,
      };
    });

    const order = new Order({
      user: userId,
      items: orderItems,
      totalPrice: parseFloat(total.toFixed(2)),
      address,
      paymentMethod,
    });

    await order.save();
    await order.populate("items.pizza", "name price imageUrl");

    return order;
  }
  async getOrdersByUser(userId) {
    return await Order.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate("items.pizza", "name price imageUrl");
  }

  async getOrderById(userId, orderId) {
    const order = await Order.findOne({ _id: orderId, user: userId }).populate(
      "items.pizza",
      "name price imageUrl"
    );

    if (!order) throw new Error("Pedido não encontrado");
    return order;
  }

  async getAllOrders() {
    return await Order.find()
      .sort({ createdAt: -1 })
      .populate("user", "name email")
      .populate("items.pizza", "name price imageUrl");
  }

  async updateOrderStatus(orderId, status) {
    const allowedStatuses = [
      "pendente",
      "preparando",
      "saiu_para_entrega",
      "entregue",
      "cancelado",
    ];

    if (!allowedStatuses.includes(status)) {
      throw new Error("Status inválido. Use: " + allowedStatuses.join(", "));
    }

    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true, runValidators: true }
    )
      .populate("user", "name email")
      .populate("items.pizza", "name price imageUrl");

    if (!order) throw new Error("Pedido não encontrado");

    return order;
  }
}

module.exports = new OrderService();
