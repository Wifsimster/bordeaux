const Petrus = require('petrus')

const TRANSMISSION_FILE = 'transmission-config'
const SHOWS_FILE = `shows`

const ENCODING = `utf-8`

class Download {
  constructor(ws) {
    this.ws = ws

    this.ws.on('message', async data => {
      data = JSON.parse(data)
      switch (data.method) {
        case 'addToTransmission':
          var petrus = new Petrus(config)
          var results = await petrus.addMagnetLink(data.params).catch(err => {
            data.error = err
            this.ws.send(JSON.stringify(data))
          })
          data.results = results
          this.ws.send(JSON.stringify(data))
          break
        case 'searchLatestEpisode':
          var petrus = new Petrus(config)
          var results = await petrus.getMagnetLink(data.params.title).catch(err => {
            data.error = err
            this.ws.send(JSON.stringify(data))
          })
          data.results = results
          this.ws.send(JSON.stringify(data))
          break
        case 'getShows':
          var shows = this.getDataFile()
          data.results = shows
          this.ws.send(JSON.stringify(data))
          break
        case 'run':
          var petrus = new Petrus(config)
          var results = await petrus.run(data.params.shows).catch(err => {
            data.error = err
            this.ws.send(JSON.stringify(data))
          })
          data.results = results
          this.ws.send(JSON.stringify(data))

          break
        default:
          console.log(`[download] Unknow method : ${data.method}`)
      }
    })
  }

  getDataFile() {
    var fileData = fs.readFileSync(SHOWS_FILE, { encoding: ENCODING, flag: 'a+' })

    if (fileData === '') {
      return []
    } else {
      return JSON.parse(fileData)
    }
  }
}

module.exports = Download
