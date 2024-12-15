<template>
  <div class="post-view">
    <h1>{{ post.title }}</h1>
    <p>{{ post.body }}</p>
    <a :href="post.urllink" target="_blank">Read more</a>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'PostView',
  data() {
    return {
      post: {},
    };
  },
  created() {
    this.fetchPost();
  },
  methods: {
    async fetchPost() {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/posts/${this.$route.params.id}`
        );
        this.post = response.data;
      } catch (error) {
        console.error('Error fetching post:', error);
      }
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
h1 {
  font-size: 2rem;
  margin-bottom: 15px;
}
p {
  font-size: 1.2rem;
  margin-bottom: 15px;
}
a {
  color: #007bff;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
</style>
