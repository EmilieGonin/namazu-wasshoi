<template lang="html">
  <button class="button" :style="style">
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
  </button>
</template>

<script>
export default {
  name: "AppButton",
  props: {
    iconL: String,
    iconR: String,
    marginTop: Number,
    margin: String
  },
  computed: {
    style() {
      return {
        margin: this.margin,
        marginTop: this.marginTop + "px"
      };
    }
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
  padding: 12px;
  background: $namazu;
  border: 2px solid $namazu;
  color: $minor-white;
  font-size: $font-regular;
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
