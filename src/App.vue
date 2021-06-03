<template>
  <AppLoading :loading="status == 'pending'" />
  <AppNav />
  <AppHeading :title="title" :icon="icon">{{ title }}</AppHeading>
  <router-view />
</template>

<script>
import { mapGetters } from "vuex";
import AppLoading from "@/components/AppLoading.vue";
import AppHeading from "@/components/AppHeading.vue";
import AppNav from "@/components/AppNav.vue";

export default {
  components: {
    AppLoading,
    AppHeading,
    AppNav
  },
  computed: {
    ...mapGetters(["status", "loggedIn", "title", "icon"])
  }
};
</script>
