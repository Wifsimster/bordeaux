const File = require("../utils/file")

const Pavie = require("pavie")
const CryptoJS = require("crypto-js")

const CONFIG_FILE = "plex-config"

class Plex {
  constructor() {}

  static getSettings(uuid) {
    const settings = File.readFile(CONFIG_FILE)
    if (settings) {
      const bytes = CryptoJS.AES.decrypt(settings.password, uuid)
      settings.password = bytes.toString(CryptoJS.enc.Utf8)
    }
    return settings
  }

  static async response(data) {
    var pavie = null
    var settings = null
    let results = null

    switch (data.method) {
      case "getAll":
        data.results = File.readFile(CONFIG_FILE)
        break
      case "update":
        File.writeFile(CONFIG_FILE, data.params)
        data.results = File.readFile(CONFIG_FILE)
        break
      case "signin":
        settings = this.getSettings(data.params.uuid)

        try {
          pavie = new Pavie(settings)
          results = await pavie.signin()

          if (results) {
            data.results = await pavie.getUser()
          }
        } catch (err) {
          console.warn(err.message)
          data.error = err.message
        }

        break
      case "refresh":
        settings = this.getSettings(data.params.uuid)
        pavie = new Pavie(settings)
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
