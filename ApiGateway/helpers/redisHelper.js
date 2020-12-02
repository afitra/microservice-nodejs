const redis = require("redis")
const client = redis.createClient()
module.exports = {
  getCache: async (key) => {
    let val = await client.get(key, (err, data) => {
      if (data) {
        console.log("ini daa", data)
        return data
      } else {
        throw new Error("❌ Key is required when fetch value.")
      }
    })
    return val
  },
  setCache: async (key, value) => {
    console.log(" ok satuuu")
    return await client.set(key, value)
  },
}
