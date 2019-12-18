const fs = require("fs")
const path = require("path")

const ENCODING = `utf-8`

class File {
  constructor() {}

  static existFile(filename) {
    if (!fs.existsSync(path.resolve(`${__dirname}/../data/${filename}.json`))) {
      return false
    }
    return true
  }

  static async readFile(filename, options = { flag: "a+" }) {
    // Create data/ if doesn't exist
    if (!fs.existsSync(`${__dirname}/../data/`)) {
      fs.mkdirSync(`${__dirname}/../data/`)
    }

    return fs.promises
      .readFile(path.resolve(`${__dirname}/../data/${filename}.json`), {
        encoding: ENCODING,
        flag: options.flag
      })
      .then(data => {
        if (data === "") {
          return null
        } else {
          return JSON.parse(data)
        }
      })
      .catch(err => {
        console.error(err)
      })
  }

  static async writeFile(filename, data) {
    fs.promises.writeFile(
      path.resolve(`${__dirname}/../data/${filename}.json`),
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
