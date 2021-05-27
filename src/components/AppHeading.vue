<template lang="html">
  <div class="heading">
    <!--Banner-->
    <img
      class="heading__bann"
      src="@/assets/bann.png"
      alt=""
      :style="setSize"
    />
    <!--Member of the Month-->
  </div>
</template>

<script>
export default {
  name: "AppHeading",
  data() {
    return {
      windowHeight: "",
      windowWidth: ""
    };
  },
  mounted() {
    this.checkSize();
    window.addEventListener("resize", this.checkSize);
  },
  computed: {
    setSize() {
      return {
        maxHeight: this.windowHeight + "px",
        maxWidth: this.windowWidth + "px"
      };
    }
  },
  methods: {
    checkSize() {
      this.windowHeight = window.innerHeight / 1.5;
      this.windowWidth = window.innerWidth;
    }
  }
};
</script>

<style lang="scss" scoped>
.heading {
  padding-top: 43px;
  &__bann {
    width: 100%;
    object-fit: cover;
  }
}
</style>
