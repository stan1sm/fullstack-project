<template>
    <div class="user-profile">
      <h1>Welcome, {{ user.name }}</h1>
      <p>Email: {{ user.email }}</p>
      <button @click="logout" class="logout-btn">Logout</button>
    </div>
  </template>

  <script setup lang="ts">
  import { computed } from 'vue';
  import { useUserStore } from '@/stores/user';

  const userStore = useUserStore();
  const user = computed(() => userStore.user);

  const logout = () => {
    userStore.logout();
  };
  </script>

  <style scoped>
  .user-profile {
    text-align: center;
    margin-top: 2rem;
  }

  .logout-btn {
    background-color: var(--secondary-color);
    color: white;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: var(--border-radius);
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .logout-btn:hover {
    background-color: #d9534f;
  }
  </style>