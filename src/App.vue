<template>
  <v-app>
    <v-main id="main">
      <v-app-bar class="app-bar" app image="./assets/a4754a82ckef2a11a55447d8f48a81f7.jpg">
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <template v-slot:append>
          <v-btn icon="mdi-refresh"></v-btn>
          <v-btn icon="mdi-dots-vertical"></v-btn>
        </template>
        <v-toolbar-title>Guess Number</v-toolbar-title>
      </v-app-bar>

      <v-container class="guess-card">

        <v-card prepend-icon="mdi-counter" :subtitle="textRealNum" width="auto">
          <template v-slot:title>
            <span class="font-weight-black">猜数字</span>
          </template>
          <v-container>
            <v-row align="center">
              <v-col class="d-flex justify-center align-center">
                <v-text-field label="Enter a number you guess" hide-details="auto" v-model:model-value="numberChoose" />
              </v-col>
              <v-col cols="auto" class="d-flex justify-center align-center">
                <v-btn variant="tonal" :ripple="true" @click="checkNumber(numberChoose)" color="#3F51B5">提交</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-container>

      <v-container>
        <v-alert v-if="winAttribute" text="你答对了" title="Alert title" type="success">
        </v-alert>
        <v-alert v-if="showError" text="你答错了" title="Alert title" type="error">
        </v-alert>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
let numberChoose = ref<string | null>(null)
let randomNum = ref(Math.floor(Math.random() * 100))
let winAttribute = ref<boolean>(false)
let textRealNum = computed<string>(() => {
  return '请你猜一个数字,我们会告诉你是大是小,偷偷告诉你数字是' + randomNum.value
})
let showError = ref<boolean>(false)
function checkNumber(inputNum: (string | null)) {
  numberChoose.value = null
  console.log(inputNum)
  if (inputNum === '') {
    alert('please input a number')
  }
  const num = Number(inputNum)
  if (!Number.isNaN(num)) {
    if (num > randomNum.value) {
      alert('too big')
      showError.value = true
      setTimeout(() => {
        showError.value = false
      }, 2000);
    } else if (num < randomNum.value) {
      alert('too small')
      showError.value = true
      setTimeout(() => {
        showError.value = false
      }, 2000);
    } else {
      winAttribute.value = true
      setTimeout(() => {
        winAttribute.value = false
        randomNum.value = Math.floor(Math.random() * 100)
      }, 2000);
    }
  } else {
    alert('please input a number')
  }
}
</script>

<style scoped></style>