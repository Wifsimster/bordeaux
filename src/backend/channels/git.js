const { exec } = require("child_process")

const File = require("../utils/file")
const Logger = require("../utils/logger")

const CONFIG_FILE = "update-config"

class Git {
  constructor() {}

  static async response(data) {
    switch (data.method) {
      case "getAll":
        data.results = await File.readFile(CONFIG_FILE)
        break
      case "update":
        await File.writeFile(CONFIG_FILE, data.params)
        data.results = await File.readFile(CONFIG_FILE)
        break
      case "pull":
        Logger.info("Git", `Searching for update`)

        exec(`git pull origin master`, (err, stdout, stderr) => {
          if (err) {
            console.error(
              `Couldn't execute the command : 'git pull origin master'`,
              err
            )
            return
          }
          console.log(`stdout: ${stdout}`)
          console.log(`stderr: ${stderr}`)
        })
        break
      default:
        Logger.info("Git", `Unknow method : ${data.method}`)
        console.log(`[Git] Unknow method : ${data.method}`)
    }
    return data
  }
}

module.exports = Git
