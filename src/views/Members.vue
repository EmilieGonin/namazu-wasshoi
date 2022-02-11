<template lang="html">
  <div class="members" v-if="members">
    <!--Members Pannel-->
    <div class="members__panel">
      <!--Current Selected Member Name-->
      <div
        class="members__name"
        :class="{
          'members__name--empty': !currentMember,
          'members__name--staff': staffMembers && staffMember(currentMember),
          'members__name--gold':
            currentMember && grade(currentMember, 'golden'),
          'members__name--lunar':
            currentMember && grade(currentMember, 'lunar'),
          'members__name--fail': currentMember && grade(currentMember, 'fail')
        }"
      >
        {{ currentMember || "Sélectionnez un membre" }}
      </div>
      <!--Members Icons Container-->
      <div class="members__container">
        <div
          class="members__avatar-container"
          v-for="member in members"
          :key="member.ID"
          @click="redirect(member.Name)"
        >
          <!--Member Avatar-->
          <UserAvatar
            class="members__avatar"
            :size="'75'"
            :borderRadius="'25%'"
            alt="Avatar"
            :member="member"
            :golden="golden"
            :fail="fail"
            :lunar="lunar"
            @mouseover="setCurrentMember"
            @mouseleave="reset"
          ></UserAvatar>
          <!--Member Rank Icon-->
          <img
            class="members__staff-icon"
            :src="member.RankIcon"
            alt=""
            v-if="staffMember(member.Name)"
          />
        </div>
      </div>
    </div>
    <!--Legend-->
    <div class="members__legend-container">
      <div class="members__legend">
        <div class="members__line members__line--gold"></div>
        <span>Namazu dorés</span>
      </div>
      <div class="members__legend">
        <div class="members__line members__line--lunar"></div>
        <span>Namazu lunaire</span>
      </div>
      <div class="members__legend">
        <div class="members__line members__line--fail"></div>
        <span>Namazu espiègle</span>
      </div>
    </div>
  </div>
  <div v-else></div>
</template>

<script>
import { useMeta } from "vue-meta";
import UserAvatar from "@/components/UserAvatar.vue";

export default {
  name: "Members",
  setup() {
    useMeta({
      title: "Membres"
    });
  },
  data() {
    return {
      currentMember: "",
      members: "",
      staffMembers: "",
      golden: "",
      lunar: "",
      fail: ""
    };
  },
  components: {
    UserAvatar
  },
  mounted() {
    this.$store.dispatch("setFreeCompany").then(fc => {
      this.members = fc.fcMembers;
      this.staffMembers = fc.staffMembers;
    });
    this.$store.dispatch("getUsersRoles").then(roles => {
      //Temporary use manual names
      this.golden = roles.golden ? roles.golden : "[]";
      this.lunar = roles.lunar ? roles.lunar : "";
      this.fail = roles.fail ? roles.fail : "";
    });
  },
  methods: {
    setCurrentMember(e) {
      this.currentMember = e.target.title;
    },
    reset() {
      this.currentMember = "";
    },
    staffMember(member) {
      if (this.staffMembers.includes(member)) {
        return true;
      } else {
        return false;
      }
    },
    //temp
    grade(member, grade) {
      if (this[grade] && this[grade].includes(member)) {
        return true;
      } else {
        return false;
      }
    },
    redirect(name) {
      console.log(name);
      this.$store
        .dispatch("getUserByCharacterName", name)
        .then(id => {
          this.$router.push("/user/" + id);
        })
        .catch(e => console.error(e));
    }
  }
};
</script>

<style lang="scss" scoped>
.members {
  @include flex($justify: space-between, $direction: column);
  width: 100%;
  &__panel {
    width: 100%;
    max-width: 800px;
    margin: auto;
    margin-top: 20px;
  }
  &__name {
    @include responsive(900) {
      display: none;
    }
    @include cursive(50);
    @include font-relief($main-black);
    margin-bottom: 10px;
    height: 69px;
    text-align: center;
    &--empty {
      @include font-relief(dark($grey));
    }
    &--staff {
      @include font-relief($namazu);
    }
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
  &__container {
    @include flex($gap: 5);
    position: relative;
    flex-wrap: wrap;
    margin-bottom: 20px;
  }
  &__avatar-container {
    position: relative;
  }
  &__staff-icon {
    position: absolute;
    bottom: 0;
    right: -5px;
  }
  &__legend-container {
    @include flex($gap: 15);
    flex-wrap: wrap;
    width: 100%;
    padding: 10px;
    background: white;
    font-size: $font-small;
  }
  &__legend {
    @include flex($gap: 5);
    flex-wrap: wrap;
    text-align: center;
  }
  &__line {
    width: 20px;
    height: 3px;
    &--gold {
      background: pastel($gold);
    }
    &--lunar {
      background: pastel($lunar);
    }
    &--fail {
      background: pastel($fail);
    }
  }
}
</style>
