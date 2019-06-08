const Petrus = require("petrus")
const Medoc = require("medoc")
const Yquem = require("yquem")
const WebSocket = require("ws")

const config = require("./transmission-config")
const shows = require("./shows")

const PATH_TO_SCAN = `w:`
const PATH_TO_PUSH = `z:`

const petrus = new Petrus(config)
const medoc = new Medoc(PATH_TO_SCAN, PATH_TO_PUSH)
const yquem = new Yquem(PATH_TO_PUSH)

// const action = `download`
const action = `move`
// const action = `subtitles`

const wss = new WebSocket.Server({ port: 8080 })

wss.on("connection", function connection(ws, req) {
  console.log(`New connection : ${req.connection.remoteAddress}`)

  ws.on("message", function incoming(data) {
    switch (data.method) {
      case `download`:
        petrus
          .run(shows)
          .then(results => {
            console.log(results)
          })
          .catch(err => {
            console.error(err)
          })
        break
      case `transfert`:
        medoc
          .run()
          .then(results => {
            ws.send(results)
          })
          .catch(err => {
            ws.send(err)
          })
        break
      case `subtitles`:
        yquem
          .run()
          .then(results => {
            console.log(results)
          })
          .catch(err => {
            console.error(err)
          })
        break
      default:
        console.log(`Message: ${data}`)
    }
  })
})
