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
  @include flex($direction: column);
  width: 100%;
  max-width: 800px;
  margin: auto;
  &__name {
    @include cursive(50);
    margin: 10px 0;
    height: 69px;
  }
  &__container {
    @include flex($gap: 5);
    flex-wrap: wrap;
  }
  &__avatar {
    cursor: pointer;
    width: 70px;
    border-radius: 25%;
    border: 3px solid $grey;
    box-shadow: 0 0 2px $main-black;
    &:hover {
      border: 3px solid $namazu;
    }
  }
}
</style>
