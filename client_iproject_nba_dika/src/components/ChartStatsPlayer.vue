<script>
import Chart from 'chart.js/auto'
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
export default {
    name: 'LineChart',
    components: { Line },
    props: ['storage5matchplayer', 'totalasssistplayer', 'totalreboundplayer', 'totalpointsplayer', 'totalblockplayer', 'totalfgpplayer', 'totalftpplayer', 'totalstealsplayer'],
    data() {
        return {
        }
    },
    computed: {
        chartDataPoints() {
            return {
                labels: ['Match 1', 'Match 2', 'Match 3', 'Match 4', 'Match 5'],
                datasets: [{ data: this.totalpointsplayer }]
            }
        },
        chartOptionsPoints() {
            return{
                responsive: true
            }
        },
        chartDataAssists() {
            return {
                labels: ['Match 1', 'Match 2', 'Match 3', 'Match 4', 'Match 5'],
                datasets: [{ data: this.totalasssistplayer }]
            }
        },
        chartOptionsAssists() {
            return{
                responsive: true
            }
        },
        chartDataRebounds() {
            return {
                labels: ['Match 1', 'Match 2', 'Match 3', 'Match 4', 'Match 5'],
                datasets: [{ data: this.totalreboundplayer }]
            }
        },
        chartOptionsRebounds() {
            return{
                responsive: true
            }
        },
        chartDataBlocks() {
            return {
                labels: ['Match 1', 'Match 2', 'Match 3', 'Match 4', 'Match 5'],
                datasets: [{ data: this.totalblockplayer }]
            }
        },
        chartOptionsBlocks() {
            return{
                responsive: true
            }
        },
        chartDataSteals() {
            return {
                labels: ['Match 1', 'Match 2', 'Match 3', 'Match 4', 'Match 5'],
                datasets: [{ data: this.totalstealsplayer }]
            }
        },
        chartOptionsSteals() {
            return{
                responsive: true
            }
        },
        chartDataFGP() {
            return {
                labels: ['Match 1', 'Match 2', 'Match 3', 'Match 4', 'Match 5'],
                datasets: [{ data: this.totalfgpplayer }]
            }
        },
        chartOptionsFGP() {
            return{
                responsive: true
            }
        },
        chartDataFTP() {
            return {
                labels: ['Match 1', 'Match 2', 'Match 3', 'Match 4', 'Match 5'],
                datasets: [{ data: this.totalftpplayer }]
            }
        },
        chartOptionsFTP() {
            return{
                responsive: true
            }
        },
    }
}
</script>

<template>
    <Line id="my-chart-id" :options="chartOptionsPoints" :data="chartDataPoints" />
    <Line id="my-chart-id" :options="chartOptionsAssists" :data="chartDataAssists" />
    <Line id="my-chart-id" :options="chartOptionsRebounds" :data="chartDataRebounds" />
    <Line id="my-chart-id" :options="chartOptionsBlocks" :data="chartDataBlocks" />
    <Line id="my-chart-id" :options="chartOptionsSteals" :data="chartDataSteals" />
    <Line id="my-chart-id" :options="chartOptionsFGP" :data="chartDataFGP" />
    <Line id="my-chart-id" :options="chartOptionsFTP" :data="chartDataFTP" />
</template>

<style>

</style>