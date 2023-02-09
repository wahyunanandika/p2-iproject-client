<script>
import Chart from 'chart.js/auto'
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
export default {
    name: 'LineChart',
    components: { Line },
    props: ['storage5matchplayer', 'data', 'playerData', 'data2', 'compareProfile'],
    data() {
        return {
        }
    },
    computed: {
        chartData() {
            return {
                labels: ['Match 1', 'Match 2', 'Match 3', 'Match 4', 'Match 5'],
                datasets: [{
                    label: this.playerData.name,
                    backgroundColor: '#00FFFF',
                    borderColor: "#5cddff",
                    data: this.data
                }, 
                {
                    label: this.compareProfile.name,
                    backgroundColor: '#3CB371',
                    borderColor: "#00FA9A",
                    data: this.data2
                }
            ]
            }
        },
        chartOptions() {
            return {
                responsive: true
            }
        }
    }
}
</script>

<template>
    <Line id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<style>

</style>