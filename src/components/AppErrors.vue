<template lang="html">
  <transition name="slide-down-long">
    <div class="errors" v-if="errors">
      <font-awesome-icon :icon="'times-circle'" fixed-width />
      {{ errors }}
    </div>
  </transition>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "AppErrors",
  computed: {
    ...mapState(["errors"])
  }
};
</script>

<style lang="scss" scoped>
.errors {
  width: 100%;
  max-width: 580px;
  margin: auto;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  padding: 5px;
  text-align: center;
  font-size: $font-small;
  color: $namazu;
  background: white;
  border-top: 3px solid $namazu;
  border-radius: 10px 10px 0 0;
}
</style>
