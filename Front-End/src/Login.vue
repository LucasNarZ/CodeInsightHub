<script setup lang="ts">
    //@ts-ignore
    import Input from "./components/Input.vue";
    import { FormKit } from "@formkit/vue";
	import axios from "axios";
    interface Credentials {
        email:String;
        password:String;
    }
    const inputClass =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-[400px]";
    const labelClass = "block mb-2 text-lg-100 font-medium text-black";

    async function login(credentials: Credentials) {
        try{
			let res;
			if(import.meta.env.VITE_ENV == "production"){
				res = await axios.post("http://" + import.meta.env.VITE_PUBLIC_IP + "/api/login", credentials);
			}else{
				res = await axios.post("http://localhost/api/login", credentials);
			}
			
			console.log(res?.data);
		}catch(err){
			console.error(err);
		}
    }

</script>

<template>
  <FormKit
    type="form"
    form-class="flex items-center flex-col"
    @submit="login"
    :submit-attrs="{
      label: 'Submit',
      inputClass:
        'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 mb-15 mt-10',
    }"
  >
    <div class="max-w-[400px] w-full flex flex-col items-center space-y-10">
      <h1 class="text-4xl mt-10">login</h1>
      <FormKit
        name="email"
        type="email"
        id="email"
        :input-class="inputClass"
        placeholder="exemple@exemple.com"
        label="email"
        :label-class="labelClass"
      />
      <FormKit
        name="password"
        type="password"
        id="password"
        :input-class="inputClass"
        placeholder=""
        label="password"
        :label-class="labelClass"
      />
      
    </div>
    <p>Not registered?<RouterLink to="/register" class="text-blue-300">Register</RouterLink></p>
    <p>Add your data: <RouterLink to="/survey" class="text-blue-300">Survey</RouterLink></p>
  </FormKit>
</template>
