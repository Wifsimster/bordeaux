<template>
  <div
    class="fixed t:0 r:0 b:0 l:0 overflow:auto bg:smoke flex z:50"
    ref="container"
    @click="close"
  >
    <div
      class="flex flex:col align:top justify:end m:auto bg:black w:full shadow rounded"
      :class="size"
    >
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: "max-w:sm"
    },
    dismissible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close(el) {
      if (this.dismissible && el.target === this.$refs.container) {
        this.$emit("close", false);
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