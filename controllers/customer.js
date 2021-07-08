const Customer = require('../models/customer')

exports.addCart = async (req, res, next) => {
  const { customerId, ...rest } = req.body
  try {
    const customer = await Customer.findById(customerId)
    customer.carts.push({
      ...rest,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    })
    await customer.save()
    res
      .status(200)
      .json({ message: 'Added product to cart', data: customer.carts })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

exports.updateCart = async (req, res, next) => {
  const { customerId, cartId, ...rest } = req.body
  console.log(cartId)
  try {
    const customer = await Customer.findById(customerId)
    const cartIndex = customer.carts.findIndex(({ _id }) => _id == cartId)
    if (cartIndex < 0) {
      const error = new Error('Could not find Cart item.')
      error.statusCode = 404
      throw error
    }
    customer.carts[cartIndex] = {
      ...customer.carts[cartIndex],
      ...rest,
      updatedAt: Date.now(),
    }
    await customer.save()
    res.status(200).json({ message: 'updated cart', data: customer.carts })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

exports.getMerchants = async (req, res, next) => {
  try {
    const merchants = await Merchant.find(null, { password: false })
    res.status(200).json({ data: merchants })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}
