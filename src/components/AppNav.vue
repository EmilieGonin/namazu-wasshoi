<template lang="html">
  <div class="nav">
    <!--Site Menu-->
    <div class="nav__site-menu">
      <!--Links-->
      <router-link class="nav__menu-icon" :to="'/'">
        <font-awesome-icon icon="bars" fixed-width />
      </router-link>
      <router-link class="nav__menu-icon" :to="'/'">
        <font-awesome-icon icon="home-lg-alt" fixed-width />
      </router-link>
      <!--CL Title-->
      <div class="nav__cl-title">
        <span class="nav__cl-name">Namazu Wasshoi</span>
        <span class="nav__cl-tag">« Shoi! »</span>
      </div>
    </div>
    <!--User Menu-->
    <div class="nav__user-menu">
      <!--Avatar-->
      <router-link :to="'/'">
        <UserAvatar />
      </router-link>
      <!--Links-->
      <router-link class="nav__menu-icon" :to="'/'">
        <font-awesome-icon icon="cog" fixed-width />
      </router-link>
      <router-link class="nav__menu-icon" :to="'/'">
        <font-awesome-icon icon="sign-out-alt" fixed-width />
      </router-link>
    </div>
  </div>
</template>

<script>
import UserAvatar from "@/components/UserAvatar.vue";

export default {
  name: "AppNav",
  components: {
    UserAvatar
  }
};
</script>

<style lang="scss" scoped>
.nav {
  @include flex($justify: space-between);
  z-index: 999;
  position: fixed;
  width: 100%;
  background: $namazu;
  color: $grey;
  padding: 3px 5px;
  &__site-menu {
    @include flex($gap: 5);
  }
  &__user-menu {
    @include flex($gap: 5);
  }
  &__menu-icon {
    padding: 5px;
    border-radius: 20%;
    background: $black-veil;
    color: fade-out($grey, 0.2);
    &:hover {
      background: fade-in($black-veil, 0.1);
    }
  }
  &__cl-title {
    @include flex($gap: 5);
  }
  &__cl-name {
    @include cl-name(27);
  }
}
</style>
