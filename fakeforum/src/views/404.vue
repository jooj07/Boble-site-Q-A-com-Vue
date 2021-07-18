<template>
  <v-app>
    <section>
      <div class="d-flex">
        <h1>4</h1>
        <v-icon x-large>mdi-emoticon-sad-outline</v-icon>
        <h1>4</h1>
      </div>
      <h1>Página não encontrada</h1>
      <v-btn to="/" large color="primary" class="mt-10 mx-15">voltar</v-btn>
    </section>
  </v-app>
</template>

<script>
export default {};
</script>

<style scoped>
section {
  font-size: 1.4rem;
  margin-top: 200px;
  display: flex;
  flex-direction: column;
  align-content: center;
  width: 100%;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: center;
}
</style>
