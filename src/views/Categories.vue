<template>
  <div class="categories">
    <h1>Categories</h1>
    <div class="categories-grid">
      <div v-for="category in categories" :key="category.id" class="category-card">
        <h2>{{ category.name }}</h2>
        <p>{{ category.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Category {
  id: number;
  name: string;
  description: string;
}

const categories: Category[] = [
  { id: 1, name: 'Electronics', description: 'Electronic devices and accessories' },
  { id: 2, name: 'Clothing', description: 'Fashion items and accessories' },
  { id: 3, name: 'Home & Garden', description: 'Items for home and garden' },
  { id: 4, name: 'Sports', description: 'Sports equipment and accessories' }
];
</script>

<style scoped>
.categories {
  padding: 2rem;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.category-card {
  background: white;
  padding: 1.5rem;
  border-radius: var(--border-radius);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.category-card:hover {
  transform: translateY(-5px);
}

h1 {
  color: var(--primary-color);
  margin-bottom: 1rem;
}

h2 {
  color: var(--secondary-color);
  margin-bottom: 0.5rem;
}
</style> 