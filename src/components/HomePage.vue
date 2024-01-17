<template>
    <div class="home-page">
      <h1>Welcome to the Homepage</h1>
      <div v-if="userData">
        <p>User Information:</p>
        <ul>
          <li><strong>Name:</strong> {{ userData.name }}</li>
          <li><strong>Email:</strong> {{ userData.email }}</li>
          <li><strong>Weight:</strong> {{ userData.weight || 'N/A' }}</li>
          <li><strong>Height:</strong> {{ userData.height || 'N/A' }}</li>
          <li><strong>Age:</strong> {{ userData.age || 'N/A' }}</li>
          <li><strong>Date of Birth:</strong> {{ userData.dob || 'N/A' }}</li>
        </ul>
      </div>
      <div v-else>
        <p>Loading user data...</p>
      </div>
    </div>
  </template>
  
  <script>
import { ref, onMounted } from 'vue';
import { getCurrentUser, getUser } from '../../firebaseConfig.js';

export default {
  setup() {
    const userData = ref(null);

    onMounted(async () => {
      try {
        const user = getCurrentUser();

        if (user) {
          const userId = user.uid;

          const userFromFirestore = await getUser(userId);

          if (userFromFirestore) {
            userData.value = userFromFirestore.data();
          } else {
            console.error('User not found for ID:', userId);
          }
        } else {
          console.error('No user is currently signed in.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    });

    return { userData };
  },
};
</script>
  