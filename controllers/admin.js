const Department = require('../models/department')
const Merchant = require('../models/merchants')
const Admin = require('../models/admin')

exports.getMerchant = async (req, res, next) => {
  try {
    const { merchantId } = req.params
    const merchant = await Merchant.findById(merchantId, { password: false })
    res.status(200).json({ data: merchant })
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
