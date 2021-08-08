<template lang="html">
  <div class="apply">
    <div class="apply__line"></div>
    <img class="apply__bann" src="@/assets/sample.png" alt="" />
    <div class="apply__infos-container">
      <div class="apply__heading">
        Nous rejoindre
      </div>
      <span v-if="recruiting">
        Le recrutement est actuellement ouvert. Nous sommes à la recherche de
        nouveaux Namazu de niveau 80, actifs en soirée entre 20h et minuit de
        préférence.
      </span>
      <span v-else>
        Le recrutement est actuellement fermé. Toutefois, nous continuons
        d'étudier les nouvelles candidatures et tu seras ajouté sur la liste
        d'attente !
      </span>
      <AppButton
        :iconR="'arrow-right'"
        :marginTop="10"
        @click="scroll('apply')"
      >
        Postuler
      </AppButton>
    </div>
  </div>
  <!--Apply Form-->
  <div class="apply__form" ref="apply">
    <form class="form" @submit.prevent="submit" method="post">
      <!--À propos de toi-->
      <div class="form__heading">
        <div class="form__title">
          À propos de toi
        </div>
        Nous souhaiterions en savoir plus sur toi !
      </div>
      <div class="form__panel">
        <!--Name-->
        <FormElement
          v-model="formo_name"
          :label="'Comment t\'appelles-tu ?'"
          :name="'formo_name'"
        ></FormElement>
        <!--Birthday-->
        <FormElement
          v-model="form_birthday"
          :label="'Quelle est ta date de naissance ?'"
          :name="'form_birthday'"
          :type="'date'"
          :required="true"
        ></FormElement>
        <!--Discord-->
        <FormElement
          v-model="form_discord"
          :label="'Quel est ton identifiant Discord ?'"
          :name="'form_discord'"
          :required="true"
        ></FormElement>
        <!--Mic-->
        <FormElement
          v-model="form_mic"
          :inputs="yesno"
          :label="'Possèdes-tu un micro ?'"
          :name="'form_mic'"
          :type="'radio'"
          :required="true"
        ></FormElement>
        <!--Availability-->
        <FormElement
          v-model="form_availability"
          :label="'Quelles sont tes disponibilités pour jouer ?'"
          :name="'form_availability'"
          :element="'text'"
          :large="true"
          :required="true"
        ></FormElement>
        <!--About-->
        <FormElement
          :element="'text'"
          v-model="form_about"
          :label="'Dis-nous en plus sur toi !'"
          :name="'form_about'"
          :required="true"
          :large="true"
        ></FormElement>
      </div>
      <div class="form__separator"></div>
      <!--Ton rapport au jeu-->
      <div class="form__heading">
        <div class="form__title">
          Ton rapport au jeu
        </div>
        Que fais-tu pendant tes sessions de jeu ?
      </div>
      <div class="form__panel">
        <!--Character-->
        <FormElement
          v-model="form_character"
          :label="'Nom du personnage'"
          :name="'form_character'"
          :required="true"
          :wait="true"
        ></FormElement>
        <!--Main Class-->
        <FormElement
          v-model="form_mainClass"
          :label="'Quelle est ta classe principale ?'"
          :name="'form_mainClass'"
          :required="true"
        ></FormElement>
      </div>
      <!--Playtime-->
      <FormElement
        v-model="form_playtime"
        :label="'Depuis quand joues-tu à Final Fantasy XIV ?'"
        :name="'form_playtime'"
        :required="true"
        :large="true"
        :element="'text'"
      ></FormElement>
      <!--Game Activities-->
      <FormElement
        v-model="form_gameActivities"
        :label="'Quelles sont tes activités préférées dans le jeu ?'"
        :name="'form_gameActivities'"
        :required="true"
        :large="true"
        :element="'text'"
      ></FormElement>
      <!--CL Wishes-->
      <FormElement
        v-model="form_cl"
        :label="
          'Quel genre de compagnie libre recherches-tu et pourquoi nous choisir ?'
        "
        :name="'form_cl'"
        :required="true"
        :large="true"
        :element="'text'"
      ></FormElement>
      <!--Current CL-->
      <FormElement
        v-model="form_clRequired"
        :label="
          'Quel est le ou les critères obligatoires pour que tu nous rejoignes ?'
        "
        :name="'form_clRequired'"
        :required="true"
        :large="true"
        :element="'text'"
      ></FormElement>
      <!--Current CL-->
      <FormElement
        v-model="form_currentCl"
        :label="
          'Fais-tu actuellement partie d\'une compagnie ? Si oui, pourquoi la quitter ?'
        "
        :name="'form_currentCl'"
        :required="true"
        :large="true"
        :element="'text'"
      ></FormElement>
      <div class="form__separator"></div>
      <!--Ton expérience à haut niveau-->
      <div class="form__heading">
        <div class="form__title">
          Ton expérience à haut niveau
        </div>
        Nous aimerions en savoir plus sur le contenu que tu as fait !
      </div>
      <!--Exp-->
      <FormElement
        v-model="form_exp"
        :label="'Quelle est ton expérience de jeu à haut niveau ?'"
        :name="'form_exp'"
        :required="true"
        :large="true"
        :element="'text'"
      ></FormElement>
      <!--Savage Required-->
      <FormElement
        v-model="form_savageRequired"
        :label="
          'Souhaites-tu rejoindre l\'un de nos rosters ? Si oui, obligatoirement ?'
        "
        :name="'form_savageRequired'"
        :required="true"
        :large="true"
        :element="'text'"
      ></FormElement>
      <div class="form__separator"></div>
      <!--Choisis ton équipe-->
      <div class="form__heading">
        <div class="form__title">
          Choisis ton équipe
        </div>
        C'est le moment de faire un choix crucial !
      </div>
      <FormElement
        v-model="form_team"
        :inputs="teams"
        :name="'form_team'"
        :type="'radio'"
        :large="true"
        :bigLabel="true"
        :teamsLabel="true"
        @check="handleCheck"
      ></FormElement>
      <AppButton :iconR="'arrow-right'" @click="submit">
        Postuler
      </AppButton>
    </form>
  </div>
