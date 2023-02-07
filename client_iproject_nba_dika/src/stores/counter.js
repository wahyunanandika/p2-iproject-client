import { ref, computed } from 'vue'
import { defineStore, mapActions, mapState } from 'pinia'
import axios from 'axios'

export const useCounterStore = defineStore('counter', {
  state: () => {

  },
  getters: {

  },
  actions: {
    async login(form){
      try {
        const {data} = await axios({
          method: 'POST',
          url: 'http://localhost:3000/login',
          data: form
        })
        console.log((data));
        localStorage.setItem('access_token', data.access_token)
        this.router.push({name: 'home'})
      } catch (error) {
        console.log(error);
      }
    },
    async register(form) {
      try {
        const {data} = await axios({
          method: 'POST',
          url: 'http://localhost:3000/register',
          data: form
        })
        console.log(data);
        this.router.push({name: 'login'})
      } catch (error) {
        console.log(error);
      }
    },
    logout() {
      localStorage.clear()
      this.router.push({name:'home'})
    }
  }
})
