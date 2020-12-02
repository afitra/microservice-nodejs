// ○ User data : Id, userName, accountNumber, emailAddress, identityNumber
// ● Protect the A

const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const shortid = require("shortid")
var uniqueValidator = require("mongoose-unique-validator")
const usersSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  accountNumber: {
    type: String,
    required: true,
    default: shortid.generate(),
  },

  emailAddress: {
    type: String,
    required: true,
    unique: true,
  },
  identityNumber: {
    type: String,
    required: true,
    default: shortid.generate(),
  },
  password: {
    type: String,
    required: true,
  },
})

usersSchema.plugin(uniqueValidator, { type: "mongoose-unique-validator" })
usersSchema.pre("save", async function (next) {
  const user = this
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8)
  }
})
module.exports = mongoose.model("Users", usersSchema)
