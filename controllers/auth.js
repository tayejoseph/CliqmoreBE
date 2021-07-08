const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Customer = require('../models/customer')
const Merchant = require('../models/merchants')
const Admin = require('../models/admin')

exports.signUp = async (req, res, next, section) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.')
    error.statusCode = 422
    error.data = errors.array()
    throw error
  }
  const {
    email,
    firstName,
    lastName,
    phoneNumber,
    storePhoneNumber,
    password,
    storeName,
  } = req.body
  try {
    let result
    const hashedPwd = await bcrypt.hash(password, 12)
    if (section === 'customer') {
      const customer = new Customer({
        email,
        firstName,
        lastName,
        password: hashedPwd,
        phoneNumber,
      })
      result = await customer.save()
      res.status(201).json({
        message: 'User created!',
        userId: result._id,
      })
    } else if (section === 'merchant') {
      const merchant = new Merchant({
        storeEmail: email,
        storeName,
        password: hashedPwd,
        storePhoneNumber,
      })
      result = await merchant.save()
      res.status(201).json({
        message: 'Merchant created!',
        userId: result._id,
      })
    } else {
      const merchant = new Admin({
        email,
        firstName,
        lastName,
        password: hashedPwd,
        phoneNumber,
      })
      result = await merchant.save()
      res.status(201).json({
        message: 'Admin created!',
        userId: result._id,
      })
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

exports.logIn = async (req, res, next, section) => {
  const { email, password } = req.body
  let loadedUser
  try {
    const userData =
      section === 'customer'
        ? await Customer.findOne({ email })
        : section === 'merchant'
        ? await Merchant.findOne({ storeEmail: email })
        : await Admin.findOne({ email })
    if (!userData) {
      const error = new Error('A user with this email could not be found.')
      error.statusCode = 401
      throw error
    }

    loadedUser = userData
    const isEqual = await bcrypt.compare(password, userData.password)

    if (!isEqual) {
      const error = new Error('Wrong Password!')
      error.statusCode = 401
      throw error
    }
    const token = jwt.sign(
      {
        email: section !== 'merchant' ? userData.email : userData.storeEmail,
        userId: userData._id.toString(),
      },
      'somesupersecretsecret',
      { expiresIn: '1h' },
    )
    res.status(200).json({ token: token, userId: loadedUser._id.toString() })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}
