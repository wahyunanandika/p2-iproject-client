<script>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue';
export default {
    components: {
        Navbar
    }
}
</script>

<template>
    <div class="flex flex-col">
        <Navbar />

        <router-view></router-view>
    </div>
</template>

<style scoped>

</style>
