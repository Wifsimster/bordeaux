const File = require("../utils/file")
const format = require("date-fns/format")

class Activity {
  constructor() {}

  static async response(data) {
    const filename = `activity-${new Date().toISOString().slice(0, 10)}`

    switch (data.method) {
      case "getAll":
        if (data.params && data.params.date) {
          try {
            data.results = await File.readFile(`activity-${data.params.date}`, {
              flag: "r"
            })
          } catch (err) {
            data.results = []
            console.error(`[Activity] ReadFile : ${err}`)
          }
        }
        break
      case "add":
        try {
          let fileData = await File.readFile(filename)

          if (fileData === null) {
            console.warn("Activity file is empty !")
            await File.writeFile(filename, []).catch(err => {
              console.error(`[Activity] WriteFile : ${err}`)
            })

            fileData = await File.readFile(filename)
          }

          if (
            fileData !== null &&
            fileData !== undefined &&
            Array.isArray(fileData)
          ) {
            fileData.push({
              date: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"),
              type: data.params.info,
              object: data.params.object,
              message: data.params.message
            })

            await File.writeFile(filename, fileData).catch(err => {
              console.error(`[Activity] WriteFile : ${err}`)
            })
          } else {
            console.error(`[Activity] File is corrupted !`)
          }
        } catch (err) {
          console.error(`[Activity] Add : ${err}`)
        }
        break
      default:
        console.log(`[Activity] Unknow method : ${data.method}`)
    }
    return data
  }
}

module.exports = Activity
