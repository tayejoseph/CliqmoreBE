const express = require('express')
const { body } = require('express-validator')
const Customer = require('../models/customer')
const AuthController = require('../controllers/auth')
const CustomerController = require('../controllers/customer')

const router = express.Router()

router.post(
  '/signUp',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email')
      .custom(async (email, { req }) => {
        const userDoc = await Customer.findOne({ email })
        if (userDoc) {
          return Promise.reject('E-mail address already exists!')
        }
      })
      .normalizeEmail(),
    body('firstName').trim().not().isEmpty(),
    body('lastName').trim().not().isEmpty(),
    body('password').trim().isLength({ min: 5 }),
    body('phoneNumber').trim().isLength({ min: 11 }),
  ],
  (req, res, next) => {
    AuthController.signUp(req, res, next, 'customer')
  },
)

router.post('/logIn', (req, res, next) => {
  AuthController.logIn(req, res, next, 'customer')
})

router.post(
  '/addCart',
  [
    body('customerId').trim().not().isEmpty(),
    body('productId').trim().not().isEmpty(),
    body('quantity').trim().isLength({ min: 5 }),
  ],
  CustomerController.addCart,
)

router.post(
  '/updateCart',
  [
    body('customerId').trim().not().isEmpty(),
    body('productId').trim().not().isEmpty(),
    body('cartId').trim().not().isEmpty(),
    body('quantity').trim().isLength({ min: 5 }),
  ],
  CustomerController.updateCart,
)

module.exports = router
