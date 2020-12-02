const apiAdapter = require("../helpers/apiAdapter")
const jwt = require("jsonwebtoken")
const {
  URL_SERVICE_LOGIN,
  URL_SERVICE_REGISTER,
  JWT_SECRET,
  JWT_ACCESS_TOKEN_EXPIRED,
} = process.env
module.exports = {
  login: async (req, res) => {
    const api = apiAdapter(URL_SERVICE_LOGIN)
    try {
      const user = await api.post("/user/login", req.body)

      console.log(">>>>>> api gateway", user.data.data.id)
      const token = jwt.sign({ token: user.data.data.id }, JWT_SECRET, {
        expiresIn: JWT_ACCESS_TOKEN_EXPIRED,
      })
      return res.json({
        status: "success",
        data: {
          token,
        },
      })
    } catch (err) {
      if (err.response.data.message && err.response.status) {
        return res.status(err.response.status).json({
          status: "error",
          message: err.response.data.message,
        })
      } else {
        return res.status(409).json({
          status: "error",
          message: err.message,
        })
      }
    }
  },
  register: async (req, res) => {
    const api = apiAdapter(URL_SERVICE_REGISTER)

    try {
      const user = await api.post("/user/register", req.body)

      return res.json(user.data)
    } catch (err) {
      // console.log(err)
      if (err.response.data.message && err.response.status) {
        return res.status(err.response.status).json({
          status: "error",
          message: err.response.data.message,
        })
      } else {
        return res.status(409).json({
          status: "error",
          message: err.message,
        })
      }
    }
  },
}
