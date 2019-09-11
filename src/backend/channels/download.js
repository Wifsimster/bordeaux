const Petrus = require("petrus")

class Download {
  constructor() {}

  static async response(data) {
    switch (data.method) {
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
