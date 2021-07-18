<template>
  <v-app>
    <h1>Nova pergunta</h1>
    <v-layout v-if='loggedUser'>
      <v-flex lg12 md12 sm12 xs12>
        <v-form class="mt-4">
          <v-text-field
            label="Título"
            outlined
            class="rounded-pill"
            v-model="perguntaTitulo"
          ></v-text-field>
          <VueEditor v-model="corpo" />
          <v-btn
            class="mt-10 mr-4 rounded-pill"
            elevation="0"
            color="success"
            
            @click="enviar"
          >
            <v-icon>mdi-send</v-icon>
          </v-btn>
          <v-btn
            class="mt-10 mr-4 rounded-pill"
            elevation="0"
            color="error"
            
            @click="cancelar"
          >
            <v-icon>mdi-close-outline</v-icon>
          </v-btn>
        </v-form>
      </v-flex>
    </v-layout>
    <v-layout v-else class="mx-auto my-10">
       <v-flex lg12 md12 sm12 xs12 >
         <span class="text-h2">Para perguntar faça login</span>
         <v-btn class="mt-10" block outlined color="primary" to="/login"><v-icon>mdi-account-arrow-left-outline</v-icon>Entre aqui</v-btn>
       </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { mapActions, mapState } from "vuex";
export default {
  components: {
    VueEditor,
  },
  data: () => ({
    corpo: null,
    perguntaTitulo: null,
  }),
  computed: {
    ...mapState(["loggedUser"]),
  },
  methods: {
    ...mapActions("home", ["carregarFeed"]),
    async enviar() {
      let payload = {
        idperguntou: this.loggedUser.iduser,
        titulo: this.perguntaTitulo,
        pergunta: this.corpo,
        datapergunta: new Date()
      };
      try {
        await this.$http.post("novaPergunta", payload);
        this.$router.push({
          path: `perguntas/${this.loggedUser.iduser}`,
          params: {
            iduser: this.loggedUser.iduser,
          },
        });
      } catch (error) {
        this.$router.go();
      }
    },
    cancelar() {
      this.$router.go(-1);
    },
  },
  created() {},
};
</script>

<style></style>
