<template>
  <v-app>
    <aviso :value="value" :color="color" :msg="msgSnack" />
    <v-container>
      <v-form>
        <v-text-field
          class="rounded-pill"
          label="Título"
          outlined
          type="text"
          v-model="dados.titulo"
        >
        </v-text-field>
      </v-form>
      <VueEditor v-model="dados.resposta" />
      <v-btn class="mt-10 mr-3 rounded-pill" color="success" @click="enviar">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
     <v-btn
            class="mt-10 mr-3 rounded-pill"
            color="error"
            @click="$router.go(-1)"
            ><v-icon class="mr-2">mdi-arrow-left</v-icon></v-btn
          >
    </v-container>
  </v-app>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  name: "editarPergunta",
  props: ["id"],
  components: { VueEditor },
  data: () => ({
    msgSnack: "",
    value: false,
    color: "error",
    dados: [],
  }),
  methods: {
    async enviar() {
      try {
        delete this.dados.nome;
        await this.$http.put("editarResposta", this.dados);
        this.msgSnack = "Pergunta editada com sucesso";
        this.color = "success";
        this.value = true;
        setTimeout(() => {
          this.value = false;
          this.$router.go(-1);
        }, 1000);
      } catch (error) {
        this.msgSnack = error;
        this.color = "error";
        this.value = true;
        setTimeout(async () => {
          this.value = false;
          let req = await this.$http.get(`resposta/${this.id}`);
          this.dados = req.data;
        }, 1000);
      }
    },
  },
  async created() {
    let req = await this.$http.get(`resposta/${this.id}`);
    this.dados = req.data;
  },
};
</script>

<style></style>
