const File = require("../utils/file")
const Petrus = require("petrus")

const CONFIG_FILE = "transmission-config"

class Transmission {
  constructor() {}

  static response(data) {
    switch (data.method) {
      case "getAll":
        data.results = File.readFile(CONFIG_FILE)
        break
      case "update":
        File.writeFile(CONFIG_FILE, data.params)
        data.results = File.readFile(CONFIG_FILE)
        break
      case "test":
        const petrus = new Petrus(CONFIG_FILE)
        petrus.transmission.sessionStats((err, result) => {
          if (err) {
            data.error = err
          } else {
            data.results = result
          }
        })
        break
      default:
        console.log(`[Transmission] Unknow method : ${data.method}`)
    }
    return data
  }
}

module.exports = Transmission
