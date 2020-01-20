const http = require('http')
const fs = require('fs')
const path = require('path')
let express = require('express')
let app = express()

const HOST = 'localhost'
const PORT = 80

const handler = function(req, res) {
  // console.log(req.url)
  fs.readFile(
    path.join(__dirname, '../dist/index.html'),
    'utf-8',
    (err, content) => {
      if (err) {
        console.log(`We cannot open ${req.url} file.`)
      }
      res.send(content)
    }
  )
}

app.get('/', handler)
app.get('/calendar', handler)
app.get('/transfert', handler)
app.get('/subtitles', handler)
app.get('/settings', handler)
app.get('/wizard', handler)

app.use(express.static(path.join(__dirname, '../dist')))

http.createServer(app).listen(PORT, () => {
  console.log(`Server listening on: http://${HOST}:${PORT}`)
})
