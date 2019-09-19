const File = require("../utils/file")

const TransmissionManager = require("transmission")
const CryptoJS = require("crypto-js")

const CONFIG_FILE = "transmission-config"

class Transmission {
  constructor() {}

  static getSettings(uuid) {
    File.readFile(CONFIG_FILE)
      .then(settings => {
        if (settings) {
          const bytes = CryptoJS.AES.decrypt(settings.password, uuid)
          settings.password = bytes.toString(CryptoJS.enc.Utf8)
        }
        return settings
      })
      .catch(err => {
        console.error(err)
      })
  }

  static async response(data) {
    var settings = null

    switch (data.method) {
      case "getAll":
        data.results = await File.readFile(CONFIG_FILE)
        break
      case "update":
        await File.writeFile(CONFIG_FILE, data.params)
        data.results = await File.readFile(CONFIG_FILE)
        break
      case "add":
        settings = this.getSettings(data.params.uuid)

        data.results = await new Promise((resolve, reject) => {
          new TransmissionManager(settings).addUrl(
            data.params.magnetLink,
            (err, arg) => {
              if (err) {
                reject(err)
              } else {
                resolve(arg)
              }
            }
          )
        }).catch(err => {
          data.error = err
        })
        break
      case "remove":
        settings = this.getSettings(data.params.uuid)

        data.results = await new Promise((resolve, reject) => {
          new TransmissionManager(settings).remove(
            data.params.id,
            true,
            (err, arg) => {
              if (err) {
                reject(err)
              } else {
                resolve(arg)
              }
            }
          )
        }).catch(err => {
          data.error = err
        })
        break
      case "active":
        settings = this.getSettings(data.params.uuid)

        data.results = await new Promise((resolve, reject) => {
          new TransmissionManager(settings).active((err, arg) => {
            if (err) {
              reject(err)
            } else {
              resolve(arg)
            }
          })
        }).catch(err => {
          data.error = err
        })
        break
      case "sessionStats":
        settings = this.getSettings(data.params.uuid)

        data.results = await new Promise((resolve, reject) => {
          new TransmissionManager(settings).sessionStats((err, arg) => {
            if (err) {
              reject(err)
            } else {
              resolve(arg)
            }
          })
        }).catch(err => {
          data.error = err
        })
        break
      default:
        console.log(`[Transmission] Unknow method : ${data.method}`)
    }
    return data
  }
}

module.exports = Transmission
