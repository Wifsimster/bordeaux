const File = require("../utils/file")

const CONFIG_FILE = "plex-config"

const Pavie = require("pavie")

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
        var pavie = new Pavie(File.readFile(CONFIG_FILE))
        await pavie.signin()
        data.results = await pavie.getUser()
        break
      case "refresh":
        var pavie = new Pavie(File.readFile(CONFIG_FILE))
        await pavie.signin()
        data.results = await pavie.refresh()
        break
      default:
        console.log(`[Plex] Unknow method : ${data.method}`)
    }
    return data
  }
}

module.exports = Plex
