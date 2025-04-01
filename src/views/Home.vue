<template>
  <div class="home">
    <section class="categories-section">
      <h2>Categories</h2>
      <div class="categories-grid">
        <div v-for="category in categories" :key="category.id" class="category-card">
          <router-link :to="{ name: 'Categories', params: { id: category.id }}">
            <img :src="category.image" :alt="category.name">
            <h3>{{ category.name }}</h3>
          </router-link>
        </div>
      </div>
    </section>

    <section class="recommended-section">
      <h2>Recommended for You</h2>
      <div class="items-grid">
        <div v-for="item in recommendedItems" :key="item.id" class="item-card">
          <router-link :to="{ name: 'ItemDetails', params: { id: item.id }}">
            <div class="item-image">
              <img :src="item.image" :alt="item.title">
            </div>
            <div class="item-info">
              <h3>{{ item.title }}</h3>
              <p class="price">{{ formatPrice(item.price) }}</p>
              <p class="location">{{ item.location }}</p>
            </div>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import axios from 'axios'

interface Category {
  id: number
  name: string
  image: string
}

interface Item {
  id: number
  title: string
  price: number
  location: string
  image: string
}

export default defineComponent({
  name: 'Home',
  setup() {
    const categories = ref<Category[]>([])
    const recommendedItems = ref<Item[]>([])

    const fetchCategories = async () => {
      try {
        // TODO: Replace with actual API endpoint
        const response = await axios.get('/api/categories')
        categories.value = response.data
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    const fetchRecommendedItems = async () => {
      try {
        // TODO: Replace with actual API endpoint
        const response = await axios.get('/api/items/recommended')
        recommendedItems.value = response.data
      } catch (error) {
        console.error('Error fetching recommended items:', error)
      }
    }

    const formatPrice = (price: number): string => {
      return new Intl.NumberFormat('no-NO', {
        style: 'currency',
        currency: 'NOK'
      }).format(price)
    }

    onMounted(() => {
      fetchCategories()
      fetchRecommendedItems()
    })

    return {
      categories,
      recommendedItems,
      formatPrice
    }
  }
})
</script>

<style>
.home {
  padding: 2rem 0;
}

.categories-section,
.recommended-section {
  margin-bottom: 3rem;
}

h2 {
  margin-bottom: 1.5rem;
  color: var(--primary-color);
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
}

.category-card {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.category-card:hover {
  transform: translateY(-4px);
}

.category-card img {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.category-card h3 {
  padding: 1rem;
  text-align: center;
  background-color: white;
}

.items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
}

.item-card {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: white;
  transition: transform 0.2s;
}

.item-card:hover {
  transform: translateY(-4px);
}

.item-image {
  height: 200px;
  overflow: hidden;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-info {
  padding: 1rem;
}

.item-info h3 {
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.price {
  color: var(--secondary-color);
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.location {
  color: #666;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .categories-grid,
  .items-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
  }

  .item-image {
    height: 150px;
  }
}
</style> 