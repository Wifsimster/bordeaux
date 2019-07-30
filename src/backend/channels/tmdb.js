const axios = require("axios")

const API_KEY = `45f0dbbbdee6820d59727e39febc79e3 `

class Tmdb {
  constructor() {
    this.hostname = `https://api.themoviedb.org/3`

    this.instance = axios.create({
      baseURL: this.hostname
    })
  }

  static getApiKey() {
    return API_KEY
  }

  async getEpisodeImages(episode) {
    return await this.instance
      .get(
        `tv/${episode.show.ids.tmdb}/season/${episode.episode.season}/episode/${
          episode.episode.number
        }/images?api_key=${API_KEY}`
      )
      .then(response => {
        if (response.data.stills && response.data.stills.length > 0) {
          return response.data.stills
        }
        return null
      })
  }

  static async response(data) {
    switch (data.method) {
      case "getEpisode":
        var tmdb = new Tmdb()
        data.results = await tmdb.instance
          .get(`tv/${data.params.id}/season/${data.params.season}/episode/${data.params.episode}?api_key=${API_KEY}`)
          .then(response => {
            return response.data
          })
          .catch(err => {
            data.error = err.message
          })
        break
      case "getEpisodeImage":
        var tmdb = new Tmdb()

        data.results = tmdb
          .getEpisodeImages(data.params)
          .then(response => {
            return response.data
          })
          .catch(err => {
            data.error = err.message
          })
        break
      default:
        console.log(`[Tmdb] Unknow method : ${data.method}`)
    }
    return data
  }
}

module.exports = Tmdb
