<template>
  <div>
    <div class="px:1">
      <div class="text:white text:3/2">
        Plex
        <span
          v-if="testOk"
          class="inline-block rounded:full bg:green ml:1/4 p:1/3 align:middle"
        ></span>
        <span v-else class="inline-block rounded:full bg:red ml:1/4 p:1/3 align:middle"></span>
      </div>
      <div>Used to get your collected and watched episodes.</div>
      <form v-if="settings">
        <div class="relative mx:2">
          <input id="plex_username" v-model="settings.username" placeholder="Eliot" />
          <label for="plex_username">Username</label>
        </div>
        <div class="relative mx:2">
          <input
            id="plex_password"
            type="password"
            v-model="encryptedPassword"
            placeholder="M3gA_Pa22w0rD!"
          />
          <label for="plex_password">Password</label>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import CryptoJS from "crypto-js";
export default {
  name: "Plex",
  computed: {
    message() {
      return this.$store.getters["webSocket/message"];
    },
    encryptedPassword: {
      get() {
        if (this.settings.password) {
          const bytes = CryptoJS.AES.decrypt(this.settings.password, UUID);
          return bytes.toString(CryptoJS.enc.Utf8);
        }
      },
      set(val) {
        this.$set(
          this.settings,
          "password",
          CryptoJS.AES.encrypt(val, UUID).toString()
        );
      }
    }
  },
  data() {
    return {
      error: null,
      settings: null,
      testOk: null
    };
  },
  created() {
    this.getAll();
    this.test();
  },
  watch: {
    "settings.username"() {
      this.update();
      this.test();
    },
    "settings.password"() {
      this.update();
      this.test();
    },
    message(data) {
      if (data.object === "plex") {
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
          case "signin":
            if (data.error) {
              this.error = data.error;
              this.$emit("is-valid", false);
            } else {
              this.testOk = true;
              this.$emit("is-valid", true);
            }
            break;
          default:
            console.log(`Unknow method : ${data.method}`);
        }
      }
    }
  },
  methods: {
    getAll() {
      this.$store.commit("webSocket/send", {
        object: "plex",
        method: "getAll"
      });
    },
    update() {
      this.$store.commit("webSocket/send", {
        object: "plex",
        method: "update",
        params: this.settings
      });
    },
    test() {
      this.testOk = null;
      this.$store.commit("webSocket/send", {
        object: "plex",
        method: "signin"
      });
    }
  }
};
</script>
