<template>
  <div class="min-w:full sm:min-w:sm">
    <alert color="red" v-if="error">{{ error }}</alert>
    <div>
      <div class="text:white text:3/2">
        Trakt
        <span
          v-if="this.settings.accessToken && this.settings.refreshToken"
          class="inline-block rounded:full bg:green ml:1/4 p:1/3 align:middle"
        ></span>
        <span v-else class="inline-block rounded:full bg:red ml:1/4 p:1/3 align:middle"></span>
      </div>
      <div class="text:grey-dark">Used to build the calendar.</div>
      <div class="mx:2">
        1. Create a new application on
        <a
          target="__blank"
          href="https://trakt.tv/oauth/applications"
          class="underline"
        >Trakt.tv</a>
      </div>
      <div class="mx:2">2. Insert your client id and secret :</div>
      <div class="relative mx:2">
        <input id="trakt_id" v-model="settings.clientID" placeholder="Client ID" />
        <label for="trakt_id">Client ID</label>
      </div>
      <div class="relative mx:2">
        <input id="trakt_secret" v-model="settings.clientSecret" placeholder="Client Secret" />
        <label for="trakt_secret">Client Secret</label>
      </div>
      <div>3. Generate your access code :</div>
      <div class="flex flex:wrap justify:center mt:1">
        <btn @click="generateDeviceTokenShow = true">Generate my access code</btn>
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
    "settings.clientID"() {
      this.update();
    },
    "settings.clientSecret"() {
      this.update();
    },
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
