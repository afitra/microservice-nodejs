const express = require("express"),
  router = express.Router(),
  handlerAPiGateway = require("../handler/user"),
  verifyToken = require("../helpers/verifyToken"),
  isAdmin = require("../helpers/isAdmin")

router.post("/login", handlerAPiGateway.loginUser)
router.post("/register", handlerAPiGateway.registerUser)
router.get(
  "/account-number/",
  verifyToken,
  handlerAPiGateway.readUserByAccountNumber
)
router.get(
  "/identity-number/:identityNumber",
  verifyToken,
  handlerAPiGateway.readUserByIdentityNumber
)
router.get("/search/", verifyToken, handlerAPiGateway.searchUserName)
router.get("/all/", verifyToken, handlerAPiGateway.allUser)
router.put("/update/", verifyToken, handlerAPiGateway.updateUser)
router.delete("/delete/:id", verifyToken, isAdmin, handlerAPiGateway.deleteUser)
// handlerAPiGateway.deleteUser
module.exports = router
