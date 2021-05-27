<template>
  <AppLoading />
  <AppNav />
  <router-view />
</template>

<script>
import AppLoading from "@/components/AppLoading.vue";
import AppNav from "@/components/AppNav.vue";

export default {
  components: {
    AppLoading,
    AppNav
  }
};
</script>
