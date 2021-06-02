<template lang="html">
  <div class="submissions">
    <div class="submissions__container submissions__container--selected">
      <img class="submissions__img" src="@/assets/sample.png" alt="" />
    </div>
    <div class="submissions__container">
      <img class="submissions__img" src="@/assets/sample.png" alt="" />
    </div>
    <div class="submissions__container">
      <img class="submissions__img" src="@/assets/sample.png" alt="" />
    </div>
    <div class="submissions__container">
      <img class="submissions__img" src="@/assets/sample.png" alt="" />
    </div>
    <div class="submissions__container">
      <img class="submissions__img" src="@/assets/sample.png" alt="" />
    </div>
    <div class="submissions__container">
      <img class="submissions__img" src="@/assets/sample.png" alt="" />
    </div>
  </div>
</template>

<script>
// import AppButton from "@/components/AppButton.vue";

export default {
  name: "FestivalSubmissions",
  data() {
    return {
      selected: ""
    };
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
      border-radius: 5px;
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
