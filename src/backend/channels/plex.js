const File = require("../utils/file")
const Activity = require("./activity")

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
        Activity.response({
          method: "add",
          params: {
            type: "info",
            object: "Plex",
            message: `Synchronize tb show library`
          }
        })

        settings = this.getSettings(data.params.uuid)
        pavie = new Pavie(settings)
        await pavie.signin()
        data.results = await pavie.refresh()
        break
      default:
        Activity.response({
          method: "add",
          params: {
            type: "warn",
            object: "Plex",
            message: `Unknow method : ${data.method}`
          }
        })

        console.log(`[Plex] Unknow method : ${data.method}`)
    }
    return data
  }
}

module.exports = Plex
