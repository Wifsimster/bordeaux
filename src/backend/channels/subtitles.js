const Yquem = require("yquem")
const File = require("../utils/file")

const CONFIG_FILE = "directory-config"

class Subtitles {
  constructor() {}

  static async response(data) {
    switch (data.method) {
      case "search":
        var settings = File.readFile(CONFIG_FILE)
        var yquem = new Yquem(settings.from, data.params.fileAge)
        data.results = yquem.getRecentFilesFromDirectory()
        break
      case "run":
        var settings = File.readFile(CONFIG_FILE)
        var yquem = new Yquem(settings.from)
        data.results = await yquem.run().catch(err => {
          data.error = err
        })
        break
      default:
        console.log(`[Subtitles] Unknow method : ${data.method}`)
    }
    return data
  }
}

module.exports = Subtitles
