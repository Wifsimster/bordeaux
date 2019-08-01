const Petrus = require("petrus")

const CONFIG_FILE = "transmission-config"

class Download {
  constructor() {}

  static async response(data) {
    switch (data.method) {
      case "addToTransmission":
        const petrus = new Petrus(CONFIG_FILE)

        if (data.params.magnetLink) {
          data.results = await petrus.addMagnetLink(data.params.magnetLink).catch(err => {
            data.error = err
          })
        } else {
          data.error = `No magnet link found !`
        }

        break
      case "searchEpisode":
        data.results = await Petrus.search(data.params.title).catch(err => {
          data.error = err
        })
        break
      default:
        console.log(`[Download] Unknow method : ${data.method}`)
    }
    return data
  }
}

module.exports = Download
