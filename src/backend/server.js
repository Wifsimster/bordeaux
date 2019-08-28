const WebSocket = require("ws")
const File = require("./utils/file")

var settings = File.readFile("server-config")

if (!settings) {
  File.writeFile("server-config", { host: "localhost", port: "8080" })
  settings = File.readFile("server-config")
}

const wss = new WebSocket.Server({ port: settings.port })

console.log(
  `Web Socket server started at : ws://${settings.host}:${settings.port}`
)

const Transmission = require("./channels/transmission")
const Directory = require("./channels/directory")
const Transfert = require("./channels/transfert")
const Subtitles = require("./channels/subtitles")
const Download = require("./channels/download")
const Server = require("./channels/server")
const Trakt = require("./channels/trakt")
const Plex = require("./channels/plex")
const Fanart = require("./channels/fanart")

wss.on("connection", function connection(ws, req) {
  console.log(`New client connection for ${req.url}`)

  // Detect and close broken connections
  ws.isAlive = true

  ws.on("pong", () => {
    ws.isAlive = true
  })

  setInterval(function ping() {
    wss.clients.forEach(function each(ws) {
      if (ws.isAlive === false) {
        console.warn("Client dead => Terminate connection !")
        return ws.terminate()
      }
      ws.isAlive = false
      ws.ping(() => {})
    })
  }, 30000)

  ws.on("message", async data => {
    data = JSON.parse(data)

    switch (data.object) {
      case `download`:
        data = await Download.response(data)
        break
      case `transfert`:
        data = await Transfert.response(data)
        break
      case `subtitles`:
        data = await Subtitles.response(data)
        break
      case `fanart`:
        data = await Fanart.response(data)
        break
      case `directory`:
        data = await Directory.response(data)
        break
      case `server`:
        data = await Server.response(data)
        break
      case `transmission`:
        data = await Transmission.response(data)
        break
      case `plex`:
        data = await Plex.response(data)
        break
      case `trakt`:
        data = await Trakt.response(data)
        break
      default:
        console.error(`Unknow object : '${data.object}'`)
    }

    // Broadcast response to all connected clients
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data))
      }
    })
  })
})
