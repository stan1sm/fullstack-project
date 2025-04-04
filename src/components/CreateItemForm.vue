<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

const itemName = ref('');
const itemDescription = ref('');
const itemPrice = ref(0.0);
const itemCategory = ref('');
const API_URL = 'http://localhost:8080/api/marketplace';

const handleSubmit = async () => {
  const token = localStorage.getItem('authToken'); // Retrieve the user's token from localStorage
  if (!token) {
    alert('You are not logged in. Please log in again.');
    window.location.href = '/login'; // Redirect to login if no token is found
    return;
  }

  try {
    const item = {
      name: itemName.value,
      description: itemDescription.value,
      price: itemPrice.value,
      category: itemCategory.value,
    };

    const response = await axios.put(
      `${API_URL}/createItem`,
      item,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      }
    );

    alert('Item created successfully!');
    console.log('Created item:', response.data);

    // Clear form fields after successful submission
    itemName.value = '';
    itemDescription.value = '';
    itemPrice.value = 0;
    itemCategory.value = '';
  } catch (error) {
    console.error('Error creating item:', error.response?.data || error.message);
    alert('Failed to create item. Please try again.');
  }
};
</script>

<template>
  <div class="create-item-form">
    <h2>Create New Item</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">Item Name:</label>
        <input type="text" id="name" v-model="itemName" required />
      </div>
      <div class="form-group">
        <label for="description">Description:</label>
        <textarea id="description" v-model="itemDescription" required></textarea>
      </div>
      <div class="form-group">
        <label for="price">Price:</label>
        <input type="number" step="0.01" id="price" v-model.number="itemPrice" required />
      </div>
      <div class="form-group">
        <label for="category">Category:</label>
        <select id="category" v-model="itemCategory" required>
          <option value="" disabled>Select a category</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="home">Home</option>
          <option value="toys">Toys</option>
        </select>
      </div>
      <button class="submit-btn" type="submit">Create Item</button>
    </form>
  </div>
</template>

<style scoped>
.create-item-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: var(--border-radius);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
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

input,
textarea,
select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: var(--border-radius);
  font-size: 1rem;
}

textarea {
  resize: vertical;
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