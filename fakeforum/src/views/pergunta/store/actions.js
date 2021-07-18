import Vue from "vue";

export const carregarRespostas = async ({ commit }, payload) => {
  const data = await Vue.prototype.$http.get(
    `respostasPergunta/${payload.id}?page=${payload.page ? payload.page : 1}`
  );
  commit("carregarRespostas", data.data);
};
