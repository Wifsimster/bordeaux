const Petrus = require("petrus")
const Medoc = require("medoc")
const Yquem = require("yquem")

const config = require("./transmission-config")
const shows = require("./shows")

const PATH_TO_SCAN = `w:`
const PATH_TO_PUSH = `z:`

const petrus = new Petrus(config)
const medoc = new Medoc(PATH_TO_SCAN, PATH_TO_PUSH)
const yquem = new Yquem(PATH_TO_PUSH)

// const action = `download`
const action = `move`
// const action = `subtitles`

switch (action) {
  case `download`:
    petrus
      .run(shows)
      .then(results => {
        console.log(results)
      })
      .catch(err => {
        console.error(err)
      })
    break
  case "move":
    medoc
      .run()
      .then(results => {
        console.log(results)
      })
      .catch(err => {
        console.error(err)
      })
    break
  case `subtitles`:
    yquem
      .run()
      .then(results => {
        console.log(results)
      })
      .catch(err => {
        console.error(err)
      })
    break
}
