const Yquem = require("yquem")

class Subtitles {
  constructor(ws) {
    this.ws = ws

    this.ws.on("message", data => {
      data = JSON.parse(data)
      switch (data.method) {
        case "search":
          var yquem = new Yquem(data.params.from)
          data.results = yquem.getRecentFilesFromDirectory(data.params.from, data.params.fileAge)
          this.ws.send(JSON.stringify(data))
          break
        case "run":
          var yquem = new Yquem(data.params.from)
          yquem
            .run()
            .then(results => {
              data.results = results
              this.ws.send(JSON.stringify(data))
            })
            .catch(err => {
              console.error(err)
              data.error = err
              this.ws.send(JSON.stringify(data))
            })
          break
        default:
          console.log(`[subtitles] Unknow method : ${data.method}`)
      }
    })
  }
}

module.exports = Subtitles
