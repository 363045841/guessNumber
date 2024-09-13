<template>
    <h1>Number guessing game</h1>
    <p>We have selected a random number between 1 and 100.
        See if you can guess it in 10 turns or fewer.
        We'll tell you if your guess was too high or too low.</p>

    <p>Enter a guess: <input type="text" v-model="nowNum" style="height: 2.8em;"> &nbsp;
        <Button type="primary" @click="addNum(nowNum)" :style="submitButtonStyle">submit</Button>
    </p>
    <Slider class="submit-slider" v-model="submitButtonWidth" :min="10" :max="50" showTooltip :marks="{35:['按钮动画测试滑块']}"
        :tooltipProps="{ 'theme': 'light', 'size': 'small' }" />
    <Transition>
        <h2 id="wrong-alert" v-if="alertObj.show" :style="{ backgroundColor: alertObj['back-color'] }">
            {{ alertObj.text }}
        </h2>
    </Transition>
    <p>previous Num:
        <span v-for="(item, key) in prevoiusNum">
            {{ item }} &nbsp;
        </span>
    </p>
    <h2 v-if="isWin">You win: the num is {{ randomNum }}</h2>
    <p>[[test Num: {{ randomNum }}]]</p>
    <windio :dioShow="isWin" :correctNum="randomNum"></windio>
</template>

<script setup lang='ts' name=''>
import { ref, reactive, computed } from 'vue'
import { Button } from '@king-design/vue';
import { Slider } from '@king-design/vue';
import windio from './windio.vue';

let nowNum = ref<number | null>(null)
let prevoiusNum = reactive<number[]>([])
let randomNum: number = Math.floor(Math.random() * 100)
let isWin = ref(false)

let submitButtonWidth = ref<number>(10)
let submitButtonStyle = computed(() => ({
    height: '3em',
    width: `${submitButtonWidth.value}em` // 或者改为 'px'，取决于你的需求
}));

let alertObj = reactive({
    'show': false,
    'text': 'Wrong',
    'back-color': 'red'
})
function addNum(inputNum: any) {
    if (!isNaN(inputNum)) {
        prevoiusNum.push(inputNum)
        if (inputNum == randomNum) {
            isWin.value = true
            alertObj['back-color'] = 'green'
            alertObj.text = 'You win'
            alertObj.show = true
            setTimeout(() => {
                alert('再来一把!')
                isWin.value = false
                randomNum = Math.floor(Math.random() * 100)
                prevoiusNum = []
            }, 2000);
        }
    } else {
        alert('Please enter a number')
    }
    nowNum.value = null
    alertObj.show = true
    setTimeout(() => {
        alertObj.show = false
    }, (2000));
}
</script>
<style scoped>
#wrong-alert {
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: medium;
    height: 2em;
}

.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

p {
    font-size: large;
}

.submit-slider {
    width: 60em;
    margin-left: auto;
    margin-right: auto;
}
</style>