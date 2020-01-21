<template>
  <div class="bg:black text:white h:screen w:screen overflow:hidden">
    <transition name="opacity">
      <div
        class="fixed b:0 l:0 r:0 bg:grey-darkest flex justify:center py:1 shadow:large z:10 flex items:center"
        v-if="isMobile && isPWAPromptTrigger"
      >
        <div class="flex:1 flex justify:center">
          <btn @click="addToHomeScreen">Add to home screen</btn>
        </div>
        <div
          class="mr:1 py:1/2 cursor:pointer text:2"
          @click="isPWAPromptTrigger = false"
        >
          x
        </div>
      </div>
    </transition>

    <div class="flex flex:col h:screen">
      <nav class="flex justify:between items:baseline flex:wrap w:screen">
        <logo></logo>
        <navigation></navigation>
      </nav>
      <main class="h:11/12 overflow-y:auto overflow-x:hidden">
        <notification></notification>
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </main>
    </div>
  </div>
</template>

<script>
import { isMobile } from 'plugins'

const Navigation = () => import('components/navigation.vue')
const Logo = () => import('components/logo.vue')
const Notification = () => import('components/notification.vue')
export default {
  components: {
    Navigation,
    Logo,
    Notification
  },
  data() {
    return {
      isPWAPromptTrigger: false
    }
  },
  computed: {
    isMobile() {
      return isMobile()
    }
  },
  created() {
    this.connect()
    this.isPWA()
  },
  methods: {
    // Detect installation prompt for PWA
    isPWA() {
      window.addEventListener('beforeinstallprompt', e => {
        e.preventDefault()
        this.isPWAPromptTrigger = e
      })
    },
    addToHomeScreen() {
      this.isPWAPromptTrigger.userChoice.then()
    },
    connect() {
      this.$store.dispatch(
        'webSocket/ws',
        new WebSocket(`ws://${location.hostname}:8080`)
      )
    }
  }
}
</script>

<style lang="scss">
@import "~scss/app";
</style>
