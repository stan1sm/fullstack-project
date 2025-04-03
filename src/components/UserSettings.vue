<template>
    <div class="user-settings">
      <h1>User Settings</h1>
      <form @submit.prevent="updateSettings">
        <div class="form-group">
          <label for="name">Name</label>
          <input
            type="text"
            id="name"
            v-model="name"
            placeholder="Enter your new name"
          />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder="Enter your new email"
          />
        </div>
        <div class="form-group">
          <label for="password">New Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Enter your new password"
          />
        </div>
        <div class="form-group">
          <label for="confirmPassword">Confirm New Password</label>
          <input
            type="password"
            id="confirmPassword"
            v-model="confirmPassword"
            placeholder="Confirm your new password"
          />
        </div>
        <button type="submit" class="submit-btn">Save Changes</button>
      </form>
    </div>
  </template>

  <script setup lang="ts">
  import { ref } from 'vue';
  import axios from 'axios';

  const name = ref('');
  const email = ref('');
  const password = ref('');
  const confirmPassword = ref('');

  const updateSettings = async () => {
    if (password.value !== confirmPassword.value) {
      alert('Passwords do not match');
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        alert('You are not logged in. Please log in again.');
        window.location.href = '/login';
        return;
      }

      const response = await axios.put(
        'http://localhost:8080/api/marketplace/user/settings',
        {
          name: name.value,
          email: email.value,
          password: password.value,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert('Settings updated successfully!');
      console.log('Updated settings:', response.data);
    } catch (error) {
      console.error('Failed to update settings:', error);
      alert('An error occurred while updating your settings. Please try again.');
    }
  };
  </script>

  <style scoped>
  .user-settings {
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
    background-color: #f9f9f9;
    border-radius: var(--border-radius);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  h1 {
    text-align: center;
    margin-bottom: 1.5rem;
  }

  .form-group {
    margin-bottom: 1rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
  }

  input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: var(--border-radius);
    font-size: 1rem;
  }

  .submit-btn {
    display: block;
    width: 100%;
    padding: 0.75rem;
    background-color: var(--secondary-color);
    color: white;
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