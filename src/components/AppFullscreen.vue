<template lang="html">
  <div class="fullscreen">
    <div class="fullscreen__container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppFullscreen"
};
</script>

<style lang="scss" scoped>
.fullscreen {
  @include absolute-center;
  backdrop-filter: blur(5px);
  &__container {
    @include absolute-center;
    width: 35%;
    min-width: 320px;
    height: 50%;
    min-height: 420px;
    background: $minor-white;
    box-shadow: 0 0 5px $main-black;
  }
}
</style>
