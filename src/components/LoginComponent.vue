<template>
    <form @submit.prevent="handleLogin" class="login-form">
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          v-model="email"
          required
          placeholder="Enter your email"
        />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          v-model="password"
          required
          placeholder="Enter your password"
        />
      </div>
      <button type="submit" class="submit-btn">Login</button>
    </form>
  </template>

  <script setup lang="ts">
  import { ref } from 'vue';
  import axios from 'axios';
  import { useUserStore } from '@/stores/user';

  const email = ref('');
  const password = ref('');
  const userStore = useUserStore();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/marketplace/login', {
        email: email.value,
        password: password.value,
      });

      // Assuming the backend returns user details and a token
      const { user, token } = response.data;

      // Save the user details in the store
      userStore.login(user);

      // Optionally, save the token in localStorage or cookies
      localStorage.setItem('authToken', token);

      console.log('Login successful:', user);
      alert('Login successful!');
      // Redirect to the user profile or dashboard
      window.location.href = '/'; // Adjust the route as needed
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMsg = error.response?.data || 'Login failed. Please try again.';
        alert(errorMsg);
      } else {
        alert('An unexpected error occurred.');
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
  </style>