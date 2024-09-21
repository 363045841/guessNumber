<template>
  <v-app>
    <v-main id="main" :class="responsiveClass">
      <v-app-bar :style="{ color: 'white' }" class="app-bar" app :image="picData.picUrl">
        <v-app-bar-nav-icon @click="sidebarShow = !sidebarShow"></v-app-bar-nav-icon>
        <template v-slot:append>
          <v-tooltip location="bottom">
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" icon="mdi-refresh" @click="playAgain()"></v-btn>

            </template>
            <span>重新开始</span>
          </v-tooltip>
          <v-tooltip location="bottom">
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" icon="mdi-shuffle" @click="refreshPicUrl"></v-btn>
            </template>
            <span>换一张</span>
          </v-tooltip>
          <v-menu v-model:active="menuActive" offset-y transition="scale-transition">
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" icon="mdi-dots-vertical" @click="menuActive = !menuActive"></v-btn>
            </template>
            <v-list>
              <v-list-item @click="console.log('1')">
                <v-list-item-title>我超，我可以被点击</v-list-item-title>
              </v-list-item>

              <v-list-item disabled>
                <v-list-item-title>我超，我不可以被点击</v-list-item-title>
              </v-list-item>

              <v-list-item @click="console.log('1')">
                <v-list-item-title>我超，点点我的</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
        <v-toolbar-title>Guess Number</v-toolbar-title>
      </v-app-bar>


      <v-container class="game-area" fluid>
        <v-row align="center">
          <v-col style="margin: auto;margin-top: 12px;">
            <v-card prepend-icon="mdi-counter">
              <template #title>
                <span class="font-weight-black">猜数字</span>
              </template>
              <template #subtitle>
                <div class="sub-title">
                  {{ textRealNum }}
                </div>
              </template>
              <!-- change here -->
              <v-row align="center" class="my-2" style="margin: 12px;">
                <v-col md="10" xs="8" class="d-flex justify-center align-center" style="flex-grow: 1;">
                  <v-text-field hide-details="auto" v-model="numberChoose"
                    label="Enter a number you guess"></v-text-field>
                </v-col>
                <v-col md="2" xs="4" class="d-flex justify-center align-center" style="margin: auto; flex-grow: 0;">
                  <v-btn variant="tonal" :ripple="true" @click="GameData.submitNumber()" color="#3F51B5">提交</v-btn>
                </v-col>
              </v-row>

            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <v-container class="game-area">
        <v-row align="center" justify="center">
          <v-col class="d-flex justify-center align-center">
            <v-fade-transition>
              <v-alert v-if="winAttribute && GameData.isSubmit" text="你答对了" title="恭喜" type="success">
              </v-alert>
              <v-alert v-if="showError && GameData.isSubmit" text="你答错了" title="该死" type="error">
              </v-alert>
              <v-alert v-model="GameData.restoreShow" :text="GameData.restoreText" title="恢复数据" type="success">
              </v-alert>
            </v-fade-transition>
          </v-col>
        </v-row>
      </v-container>

      <sidebar v-model:sidebarShow="sidebarShow" :responsiveClass></sidebar>
      <router-view></router-view>

    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useGameData } from './stores/gamedata';
import { storeToRefs } from 'pinia';
import sidebar from './sidebar.vue';
import { usePicData } from './stores/picData';
import { useDisplay } from 'vuetify';
const picData = usePicData()
const GameData = useGameData()
const { numberChoose } = storeToRefs(GameData)
const winAttribute = storeToRefs(GameData).alertRightShow
const showError = storeToRefs(GameData).alertErrorShow
let sidebarShow = ref<boolean>(false)

const menuActive = ref<boolean>(false) // 控制下拉菜单的显示和隐藏
const textRealNum = computed<string>(() => {
  return `请你猜一个数字, 我们会告诉你是大是小, 偷偷告诉你数字是 ${GameData.randomNumber}`
})
const responsiveClass = computed<string>(() => {
  console.log(window.innerWidth < 600 ? 'mobile' : 'desktop')
  return window.innerWidth < 600 ? 'mobile' : 'desktop'
})
function playAgain() {
  GameData.randomNumber = Math.floor(Math.random() * 100)
  GameData.numberChoose = null
  localStorage.setItem('randomNumber', String(GameData.randomNumber))
}

onMounted(() => {
  console.log('mounted')
  GameData.initRandomNumber()
})

function refreshPicUrl() {
  picData.getRandomPicUrl()
  console.log(picData)
}

const display = useDisplay();
/* const responsiveClass = computed<string>(() => {
  return display.md.value ? 'desktop' : 'mobile';
}); */
console.log('shi md ma', display.md.value);
console.log('shi xs ma', display.xs.value);
</script>

<style scoped>
.mobile .game-area {
  width: 90%;
}

.desktop .game-area {
  width: 50%;
}

.guess-area {
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.game-area {
  margin: auto;
  margin-top: 12px;
  margin-bottom: -12px;
}

.sub-title,
.input-label {
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
<!-- TODO:支持下拉刷新 -->