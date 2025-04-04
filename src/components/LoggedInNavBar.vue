<template>
    <nav class="navbar">
      <router-link class="button" to="/profile">My Profile</router-link>
      <button class="button" @click="logout">Logout</button>
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