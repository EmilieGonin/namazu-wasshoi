<template lang="html">
  <button
    :type="type"
    class="button"
    :class="{
      'button--darkhover': altClass && altClass.includes('darkhover'),
      'button--bighover': altClass && altClass.includes('bighover')
    }"
    :style="style"
    @click="go"
  >
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
    type: {
      type: String,
      default: "button"
    },
    iconL: String,
    iconR: String,
    marginTop: Number,
    margin: String,
    link: String,
    small: Boolean,
    altClass: [String, Array]
  },
  computed: {
    style() {
      return {
        margin: this.margin,
        marginTop: this.marginTop + "px",
        maxWidth: this.small ? "50px" : "200px"
      };
    }
  },
  methods: {
    go() {
      if (this.link) {
        this.$router.push(this.link);
      }
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
  &--darkhover {
    &:hover {
      background: dark($namazu);
      border: 2px solid dark($namazu);
      color: $minor-white;
    }
  }
  &--bighover {
    transition: transform 200ms;
    &:hover {
      transform: scale(1.2);
    }
  }
  &--alt {
    background: none;
    border: none;
    border-bottom: 2px solid $namazu;
    color: $namazu;
    &:hover {
      background: none;
      border: none;
      border-bottom: 2px solid $namazu;
      color: $namazu;
    }
    &--inactive {
      border-bottom: 2px solid $grey;
      color: $namazu;
    }
    &--disabled {
      color: dark($grey);
      &:hover {
        cursor: default;
        background: none;
        border: none;
        border-bottom: 2px solid $grey;
        color: dark($grey);
      }
    }
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
