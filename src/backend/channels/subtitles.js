const Yquem = require("yquem")
const File = require("../utils/file")

const CONFIG_FILE = "directory-config"

class Subtitles {
  constructor() {}

  static async response(data) {
    switch (data.method) {
      case "search":
        var settings = File.readFile(CONFIG_FILE)
        data.results = Yquem.getRecentFilesFromDirectory(settings.to, data.params.fileAge)
        break
      case "getSubtitle":
        data.results = await Yquem.getSubtitle(data.params.file).catch(err => {
          data.error = err
        })
        break
      case "hasSubtitle":
        data.results = Yquem.hasSubtitle(data.params.file).catch(err => {
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
