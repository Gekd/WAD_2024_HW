<template>
  <div class="post-item">
    <div class="post-header">
      <img src="../assets/images/person-circle.svg" alt="User Image" class="user-image" />
      <span class="post-date">{{ formatDate(post.date) }}</span>
    </div>

    <div v-if="post.post_image" class="post-image">
      <img :src="post.post_image" alt="Post Image" />
    </div>

    <div v-if="post.post_text" class="post-text">
      <p>{{ post.post_text }}</p>
    </div>

    <div class="post-footer">
      <button @click="incrementLike" class="like-button"> <img src="../assets/images/like.svg" />  </button>

      <span class="like-count"> {{ post.like_count || 0 }} Likes</span>

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
    formatDate(dateString) {
      // Convert the date string to a Date object
      const date = new Date(dateString);
      // Format the date
      return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(date);
    },
  },
};
</script>

<style scoped>
.post-item {
  background-color: var(--color-background-soft);
  padding: 16px;
  margin: 8px;
  width: 300px;
  border-radius: 16px;
}

.post-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  border-radius: 16px;

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
  background-color: transparent;
  padding: 8px;
  border: none;
  cursor: pointer;
}
.like-button img {
  width: 20px;
  height: 20px;
}

.like-button:hover {
  filter: brightness(0) saturate(100%) invert(35%) sepia(43%)  hue-rotate(200deg) brightness(89%) contrast(85%);
}

.like-count {
  font-size: 14px;
  color: #333;
}

@media (min-width: 900px) {
    .post-item {
        width: 600px;
    }
  }
</style>
