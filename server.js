// const Petrus = require("petrus")
const Medoc = require("medoc")
const Yquem = require("yquem")

const config = require("./transmission-config")
// const shows = require("./shows")

const PATH_TO_SCAN = `w:`
const PATH_TO_PUSH = `z:`

// Grab magnet links from TPB
// const petrus = new Petrus(config)
// petrus.run(shows)

// Move downloaded files from a/ to b/
const medoc = new Medoc(PATH_TO_SCAN, PATH_TO_PUSH)

medoc
  .run()
  .then(() => {
    // Search and download subtitles for recents episodes
    Yquem.run(PATH_TO_PUSH)
      .then(() => {})
      .catch(err => {
        console.error(err)
      })
  })
  .catch(err => {
    console.error(err)
  })
