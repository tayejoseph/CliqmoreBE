const Department = require('../models/department')
const Admin = require('../models/admin')

// Study error code
exports.altDept = async (req, res, next) => {
  const { deptName, action, deptId, userId } = req.body
  let message, status, response
  try {
    const haveAccess = await Admin.findById(userId)

    if (!haveAccess) {
      const error = new Error('Not authorized!')
      error.statusCode = 403
      throw error
    }

    const deptData =
      (await Department.findById(deptId)) ||
      (await Department.findOne({ deptName }))

    if (action === 'add') {
      if (!deptData) {
        const newDeptData = new Department({
          deptName,
        })
        await newDeptData.save()
        status = 201
        message = 'Succesfully added Department'
      } else {
        const error = new Error(`Department ${deptName} already exists`)
        error.statusCode = 404
        throw error
      }
    } else {
      if (!deptData) {
        const error = new Error('Could not find Deparment.')
        error.statusCode = 404
        throw error
      }
      if (action === 'update') {
        deptData.deptName = deptName
        await deptData.save()
        message = 'Succesfully updated Department'
      } else {
        deptData.remove()
        await deptData.save()
        message = 'Succesfully deleted Department'
      }
    }
    const departments = await Department.find()
    res.status(status || 200).json({
      message,
      departments,
    })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}
