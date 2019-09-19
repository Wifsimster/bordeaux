const Medoc = require("medoc")
const File = require("../utils/file")

const CONFIG_FILE = "directory-config"

class Transfert {
  constructor() {}

  static async response(data) {
    let settings
    switch (data.method) {
      case "search":
        settings = await File.readFile(CONFIG_FILE)
        data.results = Medoc.search(settings.from, settings.to)
        if (!Array.isArray(data.results)) {
          data.error = data.results.message
        }
        break
      case "move":
        data.results = await Medoc.move(data.params.episode)
        break
      default:
        console.log(`[Transfert] Unknow method : ${data.method}`)
    }
    return data
  }
}

module.exports = Transfert
