<script>
export default {
    props: ['index', 'onematchplayer', 'totalasssistplayer', 'totalreboundplayer', 'totalpointsplayer', 'totalblockplayer', 'totalfgpplayer', 'totalftpplayer', 'totalstealsplayer'],
    methods: {
        totalsrebounds(a, b) {
            return a + b
        }
    }
}
</script>

<template>
    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {{ `Match${index + 1}` }}
        </th>
        <td class="px-6 py-4">
            {{ onematchplayer.points }}
        </td>
        <td class="px-6 py-4">
            {{ onematchplayer.assists }}
        </td>
        <td class="px-6 py-4">
            {{ totalsrebounds(onematchplayer.offReb, onematchplayer.defReb) }}
        </td>
        <td class="px-6 py-4">
            {{ onematchplayer.blocks }}
        </td>
        <td class="px-6 py-4">
            {{ onematchplayer.steals }}
        </td>
        <td class="px-6 py-4">
            {{ onematchplayer.fgp }}
        </td>
        <td class="px-6 py-4">
            {{ onematchplayer.ftp }}
        </td>
    </tr>
</template>

<style>

</style>