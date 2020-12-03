const User = require("../models/User")
const Validator = require("fastest-validator")
const v = new Validator()
const { JWT_SECRET } = process.env
const jwt = require("jsonwebtoken")
module.exports = {
  deleteUser: async (req, res) => {
    const schema = {
      id: "string|empty:false",
    }
    const { id } = req.params

    const validate = v.validate(req.params, schema)

    if (validate.length) {
      return res.status(400).json({
        status: "error",
        message: validate,
      })
    }

    let data = await User.findById(id)

    if (data == null) {
      return res.status(400).json({
        status: "error",
        message: "ID not found",
      })
    }
    await data.remove()
    return res.json({
      status: "success",
      message: "deleted successfully!",
    })
  },
  readUserByIdentityNumber: async (req, res) => {
    try {
      const schema = {
        identityNumber: "string|empty:false",
      }
      const { identityNumber } = req.body

      const validate = v.validate(req.body, schema)

      if (validate.length) {
        return res.status(400).json({
          status: "error",
          message: validate,
        })
      }

      let data = await User.findOne({ identityNumber })

      if (data == null) {
        return res.status(400).json({
          status: "error",
          message: "no user with this account number",
        })
      }

      return res.json({
        status: "success",
        data: data,
      })
    } catch (err) {
      return res.status(409).json({
        status: "error",
        message: err.message,
      })
    }
  },
  searchUserName: async (req, res) => {
    try {
      const schema = {
        userName: "string|empty:false",
      }
      const { userName } = req.query
      const validate = v.validate(req.query, schema)

      if (validate.length) {
        return res.status(400).json({
          status: "error",
          message: validate,
        })
      }

      let data = await User.findOne({ userName })

      res.json({
        status: "success",
        data: data,
      })
    } catch (err) {}
  },
}
