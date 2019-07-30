const Petrus = require('petrus')

class Download {
  constructor() {}

  static async response(data) {
    switch (data.method) {
      case 'addToTransmission':
        var petrus = new Petrus(data.params.settings)
        var results = await petrus.addMagnetLink(data.params.magnetLink).catch(err => {
          data.error = err
        })
        data.results = results
        break
      case 'searchLatestEpisode':
        data.results = await Petrus.getBestEpisode(data.params.title).catch(err => {
          data.error = err
        })
        break
      case 'run':
        var petrus = new Petrus(config)
        var results = await petrus.run(data.params.shows).catch(err => {
          data.error = err
        })
        data.results = results
        break
      default:
        console.log(`[Download] Unknow method : ${data.method}`)
    }
    return data
  }
}

module.exports = Download
