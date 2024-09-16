<template>
    <v-navigation-drawer v-if="sidebarShow">
        <v-list-item title="Guess Game" subtitle="hello"></v-list-item>
        <v-divider></v-divider>
        <v-list-item link title="我超，我可以被点击"></v-list-item>
        <v-list-item link title="我超，我不可以被点击" disabled></v-list-item>
        <v-list-item link title="我超，点点我的"></v-list-item>
    </v-navigation-drawer>
</template>

<script setup lang='ts' name=''>
defineProps({
    sidebarShow: {
        type: Boolean,
        default: false
    }
})
</script>
<style scoped></style>