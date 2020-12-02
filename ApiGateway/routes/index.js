const express = require("express"),
  router = express.Router(),
  handler = require("../handler/user")

router.post("/login", handler.login)
router.post("/register", handler.register)

module.exports = router
