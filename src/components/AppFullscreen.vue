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
  @include responsive(320) {
    position: absolute;
  }
  @include absolute-center;
  position: fixed;
  top: 43px;
  @include flex;
  backdrop-filter: blur(5px);
  &__container {
    width: 35%;
    min-width: 320px;
    padding: 50px 20px;
    background: white;
    box-shadow: 0 0 5px $main-black;
    border-radius: 5px;
  }
}
</style>
