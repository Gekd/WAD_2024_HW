<template>
  <div class="main">
    <div v-if="loading" class="loading">
      <p>Loading feed...</p>
    </div>
    <div class="posts-container" v-else>
      <PostItem
        v-for="(post, index) in userFeed"
        :key="index"
        :post="post"
        :index="index"
      />
    </div>
    <div class="reset-container">
      <button @click="resetLikes" class="reset-button">Reset Likes</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PostItem from "../components/PostItem.vue";

export default {
  name: "MainView",
  components: { PostItem },
  computed: {
    ...mapGetters(["getUserFeed", "isLoading"]),
    userFeed() {
      return this.getUserFeed;
    },
    loading() {
      return this.isLoading;
    },
  },
  methods: {
    resetLikes() {
      this.$store.commit("RESET_LIKES");
    },
  },
  mounted() {
    this.$store.dispatch("fetchFeed");
  },
};
</script>

<style scoped>
.navbar {
  font-size: 16px;
  text-align: center;
  margin-bottom: 16px;
}

.posts-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

.reset-container {
  text-align: center;
  margin-bottom: 16px;
}

.reset-button {
  font-size: 16px;
  padding: 16px 16px;
  border-radius: 16px;
  background-color: var(--vt-c-blue);
  color: white;
  cursor: pointer;
  border: none;
}
.reset-button:hover{
  background-color: #0056b3;
}

footer {
  font-size: 16px;
  text-align: center;
  height: 48px;
  background-color: grey;
  border-radius: 16px;
  margin-top: 16px;
}

.loading {
  text-align: center;
  font-size: 20px;
  color: grey;
}
</style>
