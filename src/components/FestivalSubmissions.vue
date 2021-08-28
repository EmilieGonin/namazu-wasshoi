<template lang="html">
  <div class="submissions" v-if="submissions">
    <div class="submissions__container">
      <div
        class="submissions__img-container"
        :class="{
          'submissions__img-container--selected': selected == submission.id
        }"
        v-for="submission in submissions"
        :key="submission.id"
      >
        <img
          class="submissions__img"
          :src="submission.url"
          :alt="submission.description"
          :title="submission.description"
          @click="
            form_selected == submission.id
              ? (selected = '')
              : (selected = submission.id)
          "
        />
        <transition name="fade">
          <font-awesome-icon
            class="submissions__selected"
            :icon="'check-circle'"
            fixed-width
            v-if="selected == submission.id"
          />
        </transition>
        <div
          class="submissions__icon"
          @click="setImageViewer(submission.url, submission.description)"
        >
          <font-awesome-icon :icon="'expand-alt'" fixed-width />
        </div>
      </div>
    </div>
    <AppButton @click="submit">Valider le vote</AppButton>
  </div>
</template>

<script>
import AppButton from "@/components/AppButton.vue";

export default {
  name: "FestivalSubmissions",
  components: {
    AppButton
  },
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
    },
    submit() {
      try {
        if (!this.selected) {
          const error = "Veuillez choisir une participation.";
          this.$store.dispatch("error", error);
          throw error;
        }

        this.$store
          .dispatch("submitVote", this.selected)
          .then(() => {
            this.selected = "";
          })
          .catch(e => {
            console.error(e);
          });
      } catch (e) {
        console.error(e);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.submissions {
  @include flex($direction: column, $gap: 10);
  &__container {
    @include flex($gap: 5);
    flex-wrap: wrap;
    margin-bottom: 15px;
  }
  &__img-container {
    position: relative;
    border: 2px solid white;
    transition: all 500ms;
    &--selected {
      border: 2px solid veil($valid);
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
  &__selected {
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    margin: auto;
    font-size: 30px;
    color: $valid;
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
