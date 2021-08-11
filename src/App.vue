<template>
  <AppLoading :loading="status == 'pending'" />
  <AppMessages :status="status" :message="message" />
  <AppNav />
  <AppHeading :title="title" :icon="icon">{{ title }}</AppHeading>
  <router-view class="content" />
  <AppFooter />
</template>

<script>
import { mapGetters, mapState } from "vuex";
import AppLoading from "@/components/AppLoading.vue";
import AppMessages from "@/components/AppMessages.vue";
import AppHeading from "@/components/AppHeading.vue";
import AppNav from "@/components/AppNav.vue";
import AppFooter from "@/components/AppFooter.vue";

export default {
  components: {
    AppLoading,
    AppMessages,
    AppHeading,
    AppNav,
    AppFooter
  },
  computed: {
    ...mapGetters(["status", "title", "icon"]),
    ...mapState(["message"])
  }
};
</script>
