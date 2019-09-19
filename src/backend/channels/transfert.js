const Medoc = require("medoc")
const File = require("../utils/file")
const Activity = require("./activity")

const CONFIG_FILE = "directory-config"

class Transfert {
  constructor() {}

  static async response(data) {
    let settings
    switch (data.method) {
      case "search":
        settings = await File.readFile(CONFIG_FILE)

        Activity.response({
          method: "add",
          params: {
            type: "info",
            object: "Transfert",
            message: `Searching new episode on '${settings.from}'`
          }
        })

        data.results = Medoc.search(settings.from, settings.to)

        if (!Array.isArray(data.results)) {
          data.error = data.results.message
        }

        break
      case "move":
        Activity.response({
          method: "add",
          params: {
            type: "info",
            object: "Transfert",
            message: `Moving '${data.params.episode}'`
          }
        })

        data.results = await Medoc.move(data.params.episode)
        break
      default:
        Activity.response({
          method: "add",
          params: {
            type: "warn",
            object: "Transfert",
            message: `Unknow method : ${data.method}`
          }
        })
        console.log(`[Transfert] Unknow method : ${data.method}`)
    }
    return data
  }
}

module.exports = Transfert
