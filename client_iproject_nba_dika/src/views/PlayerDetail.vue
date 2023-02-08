<script>
import { mapState,mapActions } from 'pinia';
import { useCounterStore } from '../stores/counter';
import TableStatsPlayer from '../components/TableStatsPlayer.vue';
import ChartStatPlayer from '../components/ChartStatsPlayer.vue'
export default {
    methods: {
        ...mapActions(useCounterStore, ['getplayer','specificplayerpercentage']),
        transferData() {
            this.specificplayerpercentage(this.playerData.thirdapiId)
            if (this.isClicked == 'assists') {
                this.data = this.totalasssistplayer
            } else if (this.isClicked == 'rebounds') {
                this.data = this.totalreboundplayer
            } else if (this.isClicked == 'steals') {
                this.data = this.totalstealsplayer
            } else if (this.isClicked == 'blocks') {
                this.data = this.totalblockplayer
            } else if (this.isClicked == 'ftp') {
                this.data = this.totalftpplayer
            } else if (this.isClicked == 'fgp') {
                this.data = this.totalfgpplayer
            } else {
                this.data = this.totalpointsplayer
            }
        },
        clickon(click) {
            this.isClicked = click
            this.transferData()
        }
    },
    async created() {
        await this.getplayer(this.$route.params.id)
        await this.specificplayerpercentage(this.playerData.thirdapiId)
        this.data = this.totalpointsplayer
    },
    computed: {
        ...mapState(useCounterStore, ['playerData', 'playeStatistic', 'storage5matchplayer', 'totalasssistplayer', 'totalreboundplayer', 'totalpointsplayer', 'totalblockplayer', 'totalfgpplayer', 'totalftpplayer', 'totalstealsplayer'])
    },
    components: {
        TableStatsPlayer,
        ChartStatPlayer
    },
    data() {
        return{
            isClicked: 'points',
            data: this.totalpointsplayer
        }
    }
}
</script>

<template>
<h1>test123</h1>
<ChartStatPlayer :storage5matchplayer="storage5matchplayer" :data="data"/>
<div class="justify-center">
  <button @click.prevent="clickon('points')" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
    Points
  </button>
  <button @click.prevent="clickon('assists')" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
    Assists
  </button>
  <button @click.prevent="clickon('rebounds')" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
    Rebounds
  </button>
  <button @click.prevent="clickon('blocks')" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
    Blocks
  </button>
  <button @click.prevent="clickon('steals')" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
    Steals
  </button>
  <button @click.prevent="clickon('fgp')" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
    Field Goal Percentage
  </button>
  <button @click.prevent="clickon('ftp')" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
    Field Throw Percentage
  </button>
</div>


<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Match
                </th>
                <th scope="col" class="px-6 py-3">
                    Points
                </th>
                <th scope="col" class="px-6 py-3">
                    Assists
                </th>
                <th scope="col" class="px-6 py-3">
                    Rebounds
                </th>
                <th scope="col" class="px-6 py-3">
                    Blocks
                </th>
                <th scope="col" class="px-6 py-3">
                    Steals
                </th>
                <th scope="col" class="px-6 py-3">
                    Field Goal Percentage
                </th>
                <th scope="col" class="px-6 py-3">
                    Field Throw Percentage
                </th>
            </tr>
        </thead>
        <tbody>
            <TableStatsPlayer v-for="onematchplayer, index in storage5matchplayer" :onematchplayer="onematchplayer" :index="index" :totalasssistplayer="totalasssistplayer" :totalreboundplayer="totalreboundplayer" :totalpointsplayer="totalpointsplayer" :totalblockplayer="totalblockplayer" :totalfgpplayer="totalfgpplayer" :totalftpplayer="totalftpplayer" :totalstealsplayer="totalstealsplayer"  />
            
        </tbody>
    </table>
</div>

</template>

<style>

</style>