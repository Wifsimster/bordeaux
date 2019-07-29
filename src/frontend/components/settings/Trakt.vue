<template>
  <div class="min-w:xs max-w:sm">
    <alert color="red" v-if="error">{{ error }}</alert>
    <div class="p:1">
      <div class="text:white text:3/2">Trakt</div>
      <form v-if="settings">
        <input type="text" v-model="settings.code" placeholder="code" readonly />
        <input type="text" v-model="settings.accessToken" placeholder="accessToken" readonly />
        <input type="text" v-model="settings.refreshToken" placeholder="refreshToken" readonly />
        <btn @click="generateDeviceTokenShow = true">Generate</btn>
      </form>
    </div>
    <generate-device-token v-if="generateDeviceTokenShow" @request="onRequest" @close="onClose"></generate-device-token>
    <check-device-token v-if="checkDeviceTokenShow" :request="request" @token="onToken"></check-device-token>
  </div>
</template>

<script>
import GenerateDeviceToken from "components/settings/GenerateDeviceToken.vue";
import CheckDeviceToken from "components/settings/CheckDeviceToken.vue";
export default {
  computed: {
    message() {
      return this.$store.getters["webSocket/message"];
    }
  },
  components: {
    GenerateDeviceToken,
    CheckDeviceToken
  },
  data() {
    return {
      error: null,
      settings: {},
      generateDeviceTokenShow: false,
      checkDeviceTokenShow: false,
      request: null
    };
  },
  created() {
    this.getAll();
  },
  watch: {
    message(data) {
      if (data.object === "trakt") {
        this.error = null;
        switch (data.method) {
          case "getAll":
            if (data.error) {
              this.error = data.error;
            } else {
              this.settings = Object.assign({}, data.results);
            }
            break;
          case "update":
            if (data.error) {
              this.error = data.error;
            } else {
              this.settings = Object.assign({}, data.results);
            }
            break;
          default:
            console.log(data.method);
        }
      }
    }
  },
  methods: {
    onRequest(request) {
      this.generateDeviceTokenShow = false;
      this.checkDeviceTokenShow = true;

      this.request = request;

      this.settings.code = request.device_code;
      this.update();
    },
    onClose() {
      this.generateDeviceTokenShow = false;
    },
    onToken(request) {
      this.checkDeviceTokenShow = false;

      this.settings.accessToken = request.access_token;
      this.settings.refreshToken = request.refresh_token;
      this.update();
    },
    getAll() {
      this.$store.commit("webSocket/send", {
        object: "trakt",
        method: "getAll"
      });
    },
    update() {
      this.$store.commit("webSocket/send", {
        object: "trakt",
        method: "update",
        params: this.settings
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../../node_modules/beta-scss/scss/global";

input {
  height: 36px;
  caret-color: map-get($colors, "blue-dark");
  @extend .w\:full;
  @extend .text\:1;
  @extend .text\:grey;
  @extend .bg\:transparent;
  @extend .border\:b;
  @extend .border\:grey;
  @extend .placeholder\:grey-dark;
  @extend .mx\:1;
  @extend .block;
}
</style>
