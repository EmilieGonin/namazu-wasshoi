<template lang="html">
  <div class="profile">
    <div class="profile__line"></div>
    <div class="profile__container">
      <div class="profile__screenshot-container">
        <img class="profile__screenshot" src="@/assets/sample.png" alt="" />
        <UserAvatar class="profile__avatar" :size="'80'"></UserAvatar>
      </div>
      <div class="profile__user-container">
        <div
          class="profile__name"
          :class="{
            'profile__name--gold': isGold,
            'profile__name--lunar': isLunar,
            'profile__name--fail': isFail
          }"
        >
          Nom du personnage
        </div>
        <div class="profile__title">
          Titre du personnage
        </div>
        <div class="profile__bio">
          Bio libre du membre
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserAvatar from "@/components/UserAvatar.vue";

export default {
  name: "Profile",
  data() {
    return {
      //temp
      isGold: false,
      isLunar: false,
      isFail: false
    };
  },
  components: {
    UserAvatar
  }
};
</script>

<style lang="scss" scoped>
.profile {
  position: relative;
  width: 100%;
  &__container {
    @include flex($gap: 10, $align: stretch);
    flex-wrap: wrap;
    width: 100%;
    max-width: 1200px;
    margin: 10px auto;
  }
  &__line {
    @include absolute-center;
    z-index: -1;
    height: 25%;
    background: $grey;
  }
  &__screenshot-container {
    position: relative;
    width: 100%;
    max-width: 380px;
    height: 100%;
    margin: 20px 0;
    padding: 5px;
    background: white;
    border: 5px solid $grey;
  }
  &__screenshot {
    display: block;
    width: 100%;
    min-height: 580px;
    object-fit: cover;
  }
  &__avatar {
    @include soft-border;
    position: absolute;
    left: 0;
    right: 0;
    bottom: -30px;
    margin: auto;
    &:hover {
      @include soft-border;
    }
  }
  &__user-container {
    @include flex($direction: column, $justify: flex-start);
    width: 100%;
    max-width: 500px;
    padding: 20px;
  }
  &__name {
    @include cursive(50);
    @include font-relief($main-black);
    &--gold {
      @include font-relief($gold);
    }
    &--lunar {
      @include font-relief($lunar);
    }
    &--fail {
      @include font-relief($fail);
    }
  }
  &__title {
    margin-top: -5px;
    &::before {
      content: "« ";
    }
    &::after {
      content: " »";
    }
  }
  &__bio {
    width: 100%;
    height: 100%;
    margin-top: 10px;
    padding: 20px;
    background: white;
    border: 5px solid $grey;
  }
}
</style>
