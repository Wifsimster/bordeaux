const connect = require("connect")
const serveStatic = require("serve-static")
const path = require("path")

const PORT = 8082

console.log(__dirname)

connect()
  .use(serveStatic(path.resolve(__dirname, "../../")))
  .listen(PORT, function() {
    console.log(`Server running on http://localhost:${PORT}...`)
  })
