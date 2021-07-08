const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId, ref: 'Products' 
    },
    customer: {
        type: Schema.Types:ObjectId, 
         ref: 'Products' 
    },
    merchant: {
        type: Schema.Types:ObjectId, 
         ref: 'merchants' 
    }
    quantity {
        type: Number,
        min: 1
    }
  },
  { timestamps: true }, //this automatically add createdAt and updatedAt timeStamp to the data
)

module.exports = mongoose.model('orders', orderSchema) //this create a order database
