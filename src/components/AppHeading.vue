<template lang="html">
  <div class="heading">
    <!--Banner-->
    <img
      class="heading__bann"
      src="@/assets/bann.png"
      alt="Bannière du site"
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
      windowHeight: ""
    };
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
  padding-top: 43px;
  &__bann {
    width: 100%;
    object-fit: cover;
  }
}
</style>
