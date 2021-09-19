<template lang="html">
  <div class="apply">
    <div class="apply__line"></div>
    <img class="apply__bann" src="@/assets/sample.png" alt="" />
    <div class="apply__infos-container">
      <div class="apply__heading">
        Nous rejoindre
      </div>
      <span v-if="recruiting && recruiting != 'unknown'">
        Le recrutement est actuellement ouvert. Nous sommes à la recherche de
        nouveaux Namazu de niveau 80, actifs en soirée entre 20h et minuit de
        préférence !
      </span>
      <span v-else-if="!recruiting">
        Le recrutement est actuellement fermé. Toutefois, nous continuons
        d'étudier les nouvelles candidatures et tu seras ajouté sur la liste
        d'attente !
      </span>
      <AppMiniSpinner v-else />
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
        <p class="form__text">
          Nous voulons nous assurer que Namazu Wasshoi est bien la CL parfaite
          pour toi ! Sache que nos sorties hebdomadaires ont généralement lieu
          le soir entre 21h et 23h et plus rarement l'après-midi entre 16h et
          18h. Nos plus grands évents de CL ayant lieu le dimanche soir, c'est
          très important pour nous de connaîtres tes disponibilités !
        </p>
      </div>
      <div class="form__panel">
        <!--Name-->
        <FormElement
          v-model="formo_name_Profile"
          :label="'Comment t\'appelles-tu ?'"
          :name="'formo_name_Profile'"
        ></FormElement>
        <!--Birthday-->
        <FormElement
          v-model="form_birthday_Profile"
          :label="'Quelle est ta date de naissance ?'"
          :name="'form_birthday_Profile'"
          :type="'date'"
          :required="true"
        ></FormElement>
        <!--Discord-->
        <FormElement
          v-model="form_discord_Profile"
          :label="'Quel est ton identifiant Discord ?'"
          :name="'form_discord_Profile'"
          :required="true"
          :placeholder="'Exemple#0000'"
        ></FormElement>
        <!--Mic-->
        <FormElement
          v-model="form_mic_Profile"
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
          :type="'textarea'"
          :large="true"
          :required="true"
        ></FormElement>
        <!--About-->
        <FormElement
          v-model="form_about"
          :label="'Dis-nous en plus sur toi !'"
          :name="'form_about'"
          :type="'textarea'"
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
        <p class="form__text">
          Le contenu de nos sorties sont assez variées : cartes aux trésors,
          clear et farm d'anciens ou nouveaux contenus, elles pourront autant
          convenir aux joueurs débutants qu'aux joueurs expérimentés ! Pour
          pouvoir nous rejoindre, il vaut mieux que tu sois au niveau 80.
          Toutefois, certaines de nos sorties peuvent également convenir aux
          joueurs de niveau 70 ou plus !
        </p>
      </div>
      <div class="form__panel">
        <!--Character-->
        <FormElement
          v-model="form_name_Character"
          :label="'Nom du personnage'"
          :name="'form_name_Character'"
          :required="true"
          :wait="true"
        ></FormElement>
        <!--MSQ-->
        <FormElement
          v-model="form_msq"
          :label="'As-tu terminé l\'épopée ? Si non, où en es-tu ?'"
          :name="'form_msq'"
          :type="'textarea'"
          :required="true"
          :large="true"
        ></FormElement>
        <!--Main Class-->
        <FormElement
          v-model="form_mainClass"
          :label="'Quelle est ta classe principale / classe secondaire ?'"
          :name="'form_mainClass'"
          :type="'textarea'"
          :required="true"
          :large="true"
        ></FormElement>
      </div>
      <!--Playtime-->
      <FormElement
        v-model="form_playtime"
        :label="'Depuis quand joues-tu à Final Fantasy XIV ?'"
        :name="'form_playtime'"
        :type="'textarea'"
        :required="true"
        :large="true"
      ></FormElement>
      <!--Game Activities-->
      <FormElement
        v-model="form_gameActivities"
        :label="'Quelles sont tes activités préférées dans le jeu ?'"
        :name="'form_gameActivities'"
        :type="'textarea'"
        :required="true"
        :large="true"
      ></FormElement>
      <!--CL Wishes-->
      <FormElement
        v-model="form_cl"
        :label="
          'Quel genre de compagnie libre recherches-tu et pourquoi nous choisir ?'
        "
        :name="'form_cl'"
        :type="'textarea'"
        :required="true"
        :large="true"
      ></FormElement>
      <!--Current CL-->
      <FormElement
        v-model="form_clRequired"
        :label="
          'Quel est le ou les critères obligatoires pour que tu nous rejoignes ?'
        "
        :name="'form_clRequired'"
        :type="'textarea'"
        :required="true"
        :large="true"
      ></FormElement>
      <!--Current CL-->
      <FormElement
        v-model="form_currentCl"
        :label="
          'Fais-tu actuellement partie d\'une compagnie ? Si oui, pourquoi la quitter ?'
        "
        :name="'form_currentCl'"
        :type="'textarea'"
        :required="true"
        :large="true"
      ></FormElement>
      <div class="form__separator"></div>
      <!--Ton expérience à haut niveau-->
      <div class="form__heading">
        <div class="form__title">
          Ton expérience à haut niveau
        </div>
        Nous aimerions en savoir plus sur le contenu que tu as fait !
        <p class="form__text">
          Au total, nous possédons trois rosters pour le contenu sadique :
          <strong>Pleine Lune</strong> (16h-19h - sam, dim et un jour de plus à
          définir), <strong>Nouvelle Lune</strong> (21h-0h, jours à définir) et
          <strong>Croissant de Lune</strong> (21h-23h30 - lun, mer, jeu).
          L'intégration d'un roster est facultative !
        </p>
      </div>
      <!--Exp-->
      <FormElement
        v-model="form_exp"
        :label="'Quelle est ton expérience de jeu à haut niveau ?'"
        :name="'form_exp'"
        :type="'textarea'"
        :required="true"
        :large="true"
      ></FormElement>
      <!--Savage Required-->
      <FormElement
        v-model="form_savageRequired"
        :label="
          'Souhaites-tu rejoindre l\'un de nos rosters ? Si oui, obligatoirement ?'
        "
        :name="'form_savageRequired'"
        :type="'textarea'"
        :required="true"
        :large="true"
      ></FormElement>
      <div class="form__separator"></div>
      <!--Choisis ton équipe-->
      <div class="form__heading">
        <div class="form__title">
          Choisis ton équipe
        </div>
        C'est le moment de faire un choix crucial !
        <p class="form__text">
          Les équipes d'évent sont au centre de nos activités ! Lors de ton
          intégration dans la CL, tu seras parrainé par l'officier assigné à ton
          équipe. Chaque équipe possède un slogan ainsi qu'un salon privé sur
          notre Discord. Participe et remporte la première place à nos évents
          pour faire gagner des points à ton équipe et remporter la WasshoCup
          trimestrielle !
          <router-link :to="'/teams'" target="_blank"
            ><strong>En savoir plus</strong> </router-link
          >.
        </p>
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
      <AppButton :marginTop="15" :iconR="'arrow-right'" @click="submit">
        Postuler
      </AppButton>
    </form>
  </div>
