<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <div>
        <label for="email">Email</label>
        <input type="email" v-model="email" id="email" required />
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" v-model="password" id="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:3000/auth/login', {
          email: this.email,
          password: this.password,
        }, { withCredentials: true });

        console.log('User logged in:', response.data);
        
        if (response.data && response.data.user_id) {
          // Successful login
          localStorage.setItem('auth', response.data.user_id);
          this.$router.push('/').catch(err => {
            console.error('Navigation failed:', err);
            window.location.href = '/';
          });
        } else {
          throw new Error('Invalid response from server');
        }
      } catch (error) {
        console.error('Error logging in:', error);
        this.errorMessage = error.response?.data?.error || 'Login failed. Please try again.';
      }
    },
  },
};
</script>


<style scoped>
.login {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}
form {
  display: flex;
  flex-direction: column;
}
label {
  margin: 10px 0 5px;
}
input {
  padding: 8px;
  margin-bottom: 15px;
}
button {
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}
button:hover {
  background-color: #45a049;
}
.error-message {
  color: red;
  margin-top: 10px;
}
</style>