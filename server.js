const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 8080 })

console.log(`Web Socket server started !`)

const Download = require('./src/backend/channels/download')
const Transfert = require('./src/backend/channels/transfert')
const Subtitles = require('./src/backend/channels/subtitles')
const Transmission = require('./src/backend/channels/transmission')
const Show = require('./src/backend/channels/show')

wss.on('connection', function connection(ws, req) {
  console.log(`New connection : ${req.connection.remoteAddress}`)

  switch (req.url) {
    case `/`:
      console.log('Default channel')
      break
    case `/download`:
      new Download(ws)
      break
    case `/transfert`:
      new Transfert(ws)
      break
    case `/subtitles`:
      new Subtitles(ws)
      break
    case `/transmission`:
      new Transmission(ws)
      break
    case `/show`:
      new Show(ws)
      break
    default:
      console.error(`Unknow channel : ${req.url}`)
  }
})
