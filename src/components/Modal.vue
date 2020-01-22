<template>
  <transition name="fade">
    <div
      class="fixed t:0 r:0 b:0 l:0 overflow:auto bg:smoke flex z:40"
      ref="container"
      v-if="show"
      @keyup.esc="$emit('close')"
      @click="close"
    >
      <div
        class="flex flex:col align:top bg:black shadow rounded sm:justify:end w:full sm:m:auto max-w:sm md:max-w:md"
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
      default: 'lg:max-w:lg'
    }
  },
  methods: {
    close(el) {
      if (el.target === this.$refs.container) {
        this.$emit('close')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.bg\:smoke {
  background-color: rgba(0, 0, 0, 0.6);
}
</style>
