const User = require("../models/User"),
  Validator = require("fastest-validator"),
  v = new Validator(),
  bcrypt = require("bcryptjs")
module.exports = async (req, res) => {
  try {
    const schema = {
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
    const { emailAddress, password } = req.body

    const user = await User.findOne({ emailAddress })

    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
      return res.status(404).json({
        status: "error",
        message: "user and password wrong",
      })
    }

    console.log("masokkkk", isPasswordMatch)
    res.json({
      status: "success",
      data: {
        _id: user._id,
        userName: user.userName,
        emailAddress: user.emailAddress,
        accountNumber: user.accountNumber,
        identityNumber: user.identityNumber,
        password: user.password,
      },
    })
  } catch (err) {
    return res.status(409).json({
      status: "error",
      message: err.message,
    })
  }
}
