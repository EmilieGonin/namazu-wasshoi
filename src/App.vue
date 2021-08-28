<template>
  <metainfo>
    <template v-slot:title="{ content }">
      {{ content ? `${content} | Namazu Wasshoi` : `Namazu Wasshoi` }}
    </template>
  </metainfo>
  <AppLoading :loading="status == 'pending'" />
  <AppMessages :status="status" :message="message" />
  <AppViewer />
  <AppNav />
  <AppHeading :title="title" :icon="icon">{{ title }}</AppHeading>
  <router-view class="content" />
  <AppFooter />
</template>

<script>
import { useMeta } from "vue-meta";
import { mapGetters, mapState } from "vuex";
import AppLoading from "@/components/AppLoading.vue";
import AppMessages from "@/components/AppMessages.vue";
import AppHeading from "@/components/AppHeading.vue";
import AppNav from "@/components/AppNav.vue";
import AppFooter from "@/components/AppFooter.vue";
import AppViewer from "@/components/AppViewer.vue";

export default {
  components: {
    AppLoading,
    AppMessages,
    AppHeading,
    AppNav,
    AppFooter,
    AppViewer
  },
  setup() {
    useMeta({
      title: "",
      htmlAttrs: { lang: "fr", amp: true }
    });
  },
  computed: {
    ...mapGetters(["status", "title", "icon"]),
    ...mapState(["message"])
  }
};
</script>
