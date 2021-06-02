<template lang="html">
  <div class="card">
    <div class="card__icon" :class="'card__icon--' + $attrs.class">
      <font-awesome-icon :icon="icon" fixed-width />
    </div>
    <div class="card__title" :class="'card__title--' + $attrs.class">
      <slot name="title"></slot>
    </div>
    <div class="card__infos">
      <slot name="infos"></slot>
    </div>
    <div class="card__link" @click="redirect()">
      <div :class="'card__button--' + $attrs.class">
        <slot name="button">Obtenir plus d'informations</slot>
      </div>
      <font-awesome-icon
        class="card__arrow"
        icon="arrow-right"
        :class="'card__arrow--' + $attrs.class"
        fixed-width
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeCard",
  props: {
    icon: String,
    link: String,
    internal: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    redirect() {
      if (!this.internal) {
        window.open(this.link);
      } else {
        this.$router.push(this.link);
      }
    }
  }
};
</script>

<style lang="scss">
.card {
  @include responsive {
    width: 100%;
    max-width: none;
  }
  @include flex($direction: column, $gap: 20, $justify: flex-start);
  width: 50%;
  max-width: 350px;
  padding: 20px;
  background: white;
  // background: $minor-black;
  // color: $minor-white;
  &__icon {
    font-size: $font-xxl;
    color: white;
    padding: 3px;
    border-radius: 20%;
    border: 3px solid $black-veil;

    @each $team, $color in $teams {
      &--#{$team} {
        background: $color;
      }
    }
  }
  &__title {
    font-size: $font-large;

    @each $team, $color in $teams {
      &--#{$team} {
        border-bottom: 2px solid $color;
      }
    }
  }
  &__infos {
    font-size: $font-small;
    text-align: justify;
  }
  &__link {
    @include flex($gap: 5);
    cursor: pointer;
    transition: transform 200ms;
    &:hover {
      transform: scale(1.2);
    }
  }
  &__arrow {
    font-size: $font-small;

    @each $team, $color in $teams {
      &--#{$team} {
        color: $color;
      }
    }
  }
  &__button {
    @each $team, $color in $teams {
      &--#{$team} {
        border-bottom: 2px solid $color;
      }
    }
  }
}
</style>
