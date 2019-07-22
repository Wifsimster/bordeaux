const axios = require("axios")
const File = require("../utils/file")

const SHOWS_FILE = `shows`
const API_KEY = "0b07bc22f051"

const instance = axios.create({
  baseURL: `http://api.betaseries.com/`,
  timeout: 1000,
  headers: { "X-BetaSeries-Version": "3.0", "X-BetaSeries-Key": API_KEY }
})

class Show {
  constructor() {}

  static async response(data) {
    switch (data.method) {
      case "search":
        let results = await instance.get(`shows/search?title=${data.params.query}`).catch(err => {
          console.error(err)
        })

        if (results.status === 200) {
          data.results = results.data.shows
        } else {
          data.error = results.error
        }

        break
      case "getAll":
        data.results = File.readFile(SHOWS_FILE)
        break
      case "add":
        var shows = File.readFile(SHOWS_FILE)

        let exist = shows.filter(show => {
          if (data.params.id === show.id) {
            return true
          }
        })

        if (exist.length > 0) {
          data.error = "Show already exist !"
        } else {
          shows.push(data.params)
          File.writeFile(SHOWS_FILE, shows)
          data.results = File.readFile(SHOWS_FILE)
        }
        break
      case "remove":
        var shows = File.readFile(SHOWS_FILE)

        shows = shows.filter(show => show.id !== data.params.id)

        File.writeFile(SHOWS_FILE, shows)

        data.results = File.readFile(SHOWS_FILE)
        break
      default:
        console.log(`[show] Unknow method : ${data.method}`)
    }
    return data
  }
}

module.exports = Show
