<template lang="html">
  <font-awesome-icon
    class="fa-spin mini-spinner"
    :icon="['fad', 'spinner-third']"
    fixed-width
  />
</template>

<script>
export default {
  name: "AppMiniSpinner"
};
</script>

<style lang="scss" scoped>
.mini-spinner {
  color: white;
}
</style>
