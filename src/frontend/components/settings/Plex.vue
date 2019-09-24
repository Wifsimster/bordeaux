<template>
  <div class="min-w:full sm:min-w:sm">
    <div class="text:white text:3/2">
      Plex
      <span
        v-if="isConnected"
        class="inline-block rounded:full bg:green ml:1/4 p:1/3 align:middle"
      ></span>
      <span v-else class="inline-block rounded:full bg:red ml:1/4 p:1/3 align:middle"></span>
    </div>
    <div class="text:grey-dark">Used to get your collected and watched episodes.</div>

    <alert v-if="error" color="red">{{ error }}</alert>

    <div v-if="settings">
      <div v-if="!isConnected">
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
      </div>
      <div v-else class="pt:2">
        Connected as {{ this.settings.username }}
        <btn class="ml:1" @click="reset()">Signout</btn>
      </div>

      <div class="relative mx:2">
        <input
          id="synchronizeAfterTransfert"
          type="checkbox"
          v-model="settings.synchronizeAfterTransfert"
        />
        <label for="synchronizeAfterTransfert">Synchronize after transfert</label>
      </div>
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
    isConnected() {
      return this.settings && this.settings.token;
    },
    encryptedPassword: {
      get() {
        if (this.settings.password) {
          try {
            const bytes = CryptoJS.AES.decrypt(this.settings.password, UUID);
            return bytes.toString(CryptoJS.enc.Utf8);
          } catch (e) {
            console.warn(`[Plex] Password cannot be decrypt : ${e}`);
          }
        }
      },
      set(val) {
        if (val) {
          this.$set(
            this.settings,
            "password",
            CryptoJS.AES.encrypt(val, UUID).toString()
          );
        } else {
          this.settings.password = "";
        }
      }
    }
  },
  data() {
    return {
      error: null,
      settings: null,
      timeout: null
    };
  },
  created() {
    this.getAll();
  },
  watch: {
    "settings.username"() {
      this.update();
      this.debounce(() => {
        this.signin();
      }, 2000);
    },
    "settings.password"() {
      this.update();
      this.debounce(() => {
        this.signin();
      }, 2000);
    },
    "settings.synchronizeAfterTransfert"() {
      this.update();
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
              this.$emit("is-valid", false);
            } else {
              this.$emit("is-valid", true);
              this.getAll();
            }
            break;
          default:
            console.log(`Unknow method : ${data.method}`);
        }
      }
    }
  },
  methods: {
    debounce(func, wait) {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }

      this.timeout = setTimeout(() => {
        console.log("Debounce after", wait);
        func.apply(this);
      }, wait);
    },
    reset() {
      this.settings.username = null;
      this.settings.password = null;
      this.settings.token = null;
      this.update();
    },
    getAll() {
      this.$store.commit("webSocket/send", {
        object: "plex",
        method: "getAll"
      });
    },
    update() {
      if (this.settings) {
        this.$store.commit("webSocket/send", {
          object: "plex",
          method: "update",
          params: this.settings
        });
      }
    },
    signin() {
      if (
        this.settings &&
        this.settings.password &&
        this.settings.password.length > 3
      ) {
        this.$store.commit("webSocket/send", {
          object: "plex",
          method: "signin",
          params: { uuid: UUID }
        });
      }
    }
  }
};
</script>
