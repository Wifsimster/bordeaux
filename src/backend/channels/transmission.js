const File = require('../utils/file')

const Logger = require('../utils/logger')
const TransmissionManager = require('transmission')
const CryptoJS = require('crypto-js')

const CONFIG_FILE = 'transmission-config'

class Transmission {
  constructor() {}

  static async getSettings(uuid) {
    try {
      const settings = await File.readFile(CONFIG_FILE)

      if (settings) {
        const bytes = CryptoJS.AES.decrypt(settings.password, uuid)
        settings.password = bytes.toString(CryptoJS.enc.Utf8)
      }

      return settings
    } catch (err) {
      Logger.error('Transmission', err.message)
      throw new Error(err)
    }
  }

  static async response(data) {
    let settings

    switch (data.method) {
    case 'getAll':
      data.results = await File.readFile(CONFIG_FILE)
      break
    case 'update':
      await File.writeFile(CONFIG_FILE, data.params)
      data.results = await File.readFile(CONFIG_FILE)
      break
    case 'add':
      try {
        settings = await this.getSettings(data.params.uuid)
        data.results = await new Promise((resolve, reject) => {
          new TransmissionManager(settings).addUrl(data.params.magnetLink, (err, arg) => {
            if (err) {
              reject(err)
            } else {
              resolve(arg)
            }
          })
        }).catch(err => {
          data.error = err
        })
      } catch (err) {
        Logger.error('Transmission', err.message)
        throw new Error(err)
      }
      break
    case 'remove':
      try {
        settings = await this.getSettings(data.params.uuid)
        data.results = await new Promise((resolve, reject) => {
          new TransmissionManager(settings).remove(data.params.id, true, (err, arg) => {
            if (err) {
              reject(err)
            } else {
              resolve(arg)
            }
          })
        }).catch(err => {
          data.error = err
        })
      } catch (err) {
        Logger.error('Transmission', err.message)
        throw new Error(err)
      }
      break
    case 'active':
      try {
        settings = await this.getSettings(data.params.uuid)
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
      } catch (err) {
        Logger.error('Transmission', err.message)
        throw new Error(err)
      }
      break
    case 'sessionStats':
      try {
        settings = await this.getSettings(data.params.uuid)
        data.results = await new Promise((resolve, reject) => {
          new TransmissionManager(settings).sessionStats((err, arg) => {
            if (err) {
              reject(err)
            } else {
              resolve(arg)
            }
          })
        }).catch(err => {
          Logger.error('Transmission', err.message)
          data.error = err.message
        })
      } catch (err) {
        Logger.error('Transmission', err.message)
        data.error = err.message
      }
      break
    default:
      Logger.warn('Transmission', `Unknow method : ${data.method}`)
    }
    return data
  }
}

module.exports = Transmission
