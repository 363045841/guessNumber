<template>
  <v-app>
    <v-main id="main" :class="responsiveClass">
      <v-app-bar class="app-bar" app image="./assets/a4754a82ckef2a11a55447d8f48a81f7.jpg">
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <template v-slot:append>
          <v-btn icon="mdi-refresh"></v-btn>
          <v-btn icon="mdi-dots-vertical"></v-btn>
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
                  <v-btn variant="tonal" :ripple="true" @click="checkNumber" color="#3F51B5">提交</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card>

        </v-container>

        <v-container class="game-area">
          <v-row align="center" justify="center">
            <v-col class="d-flex justify-center align-center">
              <v-alert v-if="winAttribute" text="你答对了" title="Alert title" type="success">
              </v-alert>
              <v-alert v-if="showError" text="你答错了" title="Alert title" type="error">
              </v-alert>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

const numberChoose = ref<string | null>(null)
const randomNum = ref(Math.floor(Math.random() * 100))
const winAttribute = ref<boolean>(false)
const showError = ref<boolean>(false)

const textRealNum = computed<string>(() => {
  return `请你猜一个数字, 我们会告诉你是大是小, 偷偷告诉你数字是 ${randomNum.value}`
})

const responsiveClass = computed<string>(() => {
  console.log(window.innerWidth < 600 ? 'mobile' : 'desktop')
  return window.innerWidth < 600 ? 'mobile' : 'desktop'
})

function checkNumber() {
  if (numberChoose.value === null || numberChoose.value.trim() === '') {
    showAlert('please input a number')
    return
  }

  const num = Number(numberChoose.value)
  if (isNaN(num)) {
    showAlert('please input a number')
    return
  }

  if (num > randomNum.value) {
    showAlert('too big', 'error')
  } else if (num < randomNum.value) {
    showAlert('too small', 'error')
  } else {
    winAttribute.value = true
    setTimeout(() => {
      winAttribute.value = false
      randomNum.value = Math.floor(Math.random() * 100)
    }, 2000)
  }

  numberChoose.value = null
}

function showAlert(message: string, type: 'error' | 'success' = 'error') {
  if (type === 'error') {
    showError.value = true
    /* setTimeout(() => {
      showError.value = false
    }, 2000) */
  } else {
    winAttribute.value = true
    setTimeout(() => {
      winAttribute.value = false
    }, 2000)
  }
}
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
