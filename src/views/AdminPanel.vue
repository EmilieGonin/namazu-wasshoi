<template lang="html">
  <div class="admin">
    <div v-if="applicants">
      <AdminPanelApplicant
        v-for="applicant in applicants"
        :key="applicant.id"
        :applicant="applicant"
      />
    </div>
    <AppButton @click="clear" class="admin__button">Clear Cache</AppButton>
  </div>
</template>

<script>
import AppButton from "@/components/AppButton.vue";
import AdminPanelApplicant from "@/components/AdminPanelApplicant.vue";

export default {
  name: "AdminPanel",
  components: {
    AppButton,
    AdminPanelApplicant
  },
  data() {
    return {
      applicants: []
    };
  },
  mounted() {
    this.$store.dispatch("getApplicants").then(applicants => {
      this.applicants = applicants;
    });
  },
  methods: {
    clear() {
      localStorage.clear();
    }
  }
};
</script>

<style lang="scss" scoped>
.admin {
  &__button {
    position: fixed !important;
    bottom: 0;
    left: 0;
  }
}
</style>
