const Medoc = require("medoc")
const File = require("../utils/file")

const CONFIG_FILE = "directory-config"

class Transfert {
  constructor() {}

  static async response(data) {
    switch (data.method) {
      case "search":
        var settings = File.readFile(CONFIG_FILE)
        data.results = Medoc.search(settings.from, settings.to)
        break
      case "move":
        data.results = Medoc.move(data.params.episode)
        break
      case "run":
        var settings = File.readFile(CONFIG_FILE)
        var medoc = new Medoc(settings.from, settings.to)
        data.results = await medoc.run().catch(err => {
          data.error = err
        })
        break
      default:
        console.log(`[Transfert] Unknow method : ${data.method}`)
    }
    return data
  }
}

module.exports = Transfert
