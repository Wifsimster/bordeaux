const File = require("../utils/file")

const CONFIG_FILE = "plex-config"

const PlexApi = require("../classes/plex")

class Plex {
  constructor() {}

  static async response(data) {
    switch (data.method) {
      case "getAll":
        data.results = File.readFile(CONFIG_FILE)
        break
      case "update":
        File.writeFile(CONFIG_FILE, data.params)
        data.results = File.readFile(CONFIG_FILE)
        break
      case "signin":
        var plexApi = new PlexApi(File.readFile(CONFIG_FILE))
        await plexApi.signin()
        data.results = await plexApi.getUser()
        break
      default:
        console.log(`[Plex] Unknow method : ${data.method}`)
    }
    return data
  }
}

module.exports = Plex
