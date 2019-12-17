const { exec } = require("child_process")

exec("node .\\back.server.js", (err, stdout, stderr) => {
  if (err) {
    console.error(`Couldn't execute the command : 'back.server.js'`, err)
    return
  }
  console.log(`stdout: ${stdout}`)
  console.log(`stderr: ${stderr}`)
})

exec("node .\\dev.server.js", (err, stdout, stderr) => {
  if (err) {
    console.error(`Couldn't execute the command : 'dev.server.js'`, err)
    return
  }
  console.log(`stdout: ${stdout}`)
  console.log(`stderr: ${stderr}`)
})
