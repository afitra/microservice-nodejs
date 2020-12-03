const User = require("../models/User")
const Validator = require("fastest-validator")
const v = new Validator()
const shortid = require("shortid")
module.exports = async (req, res) => {
  try {
    const schema = {
      userName: "string|empty:false",
      emailAddress: "email|empty:false",

      password: "string|min:6",
    }

    const validate = v.validate(req.body, schema)

    if (validate.length) {
      return res.status(400).json({
        status: "error",
        message: validate,
      })
    }
    const { userName, emailAddress, password, role } = req.body

    const createdUser = await User.create({
      userName,
      accountNumber: shortid.generate(),
      identityNumber: shortid.generate(),
      emailAddress,
      password,
      role,
    })

    res.json({
      status: "success",
      data: {
        id: createdUser.id,
      },
    })
  } catch (err) {
    return res.status(409).json({
      status: "error",
      message: err.message,
    })
  }
}
