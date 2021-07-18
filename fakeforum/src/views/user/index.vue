<template>
  <v-app>
    <!-- mobile -->
    <v-container>
      <v-row no-gutters class="hidden-md-and-up" id="menuLateral">
        <v-col cols="3">
          <v-card flat max-width="75px" height="100%">
            <v-list-item class="px-2">
              <v-list-item-avatar class="ml-1">
                <v-img
                  :src="`https://randomuser.me/api/portraits/${gen}/${num}.jpg`"
                ></v-img>
              </v-list-item-avatar>
            </v-list-item>
            <v-list-item
              v-for="(rota, index) in rotas"
              :key="index"
              class="ml-0 mr-16"
            >
              <v-btn
                :to="{
                  path: '/' + rota.path + '/' + id,
                  params: { iduser: id },
                }"
                icon
                class="mb-4 mr-16"
              >
                <v-icon>mdi-{{ rota.icon }}</v-icon>
              </v-btn>
            </v-list-item>
          </v-card>
        </v-col>
        <v-col cols="9">
          <v-scroll-x-transition hide-on-leave>
            <router-view />
          </v-scroll-x-transition>
        </v-col>
      </v-row>
    </v-container>
    <!-- mobile -->

    <!-- normal -->
    <v-container fluid class="hidden-sm-and-down" >
      <v-row no-gutters >
        <v-col cols="3">
          <v-list-item class="px-2" >
            <v-list-item-avatar>
              <v-img
                :src="`https://randomuser.me/api/portraits/${gen}/${num}.jpg`"
              ></v-img>
            </v-list-item-avatar>
            <v-list-item-title>{{ loggedUser.nome }}</v-list-item-title>
          </v-list-item>
          <v-list-item v-for="(rota, index) in rotas" :key="index">
            <v-list-item-title>
              <v-btn
                text
                :to="{
                  path: '/' + rota.path + '/' + id,
                  params: { iduser: id },
                }"
                class="mb-4"
              >
                <v-icon class="mr-3">mdi-{{ rota.icon }}</v-icon>
                {{ rota.name }}
              </v-btn>
            </v-list-item-title>
          </v-list-item>
        </v-col>
        <v-col>
          <v-scroll-x-transition hide-on-leave>
            <router-view />
          </v-scroll-x-transition>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
export default {
  data: () => ({
    id: null,
    rotas: [
      {
        icon: "head-lightbulb-outline",
        path: "respostas",
        name: "Suas Respostas",
      },
      {
        icon: "head-question-outline",
        path: "perguntas",
        name: "Suas Perguntas",
      },
      {
        icon: "head-cog-outline",
        path: "editarPerfil",
        name: "Editar perfil",
      },
    ],
  }),
  computed: {
    num() {
      return Math.floor(Math.random() * (90 - 10 + 1)) + 10;
    },
    gen() {
      let dict = {
        0: "women",
        1: "men",
      };
      return dict[Math.floor(Math.random() * (1 - 0 + 1)) + 0];
    },
    ...mapState(["loggedUser"]),
  },
  created() {
    this.id = this.loggedUser.iduser;
  },
};
</script>

<style scoped>
.theme--dark.v-card {
    background-color: #00000000 !important;
    color: #FFFFFF !important;
}

.theme--light.v-card {
    background-color: #ffffff !important;
    color: rgba(0, 0, 0, 0.87) !important;
}
</style>
