const WebSocket = require("ws")
const File = require("../src/backend/utils/file")

var settings = File.readFile("server-config")

const PORT = 8080

if (!settings) {
  File.writeFile("server-config", { host: "localhost", port: PORT })
  settings = File.readFile("server-config")
}

const wss = new WebSocket.Server({ port: PORT })

console.log(`Web Socket server started at : ws://${settings.host}:${settings.port}`)

const Transmission = require("../src/backend/channels/transmission")
const Directory = require("../src/backend/channels/directory")
const Transfert = require("../src/backend/channels/transfert")
const Subtitles = require("../src/backend/channels/subtitles")
const Download = require("../src/backend/channels/download")
const Server = require("../src/backend/channels/server")
const Trakt = require("../src/backend/channels/trakt")
const Plex = require("../src/backend/channels/plex")
const Fanart = require("../src/backend/channels/fanart")
const Explorer = require("../src/backend/channels/explorer")

wss.on("connection", function connection(ws, req) {
  console.log(`New client connection for ${req.url}`)

  // Detect and close broken connections
  ws.isAlive = true

  ws.on("pong", () => {
    ws.isAlive = true
  })

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
      case `explorer`:
        data = await Explorer.response(data)
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
