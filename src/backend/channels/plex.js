const File = require("../utils/file")
const uuid = require("uuid")
const os = require("os")
const axios = require("axios")
const querystring = require("querystring")

const CONFIG_FILE = "plex-config"

// const TOKEN = "s86yM8xCrjD96zLnoyVq"

class Plex {
  constructor() {
    var settings = File.readFile(CONFIG_FILE)

    this.hostname = settings.host
    this.port = settings.port
    this.username = settings.username
    this.password = settings.password

    this.clientId = uuid.v4()

    Plex.signin({ login: this.username, password: this.password }, this.clientId)
      .then(response => {
        this.user = response.data
      })
      .catch(err => {
        console.error(err)
      })

    // this.product = "Node.js app"
    // this.version = "1.0"
    // this.device = os.platform()
    // this.deviceName = "Node.js app"
    // this.platform = "Node.js"
    // this.platformVersion = process.version

    this.instance = axios.create({
      baseURL: `https://192-168-0-21.c16f0f0d771c445eb189341b266e8db0.plex.direct:${this.port}`,
      headers: {
        "X-Plex-Client-Identifier": this.clientId,
        "X-Plex-Token": this.getToken()
        // "X-Plex-Product": this.product,
        // "X-Plex-Version": this.version,
        // "X-Plex-Platform": this.platform,
        // "X-Plex-Platform-Version": this.platformVersion,
        // "X-Plex-Device": this.device,
        // "X-Plex-Device-Name": this.deviceName,
        // "X-Plex-Language": "fr",
      }
    })
  }

  getUser() {
    return this.user
  }

  getToken() {
    return this.user.authToken
  }

  /**
   * Online API
   */
  static async signin(data, clientId) {
    return await axios.post(`https://plex.tv/api/v2/users/signin`, data, {
      headers: {
        "X-Plex-Client-Identifier": clientId
      }
    })
  }

  /**
   * Online API
   * Get the list of resources with connection settings
   * Conection : [protocol, address, port, uri, local, relay, IPv6]
   */
  async getResources() {
    return await axios.get(`https://plex.tv/api/v1/resources`)
  }

  /**
   *  Online API
   *  Get basic info about the Plex server.
   *  Return: [id, uuid, username, title, email, thumb, authToken, certificateVersion, rememberExpiresAt]
   */
  async getUser(clientId) {
    return await axios.get(
      `https://plex.tv/api/v2/user?includeSubscriptions=1&includeSettings=1&includeSharedSettings=1`,
      {
        headers: {
          "X-Plex-Client": clientId, // clientId value has no importance
          "X-Plex-Token": TOKEN
        }
      }
    )
  }

  /**
   *  Get basic info about the Plex server.
   * Return: [machineIdentifier, version]
   */
  getIdentity() {
    return this.instance.get(`/identity`)
  }

  /**
   *  Get basic info about the Plex server.
   *  ie : platform, platformVersion, updatedAt, version, machineIdentifier, myPlexUsername
   *  Return : [activities, butler, channels, clients, devices, diagnostics, hubs, library, livetv, media, player, playlists, resources, search, server, ...]
   */
  getActions() {
    return this.instance.get(`/`)
  }

  /**
   * Get a list of libraries
   * Return: [section, recentlyAdded, onDeck]
   */
  getLibraries() {
    return this.instance.get("/library")
  }

  /**
   * Get a list of sections in the library
   * Return: [Movies, Music, TV Shows]
   */
  getLibrary(library = "sections") {
    return this.instance.get(`/library/${library}`)
  }

  /**
   * Get list of directory in a specified section
   * Default : TV Shows section
   * Return : [all, unwatched, newest, recentlyAdded, recenntlyViewed, recentlyViewedShows, onDeck, folder, ...]   *
   */
  getDirectoriesFromSection(library = "sections", sectionId = 2) {
    return this.instance.get(`/library/${library}/${sectionId}`)
  }

  /**
   * Get a list of TV Shows by directory
   * Default : TV Shows and all
   * Return : [studio, type, title, contentRating, summary, index, rating, year, thumb, art, duration, originallyAvailableAt, ...]
   */
  getDirectory(library = "sections", sectionId = 2, directory = "all") {
    return this.instance.get(`/library/${library}/${sectionId}/${directory}`)
  }

  /**
   * Search Tv Shows, episodes, movies or musics
   * Default : [sectionId : Tv Shows, type: Tv Shows]
   * For Tv Shows, type: [2: Tv Shows, 3: Seasonn, 4 : Episode]
   */
  search(library = "sections", sectionId = 2, filters = { type: 2 }) {
    return this.instance.get(`/library/${library}/${sectionId}/search?${querystring.stringify(filters)}`)
  }

  /**
   * Get metdata of a media
   */
  getMedatadata() {
    return this.instance.get(`/library/metadata/${id}`)
  }

  /**
   * Get a list of servers
   * Return: [name, host, address, port, machineIdentifier, version]
   */
  getServers() {
    return this.instance.get("/servers")
  }

  /**
   * Get synchronize info
   */
  getSynchronize() {
    return this.instance.get("/video/trakt/sync")
  }

  /**
   * Synchronize Plex and Trakt.tv
   */
  synchronize(accoundIf = "1&amp;t=1565171925.59") {
    return this.instance.get("/video/trakt/sync/synchronize?account_id=")
  }

  /**
   * Hubs actions
   * [continueWatchig, onDeck]
   */
  getHubs(action = "continueWatching") {
    return this.instance.get(`/hubs/home/${action}`)
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
      case "signin":
        var plex = new Plex()
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
