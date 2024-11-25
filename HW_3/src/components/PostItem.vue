<template>
  <div class="post-item">
    <div class="post-header">
      <img :src="post.user_image || 'default-user-image.jpg'" alt="User Image" class="user-image" />
      <span class="post-date">{{ post.date }}</span>
    </div>

    <div v-if="post.post_image" class="post-image">
      <img :src="post.post_image" alt="Post Image" />
    </div>

    <div v-if="post.post_text" class="post-text">
      <p>{{ post.post_text }}</p>
    </div>

    <div class="post-footer">
      <!-- Display Like Count -->
      <span class="like-count">Likes: {{ post.like_count || 0 }}</span>
      <!-- Like Button -->
      <button @click="incrementLike" class="like-button">Like</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostItem",
  props: {
    post: Object,
    index: Number,
  },
  methods: {
    incrementLike() {
      this.$store.commit("INCREMENT_LIKES", this.index); // Increment likes for this post
    },
  },
};
</script>

<style scoped>
.post-item {
  border: 1px solid #ddd;
  padding: 16px;
  margin: 8px;
  width: 300px;
}

.post-header {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.user-image {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 8px;
}

.post-date {
  font-size: 14px;
  color: #777;
}

.post-image img {
  width: 100%;
  height: auto;
}

.post-text {
  margin: 8px 0;
}

.post-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.like-button {
  background-color: #007bff;
  color: white;
  padding: 8px;
  border: none;
  cursor: pointer;
}

.like-button:hover {
  background-color: #0056b3;
}

.like-count {
  font-size: 14px;
  color: #333;
}
</style>
