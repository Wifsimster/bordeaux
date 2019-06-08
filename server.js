const WebSocket = require("ws")

const wss = new WebSocket.Server({ port: 8080 })

console.log(`Web Socket serveur started !`)

const Download = require("./src/backend/channels/download")
const Transfert = require("./src/backend/channels/transfert")
const Subtitles = require("./src/backend/channels/subtitles")

wss.on("connection", function connection(ws, req) {
  console.log(`New connection : ${req.connection.remoteAddress}`)

  switch (req.url) {
    case `/download`:
      new Download(ws)
      break
    case `/transfert`:
      new Transfert(ws)
      break
    case `/subtitles`:
      new Subtitles(ws)
      break
    default:
      console.log(req.url)
  }
})
