<template>
  <v-app>
    <h1>Arquivo de respostas - {{ titulo }}</h1>
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
    <v-container v-if="dados.length > 0">
      <v-layout row wrap class="mt-4">
        <v-flex class="pr-3 pb-3" xs12 sm12 md12 lg12>
          <v-chip
            large
            color="primary"
            class="mt-4 mx-2 px-4 elevation-4"
            @click="todas"
          >
            <v-icon large class="mr-3">mdi-select-all</v-icon>
            Todas
          </v-chip>
          <v-chip
            large
            color="error"
            class="mt-4 mx-2 px-4 elevation-4"
            @click="excluidas"
          >
            <v-icon large class="mr-3">mdi-delete-alert-outline</v-icon>
            Excluídas
          </v-chip>

          <hr class="mt-10 mx-5" />
        </v-flex>
        <v-flex
          class="pr-3 pb-3"
          xs12
          sm12
          md6
          lg6
          v-for="(dado, index) in dados"
          :key="index"
        >
          <v-card flat max-width="700" height="500" class="rounded-xl">
            <v-card-title class="primary--text">{{
              dado.tituloPergunta
            }}</v-card-title>
            <v-card-subtitle>@{{ dado.datapergunta | dayjs }}</v-card-subtitle>
            <v-card-text v-html="dado.pergunta"> </v-card-text>
            <v-spacer></v-spacer>
            <v-card-text>
              <v-timeline align-top dense>
                <v-timeline-item icon="mdi-head-lightbulb-outline">
                  <h1 class="mb-5">{{ dado.titulo }}</h1>
                  <h2 v-html="dado.resposta"></h2>
                  - @ {{ dado.dataresposta | dayjs }} - por:
                  <strong class="text-subtitle-2">{{ dado.nome }}</strong>
                </v-timeline-item>
              </v-timeline>
            </v-card-text>
            <v-card-actions>
              <v-btn
                v-if="!dado.deletedAt"
                icon
                color="primary"
                :to="{
                  path: `/editarRespostaAdm/${dado.idresposta}`,
                  params: { id: dado.idresposta },
                }"
                ><v-icon>mdi-pencil</v-icon></v-btn
              >
              <v-btn
                v-if="!dado.deletedAt"
                icon
                color="error"
                @click.prevent="
                  (dialogDelete = true), (selected = dado.idresposta)
                "
                ><v-icon>mdi-delete-empty</v-icon></v-btn
              >
              <v-icon v-if="dado.deletedAt" color="error"
                >mdi-delete-alert-outline</v-icon
              >
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <loading :skeletons="skeletons" v-else />
    <v-pagination
      class="mb-1"
      circle
      v-model="page"
      :length="length"
      v-if="length > 1"
    >
    </v-pagination>
  </v-app>
</template>

<script>
import dayjs from "dayjs";
import { mapActions, mapState } from "vuex";
export default {
  data: () => ({
    skeletons: [1, 2, 3, 4, 5, 6],
    dados: [],
    page: 1,
    titulo: "Todas",
    length: null,
    dialogDelete: false,
    selected: null,
    msgSnack: "",
    value: false,
    color: "error",
  }),
  methods: {
    ...mapActions("admin", ["arquivoRespostas"]),
    async excluidas() {
      await this.arquivoRespostas(this.page);
      this.dados = [...this.arquivoDRespostas.data];
      let filtro = await this.dados.filter(function (element) {
        if (element.deletedAt != null) {
          return element;
        }
      });
      this.titulo =
        filtro.length > 0 ? "Excluídas" : "0 Excluídas nessa página";
      this.dados = filtro.length > 0 ? filtro : this.dados;
    },
    async todas() {
      await this.arquivoRespostas(this.page);
      this.dados = [...this.arquivoDRespostas.data];
      this.titulo = "Todas";
    },
    async deletar(id) {
      try {
        await this.$http.delete(`/apagarResposta/${id}`);
        await this.arquivoRespostas(this.page);
        this.msgSnack = "Sucesso!";
        this.color = "success";
        this.value = true;
        this.dialogDelete = false;
        this.selected = null;
        this.dados = [...this.arquivoDRespostas.data];
        setTimeout(() => {
          this.value = false;
        }, 500);
      } catch (error) {
        this.msgSnack = error;
        this.value = true;
        setTimeout(async () => {
          this.value = false;
          await this.arquivoRespostas(this.page);
          this.dados = [...this.arquivoDRespostas.data];
        }, 500);
      }
    },
  },
  watch: {
    async page() {
      await this.arquivoRespostas(this.page);
      this.dados = [...this.arquivoDRespostas.data];
      this.titulo = "Todas";
    },
  },
  filters: {
    dayjs: function (date) {
      return dayjs(date).format("DD/MM/YYYY");
    },
  },
  computed: {
    ...mapState("admin", ["arquivoDRespostas"]),
  },
  async created() {
    await this.arquivoRespostas(this.page);
    this.dados = [...this.arquivoDRespostas.data];
    this.length = Math.ceil(
      this.arquivoDRespostas.count / this.arquivoDRespostas.limit
    );
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
  overflow: auto;
}
</style>