</template>

<script>
import { useMeta } from "vue-meta";
import { formValidate } from "@/mixins.js";
import FormElement from "@/components/FormElement.vue";
import AppButton from "@/components/AppButton.vue";
import AppMiniSpinner from "@/components/AppMiniSpinner.vue";

export default {
  name: "Apply",
  setup() {
    useMeta({
      title: "Postuler"
    });
  },
  data() {
    return {
      recruiting: "unknown",
      formo_name_Profile: "",
      form_birthday_Profile: "",
      form_discord_Profile: "",
      form_mic_Profile: "",
      form_availability: "",
      form_about: "",
      form_name_Character: "",
      formo_lodestoneId_Character: "",
      form_msq: "",
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
    AppButton,
    AppMiniSpinner
  },
  mounted() {
    this.$store.dispatch("getParameter", "recruiting").then(response => {
      this.recruiting = response;
    });
  },
  mixins: [formValidate],
  methods: {
    scroll(ref) {
      const to = this.$refs[ref];
      const top = to.offsetTop;
      window.scrollTo({
        top: top - 10,
        behavior: "smooth"
      });
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
    },
    submit() {
      try {
        this.formValidateRequired();
        const character = this.form_name_Character.split(" ").join("+");

        this.$store
          .dispatch("searchCharacter", [character, false, false])
          .then(character => {
            this.form_name_Character = character.Name;
            this.formo_lodestoneId_Character = character.ID;

            const form = this.formValidate();
            this.$store.dispatch("apply", form).catch(() => {
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
