<script>
import { mapState, mapActions } from 'pinia';
import { useCounterStore } from '../stores/counter';
import TableStatsPlayer from '../components/TableStatsPlayer.vue';
import ChartStatPlayer from '../components/ChartStatsPlayer.vue'
import Sidebar from '../components/Sidebar.vue';
export default {
    methods: {
        ...mapActions(useCounterStore, ['getplayer', 'specificplayerpercentage', 'getplayerthird', 'fetchDataCompare']),
        transferData() {
            this.specificplayerpercentage(this.playerData.thirdapiId)
            if (this.isClicked == 'assists') {
                this.data = this.totalasssistplayer
                this.data2 = this.totalasssistplayer2
            } else if (this.isClicked == 'rebounds') {
                this.data = this.totalreboundplayer
                this.data2 = this.totalreboundplayer2
            } else if (this.isClicked == 'steals') {
                this.data = this.totalstealsplayer
                this.data2 = this.totalstealsplayer2
            } else if (this.isClicked == 'blocks') {
                this.data = this.totalblockplayer
                this.data2 = this.totalblockplayer2
            } else if (this.isClicked == 'ftp') {
                this.data = this.totalftpplayer
                this.data2 = this.totalftpplayer2
            } else if (this.isClicked == 'fgp') {
                this.data = this.totalfgpplayer
                this.data2 = this.totalfgpplayer2
            } else {
                this.data = this.totalpointsplayer
                this.data2 = this.totalpointsplayer2
            }
        },
        clickon(click) {
            this.isClicked = click
            this.transferData()
        },
        getCompareData(data) {
            console.log(data, 'tandaa');
            this.dataCompare = data
            this.getCompareProfile(data[0].player.id)
            this.totalasssistplayer2 = this.dataCompare.map(el => {
                return el.assists
            })
            this.totalpointsplayer2 = this.dataCompare.map(el => {
                return el.points
            })
            this.totalreboundplayer2 = this.dataCompare.map(el => {
                return el.rebounds = el.offReb + el.defReb
            })
            this.totalblockplayer2 = this.dataCompare.map(el => {
                return el.blocks
            })
            this.totalstealsplayer2 = this.dataCompare.map(el => {
                return el.steals
            })
            this.totalfgpplayer2 = this.dataCompare.map(el => {
                return +el.fgp
            })
            this.totalftpplayer2 = this.dataCompare.map(el => {
                return +el.ftp
            })
        },
        getCompareProfile(id) {
            this.getplayerthird(id)
        },
        getData(data){
            this.datafivematchcompare = data
        }
    },
    async created() {
        await this.getplayer(this.$route.params.id)
        await this.specificplayerpercentage(this.playerData.thirdapiId)
        this.data = this.totalpointsplayer
        this.data2 = this.datafivematchcompare
        
    },
    computed: {
        ...mapState(useCounterStore, ['storageComparePlayer','playerData2','playerData', 'playeStatistic', 'storage5matchplayer', 'totalasssistplayer', 'totalreboundplayer', 'totalpointsplayer', 'totalblockplayer', 'totalfgpplayer', 'totalftpplayer', 'totalstealsplayer'])
    },
    components: {
        TableStatsPlayer,
        ChartStatPlayer,
        Sidebar
    },
    data() {
        return {
            isClicked: 'points',
            data: this.totalpointsplayer,
            dataCompare: [],
            totalasssistplayer2: [],
            totalpointsplayer2: [],
            totalblockplayer2: [],
            totalreboundplayer2: [],
            totalfgpplayer2: [],
            totalftpplayer2: [],
            totalstealsplayer2: [],
            data2: this.totalpointsplayer2,
            compareProfile: {},
            datafivematchcompare: []
        }
    }
}
</script>

<template>
    <div class="flex">
        <Sidebar :playerData="playerData" @getCompareData="getCompareData" @fetchDataCompare="fetchDataCompare" @getData="getData" />

        <div class="w-full px-4 h-[90vh] overflow-y-scroll">
            <h2 class="flex justify-center">{{ playerData.name }} Performance From Last 5 Matches</h2>
            <ChartStatPlayer :storage5matchplayer="storage5matchplayer" :data="data" :playerData="playerData" :data2="data2" :compareProfile="playerData2"/>
            <div class="flex justify-center">
                <button @click.prevent="clickon('points')"
                    class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
                    Points
                </button>
                <button @click.prevent="clickon('assists')"
                    class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
                    Assists
                </button>
                <button @click.prevent="clickon('rebounds')"
                    class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
                    Rebounds
                </button>
                <button @click.prevent="clickon('blocks')"
                    class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
                    Blocks
                </button>
                <button @click.prevent="clickon('steals')"
                    class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
                    Steals
                </button>
                <button @click.prevent="clickon('fgp')"
                    class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
                    Field Goal Percentage
                </button>
                <button @click.prevent="clickon('ftp')"
                    class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
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
                        <TableStatsPlayer v-for="onematchplayer, index in storage5matchplayer"
                            :onematchplayer="onematchplayer" :index="index" :totalasssistplayer="totalasssistplayer"
                            :totalreboundplayer="totalreboundplayer" :totalpointsplayer="totalpointsplayer"
                            :totalblockplayer="totalblockplayer" :totalfgpplayer="totalfgpplayer"
                            :totalftpplayer="totalftpplayer" :totalstealsplayer="totalstealsplayer" />

                    </tbody>
                </table>
            </div>

        </div>

    </div>

</template>

<style>

</style>