<template>
  <div class="flex:1">
    <div class="flex flex:wrap relative items:center items:baseline justify:center">
      <div
        class="relative text:2 text:bold mt:1/2 mr:1 cursor:pointer glitch"
        data-text="Bordeaux"
      >Bordeaux</div>
      <div v-if="isAlive" class="text:green text:7/8">Opened</div>
      <div v-else class="text:red text:7/8 cursor:pointer" @click="connect()">Closed</div>
    </div>
  </div>
</template>


<script>
export default {
  computed: {
    isAlive() {
      return this.$store.getters["webSocket/isAlive"];
    }
  },
  methods: {
    connect() {
      this.$store.dispatch(
        "webSocket/ws",
        new WebSocket(`ws://${location.hostname}:8080`)
      );
    }
  }
};
</script>

<style lang="scss" scoped>
@mixin textGlitch(
  $name,
  $intensity,
  $textColor,
  $background,
  $highlightColor1,
  $highlightColor2,
  $width,
  $height
) {
  color: $textColor;
  position: relative;
  $steps: $intensity;

  // Ensure the @keyframes are generated at the root level
  @at-root {
    // We need two different ones
    @for $i from 1 through 2 {
      @keyframes #{$name}-anim-#{$i} {
        @for $i from 0 through $steps {
          #{percentage($i*(1/$steps))} {
            clip: rect(
              random($height) + px,
              $width + px,
              random($height) + px,
              0
            );
          }
        }
      }
    }
  }
  &:before,
  &:after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background: $background;
    clip: rect(0, 0, 0, 0);
  }
  &:after {
    left: 2px;
    text-shadow: -1px 0 $highlightColor1;
    animation: #{$name}-anim-1 2s infinite linear alternate-reverse;
  }
  &:before {
    left: -2px;
    text-shadow: 2px 0 $highlightColor2;
    animation: #{$name}-anim-2 3s infinite linear alternate-reverse;
  }
}

.glitch:hover {
  @include textGlitch("Bordeaux", 17, white, #22292f, red, blue, 450, 115);
}
</style>
