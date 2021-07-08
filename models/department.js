const mongoose = require('mongoose')
const Schema = mongoose.Schema

const departmentSchema = new Schema({
  deptName: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('departments', departmentSchema) //this create a order database
