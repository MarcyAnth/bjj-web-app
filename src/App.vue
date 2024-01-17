<template>
  <div>
    <router-view></router-view>
    <UserList/>
  </div>
</template>

<script>
import UserList from './components/UserList.vue';
import SignIn from './components/SignIn.vue';


export default {
  components: {
    UserList, SignIn
  },
};
</script>
