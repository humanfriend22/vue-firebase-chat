<script setup lang="ts">
import { loginWithGoogle } from '../app/firebase';
</script>

<template>
    <div class="w-full text-center mt-20">
        <button class="btn btn-primary" @click="loginWithGoogle">Login With Google</button>
    </div>
</template>