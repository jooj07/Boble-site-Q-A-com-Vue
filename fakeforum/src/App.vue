<template>
  <v-app>
    <myheader :links="links"></myheader>

    <v-main id="main" class="mt-4">
      <v-container>
        <v-scroll-x-transition hide-on-leave>
          <router-view />
        </v-scroll-x-transition>
      </v-container>
    </v-main>
    <mbBottom class="hidden-md-and-up" :mobileBtns="links" />
    <myfooter :social="social" class="hidden-sm-and-down" />
  </v-app>
</template>

<script>
import myheader from "@/components/myheader.vue";
import myfooter from "@/components/myfooter.vue";
import mbBottom from "@/components/mbBottom.vue";
import { storageName } from "@/global.js";
import { mapMutations } from "vuex";
export default {
  components: { myheader, myfooter, mbBottom },
  name: "App",
  data: () => ({
    validando: false,
    links: [
      { name: "Home", path: "/", icon: "head-question-outline" },
      {
        name: "Nova Pergunta",
        path: "/novaPergunta",
        icon: "comment-question-outline",
      },
    ],
    social: [{ icon: "facebook" }, { icon: "instagram" }, { icon: "twitter" }],
  }),
  methods: {
    ...mapMutations(["carregarUser"]),
    async validarToken() {
      this.validando = true;
      let jsonfile = localStorage.getItem(storageName);
      let user = JSON.parse(jsonfile);
      this.carregarUser(null);

      if (!storageName) {
        this.validando = false;
        this.$router.push({ name: "Login" });
        return;
      }
      const data = await this.$http.post("validateToken", user);
      if (data.data) {
        this.carregarUser(user);
      } else {
        localStorage.removeItem(storageName);
        this.carregarUser(null);
        this.$router.push({ name: "Home" });
      }
      this.validando = false;
    },
  },
  created() {
    this.validarToken();
  },
};
</script>
<style>
.theme--dark.v-application {
  background: #252525 !important;
  color: #ffffff !important;
}

.v-card__title {
  word-break: break-all !important ;
}
.v-card__text{
  word-break: normal !important ;
}
::-webkit-scrollbar {
  background: #fffefe;
  box-shadow: inset 0 0 2px grey;
  border-radius: 10px;
  width: 10px;
}

::-webkit-scrollbar-track {
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #686969;
}
::-webkit-scrollbar-thumb {
  background: #b3b3b3;
  border-radius: 10px;
}
</style>
<style lang="css">
.quillWrapper {
  border-radius: 0px 0px 20px 20px !important;
  border: 0px transparent !important;
  box-shadow: rgba(251, 251, 251, 0.4) 5px 5px,
    rgba(255, 255, 255, 0.3) 10px 10px, rgba(255, 255, 255, 0.2) 15px 15px,
    rgba(255, 255, 255, 0.1) 20px 20px, rgba(255, 255, 255, 0.05) 25px 25px;
}
.ql-toolbar.ql-snow {
  border-radius: 20px 20px 0px 0px !important;
}
.container div {
  border: 0px transparent !important;
}
.theme--light.v-card {
  background-color: #f7f7f7 !important;
  color: rgba(0, 0, 0, 0.87) !important;
}
.container {
  padding: 8px !important;
}
</style>
