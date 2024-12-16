<template>
    <div class="signup">
      <h2>Create an Account</h2>
      <form @submit.prevent="signup">
        <input v-model="email" type="email" placeholder="Email" required>
        <input v-model="password" type="password" placeholder="Password" required>
        <button type="submit">Sign Up</button>
      </form>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  
  export default {
    name: 'SignupView',
    data() {
      return {
        email: '',
        password: '',
        errorMessage: ''
      }
    },
    methods: {
      async signup() {
        try {
          console.log('Attempting to sign up with:', { email: this.email, password: this.password });
          const response = await axios.post('http://localhost:3000/auth/signup', {
            email: this.email,
            password: this.password
          }, { withCredentials: true })
          
          console.log('Signup response:', response);
          if (response.data && response.data.user_id) {
            console.log('User signed up successfully:', response.data);
            // Redirect to home or login page after successful signup
            this.$router.push('/');
          } else {
            throw new Error('Unexpected response format');
          }
        } catch (error) {
          console.error('Error signing up:', error);
          if (error.response) {
            console.error('Error response:', error.response.data);
            this.errorMessage = error.response.data.error || 'Signup failed. Please try again.';
          } else if (error.request) {
            console.error('No response received:', error.request);
            this.errorMessage = 'No response from server. Please try again later.';
          } else {
            console.error('Error setting up request:', error.message);
            this.errorMessage = 'An error occurred. Please try again.';
          }
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .error {
    color: red;
    margin-top: 10px;
  }
  </style>