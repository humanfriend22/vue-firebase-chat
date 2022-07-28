<script setup lang="ts">
import { isLoggedIn } from './app/firebase';

import Navbar from './components/Navbar.vue';

import Login from './views/Login.vue';
import Chat from './views/Chat.vue';
</script>

<template>
    <div class="h-screen">
        <Navbar></Navbar>
        <Login v-if="!isLoggedIn" role="main"></Login>
        <Chat v-else-if="isLoggedIn" role="main"></Chat>
    </div>
</template>