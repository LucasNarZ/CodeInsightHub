<script setup>
    import Input from "./components/Input.vue";
    import List from "./components/List.vue";
</script>

<template>
    <form class="flex items-center flex-col">
        <div class="max-w-[400px] w-full flex flex-col items-center space-y-10">
            <h1 class="text-4xl mt-10">Dev Survey</h1>
            <Input name="Apelido" placeholder="Lusqueta" /> 
            <Input name="Nome" placeholder="Lucas" /> 
            <Input name="Data de Nascimento" placeholder="2003-12-12" /> 
            <List name="Stack" placeholder="Python" />
            <input type="submit" value="Submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 mb-15"/>
        </div>
        
    </form>
       

</template>