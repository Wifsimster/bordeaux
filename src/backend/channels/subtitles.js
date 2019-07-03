const Yquem = require('yquem')

class Subtitles {
  constructor() {}

  static async response(data) {
    switch (data.method) {
      case 'search':
        var yquem = new Yquem(data.params.from)
        data.results = yquem.getRecentFilesFromDirectory(data.params.from, data.params.fileAge)
        break
      case 'run':
        var yquem = new Yquem(data.params.from)
        data.results = await yquem.run().catch(err => {
          data.error = err
        })
        break
      default:
        console.log(`[subtitles] Unknow method : ${data.method}`)
    }
    return data
  }
}

module.exports = Subtitles
