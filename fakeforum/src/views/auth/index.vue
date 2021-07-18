<template>
  <v-row justify="center">
    <v-overlay :value="dialog" opacity="1"></v-overlay>
    <v-dialog v-model="dialog" persistent max-width="400">
      <aviso :value="value" :color="color" :msg="msgSnack" />
      <v-card>
        <v-card-title class="text-h4"> Entre ou cadastre-se </v-card-title>
        <v-form
          class="d-flex flex-column ml-2 mr-4"
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <v-text-field
            prepend-icon="mdi-at"
            outlined
            dense
            label="email"
            :rules="emailRules"
            v-model="loginForm.email"
            required
          ></v-text-field>
          <v-text-field
            prepend-icon="mdi-account-cowboy-hat"
            v-if="hasAcct === false"
            outlined
            dense
            label="nome"
            :rules="nameRules"
            v-model="nome"
            required
          ></v-text-field>
          <v-text-field
            prepend-icon="mdi-key-outline"
            :append-icon="showPassord ? 'mdi-eye-off' : 'mdi-eye'"
            outlined
            dense
            :type="showPassord ? 'text' : 'password'"
            label="senha"
            v-model="loginForm.senha"
            :rules="passwordRules"
            @click:append="() => (showPassord = !showPassord)"
          ></v-text-field>
          <v-text-field
            prepend-icon="mdi-key-chain"
            :append-icon="showPassord ? 'mdi-eye-off' : 'mdi-eye'"
            v-if="hasAcct === false"
            outlined
            dense
            :type="showPassord ? 'text' : 'password'"
            label="confirme a senha"
            v-model="confirmaSenha"
            :rules="passwordconfirmRules"
            @click:append="() => (showPassord = !showPassord)"
          ></v-text-field>
          <a v-if="hasAcct === true" @click="hasAcct = false"
            >Ou crie uma conta aqui!</a
          >
          <a v-if="hasAcct === false" @click="hasAcct = true"
            >Voltar ao login.</a
          >
        </v-form>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            v-if="hasAcct === true"
            color="primary"
            outlined
            @click="signin"
            :disabled="!valid"
          >
            ok
          </v-btn>
          <v-btn
            v-if="hasAcct === false"
            color="primary"
            outlined
            @click="signup"
            :disabled="!valid"
          >
            create
          </v-btn>
          <v-btn color="error" outlined @click="dialog = false" to="/">
            cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      msgSnack: "",
      value: false,
      color: "error",
      valid: true,
      nameRules: [
        (v) => v.length >= 5 || "Nome deve ser maior que 5 caracteres",
      ],
      emailRules: [(v) => /.+@.+\..+/.test(v) || "E-mail inválido."],
      passwordRules: [
        (v) => v.length >= 5 || "senha deve ser maior que 5 caracteres",
      ],
      passwordconfirmRules: [
        (v) => v === this.loginForm.senha || "Senhas diferentes",
      ],
      showPassord: false,
      nome: "",
      confirmaSenha: "",
      loginForm: {
        email: "",
        senha: "",
      },
      dialog: true,
      hasAcct: true,
    };
  },
  computed: {
    ...mapState(["loggedUser"]),
  },
  methods: {
    ...mapActions(["login", "create"]),
    async signin() {
      try {
        await this.login(this.loginForm);
        await this.$router.push("/");
      } catch (error) {
        this.value = false;
        (this.value = true), (this.msgSnack = error), (this.color = "error");
        setTimeout(() => {
          this.value = false;
          (this.nome = ""),
            (this.confirmaSenha = ""),
            (this.loginForm = {
              email: "",
              senha: "",
            });
        }, 1000);
      }
    },
    async signup() {
      try {
        let toAssing = { nome: this.nome, confirmaSenha: this.confirmaSenha };
        let signupForm = Object.assign(this.loginForm, toAssing);
        await this.create(signupForm);
        await this.$router.push("/");
      } catch (error) {
        this.value = false;
        (this.value = true), (this.msgSnack = error), (this.color = "error");
        setTimeout(() => {
          this.value = false;
          (this.nome = ""),
            (this.confirmaSenha = ""),
            (this.loginForm = {
              email: "",
              senha: "",
            });
        }, 1000);
      }
    },
  },
};
</script>

<style></style>
