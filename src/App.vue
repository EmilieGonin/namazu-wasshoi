<template>
  <AppLoading :loading="status == 'pending'" />
  <AppErrors />
  <AppNav />
  <AppHeading :title="title" :icon="icon">{{ title }}</AppHeading>
  <router-view class="content" />
  <AppFooter />
</template>

<script>
import { mapGetters, mapState } from "vuex";
import AppLoading from "@/components/AppLoading.vue";
import AppErrors from "@/components/AppErrors.vue";
import AppHeading from "@/components/AppHeading.vue";
import AppNav from "@/components/AppNav.vue";
import AppFooter from "@/components/AppFooter.vue";

export default {
  components: {
    AppLoading,
    AppErrors,
    AppHeading,
    AppNav,
    AppFooter
  },
  computed: {
    ...mapGetters(["status", "loggedIn", "title", "icon"]),
    ...mapState(["errors"])
  }
};
</script>
