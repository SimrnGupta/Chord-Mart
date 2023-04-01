const { Product } = require('../models/product');
const httpStatus = require('http-status');
const { ApiError } = require('../middleware/apiError');

const addProduct = async(body) => {
    try {
        const product = new Product({
            ...body
        });
        await product.save();
        return product;
    } catch(err) {
        throw err;
    }
}

module.exports = {
    addProduct
}