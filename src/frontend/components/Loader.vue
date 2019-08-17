<template>
  <div class="loader w:full text:center">
    <div class="relative mx:0 my:auto">
      <div v-for="index in 4" :key="index" :class="`bg:${color}`" class="absolute rounded:full"></div>
    </div>
    <p :class="`text:${color}`" v-if="message">{{ message }}</p>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: "grey-dark"
    },
    message: {
      type: String,
      default: null
    }
  }
};
</script>

<style lang="scss" scoped>
.loader {
  div {
    height: 26px;
    width: 64px;
    div {
      top: 12px;
      width: 8px;
      height: 8px;
      animation-timing-function: cubic-bezier(0, 1, 1, 0);
    }
    div:nth-child(1) {
      left: 6px;
      animation: loader1 0.6s infinite;
    }
    div:nth-child(2) {
      left: 6px;
      animation: loader2 0.6s infinite;
    }
    div:nth-child(3) {
      left: 26px;
      animation: loader2 0.6s infinite;
    }
    div:nth-child(4) {
      left: 45px;
      animation: loader3 0.6s infinite;
    }
  }
}

@keyframes loader1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes loader3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes loader2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(19px, 0);
  }
}
</style>
