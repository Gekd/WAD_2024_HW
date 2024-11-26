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
                <input type="password" id="password" v-model="password" required @input="validatePassword">
            </div>
            <div v-if="password && !isPasswordValid" class="error-messages">
                <p>The password is not valid:</p>
                <ul>
                    <li v-for="(error, index) in passwordErrors" :key="index">
                        {{ error }}
                    </li>
                </ul>
            </div>
            <button type="submit" :disabled="!isPasswordValid || !password">Sign Up</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            email: '',
            password: '',
            passwordErrors: [],
            isPasswordValid: false
        };
    },
    computed: {
        isFormValid() {
            return this.username && this.email && this.isPasswordValid;
        }
    },
    methods: {
        submitForm() {
            if (this.isFormValid) {
                console.log('Form submitted:', this.username, this.email, this.password);
                this.username = '';
                this.email = '';
                this.password = '';
                this.passwordErrors = [];
                this.isPasswordValid = false;
                this.$router.push('/');// added redirecting to home page if the form is valid because it seemed nice
            }
        },
        validatePassword() {
            this.passwordErrors = [];
            
            if (this.password.length < 8 || this.password.length >= 15) {
                this.passwordErrors.push("Password should be at least 8 characters");
            }
            if (this.password.length >= 15) {
                this.passwordErrors.push("Password should be at less than 15 characters");
            }
            if (!/[A-Z]/.test(this.password)) {
                this.passwordErrors.push("Include at least one uppercase alphabet character");
            }
            if ((this.password.match(/[a-z]/g) || []).length < 2) {
                this.passwordErrors.push("Include at least two lowercase alphabet characters");
            }
            if (!/\d/.test(this.password)) {
                this.passwordErrors.push("Include at least one numeric value");
            }
            if (!/^[A-Z]/.test(this.password)) {
                this.passwordErrors.push("Start with an uppercase alphabet");
            }
            if (!this.password.includes('_')) {
                this.passwordErrors.push("Include the character '_'");
            }

            this.isPasswordValid = this.passwordErrors.length === 0;
        }
    }
};
</script>

<style scoped>
.signup-view {
    max-width: 400px;
    margin: 10% auto;
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

.error-messages {
    color: red;
    margin-top: 10px;
}

.error-messages ul {
    padding-left: 20px;
}

.signup-view button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
}

@media screen and (min-width: 1000px) {
    .signup-view {
        margin: 30% auto;
    }
}
</style>