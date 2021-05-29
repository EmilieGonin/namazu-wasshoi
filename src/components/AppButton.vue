<template lang="html">
  <div class="button">
    <slot>Envoyer</slot>
    <font-awesome-icon
      class="button__icon button__icon--l"
      :icon="iconL"
      fixed-width
      v-if="iconL"
    />
    <font-awesome-icon
      class="button__icon button__icon--r"
      :icon="iconR"
      fixed-width
      v-if="iconR"
    />
  </div>
</template>

<script>
export default {
  name: "AppButton",
  props: {
    iconL: String,
    iconR: String
  }
};
</script>

<style lang="scss" scoped>
.button {
  @include flex;
  position: relative;
  cursor: pointer;
  width: 100%;
  max-width: 200px;
  padding: 3% 5%;
  background: $namazu;
  border: 2px solid $namazu;
  color: $minor-white;
  &:hover {
    background: white;
    border: 2px solid $namazu;
    color: $namazu;
  }
  &__icon {
    position: absolute;
    font-size: $font-small;
    &--l {
      left: 10px;
    }
    &--r {
      right: 10px;
    }
  }
}
</style>
