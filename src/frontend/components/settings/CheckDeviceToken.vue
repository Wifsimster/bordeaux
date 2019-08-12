<template>
  <modal :show="true">
    <template #content>
      <div class="p:1">
        <div class="text:3/2 text:center">Check token</div>
        <alert color="red" v-if="error">{{ error }}</alert>
        <loading :is-loading="isLoading"></loading>
        <div class="flex flex:wrap justify:end items:baseline mt:2">
          <a @click="$emit('close')" class="cursor:pointer">Cancel</a>
          <btn @click="check()" class="ml:1">Retry</btn>
        </div>
      </div>
    </template>
  </modal>
</template>

<script>
import Loading from "components/Loading.vue";
export default {
  computed: {
    message() {
      return this.$store.getters["webSocket/message"];
    }
  },
  components: {
    Loading
  },
  props: {
    request: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      error: null,
      timer: null,
      isLoading: false
    };
  },
  created() {
    this.check();
  },
  methods: {
    check() {
      this.isLoading = true;

      this.timer = setInterval(() => {
        this.$store.commit("webSocket/send", {
          object: "trakt",
          method: "checkDeviceAuthorization",
          params: { code: this.request.device_code }
        });
      }, this.request.interval * 1000);

      // Kill poll
      setTimeout(() => {
        clearInterval(this.timer);
        this.isLoading = false;
      }, this.request.expires_in * 1000);
    }
  },
  watch: {
    message(data) {
      if (data.object === "trakt") {
        this.error = null;
        switch (data.method) {
          case "checkDeviceAuthorization":
            this.isLoading = false;
            if (data.error) {
              this.error = data.error;
            } else {
              clearInterval(this.timer);
              this.$emit("token", data.results);
            }
            break;
        }
      }
    }
  }
};
</script>

