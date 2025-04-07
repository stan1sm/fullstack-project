<script setup lang="ts">
import { ref } from '@vue/reactivity';
import { onMounted } from '@vue/runtime-core';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const items = ref([]);

const fetchItems = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/marketplace/items'); // Replace with your API endpoint
    items.value = response.data; // Store the fetched items
  } catch (error) {
    console.error('Error fetching items:', error);
    alert('Failed to load items. Please try again later.');
  }
};

const handleRedirect = () => {
  const token = localStorage.getItem('authToken'); // Check if the user is logged in
  if (token) {
    router.push('/createItem'); // Redirect to Create Item page
  } else {
    router.push('/login'); // Redirect to Login page
  }
};

onMounted(() => {
  fetchItems();
});
</script>

<template>
  <div class="home">
    <!-- Redirect Button -->
    <button class="redirect-btn" @click="handleRedirect">{{ $t('userProfile.createItemButton') }}</button>

    <!-- Items List -->
    <div class="items-list">
      <div v-for="item in items" :key="item.id" class="item-card">
        <img :src="item.imageUrl || 'default-image-url.jpg'" alt="Item Image" class="item-image" />
        <h3>{{ item.title }}</h3>
        <p>{{ item.description || 'No description available' }}</p>
        <p>${{ item.price }}</p>
      </div>
    </div>
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