const File = require("../utils/file")
const Petrus = require("petrus")

const TRANSMISSION_FILE = "transmission-config"

class Transmission {
  constructor() {}

  static response(data) {
    switch (data.method) {
      case "getAll":
        data.results = File.readFile(TRANSMISSION_FILE)
        break
      case "update":
        File.writeFile(TRANSMISSION_FILE, data.params)
        data.results = File.readFile(TRANSMISSION_FILE)
        break
      case "test":
        const petrus = new Petrus(TRANSMISSION_FILE)
        petrus.transmission.sessionStats((err, result) => {
          if (err) {
            data.error = err
          } else {
            data.results = result
          }
        })
        break
      default:
        console.log(`[transmission] Unknow method : ${data.method}`)
    }
    return data
  }
}

module.exports = Transmission
