<template>
  <AppLoading />
  <AppNav />
  <AppHeading :title="title" :icon="icon">{{ title }}</AppHeading>
  <router-view />
</template>

<script>
import AppLoading from "@/components/AppLoading.vue";
import AppHeading from "@/components/AppHeading.vue";
import AppNav from "@/components/AppNav.vue";

export default {
  data() {
    return {
      //Temp before creating store
      title: "Bienvenue, petit namazu !",
      icon: "home-lg-alt"
    };
  },
  components: {
    AppLoading,
    AppHeading,
    AppNav
  }
};
</script>
