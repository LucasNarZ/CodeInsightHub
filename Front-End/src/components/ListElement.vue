<script setup lang="ts">
    defineProps({
        name: String
    })
</script>


<template>
    <div>
        <button type="button" class="text-white bg-blue-700 cursor-default font-medium rounded-lg text-sm px-2 py-2.5 text-center inline-flex items-center" >
        {{ name }}
        <svg class="w-6 h-6 text-gray-800 dark:text-white cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" @click="$emit('delete-element', name)">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6"/>
        </svg>
        </button>
    </div>
    
    
</template>