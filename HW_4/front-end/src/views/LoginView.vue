<template>
  <div class="login-page">
    <!-- Login Box Container -->
    <div class="login-box">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <!-- Email Field -->
        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            type="email"
            v-model="email"
            placeholder="Enter your email"
            required
          />
        </div>

        <!-- Password Field -->
        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            type="password"
            v-model="password"
            placeholder="Enter your password"
            required
          />
        </div>

        <!-- Login Button -->
        <button type="submit" class="login-button">Login</button>
      </form>

      <!-- Error Message -->
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

      <!-- Signup Link -->
      <p class="signup-redirect">
        Don't have an account?
        <a @click="redirectToSignup" class="signup-link">Sign Up</a>
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginView",
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    async login() {
      try {
        // Send login request
        const response = await axios.post(
          "http://localhost:3000/auth/login",
          {
            email: this.email,
            password: this.password,
          },
          { withCredentials: true }
        );

        console.log("User logged in:", response.data);

        if (response.data && response.data.user_id) {
          // Save authentication state
          localStorage.setItem("auth", response.data.user_id);
          this.$router.push("/").catch((err) => {
            console.error("Navigation failed:", err);
            window.location.href = "/";
          });
        } else {
          throw new Error("Invalid response from server");
        }
      } catch (error) {
        console.error("Error logging in:", error);
        this.errorMessage =
          error.response?.data?.error || "Login failed. Please try again.";
      }
    },
    redirectToSignup() {
      // Redirect to the signup page
      this.$router.push("/signup");
    },
  },
};
</script>

<style scoped>
/* Page Layout */
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f1f1f1;
  min-height: calc(100vh - 190px);
  border-radius: 24px;
}

/* Login Form Container */
.login-box {
  background-color: #f5f5f5;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 350px;
  text-align: center;
}

/* Form Groups */
.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  text-align: left;
}

label {
  font-size: 14px;
  color: #444;
  margin-bottom: 5px;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}

input:focus {
  border-color: #4f9deb;
  box-shadow: 0 0 5px rgba(0, 100, 180, 0.5);
}

/* Login Button */
.login-button {
  background-color: #4f9deb;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
}

.login-button:hover {
  background-color: #357ac9;
}

/* Error Message */
.error-message {
  color: red;
  margin-top: 10px;
  font-size: 14px;
}

/* Signup Redirect */
.signup-redirect {
  margin-top: 15px;
  font-size: 14px;
  color: #555;
}

.signup-link {
  color: #4f9deb;
  cursor: pointer;
  text-decoration: none;
}

.signup-link:hover {
  text-decoration: underline;
}
</style>
