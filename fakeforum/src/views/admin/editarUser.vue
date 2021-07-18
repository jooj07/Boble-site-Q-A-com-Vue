<template>
  <v-app>
    <v-container>
      <aviso :value="value" :color="color" :msg="msgSnack" />
      <v-layout row wrap class="mt-4">
        <v-flex class="pr-3 pb-3" xs12 sm12 md6 lg6>
          <v-btn icon elevation="5" to="/users">
            <v-icon> mdi-arrow-left </v-icon>
          </v-btn>
          <h1>Editar usuário</h1>
          <v-form>
            <v-text-field
              class="rounded-pill"
              outlined
              label="Nome"
              v-model="userSelected.nome"
              type="text"
            ></v-text-field>
            <v-text-field
              class="rounded-pill"
              outlined
              label="e-mail"
              v-model="userSelected.email"
              type="email"
            ></v-text-field>
            <v-switch
              label="Administrador"
              inset
              v-model="userSelected.adm"
            ></v-switch>
            <v-switch
              label="Editar senha"
              inset
              v-model="editarSenha"
            ></v-switch>
          </v-form>
          <v-form v-if="editarSenha">
            <v-text-field
              class="rounded-pill"
              outlined
              label="Senha"
              v-model="senha"
              :append-icon="showPassord ? 'mdi-eye-off' : 'mdi-eye'"
              :type="showPassord ? 'text' : 'password'"
              @click:append="() => (showPassord = !showPassord)"
            ></v-text-field>
            <v-text-field
              class="rounded-pill"
              outlined
              label="confirme a senha"
              v-model="confirmasenha"
              :append-icon="showPassord ? 'mdi-eye-off' : 'mdi-eye'"
              :type="showPassord ? 'text' : 'password'"
              @click:append="() => (showPassord = !showPassord)"
            ></v-text-field>
          </v-form>
          <v-btn
            class="rounded-pill mr-3 mt-3"
            color="success"
            @click="confirmar"
          >
            <v-icon class="mr-2">mdi-account-check-outline</v-icon
            >Confirmar</v-btn
          >
          <v-btn
            class="rounded-pill mr-3 mt-3"
            color="error"
            @click="$router.go(-1)"
            ><v-icon class="mr-2">mdi-arrow-left</v-icon>Cancelar</v-btn
          >
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  props: ["id"],
  data: () => ({
    showPassord:false,
    editarSenha: false,
    msgSnack: "",
    value: false,
    senha: null,
    color: "error",
    confirmasenha: null,
  }),
  computed: {
    ...mapState("admin", ["userSelected"]),
  },
  methods: {
    ...mapActions("admin", ["selecionarUser"]),
    async confirmar() {
      if (this.confirmasenha === false) {
        try {
          await this.$http.put(`users/${this.id}`, this.userSelected);
          await this.selecionarUser(this.id);
          this.msgSnack = "Sucesso!";
          this.color = "success";
          this.value = true;
          setTimeout(() => {
            this.value = false;
            this.$router.push("/admin");
          }, 500);
        } catch (error) {
          this.msgSnack = error;
          this.value = true;
          setTimeout(() => {
            this.value = false;
          }, 2000);
          await this.selecionarUser(this.id);
        }
      } else {
        try {
          let toAssign = {
            senha: this.senha,
            confirmaSenha: this.confirmasenha,
          };
          let payload = Object.assign(this.userSelected, toAssign);
          await this.$http.put(`users/${this.id}`, payload);
          await this.selecionarUser(this.id);
          this.msgSnack = "Sucesso!";
          this.color = "success";
          this.value = true;
          setTimeout(() => {
            this.value = false;
            this.$router.push("/users");
          }, 500);
        } catch (error) {
          this.msgSnack = error;
          this.value = true;
          setTimeout(() => {
            this.value = false;
          }, 2000);

          await this.selecionarUser(this.id);
          (this.editarSenha = false),
            (this.senha = null),
            (this.confirmasenha = null);
        }
      }
    },
  },
  async created() {
    await this.selecionarUser(this.id);
  },
};
</script>

<style></style>
