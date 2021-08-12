<template lang="html">
  <div class="admin">
    <div class="admin__menu">
      <AppButton @click="[getApplicants(), (currentView = 'applicants')]"
        >Candidatures</AppButton
      >
      <AppButton @click="[getMembers(), (currentView = 'members')]"
        >Membres</AppButton
      >
      <AppButton @click="currentView = 'festival'">Festival Gyôkoso</AppButton>
    </div>
    <div v-if="currentView == 'applicants'">
      <AdminPanelCell
        v-for="applicant in data"
        :key="applicant.id"
        :applicant="applicant"
      />
    </div>
    <div v-if="currentView == 'members'">
      <AdminPanelCell
        v-for="member in data"
        :key="member.id"
        :member="member"
      />
    </div>
    <AppButton @click="clear" class="admin__button">Clear Cache</AppButton>
  </div>
</template>

<script>
import { useMeta } from "vue-meta";
import AppButton from "@/components/AppButton.vue";
import AdminPanelCell from "@/components/AdminPanelCell.vue";

export default {
  name: "AdminPanel",
  components: {
    AppButton,
    AdminPanelCell
  },
  setup() {
    useMeta({
      title: "Panel administrateur"
    });
  },
  data() {
    return {
      currentView: "",
      data: ""
    };
  },
  methods: {
    clear() {
      localStorage.clear();
    },
    getApplicants() {
      this.$store.dispatch("getApplicants").then(applicants => {
        this.data = applicants;
      });
    },
    getMembers() {
      this.$store.dispatch("getMembers").then(members => {
        this.data = members;
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
