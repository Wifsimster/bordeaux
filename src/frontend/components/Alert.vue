<template>
  <div class="border:l:1/4 p:1 mb:1" :class="computedColor">
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
  },
  computed: {
    computedColor() {
      switch (this.color) {
        case "red":
          return "bg:red-lightest border:red-dark text:red-dark";
        case "orange":
          return "bg:orange-lightest border:orange-dark text:orange-dark";
        case "green":
          return "bg:green-lightest border:green-dark text:green-dark";
        default:
          return "bg:blue-lightest border:blue-dark text:blue-dark";
      }
    }
  }
};
</script>
