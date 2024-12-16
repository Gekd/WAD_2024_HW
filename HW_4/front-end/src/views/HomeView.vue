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
          <div class="post-header">
            <span class="post-date">{{ formatDate(post.last_modified) }}</span>
                    </div>
          <div class="post-content">
            <h2 class="post-title">{{ post.title }}</h2>
            <p class="post-body">{{ truncateBody(post.body) }}</p>
          </div>
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
        const token = localStorage.getItem('auth');
        if (!token) {
          this.$router.push('/login');
          return;
        }

        const response = await axios.get('http://localhost:3000/api/posts/', {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.posts = response.data;
      } catch (error) {
        console.error('Error fetching posts:', error);
        if (error.response && error.response.status === 401) {
          // Unauthorized, redirect to login
          this.$router.push('/login');
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

    formatDate(dateString) {
      if (!dateString) return 'No date';
      
      let date;
      if (typeof dateString === 'string') {
        // Parse the ISO 8601 date string
        date = new Date(dateString);
      } else if (dateString instanceof Date) {
        date = dateString;
      } else {
        return 'Invalid Date';
      }

      if (isNaN(date.getTime())) {
        console.error('Invalid date:', dateString);
        return 'Invalid Date';
      }

      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return date.toLocaleDateString(undefined, options);
    },

    viewPost(postId) {
      this.$router.push({ name: 'post', params: { id: postId } });
    },
    truncateBody(body) {
      const maxLength = 150;
      if (body.length > maxLength) {
        return body.substring(0, maxLength) + '...';
      }
      return body;
    },

    async deleteAllPosts() {
    if (confirm('Are you sure you want to delete all posts? This action cannot be undone.')) {
      try {
        const token = localStorage.getItem('auth');
        if (!token) {
          this.$router.push('/login');
          return;
        }

        await axios.delete('http://localhost:3000/api/posts', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        this.posts = [];
        alert('All posts have been deleted successfully.');
      } catch (error) {
      console.error('Error deleting all posts:', error);
      if (error.response && error.response.status === 401) {
        // Unauthorized, redirect to login
        this.$router.push('/login');
      } else {
        alert('Failed to delete all posts. Please try again.');
      }
    }
  }
},
  },
  mounted() {
    this.fetchPosts();
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
  gap: 30px; 
  width: 100%;
  max-width: 600px;
}

.post-card {
  background-color: white;
  border-radius: 12px; 
  padding: 20px; 
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  margin-bottom: 10px;
}

.post-card:hover {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.post-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 15px;
}

.post-date {
  color: #5e81ac;
  font-size: 14px;
}

.post-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  text-align: center; 
}

.post-title {
  font-size: 1.5rem;
  color: #2e3440;
  margin: 0 0 10px 0; 
  width: 100%; 
  text-align: left; 
}

.post-body {
  font-size: 1rem;
  color: #4c566a;
  line-height: 1.5;
  margin: 0;
  text-align: left; 
  width: 100%; 
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
