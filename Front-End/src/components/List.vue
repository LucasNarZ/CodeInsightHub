<script setup lang="ts">
    import { ref, watch, defineEmits, toRaw } from "vue";
    import ListElement from "./ListElement.vue";
    defineProps({
        label: String,
        placeholder: String,
    });
    const emit = defineEmits({
      getList:null
    })
    let list = ref<string[]>([]);
    const inputValue = ref<string>("");
    const input = ref<HTMLInputElement | null>(null);

    function addToList() {
		if(inputValue.value != ""){
			list.value.push(inputValue.value);
		}
        inputValue.value = "";
    }

	function deleteFromList(data:string){
		list.value = list.value.filter(n => n != data)
	}

    watch(list, (newList) => {
		emit("getList", toRaw(newList));
    }, { deep:true })
</script>

<template>
  <div class="w-full">
    <label :for="label" class="mb-2 text-lg-100 font-medium text-black">{{ label }}</label>
    <div class="relative">
      <input
        type="text"
        :id="label"
        class="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
        :placeholder="placeholder"
        v-model="inputValue"
        ref="input"
      />
      <button
        type="button"
        class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
        @click="addToList"
      >
        Add
      </button>
    </div>
    <div class="flex flex-wrap">
      <ListElement
        v-for="(item, index) in list"
        :key="index"
        :name="item"
        @delete-element="deleteFromList"
      />
    </div>
  </div>
</template>
