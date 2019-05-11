import Vue from "vue"
import Router from "vue-router"

const Dashboard = () => import("../pages/Dashboard.vue")

Vue.use(Router)

let router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: [{ path: "/", component: Dashboard }]
})

export default router
