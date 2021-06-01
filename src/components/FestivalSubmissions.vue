<template lang="html">
  <div class="submissions">
    <img class="submissions__img" src="@/assets/sample.png" alt="" />
    <img class="submissions__img" src="@/assets/sample.png" alt="" />
    <img class="submissions__img" src="@/assets/sample.png" alt="" />
    <img class="submissions__img" src="@/assets/sample.png" alt="" />
    <img class="submissions__img" src="@/assets/sample.png" alt="" />
    <img class="submissions__img" src="@/assets/sample.png" alt="" />
  </div>
</template>

<script>
// import AppButton from "@/components/AppButton.vue";

export default {
  name: "FestivalSubmissions"
};
</script>

<style lang="scss" scoped>
.submissions {
  @include flex($gap: 10);
  flex-wrap: wrap;
  margin-bottom: 15px;
  &__img {
    cursor: pointer;
    width: 200px;
    height: 230px;
    object-fit: cover;
    border: 5px solid white;
    border-bottom: 50px solid white;
    box-shadow: 0 0 2px $main-black;
  }
}
</style>
