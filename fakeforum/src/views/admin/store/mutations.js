export default {
 carregarAtivos(state, payload){
  state.ativos = payload
 },
 carregarStatsUsers(state, payload){
  state.statsUsers = payload
 },
 carregarStatsPerguntas(state, payload){
  state.statsPerguntas = payload
 },
 carregarStatsRespondidas(state, payload){
  state.statsRespondidas = payload
 },
 carregarStatsAbertas(state, payload){
  state.statsAbertas = payload
 },
 carregarStatsRespostas(state, payload){
  state.statsRespostas = payload
 },
 carregarUsers(state, payload){
  state.users = payload
 },
 arquivoRespostas(state, payload){
  state.arquivoDRespostas = payload
 },
 arquivoPerguntas(state, payload){
  state.arquivoDPerguntas = payload
 },
 carregarUser(state, payload){
  state.userSelected = payload
 },
};
