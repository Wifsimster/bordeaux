const Medoc = require("medoc")

class Transfert {
  constructor(ws) {
    this.ws = ws

    this.ws.on("message", data => {
      data = JSON.parse(data)
      switch (data.method) {
        case "search":
          var medoc = new Medoc(data.params.from, data.params.to)
          medoc
            .search(data.params.from)
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
        case "run":
          var medoc = new Medoc(data.params.from, data.params.to)
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
