<template>
    <div class="signup-view">
        <h1>Sign Up</h1>
        <form @submit.prevent="submitForm">
            <div>
                <label for="username">Username:</label>
                <input type="text" id="username" v-model="username" required>
            </div>
            <div>
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="email" required>
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="password" required>
            </div>
            <button type="submit">Sign Up</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            email: '',
            password: ''
        };
    },
    methods: {
        submitForm() {
            // Handle form submission
            console.log('Form submitted:', this.username, this.email, this.password);
        }
    }
};
</script>

<style scoped>
.signup-view {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.signup-view h1 {
    text-align: center;
}

.signup-view form div {
    margin-bottom: 15px;
}

.signup-view label {
    display: block;
    margin-bottom: 5px;
}

.signup-view input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
}

.signup-view button {
    width: 100%;
    padding: 10px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.signup-view button:hover {
    background-color: #0056b3;
}
</style>