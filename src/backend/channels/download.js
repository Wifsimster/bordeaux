const Petrus = require("petrus")
const Logger = require("../utils/logger")

class Download {
  constructor() {}

  static async response(data) {
    switch (data.method) {
      case "searchEpisode":
        try {
          Logger.info("Download", `Searching ${data.params.title}`)

          data.results = await Petrus.search(data.params.title).catch(err => {
            data.error = err
          })
        } catch (err) {
          Logger.error("Download", err.message)
          data.error = err.message
        }
        break
      default:
        Logger.warn("Download", `Unknow method : ${data.method}`)
        console.warn(`[Download] Unknow method : ${data.method}`)
    }
    return data
  }
}

module.exports = Download
