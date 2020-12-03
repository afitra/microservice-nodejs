const redis = require("redis")
const client = redis.createClient()
module.exports = {
  getCache: (key) => {
    let val = client.get(key, (err, data) => {
      if (data) {
        return data
      } else {
        throw new Error("❌ Key is required when fetch value.")
      }
    })
    return val
  },
  setCache: (key, value) => {
    return client.set(key, value)
  },
}
