<template>
  <v-app>
    <v-main id="main" :class="responsiveClass">
      <v-app-bar :style="{ color: 'white' }" class="app-bar" app image="./assets/a4754a82ckef2a11a55447d8f48a81f7.jpg">
        <v-app-bar-nav-icon @click="sidebarShow = !sidebarShow"></v-app-bar-nav-icon>
        <template v-slot:append>
          <v-tooltip location="bottom">
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" icon="mdi-refresh" @click="playAgain()"></v-btn>
            </template>
            <span>重新开始</span>
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

      <div class="guess-area">
        <v-container class="game-area">
          <v-card prepend-icon="mdi-counter" :subtitle="textRealNum">
            <template v-slot:title>
              <span class="font-weight-black">猜数字</span>
            </template>
            <v-container>
              <v-row align="center">
                <v-col class="d-flex justify-center align-center">
                  <v-text-field label="Enter a number you guess" hide-details="auto" v-model="numberChoose" />
                </v-col>
                <v-col cols="auto" class="d-flex justify-center align-center">
                  <v-btn variant="tonal" :ripple="true" @click="GameData.submitNumber()" color="#3F51B5">提交</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
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
      </div>
      <sidebar v-model:sidebarShow="sidebarShow"></sidebar>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useGameData } from './stores/gamedata';
import { storeToRefs } from 'pinia';
import sidebar from './sidebar.vue';
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
</style>
<!-- TODO:用户数据切换用router实现 -->
<!-- TODO:支持下拉刷新 -->