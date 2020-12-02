var express = require("express")
var router = express.Router()
const handler = require("../handler/user")
router.post("/login", handler)

module.exports = router
