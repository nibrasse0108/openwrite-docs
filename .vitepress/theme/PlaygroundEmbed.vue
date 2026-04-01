<template>
  <div class="playground-embed">
    <iframe
      src="/playground-app.html"
      title="OpenWrite Playground"
      allowfullscreen
    />
  </div>
</template>

<style scoped>
.playground-embed {
  width: 100%;
  height: calc(100vh - var(--vp-nav-height, 64px));
}

.playground-embed iframe {
  width: 100%;
  height: 100%;
  border: none;
  display: block;
}
</style>
