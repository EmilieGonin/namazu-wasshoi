<template lang="html">
  <div class="submissions" v-if="submissions">
    <div
      class="submissions__container"
      :class="{ 'submissions__container--selected': selected == submission.id }"
      v-for="submission in submissions"
      :key="submission.id"
      @click="selected ? (selected = '') : (selected = submission.id)"
    >
      <img
        class="submissions__img"
        :src="submission.url"
        :alt="submission.description"
        :title="submission.description"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "FestivalSubmissions",
  data() {
    return {
      submissions: "",
      selected: ""
    };
  },
  mounted() {
    this.$store.dispatch("getFestivals", "now").then(festivals => {
      this.submissions = festivals.current.Screenshots;
    });
  }
};
</script>

<style lang="scss" scoped>
.submissions {
  @include flex($gap: 5);
  flex-wrap: wrap;
  margin-bottom: 15px;
  &__container {
    border: 3px solid white;
    &--selected {
      border: 3px solid veil($valid);
    }
  }
  &__img {
    display: block;
    cursor: pointer;
    width: 200px;
    height: 220px;
    object-fit: cover;
    border: 5px solid white;
    border-bottom: 40px solid white;
    box-shadow: 0 0 2px $main-black;
  }
}
</style>
