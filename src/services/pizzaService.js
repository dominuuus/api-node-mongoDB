const Pizza = require("../models/Pizza");

class PizzaService {
  async getAllPizzas() {
    return await Pizza.find({ available: true }).select("-__v");
  }

  async getPizzaById(id) {
    const pizza = await Pizza.findById(id).select("-__v");

    if (!pizza) {
      throw new Error("Pizza não encontrada");
    }

    return pizza;
  }

  async createPizza(pizzaData) {
    const pizza = new Pizza(pizzaData);
    return await pizza.save();
  }

  async updatePizza(id, pizzaData) {
    const pizza = await Pizza.findByIdAndUpdate(
      id,
      { $set: pizzaData },
      { new: true, runValidators: true }
    ).select("-__v");

    if (!pizza) {
      throw new Error("Pizza não encontrada");
    }

    return pizza;
  }

  async deletePizza(id) {
    const pizza = await Pizza.findByIdAndUpdate(
      id,
      { available: false },
      { new: true }
    );

    if (!pizza) {
      throw new Error("Pizza não encontrada");
    }
    return { message: "Pizza removida com sucesso" };
  }
}

module.exports = new PizzaService();
