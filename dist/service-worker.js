self.oninstall = function(event) {
  // event.waitUntil(
  //   caches.open("hexagone").then(function(cache) {
  //     return cache.addAll([
  //       "/css/whatever-v3.css",
  //       "/css/imgs/sprites-v6.png",
  //       "/css/fonts/whatever-v8.woff",
  //       "/js/all-min-v4.js"
  //       // etc
  //     ])
  //   })
  // )
}

self.onactivate = function(event) {
  // this.console.log("onactivate", event)
}

self.onfetch = function(event) {
  // this.console.log("onfetch", event)
}
