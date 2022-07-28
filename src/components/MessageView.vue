<script setup lang="ts">
import { ref, onUpdated } from 'vue';
import { getMessagesStream, uid } from '../app/firebase';

import Message from './Message.vue';

const messages = getMessagesStream(),
    list = ref<HTMLUListElement | null>(null);

onUpdated(() => {
    list.value?.lastElementChild?.scrollIntoView({
        behavior: 'smooth'
    });
});
</script>

<template>
    <ul ref="list" class="w-full overflow-y-auto">
        <Message v-for="message in messages" :right="message.uid === uid" :url="message.photoURL">
            {{ message.text }}
        </Message>
    </ul>
</template>