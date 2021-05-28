<template lang="html">
  <div class="loading" v-if="loading">
    <div class="loading__ball loading__ball--mog"></div>
    <div class="loading__ball loading__ball--chocobo"></div>
    <div class="loading__ball loading__ball--pampa"></div>
    <div class="loading__ball loading__ball--carbuncle"></div>
  </div>
</template>

<script>
export default {
  name: "AppLoading",
  data() {
    return {
      loading: false
    };
  }
};
</script>

<style lang="scss">
.loading {
  @include absolute-center;
  @include flex;
  z-index: 999;
  width: 100%;
  background: fade-out(white, 0.5);
  &__ball {
    margin: 1px;
    width: 20px;
    height: 20px;
    border: 2px solid $grey;
    border-radius: 50%;
    box-shadow: -1px -1px 5px $light-black inset;

    @each $team, $color in $teams {
      $i: index(($teams), ($team $color));
      &--#{$team} {
        background: $color;
        animation: $load-dur blink ease-in-out infinite alternate;
        animation-delay: $load-delay * $i;
      }
    }
  }
}
</style>
