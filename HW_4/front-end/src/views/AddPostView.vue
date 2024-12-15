<template>
  <div class="add-post">
    <h1>Add a New Post</h1>
    <form @submit.prevent="addPost">
      <div>
        <label for="title">Title</label>
        <input type="text" v-model="title" id="title" required />
      </div>
      <div>
        <label for="body">Body</label>
        <textarea v-model="body" id="body" required></textarea>
      </div>
      <div>
        <label for="urllink">URL Link</label>
        <input type="url" v-model="urllink" id="urllink" required />
      </div>
      <button type="submit">Add Post</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AddPostView',
  data() {
    return {
      title: '',
      body: '',
      urllink: '',
    };
  },
  methods: {
    async addPost() {
      try {
        const response = await axios.post('http://localhost:3000/api/posts', {
          title: this.title,
          body: this.body,
          urllink: this.urllink,
        });
        console.log('Post added:', response.data);
        // Optionally redirect after adding the post
        this.$router.push('/');
      } catch (error) {
        console.error('Error adding post:', error);
      }
    },
  },
};
</script>

<style scoped>
.add-post {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
form {
  display: flex;
  flex-direction: column;
}
label {
  margin: 10px 0 5px;
}
input, textarea {
  padding: 8px;
  margin-bottom: 15px;
}
button {
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}
button:hover {
  background-color: #45a049;
}
</style>
