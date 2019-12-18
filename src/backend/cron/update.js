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
      Logger.info("Git", `[CRON] Git pull trigger`)

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

      ws.on("message", message => {
        if (message) {
          message = JSON.parse(message)
          const results = message.results

          switch (message.object) {
            case "git":
              switch (message.method) {
                case "update":
                  if (results) {
                    console.log("Results Update : ", results)
                  }
                  break
              }
              break
          }
        }
      })

      ws.on("error", err => {
        Logger.error("Pull", err.message)
        console.error(err.message)
      })
    },
    { scheduled: false }
  )

  if (updateSettings.enable) {
    update.start()
  }
}

main()
