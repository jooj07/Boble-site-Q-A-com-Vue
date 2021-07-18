import Vue from "vue";


export const carregarFeed = async({commit},page)=>{
  const data = await Vue.prototype.$http.get(`feed?page=${page? page : 1}`)
  commit("carregarFeed",data.data)
}