<template>
  <div v-if="!isWizard">
    <!--  Mobile desktop -->
    <div
      class="kebab flex justify:end sm:none text:white text:3/2 relative cursor:pointer"
      @click="displayKebab = true"
    ></div>
    <div
      class="absolute t:0 r:0 flex flex:col w:0 h:0 z:10 bg:black transition overflow:hidden"
      :class="{ 'w:full h:full': displayKebab }"
    >
      <div
        class="absolute t:0 r:0 text:3/2 cursor:pointer p:1"
        v-if="displayKebab"
        @click="displayKebab = false"
      >x</div>
      <router-link
        to="/"
        class="text:white text:3/2 p:1"
        exact-active-class="text:orange md:border:b:1/4 border:orange"
      >Dashboard</router-link>
      <router-link
        v-if="hasTrakt"
        to="/calendar"
        class="text:white text:3/2 p:1"
        exact-active-class="text:orange md:border:b:1/4 border:orange"
      >Calendar</router-link>
      <router-link
        to="/transfert"
        class="text:white text:3/2 p:1"
        exact-active-class="text:orange md:border:b:1/4 border:orange"
      >Transfert</router-link>
      <router-link
        to="/subtitles"
        class="text:white text:3/2 p:1"
        exact-active-class="text:orange md:border:b:1/4 border:orange"
      >Subtitles</router-link>
      <router-link
        to="/settings"
        class="text:white text:3/2 p:1"
        exact-active-class="text:orange md:border:b:1/4 border:orange"
      >Settings</router-link>
    </div>

    <!-- Desktop menu -->
    <div class="none md:flex flex:wrap items:center justify:center">
      <router-link
        to="/"
        class="text:white text:3/2 py:1"
        exact-active-class="border:b:1/4 border:orange"
      >Dashboard</router-link>
      <router-link
        v-if="hasTrakt"
        to="/calendar"
        class="text:white text:3/2 py:1"
        exact-active-class="border:b:1/4 border:orange"
      >Calendar</router-link>
      <router-link
        to="/transfert"
        class="text:white text:3/2 py:1"
        exact-active-class="border:b:1/4 border:orange"
      >Transfert</router-link>
      <router-link
        to="/subtitles"
        class="text:white text:3/2 py:1"
        exact-active-class="border:b:1/4 border:orange"
      >Subtitles</router-link>
      <router-link
        to="/settings"
        class="text:white text:3/2 py:1"
        exact-active-class="border:b:1/4 border:orange"
      >Settings</router-link>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    message() {
      return this.$store.getters["webSocket/message"];
    },
    isWizard() {
      return this.$route.path === `/wizard`;
    }
  },
  data() {
    return {
      hasTrakt: false,
      displayKebab: false
    };
  },
  created() {
    this.getTrakt();
  },
  methods: {
    getTrakt() {
      this.$store.commit("webSocket/send", {
        object: "trakt",
        method: "getAll"
      });
    }
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
              let settings = Object.assign({}, data.results);
              this.hasTrakt =
                settings.code && settings.accessToken && settings.refreshToken;
            }
            break;
          case "update":
            this.getTrakt();
            break;
        }
      }
    },
    $route() {
      this.displayKebab = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.kebab:after {
  content: "\2807";
}
</style>