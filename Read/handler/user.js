const User = require("../models/User")
const Validator = require("fastest-validator")
const v = new Validator()
const { JWT_SECRET } = process.env
const jwt = require("jsonwebtoken")
module.exports = {
  allUser: async (req, res) => {
    console.log("masukk alll")
    try {
      let users = await User.find({ role: "user" })
      console.log(users)
      return res.json({
        status: "success",
        data: users,
      })
    } catch (err) {
      return res.status(409).json({
        status: "error",
        message: err.message,
      })
    }
  },
  getById: async (req, res) => {
    try {
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
          message: "no user with this account number",
        })
      }
      res.json({
        status: "success",
        data: data,
      })
    } catch (err) {}
  },
  readUserByAccountNumber: async (req, res) => {
    try {
      const schema = {
        accountNumber: "string|empty:false",
      }
      const { accountNumber } = req.body

      const validate = v.validate(req.body, schema)

      if (validate.length) {
        return res.status(400).json({
          status: "error",
          message: validate,
        })
      }

      let data = await User.findOne({ accountNumber })

      if (data == null) {
        return res.status(400).json({
          status: "error",
          message: "no user with this account number",
        })
      }

      res.json({
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

      res.json({
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
      console.log(">>>>>", userName)
      let data = await User.findOne({ userName })
      console.log(data)
      res.json({
        status: "success",
        data: data,
      })
    } catch (err) {}
  },
}
