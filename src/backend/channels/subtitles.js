const Yquem = require('yquem')
const File = require('../utils/file')
const Logger = require('../utils/logger')

const SUBTITLES_FILE = 'subtitles-config'
const DIRECTORY_FILE = 'directory-config'

class Subtitles {
  constructor() {}

  static async response(data) {
    const subtitlesSettings = await File.readFile(SUBTITLES_FILE)
    const directorySettings = await File.readFile(DIRECTORY_FILE)
    let results = null

    switch (data.method) {
    case 'getAll':
      data.results = subtitlesSettings
      break
    case 'update':
      await File.writeFile(SUBTITLES_FILE, data.params)
      data.results = await File.readFile(SUBTITLES_FILE)
      break
    case 'search':
      try {
        Logger.info(
          'Subtitles',
          `Searching subtitle on '${directorySettings.to}'`
        )

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
        Logger.error('Subtitles', err.message)
        data.error = err.message
      }
      break
    case 'getSubtitle':
      try {
        Logger.info(
          'Subtitles',
          `Download subtitle for '${data.params.file}'`
        )

        data.results = await Yquem.getSubtitle(data.params.file, {
          languages: subtitlesSettings.languages
        }).catch(err => {
          Logger.error('Subtitles', `${err.message}`)
          data.error = err
        })
      } catch (err) {
        Logger.error('Subtitles', `${err.message}`)
        data.error = err.message
      }
      break
    case 'hasSubtitle':
      try {
        data.results = Yquem.hasSubtitle(data.params.file, {
          languages: subtitlesSettings.languages
        })
      } catch (err) {
        Logger.error('Subtitles', err.message)
        data.error = err.message
      }
      break
    default:
      Logger.warn('Subtitles', `Unknow method : ${data.method}`)
      console.warn(`[Subtitles] Unknow method : ${data.method}`)
    }
    return data
  }
}

module.exports = Subtitles
