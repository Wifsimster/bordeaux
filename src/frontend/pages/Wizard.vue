<template>
  <div class="max-w:md my:auto">
    <div
      class="fixed t:0 l:0 max-w:full bg:orange transition mb:2"
      style="height:2px"
      :style="width"
    ></div>

    <transition name="slide:right" mode="out-in">
      <div v-if="step === 1" key="1">
        <directory @is-valid="e => isDirectoryValid = e" />
      </div>
      <div v-if="step === 2" key="2">
        <subtitles @is-valid="e => isSubtitlesValid = e" />
      </div>
      <div v-if="step === 3" key="3">
        <transmission @is-valid="e => isTransmissionValid = e"></transmission>
      </div>
      <div v-if="step === 4" key="4">
        <plex @is-valid="e => isPlexValid = e" />
      </div>
      <div v-if="step === 5" key="5">
        <trakt @is-valid="e => isTraktValid = e" />
      </div>
    </transition>

    <div class="flex flex:wrap justify:end items:baseline">
      <a class="cursor:pointer" @click="previous()">Previous</a>
      <a class="cursor:pointer ml:2" @click="next()">Skip</a>
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
import Subtitles from "components/settings/subtitles.vue";
export default {
  components: {
    Directory,
    Transmission,
    Plex,
    Trakt,
    Subtitles
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
          return this.isSubtitlesValid;
          break;
        case 3:
          return this.isTransmissionValid;
          break;
        case 4:
          return this.isPlexValid;
          break;
        case 5:
          return this.isTraktValid;
          break;
      }
    }
  },
  data() {
    return {
      isDirectoryValid: false,
      isSubtitlesValid: false,
      isTransmissionValid: false,
      isPlexValid: false,
      isTraktValid: false,
      step: 1,
      steps: 5
    };
  },
  methods: {
    previous() {
      if (this.step > 1) {
        this.step--;
      }
    },
    next() {
      if (this.step === this.steps) {
        this.goToDashboard();
      }

      if (this.step < this.steps) {
        this.step++;
      }
    },
    goToDashboard() {
      localStorage.setItem("token", "bordeaux");
      this.$router.push("/").catch(err => {
        console.warn(err);
      });
    }
  },
  watch: {
    isTraktValid(val) {
      if (val) {
        this.goToDashboard();
      }
    }
  }
};
</script>