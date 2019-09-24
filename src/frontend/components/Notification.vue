<template>
  <div class="fixed z:50 r:1 b:0">
    <transition-group name="flip" appear>
      <div
        v-for="(item, index) in list"
        :key="item.id"
        class="m:1/2 rounded shadow:large z:20 relative"
        :class="'bg:' + item.color"
        :id="item.id"
      >
        <div class="flex items:baseline">
          <div class="text:white px:1 pl:1/2 pr:1/4">{{ item.message }}</div>
          <i
            class="float:right text:white mr:1/2 p:1/4 rounded cursor:pointer"
            :class="'hover:bg:' + item.color + '-light'"
            @click="close(index)"
          >x</i>
        </div>
        <div
          v-if="item.timeout"
          class="rounded:b m:0 p:0"
          :class="'bg:' + item.color + '-darker'"
          :style="'height: 4px; width:calc(' + item.width + '% - 0.25rem);'"
        ></div>
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  computed: {
    list() {
      return this.$store.getters["notification/list"];
    }
  },
  methods: {
    close(index) {
      this.$store.dispatch("notification/remove", index);
    }
  }
};
</script>