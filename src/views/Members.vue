<template lang="html">
  <div class="members" v-if="status && status != 'loading'">
    <div
      class="members__name"
      :class="{ 'members__name--staff': staffMember(currentMember) }"
    >
      {{ currentMember }}
    </div>
    <div class="members__container">
      <div
        class="members__avatar-container"
        v-for="member in fcMembers"
        :key="member.ID"
      >
        <img
          class="members__avatar"
          :src="member.Avatar"
          alt="Avatar"
          :title="member.Name"
          @mouseover="setCurrentMember"
          @mouseleave="reset"
        />
        <img
          class="members__staff-icon"
          :src="member.RankIcon"
          alt=""
          v-if="staffMember(member.Name)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Members",
  data() {
    return {
      currentMember: ""
    };
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
  @include responsive(900) {
    margin: 20px auto;
  }
  @include flex($direction: column);
  width: 100%;
  max-width: 800px;
  margin: 10px auto;
  &__name {
    @include responsive(900) {
      display: none;
    }
    @include cursive(50);
    margin-bottom: 10px;
    height: 69px;
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
