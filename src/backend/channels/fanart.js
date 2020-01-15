const axios = require('axios')

const API_KEY = 'cec34ee6ab9fbc9c745fddb50c23bd68 '

class Fanart {
  constructor() {
    this.hostname = 'http://webservice.fanart.tv/v3'

    this.instance = axios.create({
      baseURL: this.hostname,
      headers: {
        'api-key': API_KEY
      }
    })
  }

  static async response(data) {
    switch (data.method) {
    case 'getShow':
      var fanart = new Fanart()
      data.results = await fanart.instance
        .get(`tv/id/${data.params.showId}/`)
        .then(response => {
          return response.data
        })
        .catch(err => {
          data.error = err.message
        })
      break
    default:
      console.log(`[Fanart] Unknow method : ${data.method}`)
    }
    return data
  }
}

module.exports = Fanart
