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
        <input type="password" id="password" v-model="password" required placeholder="Create a password" />
      </div>
      <div class="form-group">
        <label for="confirmPassword">Confirm Password</label>
        <input type="password" id="confirmPassword" v-model="confirmPassword" required placeholder="Confirm your password" />
      </div>
      <button type="submit" class="submit-btn">Register</button>
    </form>
    <p class="login-link">
      Already have an account? <router-link to="/login">Login</router-link>
    </p>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  
  const name = ref('')
  const email = ref('')
  const password = ref('')
  const confirmPassword = ref('')
  
  const handleRegister = async () => {
    if (password.value !== confirmPassword.value) {
      alert('Passwords do not match')
      return
    }
    // TODO: Implement registration logic
    console.log('Register attempt:', {
      name: name.value,
      email: email.value,
      password: password.value
    })
  }
  </script>
  
  <style scoped>
  .register-form {
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