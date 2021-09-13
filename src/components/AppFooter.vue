<template lang="html">
  <div class="footer" v-if="show()"></div>
</template>

<script>
export default {
  name: "AppFooter",
  methods: {
    show() {
      const forbiddenLinks = [
        "FestivalGyokoso",
        "Login",
        "Signup",
        "AdminPanel"
      ];
      if (forbiddenLinks.includes(this.$route.name)) {
        return false;
      } else {
        return true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.footer {
  width: 100%;
  height: 50px;
  background: $namazu;
}
</style>
