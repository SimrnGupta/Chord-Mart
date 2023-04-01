const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products.controller");
const auth = require('../middleware/auth');

router.post('/product', auth('createAny', 'product'), productsController.addProduct);

module.exports = router