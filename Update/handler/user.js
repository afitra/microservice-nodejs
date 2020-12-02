const User = require("../models/User")
const Validator = require("fastest-validator")
const v = new Validator()
const { JWT_SECRET } = process.env
const jwt = require("jsonwebtoken")
module.exports = async (req, res) => {
  try {
    const schema = {
      id: "string|empty:false",
      userName: "string|empty:false",
      emailAddress: "email|empty:false",
      password: "string|min:6",
    }
    console.log(req.body)
    const validate = v.validate(req.body, schema)

    if (validate.length) {
      return res.status(400).json({
        status: "error",
        message: validate,
      })
    }
    const { userName, emailAddress, password, id } = req.body

    const token = req.headers.authorization

    var encodeToken = await jwt.verify(token, JWT_SECRET).id

    let user = await User.findOne({ _id: encodeToken })

    console.log(user)
    if (user.id != id) {
      return res.status(400).json({
        status: "error",
        message: "Error Authorized",
      })
    }

    user.userName = userName
    user.emailAddress = emailAddress
    user.password = password
    await user.save()

    res.json({
      status: "success",
      data: user,
    })
  } catch (err) {
    return res.status(409).json({
      status: "error",
      message: err.message,
    })
  }
}
