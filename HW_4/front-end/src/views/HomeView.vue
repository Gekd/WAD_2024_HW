<template>
  <div  class="home-container">
    <!-- Logout Button -->
    <div class="logout-container">
      <button class="logout-btn" @click="logout">Logout</button>
    </div>

    <!-- Posts List -->
    <div class="posts-container">
      <div v-if="posts.length">
        <div
          class="post-card"
          v-for="post in posts"
          :key="post.id"
          @click="viewPost(post.id)"
        >
          <p class="post-date">{{ formatDate(post.date) }}</p>
          <p class="post-body">{{ post.title }}</p>
        </div>
      </div>
      <p v-else>No posts available.</p>
    </div>

    <!-- Bottom Buttons -->
    <div class="bottom-buttons">
      <button class="action-btn" @click="goToAddPost">Add Post</button>
      <button class="action-btn" @click="deleteAllPosts">Delete All</button>
    </div>
  </div>

</template>

<script>
import axios from 'axios';

export default {
  name: 'HomeView',
  data() {
    return {
      posts: [],
    };
  },
  methods: {
    async fetchPosts() {
      try {
        const token = localStorage.getItem('auth')

        const response = await axios.get('http://localhost:3000/api/posts/', {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.posts = response.data;
      } catch (error) {
        console.error('Error fetching posts:', error);
        if (error.response && error.response.status === 401) {
          // Unauthorized, redirect to login
          this.$router.push('/login')
        }
      }
    },
    logout() {
      localStorage.removeItem('auth');
      this.$router.push('/login');
    },
    goToAddPost() {
      this.$router.push('/add-post');
    },
    async deleteAllPosts() {
      try {
        await axios.delete('http://localhost:3000/posts');
        this.posts = [];
      } catch (error) {
        console.error('Error deleting posts:', error);
      }
    },
    viewPost(id) {
      this.$router.push(`/post/${id}`);
    },
  },
  mounted() {
    if (!localStorage.getItem('auth')) {
      this.$router.push('/login')
    } else {
      this.fetchPosts();
    }
  },
};
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #f0f0f0; 
}

/* Logout Button */
.logout-btn {
  background-color: #5e81ac;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  margin: 10px 0 20px; 
  cursor: pointer;
  font-size: 14px;
}

.logout-btn:hover {
  background-color: #4c566a;
}

/* Posts List Container */
.posts-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: white;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 50%; 
  max-width: 600px;
}

.post-card {
  background-color: #eceff4;
  border-radius: 8px;
  padding: 10px;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}

.post-card:hover {
  background-color: #d8dee9;
}

.post-date {
  color: #5e81ac;
  font-size: 12px;
  margin: 0;
}

.post-body {
  font-size: 14px;
  color: #2e3440;
  margin: 5px 0 0;
}

/* Bottom Buttons */
.bottom-buttons {
  display: flex;
  justify-content: space-around;
  width: 50%;
  max-width: 600px;
  margin-top: 15px;
}

.action-btn {
  background-color: #5e81ac;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.action-btn:hover {
  background-color: #4c566a;
}
</style>
