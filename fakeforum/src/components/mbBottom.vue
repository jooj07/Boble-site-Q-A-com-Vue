<template>
  <v-bottom-navigation app hide-on-scroll background-color="primary" dark shift>
    <v-btn v-for="(btn, index) in mobileBtns" :to="btn.path" :key="index">
      <span>{{ btn.name }}</span>

      <v-icon>mdi-{{ btn.icon }}</v-icon>
    </v-btn>
    <div class="ml-16 mt-4">
      <v-icon size="24px" class="mx-2"> mdi-facebook </v-icon>
      <v-icon size="24px" class="mx-2"> mdi-twitter </v-icon>
      <v-icon size="24px" class="mx-2"> mdi-instagram </v-icon>
    </div>
  </v-bottom-navigation>
</template>

<script>
export default {
  props: {
    mobileBtns: {
      type: Array,
    },
  },
};
</script>

<style></style>
