const axios = require("axios")

const File = require("../utils/file")

const Tmdb = require("../classes/tmdb")

const CONFIG_FILE = "trakt-config"
const CLIENT_ID = `6c57241f02608080a10914e28c4b7df760a554ee9d387ade7dd06a308bd7748b`
const CLIENT_SECRET = `19e784eb7e88e64b9d42cce1725dfcb66214b12befa9d7c7b130b221a1207f6e`

class Trakt {
  constructor() {}

  async init() {
    let settings = await File.readFile(CONFIG_FILE)

    this.hostname = `https://api.trakt.tv`
    this.version = "2"

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
        "trakt-api-key": CLIENT_ID,
        "trakt-api-version": this.version
      }
    })
  }

  static async response(data) {
    var trakt
    var tmdb
    var episodes

    switch (data.method) {
      case "getAll":
        data.results = await File.readFile(CONFIG_FILE)
        break
      case "update":
        File.writeFile(CONFIG_FILE, data.params)
        data.results = await File.readFile(CONFIG_FILE)
        break
      case "getDeviceCode":
        try {
          trakt = new Trakt()
          await trakt.init()

          data.results = await trakt.instance
            .post("oauth/device/code", {
              client_id: CLIENT_ID
            })
            .then(response => {
              return response.data
            })
            .catch(err => {
              data.error = err.message
            })
        } catch (err) {
          console.error(err)
          data.error = err.message
        }
        break
      case "checkDeviceAuthorization":
        trakt = new Trakt()
        await trakt.init()

        data.results = await trakt.instance
          .post("oauth/device/token", {
            code: data.params.code,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET
          })
          .then(response => {
            return response.data
          })
          .catch(err => {
            console.error(err)
            data.error = err.message
          })
        break
      case "getEpisodes":
        try {
          trakt = new Trakt()
          await trakt.init()

          episodes = await trakt.instance
            .get(
              `calendars/my/shows/${data.params.startDate}/${data.params.days}`
            )
            .then(async response => response.data)
            .catch(err => {
              data.error = err.message
            })

          tmdb = new Tmdb()

          episodes = await Promise.all(
            episodes.map(async episode => {
              episode.images = await tmdb
                .getEpisodeImages(episode)
                .catch(err => {
                  console.warn(err)
                })

              if (!episode.images || episode.images.length === 0) {
                episode.images = await tmdb
                  .getShowImages(episode)
                  .catch(err => {
                    console.warn(err)
                  })
              }

              return episode
            })
          )
          data.results = episodes
        } catch (err) {
          console.error(err)
          data.error = err.message
        }
        break
      case "getEpisode":
        try {
          trakt = new Trakt()
          await trakt.init()

          data.results = await trakt.instance
            .get(
              `shows/${data.params.showId}/seasons/${data.params.season}/episodes/${data.params.episode}?extended=full`
            )
            .then(response => {
              return response.data
            })
            .catch(err => {
              data.error = err.message
            })
        } catch (err) {
          console.error(err)
          data.error = err.message
        }
        break
      case "getLastActivity":
        try {
          trakt = new Trakt()
          await trakt.init()

          data.results = await trakt.instance
            .get(`sync/last_activities`)
            .then(response => {
              return response.data
            })
            .catch(err => {
              data.error = err.message
            })
        } catch (err) {
          console.error(err)
          data.error = err.message
        }
        break
      case "getWatched":
        try {
          trakt = new Trakt()
          await trakt.init()

          data.results = await trakt.instance
            .get(`sync/watched/shows`)
            .then(response => {
              return response.data
            })
            .catch(err => {
              data.error = err.message
            })
        } catch (err) {
          console.error(err)
          data.error = err.message
        }
        break
      case "getCollected":
        try {
          trakt = new Trakt()
          await trakt.init()

          data.results = await trakt.instance
            .get(`sync/collection/shows`)
            .then(response => {
              return response.data
            })
            .catch(err => {
              data.error = err.message
            })
        } catch (err) {
          console.error(err)
          data.error = err.message
        }

        break
      default:
        console.log(`[Trakt] Unknow method : ${data.method}`)
    }
    return data
  }
}

module.exports = Trakt
