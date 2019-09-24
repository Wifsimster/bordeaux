<template>
  <modal :show="true">
    <template #content>
      <div class="p:1">
        <div class="text:3/2 text:center">Authentification code</div>
        <alert color="red" v-if="error">{{ error }}</alert>
        <div v-if="results">
          <div class="px:1 text:2 text:bold text:center">{{ results.user_code }}</div>
          <div class="text:center">
            1. Enter your code here :
            <a
              :href="results.verification_url"
              target="_blank"
              class="text:white underline"
            >Verification</a>
          </div>
          <div class="text:center mx:1">2. Click "It's done"</div>
          <div class="flex flex:wrap justify:end items:baseline mt:2">
            <a @click="$emit('close')" class="cursor:pointer">Cancel</a>
            <btn @click="$emit('request', results)" class="ml:1">It's done</btn>
          </div>
        </div>
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
