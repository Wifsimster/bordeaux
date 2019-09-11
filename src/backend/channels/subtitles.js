const Yquem = require("yquem")
const File = require("../utils/file")

const SUBTITLES_FILE = "subtitles-config"
const DIRECTORY_FILE = "directory-config"

class Subtitles {
  constructor() {}

  static async response(data) {
    const subtitlesSettings = File.readFile(SUBTITLES_FILE)
    const directorySettings = File.readFile(DIRECTORY_FILE)

    switch (data.method) {
      case "getAll":
        data.results = subtitlesSettings
        break
      case "update":
        File.writeFile(SUBTITLES_FILE, data.params)
        data.results = File.readFile(SUBTITLES_FILE)
        break
      case "search":
        data.results = Yquem.getRecentFilesFromDirectory(
          directorySettings.to,
          subtitlesSettings.daysOld
        )
        break
      case "getSubtitle":
        data.results = await Yquem.getSubtitle(data.params.file, {
          languages: subtitlesSettings.languages
        }).catch(err => {
          data.error = err
        })
        break
      case "hasSubtitle":
        data.results = Yquem.hasSubtitle(data.params.file, {
          languages: subtitlesSettings.languages
        })
        break
      default:
        console.log(`[Subtitles] Unknow method : ${data.method}`)
    }
    return data
  }
}

module.exports = Subtitles
