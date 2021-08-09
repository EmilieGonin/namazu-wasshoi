<template lang="html">
  <transition name="slide-down-without-opacity">
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
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  padding: 5px;
  text-align: center;
  color: white;
  &--success {
    background-color: $valid;
  }
  &--error {
    background-color: $invalid;
  }
}
</style>
