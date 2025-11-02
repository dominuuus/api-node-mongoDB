const PizzaService = require("../services/pizzaService");

class PizzaController {
  async getAll(req, res) {
    try {
      const pizzas = await PizzaService.getAllPizzas();
      res.status(200).json(pizzas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const pizza = await PizzaService.getPizzaById(req.params.id);
      res.status(200).json(pizza);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      const pizza = await PizzaService.createPizza(req.body);
      res.status(201).json(pizza);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const pizza = await PizzaService.updatePizza(req.params.id, req.body);
      res.status(200).json(pizza);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const result = await PizzaService.deletePizza(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = new PizzaController();
