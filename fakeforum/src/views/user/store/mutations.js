export default {
 carregarPerguntas(state, payload){
  state.minhasPerguntas = payload
 },
 carregarRespostas(state, payload){
  state.minhasRespostas = payload
 },
 carregarPergunta(state, payload){
   state.perguntaSelecionada= payload
 },
 carregarResposta(state, payload){
  state.respostaSelecionada= payload
},
carregarUser(state, payload){
  state.userSelected = payload
 },
};
