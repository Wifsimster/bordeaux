<template>
  <div>
    <div class="relative block m:auto ripple" v-if="isLoading">
      <div class="absolute opacity:100 rounded:full border"></div>
      <div class="absolute opacity:100 rounded:full border"></div>
    </div>
    <div class="text:center" v-if="message">{{ message }}</div>
  </div>
</template>

<script>
export default {
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    message: {
      type: String
    }
  }
};
</script>

<style lang="scss" scoped>
.ripple {
  width: 64px;
  height: 64px;
}

.ripple div {
  animation: ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}

.ripple div:nth-child(2) {
  animation-delay: -0.5s;
}

@keyframes ripple {
  0% {
    top: 28px;
    left: 28px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: -1px;
    left: -1px;
    width: 58px;
    height: 58px;
    opacity: 0;
  }
}
</style>