<script setup lang="ts">
    import { ref } from "vue"
    import ListElement from './ListElement.vue'; 
    defineProps({
        name: String,
        placeholder: String
    })
    
    const list = ref<string[]>([]);
    const inputValue = ref<string>("");
    const input = ref<HTMLInputElement | null>(null);

    function addToList(){
        list.value.push(inputValue.value);
        inputValue.value = "";
        
    }
    function deleteElement(element:string){
        console.log(element);
    }
</script>

<template>
    <div class="w-full">
        <label :for="name" class="mb-2 text-lg-100 font-medium text-black">{{ name }}</label>
        <div class="relative">
            <input type="text" :id="name" class="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" :placeholder="placeholder" required v-model="inputValue" ref="input"/>
            <button type="button" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2" @click="addToList">Add</button>
        </div>
        <div class="flex flex-wrap" @delete-element="deleteElement">
            <ListElement v-for="(item, index) in list" :key="index" :name="item"/>
        </div>
        
    </div>
</template>