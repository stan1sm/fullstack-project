<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import UserSettings from '@/components/UserSettings.vue';
</script>
<template>
    <div class="user-settings-view">
        <h1>Settings</h1>
        <UserSettings />
    </div>
</template>