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
      <VueEditor v-model="dados.pergunta" />
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
  props: ["idpergunta"],
  components: { VueEditor },
  data: () => ({
    data: new Date().getTime(),
    dados: null,
    msgSnack: "",
    value: false,
    color: "error",
  }),
  methods: {
    ...mapActions("user", ["dadosPergunta"]),
    async enviar() {
      try {
        await this.$http.put("editarPergunta", this.dados);
        this.msgSnack = "Pergunta editada com sucesso";
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
          await this.dadosPergunta(this.idpergunta);
          this.dados = await this.perguntaSelecionada;
        }, 1000);
      }
    },
  },
  computed: {
    ...mapState("user", ["perguntaSelecionada"]),
    ...mapState(["loggedUser"]),
  },
  async created() {
    try {
      await this.dadosPergunta(this.idpergunta);
      this.dados = await this.perguntaSelecionada;
    } catch (error) {
      this.$router.go(-1);
    }
    if (this.perguntaSelecionada.idperguntou !== this.loggedUser.iduser) {
      this.$router.push({ path: "/" });
    }
  },
};
</script>

<style></style>
