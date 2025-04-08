<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router'; // Import useRouter

const router = useRouter(); // Initialize router
const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const message = ref('');

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    message.value = 'Passwords do not match.'; // Hardcoded error message
    return;
  }
  try {
    const response = await axios.post('http://localhost:8080/api/auth/register', {
      username: name.value,
      email: email.value,
      password: password.value,
    });
    message.value = 'Registration successful, going to login.'; // Hardcoded success message
    console.log('Register attempt successful:', response.data);

    // Wait for 1 second before redirecting to the login page
    setTimeout(() => {
      router.push('/login');
    }, 1000);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMsg = error.response?.data || 'An error occurred during registration.';
      message.value = errorMsg; // Hardcoded default error message
    } else {
      message.value = 'An unexpected error occurred.'; // Hardcoded unexpected error message
    }
  }
};
</script>

<template>
  <form @submit.prevent="handleRegister" class="register-form">
    <div class="form-group">
      <label for="name">Full Name</label>
      <input type="text" id="name" v-model="name" required placeholder="Enter your full name" />
    </div>
    <div class="form-group">
      <label for="email">Email</label>
      <input type="email" id="email" v-model="email" required placeholder="Enter your email" />
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input type="password" id="password" v-model="password" required placeholder="Enter your password" />
    </div>
    <div class="form-group">
      <label for="confirmPassword">Confirm Password</label>
      <input type="password" id="confirmPassword" v-model="confirmPassword" required placeholder="Confirm your password" />
    </div>
    <p v-if="message" class="message">{{ message }}</p> <!-- Display message -->
    <button type="submit" class="submit-btn">Register</button>
  </form>
  <p class="login-link">
    Already have an account? <router-link to="/login">Login</router-link>
  </p>
</template>

<style scoped>
.register-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.message {
  color: green; /* Success message in green */
  font-size: 0.9rem;
  font-weight: bold;
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

.login-link {
  text-align: center;
  margin-top: 1.5rem;
  color: #666;
}

.login-link a {
  color: var(--secondary-color);
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>