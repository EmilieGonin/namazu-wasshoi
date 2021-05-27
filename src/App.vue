<template>
  <AppNav />
  <AppHeading />
  <router-view />
</template>

<script>
import AppNav from "@/components/AppNav.vue";
import AppHeading from "@/components/AppHeading.vue";

export default {
  components: {
    AppNav,
    AppHeading
  }
};
</script>
