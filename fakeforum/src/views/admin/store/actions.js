import Vue from "vue";

export const carregarAtivos = async ({ commit }) => {
  const data = await Vue.prototype.$http.get(`statsAtivos`);
  commit("carregarAtivos", data.data);
};
export const carregarStatsUsers = async ({ commit }) => {
  const data = await Vue.prototype.$http.get(`statsUsers`);
  commit("carregarStatsUsers", data.data);
};
export const carregarStatsPerguntas = async ({ commit }) => {
  const data = await Vue.prototype.$http.get(`statsPerguntas`);
  commit("carregarStatsPerguntas", data.data);
};
export const carregarStatsRespondidas = async ({ commit }) => {
  const data = await Vue.prototype.$http.get(`statsRespondidas`);
  commit("carregarStatsRespondidas", data.data);
};
export const carregarStatsAbertas = async ({ commit }) => {
  const data = await Vue.prototype.$http.get(`statsAbertas`);
  commit("carregarStatsAbertas", data.data);
};
export const carregarStatsRespostas = async ({ commit }) => {
  const data = await Vue.prototype.$http.get(`statsRespostas`);
  commit("carregarStatsRespostas", data.data);
};

export const carregarUsuários = async ({ commit },page) => {
  const data = await Vue.prototype.$http.get(`users?page=${page? page : 1}`);
  commit("carregarUsers", data.data);
};

export const arquivoRespostas = async ({ commit },page) => {
  const data = await Vue.prototype.$http.get(`arquivoRespostas?page=${page? page : 1}`);
  commit("arquivoRespostas", data.data);
};

export const arquivoPerguntas = async ({ commit },page) => {
  const data = await Vue.prototype.$http.get(`arquivoPerguntas?page=${page? page : 1}`);
  commit("arquivoPerguntas", data.data);
};

export const selecionarUser = async ({commit}, id) =>{
  const data = await Vue.prototype.$http.get(`/users/${id}`)
  commit("carregarUser",data.data)
}
