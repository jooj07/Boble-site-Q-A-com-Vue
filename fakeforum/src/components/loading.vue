<template>
  <v-container >
      <v-layout wrap>
        <v-flex lg4 md6 sm12 xs12 v-for="skeleton in skeletons" :key="skeleton">
          <v-skeleton-loader
            class="mx-auto my-2"
            max-width="300"
            type="card"
          ></v-skeleton-loader>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
export default {
  props:['skeletons']

}
</script>

<style>

</style>