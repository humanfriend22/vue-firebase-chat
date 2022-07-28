<script setup lang="ts">
import { logout, isLoggedIn } from '../app/firebase';
</script>

<template>
    <div class="navbar bg-base-100" role="navigation">
        <div class="flex-1">
            <a class="btn btn-ghost normal-case text-xl" href="https://github.com/humanfriend22/vue-firebase-chat">
                <img width="90" height="100" src="https://miro.medium.com/max/750/1*0edpV8xTi4ZpkrYVnSoQQQ.png"
                    class="lg:logo">
                <div class="hidden lg:block">Vue Firebase Chat</div>
            </a>

        </div>
        <div class="flex-none gap-2" v-if="isLoggedIn">
            <button class="btn btn-lg btn-ghost" style="min-height: 2rem; height: 3rem" @click="logout">Logout</button>
        </div>



    </div>
</template>

<style scoped>
.logo {
    margin-right: 10px;
}
</style>