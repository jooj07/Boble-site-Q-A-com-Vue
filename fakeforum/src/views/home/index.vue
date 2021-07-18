<template>
  <v-container>
    <v-flex lg12 md12 sm12 xs12>
      <h1 class="mb-2">
        <v-icon large color="secondary">mdi-head-question-outline</v-icon> Qual
        sua dúvida?
      </h1>
    </v-flex>
    <v-layout wrap v-if="!perguntasFeed">
      <v-flex lg4 md6 sm12 xs12 v-for="skeleton in skeletons" :key="skeleton">
        <v-skeleton-loader
          class="mx-auto my-2"
          max-width="300"
          type="card"
        ></v-skeleton-loader>
      </v-flex>
    </v-layout>
    <v-container fill-heigt v-if="perguntasFeed">
      <v-layout row wrap>
        <v-flex
          class="pr-3 pb-3"
          xs12
          sm12
          md4
          lg4
          v-for="(dado, index) in dados.data"
          :key="index"
        >
          <v-card
            :to="{
              path: `/pergunta/${dado.idpergunta}`,
              name: 'pergunta',
              params: { id: dado.idpergunta },
            }"
            height="300px"
            class="rounded-xl mb-2"
            flat
            :outlined="dado.respondida ? true : false"
          >
            <v-card-title class="headline"
              ><strong>{{ dado.titulo }}</strong></v-card-title
            >
            <v-card-subtitle class="text-subtitle-2"
              >Por: {{ dado.nome }} -
              {{ dado.datapergunta | dayjs }}</v-card-subtitle
            >
            <v-card-text class="text-h4" v-html="dado.pergunta"></v-card-text>
            <v-spacer></v-spacer>
            <v-card-actions>
              <span v-if="dado.respondida" class="green--text ml-2">
                <v-icon left v-if="dado.respondida" color="success">
                  mdi-check-outline</v-icon
                >respondida!</span
              >
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-btn
      color="secondary"
      dark
      absolute
      bottom
      right
      fab
      class="hidden-sm-and-down mb-3"
      to="/novaPergunta"
      v-if="loggedUser"
    >
      <v-icon>mdi-head-question-outline</v-icon> +
    </v-btn>
    <v-pagination circle v-model="page" :length="length" v-if="length > 1">
    </v-pagination>
  </v-container>
</template>

<script>
import dayjs from "dayjs";
import { mapState, mapActions } from "vuex";
export default {
  name: "Home",
  data: () => ({
    skeletons: [1, 2, 3, 4, 5, 6],
    dados: [],
    page: 1,
    length: null,
  }),
  computed: {
    ...mapState("home", ["perguntasFeed"]),
    ...mapState(["loggedUser"]),
  },
  watch: {
    async page() {
      await this.carregarFeed(this.page);
      this.dados = await this.perguntasFeed;
    },
  },
  methods: {
    ...mapActions("home", ["carregarFeed"]),
  },
  async created() {
    await this.carregarFeed();
    this.dados = await this.perguntasFeed;
    this.length = await Math.ceil(
      this.perguntasFeed.count / this.perguntasFeed.limit
    );
  },
  filters: {
    dayjs: function (date) {
      return dayjs(date).format("DD/MM/YYYY");
    },
  },
};
</script>
<style scoped>
html {
  overflow: hidden !important;
}

.v-card {
  display: flex !important;
  flex-direction: column;
}

.v-card__text {
  flex-grow: 1;
  overflow: auto;
}
</style>
