const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  totalProduct: {
    type: Number,
    required: true,
  },
  availableQty: {
    type: Number,
    required: true,
  },
  waranty: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  deptId: {
    type: Schema.Types.ObjectId,
    ref: 'departments',
  },
  merchantId: {
    type: Schema.Types.ObjectId,
    ref: 'merchants',
  },
})

module.exports = mongoose.model('products', productSchema) //this create a order database
