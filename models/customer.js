const mongoose = require('mongoose')
const Schema = mongoose.Schema

const customerSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  carts: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Products',
      },
      quantity: {
        type: Number,
        required: true,
      },
      createdAt: {
        type: Date,
      },
      updatedAt: {
        type: Date,
      },
    },
  ],
  orders: [{ type: Schema.Types.ObjectId, ref: 'Orders' }],
})

module.exports = mongoose.model('Customer', customerSchema)
