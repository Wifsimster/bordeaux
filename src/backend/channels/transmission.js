const fs = require("fs")

const TRANSMISSION_FILE = "./transmission-config.json"

const ENCODING = `utf-8`

class Transmission {
  constructor(ws) {
    this.ws = ws

    this.ws.on("message", data => {
      data = JSON.parse(data)
      switch (data.method) {
        case "getAll":
          data.results = JSON.parse(fs.readFileSync(TRANSMISSION_FILE, { encoding: ENCODING }))
          this.ws.send(JSON.stringify(data))
          break
        case "update":
          console.log(data.params)
          fs.writeFileSync(TRANSMISSION_FILE, JSON.stringify(data.params), { encoding: ENCODING })
          data.results = JSON.parse(fs.readFileSync(TRANSMISSION_FILE, { encoding: ENCODING }))
          this.ws.send(JSON.stringify(data))
          break
        default:
          console.log(`[transmission] Unknow method : ${data.method}`)
      }
    })
  }
}

module.exports = Transmission
