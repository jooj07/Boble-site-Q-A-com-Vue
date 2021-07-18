<template>
  <v-app>
    <h1>Estatísticas</h1>
    <v-container v-if="stats.length>0">
      <v-layout row wrap class="mt-4">
        <v-flex class="pr-3 pb-3" xs12 sm12 md6 lg6 v-for="(stat,index) in stats " :key="index">
          <v-card  class="rounded-xl mb-6 px-3" flat>
            <v-card-title >
               {{Object.keys(stat).toString()}}
            </v-card-title>
            <v-card-text class="text-h1 primary--text">
              {{Object.values(stat).toString()}}
            </v-card-text>
          </v-card>
      
        </v-flex>
      
      </v-layout>
    </v-container>
<!-- loading -->
    <loading v-else :skeletons="skeletons" />
    <!-- loading -->
  </v-app>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data: () => ({
    skeletons: [1, 2, 3, 4, 5, 6],
    stats: [],
  }),
  methods: {
    ...mapActions("admin", [
      "carregarAtivos",
      "carregarStatsUsers",
      "carregarStatsPerguntas",
      "carregarStatsRespondidas",
      "carregarStatsAbertas",
      "carregarStatsRespostas",
    ]),
  },
  computed: {
    ...mapState("admin", [
      "ativos",
      "statsUsers",
      "statsPerguntas",
      "statsRespondidas",
      "statsAbertas",
      "statsRespostas",
    ]),
  },
  async created() {
    await this.carregarAtivos();
    await this.carregarStatsUsers();
    await this.carregarStatsPerguntas();
    await this.carregarStatsRespondidas();
    await this.carregarStatsAbertas();
    await this.carregarStatsRespostas();

     this.stats.push(this.ativos);
     this.stats.push(this.statsUsers);
     this.stats.push(this.statsPerguntas);
     this.stats.push(this.statsRespondidas);
     this.stats.push(this.statsAbertas);
     this.stats.push(this.statsRespostas);
  },
};
</script>

<style></style>
