<template>
  <v-app>
    <h1>Gerenciar perguntas - {{ titulo }}</h1>
    <aviso :value="value" :color="color" :msg="msgSnack" />
    <v-overlay :value="dialogDelete"></v-overlay>
    <v-dialog v-model="dialogDelete" persistent max-width="400">
      <v-card>
        <v-card-title
          ><strong> Tem certeza que deseja apagar</strong>?</v-card-title
        >
        <v-card-text class="text-body-2"
          >Os usuários não terão mais acesso à pergunta.
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
    <v-container fill-heigt v-if="arquivoDPerguntas">
      <v-layout row wrap>
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
          <v-chip
            large
            color="success"
            class="mt-4 mx-2 px-4 elevation-4"
            @click="fechadas"
          >
            <v-icon large class="mr-3">mdi-check-bold</v-icon>
            Fechadas
          </v-chip>
          <v-chip
            large
            color="secondary"
            class="mt-4 mx-2 px-4 elevation-4"
            @click="abertas"
          >
            <v-icon large class="mr-3">mdi-head-question</v-icon>
            abertas
          </v-chip>
          <hr class="mt-10 mx-5" />
        </v-flex>
        <v-flex
          class="pr-3 pb-3"
          xs12
          sm12
          md4
          lg4
          v-for="(dado, index) in dados.data"
          :key="index"
        >
          <v-card height="350" class="rounded-xl mb-2" flat>
            <v-card-title class="headline"
              ><strong>{{ dado.titulo }}</strong></v-card-title
            >
            <v-card-subtitle class="text-subtitle-2"
              >Por: {{ dado.nome }} -
              {{ dado.datapergunta | dayjs }}</v-card-subtitle
            >

            <v-card-text v-html="dado.pergunta"></v-card-text>

            <v-card-actions>
              <v-icon left v-if="dado.respondida" color="success">
                mdi-check-outline
              </v-icon>
              <v-btn
                :to="{
                  path: `/pergunta/${dado.idpergunta}`,
                  name: 'pergunta',
                  params: { id: dado.idpergunta },
                }"
                icon
                v-if="!dado.deletedAt"
              >
                <v-icon>mdi-open-in-new</v-icon>
              </v-btn>
              <v-btn
                color="primary"
                icon
                v-if="!dado.deletedAt"
                :to="{
                  path: `/editarPerguntaAdm/${dado.idpergunta}`,
                  params: { id: dado.idpergunta },
                }"
                ><v-icon>mdi-pencil</v-icon></v-btn
              >
              <v-btn
                color="error"
                icon
                v-if="!dado.deletedAt"
                @click="(dialogDelete = true), (selected = dado.idpergunta)"
                ><v-icon>mdi-delete-empty</v-icon></v-btn
              >
              <v-icon v-if="dado.deletedAt" color="error"
                >mdi-delete-alert-outline</v-icon
              ><span v-if="dado.deletedAt" class="text-subtitle-2">
                {{ dado.deletedAt | dayjs }}
              </span>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <loading :skeletons="skeletons" v-else />
    <v-pagination circle v-model="page" :length="length" v-if="length > 1">
    </v-pagination>
  </v-app>
</template>

<script>
import dayjs from "dayjs";
import { mapState, mapActions } from "vuex";
export default {
  data: () => ({
    skeletons: [1, 2, 3, 4, 5, 6],
    dados: [],
    page: 1,
    filtro: 1,
    titulo: "Todas",
    length: null,
    selected: null,
    dialogDelete: false,
    msgSnack: "",
    value: false,
    color: "error",
  }),
  methods: {
    ...mapActions("admin", ["arquivoPerguntas"]),
    async excluidas() {
      await this.arquivoPerguntas(this.page);
      this.dados = await this.arquivoDPerguntas;
      let filtro = await this.dados.data.filter(function (element) {
        if (element.deletedAt != null) {
          return element;
        }
      });
      this.titulo =
        filtro.length > 0 ? "Excluídas" : "0 Excluídas nessa página";
      this.dados.data = filtro.length > 0 ? filtro : this.dados.data;
    },
    async todas() {
      await this.arquivoPerguntas(this.page);
      this.dados = await this.arquivoDPerguntas;
      this.titulo = "Todas";
    },
    async fechadas() {
      await this.arquivoPerguntas(this.page);
      this.dados = await this.arquivoDPerguntas;
      let filtro = await this.dados.data.filter(function (element) {
        if (element.respondida === true) {
          return element;
        }
      });

      this.titulo = filtro.length > 0 ? "Fechadas" : "0 Fechadas nessa página";
      this.dados.data = filtro.length > 0 ? filtro : this.dados.data;
    },
    async abertas() {
      await this.arquivoPerguntas(this.page);
      this.dados = await this.arquivoDPerguntas;
      let filtro = await this.dados.data.filter(function (element) {
        if (element.respondida === false) {
          return element;
        }
      });
      this.titulo = filtro.length > 0 ? "Abertas" : "0 Abertas nessa página";
      this.dados.data = filtro.length > 0 ? filtro : this.dados;
    },
    async deletar(id) {
      try {
        this.dialogDelete = false;
        this.msgSnack = "Pergunta apagada com sucesso";
        this.color = "success";
        this.value = true;
        await this.$http.delete(`/apagarPergunta/${id}`);
        await this.arquivoPerguntas(this.page);
        this.dados = await this.arquivoDPerguntas;
        setTimeout(() => {
          this.value = false;
        }, 500);
      } catch (error) {
        this.msgSnack = error;
        this.color = "error";
        this.value = true;

        setTimeout(async () => {
          this.value = false;
          await this.arquivoPerguntas(this.page);
          this.dados = await this.arquivoDPerguntas;
        }, 1000);
      }
    },
  },
  computed: {
    ...mapState("admin", ["arquivoDPerguntas"]),
  },
  watch: {
    async page() {
      await this.arquivoPerguntas(this.page);
      this.dados = await this.arquivoDPerguntas;
      this.titulo = "Todas";
    },
  },
  filters: {
    dayjs: function (date) {
      return dayjs(date).format("DD/MM/YYYY");
    },
  },
  async created() {
    await this.arquivoPerguntas();
    this.dados = await this.arquivoDPerguntas;
    this.length = await Math.ceil(
      this.arquivoDPerguntas.count / this.arquivoDPerguntas.limit
    );
  },
};
</script>

<style scoped>
/* .theme--dark.v-card {
    background-color: #1b1b1b00 !important;
    color: #FFFFFF !important;
} */
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
