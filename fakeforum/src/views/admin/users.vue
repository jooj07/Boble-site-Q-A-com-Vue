<template>
  <v-app>
    <!-- modal de confirmação de exclusão -->
    <v-overlay :value="dialogDelete"></v-overlay>
    <v-dialog v-model="dialogDelete" persistent width="500">
      <v-card height="300" width="500">
        <v-card-title><strong> Escolha o que apagar</strong>?</v-card-title>
        <v-card-text class="text-body-2">
          Você pode apagar o usuário e tudo relacionado ao mesmo, ou apenas seu
          perfil, mantendo suas perguntas e respostas.
        </v-card-text>

        <div class="d-flex flex-column mx-3 mt-5">
          <v-btn
            color="primary"
            class="mb-2"
            @click="(dialogDelete = false), (selected = null)"
            ><v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-btn color="error" class="mb-2" @click="wipe(selected)">
            <v-icon>mdi-delete-empty</v-icon>Apagar usuário e perguntas
          </v-btn>
          <v-btn outlined color="error" class="mb-2" @click="remove(selected)"
            ><v-icon>mdi-delete-empty</v-icon>Apagar apenas usuário
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
    <h1>Usuários - {{ titulo }}</h1>
    <v-container v-if="dados.length > 0">
      <v-layout row wrap class="mt-4">
        <v-flex class="pr-3 pb-3" xs12 sm12 md12 lg12>
          <v-chip
            large
            color="primary"
            class="mt-4 mx-2 px-4 elevation-4"
            @click="todos"
          >
            <v-icon large class="mr-3">mdi-select-all</v-icon>
            Todos
          </v-chip>
          <v-chip
            large
            color="error"
            class="mt-4 mx-2 px-4 elevation-4"
            @click="inativos"
          >
            <v-icon large class="mr-3">mdi-account-multiple-remove</v-icon>
            Inativos
          </v-chip>
          <v-chip
            large
            color="success"
            class="mt-4 mx-2 px-4 elevation-4"
            @click="ativos"
          >
            <v-icon large class="mr-3">mdi-account-check</v-icon>
            Ativos
          </v-chip>
          <v-chip
            large
            color="secondary"
            class="mt-4 mx-2 px-4 elevation-4"
            @click="admins"
          >
            <v-icon large class="mr-3">mdi-badge-account-outline</v-icon>
            Admin.
          </v-chip>
          <hr class="mt-10 mx-5" />
        </v-flex>
        <v-flex
          class="pr-3 pb-3"
          xs12
          sm12
          md6
          lg6
          v-for="(dado, index) in dados"
          :key="index"
        >
          <v-card class="rounded-xl mr-4 px-2" flat max-height="350">
            <v-card-title class="primary--text text-h4">
              {{ dado.nome }}
            </v-card-title>
            <v-card-text class="text-body-1">
              E-mail: {{ dado.email }}
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <span v-if="dado.deletedAt">
                <v-icon color="error">mdi-account-remove-outline</v-icon>
                {{ dado.deletedAt | dayjs }}
              </span>
            </v-card-actions>
            <v-card-actions>
              <v-spacer></v-spacer>
              <span
                v-if="dado.iduser === loggedUser.iduser"
                class="text-caption"
                >Você</span
              >
              <v-btn
                icon
                :to="{
                  path: `/editarUser/${dado.iduser}`,
                  params: { id: dado.iduser },
                }"
                v-if="dado.iduser !== loggedUser.iduser && !dado.deletedAt"
                ><v-icon>mdi-account-edit-outline</v-icon></v-btn
              >
              <v-btn
                v-if="dado.iduser !== loggedUser.iduser && !dado.deletedAt"
                icon
                @click="(dialogDelete = true), (selected = dado.iduser)"
              >
                <v-icon> mdi-account-minus-outline </v-icon>
              </v-btn>
              <v-icon v-if="dado.adm" color="success"
                >mdi-badge-account-outline</v-icon
              >
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <!-- loading -->
    <loading v-else :skeletons="skeletons" />

    <!-- loading -->
    <v-pagination circle v-model="page" :length="length" v-if="length > 1">
    </v-pagination>
  </v-app>
</template>

<script>
import dayjs from "dayjs";
import loading from "../../components/loading.vue";
import { mapActions, mapState } from "vuex";
export default {
  components: { loading },
  data: () => ({
    skeletons: [1, 2, 3, 4, 5, 6],
    dados: [],
    selected: null,
    dialogDelete: false,
    titulo: "Todos",
    page: 1,
    length: null,
    msgSnack: "",
    value: false,
    color: "error",
  }),
  methods: {
    ...mapActions("admin", ["carregarUsuários"]),
    async wipe(id) {
      try {
        await this.$http.delete(`admUserWipe/${id}`);
        await this.carregarUsuários(this.page);
        this.dados = [...this.users.data];
        this.dialogDelete = false;
      } catch (error) {
        console.log(error);
        await this.carregarUsuários(this.page);
        this.dados = [...this.users.data];
        this.dialogDelete = false;
      }
    },
    async remove(id) {
      try {
        await this.$http.delete(`users/${id}`);
        await this.carregarUsuários(this.page);
        this.dados = [...this.users.data];
        this.dialogDelete = false;
      } catch (error) {
        console.log(error);
        await this.carregarUsuários(this.page);
        this.dados = [...this.users.data];
        this.dialogDelete = false;
      }
    },
    async todos() {
      await this.carregarUsuários(this.page);
      this.dados = [...this.users.data];
      this.titulo = "Todos";
    },
    async inativos() {
      await this.carregarUsuários(this.page);
      this.dados = [...this.users.data];
      let filtro = await this.dados.filter(function (element) {
        if (element.deletedAt != null) {
          return element;
        }
      });
      this.titulo = filtro.length > 0 ? "Inatívos" : "0 Inatívos nessa página";
      this.dados = filtro.length > 0 ? filtro : this.dados;
    },
    async ativos() {
      await this.carregarUsuários(this.page);
      this.dados = [...this.users.data];
      let filtro = await this.dados.filter(function (element) {
        if (element.deletedAt === null) {
          return element;
        }
      });
      this.titulo = filtro.length > 0 ? "Ativos" : "0 Ativos nessa página";
      this.dados = filtro.length > 0 ? filtro : this.dados;
    },
    async admins() {
      await this.carregarUsuários(this.page);
      this.dados = [...this.users.data];
      let filtro = await this.dados.filter(function (element) {
        if (element.adm === true) {
          return element;
        }
      });
      this.titulo =
        filtro.length > 0
          ? "Administradores"
          : "0 Administradores nessa página";
      this.dados = filtro.length > 0 ? filtro : this.dados;
    },
  },
  watch: {
    async page() {
      await this.carregarUsuários(this.page);
      this.dados = [...this.users.data];
      this.titulo = "Todos";
      this.dialogDelete = false;
    },
  },
  computed: {
    ...mapState("admin", ["users"]),
    ...mapState(["loggedUser"]),
  },
  async created() {
    await this.carregarUsuários(this.page);
    this.dados = [...this.users.data];
    this.length = Math.ceil(this.users.count / this.users.limit);
  },
  filters: {
    dayjs: function (date) {
      return dayjs(date).format("DD/MM/YYYY");
    },
  },
};
</script>

<style></style>
