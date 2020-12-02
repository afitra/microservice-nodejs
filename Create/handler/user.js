const User = require("../models/User")
const Validator = require("fastest-validator")
const v = new Validator()

module.exports = async (req, res) => {
  try {
    const schema = {
      userName: "string|empty:false",
      //   accountNumber: "string|empty:false",
      emailAddress: "email|empty:false",
      //   identityNumber: "string|empty:false",
      password: "string|min:6",
    }

    const validate = v.validate(req.body, schema)

    if (validate.length) {
      return res.status(400).json({
        status: "error",
        message: validate,
      })
    }
    const { userName, emailAddress, password } = req.body

    const createdUser = await User.create({
      userName,

      emailAddress,
      password,
    })

    res.json({
      status: "success",
      data: {
        id: createdUser.id,
      },
    })
  } catch (err) {
    console.log("errr", err.message)
    return res.status(409).json({
      status: "error",
      message: err.message,
    })
  }
}
