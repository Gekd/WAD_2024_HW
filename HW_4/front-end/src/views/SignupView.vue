<template>
  <div class="signup-page">
    <!-- Centered Form Container -->
    <div class="signup-box">
      <h2>Create an Account</h2>
      <form @submit.prevent="signup">
        <!-- Email Field -->
        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="Email"
            required
          />
        </div>
        <!-- Password Field -->
        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <!-- Submit Button -->
        <button type="submit" class="signup-button">Sign Up</button>
      </form>
      <!-- Error Message -->
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SignupView",
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    async signup() {
      try {
        console.log("Attempting to sign up with:", {
          email: this.email,
          password: this.password,
        });
        const response = await axios.post(
          "http://localhost:3000/auth/signup",
          {
            email: this.email,
            password: this.password,
          },
          { withCredentials: true }
        );

        console.log("Signup response:", response);
        if (response.data && response.data.user_id) {
          console.log("User signed up successfully:", response.data);
          // Redirect to home or login page after successful signup
          localStorage.setItem("auth", response.data.user_id);
          this.$router.push("/");
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (error) {
        console.error("Error signing up:", error);
        if (error.response) {
          console.error("Error response:", error.response.data);
          this.errorMessage =
            error.response.data.error || "Signup failed. Please try again.";
        } else if (error.request) {
          console.error("No response received:", error.request);
          this.errorMessage =
            "No response from server. Please try again later.";
        } else {
          console.error("Error setting up request:", error.message);
          this.errorMessage = "An error occurred. Please try again.";
        }
      }
    },
  },
};
</script>

<style scoped>
/* Background and Page Layout */
.signup-page {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f1f1f1;
  min-height: calc(100vh - 190px);
  border-radius: 24px;
}

/* Signup Form Container */
.signup-box {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  width: 350px;
  text-align: center;
}

/* Form Groups */
.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

label {
  font-size: 14px;
  color: #444;
  margin-bottom: 5px;
  text-align: left;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  outline: none;
}

input:focus {
  border-color: #4f9deb;
  box-shadow: 0 0 5px rgba(79, 157, 235, 0.5);
}

/* Submit Button */
.signup-button {
  background-color: #4f9deb;
  color: white;
  border: none;
  padding: 10px 0;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
  margin-top: 10px;
}

.signup-button:hover {
  background-color: #357ac9;
}

/* Error Message */
.error {
  color: red;
  margin-top: 10px;
  font-size: 14px;
}
</style>
