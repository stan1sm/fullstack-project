<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const handleRedirect = () => {
  const token = localStorage.getItem('authToken'); // Check if the user is logged in
  if (token) {
    router.push('/createItem'); // Redirect to Create Item page
  } else {
    router.push('/login'); // Redirect to Login page
  }
};
</script>

<template>
  <div class="home">
    <!-- Use $t for the button text -->
    <button class="redirect-btn" @click="handleRedirect">{{ $t('userProfile.createItemButton') }}</button>
  </div>
</template>

<style scoped>
.home {
  position: relative;
  padding: 2rem;
}

.redirect-btn {
  position: absolute;
  top: 1rem;
  left: 1rem;
  padding: 0.5rem 1rem;
  background-color: var(--secondary-color);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.redirect-btn:hover {
  background-color: #3aa876;
}
</style>