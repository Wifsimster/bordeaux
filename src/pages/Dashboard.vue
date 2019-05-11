<template>
  <div>
    <h1>Dashboard</h1>
    <div>
      <ul class="list-reset">
        <li>
          <a class="cursor:pointer text:grey-darkest text:3/2" @click="download">Download</a>
        </li>
        <li>
          <a class="cursor:pointer text:grey-darkest text:3/2" @click="move">Move</a>
        </li>
        <li>
          <a class="cursor:pointer text:grey-darkest text:3/2" @click="subtitles">Subtitles</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    download() {},
    move() {},
    subtitles() {}
  }
};
</script>