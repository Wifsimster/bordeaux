const Activity = require("../channels/activity")

class Logger {
  constructor() {}

  static info(object, message) {
    Activity.response({
      method: "add",
      params: {
        type: "info",
        object: object,
        message: message
      }
    })
  }

  static warn(object, message) {
    Activity.response({
      method: "add",
      params: {
        type: "warn",
        object: object,
        message: message
      }
    })
  }

  static error(object, message) {
    Activity.response({
      method: "add",
      params: {
        type: "error",
        object: object,
        message: message
      }
    })
  }
}

module.exports = Logger
