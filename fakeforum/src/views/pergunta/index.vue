<template>
  <v-app>
    <aviso :value="value" :color="color" :msg="msgSnack" />
    <v-flex lg6 md6 sm6 xs6 v-if="dadosArray">
      <v-btn icon elevation="12" @click.prevent="$router.go(-1)">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <h1>Siga a thread</h1>
    </v-flex>
    <v-flex lg12 md12 sm12 xs12>
      <v-card min-height="400px" class="rounded-xl mt-4 px-4" flat>
        <v-card-title class="headline">{{ pergunta.titulo }}</v-card-title>
        <v-card-subtitle class="text-subtitle">{{
          pergunta.datapergunta | dayjs
        }}</v-card-subtitle>
        <v-card-text class="text-h3" v-html="pergunta.pergunta"></v-card-text>
        <v-divider class="mx-2"></v-divider>
        <v-timeline align-top dense v-if="dadosArray">
          <v-timeline-item
            icon="mdi-head-lightbulb-outline"
            v-for="dado in dadosArray.data"
            :key="dado.idresposta"
          >
            <div class="font-weight-normal my-4">
              <h1>
                {{ dado.titulo }}
              </h1>
              <h3>
                {{ dado.nome }} - {{ new Date(dado.dataresposta) | dayjs }}
              </h3>
              <div v-html="dado.resposta" class="mt-4" id="resposta"></div>

              <div class="d-flex flex-row">
                <div class="d-flex flex-column">
                  <v-btn
                    :disabled="pergunta.respondida ? true : false"
                    dense
                    icon
                    @click="
                      upvote(dado.idresposta, dado.votos), (dado.votos += 1)
                    "
                    ><v-icon>mdi-menu-up</v-icon></v-btn
                  >
                  <v-btn
                    :disabled="pergunta.respondida ? true : false"
                    dense
                    icon
                    @click="
                      downvote(dado.idresposta, dado.votos), (dado.votos -= 1)
                    "
                    ><v-icon>mdi-menu-down</v-icon></v-btn
                  >
                </div>

                <span class="mt-5 text-h5"
                  >{{ dado.votos ? dado.votos : 0 }} votos</span
                >
              </div>
            </div>
          </v-timeline-item>
        </v-timeline>
        <div v-else class="pa-3">
          <h1 class="mb-4">
            Essa pergunta ainda não recebeu nenhuma resposta, seja o primeiro a
            responder!
          </h1>
          <v-btn
            outlined
            @click.prevent="$router.go(-1)"
            class="rounded-xl mr-3"
            ><v-icon>mdi-arrow-left</v-icon> voltar</v-btn
          >
          <v-btn
            elevation="9"
            @click.prevent="$router.push({ name: 'Login' })"
            class="rounded-xl"
            color="primary"
            v-if="!loggedUser"
            ><v-icon>mdi-account-arrow-left-outline</v-icon> entre para
            responder
          </v-btn>
        </div>
      </v-card>
    </v-flex>

    <v-flex
      lg12
      md12
      sm12
      xs12
      class="my-10"
      v-if="pergunta.respondida === false && loggedUser"
    >
      <h1 class="my-2 mx-2">Responda algo</h1>
      <v-form>
        <v-text-field
          outlined
          class="my-4 mx-2 rounded-xl"
          label="Titulo"
          v-model="titulo"
          :rules="titleRules"
        >
        </v-text-field>
      </v-form>

      <VueEditor v-model="corpo" class="mx-3" />
      <v-btn
        large
        class="mt-7 ml-2 rounded-xl"
        color="success"
        @click="enviar"
        v-if="corpo && titulo.length > 0 && titulo.length < 20"
        elevation="0"
      >
        <v-icon>mdi-send</v-icon> Enviar</v-btn
      >
      <v-btn
        large
        class="mt-7 ml-2 rounded-xl"
        color="error"
        @click="corpo = null"
        v-if="corpo && titulo.length > 0 && titulo.length < 20"
        elevation="0"
      >
        <v-icon>mdi-close-circle-outline</v-icon> Cancelar</v-btn
      >
      <p class="mt-7" v-if="!corpo">Insira sua resposta</p>
    </v-flex>
    <v-flex
      lg12
      md12
      sm12
      xs12
      class="my-10"
      v-if="pergunta.respondida === false && !loggedUser"
    >
      <h1 class="my-2 mx-2">Faça login para responder</h1>
      <v-btn
        elevation="9"
        @click.prevent="$router.push({ name: 'Login' })"
        class="rounded-xl"
        color="primary"
        ><v-icon>mdi-account-arrow-left-outline</v-icon> entre para responder
      </v-btn>
    </v-flex>
    <v-pagination circle v-model="page" :length="length" v-if="length > 1">
    </v-pagination>
  </v-app>
</template>

<script>
import dayjs from "dayjs";

import { VueEditor } from "vue2-editor";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    VueEditor,
  },
  props: ["id"],
  data: () => ({
    titleRules: [
      (v) => v.length < 20 || "Seu título deve conter até 20 caracteres",
    ],
    pergunta: [],
    dadosArray: [],
    corpo: null,
    titulo: "",
    msgSnack: "",
    page: 1,
    length: null,
    value: false,
    color: "error",
    confirmasenha: null,
  }),

  computed: {
    ...mapState("pergunta", ["respostas"]),
    ...mapState(["loggedUser"]),
  },
  methods: {
    ...mapActions("pergunta", ["carregarRespostas", "votar"]),

    async upvote(idResposta, votos) {
      let payload = {
        voto: {
          idresposta: idResposta,
          votos: votos + 1,
        },
        id: this.id,
      };
      await this.$http.put(`votar`, payload.voto);
    },
    async downvote(idResposta, votos) {
      let payload = {
        voto: {
          idresposta: idResposta,
          votos: votos - 1,
        },
        id: this.id,
      };
      await this.$http.put(`votar`, payload.voto);
    },
    async enviar() {
      let payload = {
        titulo: this.titulo,
        resposta: this.corpo,
        dataresposta: new Date(),
        idpergunta: this.id,
        idrespondeu: this.loggedUser.iduser,
      };
      try {
        await this.$http.post("novaResposta", payload);
        await this.carregarRespostas({ id: this.id, page: this.page });
        this.dadosArray = await this.respostas;
        this.corpo = "";
        this.titulo = null;
        this.msgSnack = "Feito! Resposta enviada";
        this.color = "success";
        this.value = true;
      } catch (error) {
        this.msgSnack = error;
        this.value = true;
        setTimeout(() => {
          this.value = false;
        }, 1000);
      }
    },
  },
  filters: {
    dayjs: function (date) {
      return dayjs(date).format("DD/MM/YYYY");
    },
  },
  watch: {
    async page() {
      await this.carregarRespostas({ id: this.id, page: this.page });
      this.dadosArray = await this.respostas;
    },
  },
  async created() {
    const data = await this.$http.get(`pergunta/${this.id}`);
    this.pergunta = data.data;
    await this.carregarRespostas({ id: this.id });

    if (this.respostas.data.length > 0) {
      this.dadosArray = await this.respostas;
    } else {
      this.dadosArray = null;
    }

    this.length = await Math.floor(this.respostas.count / this.respostas.limit);
  },
};
</script>

<style scoped>
#resposta {
  margin: 0 15px 0 0;
  padding: 5px;
  border-top: 1px rgba(0, 0, 0, 0.15) solid !important;
  border-bottom: 1px rgba(0, 0, 0, 0.15) solid !important;
}
</style>
