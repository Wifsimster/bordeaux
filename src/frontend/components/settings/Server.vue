<template>
  <div class="min-w:full sm:min-w:sm">
    <alert color="red" v-if="error">{{ error }}</alert>
    <div>
      <div class="text:white text:3/2">Server</div>
      <div class="text:grey-dark">Restart needed at any change.</div>
      <form v-if="settings">
        <div class="relative my:3">
          <input
            id="host"
            type="text"
            v-model="settings.host"
            placeholder="localhost"
          />
          <label for="host">Host</label>
        </div>
        <div class="relative my:3">
          <input
            id="port"
            type="text"
            v-model="settings.port"
            placeholder="8080"
          />
          <label for="port">Port</label>
        </div>
        <div class="relative my:3">
          <select id="cron" v-model="settings.cron">
            <option :value="item.key" v-for="item in list" :key="item.key">{{
              item.value
            }}</option>
          </select>
          <label for="cron">Search new files every</label>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { isEmpty } from "plugins"
export default {
  computed: {
    message() {
      return this.$store.getters["webSocket/message"]
    }
  },
  data() {
    return {
      error: null,
      settings: null,
      list: [
        { key: "", value: "never" },
        { key: "* * */1 * *", value: "hour" },
        { key: "* * */2 * *", value: "2 hours" },
        { key: "* * */6 * *", value: "6 hours" },
        { key: "* * * */1 *", value: "day" }
      ]
    }
  },
  created() {
    this.getAll()
  },
  watch: {
    "settings.host"(newVal, oldVal) {
      this.update()
    },
    "settings.port"(newVal, oldVal) {
      this.update()
    },
    "settings.cron"(newVal, oldVal) {
      this.update()
    },
    message(data) {
      if (data.object === "server") {
        this.error = null
        switch (data.method) {
          case "getAll":
            if (data.error) {
              this.error = data.error
            } else {
              this.settings = Object.assign({}, data.results)
            }
            break
          case "update":
            if (data.error) {
              this.error = data.error
            } else {
              this.settings = Object.assign({}, data.results)
            }
            break
          default:
            console.log(`Unknow method : ${data.method}`)
        }
      }
    }
  },
  methods: {
    getAll() {
      this.$store.commit("webSocket/send", {
        object: "server",
        method: "getAll"
      })
    },
    update() {
      if (!isEmpty(this.settings)) {
        this.$store.commit("webSocket/send", {
          object: "server",
          method: "update",
          params: this.settings
        })
      }
    }
  }
}
</script>
