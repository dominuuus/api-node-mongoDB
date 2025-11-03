const PizzaService = require("../services/pizzaService");

class PizzaController {
  async getAll(req, res) {
    try {
      const pizzas = await PizzaService.getAllPizzas();
      res.status(200).json(pizzas);
    } catch (error) {
      res.status(500).json({ message: "Ocorreu um erro. Pizzas não localizadas" });
    }
  }

  async getById(req, res) {
    try {
      const pizza = await PizzaService.getPizzaById(req.params.id);
      res.status(200).json(pizza);
    } catch (error) {
      res.status(404).json({ message: "Pizza não encontrada. Verifique o ID" });
    }
  }

  async create(req, res) {
    try {
      const pizza = await PizzaService.createPizza(req.body);
      res.status(201).json(pizza);
    } catch (error) {
      res.status(400).json({ message: "Ocorreu um erro. Não foi possível criar a pizza" });
    }
  }

  async update(req, res) {
    try {
      const pizza = await PizzaService.updatePizza(req.params.id, req.body);
      res.status(200).json(pizza);
    } catch (error) {
      res.status(404).json({ message: "Ocorreu um erro ao atualizar. Não foi possível localizar a pizza" });
    }
  }

  async delete(req, res) {
    try {
      const result = await PizzaService.deletePizza(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      res.status(404).json({ message: "Ocorreu um erro ao deletar. Não foi possível localizar a pizza" });
    }
  }
}

module.exports = new PizzaController();
