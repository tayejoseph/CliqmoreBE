const express = require('express')
const { body } = require('express-validator')
const Customer = require('../models/customer')
const AuthController = require('../controllers/auth')
const GeneralController = require('../controllers/general')
const router = express.Router()

router.get('/products', GeneralController.getProducts)

router.get('/product/:productId', GeneralController.getProduct)

router.get('/stores', GeneralController.getStores)

router.get('/store/products', GeneralController.getStoreProduct)

module.exports = router
