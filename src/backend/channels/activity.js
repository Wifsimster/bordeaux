const File = require("../utils/file")

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
            console.error(err)
          }
        }
        break
      case "add":
        let fileData = await File.readFile(filename)

        if (fileData === null) {
          await File.writeFile(filename, [])
          fileData = await File.readFile(filename)
        }

        fileData.push({
          date: new Date(),
          ...data.params
        })

        await File.writeFile(filename, fileData)
        break
      default:
        console.log(`[Activity] Unknow method : ${data.method}`)
    }
    return data
  }
}

module.exports = Activity
