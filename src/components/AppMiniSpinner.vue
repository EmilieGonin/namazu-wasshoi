<template lang="html">
  <font-awesome-icon
    class="fa-spin mini-spinner"
    :icon="['fad', 'spinner-third']"
    :style="style"
    fixed-width
  />
</template>

<script>
export default {
  name: "AppMiniSpinner",
  props: {
    color: String
  },
  computed: {
    style() {
      return {
        color: this.color ? this.color : "#b8b6c1"
      };
    }
  }
};
</script>

<style lang="scss" scoped></style>
