<template>
    <v-container fluid :class="responsiveClass" class="info">
        <v-banner color="#3F51B5" icon="mdi-lock" lines="one">
            <v-banner-text>
                {{ id }},你的分数是{{ exp }}
            </v-banner-text>
            <template v-slot:actions>
                <v-btn @click="returnToHome()">确认</v-btn>
            </template>
        </v-banner>
    </v-container>
</template>

<script setup lang="ts">
import router from './router';
defineProps({
    id: String,
    exp: String
});
onMounted(() => {
    console.log('fuck router')
});

function returnToHome() {
    router.push('/guessNum')
}

const responsiveClass = computed<string>(() => {
    console.log(window.innerWidth < 600 ? 'mobile' : 'desktop')
    return window.innerWidth < 600 ? 'mobile' : 'desktop'
})
</script>
<style scoped>
.desktop .info {
    width: 50%;
}

.mobile .info {
    width: 90%;
}
</style>