<template>
  <div class="app">
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

    <main class="main-content">
      <router-view></router-view>
    </main>

    <footer class="footer">
      <p>&copy; {{ currentYear }} {{ appTitle }}. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const appTitle = import.meta.env.VITE_APP_TITLE || 'Marketplace'
const currentYear = new Date().getFullYear()
const isAuthenticated = computed(() => authStore.isAuthenticated)

const logout = async () => {
  await authStore.logout()
  router.push('/login')
}
</script>

<style>
:root {
  --primary-color: #2c3e50;
  --secondary-color: #42b983;
  --background-color: #f5f5f5;
  --text-color: #333;
  --border-radius: 4px;
  --spacing-unit: 1rem;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: var(--text-color);
  background-color: var(--background-color);
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

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

.nav-links a:hover,
.auth-links a:hover,
.auth-links button:hover {
  background-color: var(--secondary-color);
}

.auth-links button {
  background: none;
  border: 1px solid white;
  cursor: pointer;
  font-size: 1rem;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
}

.main-content {
  flex: 1;
  padding: calc(var(--spacing-unit) * 2);
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.footer {
  background-color: var(--primary-color);
  color: white;
  padding: var(--spacing-unit);
  text-align: center;
  margin-top: auto;
}

@media (max-width: 768px) {
  .main-nav {
    flex-direction: column;
    gap: var(--spacing-unit);
  }

  .nav-links {
    flex-direction: column;
    gap: calc(var(--spacing-unit) * 0.5);
    width: 100%;
  }

  .nav-links a {
    text-align: center;
  }

  .auth-links {
    display: flex;
    gap: var(--spacing-unit);
    justify-content: center;
    width: 100%;
  }
}
</style>
