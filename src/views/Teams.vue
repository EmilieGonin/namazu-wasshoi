<template lang="html">
  <div class="teams">
    <div class="teams__infos-container">
      <div class="teams__infos">
        <p>
          En rejoignant une équipe d'évent, vous pourrez collecter des points
          d'équipe afin de remporter la WasshoCup, notre coupe trimestrielle,
          mais également accéder à un espace dédié sur notre Discord et y porter
          fièrement les couleurs de votre équipe ! Vous aurez d'ailleurs
          également l'occasion de les revêtir en jeu lors de nos différents
          évents (à différencier des sorties sur du contenu classique du jeu).
        </p>

        <p>
          Les équipes d'évent sont au nombre de quatre :
          <strong class="mog">Mog</strong>,
          <strong class="chocobo">Chocobo</strong>,
          <strong class="pampa">Pampa</strong> et
          <strong class="carbuncle">Carbuncle</strong>. Il existe également une
          cinquième équipe, pour les membres ne souhaitant pas ou n'ayant pas la
          possibilité de participer à la WasshoCup : l'équipe
          <strong class="tomberry">Tomberry</strong>.
        </p>

        <p>
          Sur cette page, vous pourrez obtenir des informations sur nos quatre
          équipes d'évent : découvrez leur composition ainsi que leur slogan !
        </p>
      </div>
      <div class="teams__line"></div>
    </div>
    <TeamsPanel :team="'mog'">Pas de coups sous le pompon !</TeamsPanel>
    <TeamsPanel :team="'chocobo'">On est chaud... cobo !</TeamsPanel>
    <TeamsPanel :team="'pampa'">Qui s'y frotte s'y pique !</TeamsPanel>
    <TeamsPanel :team="'carbuncle'">
      Que la poussière de diamant vous réduise en éclat !
    </TeamsPanel>
  </div>
</template>

<script>
import { useMeta } from "vue-meta";
import TeamsPanel from "@/components/TeamsPanel.vue";

export default {
  name: "Teams",
  components: {
    TeamsPanel
  },
  setup() {
    useMeta({
      title: "Equipes d'évent"
    });
  }
};
</script>

<style lang="scss" scoped>
.teams {
  &__infos-container {
    @include responsive(800) {
      margin-top: 0;
    }
    position: relative;
    width: 100%;
    margin: 50px auto;
  }
  &__infos {
    max-width: 800px;
    padding: 50px;
    margin: auto;
    text-align: justify;
    border-top: 10px solid dark($namazu);
    border-bottom: 10px solid dark($namazu);
    background: white;
  }
  &__line {
    @include absolute-center;
    z-index: -1;
    height: 20%;
    background: linear-gradient(to right, $mog, $chocobo, $pampa, $carbuncle);
  }
}
</style>
