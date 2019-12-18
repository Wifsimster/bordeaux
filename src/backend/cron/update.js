const cron = require("node-cron")
const WebSocket = require("ws")

const File = require("../utils/file")
const Logger = require("../utils/logger")

const UPDATE_FILE = "update-config"
const SERVER_FILE = "server-config"

async function main() {
  const serverSettings = await File.readFile(SERVER_FILE)
  const updateSettings = await File.readFile(UPDATE_FILE)

  const update = cron.schedule(
    updateSettings.cron,
    () => {
      Logger.info("Cron", "Git pull trigger")

      const ws = new WebSocket(
        `ws://${serverSettings.host}:${serverSettings.port}`
      )

      ws.on("open", () => {
        ws.send(
          JSON.stringify({
            object: "git",
            method: "pull"
          })
        )
      })

      ws.on("error", err => {
        console.error(err.message)
        Logger.error("Git", err.message)
      })
    },
    { scheduled: false }
  )

  if (updateSettings.enable) {
    update.start()
  }
}

main()
