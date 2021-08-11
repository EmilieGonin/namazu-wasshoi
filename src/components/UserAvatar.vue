<template lang="html">
  <img
    class="avatar"
    :class="[
      {
        'avatar--gold': member && grade(member.Name, 'gold'),
        'avatar--lunar': member && grade(member.Name, 'lunar'),
        'avatar--fail': member && grade(member.Name, 'fail'),
        'avatar--alt': altStyle,
        'avatar--nofade': nofade
      },
      userTeam && !memberAvatar && altStyle
        ? 'avatar--alt--' + userTeam.toLowerCase()
        : userTeam && !memberAvatar
        ? 'avatar--' + userTeam.toLowerCase()
        : ''
    ]"
    :src="memberAvatar ? memberAvatar : avatar"
    altStyle=""
    :style="avatarSize"
    :title="memberName ? memberName : 'Accéder au profil'"
    v-if="avatar || memberAvatar"
  />
  <AppMiniSpinner v-else />
</template>

<script>
import { mapGetters } from "vuex";
import AppMiniSpinner from "@/components/AppMiniSpinner.vue";

export default {
  name: "UserAvatar",
  components: {
    AppMiniSpinner
  },
  data() {
    return {
      avatar: "",
      //temp
      gold: ["Nexara Dei-ijla", "Rabyte Tsukisagi"],
      lunar: "Nana Rosenbach",
      fail: "Enael Chubby'fox"
    };
  },
  mounted() {
    if (!this.avatar && !this.memberAvatar) {
      this.$store.dispatch("getCharacter").then(character => {
        this.avatar = character.Character.Avatar;
      });
    }
  },
  props: {
    size: [String, Number],
    borderRadius: String,
    altStyle: {
      type: Boolean,
      default: false
    },
    nofade: {
      type: Boolean,
      default: false
    },
    memberName: String,
    memberAvatar: String
  },
  computed: {
    avatarSize() {
      return {
        width: this.size + "px",
        height: this.size + "px",
        borderRadius: this.borderRadius
      };
    },
    ...mapGetters(["userTeam"])
  },
  methods: {
    //temp
    grade(member, grade) {
      if (this[grade].includes(member)) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.avatar {
  display: block;
  cursor: pointer;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 3px solid $grey;
  box-shadow: 0 0 2px $main-black;
  object-fit: cover;
  &:hover {
    border: 3px solid $namazu;
  }
  &--alt {
    border: 2px solid $grey;
    &:hover {
      border: 2px solid fade-in($black-veil, 0.1);
    }
  }
  &--gold {
    border: 3px solid pastel($gold);
    &:hover {
      border: 3px solid $gold;
    }
  }
  &--lunar {
    border: 3px solid pastel($lunar);
    &:hover {
      border: 3px solid $lunar;
    }
  }
  &--fail {
    border: 3px solid pastel($fail);
    &:hover {
      border: 3px solid $fail;
    }
  }
  &--nofade {
    opacity: 1;
  }

  @each $team, $color in $teams {
    &--#{$team} {
      border: 3px solid $color;
    }
    &--alt--#{$team} {
      border: 2px solid $color;
    }
  }
}
</style>
