<template>
  <div>
    <div class="flex flex:wrap relative items:center items:center justify:center sm:p:1/2">
      <router-link
        to="/"
        tag="div"
        class="relative text:3/2 sm:text:2 text:bold mr:1/2 cursor:pointer glitch"
        data-text="Bordeaux"
      >Bordeaux</router-link>
      <div v-if="isAlive">
        <div class="md:none p:1/4 rounded:full bg:green"></div>
        <div class="none md:block text:green text:7/8">Opened</div>
      </div>
      <div v-else class="text:red text:7/8 cursor:pointer" @click="connect()">
        <div class="none md:block">Closed</div>
      </div>
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
