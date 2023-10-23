const express = require('express');
const router = express.Router();

const saleController = require('../controllers/sale.controller');
const authenticateUser = require('../middlewares/authenticateUser.middleware');

router.post('/', authenticateUser, saleController.Create);
router.get('/', authenticateUser, saleController.GetAll);
router.get('/:saleId', authenticateUser, saleController.GetById);
router.get('/user/:userId', authenticateUser, saleController.GetByUserId);
router.post('/date', authenticateUser, saleController.GetAllDateFiltered);

module.exports = router;