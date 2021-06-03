<template lang="html">
  <div class="members" v-if="status && status != 'loading'">
    <!--Birthdays-->
    <UsersBirthdays></UsersBirthdays>
    <!--Members-->
    <div class="members__members-pannel">
      <!--Current Selected Member Name-->
      <div
        class="members__name"
        :class="{
          'members__name--empty': !currentMember,
          'members__name--staff': staffMember(currentMember)
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
        >
          <!--Member Avatar-->
          <img
            class="members__avatar"
            :src="member.Avatar"
            alt="Avatar"
            :title="member.Name"
            @mouseover="setCurrentMember"
            @mouseleave="reset"
          />
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
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import UsersBirthdays from "@/components/UsersBirthdays.vue";

export default {
  name: "Members",
  data() {
    return {
      currentMember: ""
    };
  },
  components: {
    UsersBirthdays
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
    @include flex($direction: column);
    width: 100%;
    margin: 20px auto;
  }
  &__name {
    @include responsive(900) {
      display: none;
    }
    @include cursive(50);
    margin-bottom: 10px;
    height: 69px;
    &--empty {
      color: dark($grey);
    }
    &--staff {
      color: $namazu;
    }
  }
  &__container {
    @include flex($gap: 5);
    position: relative;
    flex-wrap: wrap;
  }
  &__avatar-container {
    position: relative;
  }
  &__avatar {
    @include responsive(900) {
      width: 70px;
    }
    cursor: pointer;
    width: 80px;
    opacity: 0.5;
    border-radius: 25%;
    border: 3px solid $grey;
    box-shadow: 0 0 2px $main-black;
    &:hover {
      border: 3px solid $namazu;
      opacity: 1;
    }
  }
  &__staff-icon {
    position: absolute;
    bottom: 0;
    right: -5px;
  }
}
</style>
