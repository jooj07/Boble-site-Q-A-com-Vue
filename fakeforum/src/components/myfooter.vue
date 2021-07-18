<template>
  <v-footer dark padless >
    <v-card class="flex" flat tile>
      <v-card-title class="primary">
        <strong class="subheading">Nos siga!</strong>

        <v-spacer></v-spacer>

        <v-btn v-for="(link, index) in social" :key="index" class="mx-4" icon>
          <v-icon size="24px"> mdi-{{ link.icon }} </v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="py-2 white--text text-center">
        {{ new Date().getFullYear() }} — <strong>boblee!</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>
>

<script>
export default {
  name: "myfooter",
  props: {
    social: {
      type: Array,
    },
  },
};
</script>

