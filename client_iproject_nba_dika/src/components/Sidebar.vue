<script>
import { mapActions, mapState } from 'pinia';
import { useCounterStore } from '../stores/counter';

export default {
    props: ['playerData'],
    methods: {
        ...mapActions(useCounterStore, ['getallplayers', 'fetchDataCompare', 'getCompareProfile', 'getData']),
        async compiledfunction(id) {
            const data = await this.fetchDataCompare(id)
            this.$emit('getData', data)
            console.log(data, id, 'tandaa di sidebar');
            this.$emit('getCompareData', data)
        }
    },
    created(){
        this.getallplayers()
    },
    computed:{
        ...mapState(useCounterStore, ['allPlayersData', 'storageComparePlayer'])
    },
    data() {
        return{
            idscompare :''
        }
    }
}
</script>

<template>
    <div class="flex flex-col top-0 left-0 w-80 bg-white h-full border-r">
        <div class="flex items-center justify-center h-14 border-b">
            <img class="object-contain w-10 h-10" :src="playerData.teamImageUrl" alt="">
            <p>
                {{ playerData.name }}
            </p>
        </div>
        <div class="overflow-y-auto overflow-x-hidden flex-grow">
            <img class="object-contain" :src="playerData.imageUrl">
            <ul class="flex flex-col py-4 space-y-1">
                <li class="px-5">
                    <div class="flex flex-row items-center h-8">
                        <div class="text-sm font-light tracking-wide text-gray-500">Team</div>
                    </div>
                </li>
                <li>
                    <a href="#"
                        class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                        <span class="inline-flex justify-center items-center ml-4">
                            <img class="object-contain" :src="playerData.teamImageUrl" alt="">
                            <!-- <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg> -->
                        </span>
                        <span class="ml-2 text-sm tracking-wide truncate">{{ playerData.team }}</span>
                    </a>
                </li>

                <li class="px-5">
                    <div class="flex flex-row items-center h-8">
                        <div class="text-sm font-light tracking-wide text-gray-500">Position</div>
                    </div>
                </li>
                <li>
                    <a href="#"
                        class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                        <span class="inline-flex justify-center items-center ml-4">
                            <!-- <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg> -->
                        </span>
                        <span class="ml-2 text-sm tracking-wide truncate">{{ playerData.position }}</span>
                    </a>
                </li>

                <li class="px-5">
                    <div class="flex flex-row items-center h-8">
                        <div class="text-sm font-light tracking-wide text-gray-500">Number</div>
                    </div>
                </li>
                <li>
                    <a href="#"
                        class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                        <span class="inline-flex justify-center items-center ml-4">
                            <!-- <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg> -->
                        </span>
                        <span class="ml-2 text-sm tracking-wide truncate">{{ playerData.number }}</span>
                    </a>
                </li>
                <li class="px-5">
                    <div class="flex flex-row items-center h-8">
                        <div class="text-sm font-light tracking-wide text-gray-500">Compare</div>
                        <div class="flex justify-center align-bottom">

                        </div>
                    </div>
                </li>
                <li>
                    <div class="mb-3 xl:w-96">
                        <select v-model="idscompare" @change="compiledfunction(idscompare, storageComparePlayer)"
                            class="form-select appearance-none
                            block
                            w-full
                            px-3
                            py-1.5
                            text-base
                            font-normal
                          text-gray-700
                          bg-white bg-clip-padding bg-no-repeat
                            border border-solid border-gray-300
                            rounded
                            transition
                            ease-in-out
                            m-0
                          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            aria-label="Default select example">
                            <option v-for="player in allPlayersData" :value="player.thirdapiId" >{{ player.name }}</option>
                        </select>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<style>

</style>