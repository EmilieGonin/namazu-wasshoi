<template lang="html">
  <div class="wassholiste" v-if="edit">
    <form class="form" @submit.prevent="submit" method="post">
      <WasshoListeElement
        v-for="item in missions"
        :key="item.name"
        :inputs="item.inputs"
        :name="item.name"
        @check="handleCheck"
      ></WasshoListeElement>
      <AppButton :iconR="'arrow-right'">Mettre à jour</AppButton>
    </form>
  </div>
  <div class="wassholiste" v-else>
    WasshoListe
  </div>
</template>

<script>
import WasshoListeElement from "@/components/WasshoListeElement";
import AppButton from "@/components/AppButton.vue";

export default {
  name: "WasshoListe",
  data() {
    return {
      //temp
      checked: [],
      missions: [
        {
          name: "A REALM REBORN • DEFIS EXTRÊMES",
          inputs: [
            { name: "Le fléau d'Ultima • Ultima Arma", label: "sample" },
            { name: "Hurloeil (extrême) • Garuda", label: "sample" },
            { name: "Le Nombril (extrême) • Titan", label: "sample" },
            {
              name: "Le Cratère des tisons (extrême) • Ifrit",
              label: "sample"
            },
            {
              name: "La Lisière de ronces (extrême) • Moggle Mog XII",
              label: "sample"
            },
            {
              name: "Le Briseur des marées (extrême) • Léviathan",
              label: "sample"
            },
            { name: "L'Arbre du jugement (extrême) • Ramuh", label: "sample" },
            {
              name: "L'Amphithéâtre d'Akh Afah (extrême) • Shiva",
              label: "sample"
            }
          ]
        }
      ]
    };
  },
  props: {
    edit: {
      type: Boolean,
      default: false
    }
  },
  components: {
    WasshoListeElement,
    AppButton
  },
  methods: {
    submit() {
      //
    },
    handleCheck(e) {
      if (e.checked) {
        this.checked.push(e.value);
      } else {
        const index = this.checked.indexOf(e.value);
        if (index > -1) {
          this.checked.splice(index, 1);
        }
      }
      console.log(this.checked);
    }
  }
};
</script>

<style lang="scss" scoped>
.wassholiste {
  width: 100%;
}
</style>
