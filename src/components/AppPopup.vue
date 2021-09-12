<template lang="html">
  <div class="popup">
    <div class="popup__background" @click="$emit('close')"></div>
    <div class="popup__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppPopup",
  emits: ["close"]
};
</script>

<style lang="scss" scoped>
.popup {
  @include absolute-center;
  position: fixed;
  z-index: 10;
  width: 100%;
  background: fade-out(white, 0.5);
  &__background {
    @include absolute-center;
    position: fixed;
    z-index: 10;
  }
  &__content {
    @include responsive(425) {
      border-radius: 0;
      border-left: none;
      border-right: none;
    }
    z-index: 11;
    position: fixed;
    top: 50%;
    left: 0;
    right: 0;
    transform: translateY(-50%);
    margin: auto;
    padding: 50px;
    max-width: 500px;
    padding: 20px;
    border-radius: 25px;
    border: 3px dotted $minor-white;
    background-color: white;
    box-shadow: 0 0 5px $grey;
  }
}
</style>
