var express = require("express")
var router = express.Router()
const handlerRead = require("../handler/user")
router.get("/account-number", handlerRead.readUserByAccountNumber)

router.get("/identity-number/:id", handlerRead.readUserByIdentityNumber)
router.get("/search/?", handlerRead.searchUserName)
router.get("/all", handlerRead.allUser)
router.get("/:id", handlerRead.getById)

module.exports = router
