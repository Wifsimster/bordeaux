<template>
  <div>
    <div class="px:1">
      <div class="text:3/2">
        Transmission
        <span
          v-if="testOk"
          class="inline-block rounded:full bg:green ml:1/4 p:1/3 align:middle"
        ></span>
        <span v-else class="inline-block rounded:full bg:red ml:1/4 p:1/3 align:middle"></span>
      </div>
      <div>Needed to add magnetlink from The Pirate Bay.</div>
      <form v-if="settings">
        <input v-model="settings.host" placeholder="Host" />
        <input type="number" v-model="settings.port" placeholder="Port" />
        <input v-model="settings.username" placeholder="Username" />
        <input type="password" v-model="encryptedPassword" placeholder="Password" />
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
      this.testOk = null;
      this.$store.commit("webSocket/send", {
        object: "transmission",
        method: "sessionStats",
        params: this.settings
      });
    }
  }
};
</script>
