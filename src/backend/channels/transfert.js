const Medoc = require("medoc")
const File = require("../utils/file")
const Logger = require("../utils/logger")

const CONFIG_FILE = "directory-config"

class Transfert {
  constructor() {}

  static async response(data) {
    let settings
    switch (data.method) {
      case "search":
        try {
          settings = await File.readFile(CONFIG_FILE)

          Logger.info(
            "Transfert",
            `Searching new episode on '${settings.from}'`
          )

          data.results = Medoc.search(settings.from, settings.to)

          if (!Array.isArray(data.results)) {
            Logger.error("Transfert", data.results.message)
            data.error = data.results.message
          }
        } catch (err) {
          Logger.error("Transfert", err.message)
          data.error = err.message
        }

        break
      case "move":
        try {
          Logger.info("Transfert", `Moving '${data.params.episode}'`)
          data.results = await Medoc.move(data.params.episode)
        } catch (err) {
          Logger.error("Transfert", err.message)
          data.error = err.message
        }
        break
      default:
        Logger.info("Transfert", `Unknow method : ${data.method}`)
        console.log(`[Transfert] Unknow method : ${data.method}`)
    }
    return data
  }
}

module.exports = Transfert
