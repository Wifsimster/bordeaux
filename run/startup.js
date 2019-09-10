const { exec } = require("child_process")

exec("node .\\run\\back.server.js", (err, stdout, stderr) => {
  if (err) {
    console.error(`Couldn't execute the command : 'back.server.js'`)
    return
  }
  console.log(`stdout: ${stdout}`)
  console.log(`stderr: ${stderr}`)
})

exec("node .\\run\\dev.server.js", (err, stdout, stderr) => {
  if (err) {
    console.error(`Couldn't execute the command : 'dev.server.js'`)
    return
  }
  console.log(`stdout: ${stdout}`)
  console.log(`stderr: ${stderr}`)
})
