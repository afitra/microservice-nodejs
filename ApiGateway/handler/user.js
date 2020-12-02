const apiAdapter = require("../helpers/apiAdapter")
const jwt = require("jsonwebtoken")
const {
  URL_SERVICE_REGISTER,
  URL_SERVICE_READ,
  URL_SERVICE_UPDATE,
  URL_SERVICE_DELETE,
  URL_SERVICE_LOGIN,
  JWT_SECRET,
  JWT_ACCESS_TOKEN_EXPIRED,
  REDIS_KEY,
} = process.env
const { setCache, getCache } = require("../helpers/redisHelper")
module.exports = {
  loginUser: async (req, res) => {
    const api = await apiAdapter(URL_SERVICE_LOGIN)
    try {
      const user = await api.post("/user/login", req.body)

      const token = jwt.sign({ id: user.data.data.id }, JWT_SECRET, {
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
  registerUser: async (req, res) => {
    const api = await apiAdapter(URL_SERVICE_REGISTER)

    try {
      const user = await api.post("/user/register", req.body)

      return res.json(user.data)
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

  readUserByAccountNumber: async (req, res) => {
    try {
      const api = await apiAdapter(URL_SERVICE_READ)

      const user = await api.get("/user/account-number/", {
        headers: { authorization: req.headers.authorization },
        data: req.body,
      })

      return res.json({
        status: "success",
        data: {
          id: user.data.data._id,
          emailAddress: user.data.data.emailAddress,
          accountNumber: user.data.data.accountNumber,
          identityNumber: user.data.data.identityNumber,
          userName: user.data.data.userName,
          role: user.data.data.role,
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
  readUserByIdentityNumber: async (req, res) => {
    try {
      const api = await apiAdapter(URL_SERVICE_READ)
      const user = await api.get(
        `/user/identity-number/${req.params.identityNumber}`,
        {
          headers: { authorization: req.headers.authorization },

          data: req.body,
        }
      )
      console.log(user)
      return res.json({
        status: "success",
        data: {
          id: user.data.data._id,
          emailAddress: user.data.data.emailAddress,
          accountNumber: user.data.data.accountNumber,
          identityNumber: user.data.data.identityNumber,
          userName: user.data.data.userName,
          role: user.data.data.role,
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
  searchUserName: async (req, res) => {
    try {
      const api = await apiAdapter(URL_SERVICE_READ)
      const user = await api.get(`/user/search/`, {
        headers: { authorization: req.headers.authorization },
        params: { userName: req.query.userName },
        data: req.body,
      })
      return res.json({
        status: "success",
        data: {
          id: user.data.data._id,
          emailAddress: user.data.data.emailAddress,
          accountNumber: user.data.data.accountNumber,
          identityNumber: user.data.data.identityNumber,
          userName: user.data.data.userName,
          role: user.data.data.role,
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
  allUser: async (req, res) => {
    try {
      // var set = await setCache("sdsd", "ini jaman sd")
      // console.log("tahabp satuuuuu")
      // client.get("sdsd").then((data) => {
      //   console.log(">>>>>", data)
      // })
      // console.log(temp)
      // if (temp) {
      //   return res.json({
      //     status: "success",
      //     data: temp,
      //   })
      // }

      console.log("lanjut   >>>>   ", temp)
      const api = await apiAdapter(URL_SERVICE_READ)
      console.log("Ooko")
      const user = await api.get(`/user/all`, {
        headers: { authorization: req.headers.authorization },
      })
      console.log(user.data.data)
      return res.json({
        status: "success",
        data: user.data.data,
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
  updateUser: async (req, res) => {
    const api = await apiAdapter(URL_SERVICE_UPDATE)

    try {
      console.log("masokk gateway")
      const user = await api.put("/user/update", req.body, {
        headers: { authorization: req.headers.authorization },
      })
      console.log(user.data)
      return res.json({
        status: "success",
        data: {
          userName: user.data.data.userName,
          emailAddress: user.data.data.emailAddress,
          password: user.data.data.password,
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
  deleteUser: async (req, res) => {
    try {
      console.log("masokk delete gateway", req.params.id)
      const api = await apiAdapter(URL_SERVICE_DELETE)
      const user = await api.delete(`/user/delete/${req.params.id}`, {
        headers: { authorization: req.headers.authorization },
      })
      console.log(user.data)
      return res.json({
        status: "success",
        message: user.data.message,
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
}
