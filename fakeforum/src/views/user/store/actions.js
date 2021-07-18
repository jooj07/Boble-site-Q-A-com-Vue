import Vue from "vue";


export const carregarPerguntas = async({commit}, payload)=>{
  const data = await Vue.prototype.$http.get(`minhasPerguntas/${payload.id}?page=${payload.page? payload.page : 1}` )
  commit("carregarPerguntas",data.data)
}

export const carregarRespostas = async({commit}, payload)=>{
  const data = await Vue.prototype.$http.get(`minhasRespostas/${payload.id}?page=${payload.page? payload.page : 1}` )
  commit("carregarRespostas",data.data)
}

export const dadosPergunta = async({commit}, id)=>{
  const data = await Vue.prototype.$http.get(`pergunta/${id}` )
  commit("carregarPergunta",data.data)
} 
export const dadosResposta = async({commit}, id)=>{
  const data = await Vue.prototype.$http.get(`resposta/${id}` )
  commit("carregarResposta",data.data)
} 

export const selecionarUser = async ({commit}, id) =>{
  const data = await Vue.prototype.$http.get(`/editarPerfil/${id}`)
  commit("carregarUser",data.data)
}