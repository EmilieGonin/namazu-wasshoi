<template lang="html">
  <div class="submissions" v-if="submissions">
    <div
      class="submissions__container"
      :class="{ 'submissions__container--selected': selected == submission.id }"
      v-for="submission in submissions"
      :key="submission.id"
    >
      <img
        class="submissions__img"
        :src="submission.url"
        :alt="submission.description"
        :title="submission.description"
        @click="
          selected == submission.id
            ? (selected = '')
            : (selected = submission.id)
        "
      />
      <div
        class="submissions__icon"
        @click="setImageViewer(submission.url, submission.description)"
      >
        <font-awesome-icon :icon="'expand-alt'" fixed-width />
      </div>
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
  },
  methods: {
    setImageViewer(url, title) {
      const image = { url: url, title: title };
      this.$store.dispatch("setImageViewer", image);
    }
  }
};
</script>

<style lang="scss" scoped>
.submissions {
  @include flex($gap: 5);
  flex-wrap: wrap;
  margin-bottom: 15px;
  &__container {
    position: relative;
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
  &__icon {
    position: absolute;
    top: 2px;
    right: 2px;
    cursor: pointer;
    background-color: white;
    padding: 2px;
    border-radius: 0 0 0 10px;
  }
}
</style>
