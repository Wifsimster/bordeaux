const Petrus = require("petrus")
const Medoc = require("medoc")
const Yquem = require("yquem")

const config = require("./transmission-config")
const shows = require("./shows")

const PATH_TO_SCAN = `w:`
const PATH_TO_PUSH = `z:`

// Grab magnet links from TPB
const petrus = new Petrus(config)

petrus.run(shows)

// TODO : Add promise resolve to chain Medoc and Yquem

// Move downloaded files from a/ to b/
// Medoc.run(PATH_TO_SCAN, PATH_TO_PUSH)

// Search and download subtitles for recents episodes
// Yquem.run(PATH_TO_PUSH, 1)
