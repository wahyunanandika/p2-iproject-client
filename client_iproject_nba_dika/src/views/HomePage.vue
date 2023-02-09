<script>
import { mapState, mapActions } from 'pinia';
import { useCounterStore } from '../stores/counter';
import { RouterLink } from 'vue-router';
import PlayersCard from '../components/PlayersCard.vue';
export default {
    methods: {
        ...mapActions(useCounterStore, ['getallplayers']),
        fetchallplayers() {
            this.getallplayers()
        }
    },
    computed: {
        ...mapState(useCounterStore, ['allPlayersData'])
    },
    created() {
        this.fetchallplayers()
    },
    components: {
        PlayersCard
    }
}
</script>

<template>
<div class="p-10 mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">  
    <PlayersCard v-for="player in allPlayersData" :player="player" />
</div>
</template>

<style>

</style>