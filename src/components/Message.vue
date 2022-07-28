<script setup lang="ts">
const { right, url } = defineProps(['right', 'url']);

const posIsRight = !!right;
</script>

<template>
    <li class="flex min-h-12 mt-3" :class="{
        'place-content-end': posIsRight
    }">
        <div class="avatar h-12" :class="{
            'order-last': posIsRight
        }">
            <img :src="url || 'https://placeimg.com/48/48/people'" class="rounded-full" referrerpolicy="no-referrer">
        </div>
        <div class="p-3 max-w-sm bg-white rounded-xl text-black ml-3 mr-3 break-words">
            <slot></slot>
        </div>
    </li>
</template>

<style scoped>
li.place-content-end {
    width: 99%;
    margin-right: 2px;
}
</style>
