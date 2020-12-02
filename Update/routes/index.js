var express = require("express")
var router = express.Router()
const handler = require("../handler/user")
router.post("/register", handler)

module.exports = router
