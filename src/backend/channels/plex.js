const File = require("../utils/file")
const Logger = require("../utils/logger")

const Pavie = require("pavie")
const CryptoJS = require("crypto-js")

const CONFIG_FILE = "plex-config"

class Plex {
  constructor() {}

  static async getSettings(uuid) {
    const settings = await File.readFile(CONFIG_FILE)

    if (settings) {
      const bytes = CryptoJS.AES.decrypt(settings.password, uuid)
      settings.password = bytes.toString(CryptoJS.enc.Utf8)
    }

    return settings
  }

  static async response(data) {
    let pavie = null
    let settings = null
    let results = null

    switch (data.method) {
      case "getAll":
        data.results = await File.readFile(CONFIG_FILE)
        break
      case "update":
        await File.writeFile(CONFIG_FILE, data.params)
        data.results = await File.readFile(CONFIG_FILE)
        break
      case "signin":
        try {
          settings = this.getSettings(data.params.uuid)
          pavie = new Pavie(settings)
          results = await pavie.signin()

          if (results) {
            data.results = await pavie.getUser()
          }
        } catch (err) {
          Logger.error("Plex", err.message)
          data.error = err.message
        }
        break
      case "refresh":
        try {
          Logger.info("Plex", `Synchronize tb show library`)
          settings = this.getSettings(data.params.uuid)
          pavie = new Pavie(settings)
          await pavie.signin()
          data.results = await pavie.refresh()
        } catch (err) {
          Logger.error("Plex", err.message)
          data.error = err.message
        }
        break
      default:
        Logger.warn("Plex", `Unknow method : ${data.method}`)
        console.warn(`[Plex] Unknow method : ${data.method}`)
    }
    return data
  }
}

module.exports = Plex
