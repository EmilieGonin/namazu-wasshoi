<template lang="html">
  <div class="admin">
    <div class="admin__menu">
      <AppButton @click="getDatas('Applicants')" :iconR="'user-check'"
        >Candidatures</AppButton
      >
      <AppButton @click="getDatas('Members')" :iconR="'users'"
        >Membres</AppButton
      >
      <AppButton @click="getDatas('Festivals')" :iconR="'camera'"
        >Festivals Gyôkoso</AppButton
      >
      <AppButton @click="view('NewFestival')" :iconR="'plus'"
        >Créer un Festival</AppButton
      >
      <AppButton @click="getDatas('Parameters')" :iconR="'cog'"
        >Paramètres du site</AppButton
      >
    </div>
    <div
      class="admin__empty"
      v-if="currentView == 'Applicants' && datas.length == 0"
    >
      Aucune candidature disponible
    </div>
    <div v-else-if="currentView">
      <AdminPanelFestival v-if="currentView == 'NewFestival'" />
      <AdminPanelCell
        v-for="(data, index) in datas"
        :key="data.id"
        :data="data"
        :view="currentView"
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
import AdminPanelFestival from "@/components/AdminPanelFestival.vue";

export default {
  name: "AdminPanel",
  components: {
    AppButton,
    AdminPanelCell,
    AdminPanelFestival
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
        console.log(storeDatas);
        this.datas = storeDatas;
        this.currentView = datas;
      });
    },
    view(view) {
      this.datas = "";
      this.currentView = view;
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
