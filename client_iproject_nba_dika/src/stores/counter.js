import { ref, computed } from 'vue'
import { defineStore, mapActions, mapState } from 'pinia'
import axios from 'axios'

export const useCounterStore = defineStore('counter', {
  state: () => {
    return {
      allPlayersData: [],
      playerData: {},
      playeStatistic: {},
      storage5matchplayer: [],
      totalasssistplayer: [],
      totalpointsplayer: [],
      totalblockplayer: [],
      totalreboundplayer: [],
      totalfgpplayer: [],
      totalftpplayer: [],
      totalstealsplayer: [],
      userLogin: {},
      comparePlayerStatistic: {},
      storageComparePlayer: [],
      playerData2:{},
      isLogin : localStorage.access_token,
      isSubscribe: localStorage.status
    }
  },
  getters: {

  },
  actions: {
    async login(form) {
      try {
        const { data } = await axios({
          method: 'POST',
          url: 'http://localhost:3000/login',
          data: form
        })
        console.log((data));
        localStorage.setItem('access_token', data.access_token)
        this.getProfile()
        this.isLogin = localStorage.access_token
        this.isSubscribe= localStorage.status
        this.router.push({ name: 'home' })
      } catch (error) {
        console.log(error);
      }
    },
    async register(form) {
      try {
        const { data } = await axios({
          method: 'POST',
          url: 'http://localhost:3000/register',
          data: form
        })
        console.log(data);
        this.router.push({ name: 'login' })
      } catch (error) {
        console.log(error);
      }
    },
    logout() {
      localStorage.clear()
      this.isLogin = localStorage.access_token
      this.isSubscribe= localStorage.status
      this.router.push({ name: 'home' })
    },
    async getallplayers() {
      try {
        const { data } = await axios({
          method: 'GET',
          url: 'http://localhost:3000/players'
        })
        console.log(data);
        this.allPlayersData = data
      } catch (error) {
        console.log(error);
      }
    },
    async getplayer(id) {
      try {
        const { data } = await axios({
          method: 'GET',
          url: `http://localhost:3000/players/${id}`,
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.playerData = data
        this.specificplayerpercentage(data.thirdapiId)
      } catch (error) {
        console.log(error);
      }
    },
    async getplayerthird(id) {
      try {
        const { data } = await axios({
          method: 'GET',
          url: `http://localhost:3000/players/third/${id}`,
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.playerData2 = data
        console.log(this.playerData2, 'ini masuk');
      } catch (error) {
        console.log(error);
      }
    }
    ,
    async fetchDataCompare(id) {
      try {
        let Year
        let nowMonth = (new Date()).getMonth()
        let nowYear = (new Date()).getFullYear()
        if (nowMonth <= 7) {
          Year = nowYear - 1
        } else {
          Year = nowYear
        }
        const { data } = await axios({
          method: 'GET',
          url: 'https://api-nba-v1.p.rapidapi.com/players/statistics',
          params: { id: `${id}`, season: `${Year}` },
          headers: {
            'X-RapidAPI-Key': '8a2a20a7ccmsh33f3256e888257fp1d4adfjsn235ec2ad880b',
            'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
          }
        })
        this.comparePlayerStatistic = data
        console.log(data.response.length);
        this.storageComparePlayer = data.response.slice(data.response.length -5, data.response.length)
      } catch (error) {
        console.log(error);
      }
    },
    async specificplayerpercentage(id) {
      console.log(id, 'test');
      try {
        let Year
        let nowMonth = (new Date()).getMonth()
        let nowYear = (new Date()).getFullYear()
        if (nowMonth <= 7) {
          Year = nowYear - 1
        } else {
          Year = nowYear
        }
        const { data } = await axios({
          method: 'GET',
          url: 'https://api-nba-v1.p.rapidapi.com/players/statistics',
          params: { id: `${id}`, season: `${Year}` },
          headers: {
            'X-RapidAPI-Key': '8a2a20a7ccmsh33f3256e888257fp1d4adfjsn235ec2ad880b',
            'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
          }
        })
        this.playeStatistic = data
        console.log(data.response.length);
        this.storage5matchplayer = data.response.slice(data.response.length -5, data.response.length)
        this.totalasssistplayer = this.storage5matchplayer.map(el => {
          console.log(el, el.assists, 'a<<<');
          return el.assists
        })
        this.totalpointsplayer = this.storage5matchplayer.map(el=> {
          return el.points
        })
        this.totalreboundplayer = this.storage5matchplayer.map(el => {
          return el.rebounds = el.offReb + el.defReb
        })
        this.totalblockplayer = this.storage5matchplayer.map(el => {
          return el.blocks
        })
        this.totalstealsplayer = this.storage5matchplayer.map(el => {
          return el.steals
        })
        this.totalfgpplayer = this.storage5matchplayer.map(el => {
          return +el.fgp
        })
        this.totalftpplayer = this.storage5matchplayer.map(el => {
          return +el.ftp
        })
      } catch (error) {
        console.log(error);
      }
    },
    async getProfile() {
      try {
        const {data} = await axios({
          method: 'get',
          url: 'http://localhost:3000/profile',
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.userLogin = data
        localStorage.setItem('status', data.status)
      } catch (error) {
        console.log(error);
      }
    },
    async subscribing() {
      try {
        const {data} = await axios({
          method: 'patch',
          url: 'http://localhost:3000/subscribe',
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.getProfile()
      } catch (error) {
        console.log(error);
      }
    },
    async subscribe() {
      const {data} = await axios({
        method: 'post',
        url: 'http://localhost:3000/generate-midtrans-token',
        headers:{
          access_token: localStorage.access_token
        }
      })
      const cb = this.subscribing
      try {
        window.snap.pay(data.token, {
          onSuccess: function(result){
            /* You may add your own implementation here */
            cb()
            alert("payment success!"); console.log(result);
          },
          onPending: function(result){
            /* You may add your own implementation here */
            alert("wating your payment!"); console.log(result);
          },
          onError: function(result){
            /* You may add your own implementation here */
            alert("payment failed!"); console.log(result);
          },
          onClose: function(){
            /* You may add your own implementation here */
            alert('you closed the popup without finishing the payment');
          }
        })
      } catch (error) {
        console.log(error);
      }
    }
  }
})
