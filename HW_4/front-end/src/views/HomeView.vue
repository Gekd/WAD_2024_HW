<template>
  <div  class="home-container">
    <div>
      <!-- Buttons -->
      <div>
        <button @click="logout">Logout</button>
        <button @click="goToAddPost">Add Post</button>
        <button @click="deleteAllPosts">Delete All</button>
      </div>

      <!-- List of Posts -->
      <div v-if="posts.length">
        <h2>All Posts</h2>
        <ul>
          <li v-for="post in posts" :key="post.id">
            <a @click="viewPost(post.id)">{{ post.title }}</a>
          </li>
        </ul>
      </div>
      <p v-else>No posts available.</p>
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
        const response = await axios.get('http://localhost:3000/posts');
        this.posts = response.data;
      } catch (error) {
        console.error('Error fetching posts:', error);
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
    this.fetchPosts();
  },
};
</script>

<style scoped>
.home-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  text-align: center;
}

h1 {
  color: #333;
}
button {
  margin: 10px;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
a {
  color: #007bff;
  cursor: pointer;
}
a:hover {
  text-decoration: underline;
}
</style>
