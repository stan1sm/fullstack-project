<template>
  <form @submit.prevent="handleLogin" class="login-form">
    <div class="form-group">
      <label for="email">{{ $t('loginForm.emailLabel') }}</label>
      <input
        type="email"
        id="email"
        v-model="email"
        required
        :placeholder="$t('loginForm.emailPlaceholder')"
      />
    </div>
    <div class="form-group">
      <label for="password">{{ $t('loginForm.passwordLabel') }}</label>
      <input
        type="password"
        id="password"
        v-model="password"
        required
        :placeholder="$t('loginForm.passwordPlaceholder')"
      />
    </div>
    <!-- Error message -->
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    <button type="submit" class="submit-btn">{{ $t('loginForm.loginButton') }}</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { useUserStore } from '@/stores/user';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const email = ref('');
const password = ref('');
const errorMessage = ref(''); // Reactive variable for error message
const userStore = useUserStore();

const handleLogin = async () => {
errorMessage.value = ''; // Clear previous error message
try {
  const response = await axios.post('http://localhost:8080/api/auth/login', {
    email: email.value,
    password: password.value,
  });

  const { user, token } = response.data;

  userStore.login(user);

  localStorage.setItem('authToken', token);

  console.log('Login successful:', user);
  console.log('Stored token:', localStorage.getItem('authToken'));
  window.location.href = '/';
} catch (error) {
  if (axios.isAxiosError(error)) {
    errorMessage.value = error.response?.data || t('loginForm.errorDefault');
  } else {
    errorMessage.value = t('loginForm.errorUnexpected');
  }
}
};
</script>

<style scoped>
.login-form {
display: flex;
flex-direction: column;
gap: 1.5rem;
}

.form-group {
display: flex;
flex-direction: column;
gap: 0.5rem;
}

label {
color: var(--primary-color);
font-weight: bold;
}

input {
padding: 0.75rem;
border: 1px solid #ddd;
border-radius: var(--border-radius);
font-size: 1rem;
}

.submit-btn {
background-color: var(--secondary-color);
color: white;
padding: 0.75rem;
border: none;
border-radius: var(--border-radius);
font-size: 1rem;
cursor: pointer;
transition: background-color 0.2s;
}

.submit-btn:hover {
background-color: #3aa876;
}

/* Error message styling */
.error-message {
color: red;
font-size: 0.9rem;
font-weight: bold;
}
</style>