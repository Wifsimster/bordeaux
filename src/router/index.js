import Vue from "vue"
import Router from "vue-router"

const Dashboard = () => import("../pages/Dashboard.vue")
const Download = () => import("../pages/Download.vue")
const Transfert = () => import("../pages/Transfert.vue")
const Subtitles = () => import("../pages/Subtitles.vue")

Vue.use(Router)

let router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: "/", component: Dashboard },
    { path: "/download", component: Download },
    { path: "/transfert", component: Transfert },
    { path: "/subtitles", component: Subtitles }
  ]
})

export default router