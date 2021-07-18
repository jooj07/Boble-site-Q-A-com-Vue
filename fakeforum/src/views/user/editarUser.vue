<template>
  <v-app>
    <v-container>
      <aviso :value="value" :color="color" :msg="msgSnack" />
      <v-layout row wrap class="mt-10">
        <v-flex class="pr-3 pb-3 mx-auto" xs12 sm12 md6 lg6>
          <v-form>
            <v-text-field
              outlined
              class="rounded-pill"
              label="Nome"
              v-model="userSelected.nome"
              type="text"
            ></v-text-field>
            <v-text-field
              outlined
              class="rounded-pill"
              label="e-mail"
              v-model="userSelected.email"
              type="email"
            ></v-text-field>
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
            class="mt-10 mr-3 rounded-pill"
            color="success"
            large
            @click="confirmar"
          >
            <v-icon class="mr-2">mdi-account-check-outline</v-icon
            >Confirmar</v-btn
          >
          <v-btn
            class="mt-10 mr-3 rounded-pill"
            color="error"
            large
            @click="$router.go(-1)"
            ><v-icon class="mr-2">mdi-arrow-left</v-icon>Cancelar</v-btn
          >
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import { storageName } from "@/global.js";
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  data: () => ({
    showPassord:false,
    editarSenha: false,
    msgSnack: "",
    value: false,
    senha: null,
    color: "error",
    confirmasenha: null,
  }),
  props: ["id"],
  computed: {
    ...mapState("user", ["userSelected"]),
  },
  methods: {
    ...mapMutations(["carregarUser"]),
    ...mapActions("user", ["selecionarUser"]),
    async confirmar() {
      if (this.confirmasenha === false) {
        try {
          await this.$http.put(`editarPerfil/${this.id}`, this.userSelected);
          await this.selecionarUser(this.id);
          this.msgSnack = "Feito! Você precisará fazer login novamente";
          this.color = "success";
          this.value = true;
          setTimeout(() => {
            this.value = false;
            this.carregarUser(null);
            localStorage.removeItem(storageName);
            this.$router.push("/login");
          }, 1000);
        } catch (error) {
          this.msgSnack = error;
          this.value = true;
          setTimeout(() => {
            this.value = false;
          }, 1000);
          await this.selecionarUser(this.id);
        }
      } else {
        try {
          let toAssign = {
            senha: this.senha,
            confirmaSenha: this.confirmasenha,
          };
          let payload = Object.assign(this.userSelected, toAssign);
          await this.$http.put(`editarPerfil/${this.id}`, payload);
          await this.selecionarUser(this.id);
          this.msgSnack = "Feito! Você precisará fazer login novamente";
          this.color = "success";
          this.value = true;
          setTimeout(() => {
            this.value = false;
            this.carregarUser(null);
            localStorage.removeItem(storageName);
            this.$router.push("/login");
          }, 1000);
        } catch (error) {
          this.msgSnack = error;
          this.value = true;
          setTimeout(() => {
            this.value = false;
          }, 1000);

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
    if (Number(this.id) !== this.userSelected.iduser) {
      this.$router.push("/");
    }
  },
};
</script>

<style></style>
