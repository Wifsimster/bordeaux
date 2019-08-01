import Vue from 'vue'
import Router from 'vue-router'

const Dashboard = () => import('../pages/Dashboard.vue')
const Calendar = () => import('../pages/Calendar.vue')
const Transfert = () => import('../pages/Transfert.vue')
const Subtitles = () => import('../pages/Subtitles.vue')
const Settings = () => import('../pages/Settings.vue')
Vue.use(Router)

let router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: '/', component: Dashboard },
    { path: '/calendar', component: Calendar },
    { path: '/transfert', component: Transfert },
    { path: '/subtitles', component: Subtitles },
    { path: '/settings', component: Settings }
  ]
})

export default router
