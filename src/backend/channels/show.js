const fs = require("fs")
const axios = require("axios")

const ENCODING = `utf-8`
const SHOWS_FILE = `./shows.json`

const API_KEY = "0b07bc22f051"

const instance = axios.create({
  baseURL: `http://api.betaseries.com/`,
  timeout: 1000,
  headers: { "X-BetaSeries-Version": "3.0", "X-BetaSeries-Key": API_KEY }
})

class Show {
  constructor(ws) {
    this.ws = ws

    this.ws.on("message", async data => {
      data = JSON.parse(data)
      switch (data.method) {
        case "search":
          let results = await this.getShow(data.params.query)
          if (results.status === 200) {
            data.results = results.data.shows
            this.ws.send(JSON.stringify(data))
          } else {
            data.error = results.error
            this.ws.send(JSON.stringify(data))
          }
          break
        case "getAll":
          var shows = this.getDataFile()
          data.results = shows
          this.ws.send(JSON.stringify(data))
          break
        case "add":
          var shows = this.getDataFile()
          shows.push(data.params)
          fs.writeFileSync(SHOWS_FILE, JSON.stringify(shows), { encoding: ENCODING, flag: "w" })
          data.results = JSON.parse(fs.readFileSync(SHOWS_FILE, { encoding: ENCODING }))
          this.ws.send(JSON.stringify(data))
          break
        case "remove":
          var shows = this.getDataFile()

          shows = shows.filter(show => show.id !== data.params.id)

          fs.writeFileSync(SHOWS_FILE, JSON.stringify(shows), { encoding: ENCODING, flag: "w" })
          data.results = JSON.parse(fs.readFileSync(SHOWS_FILE, { encoding: ENCODING }))
          this.ws.send(JSON.stringify(data))
          break
        default:
          console.log(`[show] Unknow method : ${data.method}`)
      }
    })
  }

  getDataFile() {
    var fileData = fs.readFileSync(SHOWS_FILE, { encoding: ENCODING, flag: "a+" })

    if (fileData === "") {
      return []
    } else {
      return JSON.parse(fileData)
    }
  }

  getShow(title) {
    return instance.get(`shows/search?title=${title}`)
  }
}

module.exports = Show
