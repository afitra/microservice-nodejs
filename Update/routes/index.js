var express = require("express")
var router = express.Router()
const handlerUpdate = require("../handler/user")
router.put("/update", handlerUpdate)

module.exports = router
