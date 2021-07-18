<template>
  <v-app>
    
    <aviso :value="value" :color="color" :msg="msgSnack" />
    <v-form v-if="dados">
      <v-text-field
        v-model="dados.titulo"
        label="titulo"
        outlined
        class="my-4 mx-2 rounded-xl"
      ></v-text-field>
      <VueEditor v-model="dados.resposta" />
      <v-btn
        large
        elevation="0"
        class="mt-10 mr-3 rounded-pill"
        color="success"
        @click="enviar"
      >
        <v-icon left>mdi-pencil</v-icon> Confirmar</v-btn
      >
      <v-btn
        large
        elevation="0"
        class="mt-10 rounded-pill"
        color="error"
        @click="$router.go(-1)"
        ><v-icon class="mr-2">mdi-arrow-left</v-icon>Cancelar</v-btn
      >
    </v-form>
  </v-app>
</template>

<script>

import { VueEditor } from "vue2-editor";
import { mapActions, mapState } from "vuex";
export default {
  props: ["idresposta"],
  components: { VueEditor },
  data: () => ({
    data: new Date(),
    dados: null,
    msgSnack: "",
    value: false,
    color: "error",
  }),
  methods: {
    ...mapActions("user", ["dadosResposta"]),
    hasWhiteSpace(s) {
      console.log(/\s/g.test(s));
      return /\s/g.test(s);
    },
    async enviar() {
      try {
        let toAssing = { dataresposta: this.data };
        let payload = Object.assign(this.dados, toAssing);
        delete payload.nome;
        
        await this.$http.put("editarResposta", payload);
        this.msgSnack = "Resposta editada com sucesso";
        this.color = "success";
        this.value = true;
        setTimeout(() => {
          this.$router.go(-1);
        }, 500);
      } catch (error) {
        this.msgSnack = error;
        this.value = true;
        setTimeout(async () => {
          this.value = false;
          await this.dadosResposta(this.idresposta);
          this.dados = await this.respostaSelecionada;
        }, 1000);
      }
    },
  },
  computed: {
    ...mapState("user", ["respostaSelecionada"]),
    ...mapState(["loggedUser"]),
  },
  async created() {
    try {
      await this.dadosResposta(this.idresposta);
      this.dados = await this.respostaSelecionada;
    } catch (error) {
      this.$router.go(-1);
    }
    if (this.respostaSelecionada.idrespondeu !== this.loggedUser.iduser) {
      this.$router.push({ path: "/" });
    }
  },
};
</script>

<style></style>
