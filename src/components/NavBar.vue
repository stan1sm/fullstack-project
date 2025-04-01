<template>
    <header class="header">
      <nav class="main-nav">
        <router-link to="/" class="logo">{{ appTitle }}</router-link>
        <div class="nav-links">
          <router-link to="/">Home</router-link>
          <router-link to="/categories">Categories</router-link>
          <router-link to="/favorites">Favorites</router-link>
          <router-link to="/messages">Messages</router-link>
        </div>
        <div class="auth-links">
          <router-link v-if="!isAuthenticated" to="/login">Login</router-link>
          <router-link v-if="!isAuthenticated" to="/register">Register</router-link>
          <button v-else @click="logout">Logout</button>
        </div>
      </nav>
    </header>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '@/stores/auth'
  
  const router = useRouter()
  const authStore = useAuthStore()
  
  const appTitle = import.meta.env.VITE_APP_TITLE || 'Marketplace'
  const isAuthenticated = computed(() => authStore.isAuthenticated)
  
  const logout = async () => {
    await authStore.logout()
    router.push('/login')
  }
  </script>
  
  <style scoped>
  .header {
    background-color: var(--primary-color);
    padding: var(--spacing-unit);
    color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .main-nav {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .nav-links {
    display: flex;
    gap: calc(var(--spacing-unit) * 2);
  }
  
  .nav-links a,
  .auth-links a,
  .auth-links button {
    color: white;
    text-decoration: none;
    padding: calc(var(--spacing-unit) * 0.5) var(--spacing-unit);
    border-radius: var(--border-radius);
    transition: background-color 0.3s;
  }
  </style>