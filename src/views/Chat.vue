<script setup lang="ts">
import { onMounted } from 'vue';
import { createMessage, isBanned } from '../app/firebase';
import MessageView from '../components/MessageView.vue';

let input: any;

const focus = () => input.focus();

const click = () => { sendMessage(); focus(); }

const sendMessage = async () => {
    if (input.value !== '') {
        createMessage(new String(input.value).valueOf());
        input.value = '';
    }
};

onMounted(async () => {
    input = document.getElementById('input');

    focus();
});
</script>

<template>
    <div class="md:w-6/12 mx-auto message-container">
        <MessageView v-once></MessageView>

        <form class="w-full" @submit.prevent>
            <input id="input" type="text" placeholder="Press Enter" class="input md:input-ghost" autocomplete="off"
                :disabled="isBanned" maxlength="100" @keydown.enter="sendMessage()" />

            <button v-once class="btn btn-ghost float-right" @click="click">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-send-fill" viewBox="0 0 16 16">
                    <path
                        d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                </svg>
            </button>
        </form>
    </div>
</template>

<style scoped>
form {
    margin-top: 4%;
}

ul {
    height: 95%;
    /* Firefox */
    scrollbar-color: #6969dd #e0e0e0;
    scrollbar-width: thin;
}

/* Chrome */
ul::-webkit-scrollbar {
    width: 0.25rem;
}

ul::-webkit-scrollbar-track {
    background: #1e1e24;
}

ul::-webkit-scrollbar-thumb {
    background: #6649b8;
}

/* I swear this took so long to get the corrent class configurations for (css is hard) */
.message-container {
    height: 83%;
}

input {
    width: 92%;
}

@media (max-width: 1024px) {
    .message-container {
        width: 88%;
    }

    ul {
        height: 102%;
    }

    input {
        margin-left: 6px;
        width: 89%;
    }
}

@media (max-width: 768px) {
    ul {
        height: 95%;
    }

    input {
        margin-left: 6px;
        width: 79%;
    }
}
</style>