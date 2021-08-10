<template>
  <div class="home">
    <!--Stats-->
    <div class="home__stats">
      <span class="home__cl-name">Namazu Wasshoi</span> est une compagnie libre
      en activité depuis février 2020 sur le serveur Moogle.
      <AppButton
        :altClass="'darkhover'"
        :link="'/apply'"
        :margin="'auto'"
        :marginTop="'10'"
        >Je postule !</AppButton
      >
    </div>
    <!--Activities-->
    <div class="home__activities">
      <HomeCard :icon="'calendar-week'" :link="'/planning'" class="mog">
        <template #title>Sorties et évents</template>
        <template #infos>
          Notre planning vous propose chaque semaine différents types de
          sorties, pour les joueurs débutants ou plus experimentés : cartes aux
          trésors, clear et farm d'anciens ou nouveaux contenus et plus encore.
          Nous organisons également des évents, à différencier des sorties ; il
          s'agit de jeux divers organisés par les officiers : quiz, blind test
          ou encore chasse aux trésors.
        </template>
        <template #button>Accéder au planning</template>
      </HomeCard>
      <HomeCard :icon="'stars'" :link="'/teams'" class="chocobo">
        <template #title>Système de points</template>
        <template #infos>
          Lorsque vous rejoignez la CL, vous devez rejoindre l'une de nos quatre
          équipes d'évent : similaire à une maison sortie de la saga Harry
          Potter, vous devrez aider votre équipe à remporter la WasshoCup, notre
          tournoi trimestriel ! Pour cela, participez et remportez la première
          place à nos évents et activités afin de faire gagner des points à
          votre équipe.
        </template>
      </HomeCard>
      <HomeCard :icon="'dungeon'" :link="'/'" class="pampa">
        <template #title>Contenu sadique</template>
        <template #infos>
          Notre compagnie libre étant à la fois ouverte au contenu dit « casual
          » ainsi qu'au contenu de difficulté extrême et sadique, nous offrons
          la possibilité à nos membres de faire partie de l'un de nos trois
          rosters : Pleine Lune, Nouvelle Lune et Croissant de Lune. Nous avons
          également pour projet la formation d'un roster spécial pour le contenu
          sadique du mage bleu.
        </template>
      </HomeCard>
      <HomeCard
        :icon="'users'"
        :link="'https://discord.gg/gpV2CzN'"
        :internal="false"
        class="carbuncle"
      >
        <template #title>Communauté active</template>
        <template #infos>
          Même en dehors du jeu, nos membres se regroupent sur notre serveur
          Discord, que ce soit à l'écrit ou en vocal ! Ainsi, nous vous convions
          dans un espace communautaire agréable et sécurisé, vous permettant
          également de partager vos passions pour d'autres jeux ou activités.
          Vous pourrez également y retrouver des guides concernant Final Fantasy
          XIV dans sa globalité.
        </template>
        <template #button>Rejoindre le serveur Discord</template>
      </HomeCard>
    </div>
    <!--Join us!-->
    <!--Festival Gyôkoso-->
    <HomeFestival></HomeFestival>
  </div>
</template>

<script>
import HomeCard from "@/components/HomeCard.vue";
import HomeFestival from "@/components/HomeFestival.vue";
import AppButton from "@/components/AppButton.vue";

export default {
  name: "Home",
  components: {
    HomeCard,
    HomeFestival,
    AppButton
  }
};
</script>

<style lang="scss">
.home {
  &__stats {
    @include responsive(359) {
      font-size: $font-regular - 1;
    }
    @include responsive(770) {
      transform: translateY(-150%);
    }
    @include responsive(430) {
      transform: translateY(-145%);
    }
    @include responsive(350) {
      transform: translateY(-127%);
    }
    position: absolute;
    transform: translateY(-110%);
    padding: 20px;
    width: 100%;
    text-align: center;
    font-size: $font-regular + 2;
    color: $minor-white;
  }
  &__cl-name {
    @include cursive(60);
    @include responsive(465) {
      font-size: 40px;
    }
    @include responsive(324) {
      font-size: $font-xxl;
    }
    display: block;
    color: $namazu;
    text-shadow: 1px 1px 1px $main-black, -1px -1px 1px $minor-white;
  }
  &__activities {
    @include responsive {
      gap: 5px;
      padding: 0;
    }
    @include flex($align: stretch, $gap: 20);
    padding: 50px 0;
    flex-wrap: wrap;
    text-align: center;
  }
}
</style>
