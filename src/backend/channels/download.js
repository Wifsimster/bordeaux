const Petrus = require("petrus")
const fs = require("fs")

const config = require("../../../transmission-config")

const ENCODING = `utf-8`
const SHOWS_FILE = `./shows.txt`

class Download {
  constructor(ws) {
    this.ws = ws

    this.ws.on("message", data => {
      data = JSON.parse(data)
      switch (data.method) {
        case "getShows":
          data.results = fs.readFileSync(SHOWS_FILE, { encoding: ENCODING })
          this.ws.send(JSON.stringify(data))
          break
        case "updateShows":
          fs.writeFileSync(SHOWS_FILE, data.params, { encoding: ENCODING })
          data.results = fs.readFileSync(SHOWS_FILE, { encoding: ENCODING })
          this.ws.send(JSON.stringify(data))
          break
        case "run":
          var petrus = new Petrus(config)
          petrus
            .run(data.params.shows)
            .then(results => {
              data.results = results
              this.ws.send(JSON.stringify(data))
            })
            .catch(err => {
              console.error(err)
              data.error = err
              this.ws.send(JSON.stringify(data))
            })
          break
        default:
          console.log(`[download] Unknow method : ${data.method}`)
      }
    })
  }
}

module.exports = Download
