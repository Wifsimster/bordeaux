const fs = require('fs')

const ENCODING = `utf-8`

class File {
  constructor() {}

  static readFile(path) {
    var data = fs.readFileSync(`src/backend/data/${path}.json`, { encoding: ENCODING, flag: 'a+' })

    if (data === '') {
      return null
    } else {
      return JSON.parse(data)
    }
  }

  static writeFile(path, data) {
    fs.writeFileSync(`src/backend/data/${path}.json`, JSON.stringify(data), { encoding: ENCODING, flag: 'w' })
  }
}

module.exports = File
