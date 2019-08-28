const File = require("../utils/file")

class Explorer {
  constructor() {}

  static response(data) {
    switch (data.method) {
      case "getRoot":
        data.results = File.getRoot()
        break
      case "getDirectories":
        data.results = File.getDirectories(data.params.root)
        break
      default:
        console.log(`[Explorer] Unknow method : ${data.method}`)
    }
    return data
  }
}

module.exports = Explorer
