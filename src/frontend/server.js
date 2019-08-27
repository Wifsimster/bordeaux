const http = require("http")
const fs = require("fs")
const path = require("path")

const PORT = 8082

http
  .createServer((req, res) => {
    if (!/dist|font/.exec(req.url)) {
      fs.readFile(path.join(__dirname, "../../index.html"), "utf-8", (err, content) => {
        if (err) {
          console.log(`We cannot open ${url} file.`)
        }

        res.writeHead(200, {
          "Content-Type": "text/html; charset=utf-8"
        })

        res.end(content)
      })
    } else {
      const url = path.join(__dirname, "../..", req.url)
      fs.readFile(url, "utf-8", (err, content) => {
        if (err) {
          console.log(`We cannot open ${url} file.`)
        }

        res.writeHead(200, {
          "Content-Type": "text/html; charset=utf-8"
        })

        res.end(content)
      })
    }
  })
  .listen(PORT, () => {
    console.log("Server listening on: http://localhost:%s", PORT)
  })
