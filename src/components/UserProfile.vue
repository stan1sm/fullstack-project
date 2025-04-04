<template>
  <div class="user-profile">
    <h1>{{ $t('userProfile.welcome', { userName: userName }) }}</h1>
    <p>{{ $t('userProfile.emailPrefix') }}{{ userEmail }}</p>
    <button @click="logout" class="button">{{ $t('navbar.logout') }}</button>
    <button @click="goToSettings" class="button">{{ $t('userProfile.settingsButton') }}</button>
    <button @click="createItem" class ="button">{{ $t('userProfile.createItemButton') }}</button>
  </div>
  <h1>My Items</h1>
    <div v-if="userItems.length === 0">
      <p>You have not listed any items.</p>
      <button @click="createItem" class="button">List Item</button>
    </div>
    <div v-else id="items-container" class="items-list">
      <div v-for="item in userItems" :key="item.id" class="item">
        <img :src="item.imageUrl" alt="Item Image" />
        <h3>{{ item.title }}</h3>
        <p>{{ item.description || 'No description available' }}</p>
        <p>${{ item.price }}</p>
      </div>
    </div>

</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const router = useRouter();
const userEmail = ref('');
const userName = ref('');
const userItems = ref([]);

const fetchUserEmail = async () => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error(t('userProfile.errorNoToken'));
    }
    const response = await axios.get('http://localhost:8080/api/marketplace/userinfo/email', {
      headers: { Authorization: `Bearer ${token}` },
    });
    userEmail.value = response.data;
  } catch (error) {
    if ((error as any).response?.status === 403) {
      console.error('Access forbidden - possible token issue');
    }
    console.error('Failed to fetch user email:', error as any);
    logout();
    localStorage.removeItem('authToken');
    router.push('/login');
  }
};

const fetchUserName = async () => {
  try {
    const token = localStorage.getItem('authToken');
    if (token) {
      const response = await axios.get('http://localhost:8080/api/marketplace/userinfo/name', {
        headers: { Authorization: `Bearer ${token}` },
      });
      userName.value = response.data;
    }
  } catch (error) {
    if ((error as any).response?.status === 403) {
      console.error('Access forbidden - possible token issue');
    }
    console.error('Failed to fetch user name:', error);
    logout();
    localStorage.removeItem('authToken');
    router.push('/login');
  }
};

const fetchUserItems = async () => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('No token found');
    }
    const response = await axios.get('http://localhost:8080/api/marketplace/user/items', {
      headers: { Authorization: `Bearer ${token}` },
    });

    userItems.value = response.data.map((item) => ({
      ...item,
      imageUrl: item.pictureUrl ? `http://localhost:8080/api/marketplace/images/${item.pictureUrl.split('/').pop()}` : 'default-image-url.jpg',
    }));
  } catch (error) {
    console.error('Error fetching user items:', error);
    alert('An error occurred while fetching your items.');
  }
};

// Function to display user items
const displayUserItems = (items) => {
  const itemsContainer = document.getElementById('items-container');
  itemsContainer.innerHTML = ''; // Clear existing items

  items.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.className = 'item';

    const itemImage = document.createElement('img');
    itemImage.src = item.imageUrl;
    itemImage.alt = item.name;

    const itemName = document.createElement('h3');
    itemName.textContent = item.name;

    const itemDescription = document.createElement('p');
    itemDescription.textContent = item.description;

    const itemPrice = document.createElement('p');
    itemPrice.textContent = `$${item.price}`;

    itemElement.appendChild(itemImage);
    itemElement.appendChild(itemName);
    itemElement.appendChild(itemDescription);
    itemElement.appendChild(itemPrice);

    itemsContainer.appendChild(itemElement);
  });
};

const logout = async () => {
  try {
    const token = localStorage.getItem('authToken');
    if (token) {
      await axios.post('http://localhost:8080/api/marketplace/logout', {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }
    localStorage.removeItem('authToken');
    alert(t('logout.success'));
    router.push('/login');
  } catch (error) {
    console.error('Logout failed:', error as any);
    alert(t('logout.error'));
  }
};

const goToSettings = () => {
  router.push('/userSettings');
};

const createItem = () => {
  router.push('/createItem');
};

onMounted(() => {
  fetchUserEmail();
  fetchUserName();
  fetchUserItems();
});
</script>

<style scoped>
.user-profile {
  text-align: center;
  margin-top: 2rem;
}

.button {
  background-color: var(--secondary-color);
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: var(--border-radius);
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  margin: 0.5rem;
}

.logout-btn:hover {
  background-color: #d9534f;
}

.settings-btn:hover {
  background-color: #3aa876;
}
</style>