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
