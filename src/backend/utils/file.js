const fs = require('fs')
const path = require('path')

const ENCODING = `utf-8`

class File {
  constructor() {}

  static readFile(url) {
    var data = fs.readFileSync(path.resolve(`${__dirname}/../data/${url}.json`), {
      encoding: ENCODING,
      flag: 'a+'
    })

    if (data === '') {
      return null
    } else {
      return JSON.parse(data)
    }
  }

  static writeFile(url, data) {
    fs.writeFileSync(path.resolve(`${__dirname}/../data/${url}.json`), JSON.stringify(data), {
      encoding: ENCODING,
      flag: 'w'
    })
  }
}

module.exports = File
