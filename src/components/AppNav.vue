<template lang="html">
  <div class="nav">
    <!--Site Menu-->
    <div class="nav__site-menu">
      <!--Main Links-->
      <div class="nav__menu-icon" @click="toggle = !toggle">
        <font-awesome-icon icon="bars" fixed-width />
      </div>
      <router-link class="nav__menu-icon" :to="'/'">
        <font-awesome-icon icon="home-lg-alt" fixed-width />
      </router-link>
      <!--Submenu-->
      <transition name="fade">
        <div class="nav__submenu" v-show="toggle">
          <router-link class="nav__submenu-link" :to="'/'">
            <font-awesome-icon icon="bars" fixed-width /> Lien
          </router-link>
          <router-link class="nav__submenu-link" :to="'/'">
            <font-awesome-icon icon="bars" fixed-width /> Lien
          </router-link>
          <router-link class="nav__submenu-link" :to="'/'">
            <font-awesome-icon icon="bars" fixed-width /> Lien
          </router-link>
        </div>
      </transition>
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
  data() {
    return {
      toggle: false
    };
  },
  components: {
    UserAvatar
  }
};
</script>

<style lang="scss" scoped>
.nav {
  @include flex($justify: space-between);
  z-index: 998;
  position: fixed;
  width: 100%;
  background: $namazu;
  color: $grey;
  padding: 3px 5px;
  &__site-menu {
    @include flex($gap: 5);
  }
  &__submenu {
    @include flex($direction: column);
    position: absolute;
    top: 46px;
    left: 0;
    background: $namazu;
  }
  &__user-menu {
    @include flex($gap: 5);
  }
  &__menu-icon {
    cursor: pointer;
    padding: 5px;
    border-radius: 20%;
    background: $black-veil;
    color: fade-out($grey, 0.2);
    &:hover {
      background: fade-in($black-veil, 0.1);
    }
  }
  &__submenu-link {
    @include flex($gap: 10);
    color: $grey;
    text-decoration: none;
    padding: 5px 20px;
    &:hover {
      background: fade-in($black-veil, 0.1);
    }
  }
  &__cl-title {
    @include flex($gap: 5);
  }
  &__cl-name {
    @include cl-name;
    @media (max-width: 375px) {
      font-size: 17px;
    }
  }
  &__cl-tag {
    @include mobile-hide;
  }
}

.fade {
  &-enter-active,
  &-leave-active {
    transform: translateX(0px);
    transition: all 0.5s;
  }
  &-enter-from,
  &-leave-to {
    transform: translateX(-50px);
    opacity: 0;
  }
}
</style>
