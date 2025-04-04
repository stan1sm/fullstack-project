<template>
  <div class="user-profile">
    <h1>{{ $t('userProfile.welcome', { userName: userName }) }}</h1>
    <p>{{ $t('userProfile.emailPrefix') }}{{ userEmail }}</p>
    <button @click="logout" class="button">{{ $t('navbar.logout') }}</button>
    <button @click="goToSettings" class="button">{{ $t('userProfile.settingsButton') }}</button>
    <button @click="createItem" class ="button">{{ $t('userProfile.createItemButton') }}</button>
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