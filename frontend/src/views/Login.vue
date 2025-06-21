<template>
  <div class="font-sora flex items-center justify-center min-h-screen bg-gradient-to-br from-p-500 via-p-600 to-p-700">
    <div class="w-full max-w-xl p-12 md:p-[70px] md:pt-[45px] bg-gradient-to-br from-white to-p-200 rounded-[40px] shadow-custom">
      <div class="flex justify-center items-center gap-3 mb-5 max-h-24 pr-6">
        <span class="font-bold text-9xl text-transparent bg-clip-text bg-gradient-to-br from-p-200 via-p-600 to-p-900 drop-shadow-lg">+</span>
        <span class="font-extrabold text-6xl text-p-950 drop-shadow-lg">Logo</span>
      </div>
      <h1 class="text-3xl text-p-950 font-bold text-left mb-5">Faça seu login</h1>
      <p class="text-p-950 text-left mb-6">
        Ainda não tem conta? <a href="/register" class="text-p-600 hover:underline">Crie uma aqui.</a>
      </p>
      <form @submit.prevent="handleLogin" novalidate>
        <div class="form-group">
          <label for="email" class="form-label">E-mail</label>
          <input type="email" id="email" v-model="credentials.email" @input="errors.email = null" placeholder="Digite seu e-mail" :class="['form-input', { 'border-danger': errors.email }]" />
          <div v-if="errors.email" class="error-message">{{ errors.email }}</div>
        </div>
        <div class="form-group">
          <label for="password" class="form-label">Senha</label>
          <div class="relative">
            <input 
              :type="isPasswordVisible ? 'text' : 'password'"
              id="password" 
              v-model="credentials.password"
              placeholder="Digite aqui" 
              :class="['form-input pr-12', { 'border-danger': errors.password }]"
            />
            <button type="button" @click="togglePasswordVisibility" class="absolute inset-y-0 right-0 flex items-center pr-4 text-p-800 hover:text-p-950">
              <svg v-if="!isPasswordVisible" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.243 4.243L6.228 6.228" />
              </svg>
            </button>
          </div>
          <div v-if="errors.password" class="error-message">{{ errors.password }}</div>
        </div>
        <button type="submit" id="login-btn" :class="['w-full mt-5 p-4 text-lg', isFormValid ? 'btn-primary' : 'btn-disabled']">Login</button>
      </form>
    </div>
    <div v-if="showIncorrectModal" class="modal-overlay">
        <div class="modal-content">
            <p>E-mail ou senha incorretos.</p>
            <div class="modal-actions">
                <button @click="showIncorrectModal = false" class="btn-primary w-full">OK</button>
            </div>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
// import { login } from '../../crud'; // Você precisará criar ou importar esta função

// --- SIMULAÇÃO DA API DE LOGIN ---
async function login(credentials: any) {
    console.log(`[API MOCK] Tentando login com:`, credentials);
    if (credentials.email === "usuario@email.com" && credentials.password === "Senha123") {
        return { error: false, data: { token: "um_token_jwt_real_viria_aqui" } };
    }
    return { error: true, data: { message: "Invalid Credentials" } };
}
// --- FIM DA SIMULAÇÃO ---

const router = useRouter();

const credentials = reactive({
  email: '',
  password: '',
});

const errors = ref({
  email: null as string | null,
  password: null as string | null,
});

const showIncorrectModal = ref(false);

const isFormValid = computed(() => {
    return credentials.email.trim() !== '' && credentials.password.trim() !== '';
});

const isPasswordVisible = ref(false);

// Adicione esta função em qualquer lugar dentro do <script setup>
const togglePasswordVisibility = () => {
    isPasswordVisible.value = !isPasswordVisible.value;
};

const handleLogin = async () => {
    // Validação de frontend para campos vazios
    errors.value.email = credentials.email.trim() ? null : 'Campo obrigatório';
    errors.value.password = credentials.password.trim() ? null : 'Campo obrigatório';

    if (isFormValid.value) {
        const response = await login(credentials);

        if (response.error) {
            showIncorrectModal.value = true;
            credentials.password = ''; // Limpa a senha em caso de erro
        } else {
            // Sucesso! O backend retornaria um token.
            // Aqui você salvaria o token (ex: em uma store Pinia ou cookie)
            // localStorage.setItem('authToken', response.data.token);
            router.push('/pagina-inicial');
        }
    }
};
</script>

<style scoped>
/* Estilos reutilizados */
.form-group { @apply mb-5 text-left; }
.form-label { @apply block text-base font-semibold mb-2 text-p-950; }
.form-input { @apply w-full p-3 border-2 border-gray-200 rounded-borda text-sm transition-colors duration-300 focus:outline-none focus:border-p-600; }
.error-message { @apply text-danger text-xs font-semibold mt-1.5 pl-1 min-h-[1.2em]; }

.btn-primary { @apply p-3 rounded-borda border-2 border-transparent bg-p-600 text-white font-semibold cursor-pointer transition-all duration-300 hover:bg-p-700 hover:border-p-400 hover:shadow-btn-hover active:bg-p-900 active:scale-95; }
.btn-disabled { @apply w-full p-3 rounded-borda border-2 border-transparent bg-gray-medium text-white font-semibold cursor-default hover:bg-gray-dark transition-colors duration-300; }

.modal-overlay { @apply fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity; }
.modal-content { @apply bg-white p-8 rounded-borda text-center max-w-sm transform scale-100 transition-transform; }
.modal-actions { @apply flex justify-center gap-4 mt-6; }
</style>