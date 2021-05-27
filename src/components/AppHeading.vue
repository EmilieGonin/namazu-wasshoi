<template lang="html">
  <div class="heading">
    <!--Banner-->
    <img
      class="heading__bann"
      src="@/assets/bann.png"
      alt="Bannière du site"
      :style="setSize"
    />
    <!--Page Title-->
    <div class="heading__title-container">
      <font-awesome-icon class="heading__icon" :icon="icon" fixed-width />
      <h1 class="heading__title"><slot></slot></h1>
    </div>
    <!--Member of the Month-->
  </div>
</template>

<script>
export default {
  name: "AppHeading",
  data() {
    return {
      windowHeight: ""
    };
  },
  props: {
    icon: String
  },
  mounted() {
    this.checkSize();
    window.addEventListener("resize", this.checkSize);
  },
  computed: {
    setSize() {
      return {
        maxHeight: this.windowHeight + "px"
      };
    }
  },
  methods: {
    checkSize() {
      this.windowHeight = window.innerHeight / 1.5;
    }
  }
};
</script>

<style lang="scss" scoped>
.heading {
  position: relative;
  padding-top: 43px;
  &__bann {
    width: 100%;
    object-fit: cover;
    border-bottom: 5px solid $namazu;
  }
  &__title-container {
    @include flex($gap: 5);
    position: absolute;
    bottom: 5px;
    padding: 5px 10px 5px 2px;
    border-top-right-radius: 10px;
    background: $namazu;
    color: $grey;
  }
  &__icon {
    font-size: 20px;
  }
  &__title {
    @include page-title;
    margin: 0;
    margin-top: 3px;
  }
}
</style>
