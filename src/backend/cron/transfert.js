const cron = require("node-cron")
const WebSocket = require("ws")

const File = require("../utils/file")

const SERVER_FILE = "server-config"
const SUBTITLES_FILE = "subtitles-config"
const PLEX_FILE = "plex-config"
const UUID = "67d119bc-e8ae-45ff-8cf3-0fc876576a6a"

// Run every 5 minutes
const transfert = cron.schedule(
  "*/5 * * * *",
  () => {
    const serverSettings = File.readFile(SERVER_FILE)
    const subtitlesSettings = File.readFile(SUBTITLES_FILE)
    const plexSettings = File.readFile(PLEX_FILE)

    const ws = new WebSocket(
      `ws://${serverSettings.host}:${serverSettings.port}`
    )

    ws.on("open", () => {
      ws.send(
        JSON.stringify({
          object: "transfert",
          method: "search"
        })
      )
    })

    ws.on("message", message => {
      if (message) {
        message = JSON.parse(message)
        const results = message.results

        switch (message.object) {
          case "transfert":
            switch (message.method) {
              case "search":
                if (results && results.length > 0) {
                  results.map(episode => {
                    ws.send(
                      JSON.stringify({
                        object: "transfert",
                        method: "move",
                        params: { episode: episode }
                      })
                    )
                  })
                }
                break
              case "move":
                if (subtitlesSettings.downloadAfterTransfert) {
                  ws.send(
                    JSON.stringify({
                      object: "subtitles",
                      method: "getSubtitle",
                      params: { file: results.destination }
                    })
                  )
                }

                if (plexSettings.synchronizeAfterTransfert) {
                  ws.send(
                    JSON.stringify({
                      object: "plex",
                      method: "refresh",
                      params: { uuid: UUID }
                    })
                  )
                }
                break
            }
            break
          case "plex":
            switch (message.method) {
              case "refresh":
                console.log(`[Plex] refresh : ${message.results}`)
                break
            }
            break
          case "subtitles":
            switch (message.method) {
              case "getSubtitle":
                console.log(`[Subtitles] getSubtitle : ${message.results}`)
                break
            }
            break
        }
      }
    })

    ws.on("error", err => {
      console.error(err)
    })
  },
  { scheduled: false }
)

transfert.start()
// transfert.stop()
