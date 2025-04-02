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
          <LoggedInNavBar v-if="isLoggedIn" />
          <LoggedOutNavBar v-else />
        </div>
      </nav>
    </header>
  </template>

  <script setup lang="ts">
  import { computed, onMounted } from 'vue';
  import { useUserStore } from '@/stores/user';
  import axios from 'axios';
  import LoggedInNavBar from './LoggedInNavBar.vue';
  import LoggedOutNavBar from './LoggedOutNavBar.vue';

  const userStore = useUserStore();
  const isLoggedIn = computed(() => userStore.isLoggedIn);

  onMounted(async () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const response = await axios.get('http://localhost:8080/api/marketplace/isLoggedIn', {
          headers: { Authorization: token },
        });
        if (response.data) {
          userStore.login({ name: 'User', email: 'user@example.com' }); // Replace with actual user data if needed
        }
      } catch {
        userStore.logout();
      }
    }
  });
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