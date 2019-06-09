const Medoc = require("medoc")

// const PATH_TO_SCAN = `w:`
// const PATH_TO_PUSH = `z:`

class Transfert {
  constructor(ws) {
    this.ws = ws

    this.ws.on("message", data => {
      data = JSON.parse(data)
      switch (data.method) {
        case "run":
          const medoc = new Medoc(data.params.from, data.params.to)
          medoc
            .run()
            .then(results => {
              console.log(results)
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
          console.log(`[transfert] Unknow method : ${data.method}`)
      }
    })
  }
}

module.exports = Transfert
