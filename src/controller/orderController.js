const orderService = require("../services/orderService");

class OrderController {
  async create(req, res) {
    try {
      const userId = req.user._id;
      const { items, address, paymentMethod } = req.body;

      const order = await orderService.createOrder(userId, items, address, paymentMethod);

      res.status(201).json(order);
    } catch (error) {
      res.status(400).json({ message: "Erro ao criar o pedido" });
    }
  }

  async getAllOrdersByUser(req, res) {
    try {
      const userId = req.user._id;
      const orders = await orderService.getOrdersByUser(userId);
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: "Erro ao recuperar os pedidos do usuário" });
    }
  }

  async getAllOrders(req, res) {
    try {
      const orders = await orderService.getAllOrders();
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: "Erro ao recuperar os pedidos" });
    }
  }

  async getById(req, res) {
    try {
      const userId = req.user._id;
      const orderId = req.params.id;

      const order = await orderService.getOrderById(userId, orderId);
      res.status(200).json(order);
    } catch (error) {
      res.status(404).json({ message: "Erro ao recuperar o pedido. Verifique o ID" });
    }
  }

  async updateStatus(req, res) {
    try {
      const { status } = req.body;
      const orderId = req.params.id;

      const order = await orderService.updateOrderStatus(orderId, status);
      res.status(200).json(order);
    } catch (error) {
      res.status(400).json({ message: "Erro ao atualizar os dados do pedido" });
    }
  }
}

module.exports = new OrderController();
