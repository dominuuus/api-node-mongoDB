const express = require("express");
const router = express.Router();
const pizzaController = require("../controller/pizzaController");
const {
  authMiddleware,
  adminMiddleware,
} = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, pizzaController.getAll);
router.get("/", authMiddleware, pizzaController.getById);
router.get("/:id", authMiddleware, pizzaController.getById);

router.post("/", adminMiddleware, pizzaController.create);
router.put("/:id", adminMiddleware, pizzaController.update);
router.delete("/:id", adminMiddleware, pizzaController.delete);

module.exports = router;
