require("dotenv").config()
var express = require("express")
var path = require("path")
var cookieParser = require("cookie-parser")
var logger = require("morgan")
var indexRouter = require("./routes/index")

var app = express()

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))

app.use("/user", indexRouter)
const mongoose = require("mongoose")

var dbUrl = null
if (process.env.ONLINE == "true") {
  dbUrl = process.env.MONGO_SERVER_ON
} else {
  dbUrl = process.env.MONGO_SERVER_OFF
}

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true,
  // retry to connect for 60 times
})

mongoose.connection.on("error", (err) => {
  logError(err)
})

module.exports = app
