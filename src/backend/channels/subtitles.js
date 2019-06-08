const Yquem = require("yquem")

// const PATH_TO_PUSH = `z:`

class Subtitles {
  constructor(ws) {
    this.ws

    ws.on("message", function incoming(data) {
      switch (data.method) {
        case "run":
          const yquem = new Yquem(params.from)
          yquem
            .run()
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

module.exports = Subtitles
