<template lang="html">
  <div class="heading">
    <!--Banner-->
    <img
      class="heading__bann"
      src="@/assets/bann.png"
      alt="Bannière du site"
      v-if="display"
      :style="setSize"
    />
    <!--Page Title-->
    <div class="heading__title-container" v-if="!fullscreen">
      <font-awesome-icon
        class="heading__icon"
        :icon="icon"
        v-if="icon"
        fixed-width
      />
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
      windowHeight: "",
      fullscreen: false,
      display: true
    };
  },
  props: {
    icon: String
  },
  mounted() {
    window.addEventListener("resize", this.checkSize);
  },
  computed: {
    setSize() {
      return {
        height: this.windowHeight + "px"
      };
    }
  },
  watch: {
    $route() {
      this.checkSize();
    }
  },
  methods: {
    checkSize() {
      const name = this.$route.name;
      const fullscreenPages = ["Login", "Signup"];
      const noBannerPages = ["FestivalGyokoso", "AdminPanel"];

      if (!noBannerPages.includes(name)) {
        this.display = true;
        if (fullscreenPages.includes(name)) {
          this.windowHeight = window.innerHeight - 43;
          this.fullscreen = true;
        } else if (name == "Home") {
          this.windowHeight = window.innerHeight / 1.5;
        } else {
          this.windowHeight = window.innerHeight / 4;
        }
      } else {
        this.display = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.heading {
  position: relative;
  padding-top: 43px;
  &__bann {
    display: block;
    width: 100%;
    object-fit: cover;
    transition: all 500ms;
  }
  &__title-container {
    @include flex($gap: 5);
    position: absolute;
    z-index: 2;
    bottom: 10px;
    padding: 5px 10px 5px 2px;
    background: $namazu;
    color: white;
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
