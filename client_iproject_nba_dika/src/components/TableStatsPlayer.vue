<script>
export default {
    props: ['index', 'onematchplayer', 'totalasssistplayer', 'totalreboundplayer', 'totalpointsplayer', 'totalblockplayer', 'totalfgpplayer', 'totalftpplayer', 'totalstealsplayer'],
    methods : {
        totalsrebounds(a, b) {
            return a + b
        }
    }
}
</script>

<template>
<tr>
        <td>{{ index + 1 }}</td>
        <td>{{ onematchplayer.points }}</td>
        <td>{{ onematchplayer.assists }}</td>
        <td> {{ totalsrebounds(onematchplayer.offReb, onematchplayer.defReb) }}</td>
        <td>{{ onematchplayer.blocks }}</td>
        <td>{{ onematchplayer.steals }}</td>
        <td>{{ onematchplayer.fgp }}</td>
        <td>{{ onematchplayer.ftp }}</td>
    </tr>
</template>

<style>

</style>