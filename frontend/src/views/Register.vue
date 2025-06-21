<template>
  <div class="font-sora flex items-center justify-center min-h-screen bg-gradient-to-br from-p-500 via-p-600 to-p-700">
    <div class="w-full max-w-xl p-12 md:p-[70px] md:pt-[45px] bg-gradient-to-br from-white to-p-200 rounded-[40px] shadow-custom ptop-8">
      <div class="flex justify-center items-center gap-3 mb-6 max-h-24 pr-6">
        <span class="font-bold text-9xl text-transparent bg-clip-text bg-gradient-to-br from-p-200 via-p-600 to-p-900 drop-shadow-lg">+</span>
        <span class="font-extrabold text-6xl text-p-950 drop-shadow-lg">Logo</span>
      </div>
      <h1 class="text-3xl text-p-950 font-bold text-left mb-5">Cadastre-se</h1>
      <p class="text-p-950 text-left mb-6">
        Já possui uma conta? <a href="/" class="text-p-600 hover:underline">Faça login aqui.</a>
      </p>
      <form @submit.prevent="save" novalidate>
        <div class="form-group">
          <label for="name" class="form-label">Nome</label>
          <input type="text" id="name" v-model="object.name" @blur="validateName" placeholder="Digite aqui" :class="['form-input', { 'border-danger': errors.name }]" />
          <div v-if="errors.name" class="error-message">{{ errors.name }}</div>
        </div>

        <div class="form-group">
          <label for="email" class="form-label">E-mail</label>
          <input type="email" id="email" v-model="object.email" @blur="validateEmail" @input="validateEmail" placeholder="Digite aqui" :class="['form-input', { 'border-danger': errors.email }]" />
          <div v-if="errors.email" class="error-message">{{ errors.email }}</div>
        </div>

        <div class="form-group">
            <label for="password" class="form-label">Senha</label>
            <div class="relative">
                <input 
                :type="isPasswordVisible ? 'text' : 'password'"
                id="password" 
                v-model="object.password"
                @focus="isPasswordFocused = true"
                @blur="handlePasswordBlur"
                @input="validatePasswordRealtime"
                placeholder="Digite aqui" 
                :class="['form-input pr-12', { 'border-danger': errors.password }]"
                />
                <button type="button" @click="togglePasswordVisibility" class="absolute inset-y-0 right-0 flex items-center pr-4 text-p-700 hover:text-p-500 transition-colors">
                <svg v-if="!isPasswordVisible" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.243 4.243L6.228 6.228" />
                </svg>
                </button>
            </div>
            <div v-if="errors.password" class="error-message">{{ errors.password }}</div>
            <div v-show="isPasswordFocused || (object.password != '' && !passwordValidation.isValid)" class="mt-1.5">
                <p :class="['password-req']">Sua senha deve conter no mínimo:</p>
                <p :class="['password-req', { 'color-success': passwordValidation.isLengthOk, 'color-danger': !passwordValidation.isLengthOk}]">8 caracteres</p>
                <p :class="['password-req', { 'color-success': passwordValidation.hasUppercase, 'color-danger': !passwordValidation.hasUppercase}]">1 letra maiúscula e 1 minúscula</p>
            </div>
            </div>

        <div class="mb-2">
            <p id="selecione-tipo" :class="['text-center text-m font-regular text-p-950', { 'invalid': showUserTypeError }]">Selecione o tipo de usuário:</p>
            <div class="flex gap-4 mt-3">
                <button type="button" @click="selectUserType('padrao')" :class="['btn-secondary', { 'active': object.role === 'padrao' }]">Padrão</button>
                <button type="button" @click="handleProfessionalClick" :class="['btn-secondary', { 'active': object.role === 'profissional' }]">Profissional</button>
            </div>
        </div>

        <button type="submit" :class="['w-full mt-5 p-4 text-lg', isFormValid ? 'btn-primary' : 'btn-disabled']">Criar conta</button>
      </form>
    </div>

    <div v-if="isConfirmationModalVisible" class="modal-overlay">
        <div class="modal-content">
            <p class="text-lg">O perfil profissional é destinado apenas a nutricionistas e profissionais da saúde.</p>
            <div class="modal-actions">
                <button @click="isConfirmationModalVisible = false" class="btn-secondary w-1/2">Voltar</button>
                <button @click="confirmProfessional" class="btn-primary w-1/2">OK</button>
            </div>
        </div>
    </div>
    
    <div v-if="isSuccessModalVisible" class="modal-overlay">
        <div class="modal-content">
            <p>Conta criada com sucesso!</p>
            <div class="modal-actions">
                <button @click="goToLogin" class="btn-primary w-full">OK</button>
            </div>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

