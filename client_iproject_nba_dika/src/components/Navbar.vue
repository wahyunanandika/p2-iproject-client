<script>
import { mapState, mapActions } from 'pinia';
import { useCounterStore } from '../stores/counter';
import { RouterLink } from 'vue-router';
export default {
    methods: {
      ...mapActions(useCounterStore, ['logout', 'subscribe']),
      Logouts() {
        this.logout()
      }
    },
    computed: {
      ...mapState(useCounterStore, ['userLogin', 'isLogin', 'isSubscribe'])
    }
}
</script>

<template>
<nav class="w-full px-2 bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
  <div class="w-full container flex flex-wrap items-center justify-between">
    <a href="#" class="flex items-center">
        <img src="https://cdn.nba.com/logos/leagues/L/nba-id.svg" class="h-6 mr-3 sm:h-10" alt="Flowbite Logo" />
        <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">NBA MVP Ladder</span>
    </a>
    
    <div class="hidden w-full md:block md:w-auto" id="navbar-dropdown">
      <ul class="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
          <router-link :to="{name: 'home'}">
            <a href="#" class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-white dark:bg-blue-600 md:dark:bg-transparent" aria-current="page">Home</a>

          </router-link>
        </li>
        <li>
          <router-link :to="{name: 'login'}">
            <a v-if="!isLogin" href="#" class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Login</a>
          </router-link>
        </li>
        <li>
          <a v-if="isSubscribe == 'member'" @click.prevent="subscribe()" href="#" class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Subscribe</a>
        </li>
        <li>
          <a v-if="isLogin" @click.prevent="Logouts()" href="#" class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Logout</a>
        </li>
      </ul>
    </div>
  </div>
</nav>

</template>

<style>

</style>