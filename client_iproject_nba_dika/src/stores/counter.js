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
      totalstealsplayer: []
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
    }
  }
})
