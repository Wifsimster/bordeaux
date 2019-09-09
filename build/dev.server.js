const https = require("https")
const fs = require("fs")
const path = require("path")
var express = require("express")
var app = express()

const HOST = `localhost`
const PORT = 8443

const credentials = {
  key: fs.readFileSync(path.join(__dirname, "../ssl/private.key")),
  cert: fs.readFileSync(path.join(__dirname, "../ssl/certificate.crt"))
}

app.get("/sw.js", function(req, res) {
  console.log(req.url)
  fs.readFile(path.join(__dirname, "../dist/sw.js"), "utf-8", (err, content) => {
    if (err) {
      console.log(`We cannot open ${url} file.`)
    }
    console.log(content)

    // TODO : Maybe content is not correct, need to rewrite sw.js

    res.send(content)
  })
})

app.use(express.static(path.join(__dirname, "../dist")))

https.createServer(credentials, app).listen(PORT, () => {
  console.log(`Server listening on: https://${HOST}:${PORT}`)
})
