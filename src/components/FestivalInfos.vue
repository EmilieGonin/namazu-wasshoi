<template lang="html">
  <div class="infos">
    <div class="infos__heading">
      Informations
    </div>
    <span>
      <p>
        Le <strong>Festival Gyôkoso</strong> est un concours mensuel de glamour
        et screenshots au terme duquel sont élus deux
        <strong class="gold">Namazu dorés</strong> ! Participer et remporter le
        festival vous feront tout deux gagner des points pour votre équipe.
      </p>
    </span>
    <div class="infos__heading">
      Règles de participations
    </div>
    <ul class="infos__rules">
      <li>Les screenshots <strong>doivent</strong> être au format 16:9.</li>
      <li>
        Vous êtes libres d'interpréter le thème comme vous le sentez, et vous
        <strong>devez</strong> expliquer votre interprétation du thème en
        <strong>maximum</strong> trois phrases, donc choisissez bien vos mots !
      </li>
      <li>
        Vous êtes <strong>autorisés</strong> à utiliser Photoshop, mais
        <strong>uniquement</strong> pour corriger la luminosité et les couleurs
        ou flouter/renforcer votre image.
      </li>
      <li>
        Les gagnants de l'édition précédente <strong>peuvent</strong> participer
        pour tenter de conserver leur titre.
      </li>
      <li>
        Vous pouvez demander à une ou plusieurs personnes de poser avec vous,
        même si ces personnes participent de leur côté. La participation
        appartient au membre qui a réalisé le screenshot.
      </li>
      <li>
        Les shaders sont <strong>autorisés</strong> ! Vous pouvez demander de
        l'aide pour installer GShade sur votre ordinateur auprès de la GM, des
        officiers ou même des autres membres.
      </li>
      <li>Les mods sont <strong>interdits</strong> !</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "FestivalInfos"
};
</script>

<style lang="scss" scoped>
.infos {
  &__heading {
    @include title(30);
  }
  &__rules {
    text-align: justify;
  }
}
</style>
