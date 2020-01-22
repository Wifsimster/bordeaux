import Vue from 'vue'

import App from 'pages/App.vue'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'

import Alert from 'components/Alert.vue'
import Button from 'components/Button.vue'
import Card from 'components/Card.vue'
import Loader from 'components/Loader.vue'
import Modal from 'components/Modal.vue'

Vue.component('Alert', Alert)
Vue.component('Btn', Button)
Vue.component('Card', Card)
Vue.component('Loader', Loader)
Vue.component('Modal', Modal)

Vue.use(VueLazyload)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

// Service Workers for PWA
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/service-worker.js')
    .then(function(reg) {
      console.log('◕‿◕', reg)
    })
    .catch(function(err) {
      console.log('ಠ_ಠ', err)
    })
} else {
  console.error('Service workers can\'t load here !')
}
