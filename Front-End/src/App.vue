<script setup lang="ts">
    //@ts-ignore
    import Input from "./components/Input.vue";
    import List from "./components/List.vue";
    import { FormKit } from "@formkit/vue";
	import axios from "axios";
    interface Credentials {
        apelido: String;
        nome: String;
        nascimento: String;
        stack?: String[];
    }
    let list:string[] = [];
    const inputClass =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-[400px]";
    const labelClass = "block mb-2 text-lg-100 font-medium text-black";

    async function register(credentials: Credentials) {
		credentials.stack = list;
        try{
			const res = await axios.post("https://localhost/api/pessoas", credentials);
			console.log(res.data);
		}catch(err){
			console.error(err);
		}
    }
    function getList(newList:string[]){
		list = newList;
    }

</script>

<template>
  <FormKit
    type="form"
    form-class="flex items-center flex-col"
    @submit="register"
    :submit-attrs="{
      label: 'Submit',
      inputClass:
        'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 mb-15 mt-10',
    }"
  >
    <div class="max-w-[400px] w-full flex flex-col items-center space-y-10">
      <h1 class="text-4xl mt-10">Dev Survey</h1>
      <FormKit
        name="apelido"
        type="text"
        id="apelido"
        :input-class="inputClass"
        placeholder="Lusqueta"
        label="apelido"
        :label-class="labelClass"
      />
      <FormKit
        name="nome"
        type="text"
        id="nome"
        :input-class="inputClass"
        placeholder="Lucas"
        label="nome"
        :label-class="labelClass"
      />
      <FormKit
        name="nascimento"
        type="text"
        id="nascimento"
        :input-class="inputClass"
        placeholder="2006-12-12"
        label="nascimento"
        :label-class="labelClass"
      />
      <List label="Stack" placeholder="Python" name="stack" @get-list="getList"/>
    </div>
  </FormKit>
</template>
