<template lang="html">
  <div class="admin">
    <div class="admin__menu">
      <AppButton @click="getDatas('Applicants')">Candidatures</AppButton>
      <AppButton @click="getDatas('Members')">Membres</AppButton>
      <AppButton @click="getDatas('Festivals')">Festival Gyôkoso</AppButton>
      <AppButton @click="getDatas('Parameters')">Paramètres</AppButton>
    </div>
    <div
      class="admin__empty"
      v-if="currentView == 'Applicants' && datas.length == 0"
    >
      Aucune candidature disponible
    </div>
    <div v-else-if="currentView == 'Applicants'">
      <AdminPanelCell
        v-for="(data, index) in datas"
        :key="data.id"
        :data="data"
        :applicant="true"
        @delete="deleteItem(index)"
      />
    </div>
    <div v-if="currentView == 'Members'">
      <AdminPanelCell
        v-for="(data, index) in datas"
        :key="data.id"
        :data="data"
        @delete="deleteItem(index)"
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
      datas: ""
    };
  },
  methods: {
    clear() {
      localStorage.clear();
    },
    getDatas(datas) {
      this.datas = "";
      this.$store.dispatch("get" + datas).then(storeDatas => {
        this.datas = storeDatas;
        this.currentView = datas;
      });
    },
    deleteItem(index) {
      this.datas.splice(index, 1);
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
