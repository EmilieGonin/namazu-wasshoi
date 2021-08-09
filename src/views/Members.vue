<template lang="html">
  <div class="members" v-if="status && status != 'pending'">
    <!--Birthdays-->
    <UsersBirthdays></UsersBirthdays>
    <!--Members-->
    <div class="members__members-pannel">
      <!--Current Selected Member Name-->
      <div
        class="members__name"
        :class="{
          'members__name--empty': !currentMember,
          'members__name--staff': staffMembers && staffMember(currentMember),
          'members__name--gold': currentMember && grade(currentMember, 'gold'),
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
          v-for="member in fcMembers"
          :key="member.ID"
          @click="redirect(member.Name)"
        >
          <!--Member Avatar-->
          <UserAvatar
            class="members__avatar"
            :size="'75'"
            :borderRadius="'25%'"
            :src="member.Avatar"
            alt="Avatar"
            :member="member.Name"
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
  </div>
  <div v-else></div>
</template>

<script>
import { mapGetters } from "vuex";
import UsersBirthdays from "@/components/UsersBirthdays.vue";
import UserAvatar from "@/components/UserAvatar.vue";

export default {
  name: "Members",
  data() {
    return {
      currentMember: "",
      //temp
      gold: ["Nexara Dei-ijla", "Rabyte Tsukisagi"],
      lunar: "Nana Rosenbach",
      fail: "Enael Chubby'fox"
    };
  },
  components: {
    UsersBirthdays,
    UserAvatar
  },
  computed: {
    ...mapGetters(["status", "fcMembers", "staffMembers"])
  },
  mounted() {
    this.$store.dispatch("setFreeCompany");
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
      if (this[grade].includes(member)) {
        return true;
      } else {
        return false;
      }
    },
    redirect(name) {
      //Add api call to get user ID - if user doesn't have an ID, don't redirect and call error message
      console.log(name);

      //temp
      this.$router.push("/user/1");
    }
  }
};
</script>

<style lang="scss" scoped>
.members {
  @include flex($align: stretch);
  width: 100%;
  max-width: 1000px;
  margin: auto;
  &__members-pannel {
    @include flex($justify: space-between, $direction: column);
    width: 100%;
    margin: 20px auto 0 auto;
  }
  &__name {
    @include responsive(900) {
      display: none;
    }
    @include cursive(50);
    @include font-relief($main-black);
    margin-bottom: 10px;
    height: 69px;
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
