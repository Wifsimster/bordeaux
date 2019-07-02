const File = require('../utils/file')

const TRANSMISSION_FILE = 'transmission-config'

class Transmission {
  constructor(ws) {
    this.ws = ws

    this.ws.on('message', data => {
      data = JSON.parse(data)
      switch (data.method) {
        case 'getAll':
          data.results = File.readFile(TRANSMISSION_FILE)
          this.ws.send(JSON.stringify(data))
          break
        case 'update':
          File.writeFile(TRANSMISSION_FILE, data.params)
          data.results = File.readFile(TRANSMISSION_FILE)
          this.ws.send(JSON.stringify(data))
          break
        default:
          console.log(`[transmission] Unknow method : ${data.method}`)
      }
    })
  }
}

module.exports = Transmission
