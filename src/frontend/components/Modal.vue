<template>
  <transition name="fade">
    <div
      class="fixed t:0 r:0 b:0 l:0 overflow:auto bg:smoke flex z:50"
      ref="container"
      v-if="show"
      @keyup.esc="$emit('close')"
      @click="close"
    >
      <div
        class="flex flex:col align:top justify:end m:auto bg:black w:full shadow rounded"
        :class="size"
      >
        <slot name="content"></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: "max-w:sm"
    }
  },
  methods: {
    close(el) {
      if (el.target === this.$refs.container) {
        this.$emit("close");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.bg\:smoke {
  background-color: rgba(0, 0, 0, 0.6);
}
</style>