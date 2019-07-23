const WebSocket = require("ws")

const wss = new WebSocket.Server({ port: 8080 })

console.log(`Web Socket server started !`)

const Download = require("./src/backend/channels/download")
const Transfert = require("./src/backend/channels/transfert")
const Subtitles = require("./src/backend/channels/subtitles")
const Transmission = require("./src/backend/channels/transmission")
const Plex = require("./src/backend/channels/plex")
const Show = require("./src/backend/channels/show")
const Directory = require("./src/backend/channels/directory")

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
        return ws.terminate()
      }
      ws.isAlive = false
      ws.ping(() => {})
    })
  }, 5000)

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
      case `transmission`:
        data = await Transmission.response(data)
        break
      case `show`:
        data = await Show.response(data)
        break
      case `plex`:
        data = await Plex.response(data)
        break
      case `directory`:
        data = await Directory.response(data)
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
