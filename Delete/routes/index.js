var express = require("express")
var router = express.Router()
const handlerDelete = require("../handler/user")
router.delete("/delete/:id", handlerDelete.deleteUser)

module.exports = router
