<template>
    <div>
        <Dialog v-model="isShow">
            <template v-slot:header>
                <div class="k-title">
                    <i class="ion-person"></i>
                    You Win
                </div>
            </template>
            <p style="font-size: large;">
            the correctNum is : {{ correctNum }}
            </p>
            <template v-slot:footer>
                <Button type="primary" @click="isShow = false">确认</Button>
            </template>
        </Dialog>
    </div>
</template>

<script setup lang='ts' name=''>
import { ref, defineProps, computed, watch } from 'vue'
import { Button, Dialog } from '@king-design/vue';

const props = defineProps({
    dioShow: {
        type: Boolean,
        default: false
    },
    correctNum: {
        type: Number,
        default: 0
    }
});

let isShow = ref(false)
watch(() => props.dioShow, (val:boolean) => {
    isShow.value = val // 同步props的show更新
})

</script>

<style scoped></style>