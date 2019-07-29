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
      <div
        class="text:white py:1 px:1/2 text:3/2 rounded:t border:b"
        :class="{ 'fixed t:0 w:full max-w:md': isFixed }"
        ref="header"
      >
        <slot name="header"></slot>
      </div>

      <slot name="tabs"></slot>

      <div class="p:1 flex flex:col">
        <slot name="content"></slot>
      </div>
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
    headerFixed: {
      type: Boolean,
      default: false
    },
    dismissible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isFixed: false
    };
  },
  mounted() {
    if (this.headerFixed) {
      let modalEl = this.$refs.container;
      let headerHeight = this.$refs.header.offsetHeight;

      modalEl.addEventListener("scroll", evt => {
        if (evt.currentTarget.scrollTop > headerHeight / 2) {
          this.isFixed = true;
        } else {
          this.isFixed = false;
        }
      });
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