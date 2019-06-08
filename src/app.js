import Vue from "vue"
import App from "./pages/App.vue"
import router from "./router"

import Alert from "Components/Alert.vue"
import Button from "Components/Button.vue"
import Card from "Components/Card.vue"

Vue.component("Alert", Alert)
Vue.component("Btn", Button)
Vue.component("Card", Card)

new Vue({
  el: "#app",
  router,
  render: h => h(App)
})