async function insert(route: string, data: any) {
    console.log(`[API MOCK] Chamando insert em '${route}' com:`, data);
    if (data.email === 'existente@email.com') {
        return {
            error: true,
            data: { email: 'Este e-mail já está cadastrado no sistema.' }
        };
    }
    return { error: false, data: {} };
}

const router = useRouter()

const route = ref('user')
const object = ref({
    name: '',
    email: '',
    password: '',
    role: null as 'padrao' | 'profissional' | null,
})
const errors = ref({
    name: null as string | null,
    email: null as string | null,
    password: null as string | null,
    role: null as string | null,
})

const isPasswordFocused = ref(false)
const isConfirmationModalVisible = ref(false)
const isSuccessModalVisible = ref(false)
const showUserTypeError = ref(false)

const passwordValidation = computed(() => {
  const pass = object.value.password || '';
  const isLengthOk = pass.length >= 8;
  const hasUppercase = /[A-Z]/.test(pass) && /[a-z]/.test(pass);
  return { isLengthOk, hasUppercase, isValid: isLengthOk && hasUppercase };
});

const isFormValid = computed(() => {
    return object.value.name.trim() !== '' &&
           /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(object.value.email) &&
           passwordValidation.value.isValid &&
           object.value.role !== null;
});

const isPasswordVisible = ref(false);

const togglePasswordVisibility = () => {
    isPasswordVisible.value = !isPasswordVisible.value;
};

const validateName = () => { errors.value.name = object.value.name.trim() ? null : 'Campo obrigatório'; }
const validateEmail = () => { 
    if (!object.value.email) errors.value.email = 'Campo obrigatório';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(object.value.email)) errors.value.email = 'Formato de e-mail inválido';
    else if (object.value.email.trim() == null) errors.value.email = 'Campo obrigatório';
    else errors.value.email = null;
};
const validatePasswordRealtime = () => { if (passwordValidation.value.isValid) errors.value.password = null; };
const handlePasswordBlur = () => {
    isPasswordFocused.value = false;
    if (!object.value.password) errors.value.password = 'Campo obrigatório';
    // else if (!passwordValidation.value.isValid) errors.value.password = 'Senha inválida';
    else errors.value.password = null;
};

const selectUserType = (type: 'padrao' | 'profissional') => {
    object.value.role = type;
    showUserTypeError.value = false;
};
const handleProfessionalClick = () => { isConfirmationModalVisible.value = true; };
const confirmProfessional = () => {
    selectUserType('profissional');
    isConfirmationModalVisible.value = false;
};
const goToLogin = () => { router.push('/'); };

const save = async () => {
    validateName();
    validateEmail();
    handlePasswordBlur();
    showUserTypeError.value = object.value.role === null;

    if (isFormValid.value) {
        const response = await insert(route.value, object.value);
        

        if (!response.error) {
            isSuccessModalVisible.value = true;
        } else {
            console.error("Erro do backend:", response.data);
        }
    }
}
</script>

<style scoped>


.form-group { @apply mb-5 text-left; }
.form-label { @apply block text-base font-semibold mb-2 text-p-950; }
.form-input { @apply w-full p-3 border-2 border-gray-200 rounded-borda text-sm transition-colors duration-300 focus:outline-none focus:border-p-600; }
.error-message { @apply text-danger text-xs font-semibold mt-1.5 pl-1 min-h-[1.2em]; }
.password-req { @apply text-gray-dark text-xs mt-1 transition-colors; }

.modal-overlay { @apply fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300; }
.modal-content { @apply bg-white p-8 rounded-borda text-center max-w-sm transform scale-100 transition-transform duration-300; }
.modal-actions { @apply flex justify-center gap-4 mt-6; }

.color-success { @apply text-success; }
.color-danger { @apply text-danger; }

#selecione-tipo.invalid { @apply text-danger underline decoration-2; }
</style>