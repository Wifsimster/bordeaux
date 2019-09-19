const File = require("../utils/file")

const CONFIG_FILE = "directory-config"

class Directory {
  constructor() {}

  static async response(data) {
    switch (data.method) {
      case "getAll":
        data.results = await File.readFile(CONFIG_FILE)
        break
      case "update":
        await File.writeFile(CONFIG_FILE, data.params)
        data.results = await File.readFile(CONFIG_FILE)
        break
      default:
        console.log(`[Directory] Unknow method : ${data.method}`)
    }
    return data
  }
}

module.exports = Directory
