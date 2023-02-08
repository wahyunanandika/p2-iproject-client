<script>
import { mapState,mapActions } from 'pinia';
import { useCounterStore } from '../stores/counter';
import TableStatsPlayer from '../components/TableStatsPlayer.vue';
import ChartStatPlayer from '../components/ChartStatsPlayer.vue'
export default {
    methods: {
        ...mapActions(useCounterStore, ['getplayer','specificplayerpercentage']),
        fetchPlayerData() {

        }
    },
    created() {
        this.getplayer(this.$route.params.id)
        this.specificplayerpercentage()
    },
    computed: {
        ...mapState(useCounterStore, ['playerData', 'playeStatistic', 'storage5matchplayer', 'totalasssistplayer', 'totalreboundplayer', 'totalpointsplayer', 'totalblockplayer', 'totalfgpplayer', 'totalftpplayer', 'totalstealsplayer'])
    },
    components: {
        TableStatsPlayer,
        ChartStatPlayer
    }
}
</script>

<template>
<h1>test123</h1>
<ChartStatPlayer :storage5matchplayer="storage5matchplayer" :totalasssistplayer="totalasssistplayer" :totalreboundplayer="totalreboundplayer" :totalpointsplayer="totalpointsplayer" :totalblockplayer="totalblockplayer" :totalfgpplayer="totalfgpplayer" :totalftpplayer="totalftpplayer" :totalstealsplayer="totalstealsplayer"/>
<table border="1">
    <th>
        <th>No</th>
        <th>Points</th>
        <th>Assists</th>
        <th>Total Rebounds</th>
        <th>Block</th>
        <th>Steals</th>
        <th>Field Goal Percentage</th>
        <th>Field Throw Percentage</th>
    </th>
    <TableStatsPlayer v-for="onematchplayer, index in storage5matchplayer" :onematchplayer="onematchplayer" :index="index" :totalasssistplayer="totalasssistplayer" :totalreboundplayer="totalreboundplayer" :totalpointsplayer="totalpointsplayer" :totalblockplayer="totalblockplayer" :totalfgpplayer="totalfgpplayer" :totalftpplayer="totalftpplayer" :totalstealsplayer="totalstealsplayer"  />
</table>
</template>

<style>

</style>