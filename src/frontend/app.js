import Vue from 'vue'
import App from 'pages/App.vue'
import router from './router'
import VueLazyload from 'vue-lazyload'

import Alert from 'components/Alert.vue'
import Button from 'components/Button.vue'
import Card from 'components/Card.vue'
import Loader from 'components/Loader.vue'

Vue.component('Alert', Alert)
Vue.component('Btn', Button)
Vue.component('Card', Card)
Vue.component('Loader', Loader)

Vue.use(VueLazyload)

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
