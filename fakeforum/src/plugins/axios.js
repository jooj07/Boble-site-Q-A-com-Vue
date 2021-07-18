import  Vue from 'vue'
import axios from "axios"
import { storageName } from "@/global.js";
const sucess = res => res
const error = err =>{
  if(401 === err.response.status){
    window.location = '/'
  }else{
    return Promise.reject(err)
  }
}

let token = null
if(localStorage.getItem(storageName)){
   let storage = JSON.parse(localStorage.getItem(storageName))
    token = storage.token
}


Vue.use({
  install(Vue){
    
    Vue.prototype.$http = axios.create({
      baseURL : "http://localhost:3500/",
      headers:{
        "Authorization": "bearer "+ token 
      }
    })
    

    Vue.prototype.$http.interceptors.response.use(sucess, error)

    
  }
})