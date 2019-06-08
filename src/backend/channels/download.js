const Petrus = require("petrus")
const config = require("../../../transmission-config")
const shows = require("../../../shows")

class Download {
  constructor(ws) {
    this.ws

    ws.on("message", function incoming(data) {
      switch (data.method) {
        case "run":
          const petrus = new Petrus(config)
          petrus
            .run(shows)
            .then(results => {
              ws.send(results)
            })
            .catch(err => {
              ws.send(err)
            })
          break
      }
    })
  }
}

module.exports = Download
