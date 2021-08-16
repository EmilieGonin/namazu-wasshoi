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
    <div
      class="admin__empty"
      v-if="currentView == 'applicants' && datas.length == 0"
    >
      Aucune candidature disponible
    </div>
    <div v-else-if="currentView == 'applicants'">
      <AdminPanelCell
        v-for="data in datas"
        :key="data.id"
        :data="data"
        :applicant="true"
      />
    </div>
    <div v-if="currentView == 'members'">
      <AdminPanelCell v-for="data in datas" :key="data.id" :data="data" />
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
      datas: ""
    };
  },
  methods: {
    clear() {
      localStorage.clear();
    },
    getApplicants() {
      this.datas = "";
      this.$store.dispatch("getApplicants").then(applicants => {
        this.datas = applicants;
      });
    },
    getMembers() {
      this.datas = "";
      this.$store.dispatch("getMembers").then(members => {
        this.datas = members;
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
  &__empty {
    @include responsive(400) {
      border-radius: 0;
    }
    width: 100%;
    max-width: 400px;
    margin: 20px auto;
    padding: 5px;
    border-radius: 5px;
    text-align: center;
    background-color: $invalid;
    color: white;
  }
}
</style>
