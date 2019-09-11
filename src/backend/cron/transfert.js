const Medoc = require("medoc")
const cron = require("node-cron")

const File = require("../utils/file")

const CONFIG_FILE = "directory-config"

// Run every 5 minutes
cron.schedule("*/5 * * * *", () => {
  const settings = File.readFile(CONFIG_FILE)
  const files = Medoc.search(settings.from, settings.to)

  if (Array.isArray(files)) {
      files.map(file => {
        let results = await Medoc.move(file)
        console.log(results)
        // TODO : To test tomorrow !
      })
  } else {
    console.error(data.results)
  }
})
