<script setup>
    defineProps({
        name: String,
        placeholder: String
    })
</script>


<template>
    <div class="w-full">
        <label :for="name" class="block mb-2 text-lg-100 font-medium text-black">{{ name }}</label>
        <input type="text" :id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block max-w-30 p-2.5 w-full" :placeholder="placeholder" required />
    </div>
</template>