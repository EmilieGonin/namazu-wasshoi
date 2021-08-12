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
      user.team && !member && altStyle
        ? 'avatar--alt--' + user.team.toLowerCase()
        : user.team && !member
        ? 'avatar--' + user.team.toLowerCase()
        : ''
    ]"
    :src="member ? member.Avatar : avatar"
    altStyle=""
    :style="avatarSize"
    :title="member ? member.Name : 'Accéder au profil'"
    v-if="avatar || member"
  />
  <AppMiniSpinner v-else />
</template>

<script>
import { mapState } from "vuex";
import AppMiniSpinner from "@/components/AppMiniSpinner.vue";

export default {
  name: "UserAvatar",
  components: {
    AppMiniSpinner
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
    member: Object
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
  computed: {
    avatarSize() {
      return {
        width: this.size + "px",
        height: this.size + "px",
        borderRadius: this.borderRadius
      };
    },
    ...mapState(["user"])
  },
  mounted() {
    if (!this.avatar && !this.member) {
      this.$store
        .dispatch("getCharacter", [this.user.characterId, true])
        .then(character => {
          this.avatar = character.Avatar;
        });
    }
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
