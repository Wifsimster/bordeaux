const axios = require('axios')
const File = require('../utils/file')

const SHOWS_FILE = `shows`
const API_KEY = '0b07bc22f051'

const instance = axios.create({
  baseURL: `http://api.betaseries.com/`,
  timeout: 1000,
  headers: { 'X-BetaSeries-Version': '3.0', 'X-BetaSeries-Key': API_KEY }
})

class Show {
  constructor(ws) {
    this.ws = ws

    this.ws.on('message', async data => {
      data = JSON.parse(data)
      switch (data.method) {
        case 'search':
          let results = await this.getShow(data.params.query)
          if (results.status === 200) {
            data.results = results.data.shows
            this.ws.send(JSON.stringify(data))
          } else {
            data.error = results.error
            this.ws.send(JSON.stringify(data))
          }
          break
        case 'getAll':
          data.results = File.readFile(SHOWS_FILE)
          this.ws.send(JSON.stringify(data))
          break
        case 'add':
          var shows = File.readFile(SHOWS_FILE)

          shows.push(data.params)

          File.writeFile(SHOWS_FILE, shows)

          data.results = File.readFile(SHOWS_FILE)
          this.ws.send(JSON.stringify(data))
          break
        case 'remove':
          var shows = File.readFile(SHOWS_FILE)

          shows = shows.filter(show => show.id !== data.params.id)

          File.writeFile(SHOWS_FILE, shows)

          data.results = File.readFile(SHOWS_FILE)
          this.ws.send(JSON.stringify(data))
          break
        default:
          console.log(`[show] Unknow method : ${data.method}`)
      }
    })
  }

  getShow(title) {
    return instance.get(`shows/search?title=${title}`)
  }
}

module.exports = Show
