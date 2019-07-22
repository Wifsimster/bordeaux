<template>
  <div>
    <div class="text:3/2 text:bold mb:1">Manage your shows</div>
    <alert color="red" v-if="error">{{ error }}</alert>
    <loader v-if="isLoading"></loader>
    <div>
      <input v-model="query" placeholder="Search a new show" class="py:1/2" @keyup.enter="search()" />
      <btn v-if="!isLoading" class="inline-block w:1/4" @click="search()">Searching</btn>
      <span v-if="results" @click="cancel()" class="cursor:pointer p:1">Cancel</span>

      <!-- Search results -->
      <transition-group
        name="list"
        tag="div"
        v-if="results && results.length > 0"
        class="responsive:8"
      >
        <div v-for="show in results" :key="show.id" class="p:1/2">
          <div class="relative container-reveal overflow:hidden border rounded h:full">
            <img
              v-if="show.images.poster"
              class="w:full h:full"
              v-lazy="{ src: show.images.poster, error: show.images.show }"
            />

            <span
              class="absolute t:0 r:1/2 p:1/4 text:3/4 bg:orange shadow item-conceal transition"
            >{{ show.notes.mean.toFixed(1) }}</span>

            <span
              v-if="show.status === 'Ended'"
              class="item-conceal transition absolute t:0 l:1/2 p:1/4 text:3/4 bg:red-light"
            >{{ show.status }}</span>
            <span
              v-if="show.status === 'Continuing'"
              class="item-conceal transition absolute t:0 l:1/2 p:1/4 text:3/4 bg:green-light"
            >{{ show.status }}</span>

            <div
              class="item-reveal absolute b:0 l:0 r:0 text:center p:1/4 bg:orange transition cursor:pointer"
              @click="add(show)"
            >
              <i class="add" title="Add"></i>
            </div>
          </div>
        </div>
      </transition-group>
      <div v-if="results && results.length === 0" class="text:center">No result found :(</div>
    </div>

    <!-- Shows -->
    <transition-group
      name="list"
      tag="div"
      v-if="!results && shows && shows.length > 0"
      class="responsive:8"
    >
      <div v-for="show in shows" :key="show.id" class="p:1/2">
        <div class="relative container-reveal h:full overflow:hidden">
          <img
            v-if="show.images.poster"
            class="w:full h:full rounded"
            v-lazy="{ src: show.images.poster, error: show.images.show }"
          />

          <span
            class="item-conceal absolute t:0 r:1/2 p:1/4 text:3/4 bg:orange shadow transition"
          >{{ show.notes.mean.toFixed(1) }}</span>

          <div
            class="item-reveal absolute b:0 l:0 r:0 text:center p:1/4 bg:orange transition cursor:pointer rounded:b shadow"
            @click="remove(show)"
          >
            <i class="trash" title="Remove"></i>
          </div>
        </div>
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
        this.error = null;
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
    cancel() {
      this.results = null;
      this.error = null;
      this.query = null;
    },
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

.add {
  display: inline-block;
  vertical-align: middle;
  position: relative;
  width: 30px;
  height: 30px;
  &:before {
    content: "";
    position: absolute;
    width: 20px;
    height: 2px;
    left: 50%;
    top: 50%;
    box-shadow: inset 0 0 0 32px;
    transform: translate(-50%, -50%);
  }
  &:after {
    content: "";
    position: absolute;
    height: 20px;
    width: 2px;
    left: 50%;
    top: 50%;
    box-shadow: inset 0 0 0 32px;
    transform: translate(-50%, -50%);
  }
}

.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

input {
  height: 54px;
  caret-color: map-get($colors, "orange");
  @extend .inline-block;
  @extend .text\:1;
  @extend .w\:2\/4;
  @extend .text\:grey-dark;
  @extend .bg\:transparent;
  @extend .border;
  @extend .border\:grey;
  @extend .placeholder\:grey-light;
  @extend .mb\:1;
  @extend .block;
}

.container-reveal {
  .item-reveal {
    bottom: -50px;
  }
}

.container-reveal:hover {
  .item-reveal {
    bottom: 0px;
  }
  .item-conceal {
    top: -50px;
  }
}
</style>

