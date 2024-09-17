<template>
    <v-container class="info" fluid>
        <v-row justify="center" align="center">
            <v-col cols="12" md="5" class="d-flex justify-center align-center">
                <h1></h1>
                <v-banner class="my-4" color="deep-purple-accent-4" icon="mdi-lock" lines="one">
                    <v-banner-text>
                        {{ id }},你的分数是{{ exp }}
                    </v-banner-text>

                    <template v-slot:actions>
                        <v-btn @click="returnToHome()">确认</v-btn>
                    </template>
                </v-banner>
            </v-col>
        </v-row>
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
</script>