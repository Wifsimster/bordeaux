<template>
  <div class="min-w:full sm:min-w:sm">
    <alert color="red" v-if="error">{{ error }}</alert>
    <div>
      <div class="text:white text:3/2">Update</div>
      <div class="text:grey-dark">Restart needed at any change.</div>
      <div v-if="settings">
        <div class="relative my:3">
          <input id="enable" type="checkbox" v-model="settings.enable" />
          <label for="enable">Automatic update</label>
        </div>
        <div class="relative my:3">
          <select id="cron" v-model="settings.cron">
            <option :value="item.key" v-for="item in list" :key="item.key">{{
              item.value
            }}</option>
          </select>
          <label for="cron">Check for update every</label>
        </div>
        <div class="relative my:3">
          <btn @click="pull()">Manual check</btn>
        </div>
        <div class="relative">Version : {{ version }}</div>
        <div class="relative">Build date : {{ buildDate }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { isEmpty } from 'plugins'
import parseISO from 'date-fns/parseISO'
import format from 'date-fns/format'

export default {
  computed: {
    message() {
      return this.$store.getters['webSocket/message']
    }
  },
  data() {
    return {
      error: null,
      settings: null,
      list: [
        { key: '* * */1 * *', value: 'hour' },
        { key: '* * */2 * *', value: '2 hours' },
        { key: '* * */6 * *', value: '6 hours' },
        { key: '* * * */1 *', value: 'day' },
        { key: '* * * */7 *', value: 'week' }
      ],
      version: VERSION,
      buildDate: format(parseISO(BUILD_DATE), 'MM/dd/yyyy HH:mm:ss')
    }
  },
  created() {
    this.getAll()
  },
  watch: {
    'settings.enable'(newVal, oldVal) {
      this.update()
    },
    'settings.cron'(newVal, oldVal) {
      this.update()
    },
    message(data) {
      if (data.object === 'git') {
        this.error = null
        switch (data.method) {
        case 'getAll':
          if (data.error) {
            this.error = data.error
          } else {
            this.settings = Object.assign({}, data.results)
          }
          break
        case 'update':
          if (data.error) {
            this.error = data.error
          } else {
            this.settings = Object.assign({}, data.results)
          }
          break
        case 'pull':
          if (data.error) {
            this.error = data.error
          } else {
            this.$store.dispatch('notification/add', {
              type: 'success',
              message: data.results
            })
          }
          break
        default:
          console.log(`Unknow method : ${data.method}`)
        }
      }
    }
  },
  methods: {
    pull() {
      this.$store.commit('webSocket/send', {
        object: 'git',
        method: 'pull'
      })
    },
    getAll() {
      this.$store.commit('webSocket/send', {
        object: 'git',
        method: 'getAll'
      })
    },
    update() {
      if (!isEmpty(this.settings)) {
        this.$store.commit('webSocket/send', {
          object: 'git',
          method: 'update',
          params: this.settings
        })
      }
    }
  }
}
</script>
