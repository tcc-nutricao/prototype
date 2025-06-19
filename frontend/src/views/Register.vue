<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="container w-3/12 p-6">
      <div class="w-full flex flex-col gap-4">
        <img class="w-[250px]" src="/src/assets/Logo.png" alt="Logo" />
        <Title fourxl label="Cadastre-se" />

        <InputText 
          class="w-full"
          label="Nome"
          placeholder="Insira o Nome"
          v-model="object.name"
          :error="errors.name"
          required 
        />
        <InputEmail
          class="w-full"
          label="Email"
          placeholder="Insira o Email"
          v-model="object.email"
          :error="errors.email"
          required 
        />
        <InputPassword 
          class="w-full"
          label="Senha"
          placeholder="Insira a Senha"
          v-model="object.password"
          :error="errors.password"
          required 
        />

        <p class="text-lg text-[#351F56] font-semibold text-center w-full">
          Selecione o tipo de usuário *
        </p>

        <div class="flex gap-3 w-full">
          <Button class="w-full" lightPurple outlined label="Padrão" />
          <Button class="w-full" lightPurple outlined label="Profissional" />
        </div>

        <Button class="w-full" mediumPurple label="Criar conta" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { insert } from '../../crud'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const route = ref('user')
const object= ref({
    name: '',
    email: '',
    password: ''
})
const errors = ref({
    name: null,
    email: null,
    password: null,
})

const save = async () => {
    const response = await insert(route.value, object)
    errors.value = response.error ? response.data : {}
    if (!response.error) {
        router.back()
    }
}
</script>
