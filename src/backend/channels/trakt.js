const axios = require("axios")

const File = require("../utils/file")
const Logger = require("../utils/logger")

const Tmdb = require("../classes/tmdb")

const CONFIG_FILE = "trakt-config"

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
        "trakt-api-key": settings.clientID,
        "trakt-api-version": this.version
      }
    })
  }

  static async response(data) {
    var settings
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
          Logger.info("Trakt", "getDeviceCode")
          settings = await File.readFile(CONFIG_FILE)

          trakt = new Trakt()
          await trakt.init()

          data.results = await trakt.instance
            .post("oauth/device/code", {
              client_id: settings.clientID
            })
            .then(response => {
              return response.data
            })
            .catch(err => {
              Logger.error("Trakt", err.message)
              data.error = err.message
            })
        } catch (err) {
          Logger.error("Trakt", err.message)
          data.error = err.message
        }
        break
      case "checkDeviceAuthorization":
        try {
          settings = await File.readFile(CONFIG_FILE)
          trakt = new Trakt()
          await trakt.init()

          data.results = await trakt.instance
            .post("oauth/device/token", {
              code: data.params.code,
              client_id: settings.clientID,
              client_secret: settings.clientSecret
            })
            .then(response => {
              return response.data
            })
            .catch(err => {
              Logger.error("Trakt", err.message)
              data.error = err.message
            })
        } catch (err) {
          Logger.error("Trakt", err.message)
          data.error = err.message
        }
        break
      case "getEpisodes":
        try {
          trakt = new Trakt()
          await trakt.init()

          episodes = await trakt.instance
            .get(`calendars/my/shows/${data.params.startDate}/${data.params.days}`)
            .then(async response => response.data)
            .catch(err => {
              Logger.error("Trakt", err.message)
              data.error = err.message
            })

          if (episodes) {
            tmdb = new Tmdb()

            episodes = await Promise.all(
              episodes.map(async episode => {
                episode.images = await tmdb.getEpisodeImages(episode).catch(err => {
                  Logger.warn("Trakt", err)
                  console.warn(err)
                })

                if (!episode.images || episode.images.length === 0) {
                  episode.images = await tmdb.getShowImages(episode).catch(err => {
                    Logger.warn("Trakt", err)
                    console.warn(err)
                  })
                }

                return episode
              })
            )
          }
          data.results = episodes
        } catch (err) {
          Logger.error("Trakt", err.message)
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
          Logger.error("Trakt", err.message)
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
          Logger.error("Trakt", err.message)
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
          Logger.error("Trakt", err.message)
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
          Logger.error("Trakt", err.message)
          data.error = err.message
        }
        break
      default:
        Logger.warn("Trakt", `Unknow method : ${data.method}`)
        console.log(`[Trakt] Unknow method : ${data.method}`)
    }
    return data
  }
}

module.exports = Trakt
