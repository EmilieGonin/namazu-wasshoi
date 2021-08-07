<template lang="html">
  <div class="admin">
    <AppButton @click="clear">Clear Cache</AppButton>
  </div>
</template>

<script>
import AppButton from "@/components/AppButton.vue";

export default {
  name: "AdminPanel",
  components: {
    AppButton
  },
  methods: {
    clear() {
      localStorage.clear();
    }
  }
};
</script>

<style lang="scss" scoped></style>
