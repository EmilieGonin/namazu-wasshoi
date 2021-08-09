<template lang="html">
  <transition name="slide-down-long">
    <div
      class="message"
      :class="{
        'message--success': status == 'success',
        'message--error': status == 'error'
      }"
      v-if="message"
    >
      <font-awesome-icon
        :icon="'check-circle'"
        fixed-width
        v-if="status == 'success'"
      />
      <font-awesome-icon :icon="'times-circle'" fixed-width v-else />
      {{ message }}
    </div>
  </transition>
</template>

<script>
export default {
  name: "AppMessages",
  props: ["message", "status"]
};
</script>

<style lang="scss" scoped>
.message {
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
