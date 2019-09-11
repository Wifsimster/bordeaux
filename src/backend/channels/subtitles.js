const Yquem = require("yquem")
const File = require("../utils/file")

const SUBTITLES_FILE = "subtitles-config"
const DIRECTORY_FILE = "directory-config"

class Subtitles {
  constructor() {}

  static async response(data) {
    switch (data.method) {
      case "getAll":
        data.results = File.readFile(SUBTITLES_FILE)
        break
      case "update":
        File.writeFile(SUBTITLES_FILE, data.params)
        data.results = File.readFile(SUBTITLES_FILE)
        break
      case "search":
        var settings = File.readFile(DIRECTORY_FILE)
        data.results = Yquem.getRecentFilesFromDirectory(
          settings.to,
          data.params.fileAge
        )
        break
      case "getSubtitle":
        data.results = await Yquem.getSubtitle(data.params.file).catch(err => {
          data.error = err
        })
        break
      case "hasSubtitle":
        data.results = Yquem.hasSubtitle(data.params.file)
        break
      default:
        console.log(`[Subtitles] Unknow method : ${data.method}`)
    }
    return data
  }
}

module.exports = Subtitles
