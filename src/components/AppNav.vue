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
      <!--CL Title-->
      <div class="nav__cl-title">
        <span class="nav__cl-name">Namazu Wasshoi</span>
        <span class="nav__cl-tag">« Shoi! »</span>
      </div>
    </div>
    <!--User Menu-->
    <div class="nav__user-menu">
      <!--Avatar-->
      <router-link :to="'/user/' + user.id" v-if="loggedIn">
        <UserAvatar :altStyle="true" v-if="loggedIn"></UserAvatar>
      </router-link>
      <!--Links-->
      <!--if logged in-->
      <router-link class="nav__menu-icon" to="/account" v-if="loggedIn">
        <font-awesome-icon icon="cog" fixed-width />
      </router-link>
      <router-link
        class="nav__menu-icon"
        to="/"
        v-if="loggedIn"
        @click.prevent="logout"
      >
        <font-awesome-icon icon="sign-out-alt" fixed-width />
      </router-link>
      <!--else-->
      <router-link class="nav__menu-icon" to="/login" v-if="!loggedIn">
        <font-awesome-icon icon="sign-in-alt" fixed-width />
        <span class="nav__menu-icon__text"> Se connecter</span>
      </router-link>
      <router-link class="nav__menu-icon" to="/signup" v-if="!loggedIn">
        <font-awesome-icon icon="user-plus" fixed-width />
      </router-link>
    </div>
  </div>
  <!--Submenu-->
  <transition name="fade">
    <div class="nav__submenu" v-show="toggle">
      <!--Admin Panel-->
      <router-link class="nav__submenu-link" to="/admin" v-if="isAdmin">
        <font-awesome-icon icon="user-crown" fixed-width /> Panel administrateur
      </router-link>
      <!--Separation if admin-->
      <div class="nav__separation" v-if="isAdmin"></div>
      <!--Public Links-->
      <router-link class="nav__submenu-link" to="/">
        <font-awesome-icon icon="home-lg-alt" fixed-width /> Accueil
      </router-link>
      <router-link class="nav__submenu-link" to="/members">
        <font-awesome-icon icon="users" fixed-width /> Membres
      </router-link>
      <router-link class="nav__submenu-link" to="/teams">
        <font-awesome-icon icon="stars" fixed-width /> Equipes d'évent
      </router-link>
      <!--only if not logged in-->
      <router-link class="nav__submenu-link" to="/apply" v-if="!loggedIn">
        <font-awesome-icon icon="user-check" fixed-width /> Postuler
      </router-link>
      <!--Separation-->
      <div class="nav__separation"></div>
      <!--Activities Links if logged in-->
      <router-link class="nav__submenu-link" to="/planning" v-if="loggedIn">
        <font-awesome-icon icon="calendar-week" fixed-width /> Planning
      </router-link>
      <router-link
        class="nav__submenu-link"
        to="/festival-gyokoso"
        v-if="loggedIn"
      >
        <font-awesome-icon icon="camera" fixed-width /> Festival Gyôkoso
      </router-link>
      <router-link class="nav__submenu-link" to="/galleries" v-if="loggedIn">
        <font-awesome-icon icon="images" fixed-width /> Galeries
      </router-link>
      <!--Separation-->
      <div class="nav__separation" v-if="loggedIn"></div>
      <!--Account Pages-->
      <!--if logged  in-->
      <router-link class="nav__submenu-link" :to="'/user/' + 1" v-if="loggedIn">
        <font-awesome-icon icon="user" fixed-width /> Profil utilisateur
      </router-link>
      <router-link class="nav__submenu-link" to="/account" v-if="loggedIn">
        <font-awesome-icon icon="cog" fixed-width /> Paramètres du compte
      </router-link>
      <router-link class="nav__submenu-link" :to="'/'" v-if="loggedIn">
        <font-awesome-icon icon="sign-out-alt" fixed-width /> Se déconnecter
      </router-link>
      <!--else-->
      <router-link class="nav__submenu-link" to="/login" v-if="!loggedIn">
        <font-awesome-icon icon="sign-in-alt" fixed-width /> Se connecter
      </router-link>
      <router-link class="nav__submenu-link" to="/signup" v-if="!loggedIn">
        <font-awesome-icon icon="user-plus" fixed-width /> S'inscrire
      </router-link>
    </div>
  </transition>
  <div class="nav__popup" v-show="toggle" @click="close"></div>
</template>

<script>
import { mapGetters } from "vuex";
import UserAvatar from "@/components/UserAvatar.vue";

export default {
  name: "AppNav",
  components: {
    UserAvatar
  },
  props: {
    loggedIn: Boolean,
    isAdmin: Boolean
  },
  data() {
    return {
      toggle: false,
      //temp
      id: "1"
    };
  },
  computed: {
    ...mapGetters(["user"])
  },
  watch: {
    $route() {
      this.toggle = false;
    }
  },
  methods: {
    close() {
      if (this.toggle) {
        this.toggle = false;
      }
    },
    logout() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.nav {
  @include flex($justify: space-between);
  z-index: 998;
  position: fixed;
  width: 100%;
  min-height: 43px;
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
    cursor: pointer;
    padding: 5px;
    border-radius: 5px;
    background: $black-veil;
    color: fade-out($grey, 0.2);
    &:hover {
      background: fade-in($black-veil, 0.1);
    }
    &__text {
      @include mobile-hide;
    }
  }
  &__popup {
    @include absolute-center;
    position: fixed;
    z-index: 997;
  }
  &__submenu {
    @include flex($direction: column);
    z-index: 998;
    position: fixed;
    top: 43px;
    left: 0;
    background: $namazu;
  }
  &__submenu-link {
    @include flex($gap: 10, $justify: flex-start);
    width: 100%;
    color: $grey;
    text-decoration: none;
    padding: 5px 20px;
    &:hover {
      background: fade-in($black-veil, 0.1);
    }
  }
  &__separation {
    width: 90%;
    height: 1px;
    margin: 5px 0;
    background: $grey;
  }
  &__cl-title {
    @include flex($gap: 5);
  }
  &__cl-name {
    @include cursive;
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
