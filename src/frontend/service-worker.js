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
  this.console.log("onactivate", event)
}

self.onfetch = function(event) {
  this.console.log("onfetch", event)
}

// Google Photos
// self.document = self;
// self.window = self;
// self.window.SW_global_data = {
//     "Pk2k0d": "/_/PhotosUi/jserror"
// };
// self.window._DumpException = function(e) {
//     throw e;
// }
// ;
// importScripts('\/_\/scs\/social-static\/_\/js\/k\x3dboq.PhotosServiceWorker.fr.iotzUVbJKp8.es5.O\/am\x3dIA\/d\x3d1\/rs\x3dAGLTcCNOZarwhwUrJEiZ3MqI6d9pEo7BNA\/m\x3dbase');
