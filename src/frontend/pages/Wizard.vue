<template>
  <div class="max-w:md my:auto">
    <div
      class="fixed t:0 l:0 max-w:full bg:orange transition mb:2"
      style="height:2px"
      :style="width"
    ></div>

    <transition name="slide:right" mode="out-in">
      <div v-if="step === 1" key="1">
        <directory @is-valid="e => isDirectoryValid = e"></directory>
      </div>
      <div v-if="step === 2" key="2">
        <transmission @is-valid="e => isTransmissionValid = e"></transmission>
      </div>
      <div v-if="step === 3" key="3">
        <plex @is-valid="e => isPlexValid = e"></plex>
      </div>
      <div v-if="step === 4" key="4">
        <trakt @is-valid="e => isTraktValid = e"></trakt>
      </div>
    </transition>

    <div class="flex flex:wrap justify:end items:baseline">
      <a class="cursor:pointer" @click="previous()">Previous</a>
      <transition name="slide:down">
        <btn @click="next()" class="ml:2" v-if="isValid">Next</btn>
      </transition>
    </div>
  </div>
</template>

<script>
import Directory from "components/settings/directory.vue";
import Transmission from "components/settings/transmission.vue";
import Plex from "components/settings/plex.vue";
import Trakt from "components/settings/trakt.vue";
export default {
  components: {
    Directory,
    Transmission,
    Plex,
    Trakt
  },
  computed: {
    width() {
      return `width: ${(this.step / this.steps) * 100}%`;
    },
    isValid() {
      switch (this.step) {
        case 1:
          return this.isDirectoryValid;
          break;
        case 2:
          return this.isTransmissionValid;
          break;
        case 3:
          return this.isPlexValid;
          break;
        case 4:
          return this.isTraktValid;
          break;
      }
    }
  },
  data() {
    return {
      isDirectoryValid: false,
      isTransmissionValid: false,
      isPlexValid: false,
      isTraktValid: false,
      step: 1,
      steps: 4
    };
  },
  methods: {
    previous() {
      if (this.step > 1) {
        this.step--;
      }
    },
    next() {
      if (this.step < this.steps) {
        this.step++;
      }
    }
  },
  watch: {
    isTraktValid(val) {
      if (val) {
        this.$router.push("/");
      }
    }
  }
};
</script>