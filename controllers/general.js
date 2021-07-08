const Department = require('../models/department')
const Merchant = require('../models/merchants')
const Product = require('../models/product')
const Admin = require('../models/admin')

exports.getProduct = async (req, res, next) => {
  try {
    const { productId } = req.params
    const product = await Product.findById(productId)
    res.status(200).json({ data: product })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find()
    res.status(200).json({ data: products })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

// need to returm stores that their products are more than 1
exports.getStores = async (req, res, next) => {
  try {
    const stores = await Product.find(
      { verified: true, activated: true },
      { password: false },
    )
    res.status(200).json({ data: stores })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

exports.getStoreProduct = async (req, res, next) => {
  const { storeId } = req.body
  try {
    const stores = await Product.find({ merchantId: storeId })
    res.status(200).json({ data: stores })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}
