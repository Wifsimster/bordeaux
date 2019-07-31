const axios = require('axios')

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

  async getSeasonImages(episode) {
    return await this.instance
      .get(`tv/${episode.show.ids.tmdb}/season/${episode.episode.season}/images?api_key=${API_KEY}`)
      .then(response => {
        if (response.data.posters && response.data.posters.length > 0) {
          return response.data.posters
        }
        return null
      })
  }

  async getShowImages(episode) {
    return await this.instance.get(`tv/${episode.show.ids.tmdb}/images?api_key=${API_KEY}`).then(response => {
      if (response.data.backdrops && response.data.backdrops.length > 0) {
        return response.data.backdrops
      }
      return null
    })
  }
}

module.exports = Tmdb
