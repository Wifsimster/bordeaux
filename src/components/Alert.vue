<template>
  <div
    class="border:l:1/4 p:1 mb:1"
    :class="`bg:${color}-lightest border:${color}-dark text:${color}-dark `"
  >
    <slot name="default"></slot>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: "blue"
    }
  }
};
</script>
