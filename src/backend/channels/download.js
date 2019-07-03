const Petrus = require('petrus')
const File = require('../utils/file')

const SHOWS_FILE = `shows`

class Download {
  constructor() {}

  static async response(data) {
    switch (data.method) {
      case 'addToTransmission':
        var petrus = new Petrus(config)
        var results = await petrus.addMagnetLink(data.params).catch(err => {
          data.error = err
        })
        data.results = results
        break
      case 'searchLatestEpisode':
        var petrus = new Petrus(config)
        var results = await petrus.getMagnetLink(data.params.title).catch(err => {
          data.error = err
        })
        data.results = results
        break
      case 'getShows':
        data.results = File.readFile(SHOWS_FILE)
        break
      case 'run':
        var petrus = new Petrus(config)
        var results = await petrus.run(data.params.shows).catch(err => {
          data.error = err
        })
        data.results = results
        break
      default:
        console.log(`[download] Unknow method : ${data.method}`)
    }
    return data
  }
}

module.exports = Download
