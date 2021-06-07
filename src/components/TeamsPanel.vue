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
      <div
        class="panel__members-title"
        :class="`panel__members-title--${team}`"
      >
        Liste des membres
      </div>
      <div class="panel__members">
        <UserAvatar :size="'80'" :borderRadius="'25%'"></UserAvatar>
        <UserAvatar :size="'80'" :borderRadius="'25%'"></UserAvatar>
        <UserAvatar :size="'80'" :borderRadius="'25%'"></UserAvatar>
        <UserAvatar :size="'80'" :borderRadius="'25%'"></UserAvatar>
        <UserAvatar :size="'80'" :borderRadius="'25%'"></UserAvatar>
        <UserAvatar :size="'80'" :borderRadius="'25%'"></UserAvatar>
      </div>
      <div class="panel__screenshots">
        <img
          class="panel__screenshot"
          :class="`panel__screenshot--${team}`"
          src="@/assets/sample.png"
          alt=""
        />
        <img
          class="panel__screenshot"
          :class="`panel__screenshot--${team}`"
          src="@/assets/sample.png"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
import UserAvatar from "@/components/UserAvatar.vue";

export default {
  name: "TeamsPanel",
  components: {
    UserAvatar
  },
  props: {
    team: String
  }
};
</script>

<style lang="scss" scoped>
.panel {
  @include responsive(1000) {
    border: none;
  }
  @include responsive(750) {
    margin: 0;
  }
  @include flex($direction: column);
  position: relative;
  width: 100%;
  margin-top: 40px;
  border-bottom: 30px solid white;
  &__img-container {
    @include responsive(750) {
      width: 100%;
    }
    position: relative;
    width: 85%;
    max-width: 1200px;
  }
  &__img {
    display: block;
    width: 100%;
    height: 450px;
    object-fit: cover;
    // box-shadow: 0 0 1px $main-black;

    @each $team, $color in $teams {
      &--#{$team} {
        border: 5px solid pastel($color);
        box-shadow: 0 0 5px dark($color);
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
    bottom: 1px;
    width: 100%;
    height: 70%;

    @each $team, $color in $teams {
      &--#{$team} {
        background: $color;
      }
    }
  }
  &__container {
    @include responsive(1000) {
      padding: 40px 0;
    }
    width: 100%;
    max-width: 1000px;
    padding: 50px 0 40px 0;
    background: white;
    text-align: justify;
  }
  &__members-title {
    @include title;
    font-weight: bold;
    font-size: $font-xxl + 5;
    text-align: center;
    margin-bottom: 10px;

    @each $team, $color in $teams {
      &--#{$team} {
        color: dark($color);
      }
    }
  }
  &__members {
    @include flex($gap: 10);
    flex-wrap: wrap;
  }
  &__screenshots {
    @include responsive(320) {
      gap: 5px;
    }
    @include flex($gap: 27);
    flex-wrap: wrap;
    margin-top: 50px;
  }
  &__screenshot {
    width: 100%;
    max-width: 300px;
    border-radius: 10px;

    @each $team, $color in $teams {
      &--#{$team} {
        border: 5px solid pastel($color);
        box-shadow: 0 0 3px dark($color);
      }
    }
  }
}
</style>
