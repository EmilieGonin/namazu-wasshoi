<template lang="html">
  <div class="panel">
    <div class="panel__img-container">
      <img
        class="panel__img"
        :class="`panel__img--${team}`"
        src="@/assets/sample.png"
        alt=""
      />
      <div class="panel__title-container">
        <div class="panel__title" :class="`panel__title--${team}`">
          {{ team }}
        </div>
        <div class="panel__subtitle"><slot></slot></div>
      </div>
    </div>
    <div class="panel__background" :class="`panel__background--${team}`"></div>
    <div class="panel__container">
      (Liste des membres)
    </div>
  </div>
</template>

<script>
export default {
  name: "TeamsPanel",
  props: {
    team: String
  }
};
</script>

<style lang="scss" scoped>
.panel {
  @include flex($direction: column);
  position: relative;
  width: 100%;
  margin-top: 40px;
  border-bottom: 30px solid white;
  &__img-container {
    position: relative;
    width: 75%;
  }
  &__img {
    display: block;
    width: 100%;
    height: 500px;
    object-fit: cover;
    box-shadow: 0 0 1px $main-black;

    @each $team, $color in $teams {
      &--#{$team} {
        border: 5px solid pastel($color);
      }
    }
  }
  &__title-container {
    position: absolute;
    bottom: 7px;
    left: 5px;
    right: 5px;
    margin: auto;
    text-align: center;
    background: veil(black, 0.7);
  }
  &__title {
    @include cursive(50);
    text-transform: capitalize;

    @each $team, $color in $teams {
      &--#{$team} {
        @include font-relief($color);
      }
    }
  }
  &__subtitle {
    transform: translateY(-7px);
    color: white;
    &::before {
      content: "« ";
    }
    &::after {
      content: " »";
    }
  }
  &__background {
    z-index: -1;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 70%;

    @each $team, $color in $teams {
      &--#{$team} {
        background: $color;
      }
    }
  }
  &__container {
    width: 100%;
    max-width: 1000px;
    padding: 50px;
    padding-bottom: 20px;
    background: white;
    text-align: justify;
  }
}
</style>
