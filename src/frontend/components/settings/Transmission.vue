<template>
  <div>
    <div>
      <div class="text:3/2">
        Transmission
        <span
          v-if="testOk"
          class="inline-block rounded:full bg:green ml:1/4 p:1/3 align:middle"
        ></span>
        <span v-else class="inline-block rounded:full bg:red ml:1/4 p:1/3 align:middle"></span>
      </div>
      <div class="text:grey-dark">Needed to add magnetlink from The Pirate Bay.</div>
      <form v-if="settings">
        <div class="relative mx:2">
          <input id="transmission_host" v-model="settings.host" placeholder="localhost" />
          <label for="transmission_host">Host</label>
        </div>
        <div class="relative mx:2">
          <input id="transmission_port" type="number" v-model="settings.port" placeholder="9091" />
          <label for="transmission_port">Port</label>
        </div>
        <div class="relative mx:2">
          <input id="transmission_username" v-model="settings.username" placeholder="Eliot" />
          <label for="transmission_username">Username</label>
        </div>
        <div class="relative mx:2">
          <input
            id="transmission_password"
            type="password"
            v-model="encryptedPassword"
            placeholder="M3gA_Pa22w0rD!"
          />
          <label for="transmission_password">Password</label>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import CryptoJS from "crypto-js";
export default {
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
            console.warn(`[Transmission] Password cannot be decrypt : ${e}`);
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
    "settings.host"() {
      this.update();
      this.test();
    },
    "settings.port"() {
      this.update();
      this.test();
    },
    "settings.username"() {
      this.update();
      this.test();
    },
    "settings.password"() {
      this.update();
      this.test();
    },
    message(data) {
      if (data.object === "transmission") {
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
          case "sessionStats":
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
        object: "transmission",
        method: "getAll"
      });
    },
    update() {
      this.$store.commit("webSocket/send", {
        object: "transmission",
        method: "update",
        params: this.settings
      });
    },
    test() {
      if (this.settings) {
        this.testOk = null;
        this.$store.commit("webSocket/send", {
          object: "transmission",
          method: "sessionStats",
          params: { uuid: UUID }
        });
      }
    }
  }
};
</script>
