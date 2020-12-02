var express = require("express")
var router = express.Router()
const handlerLogin = require("../handler/user")
router.post("/login", handlerLogin)

module.exports = router
