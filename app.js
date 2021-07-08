const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const merchantRoutes = require('./routes/merchant')
const customerRoutes = require('./routes/customer')
const adminRoutes = require('./routes/admin')
const generalRoutes = require('./routes/general')

const app = express()

app.use(bodyParser.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE',
  )
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

app.use('/', generalRoutes)

// app.use('/merchant', merchantRoutes)
app.use('/customer', customerRoutes)
app.use('/merchant', merchantRoutes)
app.use('/admin', adminRoutes)

// app.use("/general")
// app.use("/checkout")

// Error handler
app.use((error, req, res, next) => {
  const { statusCode: status = 500, message, data } = error
  res.status(status).json({ message, data })
})

mongoose
  .connect(
    'mongodb://Testing:CblQ9Jzv5loCdN50@cluster0-shard-00-00.gjnfk.mongodb.net:27017,cluster0-shard-00-01.gjnfk.mongodb.net:27017,cluster0-shard-00-02.gjnfk.mongodb.net:27017/messages?replicaSet=atlas-i8qrvh-shard-0&ssl=true&authSource=admin',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
  )
  .then(() => {
    const server = app.listen(8080)
  })
  .catch((err) => {
    console.log(err)
  })
