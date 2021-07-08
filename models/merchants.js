const mongoose = require('mongoose')
const Schema = mongoose.Schema

const merchantSchema = new Schema(
  {
    storeName: {
      type: String,
      required: true,
    },
    storePhoneNumber: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    storeEmail: {
      type: String,
      required: true,
    },
    storeDescription: {
      type: String,
    },
    verified: {
      type: Boolean,
    },
    activated: {
      type: Boolean,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Products',
      },
    ],
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Orders',
      },
    ],
  },
  { timestamps: true },
)

module.exports = mongoose.model('merchants', merchantSchema) //this create a order database
