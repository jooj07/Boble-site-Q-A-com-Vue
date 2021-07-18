<template>
  <v-app-bar app elevation="12" color="primary">
    <router-link tag="div" class="d-flex align-center mr-6" to="/" id="link">
      <v-icon x-large color="accent">mdi-chart-bubble</v-icon
      ><span class="text-h4 white--text pb-4">bo</span>
      <span class="text-h4 white--text">bl</span>
      <span class="text-h4 white--text pt-4">ee!</span>
    </router-link>

   <v-spacer></v-spacer>
   
    <v-avatar v-if="loggedUser" size="34">
      <router-link to="/user">
        <v-img
          :src="`https://randomuser.me/api/portraits/${gen}/${num}.jpg`"
        ></v-img>
      </router-link>
    </v-avatar>
    <v-btn icon v-if="loggedUser && loggedUser.adm" to="/admin">
      <v-icon color="accent">mdi-cogs</v-icon>
    </v-btn>

    <v-menu transition="scroll-y-transition">
      
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on"
          ><v-icon color="accent">mdi-dots-vertical</v-icon></v-btn
        >
      </template>
      <v-list class="px-0 py-0">
        <v-list-item two-line class="px-2 py-0" v-if="!loggedUser">
          <router-link tag="li" to="/login" id="link" class="text-body-2">
            <v-icon>mdi-account-arrow-right-outline</v-icon>
            Entre/cadastre-se</router-link
          >
        </v-list-item>
        <v-list-item
          v-for="(link, index) in links"
          :key="index"
          two-line
          class="px-2 py-0"
        >
          <router-link tag="li" :to="link.path" id="link" class="text-body-2">
            <v-icon>mdi-{{ link.icon }}</v-icon>
            {{ link.name }}</router-link
          >
        </v-list-item>
        <hr class="mx-2" color="grey">
        <v-list-item class="pl-5 py-0" v-if="loggedUser">
          <v-btn @click="sair" outlined color="error">
            <v-icon>mdi-exit-run</v-icon>sair
          </v-btn>
        </v-list-item>
        <v-list-item>
          <v-switch inset color="secondary" class="ml-4" v-model="dark"> </v-switch>
           <v-icon color="secondary">mdi-theme-light-dark</v-icon>
        </v-list-item>
      </v-list>   
    </v-menu>
  </v-app-bar>
</template>

<script>
import { storageName } from "@/global.js";
import { mapState, mapMutations } from "vuex";
export default {
  data: () => ({
    dark: false,
  }),
  props: {
    links: {
      type: Array,
    },
  },
  computed: {
    ...mapState(["loggedUser"]),
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
  },
  methods: {
    ...mapMutations(["carregarUser"]),
    sair() {
      localStorage.removeItem(storageName);
      this.carregarUser(null);
      if (this.$route.name === "Home") {
        this.$router.go();
      } else {
        this.$router.push({ name: "Home" });
      }
    },
  },
  watch: {
    dark() {
      if (this.dark) {
        this.$vuetify.theme.dark = true;
        localStorage.setItem("themeState", this.$vuetify.theme.dark.toString());
      } else {
        this.$vuetify.theme.dark = false;
        localStorage.removeItem("themeState");
      }
    },
  },
  created() {
    const themeState = localStorage.getItem("themeState");
    if (themeState) {
      if (themeState == "true") {
        this.dark = true;
        this.$vuetify.theme.dark = true;
      } else {
        this.dark = false;
        this.$vuetify.theme.dark = false;
      }
    }
  },
};
</script>

<style scoped>
#link {
  cursor: pointer;
  list-style: none;
}

</style>