</template>

<script>
import FormElement from "@/components/FormElement.vue";
import AppButton from "@/components/AppButton.vue";

export default {
  name: "Apply",
  data() {
    return {
      recruiting: "",
      formo_name: "",
      form_birthday: "",
      form_discord: "",
      form_mic: "",
      form_availability: "",
      form_about: "",
      form_character: "",
      form_mainClass: "",
      form_playtime: "",
      form_gameActivities: "",
      form_cl: "",
      form_clRequired: "",
      form_currentCl: "",
      form_exp: "",
      form_savageRequired: "",
      form_team: "",
      //temp
      yesno: [
        { name: "Oui", value: true },
        { name: "Non", value: false }
      ],
      teams: [
        { name: "Mog", label: "teams/mog" },
        { name: "Chocobo", label: "teams/chocobo" },
        { name: "Pampa", label: "teams/pampa" },
        { name: "Carbuncle", label: "teams/carbuncle" }
      ],
      jobs: [
        { name: "Paladin", label: "job-icons/pld" },
        { name: "Guerrier", label: "job-icons/war" },
        { name: "Chevalier noir", label: "job-icons/drk" },
        { name: "Pistosabreur", label: "job-icons/gnb" },
        { name: "Mage blanc", label: "job-icons/whm" },
        { name: "Erudit", label: "job-icons/sch" },
        { name: "Astromancien", label: "job-icons/ast" },
        { name: "Moine", label: "job-icons/mnk" },
        { name: "Chevalier dragon", label: "job-icons/drg" },
        { name: "Ninja", label: "job-icons/nin" },
        { name: "Samouraï", label: "job-icons/sam" },
        { name: "Barde", label: "job-icons/brd" },
        { name: "Machiniste", label: "job-icons/mch" },
        { name: "Danseur", label: "job-icons/dnc" },
        { name: "Mage noir", label: "job-icons/blm" },
        { name: "Invocateur", label: "job-icons/smn" },
        { name: "Mage rouge", label: "job-icons/rdm" }
      ]
    };
  },
  components: {
    FormElement,
    AppButton
  },
  mounted() {
    this.$store.dispatch("getParameter", "recruiting").then(response => {
      this.recruiting = response;
    });
  },
  methods: {
    scroll(ref) {
      const to = this.$refs[ref];
      const top = to.offsetTop;
      window.scrollTo(0, top - 10);
    },
    handleCheck(e) {
      const name = e.name;
      if (e.checked) {
        this[name].push(e.value);
      } else {
        const index = this[name].indexOf(e.value);
        if (index > -1) {
          this[name].splice(index, 1);
        }
      }
      console.log(this[name]);
    },
    submit() {
      try {
        const form = {};
        const datas = JSON.parse(JSON.stringify(this.$data));

        for (const data of Object.entries(datas)) {
          if (data[0].startsWith("form_") || data[0].startsWith("formo_")) {
            const name = data[0].split("_")[1];
            const value = data[1];
            form[name] = value;

            if (!data[0].startsWith("formo_") && !value) {
              const error =
                "Veuillez renseigner tous les champs requis du formulaire.";
              this.$store.dispatch("error", error);
              throw error;
            }
          }
        }

        const character = this.form_character.split(" ").join("+");
        const cl = false;
        const silent = false;

        this.$store
          .dispatch("searchCharacter", [character, cl, silent])
          .then(character => {
            form.character = character.Name;
            form.characterId = character.ID;

            this.$store
              .dispatch("apply", form)
              .then(() => {
                //
              })
              .catch(() => {
                console.error(
                  "Une erreur est survenue pendant l'envoi du formulaire."
                );
              });
          })
          .catch(() => {
            console.error("Personnage non trouvé.");
          });
      } catch (e) {
        console.error(e);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.apply {
  @include flex;
  width: 100%;
  position: relative;
  &__line {
    @include responsive(930) {
      transform: translateY(30px);
    }
    @include absolute-center;
    transform: translateY(60px);
    z-index: -1;
    width: 100%;
    height: 150px;
    background: $namazu;
  }
  &__infos-container {
    @include responsive(930) {
      width: 70%;
      top: 30px;
      right: 0;
    }
    @include responsive(410) {
      width: 90%;
      font-size: $font-small;
    }
    position: relative;
    top: -20px;
    right: 50px;
    z-index: 2;
    width: 40%;
    padding: 50px;
    background: white;
  }
  &__heading {
    @include title;
  }
  &__bann {
    @include responsive(930) {
      display: none;
    }
    display: block;
    position: relative;
    top: 60px;
    left: 50px;
    width: 45%;
    object-fit: cover;
  }
  &__form {
    @include responsive(930) {
      transform: translateY(60px);
    }
    @include flex($justify: space-evenly);
    width: 100%;
    max-width: 1000px;
    margin: auto;
    margin-top: 120px;
    padding: 50px 0;
    background: white;
  }
  &__panel {
    // width: 100%;
    // text-align: center;
  }
}
</style>
