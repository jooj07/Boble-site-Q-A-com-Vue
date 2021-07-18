<template>
  <v-app>
    <aviso :value="value" :color="color" :msg="msgSnack" />
    <v-overlay :value="dialogDelete"></v-overlay>
    <v-dialog v-model="dialogDelete" persistent max-width="400">
      <v-card>
        <v-card-title
          ><strong> Tem certeza que deseja apagar</strong>?</v-card-title
        >
        <v-card-text class="text-body-2"
          >Sua resposta ainda pode ser útil para alguém...
        </v-card-text>
        <v-card-actions>
          <v-btn icon color="primary" class="mr-2" @click="dialogDelete = false"
            ><v-icon>mdi-arrow-left</v-icon></v-btn
          >
          <v-btn icon color="error" class="mr-2" @click="deletar(selected)"
            ><v-icon>mdi-delete-empty</v-icon></v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <h1>Suas Respostas</h1>
    <v-container fill-heigt v-if="dados.length > 0 && !loading" class="my-10">
      <v-layout row wrap>
        <v-flex
          class="pr-3 pb-3"
          xs12
          sm12
          md6
          lg6
          v-for="(dado, index) in dados"
          :key="index"
        >
          <v-card
            max-width="650px"
            max-height="500px"
            class="rounded-xl mb-6 px-3"
            flat
          >
            <v-card-title>{{ dado.titulo }}</v-card-title>
            <v-card-subtitle>{{ dado.datapergunta | dayjs }}</v-card-subtitle>
            <v-card-title
              v-html="dado.pergunta"
              class="text-h5 primary--text mx-0"
            ></v-card-title>

            <div class="font-weight-normal py-4" id="timeline">
              <h3>Sua resposta - {{ new Date(dado.dataresposta) | dayjs }}</h3>
              <div
                v-html="dado.resposta"
                class="mt-4 text-body-1"
                id="resposta"
              ></div>
              <div class="d-flex flex-row">
                <span class="mt-5 text-body-1"
                  >{{ dado.votos ? dado.votos : 0 }} votos
                </span>
              </div>
            </div>

            <v-card-actions v-if="dado.idrespondeu === loggedUser.iduser">
              <v-btn
                icon
                color="primary"
                :to="{
                  path: `/editarResposta/${dado.idresposta}`,
                  params: { idresposta: dado.idresposta },
                }"
              >
                <v-icon>mdi-pencil-outline</v-icon>
              </v-btn>

              <v-btn
                icon
                color="error"
                @click.prevent="
                  (dialogDelete = true), (selected = dado.idresposta)
                "
              >
                <v-icon>mdi-delete-empty</v-icon></v-btn
              >
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container fill-heigt v-if="dados.length === 0 && !loading">
      <v-layout row wrap>
        <v-flex class="pr-3 pb-3 mx-auto" xs12 sm12 md4 lg4>
          <v-btn block x-large elevation="0" color="primary">
            <v-icon class="mr-4">mdi-head-question-outline</v-icon> Ajude alguém
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
    <loading v-if="!dados && loading" :skeletons="skeletons" />
    <v-pagination circle v-model="page" :length="length" v-if="length > 1">
    </v-pagination>
  </v-app>
</template>

<script>
import dayjs from "dayjs";
import { mapState, mapActions } from "vuex";
export default {
  props: ["iduser"],
  data: () => ({
    dialogDelete: false,
    skeletons: [1, 2, 3, 4, 5, 6],
    loading: false,
    selected: null,
    dados: [],
    page: 1,
    length: null,
    msgSnack: "",
    value: false,
    color: "error",
  }),
  watch: {
    async page() {
      await this.carregarRespostas({ id: this.iduser, page: this.page });
      this.dados = await [...this.minhasRespostas.data];
    },
  },
  methods: {
    ...mapActions("user", ["carregarRespostas"]),
    async deletar(id) {
      try {
        await this.$http.delete(`/apagarResposta/${id}`);
        await this.carregarRespostas({ id: this.iduser });
        this.msgSnack = "Sucesso!";
        this.color = "success";
        this.value = true;
        this.dialogDelete = false;
        this.selected = null;
        this.dados = await this.minhasRespostas.data;
        setTimeout(() => {
          this.value = false;
        }, 500);
      } catch (error) {
        this.msgSnack = error;
        this.value = true;
        setTimeout(async () => {
          this.value = false;
          this.dados = await this.minhasRespostas.data;
        }, 500);
      }
    },
  },
  computed: {
    ...mapState("user", ["minhasRespostas"]),
    ...mapState(["loggedUser"]),
  },
  filters: {
    dayjs: function (date) {
      return dayjs(date).format("DD/MM/YYYY");
    },
  },
  async created() {
    this.loading = true;
    await this.carregarRespostas({ id: this.iduser });
    this.dados = await [...this.minhasRespostas.data];
    this.length = await Math.ceil(
      this.minhasRespostas.count / this.minhasRespostas.limit
    );
    this.loading = false;
  },
};
</script>

<style scoped>
#timeline {
  padding: 0 20px !important;
  border-top: rgb(216, 215, 215) 1px solid !important;
  overflow: auto !important;
  border-bottom: rgb(216, 215, 215) 1px solid !important;
}

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
