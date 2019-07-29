<template>
  <modal>
    <template #header>Authentification code</template>
    <template #content v-if="results">
      <alert color="red" v-if="error">{{ error }}</alert>
      <div class="text:3/2 text:bold text:center">{{ results.user_code }}</div>
      <div class="text:center">
        Enter your code :
        <a
          :href="results.verification_url"
          target="_blank"
          class="text:white"
        >Verification URL</a>
      </div>
      <div class="text:center mt:2">
        <btn @click="$emit('request', results)" class="mr:1">It's done</btn>
        <a @click="$emit('close')" href class="text:white">Cancel</a>
      </div>
    </template>
  </modal>
</template>

<script>
export default {
  computed: {
    message() {
      return this.$store.getters["webSocket/message"];
    }
  },
  data() {
    return {
      error: null,
      results: null
    };
  },
  created() {
    this.getDeviceCode();
  },
  watch: {
    message(data) {
      if (data.object === "trakt") {
        this.error = null;
        switch (data.method) {
          case "getDeviceCode":
            if (data.error) {
              this.error = data.error;
            } else {
              this.results = Object.assign({}, data.results);
            }
            break;
        }
      }
    }
  },
  methods: {
    getDeviceCode() {
      this.$store.commit("webSocket/send", {
        object: "trakt",
        method: "getDeviceCode"
      });
    }
  }
};
</script>
