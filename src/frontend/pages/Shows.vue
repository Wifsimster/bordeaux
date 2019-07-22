<template>
  <div>
    <div class="text:3/2 text:bold mb:1">Manage your shows</div>
    <alert color="red" v-if="error">{{ error }}</alert>
    <loader v-if="isLoading"></loader>
    <div>
      <input
        v-model="query"
        placeholder="Search a new show"
        class="inline-block w:2/4 border mb:1 text:1 py:1/2"
        style="height: 46px;"
        @keyup.enter="search()"
      />
      <btn v-if="!isLoading" class="inline-block w:1/4" @click="search()">Searching</btn>
      <span v-if="results" @click="results = null" class="cursor:pointer p:1">Cancel</span>

      <!-- Search results -->
      <div v-if="results && results.length > 0" class="flex flex:wrap mt:1">
        <div v-for="(show, index) in results" :key="index" class="w:1/2" @click="add(show)">
          <div
            class="flex bg:grey-lightest border hover:bg:blue-lightest cursor:pointer rounded m:1/4"
            style="max-height: 197px"
          >
            <div class="w:1/4 pr:1/2 overflow:hidden">
              <img v-if="show.images.poster" class="w:full rounded:l" v-lazy="show.images.poster" />
              <div v-else class="w:full h:full bg:grey-light pr:1/2"></div>
            </div>
            <div class="w:3/4">
              <div class="mt:1/2">
                <a
                  :href="`https://www.imdb.com/title/${show.imdb_id}`"
                  targetAll="_blank"
                >{{ show.title }}</a>
                ({{ show.creation }})
                <span
                  v-if="show.status === 'Ended'"
                  class="inline-block text:7/8 bg:red-light text:white text:center rounded py:1/2 px:1/4 mx:1/4"
                >{{ show.status }}</span>
                <span
                  v-if="show.status === 'Continuing'"
                  class="inline-block text:7/8 bg:green-light text:white text:center rounded py:1/2 px:1/4 mx:1/4"
                >{{ show.status }}</span>
              </div>
              <span
                v-for="genre in show.genres"
                :key="genre"
                class="inline-block text:7/8 bg:grey-light text:grey-darker rounded py:1/2 px:1/4 mr:1/2 mx:1/4"
              >{{ genre }}</span>
              <div>
                <span
                  v-if="show.language"
                  class="inline-block text:7/8 bg:grey-light text:grey-darker rounded py:1/2 px:1/4 mr:1/2 mx:1/4"
                >{{ show.language }}</span>
                <span
                  v-if="show.network"
                  class="inline-block text:7/8 bg:grey-light text:grey-darker rounded py:1/2 px:1/4 mr:1/2 mx:1/4"
                >{{ show.network }}</span>
                <span
                  v-if="show.rating"
                  class="inline-block text:7/8 bg:grey-light text:grey-darker rounded py:1/2 px:1/4 mr:1/2 mx:1/4"
                >{{ show.rating }}</span>
                <span
                  v-if="show.length"
                  class="inline-block text:7/8 bg:grey-light text:grey-darker rounded py:1/2 px:1/4 mr:1/2 mx:1/4"
                >{{ show.length }} min</span>
              </div>
              <div>
                <span
                  v-if="show.notes"
                  :title="show.notes.total + ' votes'"
                  class="inline-block text:7/8 bg:grey-light text:grey-darker rounded py:1/2 px:1/4 mr:1/2 mx:1/4"
                >{{ show.notes.mean.toFixed(1) }}/5</span>
                <span
                  v-if="show.seasons"
                  class="inline-block text:7/8 bg:grey-light text:grey-darker rounded py:1/2 px:1/4 mr:1/2 mx:1/4"
                >Seasons {{ show.seasons }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="results && results.length === 0" class="text:center">No result found :(</div>
    </div>

    <!-- Shows -->
    <transition-group
      name="slide"
      tag="div"
      v-if="!results && shows && shows.length > 0"
      class="responsive:8"
    >
      <div v-for="show in shows" :key="show.id" class="p:1/2">
        <div class="relative">
          <img
            v-if="show.images.poster"
            class="w:full"
            v-lazy="{ src: show.images.poster, error: show.images.show }"
          />
          <span class="absolute t:0 r:0 p:1/4 text:2/3 bg:orange">{{ show.notes.mean.toFixed(1) }}</span>
        </div>

        <!-- <div class="self:center w:2/12 h:full">
            <span @click="remove(show)">
              <i class="trash text:grey-darkest" title="Remove"></i>
            </span>
        </div>-->
      </div>
    </transition-group>
    <div v-if="!results && shows && shows.length === 0" class="text:center">No show added :(</div>
  </div>
</template>

<script>
export default {
  computed: {
    message() {
      return this.$store.getters["webSocket/message"];
    }
  },
  data() {
    return {
      error: null,
      shows: null,
      results: null,
      query: null,
      isLoading: false
    };
  },
  created() {
    this.getAll();
  },
  watch: {
    message(data) {
      if (data.object === "show") {
        switch (data.method) {
          case "getAll":
            if (data.error) {
              this.error = data.error;
            } else {
              this.shows = Object.assign([], data.results);
            }
            break;
          case "search":
            if (data.error) {
              this.error = data.error;
            } else {
              this.results = Object.assign([], data.results);
            }
            break;
          case "add":
            if (data.error) {
              this.error = data.error;
            } else {
              this.query = null;
              this.results = null;
              this.getAll();
            }
            break;
          case "remove":
            if (data.error) {
              this.error = data.error;
            } else {
              this.shows = Object.assign([], data.results);
            }
            break;
          default:
            console.log(`Unknow method : ${data.method}`);
        }
      }
    }
  },
  methods: {
    search() {
      this.$store.commit("webSocket/send", {
        object: "show",
        method: "search",
        params: { query: this.query }
      });
    },
    getAll() {
      this.$store.commit("webSocket/send", {
        object: "show",
        method: "getAll"
      });
    },
    add(show) {
      this.$store.commit("webSocket/send", {
        object: "show",
        method: "add",
        params: show
      });
    },
    remove(show) {
      this.$store.commit("webSocket/send", {
        object: "show",
        method: "remove",
        params: show
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../node_modules/beta-scss/scss/global";

img {
  transition: filter 0.5s;
}
img[lazy="loading"] {
  filter: blur(20px);
}
img[lazy="loaded"] {
  filter: blur(0);
}

.trash {
  display: inline-block;
  vertical-align: middle;
  position: relative;
  width: 22px;
  height: 22px;
  border-radius: 0 0 3px 3px;
  border-top: none;
  margin: 9px 6px 3px;
  border: 2px solid;
  &:before {
    content: "";
    position: absolute;
    width: 8px;
    height: 2px;
    top: -5px;
    box-shadow: inset 0 0 0 32px, -10px 2px 0 0, -6px 2px 0 0, 0 2px 0 0,
      6px 2px 0 0, 10px 2px 0 0;
    left: 25%;
    transition: all 0.3s;
  }
  &:hover:before {
    transform: translateY(-5px);
  }
}

// Transitions
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

input {
  height: 48px;
  caret-color: map-get($colors, "blue-dark");
  @extend .w\:full;
  @extend .text\:2;
  @extend .text\:grey-dark;
  @extend .bg\:transparent;
  @extend .border\:b;
  @extend .border\:grey;
  @extend .placeholder\:grey-light;
  @extend .mx\:1;
  @extend .block;
}
</style>

