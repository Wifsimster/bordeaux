const Petrus = require("petrus")
const Activity = require("./activity")

class Download {
  constructor() {}

  static async response(data) {
    switch (data.method) {
      case "searchEpisode":
        Activity.response({
          method: "add",
          params: {
            type: "info",
            object: "Download",
            message: `Searching ${data.params.title}`
          }
        })

        data.results = await Petrus.search(data.params.title).catch(err => {
          data.error = err
        })
        break
      default:
        Activity.response({
          method: "add",
          params: {
            type: "warn",
            object: "Download",
            message: `Unknow method : ${data.method}`
          }
        })

        console.log(`[Download] Unknow method : ${data.method}`)
    }
    return data
  }
}

module.exports = Download
