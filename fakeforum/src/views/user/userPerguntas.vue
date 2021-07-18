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
          >Sua pergunta ainda pode ser útil para alguém...
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
    <v-overlay :value="dialogFechar"></v-overlay>
    <v-dialog v-model="dialogFechar" persistent max-width="400">
      <v-card>
        <v-card-title
          ><strong>
            Seu tópico será marcado como respondido
          </strong></v-card-title
        >
        <v-card-text class="text-body-2"
          >Se você encontrou a resposta que queria (ou não &#128532;), pode
          fechar este tópico, ele será marcado como respondido. E não receberá
          mais respostas.
        </v-card-text>
        <v-card-actions>
          <v-btn icon color="primary" class="mr-2" @click="dialogFechar = false"
            ><v-icon>mdi-arrow-left</v-icon></v-btn
          >
          <v-btn icon color="success" @click.prevent="fechar(selected)">
            <v-icon>mdi-check-outline</v-icon></v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <h1>Suas Perguntas</h1>
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
            class="rounded-xl mb-2"
            flat
          >
            <v-card-title class="primary--text">{{ dado.titulo }}</v-card-title>
            <v-card-subtitle>{{ dado.datapergunta | dayjs }}</v-card-subtitle>
            <v-card-text class="text-h5" v-html="dado.pergunta"></v-card-text>

            <v-card-actions class="ml-2">
              <span v-if="dado.respondida" class="mr-7">
                Status:
                <v-icon color="success">mdi-head-lightbulb-outline</v-icon>
              </span>
              <span v-if="!dado.respondida" class="mr-7">
                Status:
                <v-icon color="error">mdi-head-question-outline</v-icon>
              </span>
            </v-card-actions>
            <v-card-actions v-if="dado.idperguntou === loggedUser.iduser">
              <v-btn
                icon
                color="primary"
                :to="{
                  path: `/editarPergunta/${dado.idpergunta}`,
                  params: { idpergunta: dado.idpergunta },
                }"
              >
                <v-icon>mdi-pencil-outline</v-icon>
              </v-btn>
              <v-btn
                icon
                color="success"
                @click.prevent="
                  (dialogFechar = true), (selected = dado.idpergunta)
                "
                v-if="!dado.respondida"
              >
                <v-icon>mdi-check-outline</v-icon></v-btn
              >
              <v-btn
                icon
                color="error"
                @click.prevent="
                  (dialogDelete = true), (selected = dado.idpergunta)
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
          <v-btn block x-large elevation="0" color="primary" to="/novaPergunta">
            <v-icon class="mr-4">mdi-head-question-outline</v-icon> Faça uma
            pergunta
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
    skeletons: [1, 2, 3, 4, 5, 6],
    loading: false,
    selected: null,
    dados: [],
    dialogDelete: false,
    dialogFechar: false,
    page: 1,
    length: null,
    msgSnack: "",
    value: false,
    color: "error",
  }),
  methods: {
    ...mapActions("user", ["carregarPerguntas"]),

    async deletar(id) {
      try {
        this.dialogDelete = false;
        this.msgSnack = "Pergunta apagada com sucesso";
        this.color = "success";
        this.value = true;
        await this.$http.delete(`/apagarPergunta/${id}`);
        await this.carregarPerguntas({ id: this.iduser });
        this.dados = await this.minhasPerguntas.data;
        setTimeout(() => {
          this.value = false;
        }, 500);
      } catch (error) {
        this.msgSnack = error;
        this.color = "error";
        this.value = true;

        setTimeout(async () => {
          this.value = false;
          await this.carregarPerguntas({ id: this.iduser });
          this.dados = await this.minhasPerguntas.data;
        }, 1000);
      }
    },
    async fechar(id) {
      try {
        this.dialogFechar = false;
        this.msgSnack = "Pergunta fechada com sucesso";
        this.color = "success";
        this.value = true;
        await this.$http.get(`/fecharPergunta/${id}`);
        await this.carregarPerguntas({ id: this.iduser });
        this.dados = await this.minhasPerguntas.data;
      } catch (error) {
        this.msgSnack = error;
        this.value = true;
        setTimeout(async () => {
          this.value = false;
          await this.carregarPerguntas({ id: this.iduser });
          this.dados = await this.minhasPerguntas.data;
        }, 1000);
      }
    },
  },
  computed: {
    ...mapState("user", ["minhasPerguntas"]),
    ...mapState(["loggedUser"]),
  },
  watch: {
    async page() {
      await this.carregarPerguntas({ id: this.iduser, page: this.page });
      this.dados = await [...this.minhasPerguntas.data];
    },
  },
  async created() {
    this.loading = true;
    await this.carregarPerguntas({ id: this.iduser });
    this.dados = await [...this.minhasPerguntas.data];
    this.length = await Math.round(
      this.minhasPerguntas.count / this.minhasPerguntas.limit
    );
    this.loading = false;
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
