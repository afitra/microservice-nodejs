const jwt = require("jsonwebtoken")
const apiAdapter = require("../helpers/apiAdapter")
const { URL_SERVICE_READ, JWT_SECRET } = process.env

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    var id = await jwt.verify(token, JWT_SECRET).id

    const api = await apiAdapter(URL_SERVICE_READ)

    const user = await api.get(`/user/${id}`, {
      headers: { authorization: req.headers.authorization },
    })

    if (user.data.data.role != "admin") {
      return res.status(403).json({
        status: "error",
        message: "error User role, only admin role can delete",
      })
    }

    return next()
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
}
