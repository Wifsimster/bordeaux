const File = require("../utils/file")

const TransmissionManager = require("transmission")

const CONFIG_FILE = "transmission-config"

class Transmission {
  constructor() {
    const settings = File.readFile(CONFIG_FILE)
    this.instance = new TransmissionManager(settings)
  }

  static async response(data) {
    const transmission = new Transmission()

    switch (data.method) {
      case "getAll":
        data.results = File.readFile(CONFIG_FILE)
        break
      case "update":
        File.writeFile(CONFIG_FILE, data.params)
        data.results = File.readFile(CONFIG_FILE)
        break
      case "add":
        data.results = await new Promise((resolve, reject) => {
          transmission.instance.addUrl(data.params.magnetLink, (err, arg) => {
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
      case "remove":
        data.results = await new Promise((resolve, reject) => {
          transmission.instance.remove(data.params.id, true, (err, arg) => {
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
      case "active":
        data.results = await new Promise((resolve, reject) => {
          transmission.instance.active((err, arg) => {
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
        data.results = await new Promise((resolve, reject) => {
          transmission.instance.sessionStats((err, arg) => {
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
