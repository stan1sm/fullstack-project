<template>
  <div class="item-details">
    <div v-if="item" class="item-container">
      <div class="item-header">
        <h1>{{ item.name }}</h1>
        <p class="price">${{ item.price }}</p>
      </div>
      
      <div class="item-content">
        <div class="item-image">
          <img :src="item.imageUrl" :alt="item.name">
        </div>
        
        <div class="item-info">
          <p class="description">{{ item.description }}</p>
          
          <div class="seller-info">
            <h3>Seller Information</h3>
            <p>Name: {{ item.sellerName }}</p>
            <p>Rating: {{ item.sellerRating }}/5</p>
          </div>
          
          <div class="actions">
            <button class="contact-btn">Contact Seller</button>
            <button class="favorite-btn">Add to Favorites</button>
          </div>
        </div>
      </div>
    </div>
    
    <div v-else class="loading">
      <p>Loading item details...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const item = ref<Item | null>(null)

interface Item {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  sellerName: string;
  sellerRating: number;
}

onMounted(async () => {
  // TODO: Fetch item details from API
  // For now, using mock data
  item.value = {
    id: Number(route.params.id),
    name: 'Sample Item',
    price: 99.99,
    description: 'This is a sample item description. It contains detailed information about the product.',
    imageUrl: 'https://via.placeholder.com/400',
    sellerName: 'John Doe',
    sellerRating: 4.5
  }
})
</script>

<style scoped>
.item-details {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.item-container {
  background: white;
  border-radius: var(--border-radius);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.item-header {
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h1 {
  color: var(--primary-color);
  margin: 0;
}

.price {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--secondary-color);
  margin: 0;
}

.item-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 2rem;
}

.item-image img {
  width: 100%;
  height: auto;
  border-radius: var(--border-radius);
}

.item-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.description {
  color: #666;
  line-height: 1.6;
}

.seller-info {
  padding: 1rem;
  background: #f8f9fa;
  border-radius: var(--border-radius);
}

.seller-info h3 {
  color: var(--primary-color);
  margin-bottom: 0.5rem;
}

.actions {
  display: flex;
  gap: 1rem;
}

.contact-btn,
.favorite-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: var(--border-radius);
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.contact-btn {
  background-color: var(--secondary-color);
  color: white;
}

.favorite-btn {
  background-color: #f8f9fa;
  color: var(--primary-color);
  border: 1px solid #ddd;
}

.contact-btn:hover {
  background-color: #3aa876;
}

.favorite-btn:hover {
  background-color: #e9ecef;
}

.loading {
  text-align: center;
  padding: 3rem;
  color: #666;
}
</style> 