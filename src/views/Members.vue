<template lang="html">
  <div class="members" v-if="status && status != 'loading'">
    <div class="members__name">
      {{ currentMember }}
    </div>
    <div class="members__container">
      <div v-for="member in fcMembers" :key="member.ID">
        <img
          class="members__avatar"
          :src="member.Avatar"
          alt="Avatar"
          :title="member.Name"
          @mouseover="setCurrentMember"
          @mouseleave="reset"
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
    ...mapGetters(["status", "fcMembers"])
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
  }
  &__container {
    @include flex($gap: 5);
    position: relative;
    flex-wrap: wrap;
  }
  &__avatar {
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
}
</style>
