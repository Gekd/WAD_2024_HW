<template>
  <div class="post-view">
    <button class="back-button" @click="goBack">← Back</button>
    <div class="post-content">
      <h1>{{ isEditing ? 'Edit Post' : 'Post' }}</h1>
      <form @submit.prevent="updatePost">
        <div class="form-group">
          <label for="title">Title:</label>
          <input
            id="title"
            v-model="post.title"
            type="text"
            required
            :disabled="!isEditing"
          >
        </div>
        <div class="form-group">
          <label for="body">Body:</label>
          <textarea
            id="body"
            v-model="post.body"
            required
            :disabled="!isEditing"
          ></textarea>
        </div>
        <div class="form-group">
          <label for="urllink">URL Link:</label>
          <input
            id="urllink"
            v-model="post.urllink"
            type="url"
            :disabled="!isEditing"
          >
        </div>
        <div class="button-container">
          <button v-if="!isEditing" type="button" class="update-button" @click="startEditing">Edit</button>
          <button v-else type="submit" class="update-button">Save</button>
          <button v-if="isEditing" type="button" class="cancel-button" @click="cancelEdit">Cancel</button>
          <button type="button" class="delete-button" @click="deletePost">Delete</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'PostView',
  data() {
    return {
      post: {
        title: '',
        body: '',
        urllink: ''
      },
      isEditing: false,
    };
  },
  created() {
    this.checkAuth();
    this.fetchPost();
  },
  methods: {
    checkAuth() {
      const token = localStorage.getItem('auth');
      if (!token) {
        this.$router.push('/login');
      }
    },

    async fetchPost() {
      try {
        const token = localStorage.getItem('auth');
        const response = await axios.get(`http://localhost:3000/api/posts/${this.$route.params.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.post = response.data;
      } catch (error) {
        console.error('Error fetching post:', error);
        if (error.response && error.response.status === 401) {
          this.$router.push('/login');
        }
      }
    },

    goBack() {
      this.$router.push('/');
    },

    startEditing() {
      this.isEditing = true;
    },

    async updatePost() {
      if (this.isEditing) {
        try {
          const token = localStorage.getItem('auth');
          const response = await axios.put(`http://localhost:3000/api/posts/${this.post.id}`, this.post, {
            headers: { Authorization: `Bearer ${token}` }
          });
          this.post = response.data;
          this.isEditing = false;
        } catch (error) {
          console.error('Error updating post:', error);
          if (error.response && error.response.status === 401) {
            this.$router.push('/login');
          }
        }
      }
    },

    async deletePost() {
      if (confirm('Are you sure you want to delete this post?')) {
        try {
          const token = localStorage.getItem('auth');
          await axios.delete(`http://localhost:3000/api/posts/${this.post.id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          this.$router.push('/');
        } catch (error) {
          console.error('Error deleting post:', error);
          if (error.response && error.response.status === 401) {
            this.$router.push('/login');
          }
        }
      }
    },

    cancelEdit() {
      this.isEditing = false;
      this.fetchPost(); // Revert changes by fetching the original post data
    },
  },
};
</script>

<style scoped>
.post-view {
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
.update-button,
.delete-button,
.cancel-button {
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin: 0 10px;
  transition: background-color 0.3s ease;
}
.update-button {
  background-color: #4f9deb;
  color: white;
}
.update-button:hover {
  background-color: #357ac9;
}
.delete-button {
  background-color: #f44336;
  color: white;
}
.delete-button:hover {
  background-color: #d32f2f;
}
.cancel-button {
  background-color: #f0f0f0;
  color: #333;
}
.cancel-button:hover {
  background-color: #e0e0e0;
}
</style>
