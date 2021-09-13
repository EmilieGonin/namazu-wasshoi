<template lang="html">
  <div class="admin">
    <div class="admin__menu">
      <AppButton @click="getDatas('Applicants')" :iconR="'user-check'"
        >Candidatures</AppButton
      >
      <AppButton @click="getDatas('Users')" :iconR="'users'">Membres</AppButton>
      <AppButton @click="getDatas('Festivals')" :iconR="'camera'"
        >Festivals Gyôkoso</AppButton
      >
      <AppButton @click="create = !create" :iconR="'plus'"
        >Créer un Festival</AppButton
      >
      <AppButton @click="getDatas('Parameters')" :iconR="'cog'"
        >Paramètres du site</AppButton
      >
    </div>
    <div class="admin__panel" :class="{ 'admin__panel--open': currentView }">
      <transition name="quick-fade" mode="out-in">
        <div
          class="admin__empty"
          v-if="currentView == 'Applicants' && datas.length == 0"
        >
          Aucune candidature disponible
        </div>
        <AdminPanelFestival v-else-if="currentView == 'NewFestival'" />
        <div v-else-if="currentView">
          <AdminPanelCell
            v-for="(data, index) in datas"
            :key="data.id"
            :data="data"
            :view="currentView"
            @delete="deleteItem(index)"
            @update="getDatas(currentView)"
          />
        </div>
      </transition>
    </div>
    <AppButton @click="clear" class="admin__button">Clear Cache</AppButton>
    <transition name="quick-fade">
      <AppPopup @close="create = !create" v-if="create">
        <form
          class="form"
          @submit.prevent="submit"
          @keyup.enter="submit"
          method="post"
        >
          <div class="form__title">
            Créer un Festival
          </div>
          <div class="form__panel">
            <FormElement
              v-model="form_theme"
              :label="'Theme'"
              :name="'form_theme'"
              :required="true"
            ></FormElement>
            <FormElement
              v-model="form_edition"
              :label="'Edition'"
              :name="'form_edition'"
              :type="'number'"
              :required="true"
            ></FormElement>
          </div>
          <FormElement
            v-model="form_start_date"
            :label="'Date de début'"
            :name="'form_start_date'"
            :type="'date'"
            :required="true"
          ></FormElement>
          <FormElement
            v-model="form_vote_date"
            :label="'Date des votes'"
            :name="'form_vote_date'"
            :type="'date'"
            :required="true"
          ></FormElement>
          <FormElement
            v-model="form_end_date"
            :label="'Date de fin'"
            :name="'form_end_date'"
            :type="'date'"
            :required="true"
          ></FormElement>

          <div class="form__legend">
            La date de début doit correspondre à la date de fin du festival
            précédent. La date des votes correspond au dernier samedi du mois et
            la date de fin correspond au dernier dimanche du mois.
          </div>
          <AppButton :iconR="'plus'" @click="submit">Créer</AppButton>
        </form>
      </AppPopup>
    </transition>
  </div>
</template>

<script>
import { useMeta } from "vue-meta";
import { formValidate } from "@/mixins.js";
import AppButton from "@/components/AppButton.vue";
import AppPopup from "@/components/AppPopup.vue";
import AdminPanelCell from "@/components/AdminPanelCell.vue";
import FormElement from "@/components/FormElement.vue";

export default {
  name: "AdminPanel",
  components: {
    AppButton,
    AppPopup,
    AdminPanelCell,
    FormElement
  },
  setup() {
    useMeta({
      title: "Panel administrateur"
    });
  },
  data() {
    return {
      currentView: "",
      datas: "",
      create: false,
      form_theme: "",
      form_edition: "",
      form_start_date: "",
      form_vote_date: "",
      form_end_date: ""
    };
  },
  mixins: [formValidate],
  methods: {
    clear() {
      localStorage.clear();
    },
    getDatas(datas) {
      this.currentView = "";
      this.datas = "";
      this.$store.dispatch("get" + datas).then(storeDatas => {
        this.datas = storeDatas;
        this.currentView = datas;
      });
    },
    deleteItem(index) {
      this.datas.splice(index, 1);
    },
    submit() {
      try {
        const form = this.formValidate();
        this.$store
          .dispatch("newFestival", form)
          .then(() => (this.create = false))
          .catch(e => {
            console.error(e);
          });
      } catch (e) {
        console.error(e);
      }
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
  &__panel {
    @include responsive(1024) {
      padding: 20px;
    }
    width: 100%;
    max-width: 1200px;
    margin: auto;
    border-radius: 25px;
    border: 3px dotted $minor-white;
    padding: 50px;
    transition: all 500ms;
    &--open {
      border: 3px dotted white;
      box-shadow: 0 0 5px $grey;
    }
  }
}
</style>
