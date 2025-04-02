<template>
    <nav class="navbar">
      <router-link to="/profile">My Profile</router-link>
      <button @click="logout">Logout</button>
    </nav>
  </template>

  <script setup lang="ts">
  import { useUserStore } from '@/stores/user';
import axios from 'axios';

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
    alert('You have been logged out.');
  } catch (error) {
    console.error('Logout failed:', error);
    alert('An error occurred while logging out.');
  }
};
  </script>

  <style scoped>
  .navbar {
    display: flex;
    gap: 1rem;
  }
  </style>