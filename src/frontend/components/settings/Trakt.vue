<template>
  <div>
    <alert color="red" v-if="error">{{ error }}</alert>
    <div class="px:1">
      <div class="text:white text:3/2">
        Trakt
        <span
          v-if="this.settings.accessToken && this.settings.refreshToken"
          class="inline-block rounded:full bg:green ml:1/4 p:1/3 align:middle"
        ></span>
        <span v-else class="inline-block rounded:full bg:red ml:1/4 p:1/3 align:middle"></span>
      </div>
      <div>Used to build the calendar.</div>
      <div class="flex flex:wrap justify:center">
        <btn @click="generateDeviceTokenShow = true">Generate an access code</btn>
      </div>
    </div>

    <generate-device-token
      v-if="generateDeviceTokenShow"
      @request="onRequest"
      @close="generateDeviceTokenShow = false"
    ></generate-device-token>

    <check-device-token
      v-if="checkDeviceTokenShow"
      :request="request"
      @token="onToken"
      @close="checkDeviceTokenShow = false"
    ></check-device-token>
  </div>
</template>

<script>
import GenerateDeviceToken from "components/settings/GenerateDeviceToken.vue";
import CheckDeviceToken from "components/settings/CheckDeviceToken.vue";
export default {
  name: "Trakt",
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
              this.isValid();
            }
            break;
          case "update":
            if (data.error) {
              this.error = data.error;
            } else {
              this.settings = Object.assign({}, data.results);
              this.isValid();
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
    },
    isValid() {
      this.$emit(
        "is-valid",
        this.settings.code &&
          this.settings.accessToken &&
          this.settings.refreshToken
      );
    }
  }
};
</script>
