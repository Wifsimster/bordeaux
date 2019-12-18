const Logger = require("../src/backend/utils/logger")

async function main() {
  const WebSocket = require("ws")
  const File = require("../src/backend/utils/file")

  const PORT = 8080

  let settings = await File.readFile("server-config")

  // Create server-config settings if doesn't exist
  if (!settings) {
    await File.writeFile("server-config", { host: "localhost", port: PORT })
    settings = await File.readFile("server-config")
  }

  let update = await File.readFile("update-config")

  // Create update-config settings if doesn't exist
  if (!update) {
    await File.writeFile("update-config", {
      cron: "* */1 * * *",
      enable: true
    })
  }

  const wss = new WebSocket.Server({ port: PORT })

  console.log(`Server started : ws://${settings.host}:${settings.port}`)

  Logger.info(
    "Server",
    `Server started : ws://${settings.host}:${settings.port}`
  )

  const Transmission = require("../src/backend/channels/transmission")
  const Directory = require("../src/backend/channels/directory")
  const Transfert = require("../src/backend/channels/transfert")
  const Subtitles = require("../src/backend/channels/subtitles")
  const Download = require("../src/backend/channels/download")
  const Server = require("../src/backend/channels/server")
  const Trakt = require("../src/backend/channels/trakt")
  const Plex = require("../src/backend/channels/plex")
  const Fanart = require("../src/backend/channels/fanart")
  const Git = require("../src/backend/channels/git")
  const Explorer = require("../src/backend/channels/explorer")
  const Activity = require("../src/backend/channels/activity")

  //  CRON
  require("../src/backend/cron/transfert")
  require("../src/backend/cron/update")

  wss.on("connection", function connection(ws, req) {
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
        case `git`:
          data = await Git.response(data)
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
        case `activity`:
          data = await Activity.response(data)
          break
        default:
          Logger.warn("Server", `Unknow object : '${data.object}'`)
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
}

main()
