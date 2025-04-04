<template>
    <nav class="navbar">
      <router-link class="button" to="/login">Login</router-link>
      <router-link class="button" to="/register">Register</router-link>
    </nav>
  </template>

  <style scoped>
  .navbar {
    display: flex;
    gap: 1rem;
  }

  .button {
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    transition: background-color 0.3s ease;
  }
  </style>