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
      <button @click="resetLikes">Reset Likes</button>
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
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  padding: 16px;
}

.reset-container {
  text-align: center;
  margin: 16px 0;
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
