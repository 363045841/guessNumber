<template>
  <v-container v-if="isShow && responsiveClass == 'desktop'" :class="responsiveClass" class="info-desktop"
    style="margin: auto;">
    <v-divider></v-divider>
    <v-row align="center" style="margin: 12px;">
      <v-col cols="1" style="flex-grow: 0;"><v-icon>mdi-account</v-icon></v-col>
      <v-col cols="9" style="flex-grow: 1;">
        {{ id }}, 你的分数是 {{ exp }}
      </v-col>
      <v-col cols="2" class="d-flex justify-center align-center" style="flex-grow: 0;">
        <v-btn :ripple="true" color="#3F51B5" variant="tonal" @click="closeInfo">关闭</v-btn>
      </v-col>
    </v-row>
    <v-divider></v-divider>
  </v-container>

  <v-container v-if="isShow && responsiveClass == 'mobile'" :class="responsiveClass" class="info-mobile"
    style="margin: auto;">
    <v-divider></v-divider>
    <v-row align="center" style="margin: 12px;">
      <v-col xs="1" class="d-flex justify-center align-center">
        <v-icon>mdi-account</v-icon>
      </v-col>
      <v-col xs="7" class="text d-flex">
        {{ id }}, 你的分数是 {{ exp }}
      </v-col>
      <v-col xs="4" class="d-flex justify-center align-center" style="flex-grow:0;">
        <v-btn :ripple="true" color="#3F51B5" variant="tonal" @click="closeInfo">关闭</v-btn>
      </v-col>
    </v-row>
    <v-divider></v-divider>
  </v-container>

</template>


<script setup lang="ts">
import router from './router';
import { useDisplay } from 'vuetify';
let isShow = ref(true)
defineProps({
  id: String,
  exp: String
});

onMounted(() => {
  console.log('Mounted and router available');
});
onBeforeUnmount(() => {
  console.log('the fucking component is unmounted');
});

function closeInfo() {
  isShow.value = false;
  router.push('/guessNum');
}
const display = useDisplay();
const responsiveClass = computed<string>(() => {
  console.log(window.innerWidth < 600 ? 'mobile' : 'desktop')
  return window.innerWidth < 600 ? 'mobile' : 'desktop'
});
console.log('userinfo shi md ma', display.md.value, responsiveClass.value);
console.log(window.innerWidth, responsiveClass.value, '666')

</script>

<style scoped>
.info-desktop {
  width: 50%;
}

.info-mobile {
  width: 90%;
}

.banner-content,
.text {
  white-space: normal;
  /* 允许正常换行 */
  word-break: break-word;
  /* 长单词换行 */
  overflow-wrap: break-word;
  /* 长单词自动换行 */
  max-width: 100%;
  /* 确保内容不超出容器 */
  line-height: 1.5em;
  /* 设置行高，确保阅读性 */
  word-wrap: break-word;
  /* 确保小屏幕也不会溢出 */
  font-size: 16px;
  /* 控制字体大小，适应不同屏幕 */
}
</style>
