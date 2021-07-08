const Merchant = require('../models/merchants')
const Product = require('../models/product')

exports.addProduct = async (req, res, next) => {
  const { quantity, name } = req.body
  try {
    const productExit = await Product.findOne({
      name,
    }).exec()

    if (productExit) {
      const error = new Error('Product name already exists!')
      error.statusCode = 422
      throw error
    }
    const newProduct = new Product({
      ...req.body,
      availableQty: quantity,
      totalProduct: quantity,
      quantity,
    })
    await newProduct.save()
    const products = await Product.find()
    res
      .status(200)
      .json({ message: 'Added product successfully!', data: products })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

exports.updateProduct = async (req, res, next) => {
  const { prodId, ...rest } = req.body
  if (!rest) {
    const error = new Error('You need to include what you want to update')
    error.statusCode = 422
    throw error
  }
  try {
    await Product.findByIdAndUpdate(prodId, rest)
    const products = await Product.find()
    res
      .status(200)
      .json({ message: 'updated product successfully!', data: products })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

exports.deleteProduct = async (req, res, next) => {
  const { productId } = req.params
  try {
    const deletedProduct = await Product.findByIdAndRemove(productId)
    if (!deletedProduct) {
      const error = new Error('Product does not exist')
      error.statusCode = 403
      throw error
    }
    const products = await Product.find()
    res
      .status(200)
      .json({ message: 'deleted product successfully!', data: products })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}
