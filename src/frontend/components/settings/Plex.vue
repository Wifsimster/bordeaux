<template>
  <div class="min-w:full sm:min-w:sm">
    <div class="text:white text:3/2">
      Plex
      <span v-if="testOk" class="inline-block rounded:full bg:green ml:1/4 p:1/3 align:middle"></span>
      <span v-else class="inline-block rounded:full bg:red ml:1/4 p:1/3 align:middle"></span>
    </div>
    <div class="text:grey-dark">Used to get your collected and watched episodes.</div>
    <form v-if="settings">
      <div class="relative mx:2">
        <input id="plex_username" v-model="settings.username" placeholder="Eliot" @blur="test()" />
        <label for="plex_username">Username</label>
      </div>
      <div class="relative mx:2">
        <input
          id="plex_password"
          type="password"
          v-model="encryptedPassword"
          placeholder="M3gA_Pa22w0rD!"
          @blur="test()"
        />
        <label for="plex_password">Password</label>
      </div>
      <div class="relative mx:2">
        <input
          id="synchronizeAfterTransfert"
          type="checkbox"
          v-model="settings.synchronizeAfterTransfert"
        />
        <label for="synchronizeAfterTransfert">Synchronize after transfert</label>
      </div>
    </form>
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
    },
    "settings.password"() {
      this.update();
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
              this.test();
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
      if (this.settings) {
        this.$store.commit("webSocket/send", {
          object: "plex",
          method: "update",
          params: this.settings
        });
      }
    },
    test() {
      if (
        this.settings &&
        this.settings.password &&
        this.settings.password.length > 3
      ) {
        this.testOk = null;
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
