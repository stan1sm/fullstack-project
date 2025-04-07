<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

// Define interfaces for items and categories
interface Item {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl?: string;
}

interface Category {
  id: number;
  name: string;
}

const items = ref<Item[]>([]); // Reactive array to store items
const categories = ref<Category[]>([]); // Reactive array to store categories
const newCategoryName = ref(''); // Reactive variable for the new category name
const isLoading = ref(false); // Loading state for API calls
const errorMessage = ref(''); // Error message for API failures

// Fetch all items for the admin panel
const fetchItems = async (): Promise<void> => {
  isLoading.value = true;
  try {
    const response = await axios.get<Item[]>('http://localhost:8080/api/marketplace/items');
    items.value = response.data;
  } catch (error) {
    console.error('Error fetching items:', error);
    errorMessage.value = 'Failed to load items. Please try again later.';
  } finally {
    isLoading.value = false;
  }
};

// Fetch all categories
const fetchCategories = async (): Promise<void> => {
  try {
    const response = await axios.get<Category[]>('http://localhost:8080/api/marketplace/categories');
    categories.value = response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    alert('Failed to load categories. Please try again later.');
  }
};

// Create a new category
const createCategory = async (): Promise<void> => {
  if (!newCategoryName.value.trim()) {
    alert('Category name cannot be empty.');
    return;
  }

  try {
    const response = await axios.put<Category>('http://localhost:8080/api/marketplace/categories', {
      name: newCategoryName.value,
    });
    categories.value.push(response.data); // Add the new category to the list
    newCategoryName.value = ''; // Clear the input field
    alert('Category created successfully.');
  } catch (error) {
    console.error('Error creating category:', error);
    alert('Failed to create category. Please try again.');
  }
};

// Delete an item
const deleteItem = async (id: number): Promise<void> => {
  try {
    await axios.delete(`http://localhost:8080/api/marketplace/items/${id}`);
    items.value = items.value.filter((item) => item.id !== id); // Remove the deleted item from the list
    alert('Item deleted successfully.');
  } catch (error) {
    console.error('Error deleting item:', error);
    alert('Failed to delete the item. Please try again.');
  }
};

// Fetch items and categories when the component is mounted
onMounted(() => {
  fetchItems();
  fetchCategories();
});
</script>

<template>
  <div class="admin-panel">
    <h2>Admin Panel</h2>

    <!-- Error Message -->
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

    <!-- Loading State -->
    <p v-if="isLoading">Loading items...</p>

    <!-- Items Table -->
    <table v-if="!isLoading && items.length > 0" class="items-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Description</th>
          <th>Price</th>
          <th>Image</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.title }}</td>
          <td>{{ item.description || 'No description available' }}</td>
          <td>${{ item.price }}</td>
          <td>
            <img :src="item.imageUrl || 'default-image-url.jpg'" alt="Item Image" class="item-image" />
          </td>
          <td>
            <button @click="deleteItem(item.id)" class="delete-btn">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- No Items Message -->
    <p v-if="!isLoading && items.length === 0">No items available.</p>

    <!-- Categories Section -->
    <div class="categories-section">
      <h3>Categories</h3>

      <!-- Create Category Form -->
      <form @submit.prevent="createCategory" class="create-category-form">
        <input
          type="text"
          v-model="newCategoryName"
          placeholder="Enter category name"
          class="category-input"
        />
        <button type="submit" class="create-category-btn">Create Category</button>
      </form>

      <!-- Categories List -->
      <ul class="categories-list">
        <li v-for="category in categories" :key="category.id">
          {{ category.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.admin-panel {
  padding: 2rem;
}

.error-message {
  color: red;
  font-weight: bold;
}

.items-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.items-table th,
.items-table td {
  border: 1px solid #ddd;
  padding: 0.5rem;
  text-align: center;
}

.items-table th {
  background-color: #f4f4f4;
}

.item-image {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
}

.delete-btn {
  background-color: red;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 4px;
}

.delete-btn:hover {
  background-color: darkred;
}

.categories-section {
  margin-top: 2rem;
}

.create-category-form {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.category-input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.create-category-btn {
  background-color: green;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 4px;
}

.create-category-btn:hover {
  background-color: darkgreen;
}

.categories-list {
  list-style: none;
  padding: 0;
}

.categories-list li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #ddd;
}
</style>