/* eslint-disable node/no-missing-import */
/* eslint-disable node/no-unsupported-features/es-syntax */
import Vue from 'vue'
import Router from 'vue-router'

const Dashboard = () => import('pages/Dashboard.vue')
const Wizard = () => import('pages/Wizard.vue')
const Calendar = () => import('pages/Calendar.vue')
const Transfert = () => import('pages/Transfert.vue')
const Subtitles = () => import('pages/Subtitles.vue')
const Activity = () => import('pages/Activity.vue')
const Settings = () => import('pages/Settings.vue')

const SettingsDirectory = () => import('components/settings/directory.vue')
const SettingsPlex = () => import('components/settings/plex.vue')
const SettingsServer = () => import('components/settings/server.vue')
const SettingsSubtitles = () => import('components/settings/subtitles.vue')
const SettingsTrakt = () => import('components/settings/trakt.vue')
const SettingsTransmission = () =>
  import('components/settings/transmission.vue')
const SettingsUpdate = () => import('components/settings/update.vue')

Vue.use(Router)

const router = new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: '/wizard', component: Wizard },
    { path: '/', components: Dashboard, meta: { requiresAuth: true } },
    { path: '/calendar', component: Calendar, meta: { requiresAuth: true } },
    { path: '/transfert', component: Transfert, meta: { requiresAuth: true } },
    { path: '/subtitles', component: Subtitles, meta: { requiresAuth: true } },
    { path: '/activity', component: Activity, meta: { requiresAuth: true } },
    {
      path: '/settings',
      component: Settings,
      meta: { requiresAuth: true },
      children: [
        { path: '', redirect: 'directory' },
        { path: 'directory', component: SettingsDirectory },
        { path: 'plex', component: SettingsPlex },
        { path: 'server', component: SettingsServer },
        { path: 'subtitles', component: SettingsSubtitles },
        { path: 'trakt', component: SettingsTrakt },
        { path: 'transmission', component: SettingsTransmission },
        { path: 'update', component: SettingsUpdate }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!localStorage.getItem('token')) {
      next({
        path: '/wizard',
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
