const fs = require("fs")
const path = require("path")

const ENCODING = `utf-8`

class File {
  constructor() {}

  static readFile(url) {
    var data = fs.readFileSync(
      path.resolve(`${__dirname}/../data/${url}.json`),
      {
        encoding: ENCODING,
        flag: "a+"
      }
    )

    if (data === "") {
      return null
    } else {
      return JSON.parse(data)
    }
  }

  static writeFile(url, data) {
    fs.writeFileSync(
      path.resolve(`${__dirname}/../data/${url}.json`),
      JSON.stringify(data),
      {
        encoding: ENCODING,
        flag: "w"
      }
    )
  }

  static getRoot() {
    const rootPath = path.dirname(
      require.main.filename || process.mainModule.filename
    )
    const disk = rootPath.split("\\")[0]
    return `${disk}/`
  }

  static getDirectories(root) {
    try {
      return fs
        .readdirSync(root, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)
    } catch (err) {
      console.error(err)
    }
  }
}

module.exports = File
