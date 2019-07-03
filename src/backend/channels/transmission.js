const File = require('../utils/file')

const TRANSMISSION_FILE = 'transmission-config'

class Transmission {
  constructor() {}

  static response(data) {
    switch (data.method) {
      case 'getAll':
        data.results = File.readFile(TRANSMISSION_FILE)
        break
      case 'update':
        File.writeFile(TRANSMISSION_FILE, data.params)
        data.results = File.readFile(TRANSMISSION_FILE)
        break
      default:
        console.log(`[transmission] Unknow method : ${data.method}`)
    }
    return data
  }
}

module.exports = Transmission
