<template lang="html">
  <div class="admin">
    <div class="admin__menu">
      <AppButton @click="[getApplicants(), (currentView = 'applicants')]"
        >Candidatures</AppButton
      >
      <AppButton @click="currentView = 'members'">Membres</AppButton>
      <AppButton @click="currentView = 'festival'">Festival Gyôkoso</AppButton>
    </div>
    <div v-if="currentView == 'applicants'">
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
      applicants: "",
      currentView: ""
    };
  },
  methods: {
    clear() {
      localStorage.clear();
    },
    getApplicants() {
      this.$store.dispatch("getApplicants").then(applicants => {
        this.applicants = applicants;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.admin {
  &__menu {
    @include flex($gap: 10);
    flex-wrap: wrap;
    margin: 10px;
  }
  &__button {
    position: fixed !important;
    bottom: 0;
    left: 0;
  }
}
</style>
