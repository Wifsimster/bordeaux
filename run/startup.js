const { exec } = require("child_process")

exec(`node "${__dirname}\\back.server.js"`, (err, stdout, stderr) => {
  if (err) {
    console.error(`Couldn't execute the command : 'back.server.js'`, err)
    return
  }
  console.log(`stdout: ${stdout}`)
  console.log(`stderr: ${stderr}`)
})

exec(`node "${__dirname}\\dev.server.js"`, (err, stdout, stderr) => {
  if (err) {
    console.error(`Couldn't execute the command : 'dev.server.js'`, err)
    return
  }
  console.log(`stdout: ${stdout}`)
  console.log(`stderr: ${stderr}`)
})
