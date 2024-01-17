<template>
    <div>
      <form @submit.prevent="onSubmit">
        <div>
          <label>Email</label>
          <input v-model="signInForm.email" class="form-control" type="email" required />
        </div>
  
        <div>
          <label>Password</label>
          <input v-model="signInForm.password" class="form-control" type="password" required />
        </div>
  
        <button type="submit">Sign In</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { reactive } from 'vue';
  import { signInWithEmailAndPassword } from '../../firebaseConfig.js';
  import { useRouter } from 'vue-router'; // Import useRouter from 'vue-router'
  
  const signInForm = reactive({
    email: '',
    password: '',
  });
  
  const router = useRouter(); // Use useRouter
  
  const onSubmit = async () => {
    try {
      // Sign in the user with email and password
      await signInWithEmailAndPassword(signInForm.email, signInForm.password);
  
      // Redirect to the homepage
      router.push({ name: 'home' });
    } catch (error) {
      // Handle sign-in errors
      console.error('Sign-in error:', error.message);
    }
  };
  </script>