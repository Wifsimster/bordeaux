const Yquem = require("yquem")
const File = require("../utils/file")
const Activity = require("./activity")

const SUBTITLES_FILE = "subtitles-config"
const DIRECTORY_FILE = "directory-config"

class Subtitles {
  constructor() {}

  static async response(data) {
    const subtitlesSettings = await File.readFile(SUBTITLES_FILE)
    const directorySettings = await File.readFile(DIRECTORY_FILE)
    let results = null

    switch (data.method) {
      case "getAll":
        data.results = subtitlesSettings
        break
      case "update":
        await File.writeFile(SUBTITLES_FILE, data.params)
        data.results = await File.readFile(SUBTITLES_FILE)
        break
      case "search":
        Activity.response({
          method: "add",
          params: {
            type: "info",
            object: "Subtitles",
            message: `Searching subtitle on '${directorySettings.to}'`
          }
        })

        try {
          results = Yquem.getRecentFilesFromDirectory(
            directorySettings.to,
            subtitlesSettings.daysOld
          )
          if (!Array.isArray(data.results)) {
            data.error = results.message
          } else {
            data.results = results
          }
        } catch (err) {
          data.error = err.message
        }
        break
      case "getSubtitle":
        Activity.response({
          method: "add",
          params: {
            type: "info",
            object: "Subtitles",
            message: `Download subtitle for '${data.params.file}'`
          }
        })

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
        Activity.response({
          method: "add",
          params: {
            type: "warn",
            object: "Subtitles",
            message: `Unknow method : ${data.method}`
          }
        })

        console.log(`[Subtitles] Unknow method : ${data.method}`)
    }
    return data
  }
}

module.exports = Subtitles
