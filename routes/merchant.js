const express = require('express')
const { body } = require('express-validator')
const Merchant = require('../models/merchants')
const AuthController = require('../controllers/auth')
const MerchantController = require('../controllers/merchant')
const ObjectID = require('mongodb').ObjectID
const router = express.Router()

router.post(
  '/signUp',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email')
      .custom(async (email, { req }) => {
        const userDoc = await Merchant.findOne({ email })
        if (userDoc) {
          return Promise.reject('E-mail address already exists!')
        }
      })
      .normalizeEmail(),
    body('password').trim().isLength({ min: 5 }),
    body('storeName').trim().not().isEmpty(),
    body('storePhoneNumber').trim().isLength({ min: 11 }),
  ],
  (req, res, next) => {
    AuthController.signUp(req, res, next, 'merchant')
  },
)

router.post('/logIn', (req, res, next) => {
  AuthController.logIn(req, res, next, 'merchant')
})

router.post(
  '/addProduct',
  [
    body('name').trim().not().isEmpty(),
    // I need to validate check if the amount is greater than 0
    // body('amount').trim().not().isEmpty(),
    body('description').trim().not().isEmpty(),
    body('deptId').trim().not().isEmpty(),
    body('merchantId').trim().not().isEmpty(),
  ],
  MerchantController.addProduct,
)

// I need to validate the productId here and make it required
router.put(
  '/updateProduct',
  [
    body('prodId')
      .trim()
      .not()
      .isEmpty()
      .custom((id) => {
        if (!ObjectID.isValid(id)) {
          return Promise.reject('ProductId is not valid')
        }
      }),
  ],
  MerchantController.updateProduct,
)

router.delete('/deleteProduct/:productId', MerchantController.deleteProduct)

module.exports = router
