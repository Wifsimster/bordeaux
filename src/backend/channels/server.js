const File = require("../utils/file")

const CONFIG_FILE = "server-config"

class Server {
  constructor() {}

  static response(data) {
    switch (data.method) {
      case "getAll":
        data.results = File.readFile(CONFIG_FILE)
        break
      case "update":
        File.writeFile(CONFIG_FILE, data.params)
        data.results = File.readFile(CONFIG_FILE)
        break
      default:
        console.log(`[Server] Unknow method : ${data.method}`)
    }
    return data
  }
}

module.exports = Server
