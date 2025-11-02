const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderController');
const { authMiddleware, adminMiddleware } = require('../middlewares/authMiddleware');

//Todas as rotas exigirão logins
router.use(authMiddleware);

router.post('/', orderController.create);
router.get('/', orderController.getAllOrdersByUser);
router.get('/:id', orderController.getById);

router.patch('/:id/status', adminMiddleware, orderController.updateStatus);
router.get('/admin', adminMiddleware, orderController.getAllOrders);

module.exports = router;