<template lang="html">
  <div class="profile">
    <div class="profile__line"></div>
    <div class="profile__container" v-if="character">
      <div class="profile__screenshot-container">
        <img
          class="profile__screenshot"
          :src="
            user.Profile.avatar
              ? user.Profile.avatar
              : require('@/assets/avatar-placeholder.png')
          "
          :alt="'Avatar de ' + character.name"
          :title="'Avatar de ' + character.name"
        />
        <UserAvatar
          class="profile__avatar"
          :nofade="true"
          :size="'80'"
          :member="character"
        ></UserAvatar>
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
          {{ character.name }}
        </div>
        <div class="profile__title" v-if="character.title">
          {{ character.title }}
        </div>
        <div class="profile__infos">
          <!--Birthday-->
          <div v-if="user.Profile.birthday">
            <font-awesome-icon :icon="'gift'" fixed-width />
            <AppDate :date="user.Profile.birthday" :birthday="true" />
          </div>
          <!--Discord-->
          <div>
            <font-awesome-icon
              :icon="['fab', 'discord']"
              fixed-width
              v-if="user.Profile.discord"
            />
            {{ user.Profile.discord }}
          </div>
        </div>
        <div class="profile__bio">
          <span v-if="user.Profile.bio">{{ user.Profile.bio }}</span>
          <span v-else>Ce membre ne possède pas de biographie.</span>
        </div>
        <div class="profile__infos">
          <AppButton :iconR="'images'">Galeries</AppButton>
          <AppButton
            :iconR="'arrow-right'"
            @click="go(user.Character.lodestoneId)"
            >Profil Lodestone</AppButton
          >
        </div>
      </div>
    </div>
  </div>
  <!-- <WasshoListe></WasshoListe> -->
</template>

<script>
import { useMeta } from "vue-meta";
import AppButton from "@/components/AppButton.vue";
import AppDate from "@/components/AppDate.vue";
import UserAvatar from "@/components/UserAvatar.vue";
// import WasshoListe from "@/components/WasshoListe.vue";

export default {
  name: "Profile",
  components: {
    AppButton,
    AppDate,
    UserAvatar
    // WasshoListe
  },
  methods: {
    go(id) {
      console.log(id);
      window.open(`https://fr.finalfantasyxiv.com/lodestone/character/${id}`);
    },
    getUser() {
      this.$store
        .dispatch("getUser", this.$route.params.id)
        .then(user => {
          this.user = user;
          this.character = user.Character;
        })
        .catch(() => this.$router.push("/"));
    }
  },
  setup() {
    useMeta({
      title: "Profil utilisateur"
    });
  },
  data() {
    return {
      character: "",
      user: "",
      //temp
      isGold: false,
      isLunar: false,
      isFail: false
    };
  },
  mounted() {
    this.getUser();
  },
  watch: {
    $route(to, from) {
      if (to.name == "Profile" && to.params.id != from.params.id) {
        this.getUser();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.profile {
  position: relative;
  width: 100%;
  &__container {
    @include responsive(375) {
      margin: 0;
    }
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
    @include responsive(375) {
      margin: 0;
    }
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
    height: 580px;
    object-fit: cover;
  }
  &__avatar {
    position: absolute;
    left: 0;
    right: 0;
    bottom: -30px;
    margin: auto;
  }
  &__user-container {
    @include flex($direction: column, $justify: flex-start);
    width: 100%;
    max-width: 500px;
    padding: 20px;
  }
  &__name {
    @include responsive(420) {
      font-size: 35px;
    }
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
  &__infos {
    @include flex($gap: 10);
    margin-top: 10px;
    width: 100%;
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
