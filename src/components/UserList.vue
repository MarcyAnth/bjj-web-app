<template>
    <div>
      <form @submit.prevent="onSubmit">
        <div>
          <label>Email</label>
          <input
            v-model="authForm.email"
            class="form-control"
            type="email"
            required
          />
        </div>
  
        <div>
          <label>Password</label>
          <input
            v-model="authForm.password"
            class="form-control"
            type="password"
            required
          />
        </div>
  
        <!-- User Details Section -->
        <div>
          <label>Name</label>
          <input v-model="userDetails.name" class="form-control" required />
        </div>
  
        <div>
          <label>Weight</label>
          <input v-model="userDetails.weight" class="form-control" type="number" />
        </div>
  
        <div>
          <label>Height</label>
          <input v-model="userDetails.height" class="form-control" type="number" />
        </div>
  
        <div>
          <label>Age</label>
          <input v-model="userDetails.age" class="form-control" type="number" />
        </div>
  
        <div>
          <label>Date of Birth</label>
          <input v-model="userDetails.dob" class="form-control" type="date" />
        </div>
  
        <button type="submit">Create User</button>
      </form>
    </div>
  </template>
  
  <script>
  import { createUserWithEmailAndPassword } from '../../firebaseConfig.js';
  import { createUser } from '../../firebaseConfig.js';
  import { reactive } from 'vue';
  
  export default {
    name: 'UserList',
    setup() {
      const authForm = reactive({
        email: '',
        password: '',
      });
  
      const userDetails = reactive({
        name: '',
        weight: null,
        height: null,
        age: null,
        dob: '',
      });
  
      const onSubmit = async () => {
        try {
            const authUser = await createUserWithEmailAndPassword(authForm.email, authForm.password);

            await createUser({ ...userDetails, uid: authUser.uid });

            authForm.email = '';
            authForm.password = '';
            userDetails.name = '';
            userDetails.weight = null;
            userDetails.height = null;
            userDetails.age = null;
            userDetails.dob = '';
        } catch (error) {
            console.error('Registration error:', error.message);
        }
        };
  
      return { authForm, userDetails, onSubmit }
    },
  };
  </script>
  