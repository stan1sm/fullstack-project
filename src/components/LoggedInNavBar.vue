<template>
    <nav class="navbar">
      <router-link class="button" to="/profile">{{ $t('navbar.myProfile') }}</router-link>
      <button class="button" @click="logout">{{ $t('navbar.logout') }}</button>
    </nav>
  </template>

  <script setup lang="ts">
  import { useUserStore } from '@/stores/user';
import axios from 'axios';
import { useI18n } from 'vue-i18n';

  const { t } = useI18n();
  const userStore = useUserStore();

  const logout = async () => {
  try {
    const token = localStorage.getItem('authToken');
    if (token) {
      await axios.post('http://localhost:8080/api/marketplace/logout', {}, {
        headers: { Authorization: `Bearer ${token}` }, // Add "Bearer" prefix
      });
    }
    userStore.logout();
    localStorage.removeItem('authToken'); // Clear token
    alert(t('logout.success'));
  } catch (error) {
    console.error('Logout failed:', error);
    alert(t('logout.error'));
  }
};
  </script>

  <style scoped>

  .button {
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    transition: background-color 0.3s ease;
  }

  .navbar {
    display: flex;
    gap: 1rem;
  }
  </style>