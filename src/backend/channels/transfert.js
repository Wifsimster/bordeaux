const Medoc = require("medoc")

class Transfert {
  constructor() {}

  static async response(data) {
    switch (data.method) {
      case "search":
        var medoc = new Medoc(data.params.from, data.params.to)
        data.results = await medoc.search(data.params.from).catch(err => {
          data.error = err
        })
        break
      case "run":
        var medoc = new Medoc(data.params.from, data.params.to)
        data.results = await medoc.run().catch(err => {
          data.error = err
        })
        break
      default:
        console.log(`[Transfert] Unknow method : ${data.method}`)
    }
    return data
  }
}

module.exports = Transfert
