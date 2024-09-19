<template>
    <v-container fluid :class="responsiveClass" class="info">
        <v-banner color="#3F51B5" icon="mdi-lock" lines="one">
            <div class="banner-content">
                {{ id }}，你的分数是 {{ exp }}
            </div>
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
    console.log('Mounted and router available');
});

function returnToHome() {
    router.push('/guessNum');
}

const responsiveClass = computed<string>(() => {
    return window.innerWidth < 600 ? 'mobile' : 'desktop';
});
</script>

<style scoped>
.desktop .info {
    width: 50%;
}

.mobile .info {
    width: 90%;
}

.banner-content {
    white-space: normal; /* 允许正常换行 */
    word-break: break-word; /* 长单词换行 */
    overflow-wrap: break-word; /* 长单词自动换行 */
    max-width: 100%; /* 确保内容不超出容器 */
    line-height: 1.5em; /* 设置行高，确保阅读性 */
    word-wrap: break-word; /* 确保小屏幕也不会溢出 */
    font-size: 16px; /* 控制字体大小，适应不同屏幕 */
}
</style>
