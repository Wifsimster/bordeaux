const File = require("../utils/file")
const uuid = require("uuid")
const os = require("os")
const axios = require("axios")

const CONFIG_FILE = "plex-config"

class Plex {
  constructor() {
    var settings = File.readFile(CONFIG_FILE)

    this.hostname = settings.host
    this.port = settings.port
    this.username = settings.username
    this.password = settings.password

    this.id = uuid.v4()
    this.product = "Node.js app"
    this.version = "1.0"
    this.device = os.platform()
    this.deviceName = "Node.js app"
    this.platform = "Node.js"
    this.platformVersion = process.version

    this.instance = axios.create({
      baseURL: `https://192-168-0-21.c16f0f0d771c445eb189341b266e8db0.plex.direct:${this.port}`,
      headers: {
        "X-Plex-Product": this.product,
        "X-Plex-Version": this.version,
        "X-Plex-Client-Identifier": this.id,
        "X-Plex-Platform": this.platform,
        "X-Plex-Platform-Version": this.platformVersion,
        "X-Plex-Device": this.device,
        "X-Plex-Device-Name": this.deviceName,
        "X-Plex-Language": "fr",
        "X-Plex-Token": "s86yM8xCrjD96zLnoyVq"
      }
    })
  }

  getSections() {
    return this.instance.get("/library/sections")
  }

  getShows() {
    return this.instance.get(`/library/sections/2/all?type=2`)
  }

  getEpisodes() {
    return this.instance.get(`/library/sections/2/all?type=4`)
  }

  static async response(data) {
    switch (data.method) {
      case "getAll":
        data.results = File.readFile(CONFIG_FILE)
        break
      case "update":
        File.writeFile(CONFIG_FILE, data.params)
        data.results = File.readFile(CONFIG_FILE)
        break
      case "getShows":
        var plex = new Plex()

        data.results = await plex
          .getShows()
          .then(results => {
            return results.data.MediaContainer
          })
          .catch(err => {
            data.error = `${err.code} : ${err.message}`
          })

        break
      case "getEpisodes":
        var plex = new Plex()

        data.results = await plex
          .getEpisodes()
          .then(results => {
            return results.data.MediaContainer
          })
          .catch(err => {
            data.error = `${err.code} : ${err.message}`
          })

        break
      default:
        console.log(`[Plex] Unknow method : ${data.method}`)
    }
    return data
  }
}

module.exports = Plex
