const File = require('../utils/file')

const TransmissionManager = require('transmission')

const CONFIG_FILE = 'transmission-config'

class Transmission {
  constructor() {
    this.instance = new TransmissionManager(CONFIG_FILE)
  }

  static async response(data) {
    const transmission = new Transmission()

    switch (data.method) {
      case 'getAll':
        data.results = File.readFile(CONFIG_FILE)
        break
      case 'update':
        File.writeFile(CONFIG_FILE, data.params)
        data.results = File.readFile(CONFIG_FILE)
        break
      case 'add':
        data.results = await new Promise((resolve, reject) => {
          transmission.instance.addUrl(magnetLink, (err, arg) => {
            if (err) {
              data.error = err
            } else {
              data.results = arg
            }
          })
        }).catch(err => {
          data.error = err
        })
        break
      case 'sessionStats':
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
