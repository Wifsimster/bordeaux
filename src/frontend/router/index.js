import Vue from "vue"
import Router from "vue-router"

const Dashboard = () => import("../pages/Dashboard.vue")
const Wizard = () => import("../pages/Wizard.vue")
const Calendar = () => import("../pages/Calendar.vue")
const Transfert = () => import("../pages/Transfert.vue")
const Subtitles = () => import("../pages/Subtitles.vue")
const Settings = () => import("../pages/Settings.vue")
const Activity = () => import("../pages/Activity.vue")
Vue.use(Router)

const router = new Router({
  mode: "history",
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: "/wizard", component: Wizard },
    { path: "/", components: Dashboard, meta: { requiresAuth: true } },
    { path: "/calendar", component: Calendar, meta: { requiresAuth: true } },
    { path: "/transfert", component: Transfert, meta: { requiresAuth: true } },
    { path: "/subtitles", component: Subtitles, meta: { requiresAuth: true } },
    { path: "/settings", component: Settings, meta: { requiresAuth: true } },
    { path: "/activity", component: Activity, meta: { requiresAuth: true } }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!localStorage.getItem("token")) {
      next({
        path: "/wizard",
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
