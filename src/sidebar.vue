<template>
    <v-navigation-drawer v-model="show" class="sidebar" app temporary :class="responsiveClass" @update:model-value="sideBarClose">
        <v-list-item title="切换用户" :subtitle="currentUserText"></v-list-item>
        <v-divider></v-divider>
        <template v-for="(item, key) in userList" :key="key">
            <v-list-item link v-if="item.id !== currentUser" :title="item.id" :key="key" @click="changeUser(item.id)">
            </v-list-item>
        </template>
    </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useUserData } from '@/stores/userdata';
import { type User } from '@/stores/userdata';
import router from './router';
import { ref, computed } from 'vue';

const userData = useUserData();
const userList: User[] = userData.userList;
let currentUser = ref<string>('default');
let currentUserText = computed(() => '当前用户:' + currentUser.value);

const prop = defineProps({
    sidebarShow: {
        type: Boolean,
        default: false,
    },
    responsiveClass: {
        type: String,
        default: 'md',
    },
});

const emit = defineEmits(['update:sidebarShow'])

let show = ref<boolean>(false);

watch(() => prop.sidebarShow, (val) => {
    show.value = val;
    console.log(val);
});

function changeUser(newUserID: string) {
    show.value = false;
    console.log(show.value);
    currentUser.value = newUserID;
    let exp = userData.userList.find((item) => item.id === newUserID)?.exp;
    router.push(`/guessNum/user/${newUserID}/${exp}`);
    emit('update:sidebarShow', false);
}

function sideBarClose(value: boolean) {
    show.value = false;
    if (!value){
        emit('update:sidebarShow', false);
    }
}
</script>

<style scoped></style>