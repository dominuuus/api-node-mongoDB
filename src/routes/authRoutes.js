const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const {authMiddleware} = require("../middlewares/authMiddleware");

router.post("/register", authMiddleware, authController.register);
router.post("/login", authController.login);

module.exports = router;
