const express = require("express");
const productRoute = express.Router();
const {getProducts, getProductByID, addProduct, updateProductByID, deleteProductByID} = require("../controller/products.controller.js");

productRoute.get('/', getProducts);

productRoute.get('/:id', getProductByID);

productRoute.post('/', addProduct);

productRoute.put('/:id', updateProductByID);

productRoute.delete('/:id', deleteProductByID);

module.exports = productRoute;