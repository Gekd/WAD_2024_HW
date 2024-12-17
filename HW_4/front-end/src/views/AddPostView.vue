<template>
  <div class="add-post-view">
    <button class="back-button" @click="goBack">← Back</button>
    <div class="post-content">
      <h1>Add a New Post</h1>
      <form @submit.prevent="addPost">
        <div class="form-group">
          <label for="title">Title:</label>
          <input
            id="title"
            v-model="post.title"
            type="text"
            required
          >
        </div>
        <div class="form-group">
          <label for="body">Body:</label>
          <textarea
            id="body"
            v-model="post.body"
            required
          ></textarea>
        </div>
        <div class="button-container">
          <button type="submit" class="add-button">Add Post</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AddPostView',
  data() {
    return {
      post: {
        title: '',
        body: ''
      }
    };
  },
  methods: {
    async addPost() {
      try {
        const token = localStorage.getItem('auth');
        if (!token) {
          this.$router.push('/login');
          return;
        }
        const response = await axios.post('http://localhost:3000/api/posts', this.post, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Post added:', response.data);
        this.$router.push('/');
      } catch (error) {
        console.error('Error adding post:', error);
        if (error.response && error.response.status === 401) {
          this.$router.push('/login');
        } else {
          alert('Failed to add post. Please try again.');
        }
      }
    },
    goBack() {
      this.$router.push('/');
    }
  },
  mounted() {
    const token = localStorage.getItem('auth');
    if (!token) {
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.add-post-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
.back-button {
  background-color: #f0f0f0;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin-bottom: 20px;
  transition: background-color 0.3s ease;
}
.back-button:hover {
  background-color: #e0e0e0;
}
.post-content {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
h1 {
  font-size: 2rem;
  margin-bottom: 15px;
  color: #333;
  text-align: center;
}
.form-group {
  margin-bottom: 20px;
}
label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}
input[type="text"],
input[type="url"],
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}
textarea {
  height: 150px;
  resize: vertical;
}
.button-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.add-button {
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  background-color: #4f9deb;
  color: white;
  transition: background-color 0.3s ease;
}
.add-button:hover {
  background-color: #357ac9;
}
</style>
