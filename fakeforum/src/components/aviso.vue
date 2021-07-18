<template>
  <v-snackbar
    :value="value"
    :color="color"
    right
    rounded="pill"
    top
    class="text-center ma-2"
  >
    {{ msg }}
  </v-snackbar>
</template>

<script>
export default {
  props: ["value", "color", "msg"],
  name: "aviso",
};
</script>

<style></style>
