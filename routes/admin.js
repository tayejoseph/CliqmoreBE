const express = require('express')
const { body } = require('express-validator')
const Admin = require('../models/admin')
const AuthController = require('../controllers/auth')
const DeptController = require('../controllers/department')
const AdminController = require('../controllers/admin')

const router = express.Router()

router.post(
  '/signUp',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email')
      .custom(async (email, { req }) => {
        const userDoc = await Admin.findOne({ email })
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
    AuthController.signUp(req, res, next, 'admin')
  },
)

router.post('/logIn', (req, res, next) => {
  AuthController.logIn(req, res, next, 'admin')
})

router.post('/altDept', DeptController.altDept)

router.get('/merchant/:merchantId', AdminController.getMerchant)

router.get('/merchants', AdminController.getMerchants)

module.exports = router
