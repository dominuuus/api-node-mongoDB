const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const {
  authMiddleware,
  adminMiddleware,
} = require("../middlewares/authMiddleware");

//Todas as rotas exigirão logins
router.use(authMiddleware);

router.get("/profile", userController.getProfile);
router.put("/profile", userController.updateProfile);
router.post("/change-password", userController.changePassword);

router.get("/", adminMiddleware, userController.getAllUsers);
router.get("/email/:email", adminMiddleware, userController.getUserByEmail);
router.delete("/delete/:id", adminMiddleware, userController.deleteUser);

module.exports = router;
