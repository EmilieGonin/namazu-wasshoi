<template>
  <AppNav />
  <router-view />
</template>

<script>
import AppNav from "@/components/AppNav.vue";

export default {
  components: {
    AppNav
  }
};
</script>
