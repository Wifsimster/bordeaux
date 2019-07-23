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
  }

  static response(data) {
    switch (data.method) {
      case "getAll":
        data.results = File.readFile(CONFIG_FILE)
        break
      case "update":
        File.writeFile(CONFIG_FILE, data.params)
        data.results = File.readFile(CONFIG_FILE)
        break
      case "test":
        var plex = new Plex()

        // https://192-168-0-21.c16f0f0d771c445eb189341b266e8db0.plex.direct:32400/updater/check?download=0&X-Plex-Product=Plex%20Web&X-Plex-Version=3.95.2&X-Plex-Client-Identifier=f8bsbvjsd06hakpj4jqf8t06&X-Plex-Platform=Chrome&X-Plex-Platform-Version=75.0&X-Plex-Sync-Version=2&X-Plex-Model=bundled&X-Plex-Device=Windows&X-Plex-Device-Name=Chrome&X-Plex-Device-Screen-Resolution=1323x941%2C1920x1080&

        const instance = axios.create({
          baseURL: `https://192-168-0-21.c16f0f0d771c445eb189341b266e8db0.plex.direct:${plex.port}`,
          headers: {
            "X-Plex-Product": plex.product,
            "X-Plex-Version": plex.version,
            "X-Plex-Client-Identifier": plex.id,
            "X-Plex-Platform": plex.platform,
            "X-Plex-Platform-Version": plex.platformVersion,
            "X-Plex-Device": plex.device,
            "X-Plex-Device-Name": plex.deviceName,
            "X-Plex-Language": "fr",
            "X-Plex-Token": "s86yM8xCrjD96zLnoyVq"
          }
        })

        instance
          .get("/clients")
          .then(results => {
            console.log(results.status)
            console.log(results.data)
          })
          .catch(err => {
            console.error(err)
          })
        break
      default:
        console.log(`[Plex] Unknow method : ${data.method}`)
    }
    return data
  }
}

module.exports = Plex
