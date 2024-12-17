<template>
  <div class="post">
    <p class="date">{{ post.date }}</p>
    <p>{{ post.content }}</p>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.post {
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 15px;
  margin-bottom: 10px;
}

.date {
  font-weight: bold;
  margin-bottom: 5px;
}
</style>
