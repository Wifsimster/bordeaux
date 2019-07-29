const axios = require('axios')

const File = require('../utils/file')

const CONFIG_FILE = 'trakt-config'
const CLIENT_ID = `6c57241f02608080a10914e28c4b7df760a554ee9d387ade7dd06a308bd7748b`
const CLIENT_SECRET = `19e784eb7e88e64b9d42cce1725dfcb66214b12befa9d7c7b130b221a1207f6e`
const REDIRECT_URI = `urn:ietf:wg:oauth:2.0:oob`

class Trakt {
  constructor() {
    let settings = File.readFile(CONFIG_FILE)

    this.hostname = `https://api.trakt.tv`
    this.version = '2'

    if (!settings) {
      settings = {}
    }

    if (settings.code) {
      this.code = settings.code
    }

    if (settings.accessToken) {
      this.accessToken = settings.accessToken
    }

    this.instance = axios.create({
      baseURL: this.hostname,
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        'trakt-api-key': CLIENT_ID,
        'trakt-api-version': this.version
      }
    })
  }

  static async response(data) {
    switch (data.method) {
      case 'getAll':
        data.results = File.readFile(CONFIG_FILE)
        break
      case 'update':
        File.writeFile(CONFIG_FILE, data.params)
        data.results = File.readFile(CONFIG_FILE)
        break
      case 'getDeviceCode':
        var trakt = new Trakt()

        data.results = await trakt.instance
          .post('oauth/device/code', {
            client_id: CLIENT_ID
          })
          .then(response => {
            return response.data
          })
          .catch(err => {
            data.error = err.message
          })
        break
      case 'checkDeviceAuthorization':
        var trakt = new Trakt()

        data.results = await trakt.instance
          .post('oauth/device/token', {
            code: data.params.code,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET
          })
          .then(response => {
            return response.data
          })
          .catch(err => {
            data.error = err.message
          })
        break
      case 'getShows':
        var trakt = new Trakt()

        data.result = await trakt.instance
          .get(`calendars/my/shows/${data.params.startDate}/${data.params.days}`)
          .then(response => {
            return response.data
          })
          .catch(err => {
            data.error = err.message
          })
        break
      default:
        console.log(`[Trakt] Unknow method : ${data.method}`)
    }
    return data
  }
}

module.exports = Trakt
