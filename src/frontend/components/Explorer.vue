<template>
  <modal size="max-w:lg" :show="true" @close="$emit('close')">
    <template #content>
      <alert color="red" v-if="error">{{ error }}</alert>
      <div class="m:1 border rounded p:1">{{ baseUrl }}</div>
      <div class="flex flex:col m:1">
        <div
          @click="previous()"
          class="hover:bg:grey-darkest cursor:pointer py:1/4 px:1/2 transition"
        >
          ...
        </div>
        <div
          v-for="item in directories"
          :key="item"
          @click="getDirectories(item)"
          class="hover:bg:grey-darkest cursor:pointer py:1/4 px:1/2 transition"
        >
          {{ item }}
        </div>
      </div>
      <div class="flex flex:row-reverse items:baseline m:1">
        <btn @click="$emit('selected', root)" class="ml:1">Save</btn>
        <a @click="$emit('close')" class="cursor:pointer">Close</a>
      </div>
    </template>
  </modal>
</template>

<script>
export default {
  name: "Explorer",
  data() {
    return {
      error: null,
      directories: [],
      root: null
    }
  },
  computed: {
    message() {
      return this.$store.getters["webSocket/message"]
    },
    baseUrl() {
      if (this.root) {
        return this.root
      }
    }
  },
  created() {
    this.getRoot()
  },
  watch: {
    root() {
      this.getDirectories()
    },
    message(data) {
      if (data.object === "explorer") {
        this.error = null
        switch (data.method) {
          case "getRoot":
            if (data.error) {
              this.error = data.error
            } else {
              this.root = data.results
            }
            break
          case "getDirectories":
            if (data.error) {
              this.error = data.error
            } else {
              this.directories = Object.assign({}, data.results)
            }
            break
        }
      }
    }
  },
  methods: {
    previous() {
      var array = this.root.split("/")
      if (array.length > 2) {
        array.splice(array.length - 2, 1)
        this.root = array.join("/")
      }
    },
    getRoot() {
      this.$store.commit("webSocket/send", {
        object: "explorer",
        method: "getRoot"
      })
    },
    getDirectories(item) {
      if (item) {
        if (this.root) {
          this.root += `${item}/`
        } else {
          this.root = item
        }
      }

      this.$store.commit("webSocket/send", {
        object: "explorer",
        method: "getDirectories",
        params: { root: this.root }
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
